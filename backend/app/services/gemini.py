import asyncio
import logging
import textwrap

import google.generativeai as genai

from app.config import get_settings
from app.utils.scoring import extract_score_from_text, clamp_score

logger = logging.getLogger(__name__)

_PROMPT_TEMPLATE = textwrap.dedent("""
    You are an expert fact-checker and media literacy analyst.

    Analyse the following content and determine how reliable and factually accurate it is.

    Respond ONLY in this exact format — do not add any extra sections:

    SCORE: <integer 0-100>
    EXPLANATION: <2-4 sentence explanation of why you assigned this score, citing specific signals>

    Scoring guide:
    - 85-100: Well-sourced, factually accurate, balanced reporting
    - 65-84: Mostly accurate with minor unsupported claims
    - 40-64: Mixed — some facts but notable bias or unverified claims
    - 20-39: Largely inaccurate or heavily misleading
    - 0-19: Misinformation, fabricated content, or propaganda

    Content to analyse:
    \"\"\"
    {content}
    \"\"\"
""").strip()


def _init_client() -> genai.GenerativeModel:
    settings = get_settings()
    genai.configure(api_key=settings.gemini_api_key)
    return genai.GenerativeModel("gemini-1.5-flash")


_model: genai.GenerativeModel | None = None


def _get_model() -> genai.GenerativeModel:
    global _model
    if _model is None:
        _model = _init_client()
    return _model


def _parse_response(raw_text: str) -> tuple[int, str]:
    lines = raw_text.strip().splitlines()
    score = None
    explanation_lines = []
    in_explanation = False

    for line in lines:
        stripped = line.strip()
        if stripped.upper().startswith("SCORE:"):
            try:
                score = clamp_score(int(stripped.split(":", 1)[1].strip()))
            except ValueError:
                score = extract_score_from_text(stripped)
        elif stripped.upper().startswith("EXPLANATION:"):
            in_explanation = True
            rest = stripped.split(":", 1)[1].strip()
            if rest:
                explanation_lines.append(rest)
        elif in_explanation and stripped:
            explanation_lines.append(stripped)

    if score is None:
        score = extract_score_from_text(raw_text) or 50

    explanation = " ".join(explanation_lines).strip()
    if not explanation:
        explanation = raw_text.strip()

    return score, explanation


async def analyse_with_gemini(content: str) -> tuple[int, str]:
    if not content or not content.strip():
        raise ValueError("Content must not be empty.")

    prompt = _PROMPT_TEMPLATE.format(content=content[:8000])
    model = _get_model()

    try:
        response = await asyncio.to_thread(
            model.generate_content,
            prompt,
            generation_config=genai.GenerationConfig(
                temperature=0.2,
                max_output_tokens=512,
            ),
        )
    except Exception as exc:
        logger.exception("Gemini API call failed")
        raise RuntimeError(f"AI analysis failed: {exc}") from exc

    raw = response.text
    if not raw:
        raise RuntimeError("Gemini returned an empty response.")

    return _parse_response(raw)
