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
    <section ref={sectionRef} id="faq" className={`mt-16 ${isVisible ? "animate-fade-in" : "opacity-0"}`}>
      <div className="text-center mb-12">
        <h2 className="text-2xl md:text-3xl font-bold mb-2 text-slate-50">Frequently Asked Questions</h2>
        <p className="text-slate-300 max-w-2xl mx-auto">
          Quick, clear answers about pricing, duration, and learning outcomes at LuxDevHQ.
        </p>
      </div>

      <div className="max-w-3xl mx-auto">
        <Accordion type="single" collapsible className="w-full">
          <AccordionItem value="item-1" className="border border-slate-700 rounded-lg mb-4 px-6">
            <AccordionTrigger className="text-left font-medium py-4 text-slate-50">
              Do I pay for each program separately?
            </AccordionTrigger>
            <AccordionContent className="pb-4 text-slate-300">
              No. At LuxDevHQ, students pay for one program and get access to subsequent programs for free.
              This helps you expand from one path into related tracks without extra tuition burden.
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="item-2" className="border border-slate-700 rounded-lg mb-4 px-6">
            <AccordionTrigger className="text-left font-medium py-4 text-slate-50">
              How long does the LuxDevHQ bootcamp take?
            </AccordionTrigger>
            <AccordionContent className="pb-4 text-slate-300">
              The instructor-led phase is designed for 4 months. Depending on your pace, project depth, and support
              needs, completion may extend to 8–9 months to ensure strong portfolio outcomes.
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="item-3" className="border border-slate-700 rounded-lg mb-4 px-6">
            <AccordionTrigger className="text-left font-medium py-4 text-slate-50">
              Are there flexible payment options?
            </AccordionTrigger>
            <AccordionContent className="pb-4 text-slate-300">
              Yes. You can pay in monthly installments or choose full upfront payment and receive a 10% discount.
              This makes LuxDevHQ a flexible payment coding bootcamp for different budgets.
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="item-4" className="border border-slate-700 rounded-lg mb-4 px-6">
            <AccordionTrigger className="text-left font-medium py-4 text-slate-50">
              Is LuxDevHQ suitable for Data Engineering in Kenya?
            </AccordionTrigger>
            <AccordionContent className="pb-4 text-slate-300">
              Yes. The curriculum is built for the Kenyan market with practical projects, portfolio delivery, and
              mentorship aligned to employer expectations for a Data Engineering Bootcamp Kenya pathway.
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="item-5" className="border border-slate-700 rounded-lg mb-4 px-6">
            <AccordionTrigger className="text-left font-medium py-4 text-slate-50">
              What are the benefits of the internship and capstone phase?
            </AccordionTrigger>
            <AccordionContent className="pb-4 text-slate-300">
              You work on real-world projects, build production-style artifacts, strengthen your CV and portfolio,
              and practice technical interviews and job applications with guided career support.
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="item-6" className="border border-slate-700 rounded-lg mb-4 px-6">
            <AccordionTrigger className="text-left font-medium py-4 text-slate-50">
              Is LuxDevHQ an affordable data analytics course option in Kenya?
            </AccordionTrigger>
            <AccordionContent className="pb-4 text-slate-300">
              Yes. LuxDevHQ combines affordable pricing, flexible payments, and a high-value pay-once access model,
              making it a strong choice for students seeking an Affordable Data Analytics Course Kenya.
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>
    </section>
  )
}
