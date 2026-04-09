import re


def extract_score_from_text(raw: str) -> int | None:
    """Pull the first integer that looks like a score (0-100) from Gemini's raw text."""
    patterns = [
        r"reliability score[:\s]+(\d{1,3})",
        r"score[:\s]+(\d{1,3})\s*/\s*100",
        r"score[:\s]+(\d{1,3})",
        r"\b(\d{1,3})\s*/\s*100\b",
        r"\b(\d{1,3})\b",
    ]
    for pat in patterns:
        m = re.search(pat, raw, re.IGNORECASE)
        if m:
            val = int(m.group(1))
            if 0 <= val <= 100:
                return val
    return None


def clamp_score(score: int | float) -> int:
    return max(0, min(100, int(round(score))))


def extract_tags(text: str) -> list[str]:
    """Very lightweight keyword tagging — not NLP, just heuristic matching."""
    buckets = {
        "Politics": ["election", "government", "parliament", "policy", "political", "vote"],
        "Health": ["vaccine", "virus", "covid", "medical", "health", "disease", "hospital"],
        "Technology": ["ai", "artificial intelligence", "software", "algorithm", "data", "tech"],
        "Climate": ["climate", "carbon", "emission", "global warming", "environment"],
        "Finance": ["stock", "market", "economy", "gdp", "inflation", "bank", "crypto"],
        "Science": ["research", "study", "experiment", "scientist", "nasa", "physics"],
        "Social Media": ["twitter", "facebook", "instagram", "viral", "tiktok"],
    }
    lower = text.lower()
    return [label for label, keywords in buckets.items() if any(kw in lower for kw in keywords)]
