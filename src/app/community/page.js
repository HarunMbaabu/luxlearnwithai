"use client";

import { useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import AOS from "aos";
import "aos/dist/aos.css";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import {
  ArrowRight,
  Calendar,
  Users,
  MessageSquare,
  ExternalLink,
  MapPin,
  Heart,
  Share2,
  Github,
  Slack,
  Twitter,
  Linkedin,
  Youtube,
  Instagram,
} from "lucide-react";
import Header from "../components/header";
import Footer from "../components/footer";
import { TestimonialCarousel } from "../components/testimonials";

export default function CommunityPage() {
  useEffect(() => {
    AOS.init({ duration: 700, once: true });
  }, []);

  const upcomingEvents = [
    {
      title: "Data Science Hackathon",
      date: "April 15-17, 2025",
      location: "Virtual",
      description:
        "Join teams from around the world to solve real-world data challenges and compete for prizes.",
      image: "/hackathn.jpg?height=400&width=600",
      category: "Hackathon",
    },
    {
      title: "AI Ethics Workshop",
      date: "April 22, 2025",
      location: "Nairobi & Virtual",
      description:
        "Explore the ethical implications of AI with industry experts and thought leaders.",
      image: "/workshop.jpg?height=400&width=600",
      category: "Workshop",
    },
    {
      title: "Python for Data Science Meetup",
      date: "May 5, 2025",
      location: "Nairobi & Virtual",
      description:
        "Monthly meetup for Python enthusiasts to share knowledge and network.",
      image: "/meet.jpg?height=400&width=600",
      category: "Meetup",
    },
  ];

  const testimonials = [
    {
      name: "Hellen Matti",
      role: "Data Analyst",
      quote:
        "Before joining LuxDevHQ, I had no experience in Data Analytics. The hands-on training helped me secure a job as a Data Analyst.",
      image: "/profile-picture-3.jpg?height=80&width=80",
      rating: 0,
    },
    {
      name: "Kirimi Dennis",
      role: "ML Engineer",
      quote:
        "I joined LuxDevHQ's Hackathon and was amazed by the innovative projects and mentorship. The experience was transformative.",
      image: "/profile-picture-1.jpg?height=80&width=80",
      rating: 0,
    },
    {
      name: "Peter Gatitu",
      role: "Data Scientist",
      quote:
        "Attending the LuxDevHQ meet-up was a game-changer. The support and guidance were exceptional. I learnt so much.",
      image: "/profile-picture-2.jpg?height=80&width=80",
      rating: 0,
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
                <Users className="h-4 w-4 mr-2" />
                <span className="text-sm font-medium">
                  Join Our Global Community
                </span>
              </div>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
                Connect, Learn, and <span className="text-blue-900">Grow</span>{" "}
                Together
              </h1>
              <p className="text-xl text-gray-600 mb-8 max-w-xl">
                Join a vibrant community of data enthusiasts, from beginners to
                experts, sharing knowledge and building careers together.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button size="lg" className="rounded-full bg-blue-900">
                  Join Community
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
                <Button variant="outline" size="lg" className="rounded-full">
                  Explore Events
                  <Calendar className="ml-2 h-4 w-4" />
                </Button>
              </div>
            </div>
            <div
              className="relative h-[400px] lg:h-[500px] rounded-2xl overflow-hidden"
              data-aos="fade-up"
            >
              <Image
                src="/books.png?height=1000&width=1600"
                alt="LuxDev Community"
                fill
                className="object-cover"
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-tr from-blue-900/30 to-transparent opacity-60"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Community Stats Section */}
      <section className="py-16 px-4">
        <div className="container mx-auto max-w-7xl">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div
              className="text-center"
              data-aos="fade-up"
              data-aos-delay="100"
            >
              <div className="text-4xl md:text-5xl font-bold text-blue-900 mb-2">
                15K+
              </div>
              <p className="text-gray-600">Community Members</p>
            </div>
            <div
              className="text-center"
              data-aos="fade-up"
              data-aos-delay="200"
            >
              <div className="text-4xl md:text-5xl font-bold text-blue-900 mb-2">
                120+
              </div>
              <p className="text-gray-600">Global Meetups</p>
            </div>
            <div
              className="text-center"
              data-aos="fade-up"
              data-aos-delay="300"
            >
              <div className="text-4xl md:text-5xl font-bold text-blue-900 mb-2">
                45+
              </div>
              <p className="text-gray-600">Countries Represented</p>
            </div>
            <div
              className="text-center"
              data-aos="fade-up"
              data-aos-delay="400"
            >
              <div className="text-4xl md:text-5xl font-bold text-blue-900 mb-2">
                250+
              </div>
              <p className="text-gray-600">Open Source Projects</p>
            </div>
          </div>
        </div>
      </section>

      {/* Upcoming Events Section */}
      <section className="py-20 px-4 bg-gradient-to-t from-slate-50 to-white">
        <div className="container mx-auto max-w-7xl">
          <div className="text-center mb-16" data-aos="fade-up">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Upcoming Community Events
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Join us for virtual and in-person events around the world
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {upcomingEvents.map((event, index) => (
              <Card
                key={index}
                className="border shadow-none overflow-hidden"
                data-aos="fade-up"
                data-aos-delay={100 * (index + 1)}
              >
                <div className="relative h-48">
                  <Image
                    src={event.image || "/placeholder.svg"}
                    alt={event.title}
                    fill
                    className="object-cover"
                  />
                  <div className="absolute top-4 up-4">
                    <Badge className="bg-blue-900">{event.category}</Badge>
                  </div>
                </div>
                <CardContent className="p-6">
                  <h3 className="text-xl font-bold mb-2">{event.title}</h3>
                  <div className="flex items-center text-gray-500 mb-2">
                    <Calendar className="h-4 w-4 mr-2" />
                    <span className="text-sm">{event.date}</span>
                  </div>
                  <div className="flex items-center text-gray-500 mb-4">
                    <MapPin className="h-4 w-4 mr-2" />
                    <span className="text-sm">{event.location}</span>
                  </div>
                  <p className="text-gray-600 mb-4">{event.description}</p>
                </CardContent>
                <CardFooter className="px-6 py-4 bg-gray-50 flex justify-between">
                  <Button variant="outline" size="sm" className="rounded-full">
                    Add to Calendar
                    <Calendar className="ml-2 h-4 w-4" />
                  </Button>
                  <Button size="sm" className="rounded-full bg-blue-900">
                    Register
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>

          <div className="text-center mt-12" data-aos="fade-up">
            <Button variant="outline" size="lg" className="rounded-full">
              View All Events
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </div>
      </section>

      {/* Community Platforms Section */}
      <section className="py-20 px-4 bg-slate-50">
        <div className="container mx-auto max-w-7xl">
          <div className="text-center mb-16" data-aos="fade-up">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Connect With Our Community
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Join the conversation across our community platforms
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <Card
              className="border shadow-none"
              data-aos="fade-up"
              data-aos-delay="100"
            >
              <CardContent className="p-8 text-center">
                <div className="w-16 h-16 bg-blue-900/10 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Slack className="h-8 w-8 text-blue-900" />
                </div>
                <h3 className="text-xl font-bold mb-3">Slack Community</h3>
                <p className="text-gray-600 mb-6">
                  Join 10,000+ members in real-time discussions across
                  specialized channels.
                </p>
                <Button className="w-full bg-blue-900">Join Slack</Button>
              </CardContent>
            </Card>

            <Card
              className="border shadow-none"
              data-aos="fade-up"
              data-aos-delay="200"
            >
              <CardContent className="p-8 text-center">
                <div className="w-16 h-16 bg-blue-900/10 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Github className="h-8 w-8 text-blue-900" />
                </div>
                <h3 className="text-xl font-bold mb-3">GitHub Organization</h3>
                <p className="text-gray-600 mb-6">
                  Contribute to open-source projects and collaborate with fellow
                  developers.
                </p>
                <Button className="w-full bg-blue-900">View GitHub</Button>
              </CardContent>
            </Card>

            <Card
              className="border shadow-none"
              data-aos="fade-up"
              data-aos-delay="300"
            >
              <CardContent className="p-8 text-center">
                <div className="w-16 h-16 bg-blue-900/10 rounded-full flex items-center justify-center mx-auto mb-6">
                  <MessageSquare className="h-8 w-8 text-blue-900" />
                </div>
                <h3 className="text-xl font-bold mb-3">Discussion Forum</h3>
                <p className="text-gray-600 mb-6">
                  Ask questions, share insights, and participate in in-depth
                  technical discussions.
                </p>
                <Button className="w-full bg-blue-900">Browse Forum</Button>
              </CardContent>
            </Card>

            <Card
              className="border shadow-none"
              data-aos="fade-up"
              data-aos-delay="400"
            >
              <CardContent className="p-8 text-center">
                <div className="w-16 h-16 bg-blue-900/10 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Youtube className="h-8 w-8 text-blue-900" />
                </div>
                <h3 className="text-xl font-bold mb-3">YouTube Channel</h3>
                <p className="text-gray-600 mb-6">
                  Watch tutorials, event recordings, and community member
                  presentations.
                </p>
                <Button className="w-full bg-blue-900">Subscribe</Button>
              </CardContent>
            </Card>
          </div>

          <div
            className="flex flex-wrap justify-center gap-4 mt-12"
            data-aos="fade-up"
          >
            <Link
              href="#"
              className="flex items-center gap-2 text-gray-600 hover:text-blue-900 transition-colors"
            >
              <Twitter className="h-5 w-5" />
              <span>Twitter</span>
            </Link>
            <Link
              href="#"
              className="flex items-center gap-2 text-gray-600 hover:text-blue-900 transition-colors"
            >
              <Linkedin className="h-5 w-5" />
              <span>LinkedIn</span>
            </Link>
            <Link
              href="#"
              className="flex items-center gap-2 text-gray-600 hover:text-blue-900 transition-colors"
            >
              <Instagram className="h-5 w-5" />
              <span>Instagram</span>
            </Link>
          </div>
        </div>
      </section>

      {/* Community Projects Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto max-w-7xl">
          <div className="text-center mb-16" data-aos="fade-up">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Community-Led Projects
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Explore and contribute to projects built by our community members
            </p>
          </div>

          <Tabs defaultValue="all" className="w-full">
            <div className="flex justify-center mb-8">
              <TabsList className="grid w-full max-w-md grid-cols-3">
                <TabsTrigger value="all">All Projects</TabsTrigger>
                <TabsTrigger value="data-science">Data Science</TabsTrigger>
                <TabsTrigger value="ai">AI & ML</TabsTrigger>
              </TabsList>
            </div>

            <TabsContent value="all">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <Card
                  className="border border-gray-200"
                  data-aos="fade-up"
                  data-aos-delay="100"
                >
                  <CardHeader>
                    <div className="flex justify-between items-center mb-2">
                      <Badge className="bg-blue-900">Open Source</Badge>
                      <div className="flex items-center gap-2">
                        <Button variant="ghost" size="icon" className="h-8 w-8">
                          <Heart className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="icon" className="h-8 w-8">
                          <Share2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                    <CardTitle>DataViz Library</CardTitle>
                    <CardDescription>
                      Python library for advanced data visualization
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600 mb-4">
                      A community-built Python library that simplifies creating
                      complex, interactive data visualizations for data science
                      projects.
                    </p>
                    <div className="flex items-center text-sm text-gray-500 mb-4">
                      <Users className="h-4 w-4 mr-1" />
                      <span>42 Contributors</span>
                      <span className="mx-2">•</span>
                      <Github className="h-4 w-4 mr-1" />
                      <span>320 Stars</span>
                    </div>
                  </CardContent>
                  <CardFooter className="flex justify-between">
                    <Button variant="outline" size="sm">
                      View Project
                    </Button>
                    <Button size="sm" className="bg-blue-900">
                      Contribute
                    </Button>
                  </CardFooter>
                </Card>

                <Card
                  className="border border-gray-200"
                  data-aos="fade-up"
                  data-aos-delay="200"
                >
                  <CardHeader>
                    <div className="flex justify-between items-center mb-2">
                      <Badge className="bg-blue-900">Featured</Badge>
                      <div className="flex items-center gap-2">
                        <Button variant="ghost" size="icon" className="h-8 w-8">
                          <Heart className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="icon" className="h-8 w-8">
                          <Share2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                    <CardTitle>ML Model Registry</CardTitle>
                    <CardDescription>
                      Open-source model management platform
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600 mb-4">
                      A platform for tracking, versioning, and managing machine
                      learning models throughout their lifecycle.
                    </p>
                    <div className="flex items-center text-sm text-gray-500 mb-4">
                      <Users className="h-4 w-4 mr-1" />
                      <span>78 Contributors</span>
                      <span className="mx-2">•</span>
                      <Github className="h-4 w-4 mr-1" />
                      <span>512 Stars</span>
                    </div>
                  </CardContent>
                  <CardFooter className="flex justify-between">
                    <Button variant="outline" size="sm">
                      View Project
                    </Button>
                    <Button size="sm" className="bg-blue-900">
                      Contribute
                    </Button>
                  </CardFooter>
                </Card>

                <Card
                  className="border border-gray-200"
                  data-aos="fade-up"
                  data-aos-delay="300"
                >
                  <CardHeader>
                    <div className="flex justify-between items-center mb-2">
                      <Badge className="bg-blue-900">New</Badge>
                      <div className="flex items-center gap-2">
                        <Button variant="ghost" size="icon" className="h-8 w-8">
                          <Heart className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="icon" className="h-8 w-8">
                          <Share2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                    <CardTitle>EthicalAI Framework</CardTitle>
                    <CardDescription>
                      Tools for ethical AI development
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600 mb-4">
                      A framework and toolkit for ensuring AI systems are
                      developed with ethical considerations and fairness in
                      mind.
                    </p>
                    <div className="flex items-center text-sm text-gray-500 mb-4">
                      <Users className="h-4 w-4 mr-1" />
                      <span>24 Contributors</span>
                      <span className="mx-2">•</span>
                      <Github className="h-4 w-4 mr-1" />
                      <span>187 Stars</span>
                    </div>
                  </CardContent>
                  <CardFooter className="flex justify-between">
                    <Button variant="outline" size="sm">
                      View Project
                    </Button>
                    <Button size="sm" className="bg-blue-900">
                      Contribute
                    </Button>
                  </CardFooter>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="data-science">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {/* Data Science specific projects would go here */}
                <Card
                  className="border border-gray-200"
                  data-aos="fade-up"
                  data-aos-delay="100"
                >
                  <CardHeader>
                    <div className="flex justify-between items-center mb-2">
                      <Badge className="bg-blue-900">Open Source</Badge>
                      <div className="flex items-center gap-2">
                        <Button variant="ghost" size="icon" className="h-8 w-8">
                          <Heart className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="icon" className="h-8 w-8">
                          <Share2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                    <CardTitle>DataViz Library</CardTitle>
                    <CardDescription>
                      Python library for advanced data visualization
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600 mb-4">
                      A community-built Python library that simplifies creating
                      complex, interactive data visualizations for data science
                      projects.
                    </p>
                    <div className="flex items-center text-sm text-gray-500 mb-4">
                      <Users className="h-4 w-4 mr-1" />
                      <span>42 Contributors</span>
                      <span className="mx-2">•</span>
                      <Github className="h-4 w-4 mr-1" />
                      <span>320 Stars</span>
                    </div>
                  </CardContent>
                  <CardFooter className="flex justify-between">
                    <Button variant="outline" size="sm">
                      View Project
                    </Button>
                    <Button size="sm" className="bg-blue-900">
                      Contribute
                    </Button>
                  </CardFooter>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="ai">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {/* AI & ML specific projects would go here */}
                <Card
                  className="border border-gray-200"
                  data-aos="fade-up"
                  data-aos-delay="100"
                >
                  <CardHeader>
                    <div className="flex justify-between items-center mb-2">
                      <Badge className="bg-blue-900">Featured</Badge>
                      <div className="flex items-center gap-2">
                        <Button variant="ghost" size="icon" className="h-8 w-8">
                          <Heart className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="icon" className="h-8 w-8">
                          <Share2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                    <CardTitle>ML Model Registry</CardTitle>
                    <CardDescription>
                      Open-source model management platform
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600 mb-4">
                      A platform for tracking, versioning, and managing machine
                      learning models throughout their lifecycle.
                    </p>
                    <div className="flex items-center text-sm text-gray-500 mb-4">
                      <Users className="h-4 w-4 mr-1" />
                      <span>78 Contributors</span>
                      <span className="mx-2">•</span>
                      <Github className="h-4 w-4 mr-1" />
                      <span>512 Stars</span>
                    </div>
                  </CardContent>
                  <CardFooter className="flex justify-between">
                    <Button variant="outline" size="sm">
                      View Project
                    </Button>
                    <Button size="sm" className="bg-blue-900">
                      Contribute
                    </Button>
                  </CardFooter>
                </Card>
              </div>
            </TabsContent>
          </Tabs>

          <div className="text-center mt-12" data-aos="fade-up">
            <Button variant="outline" size="lg" className="rounded-full">
              Explore All Projects
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 px-4  bg-slate-50">
        <div className="container mx-auto max-w-5xl">
          <div className="text-center mb-16" data-aos="fade-up">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Community Success Stories
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Hear from members who have grown through our community
            </p>
          </div>
          <div data-aos="fade-up">
            <TestimonialCarousel testimonials={testimonials} />
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 bg-gradient-to-b from-slate-50 to-white">
        <div className="container mx-auto max-w-4xl text-center">
          <div className="bg-blue-900/5 p-12 rounded-3xl" data-aos="fade-up">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Join Our Global Community Today
            </h2>
            <p className="text-xl text-gray-600 mb-10 max-w-2xl mx-auto">
              Connect with data enthusiasts, access exclusive resources, and
              accelerate your growth in data science and AI.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="rounded-full bg-blue-900">
                Join Community
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
              <Button variant="outline" size="lg" className="rounded-full">
                Learn More
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
