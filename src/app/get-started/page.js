"use client";

import Link from "next/link";
import { useState } from "react";
import { ArrowRight, CheckCircle2, Loader2, ShieldCheck } from "lucide-react";

import Header from "../components/header";
import Footer from "../components/footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function GetStartedPage() {
  const [formData, setFormData] = useState({ fullName: "", email: "", password: "" });
  const [status, setStatus] = useState({ type: "idle", message: "" });

  async function handleSubmit(event) {
    event.preventDefault();
    setStatus({ type: "loading", message: "Creating your LuxDevHQ account..." });

    const response = await fetch("/api/auth/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    });
    const result = await response.json();

    if (!response.ok) {
      setStatus({ type: "error", message: result.error || "Account creation failed." });
      return;
    }

    setStatus({
      type: "success",
      message: "Your account is ready. Opening your dashboard...",
    });
    window.location.href = "/dashboard";
  }

  return (
    <div className="min-h-screen bg-white text-gray-900">
      <Header />
      <main className="pt-32 pb-20 px-4">
        <section className="container mx-auto max-w-6xl grid gap-10 lg:grid-cols-[1fr_440px] items-center">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full bg-blue-900/10 px-4 py-2 text-sm font-semibold text-blue-900">
              <ShieldCheck className="h-4 w-4" />
              Start learning with LuxDevHQ
            </div>
            <h1 className="mt-6 text-4xl md:text-6xl font-bold leading-tight">
              Get started with your <span className="text-blue-900">LuxDevHQ.ai</span> account.
            </h1>
            <p className="mt-6 max-w-2xl text-lg text-gray-600">
              Create one account for the LuxDevHQ website using the same PostgreSQL database environment that powers registration records.
            </p>
            <div className="mt-8 grid gap-4 sm:grid-cols-2">
              {["AI and data career programs", "Student support and account access", "Secure account storage", "Fast path to enrollment"].map((item) => (
                <div key={item} className="flex items-center gap-3 rounded-xl border border-blue-100 bg-blue-50/50 p-4">
                  <CheckCircle2 className="h-5 w-5 text-blue-900" />
                  <span className="font-medium text-gray-800">{item}</span>
                </div>
              ))}
            </div>
          </div>

          <form onSubmit={handleSubmit} className="rounded-3xl border border-blue-100 bg-white p-6 shadow-2xl shadow-blue-900/10">
            <h2 className="text-2xl font-bold text-blue-900">Create account</h2>
            <p className="mt-2 text-sm text-gray-600">Use this account to log in to the LuxDevHQ website.</p>

            <div className="mt-6 space-y-4">
              <div>
                <Label htmlFor="fullName">Full name</Label>
                <Input id="fullName" required minLength={2} value={formData.fullName} onChange={(event) => setFormData({ ...formData, fullName: event.target.value })} placeholder="Your full name" />
              </div>
              <div>
                <Label htmlFor="email">Email address</Label>
                <Input id="email" type="email" required value={formData.email} onChange={(event) => setFormData({ ...formData, email: event.target.value })} placeholder="you@example.com" />
              </div>
              <div>
                <Label htmlFor="password">Password</Label>
                <Input id="password" type="password" required minLength={8} value={formData.password} onChange={(event) => setFormData({ ...formData, password: event.target.value })} placeholder="At least 8 characters" />
              </div>
            </div>

            {status.message && (
              <div className={`mt-5 rounded-xl p-3 text-sm ${status.type === "error" ? "bg-red-50 text-red-700" : status.type === "success" ? "bg-emerald-50 text-emerald-700" : "bg-blue-50 text-blue-900"}`}>
                {status.message}
              </div>
            )}

            <Button type="submit" disabled={status.type === "loading"} className="mt-6 w-full rounded-full bg-blue-900">
              {status.type === "loading" ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <ArrowRight className="mr-2 h-4 w-4" />}
              Get started
            </Button>
            <p className="mt-4 text-center text-sm text-gray-600">
              Already have an account? <Link href="/login" className="font-semibold text-blue-900 hover:underline">Log in</Link>
            </p>
          </form>
        </section>
      </main>
      <Footer />
    </div>
  );
}
