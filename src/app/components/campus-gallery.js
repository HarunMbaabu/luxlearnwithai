"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ChevronLeft, ChevronRight, Images, X } from "lucide-react";

const galleryItems = [
  {
    src: "/gallery/LUXGRADUATION_-213.jpg",
    alt: "LuxDevHQ graduates celebrating together at a campus graduation event",
    title: "A milestone shared",
    category: "Graduation Moments",
    caption: "Celebrating the commitment, growth, and friendships behind every LuxDevHQ graduation.",
    featured: true,
    layout: "md:col-span-2 md:row-span-2",
    position: "object-center",
  },
  {
    src: "/gallery/LUXGRADUATION_-192.jpg",
    alt: "LuxDevHQ learners connecting during an in-person community gathering",
    title: "Learning side by side",
    category: "Hands-on Learning",
    caption: "In-person moments that turn lessons into practical, shared experiences.",
    featured: false,
    layout: "md:col-span-1",
    position: "object-center",
  },
  {
    src: "/gallery/LUXGRADUATION_-290.jpg",
    alt: "LuxDevHQ community members gathered for a campus event",
    title: "Stronger together",
    category: "Community Workshops",
    caption: "Our community comes together to exchange ideas, encourage one another, and keep building.",
    featured: false,
    layout: "md:col-span-1",
    position: "object-center",
  },
  {
    src: "/gallery/LUX22GRADUATION..(46of199).jpg",
    alt: "LuxDevHQ students sharing a collaborative moment at graduation",
    title: "Built through collaboration",
    category: "Project Collaboration",
    caption: "Teamwork is at the centre of how our learners solve problems and grow their confidence.",
    featured: false,
    layout: "md:col-span-2",
    position: "object-center",
  },
  {
    src: "/gallery/LUXGRADUATION_-251.jpg",
    alt: "A LuxDevHQ graduate marking the completion of their learning journey",
    title: "Ready for what is next",
    category: "Career Mentorship",
    caption: "Every milestone is supported by practical guidance and a focus on the world of work.",
    featured: false,
    layout: "md:col-span-1",
    position: "object-center",
  },
  {
    src: "/gallery/LUX22GRADUATION..(97of199).jpg",
    alt: "LuxDevHQ learners and mentors celebrating an achievement together",
    title: "People behind the progress",
    category: "Beyond the Classroom",
    caption: "The conversations, connections, and experiences that make learning memorable.",
    featured: false,
    layout: "md:col-span-1",
    position: "object-center",
  },
  {
    src: "/gallery/LUXGRADUATION_-95.jpg",
    alt: "LuxDevHQ community members enjoying a graduation celebration",
    title: "Celebrate every win",
    category: "Graduation Moments",
    caption: "Big achievements deserve to be recognised by the community that helped make them possible.",
    featured: false,
    layout: "md:col-span-1",
    position: "object-center",
  },
  {
    src: "/gallery/LUXGRADUATION_-212.jpg",
    alt: "LuxDevHQ graduates spending time together beyond the classroom",
    title: "Community in every moment",
    category: "Beyond the Classroom",
    caption: "Connection continues beyond class through community events, shared milestones, and team experiences.",
    featured: false,
    layout: "md:col-span-1",
    position: "object-center",
  },
];

