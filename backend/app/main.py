from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from .routers import chat, quizzes, challenges, progress
import logging
import openai
print(">>> OpenAI version:", openai.__version__)


logging.basicConfig(level=logging.INFO)
logger = logging.getLogger("green-mentor")

app = FastAPI(title="Green Mentor Chatbot API", version="3.0.0")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["https://eco-mentor.vercel.app/"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(chat.router, prefix="/chat", tags=["chat"])
app.include_router(quizzes.router, prefix="/quizzes", tags=["quizzes"])
app.include_router(challenges.router, prefix="/challenges", tags=["challenges"])
app.include_router(progress.router, prefix="/progress", tags=["progress"])

@app.get("/health")
def health():
    return {"status": "ok"}
