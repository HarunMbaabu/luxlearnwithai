"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import Header from "../components/header";
import {
  BookOpen,
  BrainCircuit,
  CheckCircle2,
  Compass,
  FileText,
  Layers3,
  Loader2,
  Map,
  Rocket,
  Send,
  Sparkles,
  Stars,
  Target,
  Wand2,
} from "lucide-react";

const formats = [
  { id: "course", label: "Course", icon: BookOpen, accent: "from-blue-500 to-indigo-600" },
  { id: "guide", label: "Guide", icon: FileText, accent: "from-emerald-500 to-teal-600" },
  { id: "roadmap", label: "Roadmap", icon: Map, accent: "from-fuchsia-500 to-pink-600" },
];

const starters = [
  "Python for data analysis",
  "Machine learning basics",
  "Excel to Power BI",
  "Prompt engineering",
];

export default function FreeAITutorPage() {
  const [topic, setTopic] = useState("");
  const [format, setFormat] = useState("course");
  const [questionsEnabled, setQuestionsEnabled] = useState(false);
  const [level, setLevel] = useState("Beginner");
  const [goal, setGoal] = useState("Build practical skills for a portfolio project");
  const [timeCommitment, setTimeCommitment] = useState("3-5 hours per week");
  const [answer, setAnswer] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const selectedFormat = useMemo(
    () => formats.find((item) => item.id === format) || formats[0],
    [format]
  );
  const SelectedFormatIcon = selectedFormat.icon;

  const generatePlan = async () => {
    if (!topic.trim()) {
      setError("Tell LuxTutor what you want to learn first.");
      return;
    }

    setIsLoading(true);
    setError("");
    setAnswer("");

    try {
      const response = await fetch("/api/free-ai-tutor", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          topic,
          format,
          level,
          goal,
          timeCommitment,
          questionsEnabled,
        }),
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data?.error || "Unable to generate your plan.");
      setAnswer(data.answer);
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen overflow-hidden bg-[#f4f7fb] text-slate-950">
      <Header />
      <main className="relative pt-28">
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_20%_10%,rgba(59,130,246,0.22),transparent_34%),radial-gradient(circle_at_82%_18%,rgba(168,85,247,0.18),transparent_30%),linear-gradient(135deg,#f8fbff_0%,#eef3f9_55%,#f8fafc_100%)]" />
        <aside className="fixed left-0 top-24 z-20 hidden h-[calc(100vh-6rem)] w-64 border-r border-white/70 bg-white/80 p-5 shadow-2xl shadow-blue-950/5 backdrop-blur-xl xl:block">
          <Link href="/" className="mb-8 flex items-center gap-3">
            <div className="grid h-11 w-11 place-items-center rounded-2xl bg-slate-950 text-white shadow-lg">
              <BrainCircuit className="h-6 w-6" />
            </div>
            <div>
              <p className="font-black">AI Tutor</p>
              <p className="text-xs text-slate-500">by LuxDevHQ</p>
            </div>
          </Link>
          <p className="mb-6 text-sm leading-6 text-slate-500">Your personalized learning companion for any topic.</p>
          <nav className="space-y-2 text-sm">
            {["Plan", "Course", "Guide", "Roadmap", "Quiz"].map((item, index) => (
              <a key={item} href="#generator" className={`flex items-center gap-3 rounded-2xl px-4 py-3 ${index === 1 ? "bg-slate-950 text-white" : "text-slate-600 hover:bg-slate-100"}`}>
                {index === 0 ? <Sparkles className="h-4 w-4" /> : <Compass className="h-4 w-4" />}
                {item}
              </a>
            ))}
          </nav>
        </aside>

        <section className="mx-auto grid max-w-7xl gap-10 px-4 pb-20 xl:ml-64 xl:grid-cols-[1.05fr_0.95fr] xl:px-10">
          <div className="pt-10 lg:pt-20">
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-blue-200 bg-white/80 px-4 py-2 text-sm font-semibold text-blue-900 shadow-sm">
              <Stars className="h-4 w-4" /> Free AI Tutor for every learner
            </div>
            <h1 className="max-w-3xl text-5xl font-black tracking-tight text-slate-950 md:text-7xl">
              What can I help you <span className="bg-gradient-to-r from-blue-700 via-indigo-600 to-fuchsia-600 bg-clip-text text-transparent">learn?</span>
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-600">
              Generate a beautiful course, quick guide, or career roadmap in seconds. LuxTutor adapts to your level, your time, and your dream outcome.
            </p>
            <div className="mt-8 grid max-w-2xl gap-4 sm:grid-cols-3">
              {["Adaptive lessons", "Practice tasks", "Portfolio projects"].map((item) => (
                <div key={item} className="rounded-3xl border border-white bg-white/70 p-4 shadow-sm backdrop-blur">
                  <CheckCircle2 className="mb-3 h-5 w-5 text-blue-700" />
                  <p className="font-bold">{item}</p>
                </div>
              ))}
            </div>
          </div>

          <div id="generator" className="relative rounded-[2rem] border border-white/80 bg-white/80 p-4 shadow-2xl shadow-blue-950/10 backdrop-blur-xl md:p-7">
            <div className={`absolute -top-6 right-8 rounded-3xl bg-gradient-to-r ${selectedFormat.accent} p-4 text-white shadow-xl`}>
              <SelectedFormatIcon className="h-7 w-7" />
            </div>
            <div className="mb-6">
              <p className="text-sm font-bold uppercase tracking-[0.25em] text-blue-800">Create with AI</p>
              <h2 className="mt-2 text-3xl font-black">Personal learning studio</h2>
            </div>

            <label className="text-sm font-bold text-slate-600">What can I help you learn?</label>
            <div className="mt-2 flex overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-inner">
              <input value={topic} onChange={(e) => setTopic(e.target.value)} onKeyDown={(e) => e.key === "Enter" && generatePlan()} placeholder="Enter a topic" className="min-h-14 flex-1 px-5 outline-none" />
              <button onClick={generatePlan} disabled={isLoading} className="m-2 inline-flex items-center gap-2 rounded-xl bg-slate-950 px-5 font-bold text-white disabled:opacity-60">
                {isLoading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Send className="h-4 w-4" />} Generate
              </button>
            </div>

            <div className="mt-3 flex flex-wrap gap-2">
              {starters.map((starter) => (
                <button key={starter} onClick={() => setTopic(starter)} className="rounded-full bg-blue-50 px-3 py-1 text-xs font-semibold text-blue-800 hover:bg-blue-100">{starter}</button>
              ))}
            </div>

            <p className="mt-6 text-sm font-bold text-slate-600">Choose the format</p>
            <div className="mt-3 grid grid-cols-3 gap-3">
              {formats.map((item) => {
                const Icon = item.icon;
                return (
                  <button key={item.id} onClick={() => setFormat(item.id)} className={`rounded-3xl border p-5 text-center transition ${format === item.id ? "border-slate-950 bg-white shadow-lg" : "border-slate-100 bg-slate-50 hover:bg-white"}`}>
                    <Icon className="mx-auto mb-3 h-6 w-6" />
                    <span className="font-bold">{item.label}</span>
                  </button>
                );
              })}
            </div>

            <label className="mt-5 flex cursor-pointer items-center gap-3 rounded-2xl border border-slate-100 bg-white p-4 text-sm font-semibold">
              <input type="checkbox" checked={questionsEnabled} onChange={(e) => setQuestionsEnabled(e.target.checked)} />
              Answer a few questions for a better {format}
            </label>

            {questionsEnabled && (
              <div className="mt-4 grid gap-3 rounded-3xl bg-slate-950 p-4 text-white">
                <select value={level} onChange={(e) => setLevel(e.target.value)} className="rounded-xl bg-white/10 p-3 outline-none"><option>Beginner</option><option>Intermediate</option><option>Advanced</option></select>
                <input value={goal} onChange={(e) => setGoal(e.target.value)} className="rounded-xl bg-white/10 p-3 outline-none" />
                <input value={timeCommitment} onChange={(e) => setTimeCommitment(e.target.value)} className="rounded-xl bg-white/10 p-3 outline-none" />
              </div>
            )}

            {error && <div className="mt-5 rounded-2xl border border-red-200 bg-red-50 p-4 text-sm font-semibold text-red-700">{error}</div>}
            {answer && <pre className="mt-5 max-h-[32rem] overflow-auto whitespace-pre-wrap rounded-3xl bg-slate-950 p-5 text-sm leading-7 text-slate-100 shadow-inner">{answer}</pre>}
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-4 pb-20 xl:ml-64 xl:px-10">
          <div className="grid gap-4 md:grid-cols-4">
            {[{ icon: Wand2, title: "Lesson designer" }, { icon: Target, title: "Goal tracker" }, { icon: Layers3, title: "Skill stacks" }, { icon: Rocket, title: "Project launchpad" }].map(({ icon: Icon, title }) => (
              <div key={title} className="rounded-[2rem] border border-white bg-white/70 p-6 shadow-lg shadow-blue-950/5">
                <Icon className="mb-5 h-7 w-7 text-blue-700" />
                <h3 className="text-lg font-black">{title}</h3>
                <p className="mt-2 text-sm leading-6 text-slate-500">A creative workspace that turns curiosity into structured, practical learning.</p>
              </div>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}
