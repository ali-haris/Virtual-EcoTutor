# from fastapi import APIRouter, HTTPException
# from pydantic import BaseModel
# from ..utils.aiml_client import gpt_chat
# import json, logging

# logger = logging.getLogger("green-mentor.quizzes")
# router = APIRouter()

# class QuizGenRequest(BaseModel):
#     topic: str = "Saving Water"
#     num_questions: int = 5

# @router.post("/generate")
# def generate_quiz(payload: QuizGenRequest):
#     prompt = f"""Create a {payload.num_questions}-question multiple-choice quiz for kids (ages 7-13) about '{payload.topic}'.
# Return strict JSON with the following shape:
# {{
#   "title": "string",
#   "questions": [{{"id": "q1", "question": "string", "options": ["A","B","C","D"], "answer": "A", "explain": "short reason"}}]
# }}
# Keep language simple, include an 'explain' for each question. Respond with JSON ONLY. No other formats are acceptable .
# """
#     try:
#         raw = gpt_chat(prompt, max_tokens=800)
#         data = json.loads(raw)
#         # print(data)
#     except Exception as e:
#         logger.exception('Quiz generation failed; returning fallback quiz')
        
#         data = {
#             "title": f"{payload.topic} Quiz",
#             "questions": [
#                 {"id": "q1", "question": "Which is a good way to save water at home?", "options": ["Fix leaks","Leave tap running","Water at night only","Use more hot water"], "answer": "Fix leaks", "explain": "Fixing leaks prevents waste."},
#                 {"id": "q2", "question": "What is composting?", "options": ["Throwing food away","Turning food scraps into soil","Burning trash","Washing dishes"], "answer": "Turning food scraps into soil", "explain": "Composting makes soil rich."}
#             ]
#         }
#     return data
from fastapi import APIRouter
from pydantic import BaseModel
from ..utils.aiml_client import gpt_chat
import json
import logging

logger = logging.getLogger("green-mentor.quizzes")
router = APIRouter()

class QuizGenRequest(BaseModel):
    topic: str = "Saving Water"
    num_questions: int = 5

@router.post("/generate")
def generate_quiz(payload: QuizGenRequest):
    prompt = f"""
You are a quiz generator for kids aged 7-13.

Create a {payload.num_questions}-question multiple-choice quiz about '{payload.topic}'.
Return STRICT JSON ONLY with the following format:
{{
  "title": "string",
  "questions": [
    {{
      "id": "q1",
      "question": "string",
      "options": ["A","B","C","D"],
      "answer": "A",
      "explain": "short reason"
    }}
  ]
}}
- Do NOT include any text outside the JSON.
- Do NOT wrap the JSON in code fences.
- Keep language simple and kid-friendly.
"""

    try:
        raw = gpt_chat(prompt, max_tokens=800)
        logger.info(f"Raw GPT quiz output: {raw!r}")  # Debug log

        # Clean up possible markdown/code fences
        cleaned = raw.strip()
        if cleaned.startswith("```"):
            cleaned = cleaned.strip("`")
            if cleaned.startswith("json"):
                cleaned = cleaned[len("json"):].strip()

        data = json.loads(cleaned)
    except Exception:
        logger.exception("Quiz generation failed; returning fallback quiz")
        data = {
            "title": f"{payload.topic} Quiz",
            "questions": [
                {
                    "id": "q1",
                    "question": "Which is a good way to save water at home?",
                    "options": ["Fix leaks", "Leave tap running", "Water at night only", "Use more hot water"],
                    "answer": "Fix leaks",
                    "explain": "Fixing leaks prevents waste."
                },
                {
                    "id": "q2",
                    "question": "What is composting?",
                    "options": ["Throwing food away", "Turning food scraps into soil", "Burning trash", "Washing dishes"],
                    "answer": "Turning food scraps into soil",
                    "explain": "Composting makes soil rich."
                }
            ]
        }
    return data
