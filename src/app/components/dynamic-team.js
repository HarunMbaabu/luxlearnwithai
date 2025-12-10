'use client'
import { useState, useEffect } from 'react';
import Image from 'next/image';

export default function DynamicTeamSection() {
  const [featuredIndex, setFeaturedIndex] = useState(() => 
    Math.floor(Math.random() * 5) // Start with random team member
  );

  const teamMembers = [
    {
      id: 1,
      name: "Wycliffe Bosire",
      title: "Lead Data Science Instructor",
      image: "/wic.jpeg",
      description: "Visionary educator with 8+ years in data science and education technology. Expert in machine learning, data visualization, and statistical analysis. Passionate about making complex concepts accessible and building inclusive tech communities.",
      shortDescription: "Visionary educator with 8+ years in data science and education technology.",
      bgColor: "bg-blue-100",
      hoverColor: "hover:bg-blue-200",
      overlayColor: "bg-blue-900/90",
      accentColor: "bg-blue-600",
      textColor: "text-blue-200"
    },
    {
      id: 2,
      name: "Peter Gatitu",
      title: "Lead Data Engineering Instructor ",
      image: "/profile-picture-2.jpg",
      description: "Cloud infrastructure expert with 6+ years building scalable data solutions and modern data architectures. Specializes in AWS, Apache Spark, and real-time data processing systems. Passionate about mentoring emerging engineers.",
      shortDescription: "Cloud infrastructure expert specializing in scalable data solutions.",
      bgColor: "bg-gray-100",
      hoverColor: "hover:bg-gray-200",
      overlayColor: "bg-gray-800/90",
      accentColor: "bg-gray-600",
      textColor: "text-gray-300"
    },
    {
      id: 3,
      name: "Eng. Bridgid",
      title: "Business Intelligence Specialist",
      image: "/bree.jpg",
      description: "Data storytelling expert with 5+ years turning complex datasets into actionable business insights. Specializes in Tableau, Power BI, and advanced analytics. Known for bridging the gap between technical teams and business stakeholders.",
      shortDescription: "Expert in turning data into actionable business insights.",
      bgColor: "bg-orange-100",
      hoverColor: "hover:bg-orange-200",
      overlayColor: "bg-orange-600/90",
      accentColor: "bg-orange-500",
      textColor: "text-orange-200"
    },
    {
      id: 4,
      name: "Yvonn",
      title: "AI/ML Research Lead Instructor",
      image: "/female-placeholder.svg",
      description: "AI researcher with expertise in deep learning, computer vision, and natural language processing. Published author with 10+ research papers. Focuses on making cutting-edge AI accessible through practical applications and ethical implementations.",
      shortDescription: "Bringing cutting-edge AI research into practical applications.",
      bgColor: "bg-purple-100",
      hoverColor: "hover:bg-purple-200",
      overlayColor: "bg-purple-600/90",
      accentColor: "bg-purple-500",
      textColor: "text-purple-200"
    },
    {
      id: 5,
      name: "Anthony",
      title: "Platform Engineer",
      image: "/userplaceholder.jpg",
      description: "Full-stack engineer with 4+ years building educational technology platforms. Expert in React, Node.js, and cloud infrastructure. Passionate about creating seamless learning experiences and optimizing platform performance for thousands of concurrent users.",
      shortDescription: "Building robust infrastructure for seamless learning experiences.",
      bgColor: "bg-green-100",
      hoverColor: "hover:bg-green-200",
      overlayColor: "bg-green-600/90",
      accentColor: "bg-green-500",
      textColor: "text-green-200"
    }
  ];

  // Auto-rotate featured member every 5 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setFeaturedIndex((prevIndex) => {
        const nextIndex = (prevIndex + 1) % teamMembers.length;
        console.log(`Rotating from ${prevIndex} to ${nextIndex}`); // Debug log
        return nextIndex;
      });
    }, 50000);

    return () => clearInterval(interval);
  }, []);

  const featuredMember = teamMembers[featuredIndex];
  const otherMembers = teamMembers.filter((_, index) => index !== featuredIndex);

  return (
    <section className="py-20 px-4">
      <div className="container mx-auto max-w-6xl">
        <div className="text-center mb-16" data-aos="fade-up">
          <span className="inline-block px-4 py-2 bg-blue-100 text-blue-600 rounded-full text-sm font-semibold mb-6">
            Meet the Team
          </span>
          <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 leading-tight max-w-4xl mx-auto">
            The Passionate Educators{" "}
            <span className="block text-blue-900">Behind Your Success</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto mt-6 leading-relaxed">
            Our team combines deep industry experience with a passion for teaching. 
            They're not just instructors—they're mentors, career guides, and your biggest supporters.
          </p>
        </div>

        {/* Rotation Indicator with Timer */}
        <div className="flex flex-col items-center mb-8">
          <div className="flex space-x-2 mb-3">
            {teamMembers.map((_, index) => (
              <button
                key={index}
                onClick={() => setFeaturedIndex(index)}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  index === featuredIndex 
                    ? 'bg-blue-600 scale-125' 
                    : 'bg-gray-300 hover:bg-gray-400'
                }`}
                aria-label={`Show ${teamMembers[index].name}`}
              />
            ))}
          </div>
          <p className="text-sm text-gray-500">
            Featuring: <span className="font-semibold text-blue-600">{featuredMember.name}</span>
          </p>
        </div>

        {/* Mobile: Stack all cards vertically */}
        <div className="block lg:hidden space-y-6">
          {/* Featured Member - Mobile */}
          <div 
            className={`group relative ${featuredMember.bgColor} rounded-2xl overflow-hidden transition-all duration-500 ${featuredMember.hoverColor} aspect-[4/5] transform`}
            data-aos="fade-up"
            key={`mobile-featured-${featuredMember.id}`}
          >
            <div className="absolute top-4 left-4 z-10">
              <span className="bg-white/90 backdrop-blur-sm text-gray-800 px-3 py-1 rounded-full text-xs font-semibold">
                ⭐ Featured
              </span>
            </div>
            <Image
              src={featuredMember.image}
              alt={featuredMember.name}
              fill
              className="object-cover object-center transition-transform duration-500 group-hover:scale-105"
            />
            
            {/* Hover overlay with details */}
            <div className={`absolute inset-0 ${featuredMember.overlayColor} opacity-0 group-hover:opacity-100 transition-all duration-300 flex items-end`}>
              <div className="p-6 text-white w-full">
                <h3 className="text-xl font-bold mb-2">{featuredMember.name}</h3>
                <p className={`${featuredMember.textColor} text-sm mb-3`}>{featuredMember.title}</p>
                <p className="text-sm leading-relaxed mb-4">
                  {featuredMember.shortDescription}
                </p>
                <div className="flex space-x-3">
                  <div className={`w-8 h-8 ${featuredMember.accentColor} rounded-lg flex items-center justify-center`}>
                    <span className="text-white text-sm font-bold">in</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Other team members - Mobile 2x2 Grid */}
          <div className="grid grid-cols-2 gap-4">
            {otherMembers.map((member, index) => (
              <div 
                key={`mobile-${member.id}`}
                className={`group relative ${member.bgColor} rounded-2xl overflow-hidden transition-all duration-300 ${member.hoverColor} aspect-square cursor-pointer`}
                data-aos="fade-up"
                data-aos-delay={100 * (index + 1)}
                onClick={() => setFeaturedIndex(teamMembers.findIndex(m => m.id === member.id))}
              >
                <Image
                  src={member.image}
                  alt={member.name}
                  fill
                  className="object-cover object-center transition-transform duration-300 group-hover:scale-105"
                />
                
                {/* Hover overlay with details */}
                <div className={`absolute inset-0 ${member.overlayColor} opacity-0 group-hover:opacity-100 transition-all duration-300 flex items-end`}>
                  <div className="p-3 text-white w-full">
                    <h3 className="text-sm font-bold mb-1">{member.name}</h3>
                    <p className={`${member.textColor} text-xs mb-1`}>{member.title}</p>
                    <p className="text-xs leading-relaxed mb-2">
                      {member.shortDescription}
                    </p>
                    <div className="flex space-x-1">
                      <div className={`w-5 h-5 ${member.accentColor} rounded flex items-center justify-center`}>
                        <span className="text-white text-xs font-bold">in</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Desktop: Side-by-side layout */}
        <div className="hidden lg:grid lg:grid-cols-2 gap-4">
          {/* Featured Member - Large Card */}
          <div 
            className={`group relative ${featuredMember.bgColor} rounded-2xl overflow-hidden transition-all duration-500 ${featuredMember.hoverColor} aspect-[4/5] md:aspect-auto transform`}
            data-aos="fade-up"
            key={`desktop-featured-${featuredMember.id}`}
          >
            <div className="absolute top-6 left-6 z-10">
              <span className="bg-white/90 backdrop-blur-sm text-gray-800 px-4 py-2 rounded-full text-sm font-semibold shadow-lg">
                ⭐ Featured Educator
              </span>
            </div>
            <Image
              src={featuredMember.image}
              alt={featuredMember.name}
              fill
              className="object-cover object-center transition-transform duration-500 group-hover:scale-105"
            />
            
            {/* Hover overlay with details */}
            <div className={`absolute inset-0 ${featuredMember.overlayColor} opacity-0 group-hover:opacity-100 transition-all duration-300 flex items-end`}>
              <div className="p-8 text-white w-full">
                <h3 className="text-2xl font-bold mb-2">{featuredMember.name}</h3>
                <p className={`${featuredMember.textColor} text-base mb-4`}>{featuredMember.title}</p>
                <p className="text-base leading-relaxed mb-6">
                  {featuredMember.description}
                </p>
                <div className="flex space-x-3">
                  <div className={`w-10 h-10 ${featuredMember.accentColor} rounded-lg flex items-center justify-center`}>
                    <span className="text-white text-base font-bold">in</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Other Team Members - 2x2 Grid */}
          <div className="grid grid-cols-2 gap-4">
            {otherMembers.map((member, index) => (
              <div 
                key={`desktop-${member.id}`}
                className={`group relative ${member.bgColor} rounded-2xl overflow-hidden transition-all duration-300 ${member.hoverColor} aspect-square cursor-pointer hover:scale-105 hover:shadow-lg`}
                data-aos="fade-up"
                data-aos-delay={100 * (index + 1)}
                onClick={() => setFeaturedIndex(teamMembers.findIndex(m => m.id === member.id))}
              >
                <Image
                  src={member.image}
                  alt={member.name}
                  fill
                  className="object-cover object-center transition-transform duration-300 group-hover:scale-105"
                />
                
                {/* Click indicator */}
                <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="bg-white/90 backdrop-blur-sm rounded-full p-2">
                    <svg className="w-4 h-4 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                    </svg>
                  </div>
                </div>
                
                {/* Hover overlay with details */}
                <div className={`absolute inset-0 ${member.overlayColor} opacity-0 group-hover:opacity-100 transition-all duration-300 flex items-end`}>
                  <div className="p-4 text-white w-full">
                    <h3 className="text-lg font-bold mb-1">{member.name}</h3>
                    <p className={`${member.textColor} text-xs mb-2`}>{member.title}</p>
                    <p className="text-xs leading-relaxed mb-3">
                      {member.shortDescription}
                    </p>
                    <div className="flex justify-between items-center">
                      <div className="flex space-x-2">
                        <div className={`w-6 h-6 ${member.accentColor} rounded flex items-center justify-center`}>
                          <span className="text-white text-xs font-bold">in</span>
                        </div>
                      </div>
                      <span className="text-xs text-white/70">Click to feature</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Fun Stats */}
        {/* <div className="mt-16 text-center">
          <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-2xl p-8">
            <h3 className="text-2xl font-bold text-gray-900 mb-6">
              Our Team by the Numbers
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              <div>
                <div className="text-3xl font-bold text-blue-600 mb-2">25+</div>
                <p className="text-sm text-gray-600">Years Combined Experience</p>
              </div>
              <div>
                <div className="text-3xl font-bold text-purple-600 mb-2">50+</div>
                <p className="text-sm text-gray-600">Certifications Held</p>
              </div>
              <div>
                <div className="text-3xl font-bold text-orange-600 mb-2">10+</div>
                <p className="text-sm text-gray-600">Research Publications</p>
              </div>
              <div>
                <div className="text-3xl font-bold text-green-600 mb-2">100%</div>
                <p className="text-sm text-gray-600">Passion for Teaching</p>
              </div>
            </div>
          </div>
        </div> */}
      </div>
    </section>
  );
}
