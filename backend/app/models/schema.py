from pydantic import BaseModel, Field


class AnalyzeResponse(BaseModel):
    score: int = Field(..., ge=0, le=100, description="Reliability score from 0 to 100")
    explanation: str = Field(..., description="Gemini-generated reliability explanation")
    type: str = Field(..., description="Input type: text, url, or image")
    tags: list[str] = Field(default_factory=list, description="Extracted topic tags")


class ErrorDetail(BaseModel):
    detail: str
