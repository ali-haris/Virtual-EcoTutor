# from fastapi import APIRouter, HTTPException
# from pydantic import BaseModel
# from ..utils.aiml_client import gpt_chat
# import json, logging

# logger = logging.getLogger("green-mentor.challenges")
# router = APIRouter()

# class ChallengeRequest(BaseModel):
#     age: int = 10
#     difficulty: str = "easy"  # easy | medium | hard

# @router.post("/suggest")
# def suggest_challenges(payload: ChallengeRequest):
#     prompt = f"""Propose 5 safe, real-life eco challenges for a {payload.age}-year-old kid.
# Difficulty: {payload.difficulty}.
# Return strict JSON:
# {{
#   "challenges": [{{"id":"c1","title":"string","description":"string","eco_points":10,"badge":"Leaf Starter"}}]
# }}
# Keep tasks safe, simple, and fun. Respond with JSON ONLY.
# """
#     try:
#         raw = gpt_chat(prompt, max_tokens=700)
#         data = json.loads(raw)
#     except Exception as e:
#         logger.exception('Challenge generation failed; returning fallback')
#         data = {
#             "challenges": [
#                 {"id":"c1","title":"Collect 5 pieces of litter","description":"Walk around your yard and pick up 5 small pieces of litter and recycle them.","eco_points":5,"badge":"Litter Helper"},
#                 {"id":"c2","title":"Save water for a day","description":"Turn off the tap while brushing your teeth and measure saved water.","eco_points":8,"badge":"Water Saver"}
#             ]
#         }
#     return data
from fastapi import APIRouter
from pydantic import BaseModel
from ..utils.aiml_client import gpt_chat
import json
import logging

logger = logging.getLogger("green-mentor.challenges")
router = APIRouter()

class ChallengeRequest(BaseModel):
    age: int = 10
    difficulty: str = "easy"  # easy | medium | hard

@router.post("/suggest")
def suggest_challenges(payload: ChallengeRequest):
    prompt = f"""
You are an eco challenge generator for kids aged {payload.age}.

Create exactly 5 safe, real-life eco challenges.
Difficulty level: {payload.difficulty}.

Return STRICT JSON ONLY in this format:
{{
  "challenges": [
    {{
      "id": "c1",
      "title": "string",
      "description": "string",
      "eco_points": 10,
      "badge": "relevant meaningful eco-icon"
    }}
  ]
}}
- Do NOT include any extra text or explanations outside the JSON.
- Do NOT wrap the JSON in code fences.
- Keep the tasks safe, age-appropriate, fun, and eco-friendly.
"""

    try:
        raw = gpt_chat(prompt, max_tokens=700)
        logger.info(f"Raw GPT challenge output: {raw!r}")  # Debugging

        # Clean possible markdown/code fences
        cleaned = raw.strip()
        if cleaned.startswith("```"):
            cleaned = cleaned.strip("`")
            if cleaned.startswith("json"):
                cleaned = cleaned[len("json"):].strip()

        data = json.loads(cleaned)

    except Exception:
        logger.exception("Challenge generation failed; returning fallback")
        data = {
            "challenges": [
                {
                    "id": "c1",
                    "title": "Collect 5 pieces of litter",
                    "description": "Walk around your yard and pick up 5 small pieces of litter and recycle them.",
                    "eco_points": 5,
                    "badge": "Litter Helper"
                },
                {
                    "id": "c2",
                    "title": "Save water for a day",
                    "description": "Turn off the tap while brushing your teeth and measure saved water.",
                    "eco_points": 8,
                    "badge": "Water Saver"
                }
            ]
        }
    return data
