import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function ProgramValueSection() {
  return (
    <section className="mt-16" id="program-overview-seo">
      <h2 className="text-2xl md:text-3xl font-bold mb-2 text-slate-50 text-center">
        Pay Once, Unlock Multiple Data Programs
      </h2>
      <p className="text-slate-300 text-center max-w-3xl mx-auto mb-10">
        LuxDevHQ is built for learners who want practical outcomes, flexible support, and clear value.
        Train in one track, then access subsequent programs at no extra tuition cost when you stay active in
        your learning plan.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <Card className="border-slate-600 bg-slate-900">
          <CardHeader>
            <CardTitle className="text-blue-300 text-lg">Program Overview</CardTitle>
          </CardHeader>
          <CardContent className="text-slate-300 text-sm space-y-3">
            <h3 className="font-semibold text-blue-200">Data Engineering Bootcamp Kenya</h3>
            <p>
              Join a project-based learning path designed for modern hiring needs in analytics, automation,
              cloud workflows, and production-ready data systems.
            </p>
            <p>
              This is one of the most career-focused options for students searching for
              <span className="text-blue-200"> Data Science Training Nairobi </span>
              with practical mentorship and portfolio delivery.
            </p>
          </CardContent>
        </Card>

        <Card className="border-slate-600 bg-slate-900">
          <CardHeader>
            <CardTitle className="text-blue-300 text-lg">Duration & Flexibility</CardTitle>
          </CardHeader>
          <CardContent className="text-slate-300 text-sm space-y-3">
            <h3 className="font-semibold text-blue-200">Clear timeline, flexible pace</h3>
            <p>
              Instructor-led training is designed to run for <span className="text-blue-200">4 months</span>.
              Depending on your pace, project depth, and support needs, the full journey can extend up to
              <span className="text-blue-200"> 8–9 months</span>.
            </p>
            <p>
              You get structured guidance plus room to progress at a sustainable pace without sacrificing quality.
            </p>
          </CardContent>
        </Card>

        <Card className="border-slate-600 bg-slate-900">
          <CardHeader>
            <CardTitle className="text-blue-300 text-lg">Pricing & Payment Options</CardTitle>
          </CardHeader>
          <CardContent className="text-slate-300 text-sm space-y-3">
            <h3 className="font-semibold text-blue-200">Flexible Payment Coding Bootcamp</h3>
            <p>
              Choose monthly installments or pay upfront. Students who choose full upfront payment receive a
              <span className="text-blue-200"> 10% discount</span>.
            </p>
            <p>
              LuxDevHQ is positioned as an
              <span className="text-blue-200"> Affordable Data Analytics Course Kenya </span>
              with high career value and practical outcomes.
            </p>
          </CardContent>
        </Card>
      </div>

      <div className="mt-8 bg-gradient-to-r from-slate-900 to-slate-800 border border-slate-700 rounded-2xl p-6 text-center">
        <h3 className="text-xl font-bold text-slate-50 mb-2">Next intake starting soon — limited cohort slots</h3>
        <p className="text-slate-300 mb-4">
          Apply now to secure your spot and start building your portfolio with guided support.
        </p>
        <div className="flex flex-wrap items-center justify-center gap-4 text-sm">
          <Link href="#data-engineering-curriculum" className="text-blue-300 hover:text-blue-200 underline">
            View curriculum
          </Link>
          <Link href="#payment-form" className="text-blue-300 hover:text-blue-200 underline">
            Apply now
          </Link>
          <Link href="#testimonials" className="text-blue-300 hover:text-blue-200 underline">
            Read testimonials
          </Link>
        </div>
      </div>
    </section>
  );
}
