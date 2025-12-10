"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Users, BookOpen, Briefcase, Calendar, Award, Laptop, Clock, Headphones } from "lucide-react"
import { useState, useEffect, useRef } from "react"

export default function BenefitsSection() {
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

  const benefits = [
    {
      title: "Hands-on Learning",
      description: "Work on real-world projects with industry-standard tools and technologies",
      icon: <BookOpen className="h-5 w-5 text-blue-900" />,
    },
    {
      title: "Mentorship & Support",
      description: "Get guidance from industry professionals with 24/7 lab access",
      icon: <Headphones className="h-5 w-5 text-blue-900" />,
    },
    {
      title: "Flexible Learning Options",
      description: "Choose from evening, online, or in-person classes to fit your schedule",
      icon: <Clock className="h-5 w-5 text-blue-900" />,
    },
    {
      title: "Internship Experience",
      description: "Gain practical experience during a 2-month internship with partner companies",
      icon: <Briefcase className="h-5 w-5 text-blue-900" />,
    },
    {
      title: "Portfolio Development",
      description: "Build an impressive portfolio through weekly portfolio-building sessions",
      icon: <Laptop className="h-5 w-5 text-blue-900" />,
    },
    {
      title: "Career Support",
      description: "Receive one year of career support after graduation, including job placement assistance",
      icon: <Award className="h-5 w-5 text-blue-900" />,
    },
    {
      title: "Freelancing Support",
      description: "Learn how to set up profiles on freelancing platforms and manage clients",
      icon: <Users className="h-5 w-5 text-blue-900" />,
    },
    {
      title: "Job Shadowing",
      description: "Shadow professionals in relevant fields to gain industry insights",
      icon: <Calendar className="h-5 w-5 text-blue-900" />,
    },
  ]

  return (
    <div ref={sectionRef} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {benefits.map((benefit, index) => (
        <div
          key={index}
        >
          <Card className="relative border-slate-100 h-full hover:border-blue-200 hover:shadow-md transition-all duration-300">
            
          <div className="absolute -top-6 -left-6 w-64 h-64 bg-blue-700 rounded-full mix-blend-multiply filter blur-2xl opacity-20 animate-blob"></div>
          <div className="absolute -bottom-8 -right-8 w-64 h-64 bg-blue-500 rounded-full mix-blend-multiply filter blur-2xl opacity-20 animate-blob animation-delay-2000"></div>
          <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-blue-700 to-blue-500 opacity-10"></div>
            <CardContent className="pt-6">
              <div className="flex items-start gap-3">
                <div className="mt-0.5 w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center flex-shrink-0">
                  {benefit.icon}
                </div>
                <div>
                  <h3 className="font-semibold mb-1">{benefit.title}</h3>
                  <p className="text-sm text-slate-600">{benefit.description}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      ))}
    </div>
  )
}
