"use client";

import Header from "../components/header";
import Footer from "../components/footer";
import DataEngineeringCurriculum from "@/components/data-engineering-curriculum";

export default function CurriculumPage() {
  return (
    <div className="min-h-screen bg-slate-900 text-slate-100">
      <Header />

      <main className="pt-32 pb-16 px-4">
        <div className="container mx-auto max-w-6xl">
          <section className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">LuxDevHQ Curriculum</h1>
            <p className="text-slate-300 max-w-3xl mx-auto">
              Explore our core learning tracks for Data Science and Analytics and Data Engineering.
            </p>
          </section>

          <section className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
            <div id="data-science-and-analytics" className="bg-slate-800 border border-slate-700 rounded-2xl p-6">
              <h2 className="text-2xl font-bold text-blue-300 mb-3">Data Science and Analytics Curriculum</h2>
              <ul className="space-y-2 text-slate-300 text-sm">
                <li>• Python and SQL for data analysis</li>
                <li>• Excel, Power BI, and data visualisation</li>
                <li>• Statistics, machine learning, and model evaluation</li>
                <li>• Practical AI applications and real-world portfolio projects</li>
              </ul>
            </div>
          </section>

          <section id="data-engineering">
            <DataEngineeringCurriculum />
          </section>
        </div>
      </main>

      <Footer />
    </div>
  );
}
