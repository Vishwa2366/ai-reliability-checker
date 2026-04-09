import logging

from fastapi import APIRouter, File, Form, HTTPException, UploadFile, status

from app.config import get_settings
from app.models.schema import AnalyzeResponse
from app.services.gemini import analyse_with_gemini
from app.services.ocr import extract_text_from_image
from app.utils.scoring import extract_tags

logger = logging.getLogger(__name__)
router = APIRouter()

_MAX_TEXT_LEN = 10_000


@router.post(
    "/analyze",
    response_model=AnalyzeResponse,
    summary="Analyse content reliability",
    responses={
        400: {"description": "Bad request — no usable input provided"},
        422: {"description": "Validation error"},
        500: {"description": "Internal server error"},
    },
)
async def analyze(
    text: str | None = Form(None),
    url: str | None = Form(None),
    image: UploadFile | None = File(None),
):
    settings = get_settings()
    combined_text = ""
    input_type = "text"

    # --- image path ---
    if image and image.filename:
        input_type = "image"
        raw_bytes = await image.read()

        size_mb = len(raw_bytes) / (1024 * 1024)
        if size_mb > settings.max_image_size_mb:
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail=f"Image exceeds {settings.max_image_size_mb} MB limit.",
            )

        try:
            combined_text = extract_text_from_image(raw_bytes)
        except ValueError as exc:
            raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail=str(exc))
        except RuntimeError as exc:
            logger.error("OCR failure: %s", exc)
            raise HTTPException(status_code=status.HTTP_500_INTERNAL_SERVER_ERROR, detail=str(exc))

    # --- text / url path ---
    if text and text.strip():
        combined_text = (combined_text + " " + text.strip()).strip()
        input_type = "text" if not image else "image"

    if url and url.strip():
        combined_text = (combined_text + " " + url.strip()).strip()
        input_type = "url" if not image else input_type

    if not combined_text:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Provide at least one of: text, url, or an image.",
        )

    combined_text = combined_text[:_MAX_TEXT_LEN]

    try:
        score, explanation = await analyse_with_gemini(combined_text)
    except ValueError as exc:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail=str(exc))
    except RuntimeError as exc:
        logger.exception("Gemini analysis error")
        raise HTTPException(status_code=status.HTTP_500_INTERNAL_SERVER_ERROR, detail=str(exc))

    tags = extract_tags(combined_text)

    return AnalyzeResponse(score=score, explanation=explanation, type=input_type, tags=tags)
