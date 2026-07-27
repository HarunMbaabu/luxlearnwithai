import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  BriefcaseBusiness,
  FolderKanban,
  GraduationCap,
  Handshake,
  UsersRound,
} from "lucide-react";

const benefits = [
  {
    title: "Real-World Projects",
    description:
      "Develop practical skills by working on projects inspired by real business and industry challenges.",
    icon: FolderKanban,
    accent: "bg-sky-100 text-sky-800",
  },
  {
    title: "Industry Experts",
    description:
      "Learn directly from experienced professionals who are available to guide, support, and mentor learners.",
    icon: GraduationCap,
    accent: "bg-amber-100 text-amber-800",
  },
  {
    title: "Career Support and 1:1 Coaching",
    description:
      "Receive personalised career guidance, CV support, interview preparation, portfolio reviews, and individual coaching.",
    icon: BriefcaseBusiness,
    accent: "bg-emerald-100 text-emerald-800",
  },
];

const photos = [
  {
    src: "/gallery/DSC_4151.jpg",
    alt: "LuxDevHQ learners working together with an instructor in a physical classroom",
    caption: "Learn together",
    className: "col-span-2 row-span-2 min-h-[330px] md:min-h-[520px]",
    sizes: "(min-width: 1024px) 42vw, (min-width: 768px) 66vw, 100vw",
  },
  {
    src: "/gallery/DSC_3484.jpg",
    alt: "Student and instructor discussing practical work at LuxDevHQ",
    caption: "Guidance when it matters",
    className: "min-h-[190px] md:min-h-0",
    sizes: "(min-width: 768px) 33vw, 50vw",
  },
  {
    src: "/gallery/LUXDEV.HQSARIT2026-223.jpg",
    alt: "LuxDevHQ community members taking part in a collaborative workshop",
    caption: "Build through practice",
    className: "min-h-[190px] md:min-h-0",
    sizes: "(min-width: 768px) 33vw, 50vw",
  },
  {
    src: "/gallery/LUXDEV.HQSARIT2026-221.jpg",
    alt: "Learners networking at a LuxDevHQ community event",
    caption: "Grow your network",
    className: "col-span-2 min-h-[210px] md:min-h-0",
    sizes: "(min-width: 768px) 33vw, 100vw",
  },
];

export default function LearningExperience() {
  return (
    <section className="overflow-hidden bg-white px-4 py-20 md:py-28" aria-labelledby="learning-experience-title">
      <div className="container mx-auto max-w-7xl">
        <div className="grid gap-12 lg:grid-cols-[0.92fr_1.08fr] lg:items-end">
          <div data-aos="fade-up">
            <span className="inline-flex items-center rounded-full bg-blue-50 px-4 py-2 text-sm font-bold text-blue-900">
              <UsersRound className="mr-2 h-4 w-4" aria-hidden="true" /> The LuxDevHQ experience
            </span>
            <h2 id="learning-experience-title" className="mt-6 text-4xl font-black leading-tight tracking-tight text-blue-950 md:text-5xl">
              Learn with supportive teachers and transform your career in just a few months.
            </h2>
          </div>
          <p className="max-w-2xl text-lg leading-relaxed text-slate-600 md:text-xl" data-aos="fade-up">
            Build solid foundations by working on practical, real-world projects while receiving guidance from experienced industry professionals.
          </p>
        </div>

        <div className="mt-12 grid auto-rows-[160px] grid-cols-2 gap-3 md:auto-rows-[250px] md:grid-cols-3 md:gap-5" data-aos="fade-up">
          {photos.map((photo) => (
            <figure key={photo.src} className={`group relative overflow-hidden rounded-3xl bg-slate-200 shadow-lg shadow-slate-900/10 ${photo.className}`}>
              <Image
                src={photo.src}
                alt={photo.alt}
                fill
                sizes={photo.sizes}
                className="object-cover transition duration-500 ease-out group-hover:scale-[1.03] motion-reduce:transition-none motion-reduce:group-hover:scale-100"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/75 via-transparent to-transparent" />
              <figcaption className="absolute bottom-0 left-0 p-5 text-sm font-bold text-white md:p-6 md:text-base">
                {photo.caption}
              </figcaption>
            </figure>
          ))}
        </div>

        <div className="mt-14 grid gap-5 md:grid-cols-3">
          {benefits.map(({ title, description, icon: Icon, accent }, index) => (
            <article key={title} className="group rounded-3xl border border-slate-200 bg-white p-7 shadow-sm transition duration-300 hover:-translate-y-1 hover:border-blue-200 hover:shadow-xl motion-reduce:transform-none motion-reduce:transition-none" data-aos="fade-up" data-aos-delay={index * 75}>
              <div className={`mb-6 inline-flex rounded-2xl p-3 ${accent}`}><Icon className="h-6 w-6" aria-hidden="true" /></div>
              <h3 className="text-xl font-bold text-blue-950">{title}</h3>
              <p className="mt-3 leading-relaxed text-slate-600">{description}</p>
            </article>
          ))}
        </div>

        <div className="relative mt-16 overflow-hidden rounded-[2rem] bg-blue-950 px-7 py-10 text-white md:px-12 md:py-14" data-aos="fade-up">
          <div className="absolute -right-16 -top-20 h-64 w-64 rounded-full bg-sky-400/20 blur-3xl" />
          <div className="relative grid gap-8 lg:grid-cols-[0.75fr_1.25fr] lg:items-center">
            <div>
              <Handshake className="mb-5 h-9 w-9 text-sky-300" aria-hidden="true" />
              <h3 className="text-3xl font-black md:text-4xl">Career support beyond the classroom</h3>
            </div>
            <p className="text-lg leading-relaxed text-blue-100">
              Our career services help learners prepare for opportunities in technology through personalised coaching, job fairs, interview preparation, professional networking, and access to a growing network of hiring partners.
            </p>
          </div>
        </div>

        <div className="mt-10 flex flex-col items-start justify-between gap-6 rounded-3xl bg-sky-50 p-7 ring-1 ring-sky-100 md:flex-row md:items-center md:p-10">
          <h3 className="max-w-2xl text-2xl font-black text-blue-950 md:text-3xl">Ready to build practical skills and begin your technology career?</h3>
          <div className="flex w-full flex-col gap-3 sm:w-auto sm:flex-row">
            <Link href="/#programmes" className="inline-flex items-center justify-center rounded-full border-2 border-blue-900 px-6 py-3 font-bold text-blue-900 transition hover:bg-blue-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-700 focus-visible:ring-offset-2 motion-reduce:transition-none">
              Explore Our Programs
            </Link>
            <Link href="/enroll" className="inline-flex items-center justify-center rounded-full bg-blue-900 px-6 py-3 font-bold text-white transition hover:bg-blue-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-700 focus-visible:ring-offset-2 motion-reduce:transition-none">
              Join the Next Intake <ArrowRight className="ml-2 h-4 w-4" aria-hidden="true" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
