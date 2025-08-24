<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="utf-8" />
<meta name="viewport" content="width=device-width, initial-scale=1" />
<title>Eco Mentor – README</title>
<style>
  :root{
    --green:#4caf50;
    --green-2:#81c784;
    --blue:#1976d2;
    --gold:#ffd54f;
    --ink:#1b1b1f;
    --muted:#5f6a6a;
    --bg:#f7fbf8;
    --card:#ffffff;
  }
  *{box-sizing:border-box}
  body{
    margin:0;
    font-family: ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto, Inter, "Helvetica Neue", Arial, "Noto Sans", "Apple Color Emoji", "Segoe UI Emoji";
    color:var(--ink);
    background:var(--bg);
    line-height:1.6;
  }
  header{
    background:linear-gradient(90deg,var(--green), var(--green-2));
    color:#fff;
    padding:32px 16px;
  }
  header h1{ margin:0 0 8px; font-size: clamp(1.6rem, 3.5vw, 2.2rem); }
  header p{ margin:0; opacity:.95 }
  main{ max-width:1024px; margin:24px auto; padding:0 16px 48px; }
  .card{
    background:var(--card);
    border-radius:16px;
    box-shadow:0 6px 20px rgba(0,0,0,.06);
    padding:20px 20px;
    margin:16px 0;
  }
  h2{ margin:0 0 12px; font-size: clamp(1.2rem, 2.5vw, 1.6rem) }
  h3{ margin:16px 0 8px; font-size:1.05rem; color:var(--blue) }
  code, pre{ font-family: ui-monospace, SFMono-Regular, Menlo, Consolas, "Liberation Mono", monospace }
  pre{
    background:#0f172a; color:#e2e8f0; border-radius:12px; padding:14px; overflow:auto;
  }
  ul{ padding-left: 20px; margin:6px 0 0 }
  .pill{
    display:inline-block; background:#e8f5e9; color:#2e7d32; border-radius:999px; padding:4px 10px; margin:2px 6px 2px 0; font-weight:600; font-size:.9rem;
  }
  .grid{ display:grid; gap:14px }
  .grid.cols-2{ grid-template-columns: repeat(auto-fit, minmax(260px, 1fr)) }
  .muted{ color:var(--muted) }
  .kbd{
    display:inline-block; padding:0 6px; border-radius:6px; border:1px solid #d0d7de; background:#f6f8fa; font-family:inherit
  }
  a{ color:var(--blue); text-decoration: none }
  a:hover{ text-decoration: underline }
  footer{ text-align:center; padding:24px; color:var(--muted) }
  .eco-heading{
    background:linear-gradient(90deg,#4caf50,#81c784);
    -webkit-background-clip:text; background-clip:text;
    -webkit-text-fill-color:transparent;
    font-weight:800;
  }
</style>
</head>
<body>

<header>
  <h1 class="eco-heading">Eco Mentor</h1>
  <p>GPT-5 powered sustainability mentor for kids — dynamic chat, quizzes, and gamified eco-challenges.</p>
</header>

<main>

  <section class="card">
    <h2>Overview</h2>
    <p><strong>Eco Mentor</strong> is a GPT-5 powered virtual sustainability mentor for children and young learners. It blends friendly chat, AI-generated quizzes, and real-life challenges, with eco-points and badges to make learning fun and rewarding.</p>
    <div>
      <span class="pill">FastAPI + React</span>
      <span class="pill">GPT-5 via AIML API</span>
      <span class="pill">Eco-points &amp; Badges</span>
      <span class="pill">Kid-friendly UI</span>
    </div>
  </section>

  <section class="card">
    <h2>Core Features</h2>
    <div class="grid cols-2">
      <div>
        <h3>Conventional Learning</h3>
        <ul>
          <li>Kids ask eco questions (“How can I save water?”, “What’s composting?”)</li>
          <li>GPT-5 replies with age-appropriate, friendly answers.</li>
        </ul>
        <h3>Interactive Quizzes</h3>
        <ul>
          <li>On-demand quiz generation (topic + number of questions).</li>
          <li>Kid-friendly MCQs with short explanations.</li>
        </ul>
        <h3>Eco Challenges Engine</h3>
        <ul>
          <li>Gamified, safe, real-life tasks (e.g., “Collect 5 pieces of litter”).</li>
          <li>Progress logging, eco-points, and badges.</li>
        </ul>
      </div>
      <div>
        <h3>UI &amp; Visual Design</h3>
        <ul>
          <li>Eco theme: greens (primary), blue (trust), yellow-gold (rewards).</li>
          <li>Rounded corners, soft shadows, large friendly buttons.</li>
          <li>Mascot avatar &amp; subtle eco background texture.</li>
        </ul>
        <h3>Gamification</h3>
        <ul>
          <li>Collect badges and eco-points for actions.</li>
          <li>Motivational feedback from the Eco Mentor.</li>
        </ul>
        <h3>Progress</h3>
        <ul>
          <li>Points &amp; badges tracked in <code>backend/app/data/progress.json</code>.</li>
          <li><strong>Reset Progress</strong> button included in the footer.</li>
        </ul>
      </div>
    </div>
  </section>

  <section class="card">
    <h2>Tech Stack</h2>
    <ul>
      <li><strong>Backend:</strong> FastAPI (Python)</li>
      <li><strong>Frontend:</strong> React + Vite</li>
      <li><strong>AI:</strong> GPT-5 via AIML API (<code>https://api.aimlapi.com/v1</code>)</li>
      <li><strong>Deployment:</strong> Any (e.g., Vercel for frontend, Railway/Render for backend)</li>
    </ul>
  </section>

  <section class="card">
    <h2>Configuration</h2>
    <p>Create these environment variables/files before running:</p>
    <h3>Backend (<code>.env</code> in <code>backend/</code>)</h3>
    <pre><code>AIML_BASE_URL=https://api.aimlapi.com/v1
AIML_API_KEY=YOUR_AIML_API_KEY
SYSTEM_PROMPT=You are Green Mentor.
CORS_ORIGINS=http://localhost:5173
</code></pre>

    <h3>Frontend (<code>.env</code> in <code>frontend/</code>)</h3>
    <pre><code>VITE_API_URL=http://localhost:8000
</code></pre>

    <h3>Working OpenAI Client Structure (Python)</h3>
    <pre><code>from openai import OpenAI

base_url = "https://api.aimlapi.com/v1"
api_key  = "YOUR_AIML_API_KEY"

api = OpenAI(api_key=api_key, base_url=base_url)

def ask(system_prompt: str, user_prompt: str):
    completion = api.chat.completions.create(
        model="openai/gpt-5-chat-latest",
        messages=[
            {"role": "system", "content": system_prompt},
            {"role": "user", "content": user_prompt},
        ],
        temperature=0.7,
        max_tokens=256,
    )
    return completion.choices[0].message.content
</code></pre>
    <p class="muted">The app uses stronger prompts + response cleaning to ensure JSON-only replies for quizzes/challenges.</p>
  </section>

  <section class="card">
    <h2>How to Run (Local)</h2>

    <h3>Prerequisites</h3>
    <ul>
      <li>Python 3.11+ (Windows: from Microsoft Store or python.org)</li>
      <li>Node.js 18+ (includes npm)</li>
      <li>Your AIML API key</li>
    </ul>

    <h3>1) Backend</h3>
    <pre><code># open a terminal
cd backend

# create & activate a virtual environment (Windows PowerShell)
python -m venv .venv
.\.venv\Scripts\Activate.ps1

# install deps
pip install -r requirements.txt

# create .env (paste the values from the Configuration section)
# then run the API:
uvicorn app.main:app --reload --host 0.0.0.0 --port 8000
</code></pre>

    <h3>2) Frontend</h3>
    <pre><code># open a second terminal
