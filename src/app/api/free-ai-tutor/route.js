import { NextResponse } from "next/server";

const SYSTEM_PROMPT = `You are LuxTutor, a warm, practical AI tutor for LuxDevHQ learners.
Create concise, motivating learning help with examples, checkpoints, and next actions.
When asked for a course, return structured lessons, exercises, projects, and resources.
Do not claim to be a human. Keep answers safe and age-appropriate.`;

export async function POST(request) {
  try {
    const { topic, format, level, goal, timeCommitment, questionsEnabled } =
      await request.json();

    if (!topic || !String(topic).trim()) {
      return NextResponse.json(
        { error: "Please enter a topic to learn." },
        { status: 400 }
      );
    }

    if (!process.env.OpenAIKEY) {
      return NextResponse.json(
        {
          error:
            "The AI tutor is not configured yet. Add OpenAIKEY to your .env file.",
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
        Authorization: `Bearer ${process.env.OpenAIKEY}`,
      },
      body: JSON.stringify({
        model: "gpt-4o-mini",
        messages: [
          { role: "system", content: SYSTEM_PROMPT },
          { role: "user", content: prompt },
        ],
        temperature: 0.75,
        max_tokens: 1200,
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      return NextResponse.json(
        { error: data?.error?.message || "The AI tutor could not respond." },
        { status: response.status }
      );
    }

    return NextResponse.json({
      answer: data?.choices?.[0]?.message?.content || "No response generated.",
    });
  } catch (error) {
    console.error("Free AI Tutor error:", error);
    return NextResponse.json(
      { error: "Something went wrong while contacting the AI tutor." },
      { status: 500 }
    );
  }
}
