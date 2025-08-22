# Green Mentor Chatbot v3 (FastAPI + React)

Regenerated with improvements and UI preserved.

## Quickstart

1) Backend
```bash
cd backend
python -m venv .venv
# Windows PowerShell:
# .\.venv\Scripts\Activate.ps1
# Windows cmd:
# .venv\Scripts\activate.bat
source .venv/bin/activate   # mac/linux
pip install -r requirements.txt
uvicorn app.main:app --reload --host 0.0.0.0 --port 8000
```

2) Frontend
```bash
cd frontend
npm install
npm run dev
```

Notes:
- `backend/.env` contains your AIML key; change if needed.
- Frontend env: `frontend/.env` points to backend by default.
