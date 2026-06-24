import { NextResponse } from "next/server";

const FASTAPI_AI_TUTOR_URL =
  process.env.FASTAPI_AI_TUTOR_URL || "http://127.0.0.1:8000/api/free-ai-tutor";

function getOpenAIKey() {
  return (process.env.OPENAI_API_KEY || process.env.OpenAIKEY || "").trim();
}

export async function POST(request) {
  try {
    const payload = await request.json();

    if (!payload?.topic || !String(payload.topic).trim()) {
      return NextResponse.json(
        { error: "Please enter a topic to learn." },
        { status: 400 }
      );
    }

    const openAIKey = getOpenAIKey();

    if (!openAIKey) {
      return NextResponse.json(
        {
          error:
            "The AI tutor is not configured yet. Add OPENAI_API_KEY to your .env file.",
        },
        { status: 500 }
      );
    }

    const learnerContext = questionsEnabled
      ? `Learner level: ${level || "beginner"}. Goal: ${goal || "learn the topic well"}. Weekly time: ${timeCommitment || "3-5 hours"}.`
      : "Learner wants a quick starter plan without extra profiling questions.";

    const prompt = `Build a ${format || "course"} for: ${topic}.
${learnerContext}
Use this format:
1. Friendly overview
2. Personalized roadmap
3. First 5 lessons with practice tasks
4. Mini project
5. Quiz checkpoints
6. What to ask the tutor next`;

    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${openAIKey}`,
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
