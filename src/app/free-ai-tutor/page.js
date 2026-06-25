"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import Header from "../components/header";
import {
  BookOpen,
  BrainCircuit,
  CheckCircle2,
  ChevronRight,
  Clock3,
  Compass,
  FileText,
  GraduationCap,
  Layers3,
  Loader2,
  Map,
  Menu,
  Rocket,
  Send,
  Sparkles,
  Stars,
  Target,
  Wand2,
  X,
  Zap,
} from "lucide-react";

const formats = [
  {
    id: "course",
    label: "Course",
    helper: "Lessons, tasks, milestones",
    icon: BookOpen,
    accent: "from-blue-500 to-indigo-600",
  },
  {
    id: "guide",
    label: "Guide",
    helper: "Concepts, examples, shortcuts",
    icon: FileText,
    accent: "from-emerald-500 to-teal-600",
  },
  {
    id: "roadmap",
    label: "Roadmap",
    helper: "Weeks, projects, career steps",
    icon: Map,
    accent: "from-fuchsia-500 to-pink-600",
  },
];

const starters = [
  "Python for data analysis",
  "FastAPI for beginners",
  "Data engineering roadmap",
  "Machine learning basics",
  "Excel to Power BI",
  "Prompt engineering",
];

const benefits = [
  { icon: CheckCircle2, title: "Adaptive lessons", copy: "Plans match your level, goal, and weekly schedule." },
  { icon: Target, title: "Practice-first", copy: "Every response pushes you toward hands-on tasks." },
  { icon: Rocket, title: "Portfolio ready", copy: "Turn topics into projects you can publish on GitHub." },
];

const studioCards = [
  { icon: Wand2, title: "Lesson designer", copy: "Instantly shape a topic into modules, labs, and checkpoints." },
  { icon: Clock3, title: "Study rhythm", copy: "Choose your weekly time and get a practical plan you can follow." },
  { icon: Layers3, title: "Skill stacks", copy: "Connect Python, FastAPI, analytics, AI, and engineering skills." },
  { icon: GraduationCap, title: "Career lift", copy: "Practice interview-ready explanations and portfolio stories." },
];

