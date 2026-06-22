"use client";
import { useEffect, useState } from "react";
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
  Laptop,
  Building2,
  CheckCircle2,
  CreditCard,
  Percent,
  PauseCircle,
  Infinity,
  GraduationCap,
  Clock,
  MapPin,
  Headphones,
  Library,
  Images,
} from "lucide-react";
import Header from "./components/header";
import Footer from "./components/footer";
import { MarqueeDemo } from "./components/marquee";
import ApplicationProcess from "./components/application_process";
import { Dialog, DialogTrigger, DialogContent, DialogTitle } from "@/components/ui/dialog";
import FullProgramForm from "@/components/FullProgramForm";
import UniversalEnrollmentForm from "@/components/UniversalEnrollmentForm";
import ProgramOverview from "@/components/program-overview";
import BenefitsSection from "@/components/benefits-section";

export default function Home() {
  const registrationUrl = process.env.NEXT_PUBLIC_REGISTRATION_LINK ?? '#';
  const [showFullProgramForm, setShowFullProgramForm] = useState(false);
  const [showUniversalEnrollmentForm, setShowUniversalEnrollmentForm] = useState(false);
  useEffect(() => {
    AOS.init({ duration: 700, once: true });
  }, []);

  const galleryImages = [
    { src: "/gallery/LUXGRADUATION_-213.jpg", alt: "LuxDev Academy graduation celebration" },
    { src: "/gallery/LUXGRADUATION_-192.jpg", alt: "LuxDev Academy student community moment" },
    { src: "/gallery/LUXGRADUATION_-290.jpg", alt: "LuxDev Academy graduates celebrating achievement" },
    { src: "/gallery/LUX22GRADUATION..(46of199).jpg", alt: "LuxDev Academy in-person learning community" },
    { src: "/gallery/LUXGRADUATION_-251.jpg", alt: "LuxDev Academy student success event" },
    { src: "/gallery/LUX22GRADUATION..(97of199).jpg", alt: "LuxDev Academy learners and mentors" },
  ];

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
                <Dialog open={showUniversalEnrollmentForm} onOpenChange={setShowUniversalEnrollmentForm}>
              <DialogTrigger asChild>
                <Button
                  size="sm"
                  className="rounded-full bg-blue-900 text-white"
                  onClick={() => setShowUniversalEnrollmentForm(true)}
                >
                  Enroll now
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogTitle>Enrollment</DialogTitle>
                <UniversalEnrollmentForm onClose={() => setShowUniversalEnrollmentForm(false)} />
              </DialogContent>
            </Dialog>
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

      <section className="py-16 px-4 bg-white">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-12" data-aos="fade-up">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Our Training Programs</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Explore our core learning tracks built for data careers in analytics, AI, and data engineering.
            </p>
          </div>
          <ProgramOverview />
        </div>
      </section>

      <section className="py-16 px-4 bg-slate-50">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-12" data-aos="fade-up">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Why Join LuxDevHQ?</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Learn with hands-on mentorship, flexible options, and career-focused support from day one.
            </p>
          </div>
          <BenefitsSection />
        </div>
      </section>


      <section className="py-16 px-4 bg-white">
        <div className="container mx-auto max-w-6xl">
          <div
            className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-sky-500 via-teal-400 to-emerald-300 p-8 md:p-12 shadow-2xl shadow-blue-900/10"
            data-aos="fade-up"
          >
            <div className="absolute -right-24 -top-24 h-72 w-72 rounded-full bg-white/20 blur-3xl"></div>
            <div className="absolute right-10 bottom-8 hidden h-40 w-40 rounded-full border-8 border-white/20 md:block"></div>
            <div className="relative grid grid-cols-1 items-center gap-10 lg:grid-cols-[1.05fr_0.95fr]">
              <div className="text-white">
                <span className="mb-5 inline-flex rounded-full bg-rose-500 px-4 py-2 text-sm font-extrabold uppercase tracking-wide shadow-lg shadow-rose-900/20">
                  Best offer
                </span>
                <h2 className="text-4xl font-black leading-tight md:text-5xl">
                  Pay upfront and save 10%
                </h2>
                <p className="mt-5 max-w-2xl text-lg font-medium text-white/90">
                  Pay your full LuxDevHQ tuition before your cohort starts and enjoy a 10% discount while securing lifetime access after you enroll, complete, and graduate.
                </p>
                <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                  <Dialog open={showUniversalEnrollmentForm} onOpenChange={setShowUniversalEnrollmentForm}>
                    <DialogTrigger asChild>
                      <Button
                        size="lg"
                        className="rounded-full bg-amber-500 text-white hover:bg-amber-600"
                        onClick={() => setShowUniversalEnrollmentForm(true)}
                      >
                        Apply now
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </Button>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogTitle>Enrollment</DialogTitle>
                      <UniversalEnrollmentForm onClose={() => setShowUniversalEnrollmentForm(false)} />
                    </DialogContent>
                  </Dialog>
                  <Link
                    href="/pricing"
                    className="inline-flex items-center justify-center rounded-full bg-white/15 px-6 py-3 font-semibold text-white ring-1 ring-white/35 backdrop-blur transition hover:bg-white/25"
                  >
                    View payment plans
                  </Link>
                </div>
              </div>

              <div className="relative mx-auto w-full max-w-md">
                <div className="absolute -left-6 top-8 rounded-2xl bg-white p-4 shadow-xl">
                  <CreditCard className="h-8 w-8 text-sky-500" />
                </div>
                <div className="absolute -right-3 top-0 rounded-2xl bg-blue-500 p-4 shadow-xl">
                  <Percent className="h-8 w-8 text-white" />
                </div>
                <div className="rounded-[2rem] bg-white/95 p-7 shadow-2xl ring-1 ring-white/50">
                  <div className="mb-6 flex items-center gap-4">
                    <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-blue-900 text-white">
                      <GraduationCap className="h-8 w-8" />
                    </div>
                    <div>
                      <p className="text-sm font-bold uppercase tracking-widest text-rose-500">
                        Enrolling now
                      </p>
                      <h3 className="text-2xl font-black text-blue-950">
                        Flexible tuition
                      </h3>
                    </div>
                  </div>
                  <div className="space-y-4 text-gray-700">
                    <div className="flex gap-3">
                      <CheckCircle2 className="mt-1 h-5 w-5 flex-shrink-0 text-emerald-500" />
                      <p>Pay monthly in manageable installments designed for real budgets.</p>
                    </div>
                    <div className="flex gap-3">
                      <CheckCircle2 className="mt-1 h-5 w-5 flex-shrink-0 text-emerald-500" />
                      <p>One of the world&apos;s most affordable big data analytics, data science, AI, and data engineering bootcamps.</p>
                    </div>
                    <div className="flex gap-3">
                      <Infinity className="mt-1 h-5 w-5 flex-shrink-0 text-blue-600" />
                      <p>Graduate once and keep lifetime access to our course materials.</p>
                    </div>
                    <div className="flex gap-3">
                      <PauseCircle className="mt-1 h-5 w-5 flex-shrink-0 text-amber-500" />
                      <p>Need time away? Take learning breaks as needed and continue when ready.</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Programs Section */}
      <section className="py-16 px-4 bg-slate-50">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-12" data-aos="fade-up">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Program Access and Enrollment Options
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Choose a flexible learning path with live online classes, in-person learning at Garden Court HQ, continuous support, and reliable access to learning materials.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div
              className="relative overflow-hidden bg-gradient-to-br from-blue-950 via-blue-900 to-blue-700 rounded-3xl p-8 text-white shadow-xl shadow-blue-900/10"
              data-aos="fade-up"
            >
              <div className="absolute -right-16 -top-16 h-48 w-48 rounded-full bg-white/10 blur-2xl"></div>
              <div className="relative">
                <div className="mb-6 inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-white/15 ring-1 ring-white/20">
                  <Laptop className="h-7 w-7" />
                </div>
                <p className="mb-3 text-sm font-semibold uppercase tracking-[0.25em] text-blue-100">
                  Live online cohorts
                </p>
                <h3 className="text-3xl font-bold mb-4">Online Classes</h3>
                <p className="mb-6 text-blue-50">
                  Join mentor-led online classes from wherever you are. Our morning and evening schedules make learning accessible for students balancing work, school, or personal commitments.
                </p>
                <div className="mb-8 rounded-2xl bg-white/10 p-5 ring-1 ring-white/15 backdrop-blur">
                  <p className="text-sm font-medium text-blue-100">Investment</p>
                  <div className="mt-2 text-4xl font-black tracking-tight">
                    7,500 KES<span className="text-base font-semibold text-blue-100">/month</span>
                  </div>
                  <p className="mt-1 text-blue-100">(30,000 KES total)</p>
                </div>
                <div className="mb-8 space-y-3 text-sm text-blue-50">
                  <div className="rounded-2xl bg-white/10 px-4 py-3 ring-1 ring-white/10">
                    <div className="flex items-center gap-2 font-semibold"><Clock className="h-4 w-4" /> Morning online classes</div>
                    <p className="mt-1 text-blue-100">10:00 AM to 1:30 PM EAT</p>
                  </div>
                  <div className="rounded-2xl bg-white/10 px-4 py-3 ring-1 ring-white/10">
                    <div className="flex items-center gap-2 font-semibold"><Clock className="h-4 w-4" /> Evening online classes</div>
                    <p className="mt-1 text-blue-100">7:30 PM to 10:00 PM EAT</p>
                  </div>
                  <div className="grid gap-3 sm:grid-cols-2">
                    <span className="rounded-full bg-white/10 px-4 py-2">🧑‍🏫 Mentor guidance</span>
                    <span className="rounded-full bg-white/10 px-4 py-2">🚀 Career projects</span>
                  </div>
                </div>
                <Dialog open={showFullProgramForm} onOpenChange={setShowFullProgramForm}>
                  <DialogTrigger asChild>
                    <Button
                      size="sm"
                      className="rounded-full bg-white text-blue-900 hover:bg-blue-50"
                      onClick={() => setShowFullProgramForm(true)}
                    >
                      Enroll online
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogTitle>Online Learning Enrollment</DialogTitle>
                    <FullProgramForm onClose={() => setShowFullProgramForm(false)} />
                  </DialogContent>
                </Dialog>
              </div>
            </div>

            <div
              className="relative overflow-hidden rounded-3xl border border-blue-100 bg-white p-8 shadow-xl shadow-blue-900/5"
              data-aos="fade-up"
            >
              <div className="absolute -left-16 -bottom-16 h-48 w-48 rounded-full bg-blue-100 blur-2xl"></div>
              <div className="relative">
                <div className="mb-6 inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-blue-900 text-white shadow-lg shadow-blue-900/20">
                  <Building2 className="h-7 w-7" />
                </div>
                <p className="mb-3 text-sm font-semibold uppercase tracking-[0.25em] text-blue-700">
                  Campus immersion
                </p>
                <h3 className="text-3xl font-bold text-blue-950 mb-4">In-Person Classes</h3>
                <p className="mb-6 text-gray-600">
                  Learn physically at our Garden Court HQ with structured morning sessions, peer collaboration, direct mentor interaction, and daytime access to the school and learning resources.
                </p>
                <div className="mb-8 rounded-2xl border border-blue-100 bg-blue-50 p-5">
                  <p className="text-sm font-medium text-blue-700">Investment</p>
                  <div className="mt-2 text-4xl font-black tracking-tight text-blue-950">
                    12,500 KES<span className="text-base font-semibold text-blue-700">/month</span>
                  </div>
                  <p className="mt-1 text-blue-700">(50,000 KES total)</p>
                </div>
                <div className="mb-8 space-y-3 text-sm text-blue-950">
                  <div className="rounded-2xl bg-blue-50 px-4 py-3 ring-1 ring-blue-100">
                    <div className="flex items-center gap-2 font-semibold"><MapPin className="h-4 w-4" /> Garden Court HQ schedule</div>
                    <p className="mt-1 text-blue-700">10:00 AM to 1:30 PM EAT</p>
                  </div>
                  <div className="grid gap-3 sm:grid-cols-2">
                    <span className="rounded-full bg-blue-50 px-4 py-2">🏢 Daytime resource access</span>
                    <span className="rounded-full bg-blue-50 px-4 py-2">🤝 Peer labs</span>
                    <span className="rounded-full bg-blue-50 px-4 py-2">🎯 Mentor reviews</span>
                    <span className="rounded-full bg-blue-50 px-4 py-2">📚 Learning materials</span>
                  </div>
                </div>
                <Dialog open={showUniversalEnrollmentForm} onOpenChange={setShowUniversalEnrollmentForm}>
                  <DialogTrigger asChild>
                    <Button
                      size="sm"
                      className="rounded-full bg-blue-900 text-white"
                      onClick={() => setShowUniversalEnrollmentForm(true)}
                    >
                      Enroll on campus
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogTitle>Physical Classes Enrollment</DialogTitle>
                    <UniversalEnrollmentForm onClose={() => setShowUniversalEnrollmentForm(false)} />
                  </DialogContent>
                </Dialog>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 px-4 bg-white">
        <div className="container mx-auto max-w-6xl">
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
            <div data-aos="fade-up">
              <p className="mb-3 text-sm font-bold uppercase tracking-[0.25em] text-blue-700">Student support and resources</p>
              <h2 className="mb-5 text-3xl font-bold text-blue-950 md:text-4xl">Support that stays with you, anytime you learn</h2>
              <p className="text-lg text-gray-600">
                Every student gets 24/7 support and 24/7 access to school resources, so you can review lessons, practice with learning materials, and ask for help whenever your schedule allows.
              </p>
            </div>
            <div className="grid gap-4 sm:grid-cols-2" data-aos="fade-up">
              <div className="rounded-3xl border border-blue-100 bg-blue-50 p-6">
                <Headphones className="mb-4 h-8 w-8 text-blue-900" />
                <h3 className="mb-2 text-xl font-bold text-blue-950">24/7 student support</h3>
                <p className="text-gray-600">Get continuous guidance for coursework, projects, and learning blockers.</p>
              </div>
              <div className="rounded-3xl border border-emerald-100 bg-emerald-50 p-6">
                <Library className="mb-4 h-8 w-8 text-emerald-700" />
                <h3 className="mb-2 text-xl font-bold text-emerald-950">24/7 resource access</h3>
                <p className="text-gray-600">Use school resources and learning materials whenever you need to study.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="overflow-hidden bg-slate-950 py-20 px-4 text-white">
        <div className="container mx-auto max-w-7xl">
          <div className="mb-12 flex flex-col gap-6 md:flex-row md:items-end md:justify-between" data-aos="fade-up">
            <div>
              <div className="mb-4 inline-flex items-center rounded-full bg-white/10 px-4 py-2 text-sm font-semibold text-blue-100 ring-1 ring-white/15">
                <Images className="mr-2 h-4 w-4" /> Campus gallery
              </div>
              <h2 className="text-3xl font-black md:text-5xl">A glimpse of learning, community, and celebration</h2>
            </div>
            <p className="max-w-xl text-lg text-slate-300">
              Explore moments from our LuxDev Academy community, from in-person milestones to the energy that supports every online and campus learner.
            </p>
          </div>
          <div className="grid auto-rows-[220px] grid-cols-1 gap-4 md:grid-cols-4">
            {galleryImages.map((image, index) => (
              <div
                key={image.src}
                className={`group relative overflow-hidden rounded-3xl bg-white/10 shadow-2xl ring-1 ring-white/10 ${index === 0 ? "md:col-span-2 md:row-span-2" : ""} ${index === 3 ? "md:col-span-2" : ""}`}
                data-aos="zoom-in"
              >
                <Image src={image.src} alt={image.alt} fill sizes="(min-width: 768px) 25vw, 100vw" className="object-cover transition duration-700 group-hover:scale-110" />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-transparent to-transparent opacity-80"></div>
              </div>
            ))}
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
            <div className="mx-auto mb-6 flex h-24 w-24 items-center justify-center rounded-full bg-blue-900/5">
              <svg
                viewBox="0 0 160 160"
                role="img"
                aria-label="Student success conversation illustration"
                className="h-20 w-20"
              >
                <defs>
                  <linearGradient id="studentStoryGradient" x1="24" y1="18" x2="136" y2="142" gradientUnits="userSpaceOnUse">
                    <stop stopColor="#1E3A8A" />
                    <stop offset="1" stopColor="#60A5FA" />
                  </linearGradient>
                </defs>
                <circle cx="80" cy="80" r="68" fill="#EFF6FF" />
                <path
                  d="M46 51h68c9 0 16 7 16 16v26c0 9-7 16-16 16H82l-24 18 5-18H46c-9 0-16-7-16-16V67c0-9 7-16 16-16Z"
                  fill="url(#studentStoryGradient)"
                />
                <circle cx="60" cy="82" r="7" fill="white" opacity="0.95" />
                <circle cx="80" cy="82" r="7" fill="white" opacity="0.95" />
                <circle cx="100" cy="82" r="7" fill="white" opacity="0.95" />
                <path
                  d="M54 42c8-12 21-19 36-17 11 2 20 8 26 17"
                  fill="none"
                  stroke="#93C5FD"
                  strokeWidth="8"
                  strokeLinecap="round"
                />
                <path
                  d="M48 119c9 9 20 14 33 14s25-5 33-14"
                  fill="none"
                  stroke="#1E3A8A"
                  strokeWidth="6"
                  strokeLinecap="round"
                  opacity="0.35"
                />
              </svg>
            </div>
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
            <Dialog open={showUniversalEnrollmentForm} onOpenChange={setShowUniversalEnrollmentForm}>
              <DialogTrigger asChild>
                <Button
                  size="sm"
                  className="rounded-full bg-blue-900 text-white"
                  onClick={() => setShowUniversalEnrollmentForm(true)}
                >
                  Enroll now
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogTitle>Enrollment</DialogTitle>
                <UniversalEnrollmentForm onClose={() => setShowUniversalEnrollmentForm(false)} />
              </DialogContent>
            </Dialog>
              <Button
                onClick={() => {
                  window.location.href =
                    registrationUrl;
                }}
                variant="outline"
                size="lg"
                className="rounded-full"
              >
Book a Consultation
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
