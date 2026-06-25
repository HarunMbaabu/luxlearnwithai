# LuxDevHQ

This is a [Next.js](https://nextjs.org) project deployed on Vercel.

## Getting Started

Run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser.

## AI Tutor on Vercel

The free AI tutor runs through a Next.js serverless API route at `/api/ai-tutor`. The React frontend posts the student's message to this internal route, and the route calls OpenAI from the server side. The browser never calls OpenAI directly.

### Required Vercel Environment Variable

Add this variable in **Vercel Project Settings → Environment Variables**:

```env
OpenAIKEY=your_openai_api_key_here
```

After adding or changing `OpenAIKEY`, redeploy the Vercel project so the serverless function receives the updated environment variable.

Do **not** put the OpenAI key in frontend `.env` files with `VITE_`, `REACT_APP_`, or `NEXT_PUBLIC_`. The key must only be accessed by the serverless API route with `process.env.OpenAIKEY`.

## Deploy on Vercel

Deploy the project with Vercel after configuring the required environment variables. The AI tutor does not require a separate FastAPI backend or `FASTAPI_AI_TUTOR_URL`.
