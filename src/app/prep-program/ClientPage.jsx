import Link from "next/link";
import {
  BarChart3,
  Calendar,
  CheckCircle2,
  Clock,
  Code,
  Database,
  GraduationCap,
  Users,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Header from "../components/header";

const prepPrograms = [
  {
    title: "Power BI Prep Class",
    icon: BarChart3,
    accent: "bg-blue-100 text-blue-700",
    description:
      "Build dashboarding, data visualization, and reporting foundations before moving into advanced analytics projects.",
  },
  {
    title: "Python Prep Class",
    icon: Code,
    accent: "bg-green-100 text-green-700",
    description:
      "Learn practical Python basics for data work, automation, problem solving, and future Data Science learning.",
  },
  {
    title: "SQL Prep Class",
    icon: Database,
    accent: "bg-purple-100 text-purple-700",
    description:
      "Strengthen querying, filtering, joins, and database thinking for analytics and engineering pathways.",
  },
];

const programDetails = [
  ["Duration", "5 weeks"],
  ["Start Date", "3rd August 2026"],
  ["Cost", "KSh 5,500 per program"],
  ["Payment", "Each program is paid for separately"],
  ["Classes", "2 classes per week"],
];

const scheduleOptions = [
  ["Morning class", "5:00 AM – 6:30 AM"],
  ["Evening class", "8:00 PM – 10:00 PM"],
];

const audience = [
  "Beginners who want to learn Power BI, Python, or SQL",
  "Students preparing for Data Analytics, Data Science, or Data Engineering programs",
  "Learners who want structured revision and practical exercises",
  "Professionals who want to strengthen their technical foundation",
];

export default function PrepProgramPage() {
  return (
    <div className="min-h-screen bg-white text-gray-900">
      <Header />

      <main>
        <section className="relative overflow-hidden bg-gradient-to-br from-slate-950 via-blue-950 to-slate-900 pt-36 pb-20 text-white md:pt-44 md:pb-28">
          <div className="absolute inset-0 bg-[url('/homeimage.png')] bg-cover bg-center opacity-10" />
          <div className="absolute -left-24 top-20 h-72 w-72 rounded-full bg-blue-500/20 blur-3xl" />
          <div className="absolute -right-24 bottom-10 h-72 w-72 rounded-full bg-cyan-400/20 blur-3xl" />

          <div className="container relative z-10 mx-auto px-4 md:px-6">
            <div className="mx-auto max-w-4xl text-center">
              <Badge className="mb-6 bg-blue-600 px-4 py-2 text-sm text-white hover:bg-blue-700">
                Foundational classes for August 2026
              </Badge>
              <h1 className="mb-6 text-4xl font-bold leading-tight md:text-6xl">
                LuxDevHQ Prep Program
              </h1>
              <p className="mx-auto max-w-3xl text-lg leading-8 text-slate-200 md:text-xl">
                The Prep Program is designed to help learners build practical foundations in Power BI, Python, and SQL before progressing into more advanced data programs.
              </p>
              <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
                <Button asChild size="lg" className="bg-blue-600 px-8 py-6 text-base hover:bg-blue-700">
                  <Link href="/get-started">Register for the Prep Program</Link>
                </Button>
                <div className="flex items-center gap-2 text-sm text-slate-300">
                  <Calendar className="h-4 w-4 text-blue-300" />
                  Starts 3rd August 2026
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="bg-gray-50 py-20">
          <div className="container mx-auto px-4 md:px-6">
            <div className="mx-auto mb-12 max-w-3xl text-center">
              <span className="font-bold uppercase tracking-wider text-blue-700">Prep classes</span>
              <h2 className="mt-3 text-3xl font-bold text-gray-950 md:text-5xl">Choose the foundation you need</h2>
              <p className="mt-4 text-lg text-gray-600">
                Join one prep class or take multiple programs based on your learning goals. Each class focuses on practical exercises and confidence-building fundamentals.
              </p>
            </div>

            <div className="grid gap-8 lg:grid-cols-3">
              {prepPrograms.map(({ title, icon: Icon, accent, description }) => (
                <Card key={title} className="flex h-full flex-col border-blue-100 shadow-sm transition hover:-translate-y-1 hover:shadow-lg">
                  <CardHeader>
                    <div className={`mb-5 flex h-14 w-14 items-center justify-center rounded-2xl ${accent}`}>
                      <Icon className="h-7 w-7" />
                    </div>
                    <CardTitle className="text-2xl text-gray-950">{title}</CardTitle>
                    <p className="pt-2 text-gray-600">{description}</p>
                  </CardHeader>
                  <CardContent className="flex flex-1 flex-col gap-6">
                    <div className="space-y-3">
                      {programDetails.map(([label, value]) => (
                        <div key={label} className="flex gap-3 rounded-lg bg-gray-50 p-3 text-sm">
                          <CheckCircle2 className="mt-0.5 h-4 w-4 flex-none text-blue-700" />
                          <p><span className="font-semibold text-gray-950">{label}:</span> {value}</p>
                        </div>
                      ))}
                    </div>
                    <div className="rounded-xl border border-blue-100 bg-blue-50 p-4">
                      <div className="mb-3 flex items-center gap-2 font-semibold text-blue-950">
                        <Clock className="h-5 w-5" /> Schedule options
                      </div>
                      <div className="space-y-2 text-sm text-blue-950">
                        {scheduleOptions.map(([label, value]) => (
                          <p key={label}><span className="font-semibold">{label}:</span> {value}</p>
                        ))}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            <div className="mt-10 rounded-2xl border border-amber-200 bg-amber-50 p-6 text-center text-amber-950">
              <p className="font-semibold">
                Unless you are a current LuxDevHQ student, each Prep Program costs KSh 5,500. Each program is paid for separately.
              </p>
            </div>
          </div>
        </section>

        <section className="py-20">
          <div className="container mx-auto grid gap-12 px-4 md:px-6 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
            <div>
              <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-blue-100 text-blue-700">
                <Users className="h-8 w-8" />
              </div>
              <h2 className="text-3xl font-bold text-gray-950 md:text-5xl">Who the program is for</h2>
              <p className="mt-5 text-lg leading-8 text-gray-600">
                Prep Program classes are short, structured, and practical for learners who want a stronger technical base before joining or advancing in LuxDevHQ programs.
              </p>
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              {audience.map((item) => (
                <div key={item} className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm">
                  <GraduationCap className="mb-4 h-6 w-6 text-blue-700" />
                  <p className="font-medium leading-7 text-gray-800">{item}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="bg-blue-950 py-20 text-white">
          <div className="container mx-auto px-4 text-center md:px-6">
            <h2 className="text-3xl font-bold md:text-5xl">Ready to build your foundation?</h2>
            <p className="mx-auto mt-5 max-w-2xl text-lg leading-8 text-blue-100">
              Register for the Prep Program and choose the Power BI, Python, or SQL class that best matches your next step.
            </p>
            <Button asChild size="lg" className="mt-9 bg-white px-8 py-6 text-base text-blue-950 hover:bg-blue-50">
              <Link href="/get-started">Register for the Prep Program</Link>
            </Button>
          </div>
        </section>
      </main>
    </div>
  );
}
