import { NextResponse } from "next/server";

const OPENAI_RESPONSES_URL = "https://api.openai.com/v1/responses";
const OPENAI_MODEL = "gpt-4.1-mini";
const FRIENDLY_ERROR = "The AI tutor service is currently unavailable. Please try again shortly.";

const SYSTEM_PROMPT = `You are LuxTutor, a warm, practical AI tutor for LuxDevHQ learners.
Create clear, beginner-friendly learning help for Python, web development, FastAPI concepts, data science, data analytics, data engineering, and AI learners.
Be practical, encouraging, and concise. Prefer structured steps, examples, exercises, checkpoints, and portfolio project suggestions.
Do not claim to enroll students, take payments, or access private LuxDevHQ systems.`;

function buildTutorPrompt(payload) {
  const message = String(payload?.message || payload?.topic || "").trim();
  const format = String(payload?.format || "learning plan").trim();
  const level = String(payload?.level || "Beginner").trim();
  const goal = String(payload?.goal || "Build practical skills").trim();
  const timeCommitment = String(payload?.timeCommitment || "3-5 hours per week").trim();
  const questionsEnabled = Boolean(payload?.questionsEnabled);

  return `Student message: ${message}\nPreferred format: ${format}\nCurrent level: ${level}\nGoal: ${goal}\nWeekly time commitment: ${timeCommitment}\nInclude quiz/checkpoint questions: ${questionsEnabled ? "yes" : "no"}`;
}

function extractOutputText(data) {
  if (typeof data?.output_text === "string" && data.output_text.trim()) {
    return data.output_text.trim();
  }

  const text = data?.output
    ?.flatMap((item) => item?.content || [])
    ?.map((content) => content?.text || "")
    ?.join("\n")
    ?.trim();

  return text || "No response generated.";
}

export async function POST(request) {
  console.info("AI tutor API route reached.");

  const apiKey = process.env.OpenAIKEY;
  console.info("OpenAIKEY configured:", Boolean(apiKey));

  if (!apiKey) {
    return NextResponse.json({ error: MISSING_CONFIG_ERROR }, { status: 500 });
    return NextResponse.json({ error: FRIENDLY_ERROR }, { status: 500 });
  }

  let payload;
  try {
    payload = await request.json();
  } catch {
    console.info("AI tutor request body is not valid JSON.");
    return NextResponse.json({ error: "Please send a valid tutor request." }, { status: 400 });
  }

  const message = String(payload?.message || payload?.topic || "").trim();
  console.info("Message received:", Boolean(message));

  if (!message) {
    console.info("AI tutor request is missing a message.");
    return NextResponse.json({ error: "Please enter a question or topic to learn." }, { status: 400 });
  }

  try {
    const response = await fetch(OPENAI_RESPONSES_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: OPENAI_MODEL,
        instructions: SYSTEM_PROMPT,
        input: buildTutorPrompt(payload),
        max_output_tokens: 1200,
      }),
    });

    if (!response.ok) {
      if (response.status === 401) {
        console.error("OpenAI authentication failed. Check OpenAIKEY in Vercel.");
        return NextResponse.json({ error: FRIENDLY_ERROR }, { status: 401 });
      }

      if (response.status === 403) {
        console.error("OpenAI permission or project access failed. Check OpenAIKEY in Vercel.");
        return NextResponse.json({ error: FRIENDLY_ERROR }, { status: 403 });
      }

      if (response.status === 429) {
        console.error("OpenAI quota or rate limit issue.");
        return NextResponse.json({ error: FRIENDLY_ERROR }, { status: 429 });
      }

      if (response.status >= 500) {
        console.error("OpenAI service/server error with status:", response.status);
        return NextResponse.json({ error: FRIENDLY_ERROR }, { status: 503 });
      }

      console.error("OpenAI tutor request failed with status:", response.status);
      return NextResponse.json({ error: FRIENDLY_ERROR }, { status: 500 });
      console.error("OpenAI tutor request failed with status:", response.status);
      return NextResponse.json({ error: FRIENDLY_ERROR }, { status: 502 });
    }

    const data = await response.json();
    return NextResponse.json({ answer: extractOutputText(data) });
  } catch (error) {
    console.error("AI tutor serverless error:", error?.message || "Unknown OpenAI request error");
    return NextResponse.json({ error: FRIENDLY_ERROR }, { status: 500 });
    return NextResponse.json({ error: FRIENDLY_ERROR }, { status: 502 });
  }
}
