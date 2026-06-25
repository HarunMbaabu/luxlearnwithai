import os
from typing import Literal

import httpx
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from dotenv import load_dotenv
from pydantic import BaseModel, Field

load_dotenv()

OPENAI_CHAT_COMPLETIONS_URL = "https://api.openai.com/v1/chat/completions"
OPENAI_MODEL = os.getenv("OPENAI_MODEL", "gpt-4o-mini")

LUXDEVHQ_CONTEXT = """
LuxDevHQ is a practical data, AI, and cloud upskilling bootcamp. Shape every answer
around hands-on portfolio work, mentorship, career readiness, and real-world projects.
Important official links to include when relevant:
- Main learning site: https://luxdevhq.ai
- Payment portal: https://payment.luxdevhq.com
- GitHub organization: https://github.com/LuxDevHQ

Core learning paths and guide topics to prioritize:
- Python: syntax, functions, files, notebooks, APIs, automation, testing, and FastAPI.
- Data analysis: Excel, SQL, pandas, NumPy, visualization, dashboards, KPI storytelling.
- Data science and AI: statistics, feature engineering, scikit-learn, model evaluation,
  supervised and unsupervised learning, deep learning basics, responsible AI.
- Data engineering: advanced SQL, data modeling, ETL/ELT, orchestration, Airflow,
  dbt, Spark, Kafka, warehousing/lakehouse concepts, Docker, cloud, monitoring.
- Career readiness: Git/GitHub portfolio, capstone projects, interview preparation,
  internship readiness, communication, and stakeholder presentation.

When learners ask for LuxDevHQ guidance, recommend practical projects such as:
- Python API or FastAPI microservice with tests and deployment notes.
- Data cleaning and dashboard portfolio project with Excel/Power BI or Python.
- Machine learning notebook with reproducible data science workflow.
- Data engineering pipeline with ingestion, validation, warehouse modeling, and docs.
""".strip()

SYSTEM_PROMPT = f"""You are LuxTutor, a warm, practical AI tutor for LuxDevHQ learners.
Create concise, motivating learning help with examples, checkpoints, and next actions.
When asked for a course, guide, or roadmap, return structured lessons, exercises,
projects, GitHub portfolio tasks, and credible next steps.
Do not claim to be human. Keep answers safe and age-appropriate.

{LUXDEVHQ_CONTEXT}
""".strip()


class TutorRequest(BaseModel):
    topic: str = Field(..., min_length=1)
    format: Literal["course", "guide", "roadmap", "quiz"] = "course"
    level: str | None = None
    goal: str | None = None
    timeCommitment: str | None = None
    questionsEnabled: bool = False


class TutorResponse(BaseModel):
    answer: str


app = FastAPI(
    title="LuxDevHQ AI Tutor API",
    description="FastAPI backend for generating LuxDevHQ learning courses, guides, roadmaps, and quizzes.",
    version="1.0.0",
)

allowed_origins = [origin.strip() for origin in os.getenv("ALLOWED_ORIGINS", "*").split(",") if origin.strip()]
app.add_middleware(
    CORSMiddleware,
    allow_origins=allowed_origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


def get_openai_key() -> str:
    return (os.getenv("OPENAI_API_KEY") or os.getenv("OpenAIKEY") or os.getenv("OPENAIKEY") or "").strip().strip('"').strip("'")


def build_prompt(payload: TutorRequest) -> str:
    learner_context = (
        f"Learner level: {payload.level or 'beginner'}. "
        f"Goal: {payload.goal or 'learn the topic well'}. "
        f"Weekly time: {payload.timeCommitment or '3-5 hours'}."
        if payload.questionsEnabled
        else "Learner wants a quick starter plan without extra profiling questions."
    )

    format_instructions = {
        "course": "Return a course with modules, lessons, exercises, projects, and checkpoints.",
        "guide": "Return a quick guide with concepts, examples, steps, mistakes to avoid, and practice tasks.",
        "roadmap": "Return a week-by-week roadmap with milestones, projects, and career outcomes.",
        "quiz": "Return a quiz with answers, explanations, and follow-up study recommendations.",
    }

    return f"""Build a LuxDevHQ-style {payload.format} for: {payload.topic}.
{learner_context}
{format_instructions[payload.format]}

Include, where relevant:
1. Friendly overview
2. Personalized roadmap or lesson structure
3. Python, FastAPI, data science, data engineering, analytics, or AI connections
4. GitHub portfolio tasks inspired by LuxDevHQ practical learning
5. Payment/enrollment pointer only when the learner asks how to enroll or pay: https://payment.luxdevhq.com
6. What to ask LuxTutor next
""".strip()


@app.get("/health")
def health() -> dict[str, str]:
    return {"status": "ok"}


@app.post("/api/free-ai-tutor", response_model=TutorResponse)
async def free_ai_tutor(payload: TutorRequest) -> TutorResponse:
    openai_key = get_openai_key()
    if not openai_key:
        raise HTTPException(
            status_code=500,
            detail="The AI tutor backend is missing OPENAI_API_KEY. Add OPENAI_API_KEY to the FastAPI hosting environment. Legacy OpenAIKEY/OPENAIKEY is also accepted, but OPENAI_API_KEY is recommended.",
        )

    try:
        async with httpx.AsyncClient(timeout=45) as client:
            response = await client.post(
                OPENAI_CHAT_COMPLETIONS_URL,
                headers={
                    "Content-Type": "application/json",
                    "Authorization": f"Bearer {openai_key}",
                },
                json={
                    "model": OPENAI_MODEL,
                    "messages": [
                        {"role": "system", "content": SYSTEM_PROMPT},
                        {"role": "user", "content": build_prompt(payload)},
                    ],
                    "temperature": 0.75,
                    "max_tokens": 1400,
                },
            )
    except httpx.HTTPError as exc:
        raise HTTPException(status_code=502, detail="Could not reach OpenAI from the FastAPI tutor service.") from exc

    data = response.json()
    if response.status_code >= 400:
        message = data.get("error", {}).get("message") or "The AI tutor could not respond."
        raise HTTPException(status_code=response.status_code, detail=message)

    return TutorResponse(answer=data.get("choices", [{}])[0].get("message", {}).get("content") or "No response generated.")
