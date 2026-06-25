"use client";

import Link from "next/link";
import { useState } from "react";
import { LogIn, Loader2, LockKeyhole } from "lucide-react";

import Header from "../components/header";
import Footer from "../components/footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function LoginPage() {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [status, setStatus] = useState({ type: "idle", message: "" });
  const [userName, setUserName] = useState("");

  async function handleSubmit(event) {
    event.preventDefault();
    setStatus({ type: "loading", message: "Checking your account..." });
    setUserName("");

    const response = await fetch("/api/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    });
    const result = await response.json();

    if (!response.ok) {
      setStatus({ type: "error", message: result.error || "Login failed." });
      return;
    }

    setUserName(result.user.fullName);
    setStatus({ type: "success", message: "Login successful. Opening your dashboard..." });
    window.location.href = "/dashboard";
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white text-gray-900">
      <Header />
      <main className="pt-32 pb-20 px-4">
        <section className="container mx-auto max-w-xl">
          <div className="mb-8 text-center">
            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-blue-900 text-white">
              <LockKeyhole className="h-7 w-7" />
            </div>
            <h1 className="mt-6 text-4xl font-bold text-blue-900">Log in to LuxDevHQ.ai</h1>
            <p className="mt-3 text-gray-600">Access your LuxDevHQ website account with the email you used to get started.</p>
          </div>

          <form onSubmit={handleSubmit} className="rounded-3xl border border-blue-100 bg-white p-6 shadow-xl">
            <div className="space-y-4">
              <div>
                <Label htmlFor="email">Email address</Label>
                <Input id="email" type="email" required value={formData.email} onChange={(event) => setFormData({ ...formData, email: event.target.value })} placeholder="you@example.com" />
              </div>
              <div>
                <Label htmlFor="password">Password</Label>
                <Input id="password" type="password" required value={formData.password} onChange={(event) => setFormData({ ...formData, password: event.target.value })} placeholder="Your password" />
              </div>
            </div>

            {status.message && (
              <div className={`mt-5 rounded-xl p-3 text-sm ${status.type === "error" ? "bg-red-50 text-red-700" : status.type === "success" ? "bg-emerald-50 text-emerald-700" : "bg-blue-50 text-blue-900"}`}>
                {userName ? `${status.message} ${userName}` : status.message}
              </div>
            )}

            <Button type="submit" disabled={status.type === "loading"} className="mt-6 w-full rounded-full bg-blue-900">
              {status.type === "loading" ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <LogIn className="mr-2 h-4 w-4" />}
              Log in
            </Button>
            <p className="mt-4 text-center text-sm text-gray-600">
              New to LuxDevHQ? <Link href="/get-started" className="font-semibold text-blue-900 hover:underline">Get started</Link>
            </p>
          </form>
        </section>
      </main>
      <Footer />
    </div>
  );
}
