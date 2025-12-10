"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import {
  ChevronRight,
  Clock,
  Calendar,
  MapPin,
  Phone,
  Mail,
  Users,
  Award,
  Target,
  Zap,
  CheckCircle,
  AlertCircle,
  BookOpen,
  Code,
  BarChart3,
  Brain,
  Database,
  Monitor,
  MessageCircle,
} from "lucide-react"
import Header from "../components/header"
import PaymentInitiationForm from "@/components/payment-initiation-form"

export default function LuxDevHQPrepProgram() {
  const [isVisible, setIsVisible] = useState(false)
  const [showPayment, setShowPayment] = useState(false)

  useEffect(() => {
    setIsVisible(true)
  }, [])

  const scrollToPayment = () => {
    setShowPayment(true)
    setTimeout(() => {
      const formElement = document.getElementById("payment-form")
      if (formElement) {
        formElement.scrollIntoView({ behavior: "smooth" })
      }
    }, 100)
  }

  const scrollToCurriculum = () => {
    document.getElementById("curriculum")?.scrollIntoView({ behavior: "smooth" })
  }
  return (
    <>
      <style jsx>{`
        @keyframes fade-in {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes scale-in {
          from { opacity: 0; transform: scale(0.9); }
          to { opacity: 1; transform: scale(1); }
        }
        @keyframes slide-in {
          from { opacity: 0; transform: translateX(-20px); }
          to { opacity: 1; transform: translateX(0); }
        }
        @keyframes blob {
          0%, 100% { transform: translate(0px, 0px) scale(1); }
          33% { transform: translate(30px, -50px) scale(1.1); }
          66% { transform: translate(-20px, 20px) scale(0.9); }
        }
        .animate-fade-in { animation: fade-in 0.6s ease-out forwards; }
        .animate-fade-in-delay-1 { animation: fade-in 0.6s ease-out 0.1s forwards; opacity: 0; }
        .animate-fade-in-delay-2 { animation: fade-in 0.6s ease-out 0.2s forwards; opacity: 0; }
        .animate-fade-in-delay-3 { animation: fade-in 0.6s ease-out 0.3s forwards; opacity: 0; }
        .animate-fade-in-delay-4 { animation: fade-in 0.6s ease-out 0.4s forwards; opacity: 0; }
        .animate-fade-in-delay-5 { animation: fade-in 0.6s ease-out 0.5s forwards; opacity: 0; }
        .animate-fade-in-delay-6 { animation: fade-in 0.6s ease-out 0.6s forwards; opacity: 0; }
        .animate-scale-in { animation: scale-in 0.8s ease-out 0.3s forwards; opacity: 0; }
        .animate-slide-in { animation: slide-in 0.5s ease-out forwards; opacity: 0; }
        .animate-blob { animation: blob 7s infinite; }
        .animation-delay-2000 { animation-delay: 2s; }
      `}</style>

      <div className="min-h-screen bg-white">
        <Header/>
        {/* Hero Section */}
        <section className="relative bg-gradient-to-r from-slate-900 to-slate-800 text-white py-20 md:py-28 overflow-hidden">
          <div className="absolute inset-0 z-0">
            <div className="absolute inset-0 bg-[url('/homeimage.png?height=500&width=500')] opacity-10"></div>
            <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-slate-900 to-transparent"></div>
          </div>

          <div className="container mx-auto px-4 md:px-6 relative z-10">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div className={`max-w-2xl ${isVisible ? "animate-fade-in" : "opacity-0"}`}>
                <div className="flex flex-wrap gap-2 mb-6">
                  <Badge className="bg-red-600 hover:bg-red-700 text-white animate-fade-in-delay-1">
                    Registration Ends June 20, 2025
                  </Badge>
                  <Badge className="bg-blue-600 hover:bg-blue-700 text-white animate-fade-in-delay-1">
                    Training Starts June 30, 2025
                  </Badge>
                </div>

                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight animate-fade-in-delay-2">
                  Jumpstart Your <span className="text-blue-400">Data and AI</span> Journey in 6 Weeks
                </h1>

                <p className="text-lg md:text-xl text-slate-300 mb-8 animate-fade-in-delay-3">
                  Intensive hands-on training in Data Endineering, Data Science, AI, and Analytics. Real-world projects, industry
                  mentorship, and rigorous skill development at LuxDevHQ.
                </p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8 animate-fade-in-delay-4">
                  <div className="flex items-center space-x-3">
                    <Clock className="h-5 w-5 text-blue-400" />
                    <div>
                      <p className="font-semibold">Physical Classes</p>
                      <p className="text-sm text-slate-300">9:00 AM - 4:00 PM</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Monitor className="h-5 w-5 text-blue-400" />
                    <div>
                      <p className="font-semibold">Online Evening</p>
                      <p className="text-sm text-slate-300">8:00 PM - 10:30 PM</p>
                    </div>
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row gap-4 animate-fade-in-delay-5">
                  <Button
                    size="lg"
                    className="bg-blue-600 hover:bg-blue-700 text-lg px-8 py-6"
                    onClick={scrollToPayment}
                  >
                    Enroll Now - 12,500 KES
                    <ChevronRight className="ml-2 h-5 w-5" />
                  </Button>
                  <Button
                    size="lg"
                    variant="outline"
                    className="border-slate-400 text-gray-900 hover:bg-slate-200 text-lg px-8 py-6"
                    onClick={scrollToCurriculum}
                  >
                    View Curriculum
                  </Button>
                </div>
              </div>

              <div className={`relative hidden lg:block ${isVisible ? "animate-scale-in" : "opacity-0 scale-90"}`}>
                <div className="absolute -top-6 -left-6 w-64 h-64 bg-blue-700 rounded-full mix-blend-multiply filter blur-2xl opacity-20 animate-blob"></div>
                <div className="absolute -bottom-8 -right-8 w-64 h-64 bg-blue-500 rounded-full mix-blend-multiply filter blur-2xl opacity-20 animate-blob animation-delay-2000"></div>
                <Card className="relative bg-white/10 backdrop-blur-sm border-white/20">
                  <CardHeader>
                    <CardTitle className="text-white flex items-center">
                      <Zap className="mr-2 h-5 w-5 text-yellow-400" />
                      Program Highlights
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {[
                      "6 weeks intensive training",
                      "Real-world project experience",
                      "Industry professional mentorship",
                      "Excel, SQL, Python & Power BI",
                      "Machine Learning & AI fundamentals",
                    ].map((item, i) => (
                      <div key={i} className="flex items-center text-white">
                        <CheckCircle className="h-4 w-4 text-green-400 mr-3" />
                        {item}
                      </div>
                    ))}
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </section>

        {/* Program Overview with Background */}
        <section className="py-24 relative">
          <div className="absolute inset-0 bg-[url('/placeholder.svg?height=600&width=1200')] bg-cover bg-center opacity-5"></div>
          <div className="absolute inset-0 bg-gray-50/95"></div>
          <div className="container mx-auto px-6 md:px-8 relative z-10">
            <div className="text-center mb-20">
              <h2 className="text-4xl md:text-5xl font-light text-gray-900 mb-6 tracking-wide">
                Rigorous Training for Real Results
              </h2>
              <p className="text-xl md:text-2xl text-gray-600 max-w-4xl mx-auto leading-relaxed font-light">
                This intensive program is designed to push participants to their limits, ensuring hands-on experience in
                key data technologies through real-world applications.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
              <Card className="text-center h-full">
                <CardHeader className="pb-6">
                  <div className="mx-auto w-16 h-16 bg-blue-100 rounded-xl flex items-center justify-center mb-6">
                    <BookOpen className="h-8 w-8 text-blue-600" />
                  </div>
                  <CardTitle className="text-xl font-medium">Core Training</CardTitle>
                  <CardDescription className="text-base">Weeks 1-2</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-base text-gray-600 leading-relaxed font-light">
                    Master Excel, SQL, Python, and Power BI fundamentals with hands-on practice.
                  </p>
                </CardContent>
              </Card>

              <Card className="text-center h-full">
                <CardHeader className="pb-6">
                  <div className="mx-auto w-16 h-16 bg-green-100 rounded-xl flex items-center justify-center mb-6">
                    <Target className="h-8 w-8 text-green-600" />
                  </div>
                  <CardTitle className="text-xl font-medium">Real Projects</CardTitle>
                  <CardDescription className="text-base">Weeks 3-6</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-base text-gray-600 leading-relaxed font-light">
                    Apply skills to industry-based projects with real datasets and business problems.
                  </p>
                </CardContent>
              </Card>

              <Card className="text-center h-full">
                <CardHeader className="pb-6">
                  <div className="mx-auto w-16 h-16 bg-purple-100 rounded-xl flex items-center justify-center mb-6">
                    <Users className="h-8 w-8 text-purple-600" />
                  </div>
                  <CardTitle className="text-xl font-medium">Expert Mentorship</CardTitle>
                  <CardDescription className="text-base">Throughout Program</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-base text-gray-600 leading-relaxed font-light">
                    Learn from industry professionals with personalized guidance and feedback.
                  </p>
                </CardContent>
              </Card>

              <Card className="text-center h-full">
                <CardHeader className="pb-6">
                  <div className="mx-auto w-16 h-16 bg-orange-100 rounded-xl flex items-center justify-center mb-6">
                    <Award className="h-8 w-8 text-orange-600" />
                  </div>
                  <CardTitle className="text-xl font-medium">Skills Assessment</CardTitle>
                  <CardDescription className="text-base">Pre-enrollment</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-base text-gray-600 leading-relaxed font-light">
                    30-minute personalized assessment to ensure optimal program placement.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Curriculum Breakdown */}
        <section id="curriculum" className="py-24">
          <div className="container mx-auto px-6 md:px-8">
            <div className="text-center mb-20">
              <h2 className="text-4xl md:text-5xl font-light text-gray-900 mb-6 tracking-wide">
                Comprehensive Curriculum
              </h2>
              <p className="text-xl md:text-2xl text-gray-600 leading-relaxed font-light">
                Two intensive phases designed for maximum skill development
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
              {/* Phase 1 */}
              <Card className="h-full">
                <CardHeader className="pb-8">
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 bg-blue-600 text-white rounded-full flex items-center justify-center font-medium text-xl">
                      1
                    </div>
                    <div>
                      <CardTitle className="text-3xl font-light">Core Training</CardTitle>
                      <CardDescription className="text-lg">Weeks 1-2: Foundation Building</CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="space-y-8">
                  <div>
                    <div className="flex items-center space-x-3 mb-4">
                      <BarChart3 className="h-6 w-6 text-green-600" />
                      <h4 className="font-medium text-lg">Microsoft Excel</h4>
                    </div>
                    <ul className="text-base text-gray-600 space-y-2 ml-9 font-light leading-relaxed">
                      <li>• Data organization and manipulation</li>
                      <li>• Advanced formulas (VLOOKUP, INDEX/MATCH)</li>
                      <li>• Pivot Tables and data visualization</li>
                      <li>• Macros and automation</li>
                    </ul>
                  </div>

                  <div>
                    <div className="flex items-center space-x-3 mb-4">
                      <Database className="h-6 w-6 text-blue-600" />
                      <h4 className="font-medium text-lg">SQL</h4>
                    </div>
                    <ul className="text-base text-gray-600 space-y-2 ml-9 font-light leading-relaxed">
                      <li>• Relational databases and SQL syntax</li>
                      <li>• Data extraction, filtering, and aggregation</li>
                      <li>• Joins, Subqueries, CTEs, Window functions</li>
                      <li>• Database optimization and indexing</li>
                    </ul>
                  </div>

                  <div>
                    <div className="flex items-center space-x-3 mb-4">
                      <Code className="h-6 w-6 text-yellow-600" />
                      <h4 className="font-medium text-lg">Python for Data Science</h4>
                    </div>
                    <ul className="text-base text-gray-600 space-y-2 ml-9 font-light leading-relaxed">
                      <li>• Programming fundamentals and OOP</li>
                      <li>• Data analysis with Pandas and NumPy</li>
                      <li>• Visualization with Matplotlib/Seaborn</li>
                      <li>• Machine Learning with Scikit-Learn</li>
                      <li>• TensorFlow, PyTorch, XGBoost</li>
                    </ul>
                  </div>

                  <div>
                    <div className="flex items-center space-x-3 mb-4">
                      <BarChart3 className="h-6 w-6 text-purple-600" />
                      <h4 className="font-medium text-lg">Power BI</h4>
                    </div>
                    <ul className="text-base text-gray-600 space-y-2 ml-9 font-light leading-relaxed">
                      <li>• Data connection and Power Query</li>
                      <li>• Data modeling and DAX</li>
                      <li>• Interactive dashboards and reports</li>
                      <li>• Publishing and sharing insights</li>
                    </ul>
                  </div>
                </CardContent>
              </Card>

              {/* Phase 2 */}
              <Card className="h-full">
                <CardHeader className="pb-8">
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 bg-green-600 text-white rounded-full flex items-center justify-center font-medium text-xl">
                      2
                    </div>
                    <div>
                      <CardTitle className="text-3xl font-light">Real-World Projects</CardTitle>
                      <CardDescription className="text-lg">Weeks 3-6: Practical Application</CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="space-y-8">
                  <div>
                    <div className="flex items-center space-x-3 mb-4">
                      <Target className="h-6 w-6 text-red-600" />
                      <h4 className="font-medium text-lg">Industry Projects</h4>
                    </div>
                    <ul className="text-base text-gray-600 space-y-2 ml-9 font-light leading-relaxed">
                      <li>• Work with real datasets from industry partners</li>
                      <li>• Solve practical business problems</li>
                      <li>• AI-driven problem solving</li>
                    </ul>
                  </div>

                  <div>
                    <div className="flex items-center space-x-3 mb-4">
                      <Users className="h-6 w-6 text-blue-600" />
                      <h4 className="font-medium text-lg">Team Collaboration</h4>
                    </div>
                    <ul className="text-base text-gray-600 space-y-2 ml-9 font-light leading-relaxed">
                      <li>• Simulate professional work environments</li>
                      <li>• Collaborative problem-solving</li>
                      <li>• Peer learning and knowledge sharing</li>
                    </ul>
                  </div>

                  <div>
                    <div className="flex items-center space-x-3 mb-4">
                      <Brain className="h-6 w-6 text-purple-600" />
                      <h4 className="font-medium text-lg">Complete Pipeline</h4>
                    </div>
                    <ul className="text-base text-gray-600 space-y-2 ml-9 font-light leading-relaxed">
                      <li>• Data collection and cleaning</li>
                      <li>• Model development and validation</li>
                      <li>• Visualization and reporting</li>
                      <li>• Cloud deployment solutions</li>
                    </ul>
                  </div>

                  <div>
                    <div className="flex items-center space-x-3 mb-4">
                      <Award className="h-6 w-6 text-green-600" />
                      <h4 className="font-medium text-lg">Professional Presentation</h4>
                    </div>
                    <ul className="text-base text-gray-600 space-y-2 ml-9 font-light leading-relaxed">
                      <li>• Structured reporting of findings</li>
                      <li>• Professional presentation skills</li>
                      <li>• Business insight communication</li>
                    </ul>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Pricing and Schedule with Background */}
        <section className="py-24 relative">
          <div className="absolute inset-0 bg-[url('/placeholder.svg?height=600&width=1200')] bg-cover bg-center opacity-5"></div>
          <div className="absolute inset-0 bg-gray-50/95"></div>
          <div className="container mx-auto px-6 md:px-8 relative z-10">
            <div className="text-center mb-20">
              <h2 className="text-4xl md:text-5xl font-light text-gray-900 mb-6 tracking-wide">
                Choose Your Learning Format
              </h2>
              <p className="text-xl md:text-2xl text-gray-600 leading-relaxed font-light">
                Flexible options to fit your schedule and learning preferences
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-5xl mx-auto">
              {/* Physical Classes */}
              <Card className="relative">
                <div className="absolute top-6 right-6">
                  <Badge className="bg-blue-600 text-base px-4 py-2">Most Popular</Badge>
                </div>
                <CardHeader className="pb-8">
                  <CardTitle className="text-3xl font-light flex items-center">
                    <MapPin className="mr-3 h-8 w-8 text-blue-600" />
                    Physical Classes
                  </CardTitle>
                  <CardDescription className="text-lg">On-site intensive training</CardDescription>
                </CardHeader>
                <CardContent className="space-y-8">
                  <div className="text-center">
                    <div className="text-5xl font-light text-gray-900">12,500 KES</div>
                    <div className="text-lg text-gray-600">Complete 6-week program</div>
                  </div>

                  <div className="space-y-6">
                    <div className="flex items-center space-x-4">
                      <Clock className="h-6 w-6 text-blue-600" />
                      <span className="text-lg font-light">9:00 AM - 4:00 PM (Daily)</span>
                    </div>
                    <div className="flex items-center space-x-4">
                      <MapPin className="h-6 w-6 text-blue-600" />
                      <span className="text-lg font-light">LuxDevHQ Thika Road Campus</span>
                    </div>
                    <div className="flex items-center space-x-4">
                      <Users className="h-6 w-6 text-blue-600" />
                      <span className="text-lg font-light">Direct mentorship & collaboration</span>
                    </div>
                    <div className="flex items-center space-x-4">
                      <Target className="h-6 w-6 text-blue-600" />
                      <span className="text-lg font-light">Hands-on lab sessions</span>
                    </div>
                  </div>

                  <Button
                    className="w-full bg-blue-600 hover:bg-blue-700 text-lg py-6 font-light"
                    onClick={scrollToPayment}
                  >
                    Enroll for Physical Classes
                  </Button>
                </CardContent>
              </Card>

              {/* Online Classes */}
              <Card>
                <CardHeader className="pb-8">
                  <CardTitle className="text-3xl font-light flex items-center">
                    <Monitor className="mr-3 h-8 w-8 text-green-600" />
                    Online Evening Classes
                  </CardTitle>
                  <CardDescription className="text-lg">Flexible evening schedule</CardDescription>
                </CardHeader>
                <CardContent className="space-y-8">
                  <div className="text-center">
                    <div className="text-5xl font-light text-gray-900">10,500 KES</div>
                    <div className="text-lg text-gray-600">Complete 6-week program</div>
                  </div>

                  <div className="space-y-6">
                    <div className="flex items-center space-x-4">
                      <Clock className="h-6 w-6 text-green-600" />
                      <span className="text-lg font-light">8:00 PM - 10:30 PM</span>
                    </div>
                    <div className="flex items-center space-x-4">
                      <Calendar className="h-6 w-6 text-green-600" />
                      <span className="text-lg font-light">Monday to Thursday</span>
                    </div>
                    <div className="flex items-center space-x-4">
                      <Monitor className="h-6 w-6 text-green-600" />
                      <span className="text-lg font-light">Live interactive sessions</span>
                    </div>
                    <div className="flex items-center space-x-4">
                      <BookOpen className="h-6 w-6 text-green-600" />
                      <span className="text-lg font-light">Recorded sessions available</span>
                    </div>
                  </div>

                  <Button
                    className="w-full bg-green-600 hover:bg-green-700 text-lg py-6 font-light"
                    onClick={scrollToPayment}
                  >
                    Enroll for Online Classes
                  </Button>
                </CardContent>
              </Card>
            </div>

            {/* Skills Assessment */}
            <Card className="max-w-3xl mx-auto mt-16">
              <CardHeader>
                <CardTitle className="flex items-center text-center justify-center text-2xl font-light">
                  <AlertCircle className="mr-3 h-8 w-8 text-orange-600" />
                  Skills Assessment Required
                </CardTitle>
              </CardHeader>
              <CardContent className="text-center space-y-6">
                <p className="text-lg text-gray-600 leading-relaxed font-light">
                  All programs include a personalized 30-minute skills assessment (virtual or in-person) to ensure
                  optimal program placement.
                </p>
                <div className="flex items-center justify-center space-x-6">
                  <div className="text-3xl font-light text-orange-600">500 KES</div>
                  <Badge variant="outline" className="text-green-600 border-green-600 text-base px-4 py-2">
                    Refundable if not passed
                  </Badge>
                </div>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Why Enroll */}
        <section className="py-24">
          <div className="container mx-auto px-6 md:px-8">
            <div className="text-center mb-20">
              <h2 className="text-4xl md:text-5xl font-light text-gray-900 mb-6 tracking-wide">
                Why Choose This Program?
              </h2>
              <p className="text-xl md:text-2xl text-gray-600 leading-relaxed font-light">
                Intensive training designed for serious learners ready to transform their careers
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
              {[
                {
                  icon: <Zap className="h-10 w-10 text-yellow-600" />,
                  title: "Hands-on, Immersive Learning",
                  description:
                    "Real-world applications and practical experience with industry-relevant tools and technologies.",
                },
                {
                  icon: <Target className="h-10 w-10 text-red-600" />,
                  title: "Intense, Focused Training",
                  description:
                    "Rapid skill development through concentrated learning and practice in a short timeframe.",
                },
                {
                  icon: <BookOpen className="h-10 w-10 text-blue-600" />,
                  title: "Industry-aligned Curriculum",
                  description: "Content designed for immediate applicability in today's data-driven job market.",
                },
                {
                  icon: <Users className="h-10 w-10 text-purple-600" />,
                  title: "Peer Collaboration",
                  description: "Work alongside like-minded learners with guidance from expert mentors.",
                },
                {
                  icon: <Award className="h-10 w-10 text-green-600" />,
                  title: "Career Stepping Stone",
                  description: "Perfect preparation for advanced AI and Data Science programs and careers.",
                },
                {
                  icon: <Brain className="h-10 w-10 text-blue-600" />,
                  title: "Expert Mentorship",
                  description: "Learn directly from industry professionals with real-world experience.",
                },
              ].map((item, index) => (
                <Card key={index} className="text-center h-full">
                  <CardHeader className="pb-6">
                    <div className="mx-auto w-20 h-20 bg-gray-100 rounded-xl flex items-center justify-center mb-6">
                      {item.icon}
                    </div>
                    <CardTitle className="text-xl font-medium">{item.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-base text-gray-600 leading-relaxed font-light">{item.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Commitment Section */}
        <section className="py-24 relative">
          <div className="absolute inset-0 bg-[url('/placeholder.svg?height=600&width=1200')] bg-cover bg-center opacity-5"></div>
          <div className="absolute inset-0 bg-red-50/95"></div>
          <div className="container mx-auto px-6 md:px-8 relative z-10">
            <Card className="max-w-5xl mx-auto border-red-200">
              <CardHeader className="text-center pb-8">
                <CardTitle className="text-4xl font-light text-red-800 flex items-center justify-center">
                  <AlertCircle className="mr-4 h-10 w-10" />
                  Commitment & Expectations
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-8">
                <div className="text-center">
                  
                  <p className="text-gray-700 text-xl leading-relaxed font-light">
                    This is an intensive and highly structured learning experience that demands full commitment.
                    Participants should be prepared for a rigorous schedule that mirrors real-world industry
                    expectations.
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-10 mt-12">
                  <div className="space-y-4">
                    <h4 className="font-medium text-red-800 text-xl">What We Expect:</h4>
                    <ul className="space-y-3 text-gray-700">
                      <li className="flex items-start">
                        <CheckCircle className="h-6 w-6 text-red-600 mr-3 mt-0.5" />
                        <span className="text-lg font-light">Full attendance and punctuality</span>
                      </li>
                      <li className="flex items-start">
                        <CheckCircle className="h-6 w-6 text-red-600 mr-3 mt-0.5" />
                        <span className="text-lg font-light">Active participation in all activities</span>
                      </li>
                      <li className="flex items-start">
                        <CheckCircle className="h-6 w-6 text-red-600 mr-3 mt-0.5" />
                        <span className="text-lg font-light">Completion of all assignments</span>
                      </li>
                      <li className="flex items-start">
                        <CheckCircle className="h-6 w-6 text-red-600 mr-3 mt-0.5" />
                        <span className="text-lg font-light">Collaborative team participation</span>
                      </li>
                    </ul>
                  </div>
                  <div className="space-y-4">
                    <h4 className="font-medium text-red-800 text-xl">What You'll Gain:</h4>
                    <ul className="space-y-3 text-gray-700">
                      <li className="flex items-start">
                        <CheckCircle className="h-6 w-6 text-green-600 mr-3 mt-0.5" />
                        <span className="text-lg font-light">Industry-ready technical skills</span>
                      </li>
                      <li className="flex items-start">
                        <CheckCircle className="h-6 w-6 text-green-600 mr-3 mt-0.5" />
                        <span className="text-lg font-light">Real-world project experience</span>
                      </li>
                      <li className="flex items-start">
                        <CheckCircle className="h-6 w-6 text-green-600 mr-3 mt-0.5" />
                        <span className="text-lg font-light">Professional network connections</span>
                      </li>
                      <li className="flex items-start">
                        <CheckCircle className="h-6 w-6 text-green-600 mr-3 mt-0.5" />
                        <span className="text-lg font-light">Career transformation foundation</span>
                      </li>
                    </ul>
                  </div>
                </div>

                <div className="text-center mt-12 p-8 bg-white rounded-xl border-2 border-red-200">
                  <p className="text-2xl font-medium text-red-800 mb-3">Are you ready to challenge yourself?</p>
                  <p className="text-gray-700 text-lg font-light">
                    Take the first step toward a career in AI, Data Science, and Analytics!
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Payment Section */}
        {!showPayment && (
          <section className="py-12 relative">
            <div className="absolute inset-0 bg-[url('/placeholder.svg?height=600&width=1200')] bg-cover bg-center opacity-10"></div>
            <div className="absolute inset-0 bg-slate-900/95"></div>
            <div className="container mx-auto px-6 md:px-8 relative z-10">
              <div className="text-center py-20 text-white">
                <h2 className="text-4xl md:text-5xl font-light mb-6 tracking-wide">Ready to Challenge Yourself?</h2>
                <p className="text-xl md:text-2xl text-slate-300 mb-6 max-w-3xl mx-auto leading-relaxed font-light">
                  Join LuxDevHQ and transform your skills in just six weeks!
                </p>

                <div className="flex flex-wrap justify-center gap-6 mb-12">
                  <Badge className="bg-red-600 text-xl px-6 py-3">Registration Ends: June 20, 2025</Badge>
                  <Badge className="bg-blue-600 text-xl px-6 py-3">Training Starts: June 30, 2025</Badge>
                </div>

                <Button
                  size="lg"
                  className="bg-blue-600 hover:bg-blue-700 text-xl px-12 py-8 font-light"
                  onClick={scrollToPayment}
                >
                  Start Your Application - Pay 500 KES
                  <ChevronRight className="ml-3 h-6 w-6" />
                </Button>
              </div>
            </div>
          </section>
        )}

        {/* Payment Form */}
        {showPayment && (
          <section className="py-24 bg-gray-50" id="payment-form">
            <div className="container mx-auto px-6 md:px-8">
              <div className="text-center mb-16">
                <h2 className="text-4xl md:text-5xl font-light text-gray-900 mb-6 tracking-wide">
                  Start Your Application
                </h2>
                <p className="text-xl md:text-2xl text-gray-600 max-w-3xl mx-auto leading-relaxed font-light">
                  Begin your journey by paying the 500 KES skills assessment fee
                </p>
              </div>
              <div className="max-w-lg mx-auto">
                <div className="bg-white rounded-2xl shadow-xl p-8 md:p-10 border border-slate-200">
                  <PaymentInitiationForm />
                </div>
              </div>
            </div>
          </section>
        )}

        {/* Enrollment Section */}
        <section className="py-12 relative">
          <div className="absolute inset-0 bg-[url('/placeholder.svg?height=600&width=1200')] bg-cover bg-center opacity-10"></div>
          <div className="absolute inset-0 bg-slate-900/95"></div>
          <div className="container mx-auto px-6 md:px-8 relative z-10 text-white">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 max-w-6xl mx-auto">
              {/* Contact Information */}
              <Card className="bg-white/10 backdrop-blur-sm border-white/20">
                <CardHeader>
                  <CardTitle className="text-white text-3xl font-light">Get in Touch</CardTitle>
                  <CardDescription className="text-slate-300 text-lg">
                    Contact us for enrollment and inquiries
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-8">
                  <div className="space-y-6">
                    <div className="flex items-center space-x-4">
                      <MapPin className="h-8 w-8 text-blue-400" />
                      <div>
                        <p className="font-medium text-white text-lg">Visit Our Campus</p>
                        <p className="text-slate-300 text-base">Garden Estate, off Thika Road</p>
                      </div>
                    </div>

                    <div className="flex items-center space-x-4">
                      <Mail className="h-8 w-8 text-blue-400" />
                      <div>
                        <p className="font-medium text-white text-lg">Email Us</p>
                        <p className="text-slate-300 text-base">info@luxdevhq.com</p>
                      </div>
                    </div>

                    <div className="flex items-center space-x-4">
                      <Phone className="h-8 w-8 text-blue-400" />
                      <div>
                        <p className="font-medium text-white text-lg">Call or WhatsApp</p>
                        <p className="text-slate-300 text-base">0796448232</p>
                      </div>
                    </div>

                    <div className="flex items-center space-x-4">
                      <MessageCircle className="h-8 w-8 text-blue-400" />
                      <div>
                        <p className="font-medium text-white text-lg">WhatsApp Support Group</p>
                        <p className="text-slate-300 text-base">
                          <a
                            href="https://chat.whatsapp.com/HNVVzlccdBlEFgNu5nlG1R"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="underline hover:text-blue-300"
                          >
                            Join our community for updates
                          </a>
                        </p>
                      </div>
                    </div>
                  </div>

                  <Separator className="bg-white/20" />

                  <div className="space-y-4">
                    <Button
                      className="w-full bg-green-600 hover:bg-green-700 text-lg py-6 font-light"
                      onClick={() => window.open("https://chat.whatsapp.com/HNVVzlccdBlEFgNu5nlG1R", "_blank")}
                    >
                      <MessageCircle className="mr-3 h-6 w-6" />
                      Join WhatsApp Support Group
                    </Button>
                    <Button className="w-full bg-blue-600 hover:bg-blue-700 text-lg py-6 font-light">
                      <Phone className="mr-3 h-6 w-6" />
                      Call Now: 0796448232
                    </Button>
                  </div>
                </CardContent>
              </Card>

              {/* Quick Enrollment */}
              <Card className="bg-white/10 backdrop-blur-sm border-white/20">
                <CardHeader>
                  <CardTitle className="text-white text-3xl font-light">Quick Enrollment</CardTitle>
                  <CardDescription className="text-slate-300 text-lg">
                    Choose your preferred learning format
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-8">
                  <div className="space-y-6">
                    <Button
                      className="w-full bg-blue-600 hover:bg-blue-700 text-left justify-start py-8 font-light"
                      onClick={scrollToPayment}
                    >
                      <div className="flex flex-col items-start">
                        <span className="font-medium text-lg">Physical Classes - 12,500 KES</span>
                        <span className="text-base opacity-80">9:00 AM - 4:00 PM Daily</span>
                      </div>
                    </Button>

                    <Button
                      className="w-full bg-green-600 hover:bg-green-700 text-left justify-start py-8 font-light"
                      onClick={scrollToPayment}
                    >
                      <div className="flex flex-col items-start">
                        <span className="font-medium text-lg">Online Evening - 10,500 KES</span>
                        <span className="text-base opacity-80">8:00 PM - 10:30 PM (Mon-Thu)</span>
                      </div>
                    </Button>
                  </div>

                  <div className="bg-orange-600/20 border border-orange-600/30 rounded-xl p-6">
                    <div className="flex items-center space-x-3 mb-3">
                      <AlertCircle className="h-6 w-6 text-orange-400" />
                      <span className="font-medium text-orange-400 text-lg">Skills Assessment</span>
                    </div>
                    <p className="text-base text-slate-300 font-light">
                      Required 30-minute assessment: 500 KES (refundable if not passed)
                    </p>
                  </div>

                  <div className="text-center">
                    <p className="text-slate-300 mb-6 text-lg font-light">
                      Ready to start your journey in Data Science and AI?
                    </p>
                    <Button
                      className="bg-white text-slate-900 hover:bg-slate-100 text-lg py-6 font-light"
                      onClick={scrollToPayment}
                    >
                      Schedule Assessment Call
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>
      </div>
    </>
  )
}
