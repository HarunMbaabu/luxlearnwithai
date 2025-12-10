"use client"

import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { useState, useEffect, useRef } from "react"

export default function FaqSection() {
  const [isVisible, setIsVisible] = useState(false)
  const sectionRef = useRef(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
          observer.disconnect()
        }
      },
      { threshold: 0.1 },
    )

    if (sectionRef.current) {
      observer.observe(sectionRef.current)
    }

    return () => {
      observer.disconnect()
    }
  }, [])

  return (
    <section ref={sectionRef} className={`mt-16 ${isVisible ? "animate-fade-in" : "opacity-0"}`}>
      <div className="text-center mb-12">
        <h2 className="text-2xl md:text-3xl font-bold mb-2 text-slate-50">Frequently Asked Questions</h2>
        <p className="text-slate-300 max-w-2xl mx-auto">Find answers to common questions about our programs</p>
      </div>

      <div className="max-w-3xl mx-auto">
        <Accordion type="single" collapsible className="w-full">
          <AccordionItem value="item-1" className="border border-slate-700 rounded-lg mb-4 px-6">
            <AccordionTrigger className="text-left font-medium py-4 text-slate-50">Can I combine two courses?</AccordionTrigger>
            <AccordionContent className="pb-4 text-slate-300">
              Yes, you can combine two courses at the price of one. For example, you may attend Data Analytics during
              the day and Data Engineering or Data Science in the evening.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-2" className="border border-slate-700 rounded-lg mb-4 px-6">
            <AccordionTrigger className="text-left font-medium py-4 text-slate-50">
              What happens if I don't find a job after completing the program?
            </AccordionTrigger>
            <AccordionContent className="pb-4 text-slate-300">
              If you successfully complete the program (by submitting at least 75% of all projects and articles) and
              haven't secured a job, you are eligible to join another course in the next cohort for free.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-3" className="border border-slate-700 rounded-lg mb-4 px-6">
            <AccordionTrigger className="text-left font-medium py-4 text-slate-50">
              What are the benefits of the internship?
            </AccordionTrigger>
            <AccordionContent className="pb-4 text-slate-300">
              During the internship, you will work on real-world projects, collaborate with finalists from previous
              cohorts on projects and mock interviews, build portfolios and CVs, apply for at least 20 jobs, and
              actively engage in freelancing.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-4" className="border border-slate-700 rounded-lg mb-4 px-6">
            <AccordionTrigger className="text-left font-medium py-4 text-slate-50">
              What are the requirements to receive certification?
            </AccordionTrigger>
            <AccordionContent className="pb-4 text-slate-300">
              Students must submit at least 75% of weekly projects and articles to be eligible for certification.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-5" className="border border-slate-700 rounded-lg mb-4 px-6">
            <AccordionTrigger className="text-left font-medium py-4 text-slate-50">How do I pay for the program?</AccordionTrigger>
            <AccordionContent className="pb-4 text-slate-300">
              After registration and paying the 500 KES registration fee, payment details for the monthly tuition will
              be shared. We offer flexible payment options including monthly installments.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-6" className="border border-slate-700 rounded-lg mb-4 px-6">
            <AccordionTrigger className="text-left font-medium py-4 text-slate-50">
              Is the registration fee refundable?
            </AccordionTrigger>
            <AccordionContent className="pb-4 text-slate-300">
              Yes, the 500 KES registration fee is refundable if you fail the entrance test. Otherwise, it goes toward
              your first month's tuition.
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>
    </section>
  )
}