const navItems = ["Plan", "Course", "Guide", "Roadmap", "Quiz"];

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
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const selectedFormat = useMemo(
    () => formats.find((item) => item.id === format) || formats[0],
    [format]
  );
  const SelectedFormatIcon = selectedFormat.icon;

  const answerSections = useMemo(
    () =>
      answer
        .split("\n")
        .map((line) => line.trim())
        .filter(Boolean),
    [answer]
  );

  const generatePlan = async () => {
    if (!topic.trim()) {
      setError("Tell LuxTutor what you want to learn first.");
      return;
    }

    setIsLoading(true);
    setError("");
    setAnswer("");

    try {
      const response = await fetch("/api/ai-tutor", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          message: topic,
          topic,
          format,
          level,
          goal,
          timeCommitment,
          questionsEnabled,
        }),
      });
      const data = await response.json();
      if (!response.ok) {
        throw new Error(
          data?.error || "The AI tutor service is currently unavailable. Please try again shortly."
        );
      }
      setAnswer(data.answer);
    } catch (err) {
      setError(err.message || "The AI tutor service is currently unavailable. Please try again shortly.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen overflow-hidden bg-[#f4f7fb] text-slate-950">
      <Header hideRegistrationBanner />
      <main className="relative pt-24 sm:pt-28">
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_15%_8%,rgba(37,99,235,0.24),transparent_30%),radial-gradient(circle_at_88%_12%,rgba(217,70,239,0.18),transparent_28%),linear-gradient(135deg,#f8fbff_0%,#eef3f9_55%,#f8fafc_100%)]" />
        <div className="absolute left-1/2 top-32 -z-10 h-72 w-72 -translate-x-1/2 rounded-full bg-blue-300/20 blur-3xl" />

        <button
          onClick={() => setMobileMenuOpen(true)}
          className="fixed bottom-5 left-5 z-40 inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-slate-950 text-white shadow-2xl shadow-slate-950/30 xl:hidden"
          aria-label="Open tutor navigation"
        >
          <Menu className="h-5 w-5" />
        </button>

        {mobileMenuOpen && (
          <div className="fixed inset-0 z-50 bg-slate-950/40 backdrop-blur-sm xl:hidden">
            <aside className="h-full w-[min(20rem,86vw)] bg-white p-5 shadow-2xl">
              <div className="mb-8 flex items-center justify-between">
                <TutorBrand />
                <button
                  onClick={() => setMobileMenuOpen(false)}
                  className="grid h-10 w-10 place-items-center rounded-full bg-slate-100"
                  aria-label="Close tutor navigation"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>
              <TutorNav />
            </aside>
          </div>
        )}

        <aside className="fixed left-0 top-24 z-20 hidden h-[calc(100vh-6rem)] w-72 border-r border-white/70 bg-white/80 p-5 shadow-2xl shadow-blue-950/5 backdrop-blur-xl xl:block">
          <TutorBrand />
          <p className="mb-6 mt-8 text-sm leading-6 text-slate-500">
            Your personalized learning companion for Python, FastAPI, AI, data science, and data engineering.
          </p>
          <TutorNav />
        </aside>

        <section className="mx-auto grid max-w-7xl gap-8 px-4 pb-12 sm:px-6 lg:gap-10 xl:ml-72 xl:grid-cols-[0.9fr_1.1fr] xl:px-10">
          <div className="pt-4 sm:pt-10 lg:pt-16">
            <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-blue-200 bg-white/80 px-4 py-2 text-xs font-black uppercase tracking-[0.16em] text-blue-900 shadow-sm backdrop-blur sm:text-sm">
              <Stars className="h-4 w-4" /> Free AI Tutor for every learner
            </div>
            <h1 className="max-w-3xl text-4xl font-black tracking-[-0.06em] text-slate-950 sm:text-6xl lg:text-7xl">
              Build your next skill with an AI learning studio.
            </h1>
            <p className="mt-5 max-w-2xl text-base leading-7 text-slate-600 sm:text-lg sm:leading-8">
              Generate beautiful courses, quick guides, roadmaps, and portfolio projects in seconds. LuxTutor adapts to your level, your time, and your career outcome.
            </p>

            <div className="mt-6 grid max-w-2xl gap-3 sm:grid-cols-3">
              {benefits.map(({ icon: Icon, title, copy }) => (
                <div key={title} className="rounded-[1.6rem] border border-white bg-white/75 p-4 shadow-sm backdrop-blur">
                  <Icon className="mb-3 h-5 w-5 text-blue-700" />
                  <p className="font-black text-slate-950">{title}</p>
                  <p className="mt-1 text-xs leading-5 text-slate-500">{copy}</p>
                </div>
              ))}
            </div>
          </div>

          <div id="generator" className="relative rounded-[2rem] border border-white/80 bg-white/85 p-4 shadow-2xl shadow-blue-950/10 backdrop-blur-xl sm:rounded-[2.5rem] sm:p-6 md:p-7">
            <div className={`absolute -top-5 right-6 rounded-3xl bg-gradient-to-r ${selectedFormat.accent} p-4 text-white shadow-xl shadow-blue-900/20`}>
              <SelectedFormatIcon className="h-6 w-6 sm:h-7 sm:w-7" />
            </div>
            <div className="mb-6 pr-20">
              <p className="text-xs font-black uppercase tracking-[0.28em] text-blue-800 sm:text-sm">Create with AI</p>
              <h2 className="mt-2 text-2xl font-black tracking-tight sm:text-3xl">Personal learning studio</h2>
              <p className="mt-2 text-sm leading-6 text-slate-500">Tell LuxTutor what you want, then pick the output style.</p>
            </div>

            <label className="text-sm font-bold text-slate-600" htmlFor="topic">
              What can I help you learn?
            </label>
            <div className="mt-2 rounded-3xl border border-slate-200 bg-white p-2 shadow-inner shadow-slate-200/60 sm:flex">
              <textarea
                id="topic"
                value={topic}
                onChange={(event) => setTopic(event.target.value)}
                onKeyDown={(event) => {
                  if ((event.metaKey || event.ctrlKey) && event.key === "Enter") generatePlan();
                }}
                placeholder="Example: Build a FastAPI data engineering project"
                rows={2}
                className="min-h-16 w-full resize-none rounded-2xl px-4 py-3 text-base outline-none placeholder:text-slate-400 sm:flex-1"
              />
              <button
                onClick={generatePlan}
                disabled={isLoading}
                className="mt-2 inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-2xl bg-slate-950 px-5 font-black text-white shadow-lg shadow-slate-950/20 transition hover:-translate-y-0.5 hover:bg-blue-700 disabled:translate-y-0 disabled:cursor-not-allowed disabled:opacity-60 sm:mt-0 sm:w-auto"
              >
                {isLoading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Send className="h-4 w-4" />}
                {isLoading ? "Creating..." : "Generate"}
              </button>
            </div>

            <div className="mt-3 flex gap-2 overflow-x-auto pb-1 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
              {starters.map((starter) => (
                <button
                  key={starter}
                  onClick={() => setTopic(starter)}
                  className="shrink-0 rounded-full bg-blue-50 px-3 py-2 text-xs font-bold text-blue-800 transition hover:bg-blue-100"
                >
                  {starter}
                </button>
              ))}
            </div>

            <p className="mt-6 text-sm font-bold text-slate-600">Choose the format</p>
            <div className="mt-3 grid gap-3 sm:grid-cols-3">
              {formats.map((item) => {
                const Icon = item.icon;
                const isSelected = format === item.id;
                return (
                  <button
                    key={item.id}
                    onClick={() => setFormat(item.id)}
                    className={`group rounded-3xl border p-4 text-left transition sm:p-5 ${
                      isSelected
                        ? "border-slate-950 bg-white shadow-xl shadow-slate-950/10"
                        : "border-slate-100 bg-slate-50/80 hover:-translate-y-0.5 hover:bg-white hover:shadow-lg"
                    }`}
                  >
                    <div className="flex items-center justify-between gap-3 sm:block">
                      <div className={`grid h-11 w-11 place-items-center rounded-2xl bg-gradient-to-r ${item.accent} text-white shadow-lg`}>
                        <Icon className="h-5 w-5" />
                      </div>
                      <ChevronRight className={`h-4 w-4 sm:hidden ${isSelected ? "text-slate-950" : "text-slate-300"}`} />
                    </div>
                    <span className="mt-3 block font-black">{item.label}</span>
                    <span className="mt-1 block text-xs leading-5 text-slate-500">{item.helper}</span>
                  </button>
                );
              })}
            </div>

            <label className="mt-5 flex cursor-pointer items-center justify-between gap-3 rounded-3xl border border-slate-100 bg-white p-4 text-sm font-bold shadow-sm">
              <span className="flex items-center gap-3">
                <span className="grid h-10 w-10 place-items-center rounded-2xl bg-blue-50 text-blue-700">
                  <Sparkles className="h-5 w-5" />
                </span>
                Answer a few questions for a better {format}
              </span>
              <input
                type="checkbox"
                checked={questionsEnabled}
                onChange={(event) => setQuestionsEnabled(event.target.checked)}
                className="h-5 w-5 accent-blue-700"
              />
            </label>

            {questionsEnabled && (
              <div className="mt-4 grid gap-3 rounded-3xl bg-slate-950 p-4 text-white shadow-xl shadow-slate-950/20 sm:grid-cols-3">
                <label className="text-xs font-bold uppercase tracking-[0.18em] text-white/50">
                  Level
                  <select value={level} onChange={(event) => setLevel(event.target.value)} className="mt-2 w-full rounded-2xl bg-white/10 p-3 text-sm text-white outline-none ring-1 ring-white/10">
                    <option className="text-slate-950">Beginner</option>
                    <option className="text-slate-950">Intermediate</option>
                    <option className="text-slate-950">Advanced</option>
                  </select>
                </label>
                <label className="text-xs font-bold uppercase tracking-[0.18em] text-white/50 sm:col-span-2">
                  Goal
                  <input value={goal} onChange={(event) => setGoal(event.target.value)} className="mt-2 w-full rounded-2xl bg-white/10 p-3 text-sm text-white outline-none ring-1 ring-white/10 placeholder:text-white/40" />
                </label>
                <label className="text-xs font-bold uppercase tracking-[0.18em] text-white/50 sm:col-span-3">
                  Weekly time
                  <input value={timeCommitment} onChange={(event) => setTimeCommitment(event.target.value)} className="mt-2 w-full rounded-2xl bg-white/10 p-3 text-sm text-white outline-none ring-1 ring-white/10 placeholder:text-white/40" />
                </label>
              </div>
            )}

            {error && (
              <div className="mt-5 rounded-3xl border border-red-200 bg-red-50 p-4 text-sm font-bold leading-6 text-red-700">
                {error}
              </div>
            )}

            {isLoading && (
              <div className="mt-5 rounded-3xl border border-blue-100 bg-blue-50/70 p-5 text-blue-950">
                <div className="flex items-center gap-3 font-black">
                  <Loader2 className="h-5 w-5 animate-spin" /> LuxTutor is designing your learning plan...
                </div>
                <div className="mt-4 grid gap-3 sm:grid-cols-3">
                  {["Analyzing topic", "Structuring lessons", "Adding projects"].map((item) => (
                    <div key={item} className="h-16 animate-pulse rounded-2xl bg-white/70 p-4 text-sm font-bold text-blue-900/60">
                      {item}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {answer && (
              <section className="mt-5 overflow-hidden rounded-[2rem] border border-slate-200 bg-slate-950 shadow-2xl shadow-slate-950/20">
                <div className="flex flex-col gap-3 border-b border-white/10 bg-white/[0.04] p-4 text-white sm:flex-row sm:items-center sm:justify-between">
                  <div>
                    <p className="text-xs font-black uppercase tracking-[0.22em] text-blue-200">Your generated {format}</p>
                    <h3 className="mt-1 text-xl font-black">{topic}</h3>
                  </div>
                  <div className="inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-2 text-xs font-bold text-white/80">
                    <Zap className="h-4 w-4 text-yellow-300" /> Ready to study
                  </div>
                </div>
                <div className="max-h-[36rem] overflow-auto p-4 sm:p-5">
                  <div className="space-y-3">
                    {answerSections.map((line, index) => (
                      <p key={`${line}-${index}`} className="rounded-2xl bg-white/[0.06] px-4 py-3 text-sm leading-7 text-slate-100 ring-1 ring-white/10">
                        {line}
                      </p>
                    ))}
                  </div>
                </div>
              </section>
            )}
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-4 pb-20 sm:px-6 xl:ml-72 xl:px-10">
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {studioCards.map(({ icon: Icon, title, copy }) => (
              <div key={title} className="rounded-[2rem] border border-white bg-white/75 p-6 shadow-lg shadow-blue-950/5 backdrop-blur transition hover:-translate-y-1 hover:shadow-xl">
                <Icon className="mb-5 h-7 w-7 text-blue-700" />
                <h3 className="text-lg font-black">{title}</h3>
                <p className="mt-2 text-sm leading-6 text-slate-500">{copy}</p>
              </div>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}

function TutorBrand() {
  return (
    <Link href="/" className="flex items-center gap-3">
      <div className="grid h-11 w-11 place-items-center rounded-2xl bg-slate-950 text-white shadow-lg">
        <BrainCircuit className="h-6 w-6" />
      </div>
      <div>
        <p className="font-black">AI Tutor</p>
        <p className="text-xs text-slate-500">by LuxDevHQ</p>
      </div>
    </Link>
  );
}

function TutorNav() {
  return (
    <nav className="space-y-2 text-sm">
      {navItems.map((item, index) => (
        <a
          key={item}
          href="#generator"
          className={`flex items-center gap-3 rounded-2xl px-4 py-3 font-bold transition ${
            index === 1 ? "bg-slate-950 text-white shadow-lg shadow-slate-950/20" : "text-slate-600 hover:bg-slate-100"
          }`}
        >
          {index === 0 ? <Sparkles className="h-4 w-4" /> : <Compass className="h-4 w-4" />}
          {item}
        </a>
      ))}
    </nav>
  );
}
