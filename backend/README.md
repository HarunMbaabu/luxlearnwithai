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

## Vercel + FastAPI production checklist

The Next.js app deployed on Vercel does **not** run the FastAPI app in `backend/`. Vercel serves the frontend and the Next.js API proxy at `/api/free-ai-tutor`; the proxy forwards tutor requests to a separately deployed FastAPI service.

Required production environment variables:

### Vercel project

```env
FASTAPI_AI_TUTOR_URL=https://your-fastapi-host.example.com/api/free-ai-tutor
```

- `FASTAPI_AI_TUTOR_URL` must be the public URL of the deployed FastAPI tutor endpoint.
- Do not set it to `localhost`, `127.0.0.1`, or `0.0.0.0` in production because those addresses point back to Vercel's serverless runtime, not your laptop or backend container.
- `OpenAIKEY` or `OPENAI_API_KEY` is not used by the Vercel frontend proxy unless you also run the OpenAI call directly in Next.js. Keep the OpenAI key on the FastAPI backend host.

### FastAPI backend host (Render, Railway, Fly.io, VPS, etc.)

```env
OPENAI_API_KEY=sk-proj-your-key
OPENAI_MODEL=gpt-4o-mini
ALLOWED_ORIGINS=https://your-vercel-app.vercel.app,https://your-production-domain.com
```

- `OPENAI_API_KEY` is the recommended OpenAI variable name. The backend also accepts legacy `OpenAIKEY` and `OPENAIKEY`, but using `OPENAI_API_KEY` avoids deployment confusion.
- Never expose the OpenAI key as a public `NEXT_PUBLIC_` variable.

Production request flow:

1. Browser calls the Vercel route: `POST /api/free-ai-tutor`.
2. The Vercel route reads `FASTAPI_AI_TUTOR_URL` on the server.
3. The Vercel route forwards the request to FastAPI.
4. FastAPI reads `OPENAI_API_KEY` and calls OpenAI.
5. FastAPI returns the tutor answer through the Vercel route to the browser.

Before going live, verify:

```bash
curl https://your-fastapi-host.example.com/health
curl -X POST https://your-fastapi-host.example.com/api/free-ai-tutor \
  -H 'Content-Type: application/json' \
  -d '{"topic":"Python basics","format":"guide"}'
```
