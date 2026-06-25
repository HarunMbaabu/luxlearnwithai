import { NextResponse } from "next/server";

const LOCAL_FASTAPI_AI_TUTOR_URL = "http://127.0.0.1:8000/api/free-ai-tutor";

function normalizeTutorUrl(rawUrl) {
  if (!rawUrl) return "";

  const trimmedUrl = rawUrl.trim().replace(/\/+$/, "");
  if (trimmedUrl.endsWith("/api/free-ai-tutor")) return trimmedUrl;

  return `${trimmedUrl}/api/free-ai-tutor`;
}

function getTutorUrl() {
  const configuredUrl = normalizeTutorUrl(process.env.FASTAPI_AI_TUTOR_URL);

  if (configuredUrl) return configuredUrl;
  if (process.env.NODE_ENV !== "production") return LOCAL_FASTAPI_AI_TUTOR_URL;

  return "";
}

function isLocalUrl(url) {
  return /^https?:\/\/(localhost|127\.0\.0\.1|0\.0\.0\.0)(:|\/|$)/i.test(url);
}

async function parseJsonResponse(response) {
  const text = await response.text();
  if (!text) return {};

  try {
    return JSON.parse(text);
  } catch {
    return { error: text };
  }
}

export async function POST(request) {
  const tutorUrl = getTutorUrl();

  if (!tutorUrl) {
    return NextResponse.json(
      {
        error:
          "The AI tutor backend URL is missing. Set FASTAPI_AI_TUTOR_URL in your Vercel environment variables to your deployed FastAPI endpoint, for example https://your-fastapi-service.example.com/api/free-ai-tutor.",
      },
      { status: 500 }
    );
  }

  if (process.env.NODE_ENV === "production" && isLocalUrl(tutorUrl)) {
    return NextResponse.json(
      {
        error:
          "FASTAPI_AI_TUTOR_URL points to a local address. In production, set it to the public URL of your deployed FastAPI backend.",
      },
      { status: 500 }
    );
  }

  try {
    const payload = await request.json();

    if (!payload?.topic || !String(payload.topic).trim()) {
      return NextResponse.json(
        { error: "Please enter a topic to learn." },
        { status: 400 }
      );
    }

    const response = await fetch(tutorUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });

    const data = await parseJsonResponse(response);

    if (!response.ok) {
      return NextResponse.json(
        {
          error:
            data?.detail || data?.error || "The AI tutor backend could not respond.",
        },
        { status: response.status }
      );
    }

    return NextResponse.json({
      answer: data?.answer || "No response generated.",
    });
  } catch (error) {
    console.error("Free AI Tutor proxy error:", error?.message || error);
    return NextResponse.json(
      {
        error:
          "The AI tutor backend is unreachable. Confirm the FastAPI service is deployed and that FASTAPI_AI_TUTOR_URL is the public /api/free-ai-tutor endpoint.",
      },
      { status: 502 }
    );
  }
}
