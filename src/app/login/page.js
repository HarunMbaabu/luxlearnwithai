"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { ArrowRight, CheckCircle2, DatabaseZap, GraduationCap, Loader2, LockKeyhole, ShieldCheck, Sparkles } from "lucide-react";

import Header from "../components/header";
import Footer from "../components/footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function LoginPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [status, setStatus] = useState({ type: "idle", message: "" });

  async function handleSubmit(event) {
    event.preventDefault();
    setStatus({ type: "loading", message: "Checking your secure LuxDevHQ account..." });

    try {
      const response = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      const result = await response.json();

      if (!response.ok) {
        setStatus({ type: "error", message: result.error || "Login failed. Please check your details and try again." });
        return;
      }

      setStatus({ type: "success", message: `Welcome back, ${result.user.fullName}. Opening your dashboard...` });
      router.push("/dashboard");
      router.refresh();
    } catch {
      setStatus({ type: "error", message: "Network error. Please check your connection and try again." });
    }
  }

  const isLoading = status.type === "loading";

  return (
    <div className="min-h-screen bg-[radial-gradient(circle_at_top_left,#dbeafe,transparent_35%),linear-gradient(135deg,#ffffff_0%,#f8fbff_45%,#eef6ff_100%)] text-gray-900">
      <Header />
      <main className="pt-32 pb-20 px-4">
        <section className="container mx-auto grid max-w-6xl items-center gap-10 lg:grid-cols-[1.05fr_440px]">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full bg-blue-900/10 px-4 py-2 text-sm font-semibold text-blue-900 ring-1 ring-blue-900/10">
              <ShieldCheck className="h-4 w-4" />
              Secure student access
            </div>
            <h1 className="mt-6 text-4xl font-bold leading-tight text-blue-950 md:text-6xl">
              Log in and continue your <span className="text-blue-700">AI learning journey</span>.
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-8 text-gray-600">
              Your login uses the same PostgreSQL database connection that powers LuxDevHQ applications, so your account access stays aligned with the platform records.
            </p>
            <div className="mt-8 grid gap-4 sm:grid-cols-3">
              {[
                { title: "Protected session", icon: LockKeyhole },
                { title: "Shared app DB", icon: DatabaseZap },
                { title: "Fast dashboard", icon: Sparkles },
              ].map((item) => {
                const Icon = item.icon;
                return (
                  <div key={item.title} className="rounded-2xl border border-blue-100 bg-white/80 p-4 shadow-sm backdrop-blur">
                    <Icon className="h-6 w-6 text-blue-800" />
                    <p className="mt-3 font-semibold text-blue-950">{item.title}</p>
                  </div>
                );
              })}
            </div>
          </div>

          <form onSubmit={handleSubmit} className="rounded-[2rem] border border-blue-100 bg-white p-7 shadow-2xl shadow-blue-900/10">
            <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-blue-900 text-white shadow-lg shadow-blue-900/20">
              <GraduationCap className="h-7 w-7" />
            </div>
            <h2 className="mt-6 text-3xl font-bold text-blue-950">Welcome back</h2>
            <p className="mt-2 text-sm leading-6 text-gray-600">Use the email and password you created on the Get Started page.</p>

            <div className="mt-6 space-y-4">
              <div>
                <Label htmlFor="email">Email address</Label>
                <Input id="email" type="email" autoComplete="email" required disabled={isLoading} value={formData.email} onChange={(event) => setFormData({ ...formData, email: event.target.value })} placeholder="you@example.com" />
              </div>
              <div>
                <Label htmlFor="password">Password</Label>
                <Input id="password" type="password" autoComplete="current-password" required disabled={isLoading} value={formData.password} onChange={(event) => setFormData({ ...formData, password: event.target.value })} placeholder="Your password" />
              </div>
            </div>

            {status.message && (
              <div className={`mt-5 flex items-start gap-2 rounded-xl p-3 text-sm ${status.type === "error" ? "bg-red-50 text-red-700" : status.type === "success" ? "bg-emerald-50 text-emerald-700" : "bg-blue-50 text-blue-900"}`}>
                {status.type === "success" && <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0" />}
                <span>{status.message}</span>
              </div>
            )}

            <Button type="submit" disabled={isLoading} className="mt-6 w-full rounded-full bg-blue-900 py-6 text-base hover:bg-blue-800">
              {isLoading ? <Loader2 className="mr-2 h-5 w-5 animate-spin" /> : <ArrowRight className="mr-2 h-5 w-5" />}
              {isLoading ? "Logging in" : "Log in to dashboard"}
            </Button>
            <p className="mt-4 text-center text-sm text-gray-600">
              New to LuxDevHQ? <Link href="/get-started" className="font-semibold text-blue-900 hover:underline">Create an account</Link>
            </p>
          </form>
        </section>
      </main>
      <Footer />
    </div>
  );
}
