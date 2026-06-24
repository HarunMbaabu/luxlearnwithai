import { NextResponse } from "next/server";

const FASTAPI_AI_TUTOR_URL =
  process.env.FASTAPI_AI_TUTOR_URL || "http://127.0.0.1:8000/api/free-ai-tutor";

export async function POST(request) {
  try {
    const payload = await request.json();

    if (!payload?.topic || !String(payload.topic).trim()) {
      return NextResponse.json(
        { error: "Please enter a topic to learn." },
        { status: 400 }
      );
    }

    const response = await fetch(FASTAPI_AI_TUTOR_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });

    const data = await response.json();

    if (!response.ok) {
      return NextResponse.json(
        {
          error:
            data?.detail || data?.error || "The AI tutor could not respond.",
        },
        { status: response.status }
      );
    }

    return NextResponse.json({
      answer: data?.answer || "No response generated.",
    });
  } catch (error) {
    console.error("Free AI Tutor proxy error:", error);
    return NextResponse.json(
      {
        error:
          "The AI tutor service is unavailable. Make sure the FastAPI backend is running and FASTAPI_AI_TUTOR_URL is configured.",
      },
      { status: 502 }
    );
  }
}
