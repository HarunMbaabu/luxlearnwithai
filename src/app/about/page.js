import Image from 'next/image';
import Header from '../components/header';
import { Users, Award, Globe, BookOpen, Target, Heart } from 'lucide-react';
import Footer from '../components/footer';
import DynamicTeamSection from '../components/dynamic-team';

export default function AboutHero() {

    return (
        <section className="min-h-screen">
            <Header />
            {/* Hero */}

            <section className="pt-32 pb-16 px-4">
                <div className="container mx-auto max-w-6xl">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
                        <div data-aos="fade-up">
                            <div className="inline-flex items-center px-3 py-1 rounded-full bg-blue-900/10 text-blue-900 mb-6">
                                <BookOpen className="h-4 w-4 mr-2" />
                                <span className="text-sm font-medium">
                                    Transforming Lives Through Technology Education
                                </span>
                            </div>
                            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
                                Where <span className="text-blue-900">Innovation</span> Meets{" "}
                                <span className="text-blue-900">Education</span>
                            </h1>
                        </div>
                        <div
                            className="relative h-[200px] lg:h-[300px] rounded-2xl overflow-hidden"
                            data-aos="fade-up"
                        >
                            <Image
                                src="/books.png?height=1000&width=1600"
                                alt="LuxDev Learning Environment"
                                fill
                                className="object-cover"
                                priority
                            />
                            <div className="absolute inset-0 bg-gradient-to-tr from-blue-900/30 to-transparent opacity-60"></div>
                        </div>
                    </div>
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mt-20">
                        <div data-aos="fade-up">
                            <p className="text-xl text-gray-600 mb-8 max-w-xl leading-relaxed">
                                At LuxDevHQ, we're more than just a technology school. We're a launchpad for careers, 
                                a community of innovators, and a bridge connecting passionate learners with the 
                                ever-evolving world of data science and AI.
                            </p>
                        </div>

                        <div className="grid grid-cols-2 gap-8">
                            <div className="text-center">
                                <div className="text-4xl md:text-5xl font-bold text-blue-900 mb-2">
                                    3,600+
                                </div>
                                <p className="text-gray-600 font-medium">Lives Transformed</p>
                            </div>
                            <div className="text-center">
                                <div className="text-4xl md:text-5xl font-bold text-blue-900 mb-2">
                                    87%
                                </div>
                                <p className="text-gray-600 font-medium">Career Success Rate</p>
                            </div>
                            <div className="text-center">
                                <div className="text-4xl md:text-5xl font-bold text-blue-900 mb-2">
                                    6+
                                </div>
                                <p className="text-gray-600 font-medium">Industry Partners</p>
                            </div>
                            <div className="text-center">
                                <div className="text-4xl md:text-5xl font-bold text-blue-900 mb-2">
                                    22
                                </div>
                                <p className="text-gray-600 font-medium">Countries Reached</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Our Story Section */}
            <section className="py-20 px-4 bg-gradient-to-br from-blue-50 to-indigo-50">
                <div className="container mx-auto max-w-6xl">
                    <div className="text-center mb-16" data-aos="fade-up">
                        <span className="inline-block px-4 py-2 bg-blue-100 text-blue-600 rounded-full text-sm font-semibold mb-6">
                            Our Story
                        </span>
                        <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 leading-tight max-w-4xl mx-auto mb-6">
                            Born from a Vision to{" "}
                            <span className="text-blue-900">Democratize</span> Tech Education
                        </h2>
                        <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
                            Founded in the heart of Africa's silicon valley, LuxDevHQ emerged from a simple but 
                            powerful belief: that world-class technology education should be accessible to everyone, 
                            regardless of their background or location.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                        <div 
                            className="bg-white rounded-2xl p-8 shadow-sm hover:shadow-lg transition-all duration-300"
                            data-aos="fade-up"
                        >
                            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-6">
                                <Target className="h-6 w-6 text-blue-600" />
                            </div>
                            <h3 className="text-2xl font-bold text-gray-900 mb-4">Our Beginning</h3>
                            <p className="text-gray-600 leading-relaxed">
                                Started in 2019 with a mission to bridge the skills gap in Africa's tech ecosystem. 
                                What began as weekend workshops has grown into a comprehensive learning platform 
                                serving thousands globally.
                            </p>
                        </div>

                        <div 
                            className="bg-white rounded-2xl p-8 shadow-sm hover:shadow-lg transition-all duration-300"
                            data-aos="fade-up"
                            data-aos-delay="100"
                        >
                            <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-6">
                                <Award className="h-6 w-6 text-green-600" />
                            </div>
                            <h3 className="text-2xl font-bold text-gray-900 mb-4">Our Approach</h3>
                            <p className="text-gray-600 leading-relaxed">
                                We believe in learning by doing. Our curriculum combines theoretical foundations 
                                with real-world projects, ensuring our graduates are job-ready from day one. 
                                Every course is designed with industry input.
                            </p>
                        </div>

                        <div 
                            className="bg-white rounded-2xl p-8 shadow-sm hover:shadow-lg transition-all duration-300"
                            data-aos="fade-up"
                            data-aos-delay="200"
                        >
                            <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mb-6">
                                <Globe className="h-6 w-6 text-purple-600" />
                            </div>
                            <h3 className="text-2xl font-bold text-gray-900 mb-4">Our Impact</h3>
                            <p className="text-gray-600 leading-relaxed">
                                From Kenya to Canada, our alumni are making waves in top tech companies, 
                                starting successful ventures, and driving digital transformation across industries. 
                                This is just the beginning.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Vision & Mission Section */}
            <section className="py-20 px-4">
                <div className="container mx-auto max-w-6xl">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                        {/* Our Vision */}
                        <div 
                            className="bg-gradient-to-br from-blue-600 to-blue-700 rounded-2xl p-8 lg:p-12 text-white"
                            data-aos="fade-up"
                        >
                            <div className="mb-6">
                                <div className="w-12 h-12 bg-white/20 rounded-lg flex items-center justify-center mb-4">
                                    <Target className="h-6 w-6 text-white" />
                                </div>
                                <span className="inline-block px-4 py-2 bg-white/20 text-white rounded-full text-sm font-semibold">
                                    Our Vision
                                </span>
                            </div>
                            <h2 className="text-3xl lg:text-4xl font-bold mb-6 leading-tight">
                                A World Where Technology Empowers Everyone
                            </h2>
                            <p className="text-blue-100 text-lg leading-relaxed">
                                We envision a future where geographical boundaries don't limit educational opportunities. 
                                A world where every curious mind can access world-class technology education, 
                                build meaningful careers, and contribute to solving humanity's greatest challenges through innovation.
                            </p>
                        </div>

                        {/* Our Mission */}
                        <div 
                            className="bg-gradient-to-br from-orange-500 to-orange-600 rounded-2xl p-8 lg:p-12 text-white"
                            data-aos="fade-up"
                            data-aos-delay="200"
                        >
                            <div className="mb-6">
                                <div className="w-12 h-12 bg-white/20 rounded-lg flex items-center justify-center mb-4">
                                    <Heart className="h-6 w-6 text-white" />
                                </div>
                                <span className="inline-block px-4 py-2 bg-white/20 text-white rounded-full text-sm font-semibold">
                                    Our Mission
                                </span>
                            </div>
                            <h2 className="text-3xl lg:text-4xl font-bold mb-6 leading-tight">
                                Transforming Lives Through Practical Education
                            </h2>
                            <p className="text-orange-100 text-lg leading-relaxed">
                                To provide accessible, industry-relevant technology education that transforms lives. 
                                We're committed to building a global community of skilled professionals who drive 
                                innovation, create opportunities, and make a positive impact in their communities.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Values Section */}
            <section className="py-20 px-4 bg-gray-50">
                <div className="container mx-auto max-w-6xl">
                    <div className="text-center mb-16" data-aos="fade-up">
                        <span className="inline-block px-4 py-2 bg-green-100 text-green-600 rounded-full text-sm font-semibold mb-6">
                            Our Values
                        </span>
                        <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 leading-tight max-w-4xl mx-auto">
                            The Principles That{" "}
                            <span className="text-blue-900">Guide Us</span>
                        </h2>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                        <div 
                            className="bg-white rounded-xl p-6 text-center hover:shadow-lg transition-all duration-300"
                            data-aos="fade-up"
                        >
                            <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                                <BookOpen className="h-8 w-8 text-blue-600" />
                            </div>
                            <h3 className="text-xl font-bold text-gray-900 mb-3">Excellence</h3>
                            <p className="text-gray-600 text-sm leading-relaxed">
                                We strive for excellence in everything we do, from curriculum design to student support.
                            </p>
                        </div>

                        <div 
                            className="bg-white rounded-xl p-6 text-center hover:shadow-lg transition-all duration-300"
                            data-aos="fade-up"
                            data-aos-delay="100"
                        >
                            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                                <Users className="h-8 w-8 text-green-600" />
                            </div>
                            <h3 className="text-xl font-bold text-gray-900 mb-3">Community</h3>
                            <p className="text-gray-600 text-sm leading-relaxed">
                                Learning is better together. We foster a supportive community where everyone grows.
                            </p>
                        </div>

                        <div 
                            className="bg-white rounded-xl p-6 text-center hover:shadow-lg transition-all duration-300"
                            data-aos="fade-up"
                            data-aos-delay="200"
                        >
                            <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                                <Globe className="h-8 w-8 text-purple-600" />
                            </div>
                            <h3 className="text-xl font-bold text-gray-900 mb-3">Accessibility</h3>
                            <p className="text-gray-600 text-sm leading-relaxed">
                                Quality education should be accessible to all, regardless of background or location.
                            </p>
                        </div>

                        <div 
                            className="bg-white rounded-xl p-6 text-center hover:shadow-lg transition-all duration-300"
                            data-aos="fade-up"
                            data-aos-delay="300"
                        >
                            <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
                                <Award className="h-8 w-8 text-orange-600" />
                            </div>
                            <h3 className="text-xl font-bold text-gray-900 mb-3">Innovation</h3>
                            <p className="text-gray-600 text-sm leading-relaxed">
                                We continuously innovate our teaching methods to stay ahead of industry trends.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Team Section */}
            <DynamicTeamSection/>

            {/* Call to Action Section */}
            <section className="py-20 px-4 bg-gradient-to-br from-blue-600 to-blue-700">
                <div className="container mx-auto max-w-4xl text-center">
                    <div data-aos="fade-up">
                        <h2 className="text-4xl lg:text-5xl font-bold text-white mb-6 leading-tight">
                            Ready to Transform Your{" "}
                            <span className="text-blue-200">Career?</span>
                        </h2>
                        <p className="text-xl text-blue-100 mb-8 leading-relaxed max-w-2xl mx-auto">
                            Join thousands of successful graduates who've transformed their careers with LuxDevHQ. 
                            Your journey to becoming a data professional starts here.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            <a 
                                href={process.env.NEXT_PUBLIC_REGISTRATION_LINK || '#'}
                                className="inline-flex items-center justify-center px-8 py-4 bg-white text-blue-600 font-semibold rounded-lg hover:bg-blue-50 transition-colors duration-300"
                            >
                                Start Your Journey
                            </a>
                            <a 
                                href="/learn-with-ai"
                                className="inline-flex items-center justify-center px-8 py-4 border-2 border-white text-white font-semibold rounded-lg hover:bg-white hover:text-blue-600 transition-colors duration-300"
                            >
                                Explore Our Programs
                            </a>
                        </div>
                    </div>
                </div>
            </section>

            <Footer />
        </section>
    );
}