cd frontend

# install deps
npm install

# create .env with:
# VITE_API_URL=http://localhost:8000

# start dev server
npm run dev
</code></pre>

    <p>Now open the printed URL (usually <code>http://localhost:5173</code>). The frontend talks to FastAPI at <code>http://localhost:8000</code>.</p>
  </section>

  <section class="card">
    <h2>Key Endpoints</h2>
    <ul>
      <li><code>POST /chat/ask</code> – chatbot Q&amp;A</li>
      <li><code>POST /quizzes/generate</code> – dynamic quiz by topic</li>
      <li><code>POST /challenges/suggest</code> – eco challenges by age/difficulty</li>
      <li><code>GET  /progress</code> – current points / badges / completed</li>
      <li><code>POST /progress/log</code> – log an action (adds points/badges)</li>
      <li><code>POST /progress/reset</code> – <strong>reset progress</strong> (clears file)</li>
    </ul>
    <p class="muted">Progress is stored in <code>backend/app/data/progress.json</code>. The “Reset Progress” button in the footer calls <code>/progress/reset</code> and refreshes UI state.</p>
  </section>

  <section class="card">
    <h2>Design Notes</h2>
    <ul>
      <li><strong>Theme:</strong> Green primary, blue support, yellow-gold for rewards.</li>
      <li><strong>Chat bubbles:</strong> Mentor → green on white; User → light blue on dark text.</li>
      <li><strong>Mascot:</strong> Place the owl/logo in header and chatbot avatar.</li>
      <li><strong>Cards:</strong> Soft shadows, 2xl radius, clear hierarchy.</li>
      <li><strong>Badges:</strong> Circular/shield style; small unlock animation.</li>
    </ul>
  </section>

  <section class="card">
    <h2>Troubleshooting</h2>
    <ul>
      <li><strong>Frontend blank page:</strong> Open browser console (F12). Ensure <code>VITE_API_URL</code> points to your backend.</li>
      <li><strong>CORS errors:</strong> Make sure <code>CORS_ORIGINS</code> in backend <code>.env</code> includes your frontend URL.</li>
      <li><strong>Quizzes/Challenges fallback:</strong> Check terminal logs; AI may have returned non-JSON. The app cleans code-fences and enforces strict JSON, but logs will show the raw reply for debugging.</li>
      <li><strong>Reset not working:</strong> Confirm the route <code>/progress/reset</code> is included in <code>app.main</code> and that the file path exists:
        <code>backend/app/data/progress.json</code>.
      </li>
    </ul>
  </section>

  <section class="card">
    <h2>Team</h2>
    <ul>
      <li><strong>Ali Haris</strong> – Full-Stack</li>
      <li><strong>Bano Rani</strong> – Prompt Engineering</li>
      <li><strong>Nissaf Sleimi</strong> – Lead, Design &amp; Business</li>
      <li><strong>Marium Noor Khetran</strong> – Deployment</li>
    </ul>
  </section>

  <footer>
    © <span id="year"></span> Eco Mentor — Learn Green, Play Green.
  </footer>

</main>

<script>
  // footer year
  document.getElementById('year').textContent = new Date().getFullYear();
</script>

</body>
</html>
