"use client";

import React from "react";
import { useState } from "react";
import {
  ChevronRight,
  CheckCircle,
  Clock,
  Users,
  Award,
  FileText,
  ArrowRight,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import UniversalEnrollmentForm from "@/components/UniversalEnrollmentForm";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogTitle,
} from "@/components/ui/dialog";

export default function ApplicationProcess() {
  const [activeStep, setActiveStep] = useState(0);
  const [showUniversalEnrollmentForm, setShowUniversalEnrollmentForm] =
    useState(false);

  const steps = [
    {
      title: "Submit Application",
      description:
        "Fill out our comprehensive application form with your background, experience, and portfolio links.",
      icon: FileText,
      details:
        "Our application form is designed to understand your technical skills, experience level, and career goals. Be prepared to share links to your GitHub, portfolio, and any notable projects you've worked on.",
    },
    {
      title: "Application Review",
      description:
        "Our team reviews your application to assess your skills and experience.",
      icon: Clock,
      details:
        "Applications are reviewed by our technical team within 7-10 business days. We evaluate your technical proficiency, project quality, and alignment with our community values.",
    },
    {
      title: "Friendly Chat",
      description:
        "Selected candidates have a casual 20-minute conversation with our team.",
      icon: Users,
      details:
        "This is a relaxed, friendly conversation where we get to know you better! We'll chat about your interests, experience, and goals. We might ask about your experience with languages like Python and SQL, but don't worry - it's all about learning where you are in your journey.",
    },
    {
      title: "Final Decision",
      description:
        "Based on your application and conversation, we make a decision on your admission.",
      icon: Award,
      details:
        "Final decisions are made within 5 business days after your conversation. Successful candidates receive a welcome package with onboarding information and access to our exclusive community platform.",
    },
  ];

  return (
    <div className="container mx-auto max-w-6xl">
      <div className="text-center mb-12">
        <h2 className="text-3xl md:text-4xl font-bold mb-4">
          Our Application Process
        </h2>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
          Our selective admission process ensures we build a community of
          exceptional developers. Here's how to become part of our elite
          network.
        </p>
      </div>

      {/* Mobile Process Steps */}
      <div className="my-8 md:hidden">
        <div className="flex justify-between">
          {steps.map((_, index) => (
            <button
              key={index}
              onClick={() => setActiveStep(index)}
              className={`h-2 w-full ${
                index === activeStep ? "bg-blue-900" : "bg-blue-200"
              } ${index > 0 ? "ml-1" : ""}`}
              aria-label={`Go to step ${index + 1}`}
            />
          ))}
        </div>
      </div>

      {/* Desktop Process Timeline */}
      <div className="hidden md:block">
        <div className="mb-10 flex justify-between">
          {steps.map((step, index) => (
            <div
              key={index}
              className={`relative flex w-1/4 flex-col items-center ${
                index < steps.length - 1
                  ? "after:absolute after:right-0 after:top-5 after:h-0.5 after:w-full after:translate-x-1/2 after:bg-blue-100"
                  : ""
              }`}
            >
              <div
                className={`relative z-10 flex h-10 w-10 items-center justify-center rounded-full ${
                  activeStep >= index ? "bg-blue-900" : "bg-blue-200"
                }`}
              >
                {activeStep > index ? (
                  <CheckCircle className="h-6 w-6 text-white" />
                ) : (
                  <step.icon
                    className={`h-5 w-5 ${
                      activeStep >= index ? "text-white" : "text-blue-900"
                    }`}
                  />
                )}
              </div>
              <h3
                className={`mt-3 text-center font-medium ${
                  activeStep >= index ? "text-blue-800" : "text-blue-400"
                }`}
              >
                {step.title}
              </h3>
            </div>
          ))}
        </div>
      </div>

      {/* Step Details */}
      <div className="rounded-xl bg-blue-50 p-8">
        <div className="flex flex-col md:flex-row md:items-start md:gap-8">
          <div className="mb-6 hidden h-16 w-16 items-center justify-center rounded-full bg-blue-900 md:flex">
            {React.createElement(steps[activeStep].icon, {
              className: "h-8 w-8 text-white",
            })}
          </div>
          <div className="flex-1">
            <h3 className="mb-2 text-xl font-bold text-blue-900 md:text-2xl">
              {steps[activeStep].title}
            </h3>
            <p className="mb-4 text-blue-900">{steps[activeStep].description}</p>
            <div className="mb-6 rounded-lg bg-white p-4  text-blue-900">
              {steps[activeStep].details}
            </div>
            <div className="flex gap-4">
              <Button
                variant="outline"
                onClick={() => setActiveStep(Math.max(0, activeStep - 1))}
                disabled={activeStep === 0}
                className="border-blue-300 bg-white text-blue-900 hover:bg-blue-50"
              >
                Previous
              </Button>
              <Button
                onClick={() =>
                  setActiveStep(Math.min(steps.length - 1, activeStep + 1))
                }
                disabled={activeStep === steps.length - 1}
                className="bg-blue-900 text-white hover:bg-blue-900"
              >
                Next Step <ChevronRight className="ml-1 h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* CTA Button */}
      <div className="mt-12 text-center">
        <Dialog
          open={showUniversalEnrollmentForm}
          onOpenChange={setShowUniversalEnrollmentForm}
        >
          <DialogTrigger asChild>
            <button
              className="rounded-md bg-blue-900 px-8 py-3 text-lg font-bold text-white hover:bg-blue-800"
              onClick={() => setShowUniversalEnrollmentForm(true)}
              type="button"
            >
              Enroll Now
            </button>
          </DialogTrigger>
          <DialogContent>
            <DialogTitle>Enrollment</DialogTitle>
            <UniversalEnrollmentForm
              onClose={() => setShowUniversalEnrollmentForm(false)}
            />
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
}
