"use client"
import { Quote } from "lucide-react"
import { useState, useEffect, useRef } from "react"

export default function TestimonialsSection() {
  const [isVisible, setIsVisible] = useState(false)
  const [activeIndex, setActiveIndex] = useState(0)
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

  const testimonials = [
    {
      quote:
        "The hands-on approach and real-world projects at LuxDevHQ prepared me for my role as a Data Scientist. The mentorship was invaluable and I landed a job within 2 months of graduation.",
      name: "Sarah K.",
      role: "Data Scientist at TechCorp",
      initials: "SK",
      company: "TechCorp",
      image: "/placeholder.jpg?height=80&width=80",
    },
    {
      quote:
        "I went from knowing basic Python to building complex data pipelines. The internship experience helped me land my first job in the industry with a 40% higher salary than I expected.",
      name: "David M.",
      role: "Data Engineer at FinTech Solutions",
      initials: "DM",
      company: "FinTech Solutions",
      image: "/placeholder.jpg?height=80&width=80",
    },
    {
      quote:
        "The career support didn't end after graduation. LuxDevHQ helped me secure freelance projects and build my portfolio for a year after completing the program.",
      name: "Jane N.",
      role: "AI Consultant",
      initials: "JN",
      company: "Self-employed",
      image: "/placeholder.jpg?height=80&width=80",
    },
  ]

  return (
    <section ref={sectionRef} className={`py-16 ${isVisible ? "animate-fade-in" : "opacity-0"}`}>
      <div className={`text-center mb-12 ${isVisible ? "animate-fade-in" : "opacity-0"}`}>
        <h2 className="text-2xl md:text-3xl font-bold mb-2 text-slate-50">Success Stories</h2>
        <p className="text-slate-300 max-w-2xl mx-auto">
          Hear from our graduates who transformed their careers through our program
        </p>
      </div>

      <div className="relative">
        <div className="absolute top-1/2 left-0 transform -translate-y-1/2 -translate-x-16 w-32 h-32 bg-emerald-500 rounded-full mix-blend-multiply filter blur-3xl opacity-10"></div>
        <div className="absolute top-1/3 right-0 transform -translate-y-1/2 translate-x-16 w-32 h-32 bg-blue-500 rounded-full mix-blend-multiply filter blur-3xl opacity-10"></div>

        <div className="relative">
          <div
            className={`max-w-4xl mx-auto  bg-gradient-to-r from-slate-900 to-slate-800 text-white rounded-2xl shadow-xl p-8 md:p-12 ${isVisible ? "animate-fade-in-delay-1" : "opacity-0"}`}
          >
            <div className="flex flex-col md:flex-row gap-8 items-center">
              <div className="w-full md:w-1/3 ">
                <div className="relative">
                  <div className="w-24 h-24 rounded-full overflow-hidden border-4 border-slate-400 shadow-lg mx-auto md:mx-0">
                    <img
                      src={testimonials[activeIndex].image || "/placeholder.jpg"}
                      alt={testimonials[activeIndex].name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <Quote className="absolute -bottom-2 -right-2 h-16 w-16 text-blue-600 bg-blue-900 rounded-full p-4" />
                </div>
                <div className="text-center md:text-left mt-4">
                  <h3 className="font-bold text-lg">{testimonials[activeIndex].name}</h3>
                  <p className="text-sm text-slate-500">{testimonials[activeIndex].role}</p>
                  <div className="mt-2 inline-block bg-blue-900 px-3 py-1 rounded-full text-xs text-blue-300">
                    {testimonials[activeIndex].company}
                  </div>
                </div>
              </div>

              <div className="w-full md:w-2/3">
                <blockquote className="text-lg md:text-xl italic text-slate-500 leading-relaxed">
                  "{testimonials[activeIndex].quote}"
                </blockquote>
              </div>
            </div>
          </div>

          <div className={`flex justify-center mt-8 space-x-2 ${isVisible ? "animate-fade-in-delay-2" : "opacity-0"}`}>
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => setActiveIndex(index)}
                className={`w-3 h-3 rounded-full ${activeIndex === index ? "bg-blue-900" : "bg-slate-300"}`}
                aria-label={`View testimonial ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
