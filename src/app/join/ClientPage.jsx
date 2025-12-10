"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import ProgramOverview from "@/components/program-overview";
import BenefitsSection from "@/components/benefits-section";
import ProgramDetails from "@/components/program-details";
import PaymentInitiationForm from "@/components/payment-initiation-form";
import FaqSection from "@/components/faq-section";
import TestimonialsSection from "@/components/testimonials-section";
import GuaranteeSection from "@/components/guarantee-section";
import StatisticsSection from "@/components/statistics-section";
import { ChevronRight } from "lucide-react";
import Header from "../components/header";

export default function ClientPage() {
  const [showPayment, setShowPayment] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const scrollToPayment = () => {
    setShowPayment(true);
    setTimeout(() => {
      const formElement = document.getElementById("payment-form");
      if (formElement) {
        formElement.scrollIntoView({ behavior: "smooth" });
      }
    }, 100);
  };

  return (
    <div className="min-h-screen bg-slate-900 overflow-x-hidden">
      <Header/>
      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-slate-900 to-slate-800 text-white py-20 md:py-28 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-[url('/placeholder.svg?height=500&width=500')] opacity-10"></div>
          <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-slate-900 to-transparent"></div>
        </div>

        <div className="container mx-auto px-4 md:px-6 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div
              className={`max-w-2xl ${
                isVisible ? "animate-fade-in" : "opacity-0"
              }`}
            >
              <div className="inline-block bg-blue-900 text-white text-sm font-medium px-3 py-1 rounded-full mb-6 animate-fade-in-delay-1">
                June 2025 Intake Now Open
              </div>

              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight animate-fade-in-delay-2">
                Transform Your Career{" "}
                <span className="text-blue-400">or Pay Nothing</span>
              </h1>

              <p className="text-lg md:text-xl text-slate-300 mb-8 animate-fade-in-delay-3">
                Join our 6-month intensive training program in Data Science,
                Analytics, Data Engineering, and AI. Get a job in tech or join
                another course for free.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 animate-fade-in-delay-4">
                <Button
                  size="lg"
                  className="bg-blue-900 hover:bg-blue-950 text-lg px-8 py-6"
                  onClick={scrollToPayment}
                >
                  Start Your Application
                  <ChevronRight className="ml-2 h-5 w-5" />
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  className="border-slate-400 text-gray-900 hover:bg-slate-200 text-lg px-8 py-6"
                >
                  Explore Programs
                </Button>
              </div>

              <div className="mt-8 flex items-center text-sm text-slate-300 animate-fade-in-delay-5">
                <div className="flex -space-x-2 mr-3">
                  <div className="w-8 h-8 rounded-full bg-blue-400 flex items-center justify-center text-xs font-medium text-blue-900">
                    JM
                  </div>
                  <div className="w-8 h-8 rounded-full bg-blue-400 flex items-center justify-center text-xs font-medium text-blue-900">
                    KL
                  </div>
                  <div className="w-8 h-8 rounded-full bg-amber-400 flex items-center justify-center text-xs font-medium text-amber-900">
                    TN
                  </div>
                </div>
                <span>Join 500+ students who transformed their careers</span>
              </div>
            </div>

            <div
              className={`relative hidden lg:block ${
                isVisible ? "animate-scale-in" : "opacity-0 scale-90"
              }`}
            >
              <div className="absolute -top-6 -left-6 w-64 h-64 bg-blue-700 rounded-full mix-blend-multiply filter blur-2xl opacity-20 animate-blob"></div>
              <div className="absolute -bottom-8 -right-8 w-64 h-64 bg-blue-500 rounded-full mix-blend-multiply filter blur-2xl opacity-20 animate-blob animation-delay-2000"></div>
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-blue-700 to-blue-500 opacity-10"></div>
              <div className="relative bg-white bg-opacity-10 backdrop-filter backdrop-blur-sm border border-white border-opacity-20 rounded-2xl p-8 shadow-xl">
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center">
                    <div className="w-12 h-12 rounded-full bg-blue-900 flex items-center justify-center">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-6 w-6 text-white"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                        />
                      </svg>
                    </div>
                    <div className="ml-4">
                      <h3 className="font-bold text-lg">Our Guarantee</h3>
                      <p className="text-sm text-slate-300">
                        Get hired or learn for free
                      </p>
                    </div>
                  </div>
                </div>

                <ul className="space-y-4">
                  {[
                    "4 months intensive training",
                    "2 months paid internship",
                    "Job placement assistance",
                    "Industry-recognized certification",
                    "Flexible learning options",
                  ].map((item, i) => (
                    <li
                      key={i}
                      className={`flex items-center animate-slide-in`}
                      style={{ animationDelay: `${0.5 + i * 0.1}s` }}
                    >
                      <div className="w-5 h-5 rounded-full bg-blue-500 bg-opacity-20 flex items-center justify-center mr-3">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-3 w-3 text-blue-400"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M5 13l4 4L19 7"
                          />
                        </svg>
                      </div>
                      {item}
                    </li>
                  ))}
                </ul>

                <div className="mt-8 pt-6 border-t border-white border-opacity-10">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-slate-300">Starting from</p>
                      <p className="text-2xl font-bold">
                        7,500 KES{" "}
                        <span className="text-sm font-normal">/month</span>
                      </p>
                    </div>
                    <Button
                      className="bg-white text-slate-900 hover:bg-slate-100"
                      onClick={scrollToPayment}
                    >
                      Apply Now
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div
          className={`absolute bottom-6 left-1/2 transform -translate-x-1/2 flex flex-col items-center ${
            isVisible ? "animate-fade-in-delay-6" : "opacity-0"
          }`}
        >
          <span className="text-sm text-slate-400 mb-2">
            Scroll to learn more
          </span>
          <div className="w-6 h-10 border-2 border-slate-400 rounded-full flex items-center justify-center p-1">
            <div className="w-1.5 h-1.5 bg-slate-400 rounded-full animate-bounce"></div>
          </div>
        </div>
      </section>

      <div className="container mx-auto px-4 md:px-6 py-16">
        {/* Guarantee Section */}
        <GuaranteeSection />

        {/* Statistics Section */}
        <StatisticsSection />

        {/* Program Overview Section */}
        <div className="mt-16">
          <h2 className="text-2xl md:text-3xl font-bold mb-2 text-slate-50 text-center">
            Our Training Programs
          </h2>
          <p className="text-slate-300 text-center max-w-2xl mx-auto mb-10">
            Comprehensive, hands-on training designed to prepare you for
            in-demand tech careers
          </p>
          <ProgramOverview />
        </div>

        {/* Benefits Section */}
        <div className="mt-16">
          <h2 className="text-2xl md:text-3xl font-bold mb-2 text-slate-50 text-center">
            Why Join LuxDevHQ?
          </h2>
          <p className="text-slate-300 text-center max-w-2xl mx-auto mb-10">
            We offer more than just training - we provide a complete career
            transformation experience
          </p>
          <BenefitsSection />
        </div>

        {/* Testimonials Section */}
        <TestimonialsSection />

        {/* Program Details Section */}
        <div className="mt-16">
          <h2 className="text-2xl md:text-3xl font-bold mb-2 text-blue-50 text-center">
            Program Details
          </h2>
          <p className="text-slate-300 text-center max-w-2xl mx-auto mb-10">
            Everything you need to know about our training programs
          </p>
          <ProgramDetails />
        </div>

        {/* Registration CTA */}
        {!showPayment && (
          <div className="mt-20 text-center py-16 px-4 bg-gradient-to-r from-slate-900 to-slate-800 rounded-2xl text-white">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Ready to Transform Your Career?
            </h2>
            <p className="text-lg text-slate-300 mb-8 max-w-2xl mx-auto">
              Join our June 2025 cohort and gain the skills, experience, and
              connections you need to succeed in tech.
            </p>
            <Button
              size="lg"
              className="bg-blue-900 hover:bg-blue-950 text-lg px-8 py-6"
              onClick={scrollToPayment}
            >
              Start Your Application
              <ChevronRight className="ml-2 h-5 w-5" />
            </Button>
          </div>
        )}

        {/* Payment Initiation Form */}
        {showPayment && (
          <div className="mt-16" id="payment-form">
            <h2 className="text-2xl md:text-3xl font-bold mb-2 text-slate-50 text-center">
              Start Your Application
            </h2>
            <p className="text-slate-300 text-center max-w-2xl mx-auto mb-10">
              Begin your journey by paying the 500 KES registration fee
            </p>
            <div className="max-w-md mx-auto">
              <div className="bg-white rounded-xl shadow-lg p-6 md:p-8 border border-slate-200">
                <PaymentInitiationForm />
              </div>
            </div>
          </div>
        )}

        {/* FAQ Section */}
        <FaqSection />
      </div>

      {/* Footer */}
      <footer className="bg-white mt-16 text-center text-slate-600 border-t border-slate-200 pt-8">
        <div className="container mx-auto py-14 px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8 text-left">
            <div>
              <h3 className="font-bold text-lg mb-4">LuxDevHQ</h3>
              <p className="text-sm text-slate-500 mb-4">
                Transforming careers through quality tech education and hands-on
                experience.
              </p>
              <div className="flex space-x-4">
                <a href="#" className="text-slate-400 hover:text-slate-600">
                  <svg
                    className="h-5 w-5"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                  >
                    <path
                      fillRule="evenodd"
                      d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z"
                      clipRule="evenodd"
                    />
                  </svg>
                </a>
                <a href="#" className="text-slate-400 hover:text-slate-600">
                  <svg
                    className="h-5 w-5"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                  >
                    <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                  </svg>
                </a>
                <a href="#" className="text-slate-400 hover:text-slate-600">
                  <svg
                    className="h-5 w-5"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                  >
                    <path
                      fillRule="evenodd"
                      d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z"
                      clipRule="evenodd"
                    />
                  </svg>
                </a>
              </div>
            </div>
            <div>
              <h3 className="font-bold text-lg mb-4">Contact</h3>
              <p className="text-sm text-slate-500 mb-2">
                1842 Lenana Road, Kilimani, Nairobi
              </p>
              <p className="text-sm text-slate-500 mb-2">
                <a
                  href="mailto:info@luxdevhq.com"
                  className="text-blue-600 hover:underline"
                >
                  info@luxdevhq.com
                </a>
              </p>
              <p className="text-sm text-slate-500">
                <a
                  href="tel:+254798166628"
                  className="text-blue-600 hover:underline"
                >
                  +254 798 166 628
                </a>
              </p>
            </div>
            <div>
              <h3 className="font-bold text-lg mb-4">Quick Links</h3>
              <ul className="space-y-2 text-sm">
                <li>
                  <a href="#" className="text-slate-500 hover:text-blue-600">
                    Programs
                  </a>
                </li>
                <li>
                  <a href="#" className="text-slate-500 hover:text-blue-600">
                    About Us
                  </a>
                </li>
                <li>
                  <a href="#" className="text-slate-500 hover:text-blue-600">
                    Testimonials
                  </a>
                </li>
                <li>
                  <a href="#" className="text-slate-500 hover:text-blue-600">
                    FAQ
                  </a>
                </li>
                <li>
                  <a href="#" className="text-slate-500 hover:text-blue-600">
                    Privacy Policy
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <p className="pt-8 border-t border-slate-200">
            © 2025 LuxDevHQ. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}
