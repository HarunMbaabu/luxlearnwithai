import Link from "next/link";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { ArrowRight, BookOpen, CalendarDays, GraduationCap, LogOut, Sparkles, UserCircle } from "lucide-react";

import Header from "../components/header";
import Footer from "../components/footer";
import { Button } from "@/components/ui/button";
import { AUTH_COOKIE_NAME, verifySessionCookie } from "@/lib/auth-session";

export const metadata = {
  title: "Dashboard - LuxDevHQ",
  description: "Your LuxDevHQ learning dashboard.",
};

export default async function DashboardPage() {
  const cookieStore = await cookies();
  const session = verifySessionCookie(cookieStore.get(AUTH_COOKIE_NAME)?.value);

  if (!session) {
    redirect("/login");
  }

  const cards = [
    {
      title: "Continue enrollment",
      description: "Complete your program selection and get ready for the August 2026 intake.",
      href: "/pricing",
      icon: GraduationCap,
    },
    {
      title: "Explore Ask AI",
      description: "Use LuxTutor to plan lessons, ask questions, and practice data skills.",
      href: "/free-ai-tutor",
      icon: Sparkles,
    },
    {
      title: "View curriculum",
      description: "Review the data analytics, AI, and engineering learning paths.",
      href: "/curriculum",
      icon: BookOpen,
    },
  ];

  return (
    <div className="min-h-screen bg-slate-50 text-gray-900">
      <Header />
      <main className="pt-32 pb-20 px-4">
        <section className="container mx-auto max-w-6xl">
          <div className="rounded-3xl bg-blue-900 p-8 text-white shadow-xl md:p-10">
            <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
              <div>
                <div className="inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-2 text-sm font-semibold">
                  <UserCircle className="h-4 w-4" />
                  LuxDevHQ account
                </div>
                <h1 className="mt-5 text-4xl font-bold md:text-5xl">Welcome, {session.fullName}</h1>
                <p className="mt-3 max-w-2xl text-blue-100">
                  Your account is active for {session.email}. Use this dashboard to continue your learning journey.
                </p>
              </div>

              <form action="/api/auth/logout" method="post">
                <Button type="submit" variant="secondary" className="rounded-full bg-white text-blue-900 hover:bg-blue-50">
                  <LogOut className="mr-2 h-4 w-4" />
                  Log out
                </Button>
              </form>
            </div>
          </div>

          <div className="mt-8 grid gap-5 md:grid-cols-3">
            {cards.map((card) => {
              const Icon = card.icon;
              return (
                <Link key={card.title} href={card.href} className="group rounded-2xl border border-blue-100 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-lg">
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-900/10 text-blue-900">
                    <Icon className="h-6 w-6" />
                  </div>
                  <h2 className="mt-5 text-xl font-bold text-blue-900">{card.title}</h2>
                  <p className="mt-2 text-sm leading-6 text-gray-600">{card.description}</p>
                  <div className="mt-5 inline-flex items-center text-sm font-semibold text-blue-900">
                    Open <ArrowRight className="ml-2 h-4 w-4 transition group-hover:translate-x-1" />
                  </div>
                </Link>
              );
            })}
          </div>

          <div className="mt-8 rounded-2xl border border-blue-100 bg-white p-6 shadow-sm">
            <div className="flex items-start gap-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-amber-100 text-amber-700">
                <CalendarDays className="h-6 w-6" />
              </div>
              <div>
                <h2 className="text-xl font-bold text-gray-900">Next step</h2>
                <p className="mt-2 text-gray-600">
                  Watch for intake updates and complete payment or enrollment steps when you are ready.
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
