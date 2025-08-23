import os
from dotenv import load_dotenv
from openai import OpenAI

load_dotenv()

base_url = os.getenv("AIML_BASE_URL", "")
api_key = os.getenv("AIML_API_KEY", "")

system_prompt = os.getenv("SYSTEM_PROMPT", "You are Green Mentor.")

# Only set base_url if it's not empty and not the default OpenAI endpoint
if base_url and not base_url.startswith("https://api.openai.com"):
    api = OpenAI(api_key=api_key, base_url=base_url)
else:
    api = OpenAI(api_key=api_key)

def gpt_chat(user_prompt: str, temperature: float = 0.7, max_tokens: int = 256, system_prompt_override: str | None = None) -> str:
    sp = system_prompt_override if system_prompt_override else system_prompt
    completion = api.chat.completions.create(
        model="openai/gpt-5-chat-latest",
        messages=[
            {"role": "system", "content": sp},
            {"role": "user", "content": user_prompt},
        ],
        temperature=temperature,
        max_tokens=max_tokens,
    )
    response = completion.choices[0].message.content
    return response
