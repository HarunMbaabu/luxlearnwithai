"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
import { Clock, Award, Users, Search, BookOpen, Code, Database, BrainCircuit } from "lucide-react"
import { courses } from "@/data/courses"

export default function CoursesPage() {
  const [searchQuery, setSearchQuery] = useState("")

  // Filter courses based on search query
  const filteredCourses = courses.filter(
    (course) =>
      course.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      course.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      course.category.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  // Get unique categories for filtering
  const categories = Array.from(new Set(courses.map((course) => course.category)))

  return (
    <div className="bg-white min-h-screen">
      {/* Hero Section */}
      <div className="bg-gradient-to-b from-blue-50 to-white pt-24 pb-16 px-4">
        <div className="container mx-auto max-w-5xl">
          <h1 className="text-4xl md:text-5xl font-bold text-center mb-6">Explore Our Learning Paths</h1>
          <p className="text-xl text-center text-gray-600 max-w-3xl mx-auto mb-8">
            Discover expert-crafted courses designed to help you master new skills and advance your career.
          </p>

          {/* Search Bar */}
          <div className="max-w-2xl mx-auto relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <Input
              type="text"
              placeholder="Search for courses..."
              className="pl-10 py-6 text-lg"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>
      </div>

      {/* Course Listings */}
      <div className="container mx-auto max-w-6xl px-4 py-12">
        <Tabs defaultValue="all" className="w-full">
          <div className="flex justify-between flex-col md:flex-row items-center mb-8">
            <h2 className="text-2xl font-bold text-left w-full mb-2 md:mb-0">Available Courses</h2>
            <TabsList>
              <TabsTrigger value="all">All Courses</TabsTrigger>
              {categories.map((category) => (
                <TabsTrigger key={category} value={category}>
                  {category}
                </TabsTrigger>
              ))}
            </TabsList>
          </div>

          <TabsContent value="all" className="mt-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredCourses.map((course) => (
                <CourseCard key={course.id} course={course} />
              ))}
            </div>

            {filteredCourses.length === 0 && (
              <div className="text-center py-12">
                <p className="text-gray-500 mb-4">No courses found matching your search.</p>
                <Button onClick={() => setSearchQuery("")}>Clear Search</Button>
              </div>
            )}
          </TabsContent>

          {categories.map((category) => (
            <TabsContent key={category} value={category} className="mt-6">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredCourses
                  .filter((course) => course.category === category)
                  .map((course) => (
                    <CourseCard key={course.id} course={course} />
                  ))}
              </div>
            </TabsContent>
          ))}
        </Tabs>
      </div>
    </div>
  )
}

function CourseCard({ course }) {
  // Map category to icon
  const getCategoryIcon = (category) => {
    switch (category.toLowerCase()) {
      case "python":
        return <Code className="h-5 w-5" />
      case "data science":
        return <Database className="h-5 w-5" />
      case "machine learning":
        return <BrainCircuit className="h-5 w-5" />
      default:
        return <BookOpen className="h-5 w-5" />
    }
  }

  return (
    <Card className="overflow-hidden shadow-none hover:shadow-md transition-shadow">
      <div className="h-48 relative bg-gradient-to-r from-blue-50 to-yellow-50 flex items-center justify-center">
        <div className="absolute top-4 left-4">
          <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-200">{course.category}</Badge>
        </div>
        <div className="w-20 h-20 rounded-full bg-white flex items-center justify-center shadow-sm">
          {getCategoryIcon(course.category)}
        </div>
      </div>

      <CardContent className="p-4">
        <h3 className="text-xl font-bold mb-2">{course.title}</h3>
        <p className="text-gray-600 mb-4 line-clamp-2">{course.description}</p>

        <div className="flex flex-wrap gap-3 text-sm text-gray-500">
          <div className="flex items-center">
            <Clock className="h-4 w-4 mr-1" />
            <span>{course.duration}</span>
          </div>
          <div className="flex items-center">
            <Award className="h-4 w-4 mr-1" />
            <span>{course.level}</span>
          </div>
          <div className="flex items-center">
            <Users className="h-4 w-4 mr-1" />
            <span>{course.students}+ students</span>
          </div>
        </div>
      </CardContent>

      <CardFooter className="bg-gray-50 py-4">
        <Link href={`/courses/${course.slug}`} className="w-full">
          <Button className="w-full bg-blue-900 hover:bg-blue-800">View Course</Button>
        </Link>
      </CardFooter>
    </Card>
  )
}

