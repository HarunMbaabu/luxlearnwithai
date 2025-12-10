'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';

export default function CoworkingPage() {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isVisible, setIsVisible] = useState({});

  const heroImages = [
    '/api/placeholder/1200/600', // Replace with actual workspace images
    '/api/placeholder/1200/600',
    '/api/placeholder/1200/600'
  ];

  const amenities = [
    {
      icon: '💺',
      title: 'Flexible Seating',
      description: 'Choose from standing desks, private booths, swings, couches, and everything in between'
    },
    {
      icon: '☕',
      title: 'Specialty Coffee Bar',
      description: 'Members-only coffee bar with professional baristas crafting your perfect cup'
    },
    {
      icon: '🧘‍♀️',
      title: 'Wellness Program',
      description: 'Complimentary yoga & meditation sessions to boost your productivity'
    },
    {
      icon: '🏢',
      title: 'Meeting Rooms',
      description: 'Professional conference rooms and phone booths for private conversations'
    },
    {
      icon: '🌿',
      title: 'Biophilic Design',
      description: 'Work indoors or outdoors in spaces that blend with natural environments'
    },
    {
      icon: '🚿',
      title: 'Full Amenities',
      description: 'Prayer rooms, mother\'s rooms, showers, and secure workspace facilities'
    }
  ];

  const features = [
    {
      title: 'Indoor & Outdoor Spaces',
      description: 'Work by the beautiful garden pool or cozy up by the warm fireplace indoors',
      image: '/api/placeholder/400/300'
    },
    {
      title: 'High-Speed Connectivity',
      description: 'Dual high-speed internet connections with 24-hour backup generator',
      image: '/api/placeholder/400/300'
    },
    {
      title: 'Pet-Friendly Environment',
      description: 'Your four-legged friends are welcome in our dog-friendly workspace',
      image: '/api/placeholder/400/300'
    }
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => 
        prevIndex === heroImages.length - 1 ? 0 : prevIndex + 1
      );
    }, 5000);

    return () => clearInterval(interval);
  }, [heroImages.length]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(prev => ({
              ...prev,
              [entry.target.id]: true
            }));
          }
        });
      },
      { threshold: 0.1 }
    );

    const elements = document.querySelectorAll('[data-animate]');
    elements.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  return (
    <>
      <div className="min-h-screen bg-white">
        {/* Navigation */}
        <nav className="fixed top-0 w-full bg-white/90 backdrop-blur-md z-50 border-b border-gray-100">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center h-16">
              <div className="flex items-center">
                <div className="text-2xl font-bold text-emerald-600">Ikigai</div>
              </div>
              <div className="hidden md:block">
                <div className="ml-10 flex items-baseline space-x-8">
                  <a href="#" className="text-gray-900 hover:text-emerald-600 px-3 py-2 text-sm font-medium transition-colors">What We Offer</a>
                  <a href="#" className="text-gray-900 hover:text-emerald-600 px-3 py-2 text-sm font-medium transition-colors">Locations</a>
                  <a href="#" className="text-gray-900 hover:text-emerald-600 px-3 py-2 text-sm font-medium transition-colors">Community</a>
                  <a href="#" className="text-gray-900 hover:text-emerald-600 px-3 py-2 text-sm font-medium transition-colors">Contact</a>
                </div>
              </div>
              <button className="bg-emerald-600 text-white px-6 py-2 rounded-full hover:bg-emerald-700 transition-colors">
                Book a Tour
              </button>
            </div>
          </div>
        </nav>

        {/* Hero Section */}
        <section className="relative h-screen overflow-hidden">
          <div className="absolute inset-0">
            {heroImages.map((image, index) => (
              <div
                key={index}
                className={`absolute inset-0 transition-opacity duration-1000 ${
                  index === currentImageIndex ? 'opacity-100' : 'opacity-0'
                }`}
              >
                <Image
                  src={image}
                  alt={`Ikigai workspace ${index + 1}`}
                  fill
                  className="object-cover"
                  priority={index === 0}
                />
              </div>
            ))}
          </div>
          
          <div className="absolute inset-0 bg-black/40" />
          
          <div className="relative h-full flex items-center justify-center text-center">
            <div className="max-w-4xl mx-auto px-4">
              <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 opacity-0 animate-[fadeInUp_1s_ease-out_0.5s_both]">
                Shared Workspace
              </h1>
              <p className="text-xl md:text-2xl text-white/90 mb-8 opacity-0 animate-[fadeInUp_1s_ease-out_0.7s_both] leading-relaxed">
                Flexible seating in a wellness-focused environment where creativity thrives
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center opacity-0 animate-[fadeInUp_1s_ease-out_0.9s_both]">
                <button className="bg-emerald-600 text-white px-8 py-4 rounded-full text-lg hover:bg-emerald-700 transition-all transform hover:scale-105">
                  Start Your Membership
                </button>
                <button className="border-2 border-white text-white px-8 py-4 rounded-full text-lg hover:bg-white hover:text-gray-900 transition-all">
                  Schedule a Visit
                </button>
              </div>
            </div>
          </div>

          {/* Scroll indicator */}
          <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
            <div className="w-6 h-10 border-2 border-white rounded-full flex justify-center">
              <div className="w-1 h-3 bg-white rounded-full mt-2 animate-pulse" />
            </div>
          </div>
        </section>

        {/* Main Content */}
        <section className="py-20 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div 
              id="main-content"
              data-animate
              className={`text-center mb-16 transition-all duration-1000 ${
                isVisible['main-content'] ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
              }`}
            >
              <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
                Work Your Way
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
                The flexible seating arrangement allows our members to choose from standing desks to private booths, 
                from swings to couches and everything in between, either indoors or outside.
              </p>
            </div>

            {/* Amenities Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-20">
              {amenities.map((amenity, index) => (
                <div
                  key={index}
                  id={`amenity-${index}`}
                  data-animate
                  className={`bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-500 transform hover:-translate-y-2 ${
                    isVisible[`amenity-${index}`] ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
                  }`}
                  style={{ transitionDelay: `${index * 100}ms` }}
                >
                  <div className="text-4xl mb-4">{amenity.icon}</div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-3">{amenity.title}</h3>
                  <p className="text-gray-600 leading-relaxed">{amenity.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div 
              id="features-title"
              data-animate
              className={`text-center mb-16 transition-all duration-1000 ${
                isVisible['features-title'] ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
              }`}
            >
              <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
                Designed for Your Success
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Every detail crafted to enhance your productivity and well-being
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {features.map((feature, index) => (
                <div
                  key={index}
                  id={`feature-${index}`}
                  data-animate
                  className={`group transition-all duration-1000 ${
                    isVisible[`feature-${index}`] ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
                  }`}
                  style={{ transitionDelay: `${index * 200}ms` }}
                >
                  <div className="relative overflow-hidden rounded-2xl mb-6">
                    <Image
                      src={feature.image}
                      alt={feature.title}
                      width={400}
                      height={300}
                      className="w-full h-64 object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  </div>
                  <h3 className="text-2xl font-semibold text-gray-900 mb-4">{feature.title}</h3>
                  <p className="text-gray-600 leading-relaxed">{feature.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Membership Benefits */}
        <section className="py-20 bg-emerald-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="bg-white rounded-3xl p-12 shadow-2xl">
              <div 
                id="membership-content"
                data-animate
                className={`text-center transition-all duration-1000 ${
                  isVisible['membership-content'] ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
                }`}
              >
                <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
                  Your Membership Includes
                </h2>
                <p className="text-xl text-gray-600 mb-12 max-w-3xl mx-auto">
                  Our communal membership includes all the shared amenities that our locations have to offer
                </p>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
                  {[
                    'Meeting Rooms',
                    'Coffee Bars',
                    'Outdoor Cafes',
                    'Yoga Sessions',
                    'Phone Booths',
                    'Prayer Rooms',
                    "Mother's Rooms",
                    'Shower Facilities'
                  ].map((benefit, index) => (
                    <div
                      key={index}
                      className="p-4 rounded-xl border border-emerald-100 hover:border-emerald-300 hover:bg-emerald-50 transition-all duration-300"
                    >
                      <div className="w-12 h-12 bg-emerald-100 rounded-full mx-auto mb-3 flex items-center justify-center">
                        <span className="text-emerald-600 text-xl">✓</span>
                      </div>
                      <p className="font-medium text-gray-900">{benefit}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Call to Action */}
        <section className="py-20 bg-gray-900 text-white">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Ready to Join Our Community?
            </h2>
            <p className="text-xl text-gray-300 mb-8 leading-relaxed">
              Simply choose an open seat in our coworking area and get to work. 
              Experience the perfect blend of productivity and wellness.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="bg-emerald-600 text-white px-8 py-4 rounded-full text-lg hover:bg-emerald-700 transition-all transform hover:scale-105">
                Book Your Tour Today
              </button>
              <button className="border-2 border-emerald-400 text-emerald-400 px-8 py-4 rounded-full text-lg hover:bg-emerald-400 hover:text-white transition-all">
                Learn About Pricing
              </button>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="bg-gray-50 py-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
              <div className="col-span-1 md:col-span-2">
                <div className="text-3xl font-bold text-emerald-600 mb-4">Ikigai</div>
                <p className="text-gray-600 mb-4 max-w-md">
                  Wellness-focused coworking spaces where creativity thrives and meaningful 
                  connections are made. Join our community across Nairobi.
                </p>
              </div>
              
              <div>
                <h3 className="font-semibold text-gray-900 mb-4">Locations</h3>
                <ul className="space-y-2 text-gray-600">
                  <li>Westlands</li>
                  <li>Lavington</li>
                  <li>Lower Kabete</li>
                  <li>Riverside</li>
                </ul>
              </div>
              
              <div>
                <h3 className="font-semibold text-gray-900 mb-4">Contact</h3>
                <ul className="space-y-2 text-gray-600">
                  <li>hello@ikigai.co.ke</li>
                  <li>+254 XXX XXX XXX</li>
                  <li>Follow us on social</li>
                </ul>
              </div>
            </div>
            
            <div className="mt-8 pt-8 border-t border-gray-200 text-center text-gray-600">
              <p>&copy; 2025 Ikigai. All rights reserved.</p>
            </div>
          </div>
        </footer>
      </div>

      <style jsx>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </>
  );
}