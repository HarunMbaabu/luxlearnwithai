"use client";
import { useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import AOS from "aos";
import "aos/dist/aos.css";
import { Button } from "@/components/ui/button";
import {
  ArrowRight,
  Users,
  BarChart3,
  Award,
  ChevronRight,
  ExternalLink,
  Sparkles,
  BookOpen,
  Code,
} from "lucide-react";
import Header from "./components/header";
import Footer from "./components/footer";
import { MarqueeDemo } from "./components/marquee";
import ApplicationProcess from "./components/application_process";

export default function Home() {
  const registrationUrl = process.env.NEXT_PUBLIC_REGISTRATION_LINK ?? '#';
  useEffect(() => {
    AOS.init({ duration: 700, once: true });
  }, []);

  const testimonials = [
    {
      name: "Hellen Matti",
      role: "Data Analyst",
      quote:
        "Before joining LuxDevHQ, I had no experience in Data Analytics. The hands-on training helped me secure a job as a Data Analyst.",
      image: "/profile-picture-3.jpg?height=80&width=80",
      rating: 4.5,
    },
    {
      name: "Kirimi Dennis",
      role: "ML Engineer",
      quote:
        "I joined LuxDevHQ's Hackathon and was amazed by the innovative projects and mentorship. The experience was transformative.",
      image: "/profile-picture-1.jpg?height=80&width=80",
      rating: 4.7,
    },
    {
      name: "Peter Gatitu",
      role: "Data Scientist",
      quote:
        "Attending the LuxDevHQ meet-up was a game-changer. The support and guidance were exceptional. I learnt so much.",
      image: "/profile-picture-2.jpg?height=80&width=80",
      rating: 4.5,
    },
  ];

  return (
    <div className="bg-white text-gray-900">
      <Header />

      {/* Hero Section */}
      <section className="pt-32 pb-16 px-4">
        <div className="container mx-auto max-w-7xl">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div data-aos="fade-up">
              <div className="inline-flex items-center px-3 py-1 rounded-full bg-blue-900/10 text-blue-900 mb-6">
                <Sparkles className="h-4 w-4 mr-2" />
                <span className="text-sm font-medium">
                  Transforming Data Education
                </span>
              </div>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
                Build Your <span className="text-blue-900">Future</span> with
                LuxDev Academy
                {/* Investing in the  of Data Science Education */}
              </h1>
              <p className="text-xl text-gray-600 mb-8 max-w-xl">
                Master Analytics, Data Science, Artificial Intelligence, and
                Data Engineering 10X faster with our hands-on training, AI
                enabled coach, industry experts, and our elite educators.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button
                  size="lg"
                  className="rounded-full bg-blue-900 text-white"
                >
                  <Link href={process.env.NEXT_PUBLIC_REGISTRATION_LINK || '#'}>Enroll Now</Link>
                </Button>
                <Button
                  onClick={() => {
                    window.location.href = "learn-with-ai";
                  }}
                  variant="outline"
                  size="lg"
                  className="rounded-full"
                >
                  Ask AI
                  <ExternalLink className="ml-2 h-4 w-4" />
                </Button>
              </div>
            </div>
            <div
              className="relative h-[400px] lg:h-[500px] rounded-2xl overflow-hidden "
              data-aos="fade-up"
            >
              <Image
                src="/homeimage.png?height=1000&width=1600"
                alt="Data Science Education Platform"
                fill
                className="object-cover"
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-tr from-blue-900/30 to-transparent opacity-60"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="text-4xl md:text-5xl font-bold text-blue-900 mb-2">
                2490+
              </div>
              <p className="text-gray-600">Students Trained</p>
            </div>
            <div className="text-center">
              <div className="text-4xl md:text-5xl font-bold text-blue-900 mb-2">
                97%
              </div>
              <p className="text-gray-600">Job Placement</p>
            </div>
            <div className="text-center">
              <div className="text-4xl md:text-5xl font-bold text-blue-900 mb-2">
                4+
              </div>
              <p className="text-gray-600">Industry Partners</p>
            </div>
            <div className="text-center">
              <div className="text-4xl md:text-5xl font-bold text-blue-900 mb-2">
                16
              </div>
              <p className="text-gray-600">Countries Reached</p>
            </div>
          </div>
        </div>
      </section>

      {/* Programs Section */}
      <section className="py-16 px-4 bg-slate-50">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-12" data-aos="fade-up">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Our Programs
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Choose the program that fits your career goals and schedule. Available both in-person and online.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Full Program Card */}
            <div
              className="bg-blue-50 rounded-2xl p-8 border border-blue-100"
              data-aos="fade-up"
            >
              <h3 className="text-2xl font-bold text-blue-900 mb-4">
                Full Program
              </h3>
              <div className="mb-6">
                <p className="text-lg mb-2">
                  <span className="font-semibold">Duration:</span> 6 Months
                </p>
                <p className="text-gray-600">• 4 Months Learning</p>
                <p className="text-gray-600">• 2 Months Internship</p>
                <div className="mt-4 p-3 bg-white rounded-lg border border-blue-200">
                  <p className="text-sm font-medium text-blue-800 mb-1">Available Formats:</p>
                  <div className="flex flex-wrap gap-2">
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                      🏢 Physical Classes
                    </span>
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                      💻 Online Classes
                    </span>
                  </div>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <div className="text-3xl font-bold text-blue-900">
                  From 30,000 KSh
                </div>
                <Button
                  onClick={() => {
                    window.location.href =
                      "https://forms.gle/wkisaQGhB7j3yUYr5";
                  }}
                  size="sm"
                  className="rounded-full bg-blue-900 text-white"
                >
                  Enroll now
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </div>
            </div>

            {/* Prep Program Card */}
            <div
              className="bg-blue-50 rounded-2xl p-8 border border-blue-100"
              data-aos="fade-up"
            >
              <h3 className="text-2xl font-bold text-blue-900 mb-4">
               Short Courses
              </h3>
              <div className="mb-6">
                <p className="text-lg mb-2">
                  <span className="font-semibold">Duration:</span> 2 Weeks
                </p>
                <p className="text-gray-600">• 1 Week Learning</p>
                <p className="text-gray-600">• 1 Week Building</p>
                <div className="mt-4 p-3 bg-white rounded-lg border border-blue-200">
                  <p className="text-sm font-medium text-blue-800 mb-1">Available Formats:</p>
                  <div className="flex flex-wrap gap-2">
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                      🏢 Physical Classes
                    </span>
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                      💻 Online Classes
                    </span>
                  </div>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <div className="text-3xl font-bold text-blue-900">
                  For 7,5000 KSh
                </div>
                <Button
                  onClick={() => {
                    window.location.href =
                      "https://docs.google.com/forms/d/e/1FAIpQLSejkNyeCtcMx8TaU3x87QOuUktSLyGvjsIKXDKRaYWEtKeRxQ/viewform";
                  }}
                  size="sm"
                  className="rounded-full bg-blue-900 text-white"
                >
                  Enroll now
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Programs Section */}
      <section className="py-16 px-4 bg-white">
        <ApplicationProcess />
      </section>

      {/* Testimonials Section */}
      <section className="py-24 px-4 bg-slate-50">
        <div className="container mx-auto max-w-5xl">
          <div className="text-center mb-16" data-aos="fade-up">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              What Our Students Say
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Success stories from our community of data science professionals
            </p>
          </div>
          <div data-aos="fade-up">
            <div className="w-full max-w-6xl mx-auto">
              <div className="-mx-3 md:flex items-start">
                {/* Column 1 */}
                <div className="px-3 md:w-1/3">
                  {/* Testimonial 1 */}
                  <div className="w-full mx-auto rounded-lg bg-white border border-gray-200 p-5 text-gray-800 font-light mb-6">
                    <div className="w-full flex mb-4 items-center">
                      <div className="overflow-hidden rounded-full w-10 h-10 bg-gray-50 border border-gray-200">
                        <img src="/logo.png" alt="" />
                      </div>
                      <div className="flex-grow pl-3">
                        <h6 className="font-bold  uppercase text-gray-600">
                          Faith Mwangi
                        </h6>
                      </div>
                    </div>
                    <p className=" leading-tight">
                      <span className="text-lg italic font-bold text-gray-400 mr-1">
                        "
                      </span>
                      Joining LuxDevHQ was the best decision I made for my
                      career. I transitioned from a non-tech background to
                      landing a data analyst role within 3 months of graduating.
                      The support was phenomenal!
                      <span className="text-lg italic font-bold text-gray-400 ml-1">
                        "
                      </span>
                    </p>
                  </div>
                  {/* Testimonial 2 */}
                  <div className="w-full mx-auto rounded-lg bg-white border border-gray-200 p-5 text-gray-800 font-light mb-6">
                    <div className="w-full flex mb-4 items-center">
                      <div className="overflow-hidden rounded-full w-10 h-10 bg-gray-50 border border-gray-200">
                        <img src="/logo.png" alt="" />
                      </div>
                      <div className="flex-grow pl-3">
                        <h6 className="font-bold  uppercase text-gray-600">
                          Daniel Omondi
                        </h6>
                      </div>
                    </div>
                    <p className=" leading-tight">
                      <span className="text-lg italic font-bold text-gray-400 mr-1">
                        "
                      </span>
                      The curriculum is industry-relevant and hands-on. I built
                      real projects, worked with PostgreSQL, and deployed my
                      first machine learning model thanks to the mentorship at
                      LuxDevHQ.
                      <span className="text-lg italic font-bold text-gray-400 ml-1">
                        "
                      </span>
                    </p>
                  </div>
                </div>

                {/* Column 2 */}
                <div className="px-3 md:w-1/3">
                  {/* Testimonial 3 */}
                  <div className="w-full mx-auto rounded-lg bg-white border border-gray-200 p-5 text-gray-800 font-light mb-6">
                    <div className="w-full flex mb-4 items-center">
                      <div className="overflow-hidden rounded-full w-10 h-10 bg-gray-50 border border-gray-200">
                        <img src="/logo.png" alt="" />
                      </div>
                      <div className="flex-grow pl-3">
                        <h6 className="font-bold  uppercase text-gray-600">
                          Thomas Kimeli
                        </h6>
                      </div>
                    </div>
                    <p className=" leading-tight">
                      <span className="text-lg italic font-bold text-gray-400 mr-1">
                        "
                      </span>
                      I loved how we had guest sessions with real data engineers
                      and analysts from companies in Kenya. The job shadowing
                      sessions gave me the confidence to ace my first
                      internship.
                      <span className="text-lg italic font-bold text-gray-400 ml-1">
                        "
                      </span>
                    </p>
                  </div>
                  {/* Testimonial 4 */}
                  <div className="w-full mx-auto rounded-lg bg-white border border-gray-200 p-5 text-gray-800 font-light mb-6">
                    <div className="w-full flex mb-4 items-center">
                      <div className="overflow-hidden rounded-full w-10 h-10 bg-gray-50 border border-gray-200">
                        <img src="/logo.png" alt="" />
                      </div>
                      <div className="flex-grow pl-3">
                        <h6 className="font-bold  uppercase text-gray-600">
                          Akinyi Otieno
                        </h6>
                      </div>
                    </div>
                    <p className=" leading-tight">
                      <span className="text-lg italic font-bold text-gray-400 mr-1">
                        "
                      </span>
                      LuxDevHQ doesn’t just teach — it transforms. I learned
                      Apache Airflow, Kafka, and advanced SQL, and I now work
                      remotely as a junior data engineer. The best part? The
                      community is amazing.
                      <span className="text-lg italic font-bold text-gray-400 ml-1">
                        "
                      </span>
                    </p>
                  </div>
                </div>

                {/* Column 3 */}
                <div className="px-3 md:w-1/3">
                  {/* Testimonial 5 */}
                  <div className="w-full mx-auto rounded-lg bg-white border border-gray-200 p-5 text-gray-800 font-light mb-6">
                    <div className="w-full flex mb-4 items-center">
                      <div className="overflow-hidden rounded-full w-10 h-10 bg-gray-50 border border-gray-200">
                        <img src="/logo.png" alt="" />
                      </div>
                      <div className="flex-grow pl-3">
                        <h6 className="font-bold  uppercase text-gray-600">
                          Edwin Kivuva
                        </h6>
                      </div>
                    </div>
                    <p className=" leading-tight">
                      <span className="text-lg italic font-bold text-gray-400 mr-1">
                        "
                      </span>
                      Before LuxDevHQ, I couldn’t even write a simple SQL query.
                      Today, I can build ETL pipelines from scratch and I just
                      got accepted for an internship at a fintech startup!
                      <span className="text-lg italic font-bold text-gray-400 ml-1">
                        "
                      </span>
                    </p>
                  </div>
                  {/* Testimonial 6 */}
                  <div className="w-full mx-auto rounded-lg bg-white border border-gray-200 p-5 text-gray-800 font-light mb-6">
                    <div className="w-full flex mb-4 items-center">
                      <div className="overflow-hidden rounded-full w-10 h-10 bg-gray-50 border border-gray-200">
                        <img src="/logo.png" alt="" />
                      </div>
                      <div className="flex-grow pl-3">
                        <h6 className="font-bold  uppercase text-gray-600">
                          Idris A
                        </h6>
                      </div>
                    </div>
                    <p className=" leading-tight">
                      <span className="text-lg italic font-bold text-gray-400 mr-1">
                        "
                      </span>
                      The personalized mentorship, peer feedback, and real-world
                      projects helped me level up fast. LuxDevHQ gave me both
                      skills and confidence to compete globally.
                      <span className="text-lg italic font-bold text-gray-400 ml-1">
                        "
                      </span>
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Our Advantage Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto max-w-7xl">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div data-aos="fade-up">
              <h2 className="text-3xl md:text-4xl font-bold mb-6 text-blue-900">
                Our Competitive Advantage
              </h2>
              <p className="text-xl text-gray-600 mb-8">
                What sets LuxDev Academy apart in the crowded edtech market and
                positions us for exponential growth
              </p>

              <div className="space-y-6">
                <div className="flex gap-4">
                  <div className="w-12 h-12 bg-blue-900/10 rounded-full flex-shrink-0 flex items-center justify-center">
                    <Award className="h-6 w-6 text-blue-900" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold mb-2 ">
                      AI-Powered Learning
                    </h3>
                    <p className="text-gray-600">
                      Our proprietary AI coaching system delivers personalized
                      learning paths, resulting in 3.2x faster skill
                      acquisition.
                    </p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="w-12 h-12 bg-blue-900/10 rounded-full flex-shrink-0 flex items-center justify-center">
                    <BarChart3 className="h-6 w-6 text-blue-900" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold mb-2">
                      Industry Partnerships
                    </h3>
                    <p className="text-gray-600">
                      Direct hiring pipelines with 9+ major tech companies,
                      resulting in our 87% job placement rate.
                    </p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="w-12 h-12 bg-blue-900/10 rounded-full flex-shrink-0 flex items-center justify-center">
                    <Users className="h-6 w-6 text-blue-900" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold mb-2 ">
                      Elite Educator Network
                    </h3>
                    <p className="text-gray-600">
                      Our instructors come from top tech companies and
                      universities, providing real-world expertise.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="relative" data-aos="fade-up">
              <div className="relative h-[500px] rounded-2xl overflow-hidden">
                <Image
                  src="/image-2.png?height=1000&width=1600"
                  alt="Our Advantage"
                  fill
                  className="object-cover"
                />
              </div>

              {/* Floating Stats Card */}
              <div className="absolute -bottom-8 -left-8 bg-white p-6 rounded-xl border max-w-xs">
                <h4 className="text-lg font-bold mb-3 text-blue-900">
                  Student Success
                </h4>
                <div className="flex items-center gap-4 mb-3">
                  <div className="w-16 h-16 aspect-square bg-blue-900/10 rounded-full flex items-center justify-center">
                    <span className="text-2xl font-bold text-blue-900">
                      4.8x
                    </span>
                  </div>
                  <p className="text-gray-600">
                    Higher completion rate than industry average
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Courses*/}
      <section className="py-20 px-4 bg-slate-50">
        <div className="container mx-auto max-w-7xl">
          <div className="flex justify-between items-end mb-12">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                Our Learning Paths
              </h2>
              <p className="text-xl text-gray-600">
                Structured courses designed for your success
              </p>
            </div>
            <Link
              href="courses"
              className="hidden md:flex items-center text-blue-900 hover:text-blue-600 transition-colors"
            >
              View all courses
              <ChevronRight className="ml-1 h-5 w-5" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Course Card 1 */}
            <div className="bg-white border border-gray-100 rounded-2xl overflow-hidden hover:shadow-lg transition-all flex flex-col h-full">
              <div className="h-48 relative">
                <Image
                  src="/dsa.jpg?height=300&width=500"
                  alt="Data Analysis"
                  fill
                  className="object-cover object-top"
                />
              </div>
              <div className="p-6 flex flex-col flex-grow">
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mb-4">
                  <BookOpen className="h-6 w-6 text-blue-600" />
                </div>
                <h3 className="text-xl font-bold mb-2">
                  Data Analysis and Analytics
                </h3>
                <p className="text-gray-600 mb-4">
                  Learn essential data analysis techniques and tools to extract
                  insights from data.
                </p>
                <div className="flex justify-between items-center mt-auto">
                  <span className="text-sm text-gray-500">
                    24 weeks • Beginner
                  </span>
                  {/* <Link
                    href={`/courses/python-for-data-analysis`}
                    className="text-blue-900 hover:text-blue-600 transition-colors"
                  >
                    Learn more
                  </Link> */}
                </div>
              </div>
            </div>

            {/* Course Card 2 */}
            <div className="bg-white border border-gray-100 rounded-2xl overflow-hidden hover:shadow-lg transition-all flex flex-col h-full">
              <div className="h-48 relative">
                <Image
                  src="/ai.jpg?height=300&width=500"
                  alt="Artificial Intelligence"
                  fill
                  className="object-cover"
                />
              </div>
              <div className="p-6 flex flex-col flex-grow">
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mb-4">
                  <Sparkles className="h-6 w-6 text-blue-600" />
                </div>
                <h3 className="text-xl font-bold mb-2">
                  Artificial Intelligence and Data Science
                </h3>
                <p className="text-gray-600 mb-4">
                  Master AI and machine learning concepts to build intelligent
                  applications.
                </p>
                <div className="flex justify-between items-center mt-auto">
                  <span className="text-sm text-gray-500">
                    24 weeks • Intermediate
                  </span>
                  {/* <Link
                    href={`/courses/data-science-fundamentals`}
                    className="text-blue-900 hover:text-blue-600 transition-colors"
                  >
                    Learn more
                  </Link> */}
                </div>
              </div>
            </div>

            {/* Course Card 3 */}
            <div className="bg-white border border-gray-100 rounded-2xl overflow-hidden hover:shadow-lg transition-all flex flex-col h-full">
              <div className="h-48 relative">
                <Image
                  src="/engineering.jpg?height=300&width=500"
                  alt="Data Engineering"
                  fill
                  className="object-cover object-top"
                />
              </div>
              <div className="p-6 flex flex-col flex-grow">
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mb-4">
                  <Code className="h-6 w-6 text-blue-600" />
                </div>
                <h3 className="text-xl font-bold mb-2">
                  Data Engineering and Analytics Engineering
                </h3>
                <p className="text-gray-600 mb-4">
                  Develop skills in data pipeline construction and large-scale
                  data processing.
                </p>
                <div className="flex justify-between items-center mt-auto">
                  <span className="text-sm text-gray-500">
                    24 weeks • Advanced
                  </span>
                  {/* <Link
                    href={`/courses/python-coding-for-everyone`}
                    className="text-blue-900 hover:text-blue-600 transition-colors"
                  >
                    Learn more
                  </Link> */}
                </div>
              </div>
            </div>
          </div>

          <div className="mt-8 text-center md:hidden">
            <Link
              href="courses"
              className="inline-flex items-center text-blue-900"
            >
              View all courses
              <ChevronRight className="ml-1 h-5 w-5" />
            </Link>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-20 px-4 ">
        <div className="container mx-auto max-w-7xl">
          <div className="text-center mb-10" data-aos="fade-up">
            <p className="text-xl font-bold text-gray-600 max-w-2xl mx-auto">
              Join over 3000 professionals learning at LuxDev Academy
            </p>
          </div>
          <div
            className="container mx-auto max-w-4xl overflow-hidden"
            data-aos="fade-up"
          >
            <MarqueeDemo />
          </div>
        </div>
      </section>

      {/* Investment CTA Section */}
      <section className="py-20 pt-10 px-4">
        <div className="container mx-auto max-w-4xl text-center">
          <div className="bg-blue-900/5 p-12 rounded-3xl" data-aos="fade-up">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Ready to start your data science journey?
            </h2>
            <p className="text-xl text-gray-600 mb-10 max-w-2xl mx-auto">
              Join our next cohort and transform your career with cutting-edge
              skills in AI and data science.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                onClick={() => {
                  window.location.href = registrationUrl;
                }}
                size="lg"
                className="rounded-full bg-blue-900 text-white"
              >
                Enroll Now
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
              <Button
                onClick={() => {
                  window.location.href =
                    registrationUrl;
                }}
                variant="outline"
                size="lg"
                className="rounded-full"
              >
                Schedule an Assessment
                <ExternalLink className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
