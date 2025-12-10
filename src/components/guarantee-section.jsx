"use client";

import { useState, useEffect, useRef } from "react";
import { Shield, Award, Briefcase } from "lucide-react";

export default function GuaranteeSection() {
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

  return (
    <section
      ref={sectionRef}
      className={`py-16 ${isVisible ? "animate-fade-in" : "opacity-0"}`}
    >
      <div className="text-center mb-12">
        <h2 className="text-2xl md:text-3xl font-bold mb-2 text-white">
          Our Job Guarantee
        </h2>
        <p className="text-slate-400 max-w-2xl mx-auto">
          We're so confident in our training that if you don't get hired after
          completing our program, you can join another course for free.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">

        <div
          className={`relative text-center bg-white bg-opacity-10 backdrop-filter backdrop-blur-sm border border-white border-opacity-20 rounded-2xl p-8 shadow-xl ${
            isVisible ? "animate-fade-in-delay-1" : "opacity-0"
          }`}
        >
          <div className="absolute -top-6 -left-6 w-64 h-64 bg-blue-700 rounded-full mix-blend-multiply filter blur-2xl opacity-20 animate-blob"></div>
          <div className="absolute -bottom-8 -right-8 w-64 h-64 bg-blue-500 rounded-full mix-blend-multiply filter blur-2xl opacity-20 animate-blob animation-delay-2000"></div>
          <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-blue-700 to-blue-500 opacity-10"></div>
          <div className="relative ">
            <div className="w-16 h-16 bg-blue-900 rounded-full flex items-center justify-center mx-auto mb-6">
              <Shield className="h-8 w-8 text-blue-400" />
            </div>
            <h3 className="text-xl font-bold mb-3 text-white">
              Money-Back Guarantee
            </h3>
            <p className="text-slate-300">
              If you fail the entrance test, your 500 KES registration fee will
              be fully refunded.<br/><br/>
            </p>
          </div>
        </div>

        <div
          className={`relative  bg-white bg-opacity-10 backdrop-filter backdrop-blur-sm border border-white border-opacity-20 rounded-2xl p-8 shadow-xl text-center ${
            isVisible ? "animate-fade-in-delay-1" : "opacity-0"
          }`}
        >
          <div className="absolute -top-6 -left-6 w-64 h-64 bg-blue-700 rounded-full mix-blend-multiply filter blur-2xl opacity-20 animate-blob"></div>
          <div className="absolute -bottom-8 -right-8 w-64 h-64 bg-blue-500 rounded-full mix-blend-multiply filter blur-2xl opacity-20 animate-blob animation-delay-2000"></div>
          <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-blue-700 to-blue-500 opacity-10"></div>
          <div className="relative">
            <div className="w-16 h-16 bg-blue-900 rounded-full flex items-center justify-center mx-auto mb-6">
              <Award className="h-8 w-8 text-blue-400" />
            </div>
            <h3 className="text-xl font-bold mb-3 text-white">
              Free Course Guarantee
            </h3>
            <p className="text-slate-300">
              {`Complete 75% of projects and don't get hired? Join another course
              in the next cohort for free.`}<br/><br/>
            </p>
          </div>
        </div>

        <div
          className={`relative rounded-xl shadow-md text-center ${
            isVisible ? "animate-fade-in-delay-1" : "opacity-0"
          }`}
        >
          <div className="absolute -top-6 -left-6 w-64 h-64 bg-blue-700 rounded-full mix-blend-multiply filter blur-2xl opacity-20 animate-blob"></div>
          <div className="absolute -bottom-8 -right-8 w-64 h-64 bg-blue-500 rounded-full mix-blend-multiply filter blur-2xl opacity-20 animate-blob animation-delay-2000"></div>
          <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-blue-700 to-blue-500 opacity-10"></div>
          <div className="relative bg-white bg-opacity-10 backdrop-filter backdrop-blur-sm border border-white border-opacity-20 rounded-2xl p-8 shadow-xl">
            <div className="w-16 h-16 bg-blue-900 rounded-full flex items-center justify-center mx-auto mb-6">
              <Briefcase className="h-8 w-8 text-blue-400" />
            </div>
            <h3 className="text-xl font-bold mb-3 text-white">Career Support</h3>
            <p className="text-slate-300">
              {`
              One year of dedicated career support including job placement
              assistance and interview preparation.`}<br/><br/>
            </p>
          </div>
        </div>
        </div>
    </section>
  );
}
