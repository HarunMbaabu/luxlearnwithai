import Footer from "../components/footer";
import Header from "../components/header";
import Image from "next/image";
import {
  ArrowRight,
  Book,
  Download,
  ExternalLink,
  FileText,
} from "lucide-react";

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

const page = () => {
  return (
    <>
      <Header />
      {/* Hero Section */}
      <section className="w-full pt-32 pb-16 px-4 bg-gray-50">
        <div className="container mx-auto max-w-7xl px-4 md:px-6">
          <div className="grid gap-6 lg:grid-cols-[1fr_400px] lg:gap-12 xl:grid-cols-[1fr_600px]">
            <div className="flex flex-col justify-center space-y-4">
              <div className="w-fit inline-flex items-center px-3 py-1 rounded-full bg-blue-900/10 text-blue-900 mb-6">
                <Book className="h-4 w-4 mr-2" />
                <span className=" font-medium">
                  Research & Innovation
                </span>
              </div>
              <h1 className="text-3xl font-bold sm:text-5xl xl:text-6xl/none">
                Advancing the Future of
                <span className="text-primary !text-blue-900"> Data Science</span> & AI
              </h1>
              <p className="max-w-[600px] text-muted-foreground md:text-xl">
                Our research team is dedicated to pushing the boundaries of data
                science, artificial intelligence, and educational technology to
                create innovative solutions for real-world challenges.
              </p>
              <div className="flex flex-col gap-2 min-[400px]:flex-row">
                <Button className="gap-1 bg-blue-900">
                  View Publications <ArrowRight className="h-4 w-4" />
                </Button>
                <Button variant="outline">Research Partnerships</Button>
              </div>
            </div>
            <Image
              src="/homeimage.png?height=1000&width=1600"
              width={800}
              height={550}
              alt="Research team collaborating"
              className="mx-auto aspect-video overflow-hidden rounded-xl object-cover sm:w-full lg:order-last"
            />
          </div>
        </div>
      </section>

      {/* Research Areas */}
      <section className="w-full py-12 md:py-24 lg:py-32">
        <div className="container mx-auto max-w-6xl px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="space-y-2">
              <div className="inline-block rounded-full px-3 py-1  text-primary bg-blue-900/10 !text-blue-900">
                Research Areas
              </div>
              <h2 className="text-3xl font-bold md:text-4xl/tight">
                Our Key Research Initiatives
              </h2>
              <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                Exploring cutting-edge technologies and methodologies to
                transform data education and AI applications
              </p>
            </div>
          </div>
          <div className="mx-auto grid max-w-6xl grid-cols-1 gap-6 py-12 md:grid-cols-2 lg:grid-cols-3">
            <Card className="flex flex-col">
              <CardHeader>
                <CardTitle>AI in Education</CardTitle>
                <CardDescription>
                  Developing intelligent tutoring systems and personalized
                  learning experiences
                </CardDescription>
              </CardHeader>
              <CardContent className="flex-1">
                <p className=" text-muted-foreground">
                  Our research focuses on creating AI-powered educational tools
                  that adapt to individual learning styles, providing
                  personalized feedback and guidance to accelerate skill
                  acquisition.
                </p>
              </CardContent>
              <CardFooter>
                <Button variant="ghost" className="gap-1 text-primary">
                  Learn more <ArrowRight className="h-4 w-4" />
                </Button>
              </CardFooter>
            </Card>
            <Card className="flex flex-col">
              <CardHeader>
                <CardTitle>Data Science for Social Impact</CardTitle>
                <CardDescription>
                  Applying data analytics to address societal challenges across
                  Africa
                </CardDescription>
              </CardHeader>
              <CardContent className="flex-1">
                <p className=" text-muted-foreground">
                  We're leveraging data science to tackle issues in healthcare,
                  agriculture, and urban planning, developing models that can be
                  deployed in resource-constrained environments.
                </p>
              </CardContent>
              <CardFooter>
                <Button variant="ghost" className="gap-1 text-primary">
                  Learn more <ArrowRight className="h-4 w-4" />
                </Button>
              </CardFooter>
            </Card>
            <Card className="flex flex-col">
              <CardHeader>
                <CardTitle>Ethical AI & Governance</CardTitle>
                <CardDescription>
                  Ensuring responsible development and deployment of AI systems
                </CardDescription>
              </CardHeader>
              <CardContent className="flex-1">
                <p className=" text-muted-foreground">
                  Our research examines frameworks for ethical AI development,
                  addressing issues of bias, fairness, transparency, and
                  accountability in machine learning models.
                </p>
              </CardContent>
              <CardFooter>
                <Button variant="ghost" className="gap-1 text-primary">
                  Learn more <ArrowRight className="h-4 w-4" />
                </Button>
              </CardFooter>
            </Card>
            <Card className="flex flex-col">
              <CardHeader>
                <CardTitle>Natural Language Processing</CardTitle>
                <CardDescription>
                  Advancing NLP capabilities for African languages
                </CardDescription>
              </CardHeader>
              <CardContent className="flex-1">
                <p className=" text-muted-foreground">
                  We're building datasets and models to improve natural language
                  understanding and generation for underrepresented African
                  languages, enabling more inclusive AI technologies.
                </p>
              </CardContent>
              <CardFooter>
                <Button variant="ghost" className="gap-1 text-primary">
                  Learn more <ArrowRight className="h-4 w-4" />
                </Button>
              </CardFooter>
            </Card>
            <Card className="flex flex-col">
              <CardHeader>
                <CardTitle>Industry 4.0 & IoT</CardTitle>
                <CardDescription>
                  Researching smart systems for manufacturing and infrastructure
                </CardDescription>
              </CardHeader>
              <CardContent className="flex-1">
                <p className=" text-muted-foreground">
                  Our team is exploring applications of IoT, edge computing, and
                  machine learning for predictive maintenance, quality control,
                  and process optimization in industrial settings.
                </p>
              </CardContent>
              <CardFooter>
                <Button variant="ghost" className="gap-1 text-primary">
                  Learn more <ArrowRight className="h-4 w-4" />
                </Button>
              </CardFooter>
            </Card>
            <Card className="flex flex-col">
              <CardHeader>
                <CardTitle>Computer Vision</CardTitle>
                <CardDescription>
                  Developing visual recognition systems for diverse applications
                </CardDescription>
              </CardHeader>
              <CardContent className="flex-1">
                <p className=" text-muted-foreground">
                  We're advancing computer vision techniques for medical
                  imaging, agricultural monitoring, and urban planning, with a
                  focus on models that perform well with limited computational
                  resources.
                </p>
              </CardContent>
              <CardFooter>
                <Button variant="ghost" className="gap-1 text-primary">
                  Learn more <ArrowRight className="h-4 w-4" />
                </Button>
              </CardFooter>
            </Card>
          </div>
        </div>
      </section>

      {/* Publications */}
      <section className="w-full py-12 md:py-24 lg:py-32 bg-gray-50">
        <div className="container mx-auto max-w-6xl px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="space-y-2">
            <div className="inline-block rounded-full px-3 py-1  text-primary bg-blue-900/10 !text-blue-900">
                Publications
              </div>
              <h2 className="text-3xl font-bold md:text-4xl/tight">
                Recent Research Publications
              </h2>
              <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                Our team regularly publishes in top-tier academic journals and
                conferences
              </p>
            </div>
          </div>

          <Tabs defaultValue="2025" className="mt-12">
            <div className="flex justify-center">
              <TabsList>
                <TabsTrigger value="2025">2025</TabsTrigger>
                <TabsTrigger value="2024">2024</TabsTrigger>
                <TabsTrigger value="2023">2023</TabsTrigger>
              </TabsList>
            </div>
            <TabsContent value="2025" className="mt-6 space-y-6">
              {[1, 2, 3].map((i) => (
                <div key={i} className="rounded-lg border bg-card p-6">
                  <div className="flex flex-col gap-4 md:flex-row md:items-start">
                    <div className="flex-1 space-y-2">
                      <div className="flex items-center gap-2">
                        <Badge variant="outline">Journal Article</Badge>
                        <span className=" text-muted-foreground">
                          October 2025
                        </span>
                      </div>
                      <h3 className="text-xl font-bold">
                        Adaptive Learning Systems: Personalized Education
                        Through AI in Sub-Saharan Africa
                      </h3>
                      <p className=" text-muted-foreground">
                        Authors: John Doe, Jane Smith, Robert Johnson, et al.
                      </p>
                      <p className="">
                        This paper presents a novel approach to adaptive
                        learning systems designed specifically for
                        resource-constrained environments in Sub-Saharan Africa.
                        We demonstrate how AI-powered educational tools can be
                        optimized for low-bandwidth settings while maintaining
                        personalization capabilities.
                      </p>
                      <div className="flex items-center gap-2  text-muted-foreground">
                        <span>
                          Published in: Journal of Educational Technology
                        </span>
                        <span>•</span>
                        <span>Vol. 45, Issue 3</span>
                      </div>
                    </div>
                    <div className="flex flex-row gap-2 md:flex-col">
                      <Button variant="outline" size="sm" className="gap-1">
                        <FileText className="h-4 w-4" /> Read Paper
                      </Button>
                      <Button variant="ghost" size="sm" className="gap-1">
                        <Download className="h-4 w-4" /> Download PDF
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
              <div className="flex justify-center">
                <Button variant="outline">View All 2025 Publications</Button>
              </div>
            </TabsContent>
            <TabsContent value="2024" className="mt-6 space-y-6">
              <div className="rounded-lg border bg-card p-6">
                <div className="flex flex-col gap-4 md:flex-row md:items-start">
                  <div className="flex-1 space-y-2">
                    <div className="flex items-center gap-2">
                      <Badge variant="outline">Conference Paper</Badge>
                      <span className=" text-muted-foreground">
                        December 2024
                      </span>
                    </div>
                    <h3 className="text-xl font-bold">
                      NLP for African Languages: Challenges and Opportunities in
                      Low-Resource Settings
                    </h3>
                    <p className=" text-muted-foreground">
                      Authors: Alice Johnson, Emmanuel Osei, Maria Garcia, et
                      al.
                    </p>
                    <p className="">
                      This paper explores the unique challenges in developing
                      natural language processing models for African languages
                      with limited digital resources. We present a framework for
                      efficient data collection and model training that can be
                      applied across multiple language families.
                    </p>
                    <div className="flex items-center gap-2  text-muted-foreground">
                      <span>Presented at: International Conference on NLP</span>
                      <span>•</span>
                      <span>Cape Town, South Africa</span>
                    </div>
                  </div>
                  <div className="flex flex-row gap-2 md:flex-col">
                    <Button variant="outline" size="sm" className="gap-1">
                      <FileText className="h-4 w-4" /> Read Paper
                    </Button>
                    <Button variant="ghost" size="sm" className="gap-1">
                      <Download className="h-4 w-4" /> Download PDF
                    </Button>
                  </div>
                </div>
              </div>
              <div className="flex justify-center">
                <Button variant="outline">View All 2024 Publications</Button>
              </div>
            </TabsContent>
            <TabsContent value="2023" className="mt-6 space-y-6">
              <div className="rounded-lg border bg-card p-6">
                <div className="flex flex-col gap-4 md:flex-row md:items-start">
                  <div className="flex-1 space-y-2">
                    <div className="flex items-center gap-2">
                      <Badge variant="outline">Book Chapter</Badge>
                      <span className=" text-muted-foreground">
                        May 2023
                      </span>
                    </div>
                    <h3 className="text-xl font-bold">
                      Ethical Considerations in AI Deployment: A Framework for
                      African Contexts
                    </h3>
                    <p className=" text-muted-foreground">
                      Authors: Samuel Nkrumah, Lisa Wong, David Oladipo, et al.
                    </p>
                    <p className="">
                      This chapter presents an ethical framework for AI
                      development and deployment specifically tailored to
                      African contexts, addressing issues of data sovereignty,
                      algorithmic bias, and cultural sensitivity in machine
                      learning applications.
                    </p>
                    <div className="flex items-center gap-2  text-muted-foreground">
                      <span>
                        Published in: Handbook of AI Ethics in Global South
                      </span>
                      <span>•</span>
                      <span>Chapter 7</span>
                    </div>
                  </div>
                  <div className="flex flex-row gap-2 md:flex-col">
                    <Button variant="outline" size="sm" className="gap-1">
                      <FileText className="h-4 w-4" /> Read Chapter
                    </Button>
                    <Button variant="ghost" size="sm" className="gap-1">
                      <Download className="h-4 w-4" /> Download PDF
                    </Button>
                  </div>
                </div>
              </div>
              <div className="flex justify-center">
                <Button variant="outline">View All 2023 Publications</Button>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </section>

      {/* Research Team */}
      {/* <section className="w-full py-12 md:py-24 lg:py-32">
        <div className="container mx-auto max-w-6xl px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="space-y-2">
              <div className="inline-block rounded-lg bg-primary/10 px-3 py-1  text-primary">
                Our Team
              </div>
              <h2 className="text-3xl font-bold md:text-4xl/tight">
                Meet Our Research Leaders
              </h2>
              <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                A diverse team of experts driving innovation in data science and
                AI
              </p>
            </div>
          </div>

          <div className="mx-auto grid max-w-5xl grid-cols-1 gap-8 py-12 md:grid-cols-2 lg:grid-cols-3">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div key={i} className="flex flex-col items-center text-center">
                <div className="relative h-40 w-40 overflow-hidden rounded-full">
                  <Image
                    src={`/placeholder.svg?height=160&width=160&text=Researcher+${i}`}
                    width={160}
                    height={160}
                    alt={`Research team member ${i}`}
                    className="object-cover"
                  />
                </div>
                <h3 className="mt-4 text-xl font-bold">Dr. Jane Smith</h3>
                <p className=" text-primary">
                  Lead Researcher, AI Ethics
                </p>
                <p className="mt-2  text-muted-foreground">
                  PhD in Computer Science from MIT with 15+ years of experience
                  in machine learning and ethical AI development.
                </p>
                <div className="mt-4 flex gap-2">
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-8 w-8 rounded-full"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="h-4 w-4"
                    >
                      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
                      <rect width="4" height="12" x="2" y="9" />
                      <circle cx="4" cy="4" r="2" />
                    </svg>
                    <span className="sr-only">LinkedIn</span>
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-8 w-8 rounded-full"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="h-4 w-4"
                    >
                      <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z" />
                    </svg>
                    <span className="sr-only">Twitter</span>
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-8 w-8 rounded-full"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="h-4 w-4"
                    >
                      <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
                      <path d="M9 18c-4.51 2-5-2-7-2" />
                    </svg>
                    <span className="sr-only">GitHub</span>
                  </Button>
                </div>
              </div>
            ))}
          </div>

          <div className="flex justify-center">
            <Button className="gap-1">
              Join Our Research Team <Users className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </section> */}

      {/* Partnerships */}
      <section className="w-full py-12 md:py-24 lg:py-32">
        <div className="container mx-auto max-w-6xl px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="space-y-2">
            <div className="inline-block rounded-full px-3 py-1  text-primary bg-blue-900/10 !text-blue-900">
                Partnerships
              </div>
              <h2 className="text-3xl font-bold md:text-4xl/tight">
                Research Collaborations
              </h2>
              <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                We partner with leading institutions to advance data science and
                AI research
              </p>
            </div>
          </div>

          <div className="mx-auto grid max-w-5xl grid-cols-2 gap-8 py-12 md:grid-cols-3 lg:grid-cols-4">
            {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
              <div key={i} className="flex items-center justify-center">
                <div className="h-16 w-32 bg-muted rounded-md flex items-center justify-center">
                  <span className=" text-muted-foreground">
                    Partner Logo
                  </span>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-8 flex flex-col items-center space-y-4">
            <h3 className="text-xl font-bold">
              Interested in partnering with us?
            </h3>
            <p className="max-w-[600px] text-center text-muted-foreground">
              We're always looking for new research collaborations with academic
              institutions, industry partners, and government agencies.
            </p>
            <Button className="gap-1 bg-blue-900">
              Contact Our Research Team <ExternalLink className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </section>
      <Footer />
    </>
  );
};

export default page;
