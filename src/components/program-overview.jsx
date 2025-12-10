"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Database, BarChart, Brain } from "lucide-react";
import { useState, useEffect, useRef } from "react";

export default function ProgramOverview() {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      observer.disconnect();
    };
  }, []);

  const programs = [
    {
      title: "Data Science & AI",
      icon: <Brain className="h-6 w-6 text-blue-900" />,
      description: "Learn machine learning, deep learning, and AI applications",
      features: [
        "Python",
        "Machine Learning",
        "Neural Networks",
        "Computer Vision",
        "NLP",
      ],
      color: "emerald",
    },
    {
      title: "Data Analytics",
      icon: <BarChart className="h-6 w-6 text-blue-600" />,
      description:
        "Master data analysis, visualization, and business intelligence",
      features: [
        "SQL",
        "Power BI",
        "Excel",
        "Data Visualization",
        "Statistical Analysis",
      ],
      color: "blue",
    },
    {
      title: "Data Engineering",
      icon: <Database className="h-6 w-6 text-purple-600" />,
      description: "Build data pipelines, warehouses, and infrastructure",
      features: [
        "ETL",
        "Data Warehousing",
        "Big Data",
        "Cloud Platforms",
        "Data Modeling",
      ],
      color: "purple",
    },
  ];

  return (
    <div ref={sectionRef} className="space-y-8">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {programs.map((program, index) => (
          <div
            key={index}
          >
            <Card className="relative border-slate-200 h-full hover:shadow-md transition-all duration-300">
              <div className="absolute -top-6 -left-6 w-64 h-64 bg-blue-700 rounded-full mix-blend-multiply filter blur-2xl opacity-20 animate-blob"></div>
              <div className="absolute -bottom-8 -right-8 w-64 h-64 bg-blue-500 rounded-full mix-blend-multiply filter blur-2xl opacity-20 animate-blob animation-delay-2000"></div>
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-blue-700 to-blue-500 opacity-10"></div>
              <CardContent className="pt-6">
                <div className="flex flex-col h-full">
                  <div className="w-12 h-12 rounded-lg bg-slate-100 flex items-center justify-center mb-4">
                    {program.icon}
                  </div>
                  <h3 className="font-bold text-xl mb-2">{program.title}</h3>
                  <p className="text-slate-600 mb-4">{program.description}</p>
                  <div className="flex flex-wrap gap-2 mb-6">
                    {program.features.map((feature, i) => (
                      <span
                        key={i}
                        className="text-xs bg-slate-100 text-slate-700 px-2 py-1 rounded-full"
                      >
                        {feature}
                      </span>
                    ))}
                  </div>
                  <div className="mt-auto pt-4 border-t border-slate-100">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-slate-500">
                        Starting from
                      </span>
                      <span className="font-semibold">7,500 KES/mo</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        ))}
      </div>

      <div
        className={`mt-8 p-4 border border-amber-100/50 rounded-lg text-center bg-amber-400/30 ${
          isVisible ? "animate-fade-in-delay-3" : "opacity-0"
        }`}
      >
        <p className="text-white font-medium">
          <span className="font-bold">Special Offer:</span> Combine two courses
          at the price of one! For example, attend Data Analytics during the day
          and Data Engineering in the evening.
        </p>
      </div>
    </div>
  );
}
