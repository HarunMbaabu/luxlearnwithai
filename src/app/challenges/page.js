import { ArrowRight, BarChart3, Database, Lightbulb } from "lucide-react";
import Link from "next/link";
import Header from "../components/header";
import Footer from "../components/footer";

export const metadata = {
  title: "Challenges | LuxDevHQ",
  description: "Build practical data skills with upcoming LuxDevHQ challenges.",
};

export default function ChallengesPage() {
  return (
    <div className="min-h-screen bg-white text-gray-900">
      <Header />
      <main className="px-4 pb-20 pt-36">
        <section className="mx-auto max-w-5xl text-center">
          <span className="inline-flex rounded-full bg-blue-50 px-4 py-2 text-sm font-semibold text-blue-900">LuxDevHQ Challenges</span>
          <h1 className="mt-6 text-4xl font-bold tracking-tight text-blue-950 md:text-5xl">Learn by solving real data problems</h1>
          <p className="mx-auto mt-5 max-w-2xl text-lg leading-8 text-gray-600">Put your skills into practice through guided, portfolio-ready challenges. New challenges are being prepared for the LuxDevHQ community.</p>
        </section>

        <section aria-label="Challenge topics" className="mx-auto mt-14 grid max-w-5xl gap-6 md:grid-cols-3">
          {[
            [BarChart3, "Data Analytics", "Turn raw datasets into clear insights and compelling visual stories."],
            [Database, "Data Engineering", "Design reliable pipelines and prepare data for meaningful use."],
            [Lightbulb, "Applied AI", "Explore practical ways to solve everyday problems with AI."],
          ].map(([Icon, title, description]) => (
            <article key={title} className="rounded-2xl border border-blue-100 bg-slate-50 p-6 shadow-sm">
              <div className="mb-5 inline-flex rounded-xl bg-blue-900 p-3 text-white"><Icon className="h-6 w-6" aria-hidden="true" /></div>
              <h2 className="text-xl font-bold text-blue-950">{title}</h2>
              <p className="mt-3 leading-7 text-gray-600">{description}</p>
            </article>
          ))}
        </section>

        <section className="mx-auto mt-14 max-w-5xl rounded-2xl bg-blue-950 px-6 py-10 text-center text-white md:px-12">
          <h2 className="text-2xl font-bold">Get ready for the first challenge</h2>
          <p className="mx-auto mt-3 max-w-2xl text-blue-100">Explore the curriculum while we prepare the next hands-on learning opportunity.</p>
          <Link href="/curriculum" className="mt-6 inline-flex items-center gap-2 rounded-lg bg-white px-5 py-3 font-semibold text-blue-950 transition-colors hover:bg-blue-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-blue-950">Explore Program <ArrowRight className="h-4 w-4" aria-hidden="true" /></Link>
        </section>
      </main>
      <Footer />
    </div>
  );
}
