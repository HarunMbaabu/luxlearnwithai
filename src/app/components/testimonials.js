"use client"

import { useState } from "react"
import Image from "next/image"
import { ChevronRight } from "lucide-react"
import { StarRating } from "./rating"



export function TestimonialCarousel({ testimonials }) {
  const [currentIndex, setCurrentIndex] = useState(0)

  const goToPrevious = () => {
    const isFirstSlide = currentIndex === 0
    const newIndex = isFirstSlide ? testimonials.length - 1 : currentIndex - 1
    setCurrentIndex(newIndex)
  }

  const goToNext = () => {
    const isLastSlide = currentIndex === testimonials.length - 1
    const newIndex = isLastSlide ? 0 : currentIndex + 1
    setCurrentIndex(newIndex)
  }

  const goToSlide = (slideIndex) => {
    setCurrentIndex(slideIndex)
  }

  const currentTestimonial = testimonials[currentIndex]

  return (
    <div className="relative">
      {/* Navigation Arrows */}
      <button
        onClick={goToPrevious}
        className="absolute left-0 top-1/2 -translate-y-1/2 w-10 h-10 flex items-center justify-center text-gray-500 hover:text-primary transition-colors z-10"
        aria-label="Previous testimonial"
      >
        <ChevronRight className="h-8 w-8 rotate-180" />
      </button>

      <button
        onClick={goToNext}
        className="absolute right-0 top-1/2 -translate-y-1/2 w-10 h-10 flex items-center justify-center text-gray-500 hover:text-primary transition-colors z-10"
        aria-label="Next testimonial"
      >
        <ChevronRight className="h-8 w-8" />
      </button>

      {/* Testimonial Content */}
      <div className="text-center px-12 md:px-20">
        {/* Profile Image */}
        <div className="mx-auto w-20 h-20 rounded-full overflow-hidden mb-10 relative">
          <Image
            src={currentTestimonial.image || "/placeholder.svg"}
            alt={`${currentTestimonial.name}'s profile`}
            fill
            className="object-cover"
          />
        </div>

        {/* Quote */}
        <blockquote className="text-2xl md:text-3xl font-medium text-gray-800 mb-8 max-w-3xl mx-auto leading-relaxed">
          {currentTestimonial.quote}
        </blockquote>

        {/* Author */}
        <div className="mb-6">
          <h4 className="text-xl font-bold">{currentTestimonial.name}</h4>
          <p className="text-gray-600 mb-4">{currentTestimonial.role}</p>
          <StarRating rating={currentTestimonial.rating} />
        </div>

        {/* Pagination Dots */}
        <div className="flex items-center justify-center gap-2 mt-8">
          {testimonials.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`w-2 h-2 rounded-full ${index === currentIndex ? "bg-primary" : "bg-gray-300"}`}
              aria-label={`Go to testimonial ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </div>
  )
}