export default function CampusGallery() {
  const [activeIndex, setActiveIndex] = useState(null);
  const touchStart = useRef(null);
  const closeButton = useRef(null);

  const close = () => setActiveIndex(null);
  const move = (direction) => {
    setActiveIndex((current) => (current + direction + galleryItems.length) % galleryItems.length);
  };

  useEffect(() => {
    if (activeIndex === null) return undefined;

    const previousOverflow = document.body.style.overflow;
    const previousPadding = document.body.style.paddingRight;
    const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;
    document.body.style.overflow = "hidden";
    if (scrollbarWidth) document.body.style.paddingRight = `${scrollbarWidth}px`;
    closeButton.current?.focus();

    const onKeyDown = (event) => {
      if (event.key === "Escape") close();
      if (event.key === "ArrowLeft") move(-1);
      if (event.key === "ArrowRight") move(1);
    };
    window.addEventListener("keydown", onKeyDown);

    return () => {
      window.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = previousOverflow;
      document.body.style.paddingRight = previousPadding;
    };
  }, [activeIndex]);

  const activeItem = activeIndex === null ? null : galleryItems[activeIndex];

  return (
    <section className="overflow-hidden bg-slate-950 px-4 py-20 text-white" aria-labelledby="campus-gallery-title">
      <div className="container mx-auto max-w-7xl">
        <div className="mb-12 max-w-3xl" data-aos="fade-up">
          <div className="mb-5 inline-flex items-center rounded-full bg-blue-400/10 px-4 py-2 text-sm font-semibold text-blue-100 ring-1 ring-blue-200/20">
            <Images className="mr-2 h-4 w-4" aria-hidden="true" /> Life at LuxDevHQ
          </div>
          <h2 id="campus-gallery-title" className="text-4xl font-black tracking-tight md:text-5xl">Campus Gallery</h2>
          <p className="mt-5 text-lg leading-relaxed text-slate-300 md:text-xl">
            A glimpse into how we learn, collaborate, build, and celebrate together.
          </p>
        </div>

        <div className="grid auto-rows-[280px] grid-cols-1 gap-4 md:auto-rows-[230px] md:grid-cols-4" data-aos="fade-up">
          {galleryItems.map((item, index) => (
            <button
              key={item.src}
              type="button"
              onClick={() => setActiveIndex(index)}
              className={`group relative overflow-hidden rounded-3xl bg-slate-800 text-left shadow-2xl shadow-black/20 ring-1 ring-white/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-300 focus-visible:ring-offset-4 focus-visible:ring-offset-slate-950 ${item.layout}`}
              aria-label={`Open image: ${item.title}`}
            >
              <Image
                src={item.src}
                alt={item.alt}
                fill
                sizes={item.featured ? "(min-width: 768px) 50vw, 100vw" : "(min-width: 768px) 25vw, 100vw"}
                className={`object-cover ${item.position} transition duration-500 ease-out motion-reduce:transition-none group-hover:scale-[1.035] motion-reduce:group-hover:scale-100`}
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/10 to-transparent opacity-75 transition-opacity duration-300 group-hover:opacity-95 motion-reduce:transition-none" />
              <div className="absolute inset-x-0 bottom-0 translate-y-2 p-5 transition duration-300 group-hover:translate-y-0 motion-reduce:transform-none motion-reduce:transition-none md:p-6">
                <span className="inline-flex rounded-full bg-slate-950/60 px-3 py-1 text-[11px] font-bold uppercase tracking-[0.14em] text-blue-100 ring-1 ring-white/20 backdrop-blur-sm">
                  {item.category}
                </span>
                <h3 className="mt-3 text-lg font-bold text-white opacity-0 transition-opacity duration-300 group-hover:opacity-100 group-focus-visible:opacity-100 motion-reduce:transition-none">
                  {item.title}
                </h3>
              </div>
            </button>
          ))}
        </div>

        <div className="mt-12 flex flex-col items-start justify-between gap-6 rounded-3xl border border-white/10 bg-white/[0.06] p-7 md:flex-row md:items-center md:p-9">
          <div>
            <h3 className="text-2xl font-bold">Experience the LuxDevHQ Community</h3>
            <p className="mt-2 max-w-2xl text-slate-300">Join a learning community where technical skills, collaboration, mentorship, and real-world experience come together.</p>
          </div>
          <Link href="/#programmes" className="inline-flex shrink-0 items-center rounded-full bg-blue-700 px-6 py-3 font-semibold text-white transition hover:bg-blue-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-300 focus-visible:ring-offset-4 focus-visible:ring-offset-slate-950 motion-reduce:transition-none">
            Explore Our Programmes <ArrowRight className="ml-2 h-4 w-4" aria-hidden="true" />
          </Link>
        </div>
      </div>

      {activeItem && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-slate-950/95 p-4 backdrop-blur-md md:p-10"
          role="dialog"
          aria-modal="true"
          aria-labelledby="gallery-dialog-title"
          onMouseDown={(event) => event.target === event.currentTarget && close()}
          onTouchStart={(event) => { touchStart.current = event.touches[0].clientX; }}
          onTouchEnd={(event) => {
            if (touchStart.current === null) return;
            const distance = event.changedTouches[0].clientX - touchStart.current;
            if (Math.abs(distance) > 50) move(distance > 0 ? -1 : 1);
            touchStart.current = null;
          }}
        >
          <button ref={closeButton} type="button" onClick={close} className="absolute right-4 top-4 z-10 rounded-full bg-white/10 p-3 text-white ring-1 ring-white/20 transition hover:bg-white/20 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-300 motion-reduce:transition-none md:right-8 md:top-8" aria-label="Close gallery">
            <X className="h-6 w-6" aria-hidden="true" />
          </button>
          <button type="button" onClick={() => move(-1)} className="absolute left-3 z-10 rounded-full bg-white/10 p-3 text-white ring-1 ring-white/20 transition hover:bg-white/20 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-300 motion-reduce:transition-none md:left-8" aria-label="Previous image">
            <ChevronLeft className="h-6 w-6" aria-hidden="true" />
          </button>
          <div className="flex h-full w-full max-w-6xl flex-col justify-center">
            <div className="relative min-h-0 flex-1 overflow-hidden rounded-2xl bg-black/30 shadow-2xl ring-1 ring-white/10">
              <Image src={activeItem.src} alt={activeItem.alt} fill sizes="100vw" className="object-contain" priority />
            </div>
            <div className="mx-auto max-w-3xl px-12 pb-1 pt-5 text-center">
              <p className="text-xs font-bold uppercase tracking-[0.18em] text-blue-300">{activeItem.category}</p>
              <h3 id="gallery-dialog-title" className="mt-1 text-xl font-bold md:text-2xl">{activeItem.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-slate-300 md:text-base">{activeItem.caption}</p>
              <p className="mt-2 text-xs text-slate-500">{activeIndex + 1} / {galleryItems.length}</p>
            </div>
          </div>
          <button type="button" onClick={() => move(1)} className="absolute right-3 z-10 rounded-full bg-white/10 p-3 text-white ring-1 ring-white/20 transition hover:bg-white/20 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-300 motion-reduce:transition-none md:right-8" aria-label="Next image">
            <ChevronRight className="h-6 w-6" aria-hidden="true" />
          </button>
        </div>
      )}
    </section>
  );
}
