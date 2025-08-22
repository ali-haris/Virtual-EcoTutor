from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
from typing import List, Dict, Any
from ..utils.aiml_client import gpt_chat
import logging

logger = logging.getLogger("green-mentor.chat")
router = APIRouter()

class ChatRequest(BaseModel):
    question: str

class ChatResponse(BaseModel):
    reply: str
    eco_points_awarded: int

@router.post("/", response_model=ChatResponse)
def ask_green_mentor(payload: ChatRequest):
    prompt = (
        "A kid asks: " + payload.question + "\n"
        "Answer in 2-5 friendly sentences. Add a simple tip and a cheerful emoji."
    )
    try:
        reply = gpt_chat(prompt, max_tokens=250)
    except Exception as e:
        logger.exception('AI call failed')
        raise HTTPException(status_code=500, detail="AI request failed")
    points = 2
    return ChatResponse(reply=reply, eco_points_awarded=points)
