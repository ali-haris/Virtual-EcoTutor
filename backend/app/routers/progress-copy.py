from fastapi import APIRouter
from pydantic import BaseModel
import os, json

router = APIRouter()
DATA_PATH = os.path.join(os.path.dirname(__file__), "..", "data", "progress.json")
DATA_PATH = os.path.normpath(DATA_PATH)

os.makedirs(os.path.dirname(DATA_PATH), exist_ok=True)
if not os.path.exists(DATA_PATH):
    with open(DATA_PATH, "w") as f:
        json.dump({"eco_points": 0, "badges": [], "completed": []}, f)

def read_state():
    with open(DATA_PATH, "r") as f:
        return json.load(f)

def write_state(state: dict):
    with open(DATA_PATH, "w") as f:
        json.dump(state, f, indent=2)

class LogRequest(BaseModel):
    item_id: str
    kind: str  # "challenge" or "quiz" or "chat"
    details: dict | None = None
    points: int = 0
    badge: str | None = None

@router.get("")
def get_progress():
    return read_state()

@router.post("/log")
def log_progress(payload: LogRequest):
    state = read_state()
    state["eco_points"] = state.get("eco_points", 0) + max(0, payload.points)
    if payload.badge and payload.badge not in state.get("badges", []):
        state.setdefault("badges", []).append(payload.badge)
    state.setdefault("completed", []).append({
        "id": payload.item_id,
        "kind": payload.kind,
        "details": payload.details or {},
        "points": payload.points,
        "badge": payload.badge
    })
    write_state(state)
    return state
