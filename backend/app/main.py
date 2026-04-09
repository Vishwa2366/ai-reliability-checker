import logging
import sys

from fastapi import FastAPI, Request
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse

from app.config import get_settings
from app.routes.analyze import router as analyze_router

logging.basicConfig(
    stream=sys.stdout,
    level=logging.INFO,
    format="%(asctime)s [%(levelname)s] %(name)s: %(message)s",
)

settings = get_settings()

app = FastAPI(
    title="AI Reliability Checker",
    description="Analyse text, URLs, and images for reliability using Gemini AI.",
    version="1.0.0",
    docs_url="/docs",
    redoc_url="/redoc",
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=settings.origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.exception_handler(Exception)
async def global_exception_handler(request: Request, exc: Exception):
    logging.getLogger(__name__).exception("Unhandled error on %s", request.url)
    return JSONResponse(status_code=500, content={"detail": "An unexpected error occurred."})


app.include_router(analyze_router, tags=["Analysis"])


@app.get("/health", tags=["Meta"])
async def health():
    return {"status": "ok"}
