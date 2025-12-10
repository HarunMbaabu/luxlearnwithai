import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"

export default function FAQAccordion() {
  return (
    <div className="max-w-6xl mx-auto p-6 border rounded-lg">
      <h2 className="text-3xl font-bold mb-8">Frequently Asked Questions</h2>

      <Accordion type="single" collapsible className="w-full">
        <AccordionItem value="item-1" className="border-t border-b py-4">
          <AccordionTrigger className="text-left ">What is LuxDevHq AI?</AccordionTrigger>
          <AccordionContent>
            LuxDevHq AI is an online learning platform that provides interactive and text-based coding courses
            for developers and tech professionals. Unlike traditional video-based learning platforms, LuxDevHq focuses
            on a text-based, hands-on learning approach, where learners can practice coding directly in the browser as
            they progress through the learning materials.
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="item-2" className="border-b py-4">
          <AccordionTrigger className="text-left font-medium">Does LuxDevHq have free courses?</AccordionTrigger>
          <AccordionContent>
            Yes, LuxDevHq offers a selection of free courses to help you get started. These free courses cover various
            programming topics and technologies. However, the full library of courses is available with an LuxDevHq
            AI subscription.
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="item-3" className="border-b py-4">
          <AccordionTrigger className="text-left font-medium">Can I pay in installments?</AccordionTrigger>
          <AccordionContent>
            Yes, LuxDevHq offers flexible payment options including monthly and annual subscription plans. The annual
            plan provides significant savings compared to the monthly option. We also offer team and enterprise pricing
            for organizations.
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="item-4" className="border-b py-4">
          <AccordionTrigger className="text-left font-medium">Can I cancel my subscription?</AccordionTrigger>
          <AccordionContent>
            Yes, you can cancel your subscription at any time. If you cancel, you'll still have access to the platform
            until the end of your current billing period. There are no cancellation fees, and you can easily manage your
            subscription from your account settings.
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="item-5" className="border-b py-4">
          <AccordionTrigger className="text-left font-medium">What is offered in LuxDevHq AI?</AccordionTrigger>
          <AccordionContent>
            LuxDevHq AI provides access to the entire library of courses covering a wide range of topics
            including web development, mobile development, data structures and algorithms, machine learning, system
            design, and more. Subscribers get AI access to all current and future courses, hands-on coding
            environments, assessments, and completion certificates.
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  )
}
