import io
import logging

import pytesseract
from PIL import Image, UnidentifiedImageError

from app.config import get_settings

logger = logging.getLogger(__name__)


def _configure_tesseract() -> None:
    settings = get_settings()
    if settings.tesseract_cmd:
        pytesseract.pytesseract.tesseract_cmd = settings.tesseract_cmd


_configure_tesseract()


def extract_text_from_image(image_bytes: bytes) -> str:
    try:
        img = Image.open(io.BytesIO(image_bytes))
    except UnidentifiedImageError as exc:
        raise ValueError("Uploaded file is not a recognisable image.") from exc

    if img.mode not in ("RGB", "L"):
        img = img.convert("RGB")

    try:
        text = pytesseract.image_to_string(img, lang="eng")
    except pytesseract.TesseractNotFoundError as exc:
        logger.error("Tesseract not found: %s", exc)
        raise RuntimeError(
            "OCR engine is not installed or configured. "
            "Set TESSERACT_CMD in .env or install Tesseract."
        ) from exc

    cleaned = " ".join(text.split())
    if not cleaned:
        raise ValueError("No text could be extracted from the image. Try a clearer image.")

    return cleaned
