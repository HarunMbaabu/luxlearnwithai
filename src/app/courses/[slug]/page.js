"use client"

import { useEffect, useState } from "react"
import { useParams } from "next/navigation"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import {
  Clock,
  Award,
  BookOpen,
  CheckCircle,
  BarChart,
  FileText,
  Code,
  Layers,
  Video,
  HelpCircle,
  PenTool,
  Folder,
  CheckSquare,
  Sparkles,
} from "lucide-react"
import { courses } from "@/data/courses"

export default function CoursePage() {
  const params = useParams()
  const slug = params?.slug
  const [course, setCourse] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const foundCourse = courses.find((c) => c.slug === slug)
    setCourse(foundCourse)
    setLoading(false)
  }, [slug])

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-900"></div>
      </div>
    )
  }

  if (!course) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen px-4">
        <h1 className="text-3xl font-bold mb-4">Course Not Found</h1>
        <p className="text-gray-600 mb-8">The course you're looking for doesn't exist or has been moved.</p>
        <Link href="/courses">
          <Button>Browse All Courses</Button>
        </Link>
      </div>
    )
  }

  return (
    <div className="bg-white min-h-screen">
        
      {/* Hero Section with Background Pattern */}
      <div className="relative bg-gradient-to-b from-slate-50 to-white pt-24 pb-16 px-4 overflow-hidden">
        <div className="container mx-auto max-w-5xl relative z-10">
          {/* Course Category Badge */}
          <div className="flex justify-center mb-6">
            <Badge className="shadow-none bg-blue-400/50 hover:bg-blue-500/50 text-black px-3 py-1 rounded-full">
            <Sparkles className="h-4 w-4 text-black me-1"/>
              {course.category}
            </Badge>
          </div>

          {/* Course Title */}
          <h1 className="text-4xl md:text-6xl font-bold text-center mb-6 text-gray-800">{course.title}</h1>

          {/* Course Description */}
          <p className="text-lg md:text-xl text-center text-gray-600 max-w-3xl mx-auto mb-8">{course.description}</p>

          {/* CTA Button */}
          <div className="flex justify-center mb-12">
            <Button size="lg" className="shadow-none bg-blue-400 hover:bg-blue-500 text-black rounded-md px-8">
              Enroll Now
            </Button>
          </div>

          {/* Course Stats */}
          <div className="bg-blue-50 rounded-xl p-6 grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="flex flex-col items-center md:items-start">
              <div className="flex items-center text-gray-700 mb-1">
                <BarChart className="h-5 w-5 mr-2" />
                <span className="text-sm">Skill Level</span>
              </div>
              <span className="font-semibold text-lg">{course.level}</span>
            </div>

            <div className="flex flex-col items-center md:items-start">
              <div className="flex items-center text-gray-700 mb-1">
                <Clock className="h-5 w-5 mr-2" />
                <span className="text-sm">Time to Complete</span>
              </div>
              <span className="font-semibold text-lg">{course.duration}</span>
            </div>

            <div className="flex flex-col items-center md:items-start">
              <div className="flex items-center text-gray-700 mb-1">
                <Award className="h-5 w-5 mr-2" />
                <span className="text-sm">Certificate</span>
              </div>
              <span className="font-semibold text-lg">{course.certificate ? "Included" : "Not Included"}</span>
            </div>

            <div className="flex flex-col items-center md:items-start">
              <div className="flex items-center text-gray-700 mb-1">
                <Layers className="h-5 w-5 mr-2" />
                <span className="text-sm">Prerequisites</span>
              </div>
              <span className="font-semibold text-lg">{course.prerequisites || "None"}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto max-w-6xl px-4 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Left Column - Course Content */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-xl p-8 shadow-sm border border-gray-100">
              <h2 className="text-2xl font-bold mb-6">What you'll learn in this course</h2>

              <div className="space-y-6">
                {course.learningObjectives.map((objective, index) => (
                  <div key={index} className="flex">
                    <div className="flex-shrink-0 mt-1">
                      <CheckCircle className="h-5 w-5 text-green-500" />
                    </div>
                    <p className="ml-3 text-gray-700">{objective}</p>
                  </div>
                ))}
              </div>

              {/* Course Modules Accordion */}
              <h2 className="text-2xl font-bold mt-12 mb-6">Course Modules</h2>
              <div className="space-y-4">
                {course.modules.map((module, index) => (
                  <Accordion key={index} type="single" collapsible className="w-full">
                    <AccordionItem value={`module-${index}`} className="border rounded-lg overflow-hidden">
                      <AccordionTrigger className="px-5 py-4 hover:bg-gray-50 transition-colors">
                        <div className="flex items-center">
                          {module.icon === "code" && <Code className="h-5 w-5 text-blue-900 mr-3 flex-shrink-0" />}
                          {module.icon === "book" && <BookOpen className="h-5 w-5 text-blue-900 mr-3 flex-shrink-0" />}
                          {module.icon === "file" && <FileText className="h-5 w-5 text-blue-900 mr-3 flex-shrink-0" />}
                          <div className="text-left">
                            <h3 className="font-semibold">{module.title}</h3>
                            <p className="text-sm text-gray-500">
                              {module.lessons} lessons • {module.duration}
                            </p>
                          </div>
                        </div>
                      </AccordionTrigger>
                      <AccordionContent className="px-5 pb-4 pt-0">
                        <div className="pl-8 border-l border-gray-200 mt-2 space-y-3">
                          {module.lessonsList &&
                            module.lessonsList.map((lesson, lessonIndex) => (
                              <div
                                key={lessonIndex}
                                className="flex items-center justify-between py-2 hover:bg-gray-50 px-3 rounded-md transition-colors"
                              >
                                <div className="flex items-center">
                                  {lesson.type === "video" && (
                                    <Video className="h-4 w-4 text-blue-900 mr-3 flex-shrink-0" />
                                  )}
                                  {lesson.type === "tutorial" && (
                                    <BookOpen className="h-4 w-4 text-blue-900 mr-3 flex-shrink-0" />
                                  )}
                                  {lesson.type === "interactive" && (
                                    <Code className="h-4 w-4 text-blue-900 mr-3 flex-shrink-0" />
                                  )}
                                  {lesson.type === "quiz" && (
                                    <HelpCircle className="h-4 w-4 text-blue-900 mr-3 flex-shrink-0" />
                                  )}
                                  {lesson.type === "exercise" && (
                                    <PenTool className="h-4 w-4 text-blue-900 mr-3 flex-shrink-0" />
                                  )}
                                  {lesson.type === "project" && (
                                    <Folder className="h-4 w-4 text-blue-900 mr-3 flex-shrink-0" />
                                  )}
                                  {lesson.type === "assessment" && (
                                    <CheckSquare className="h-4 w-4 text-blue-900 mr-3 flex-shrink-0" />
                                  )}
                                  <span className="text-sm">{lesson.title}</span>
                                </div>
                                <span className="text-xs text-gray-500">{lesson.duration}</span>
                              </div>
                            ))}
                        </div>
                      </AccordionContent>
                    </AccordionItem>
                  </Accordion>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column - CTA and Instructor */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 sticky top-8">
              <h2 className="text-2xl font-bold mb-4">Join now!</h2>
              <p className="text-gray-600 mb-6">
                Start your learning journey today and gain the skills that will advance your career.
              </p>

              <div className="space-y-4 mb-6">
                <div className="flex items-center">
                  <CheckCircle className="h-5 w-5 text-green-500 mr-3" />
                  <span>Fully personalized learning</span>
                </div>
                <div className="flex items-center">
                  <CheckCircle className="h-5 w-5 text-green-500 mr-3" />
                  <span>Hands-on coding exercises</span>
                </div>
                <div className="flex items-center">
                  <CheckCircle className="h-5 w-5 text-green-500 mr-3" />
                  <span>Expert-crafted curriculum</span>
                </div>
                <div className="flex items-center">
                  <CheckCircle className="h-5 w-5 text-green-500 mr-3" />
                  <span>Progress tracking</span>
                </div>
              </div>

              <Button className="w-full bg-blue-900 hover:bg-blue-800 mb-4">Enroll Now</Button>
              <p className="text-center text-sm text-gray-500">{course.students}+ students already enrolled</p>

              {/* Instructor Info */}
              {course.instructor && (
                <div className="mt-8 pt-6 border-t border-gray-100">
                  <h3 className="font-semibold mb-4">Course Instructor</h3>
                  <div className="flex items-center">
                    <div className="w-12 h-12 aspect-square rounded-full overflow-hidden mr-4">
                      <Image
                        src={course.instructor.avatar || "/placeholder.svg?height=48&width=48"}
                        alt={course.instructor.name}
                        width={48}
                        height={48}
                        className="object-cover rounded-full"
                      />
                    </div>
                    <div>
                      <p className="font-medium">{course.instructor.name}</p>
                      <p className="text-sm text-gray-500">{course.instructor.title}</p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

