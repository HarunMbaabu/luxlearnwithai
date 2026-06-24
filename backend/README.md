# LuxDevHQ AI Tutor FastAPI Backend

FastAPI service for the LuxDevHQ free AI tutor. It generates practical courses, guides, roadmaps, and quizzes for Python, FastAPI, data science, data analytics, data engineering, and AI learners.

## Environment variables

Create `backend/.env` locally or set these variables in your hosting provider:

```env
OPENAI_API_KEY=sk-proj-your-new-key-here
OPENAI_MODEL=gpt-4o-mini
ALLOWED_ORIGINS=https://luxdevhq.ai,https://www.luxdevhq.ai,http://localhost:3000
```

The backend also supports the legacy `OpenAIKEY` variable, but `OPENAI_API_KEY` is recommended.

> If an API key has been pasted into chat, screenshots, GitHub, logs, or support tickets, revoke it and create a new key before deploying.

## Local development

```bash
cd backend
python -m venv .venv
source .venv/bin/activate
pip install -r requirements.txt
uvicorn app.main:app --reload --host 0.0.0.0 --port 8000
```

Health check: `GET http://localhost:8000/health`

Tutor endpoint: `POST http://localhost:8000/api/free-ai-tutor`

## Connect the Next.js frontend

Set this in the Next.js environment:

```env
FASTAPI_AI_TUTOR_URL=http://localhost:8000/api/free-ai-tutor
```

In production, set `FASTAPI_AI_TUTOR_URL` to the deployed FastAPI endpoint.

## Docker

```bash
cd backend
docker build -t luxdevhq-ai-tutor-api .
docker run --env-file .env -p 8000:8000 luxdevhq-ai-tutor-api
```

## Deployment

`render.yaml` provides a Render Blueprint for the FastAPI service. Add `OPENAI_API_KEY` as a secret environment variable in Render.

Useful LuxDevHQ links that the tutor can mention when relevant:

- Main learning site: <https://luxdevhq.ai>
- Payment portal: <https://payment.luxdevhq.com>
- GitHub organization: <https://github.com/LuxDevHQ>
