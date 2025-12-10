"use client"

import { useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import AOS from "aos"
import "aos/dist/aos.css"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Badge } from "@/components/ui/badge"
import {
  Check,
  ArrowRight,
  BrainCircuit,
  ExternalLink,
  FileCode,
  Lightbulb,
  BarChart3,
  Users,
  Shield,
  Database,
  LineChart,
  Building2,
  Layers,
  Cpu,
  Workflow,
} from "lucide-react"
import Header from "../components/header"
import Footer from "../components/footer"

export default function AIServicesPage() {
  useEffect(() => {
    AOS.init({ duration: 700, once: true })
  }, [])

  return (
    <div className="bg-white text-gray-900">
      <Header />

      {/* Hero Section */}
      <section className="pt-32 pb-16 px-4">
        <div className="container mx-auto max-w-7xl">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div data-aos="fade-up">
              <div className="inline-flex items-center px-3 py-1 rounded-full bg-blue-900/10 text-blue-900 mb-6">
                <Building2 className="h-4 w-4 mr-2" />
                <span className="text-sm font-medium">Enterprise AI Solutions</span>
              </div>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
                Transform Your Business with <span className="text-blue-900">AI</span> Technology
              </h1>
              <p className="text-xl text-gray-600 mb-8 max-w-xl">
                Custom AI solutions designed for corporate and SME clients to drive efficiency, innovation, and
                competitive advantage in today's data-driven marketplace.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button size="lg" className="rounded-full bg-blue-900">
                  Schedule Consultation
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
                <Button variant="outline" size="lg" className="rounded-full">
                  Download Brochure
                  <ExternalLink className="ml-2 h-4 w-4" />
                </Button>
              </div>
            </div>
            <div className="relative h-[400px] lg:h-[500px] rounded-2xl overflow-hidden" data-aos="fade-up">
              <Image
                src="/ai.jpg?height=1000&width=1600"
                alt="Enterprise AI Solutions"
                fill
                className="object-cover"
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-tr from-blue-900/30 to-transparent opacity-60"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Business Benefits Section */}
      <section className="py-20 px-4 bg-gradient-to-t from-slate-50 to-white">
        <div className="container mx-auto max-w-7xl">
          <div className="text-center mb-16" data-aos="fade-up">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Why Choose Our Enterprise AI Solutions</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Delivering measurable business outcomes through advanced AI implementation
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="shadow-none border" data-aos="fade-up" data-aos-delay="100">
              <CardContent className="p-8">
                <div className="w-12 h-12 bg-blue-900/10 rounded-full flex items-center justify-center mb-6">
                  <LineChart className="h-6 w-6 text-blue-900" />
                </div>
                <h3 className="text-xl font-bold mb-3">Increased ROI</h3>
                <p className="text-gray-600 mb-4">
                  Our clients report an average 32% increase in operational efficiency and 27% cost reduction within the
                  first year of implementation.
                </p>
                <ul className="space-y-2">
                  <li className="flex items-start">
                    <Check className="h-5 w-5 text-blue-900 mr-2 flex-shrink-0 mt-0.5" />
                    <span>Reduced operational costs</span>
                  </li>
                  <li className="flex items-start">
                    <Check className="h-5 w-5 text-blue-900 mr-2 flex-shrink-0 mt-0.5" />
                    <span>Increased productivity</span>
                  </li>
                  <li className="flex items-start">
                    <Check className="h-5 w-5 text-blue-900 mr-2 flex-shrink-0 mt-0.5" />
                    <span>Faster time-to-market</span>
                  </li>
                </ul>
              </CardContent>
            </Card>

            <Card className="shadow-none border" data-aos="fade-up" data-aos-delay="200">
              <CardContent className="p-8">
                <div className="w-12 h-12 bg-blue-900/10 rounded-full flex items-center justify-center mb-6">
                  <Layers className="h-6 w-6 text-blue-900" />
                </div>
                <h3 className="text-xl font-bold mb-3">Scalable Solutions</h3>
                <p className="text-gray-600 mb-4">
                  Enterprise-grade AI infrastructure that grows with your business, from small implementations to
                  organization-wide deployments.
                </p>
                <ul className="space-y-2">
                  <li className="flex items-start">
                    <Check className="h-5 w-5 text-blue-900 mr-2 flex-shrink-0 mt-0.5" />
                    <span>Flexible deployment options</span>
                  </li>
                  <li className="flex items-start">
                    <Check className="h-5 w-5 text-blue-900 mr-2 flex-shrink-0 mt-0.5" />
                    <span>Cloud or on-premise solutions</span>
                  </li>
                  <li className="flex items-start">
                    <Check className="h-5 w-5 text-blue-900 mr-2 flex-shrink-0 mt-0.5" />
                    <span>Seamless integration with existing systems</span>
                  </li>
                </ul>
              </CardContent>
            </Card>

            <Card className="shadow-none border" data-aos="fade-up" data-aos-delay="300">
              <CardContent className="p-8">
                <div className="w-12 h-12 bg-blue-900/10 rounded-full flex items-center justify-center mb-6">
                  <Shield className="h-6 w-6 text-blue-900" />
                </div>
                <h3 className="text-xl font-bold mb-3">Enterprise Security</h3>
                <p className="text-gray-600 mb-4">
                  Bank-grade security protocols and compliance with industry regulations to protect your sensitive
                  business data.
                </p>
                <ul className="space-y-2">
                  <li className="flex items-start">
                    <Check className="h-5 w-5 text-blue-900 mr-2 flex-shrink-0 mt-0.5" />
                    <span>GDPR and CCPA compliant</span>
                  </li>
                  <li className="flex items-start">
                    <Check className="h-5 w-5 text-blue-900 mr-2 flex-shrink-0 mt-0.5" />
                    <span>End-to-end encryption</span>
                  </li>
                  <li className="flex items-start">
                    <Check className="h-5 w-5 text-blue-900 mr-2 flex-shrink-0 mt-0.5" />
                    <span>Regular security audits</span>
                  </li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Enterprise AI Services Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto max-w-7xl">
          <div className="text-center mb-16" data-aos="fade-up">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Our Enterprise AI Services</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Comprehensive AI solutions tailored to your business needs and industry requirements
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <Card className="shadow-none border" data-aos="fade-up" data-aos-delay="100">
              <CardContent className="p-8">
                <div className="w-12 h-12 bg-blue-900/10 rounded-full flex items-center justify-center mb-6">
                  <BrainCircuit className="h-6 w-6 text-blue-900" />
                </div>
                <h3 className="text-xl font-bold mb-3">Custom AI Development</h3>
                <p className="text-gray-600 mb-4">
                  Bespoke AI solutions designed to address your specific business challenges and opportunities.
                </p>
                <ul className="space-y-2">
                  <li className="flex items-start">
                    <Check className="h-5 w-5 text-blue-900 mr-2 flex-shrink-0 mt-0.5" />
                    <span>Tailored machine learning models</span>
                  </li>
                  <li className="flex items-start">
                    <Check className="h-5 w-5 text-blue-900 mr-2 flex-shrink-0 mt-0.5" />
                    <span>Industry-specific AI applications</span>
                  </li>
                  <li className="flex items-start">
                    <Check className="h-5 w-5 text-blue-900 mr-2 flex-shrink-0 mt-0.5" />
                    <span>End-to-end development and deployment</span>
                  </li>
                </ul>
              </CardContent>
            </Card>

            <Card className="shadow-none border" data-aos="fade-up" data-aos-delay="200">
              <CardContent className="p-8">
                <div className="w-12 h-12 bg-blue-900/10 rounded-full flex items-center justify-center mb-6">
                  <Database className="h-6 w-6 text-blue-900" />
                </div>
                <h3 className="text-xl font-bold mb-3">Data Analytics & BI</h3>
                <p className="text-gray-600 mb-4">
                  Transform your raw data into actionable business intelligence with advanced analytics and
                  visualization.
                </p>
                <ul className="space-y-2">
                  <li className="flex items-start">
                    <Check className="h-5 w-5 text-blue-900 mr-2 flex-shrink-0 mt-0.5" />
                    <span>Predictive analytics</span>
                  </li>
                  <li className="flex items-start">
                    <Check className="h-5 w-5 text-blue-900 mr-2 flex-shrink-0 mt-0.5" />
                    <span>Custom dashboards and reporting</span>
                  </li>
                  <li className="flex items-start">
                    <Check className="h-5 w-5 text-blue-900 mr-2 flex-shrink-0 mt-0.5" />
                    <span>Real-time data processing</span>
                  </li>
                </ul>
              </CardContent>
            </Card>

            <Card className="shadow-none border" data-aos="fade-up" data-aos-delay="300">
              <CardContent className="p-8">
                <div className="w-12 h-12 bg-blue-900/10 rounded-full flex items-center justify-center mb-6">
                  <Workflow className="h-6 w-6 text-blue-900" />
                </div>
                <h3 className="text-xl font-bold mb-3">Process Automation</h3>
                <p className="text-gray-600 mb-4">
                  Streamline operations and reduce manual tasks with intelligent automation powered by AI.
                </p>
                <ul className="space-y-2">
                  <li className="flex items-start">
                    <Check className="h-5 w-5 text-blue-900 mr-2 flex-shrink-0 mt-0.5" />
                    <span>Intelligent document processing</span>
                  </li>
                  <li className="flex items-start">
                    <Check className="h-5 w-5 text-blue-900 mr-2 flex-shrink-0 mt-0.5" />
                    <span>Workflow optimization</span>
                  </li>
                  <li className="flex items-start">
                    <Check className="h-5 w-5 text-blue-900 mr-2 flex-shrink-0 mt-0.5" />
                    <span>RPA with cognitive capabilities</span>
                  </li>
                </ul>
              </CardContent>
            </Card>

            <Card className="shadow-none border" data-aos="fade-up" data-aos-delay="400">
              <CardContent className="p-8">
                <div className="w-12 h-12 bg-blue-900/10 rounded-full flex items-center justify-center mb-6">
                  <Cpu className="h-6 w-6 text-blue-900" />
                </div>
                <h3 className="text-xl font-bold mb-3">AI Infrastructure</h3>
                <p className="text-gray-600 mb-4">
                  Build and maintain the technical foundation needed for successful AI implementation.
                </p>
                <ul className="space-y-2">
                  <li className="flex items-start">
                    <Check className="h-5 w-5 text-blue-900 mr-2 flex-shrink-0 mt-0.5" />
                    <span>Cloud AI infrastructure setup</span>
                  </li>
                  <li className="flex items-start">
                    <Check className="h-5 w-5 text-blue-900 mr-2 flex-shrink-0 mt-0.5" />
                    <span>MLOps implementation</span>
                  </li>
                  <li className="flex items-start">
                    <Check className="h-5 w-5 text-blue-900 mr-2 flex-shrink-0 mt-0.5" />
                    <span>Scalable computing resources</span>
                  </li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Industry Solutions Section */}
      <section className="py-20 px-4 bg-gradient-to-t from-slate-50 to-white">
        <div className="container mx-auto max-w-7xl">
          <div className="text-center mb-16" data-aos="fade-up">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Industry-Specific AI Solutions</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Tailored AI applications designed for the unique challenges of your industry
            </p>
          </div>

          <Tabs defaultValue="finance" className="w-full">
            <div className="flex justify-center mb-8" data-aos="fade-up">
              <TabsList className="grid w-full max-w-4xl grid-cols-4">
                <TabsTrigger value="finance">Finance</TabsTrigger>
                <TabsTrigger value="healthcare">Healthcare</TabsTrigger>
                <TabsTrigger value="manufacturing">Manufacturing</TabsTrigger>
                <TabsTrigger value="retail">Retail</TabsTrigger>
              </TabsList>
            </div>

            <TabsContent value="finance">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                <div className="relative h-[400px] rounded-2xl overflow-hidden" data-aos="fade-up">
                  <Image
                    src="/finance.jpg?height=800&width=1200"
                    alt="Finance AI Solutions"
                    fill
                    className="object-cover"
                  />
                </div>
                <div data-aos="fade-up">
                  <h3 className="text-2xl font-bold mb-4">AI Solutions for Financial Services</h3>
                  <p className="text-gray-600 mb-6">
                    Enhance risk assessment, automate compliance, and deliver personalized financial services with our
                    AI solutions for the finance industry.
                  </p>
                  <ul className="space-y-4">
                    <li className="flex items-start">
                      <div className="w-10 h-10 bg-blue-900/10 rounded-full flex-shrink-0 flex items-center justify-center mr-4">
                        <Shield className="h-5 w-5 text-blue-900" />
                      </div>
                      <div>
                        <h4 className="font-bold mb-1">Fraud Detection & Prevention</h4>
                        <p className="text-gray-600">
                          Advanced anomaly detection systems that identify suspicious patterns in real-time.
                        </p>
                      </div>
                    </li>
                    <li className="flex items-start">
                      <div className="w-10 h-10 bg-blue-900/10 rounded-full flex-shrink-0 flex items-center justify-center mr-4">
                        <BarChart3 className="h-5 w-5 text-blue-900" />
                      </div>
                      <div>
                        <h4 className="font-bold mb-1">Algorithmic Trading</h4>
                        <p className="text-gray-600">
                          AI-powered trading systems that analyze market data and execute trades at optimal times.
                        </p>
                      </div>
                    </li>
                    <li className="flex items-start">
                      <div className="w-10 h-10 bg-blue-900/10 rounded-full flex-shrink-0 flex items-center justify-center mr-4">
                        <Users className="h-5 w-5 text-blue-900" />
                      </div>
                      <div>
                        <h4 className="font-bold mb-1">Customer Risk Assessment</h4>
                        <p className="text-gray-600">
                          Predictive models that evaluate creditworthiness and risk profiles with greater accuracy.
                        </p>
                      </div>
                    </li>
                  </ul>
                  <Button className="mt-6 bg-blue-900">
                    Learn More About Finance Solutions
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="healthcare">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                <div className="relative h-[400px] rounded-2xl overflow-hidden" data-aos="fade-up">
                  <Image
                    src="/healthcare.jpg?height=800&width=1200"
                    alt="Healthcare AI Solutions"
                    fill
                    className="object-cover"
                  />
                </div>
                <div data-aos="fade-up">
                  <h3 className="text-2xl font-bold mb-4">AI Solutions for Healthcare</h3>
                  <p className="text-gray-600 mb-6">
                    Improve patient outcomes, optimize clinical workflows, and accelerate medical research with our
                    healthcare AI solutions.
                  </p>
                  <ul className="space-y-4">
                    <li className="flex items-start">
                      <div className="w-10 h-10 bg-blue-900/10 rounded-full flex-shrink-0 flex items-center justify-center mr-4">
                        <FileCode className="h-5 w-5 text-blue-900" />
                      </div>
                      <div>
                        <h4 className="font-bold mb-1">Medical Imaging Analysis</h4>
                        <p className="text-gray-600">
                          AI-powered diagnostic tools that assist radiologists in detecting abnormalities with greater
                          accuracy.
                        </p>
                      </div>
                    </li>
                    <li className="flex items-start">
                      <div className="w-10 h-10 bg-blue-900/10 rounded-full flex-shrink-0 flex items-center justify-center mr-4">
                        <Lightbulb className="h-5 w-5 text-blue-900" />
                      </div>
                      <div>
                        <h4 className="font-bold mb-1">Predictive Patient Monitoring</h4>
                        <p className="text-gray-600">
                          Early warning systems that identify potential complications before they become critical.
                        </p>
                      </div>
                    </li>
                    <li className="flex items-start">
                      <div className="w-10 h-10 bg-blue-900/10 rounded-full flex-shrink-0 flex items-center justify-center mr-4">
                        <Database className="h-5 w-5 text-blue-900" />
                      </div>
                      <div>
                        <h4 className="font-bold mb-1">Clinical Trial Optimization</h4>
                        <p className="text-gray-600">
                          AI algorithms that improve patient selection and monitor trial outcomes in real-time.
                        </p>
                      </div>
                    </li>
                  </ul>
                  <Button className="mt-6 bg-blue-900">
                    Learn More About Healthcare Solutions
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="manufacturing">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                <div className="relative h-[400px] rounded-2xl overflow-hidden" data-aos="fade-up">
                  <Image
                    src="/manufacturing.jpg?height=800&width=1200"
                    alt="Manufacturing AI Solutions"
                    fill
                    className="object-cover"
                  />
                </div>
                <div data-aos="fade-up">
                  <h3 className="text-2xl font-bold mb-4">AI Solutions for Manufacturing</h3>
                  <p className="text-gray-600 mb-6">
                    Optimize production processes, predict maintenance needs, and improve quality control with our
                    manufacturing AI solutions.
                  </p>
                  <ul className="space-y-4">
                    <li className="flex items-start">
                      <div className="w-10 h-10 bg-blue-900/10 rounded-full flex-shrink-0 flex items-center justify-center mr-4">
                        <Workflow className="h-5 w-5 text-blue-900" />
                      </div>
                      <div>
                        <h4 className="font-bold mb-1">Predictive Maintenance</h4>
                        <p className="text-gray-600">
                          AI systems that predict equipment failures before they occur, reducing downtime and
                          maintenance costs.
                        </p>
                      </div>
                    </li>
                    <li className="flex items-start">
                      <div className="w-10 h-10 bg-blue-900/10 rounded-full flex-shrink-0 flex items-center justify-center mr-4">
                        <Layers className="h-5 w-5 text-blue-900" />
                      </div>
                      <div>
                        <h4 className="font-bold mb-1">Quality Control Automation</h4>
                        <p className="text-gray-600">
                          Computer vision systems that detect defects with greater accuracy than traditional methods.
                        </p>
                      </div>
                    </li>
                    <li className="flex items-start">
                      <div className="w-10 h-10 bg-blue-900/10 rounded-full flex-shrink-0 flex items-center justify-center mr-4">
                        <LineChart className="h-5 w-5 text-blue-900" />
                      </div>
                      <div>
                        <h4 className="font-bold mb-1">Supply Chain Optimization</h4>
                        <p className="text-gray-600">
                          AI-driven forecasting and planning tools that reduce inventory costs and improve delivery
                          times.
                        </p>
                      </div>
                    </li>
                  </ul>
                  <Button className="mt-6 bg-blue-900">
                    Learn More About Manufacturing Solutions
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="retail">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                <div className="relative h-[400px] rounded-2xl overflow-hidden" data-aos="fade-up">
                  <Image
                    src="/retail.jpg?height=800&width=1200"
                    alt="Retail AI Solutions"
                    fill
                    className="object-cover"
                  />
                </div>
                <div data-aos="fade-up">
                  <h3 className="text-2xl font-bold mb-4">AI Solutions for Retail</h3>
                  <p className="text-gray-600 mb-6">
                    Enhance customer experiences, optimize inventory management, and personalize marketing with our
                    retail AI solutions.
                  </p>
                  <ul className="space-y-4">
                    <li className="flex items-start">
                      <div className="w-10 h-10 bg-blue-900/10 rounded-full flex-shrink-0 flex items-center justify-center mr-4">
                        <Users className="h-5 w-5 text-blue-900" />
                      </div>
                      <div>
                        <h4 className="font-bold mb-1">Customer Behavior Analysis</h4>
                        <p className="text-gray-600">
                          AI systems that analyze shopping patterns and preferences to improve store layouts and product
                          offerings.
                        </p>
                      </div>
                    </li>
                    <li className="flex items-start">
                      <div className="w-10 h-10 bg-blue-900/10 rounded-full flex-shrink-0 flex items-center justify-center mr-4">
                        <BarChart3 className="h-5 w-5 text-blue-900" />
                      </div>
                      <div>
                        <h4 className="font-bold mb-1">Demand Forecasting</h4>
                        <p className="text-gray-600">
                          Predictive models that optimize inventory levels and reduce stockouts and overstock
                          situations.
                        </p>
                      </div>
                    </li>
                    <li className="flex items-start">
                      <div className="w-10 h-10 bg-blue-900/10 rounded-full flex-shrink-0 flex items-center justify-center mr-4">
                        <Lightbulb className="h-5 w-5 text-blue-900" />
                      </div>
                      <div>
                        <h4 className="font-bold mb-1">Personalized Recommendations</h4>
                        <p className="text-gray-600">
                          AI-powered recommendation engines that increase cross-selling and customer satisfaction.
                        </p>
                      </div>
                    </li>
                  </ul>
                  <Button className="mt-6 bg-blue-900">
                    Learn More About Retail Solutions
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </section>

      {/* Implementation Process Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto max-w-7xl">
          <div className="text-center mb-16" data-aos="fade-up">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Our Implementation Process</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              A structured approach to delivering successful AI solutions for your business
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <Card className="shadow-none border" data-aos="fade-up" data-aos-delay="100">
              <CardContent className="p-8 text-center">
                <div className="w-16 h-16 bg-blue-900/10 rounded-full flex items-center justify-center mx-auto mb-6">
                  <span className="text-2xl font-bold text-blue-900">1</span>
                </div>
                <h3 className="text-xl font-bold mb-3">Discovery & Assessment</h3>
                <p className="text-gray-600">
                  We analyze your business needs, data infrastructure, and identify opportunities where AI can deliver
                  the most value.
                </p>
              </CardContent>
            </Card>

            <Card className="shadow-none border" data-aos="fade-up" data-aos-delay="200">
              <CardContent className="p-8 text-center">
                <div className="w-16 h-16 bg-blue-900/10 rounded-full flex items-center justify-center mx-auto mb-6">
                  <span className="text-2xl font-bold text-blue-900">2</span>
                </div>
                <h3 className="text-xl font-bold mb-3">Solution Design</h3>
                <p className="text-gray-600">
                  Our experts design a tailored AI solution architecture that aligns with your business goals and
                  technical requirements.
                </p>
              </CardContent>
            </Card>

            <Card className="shadow-none border" data-aos="fade-up" data-aos-delay="300">
              <CardContent className="p-8 text-center">
                <div className="w-16 h-16 bg-blue-900/10 rounded-full flex items-center justify-center mx-auto mb-6">
                  <span className="text-2xl font-bold text-blue-900">3</span>
                </div>
                <h3 className="text-xl font-bold mb-3">Development & Testing</h3>
                <p className="text-gray-600">
                  We build, train, and rigorously test your AI solution to ensure it meets performance and accuracy
                  requirements.
                </p>
              </CardContent>
            </Card>

            <Card className="shadow-none border" data-aos="fade-up" data-aos-delay="400">
              <CardContent className="p-8 text-center">
                <div className="w-16 h-16 bg-blue-900/10 rounded-full flex items-center justify-center mx-auto mb-6">
                  <span className="text-2xl font-bold text-blue-900">4</span>
                </div>
                <h3 className="text-xl font-bold mb-3">Deployment & Support</h3>
                <p className="text-gray-600">
                  We implement the solution in your environment, provide training, and offer ongoing support and
                  optimization.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Case Studies Section */}
      <section className="py-20 px-4 bg-gradient-to-b from-slate-50 to-white">
        <div className="container mx-auto max-w-7xl">
          <div className="text-center mb-16" data-aos="fade-up">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Enterprise Success Stories</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Real-world results from our corporate and SME clients
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Case Study 1 */}
            <Card className="shadow-none border overflow-hidden" data-aos="fade-up" data-aos-delay="100">
              <div className="h-64 relative">
                <Image src="/fraud.jpg?height=400&width=600" alt="Case Study 1" fill className="object-cover" />
              </div>
              <CardContent className="p-8">
                <Badge className="mb-4 bg-blue-900">Financial Services</Badge>
                <h3 className="text-xl font-bold mb-3">Global Bank Fraud Detection</h3>
                <p className="text-gray-600 mb-4">
                  Implemented an AI-powered fraud detection system for a global bank, reducing fraudulent transactions
                  by 83% and saving $4.2M annually.
                </p>
                <div className="flex justify-between items-center">
                  <div>
                    <span className="text-sm font-bold text-blue-900">Results:</span>
                    <ul className="mt-2">
                      <li className="flex items-center">
                        <Check className="h-4 w-4 text-blue-900 mr-2" />
                        <span className="text-sm">83% reduction in fraud</span>
                      </li>
                      <li className="flex items-center">
                        <Check className="h-4 w-4 text-blue-900 mr-2" />
                        <span className="text-sm">$4.2M annual savings</span>
                      </li>
                    </ul>
                  </div>
                  <Link href="#" className="text-blue-900 hover:underline flex items-center">
                    Read Case Study
                    <ArrowRight className="ml-1 h-4 w-4" />
                  </Link>
                </div>
              </CardContent>
            </Card>

            {/* Case Study 2 */}
            <Card className="shadow-none border overflow-hidden" data-aos="fade-up" data-aos-delay="200">
              <div className="h-64 relative">
                <Image src="/auto.jpg?height=400&width=600" alt="Case Study 2" fill className="object-cover" />
              </div>
              <CardContent className="p-8">
                <Badge className="mb-4 bg-blue-900">Manufacturing</Badge>
                <h3 className="text-xl font-bold mb-3">Predictive Maintenance for AutoTech</h3>
                <p className="text-gray-600 mb-4">
                  Developed a predictive maintenance system for a mid-sized automotive parts manufacturer, reducing
                  downtime by 47% and maintenance costs by 32%.
                </p>
                <div className="flex justify-between items-center">
                  <div>
                    <span className="text-sm font-bold text-blue-900">Results:</span>
                    <ul className="mt-2">
                      <li className="flex items-center">
                        <Check className="h-4 w-4 text-blue-900 mr-2" />
                        <span className="text-sm">47% reduction in downtime</span>
                      </li>
                      <li className="flex items-center">
                        <Check className="h-4 w-4 text-blue-900 mr-2" />
                        <span className="text-sm">32% lower maintenance costs</span>
                      </li>
                    </ul>
                  </div>
                  <Link href="#" className="text-blue-900 hover:underline flex items-center">
                    Read Case Study
                    <ArrowRight className="ml-1 h-4 w-4" />
                  </Link>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto max-w-4xl">
          <div className="text-center mb-16" data-aos="fade-up">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Frequently Asked Questions</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">Common questions about our enterprise AI services</p>
          </div>

          <Accordion type="single" collapsible className="w-full" data-aos="fade-up">
            <AccordionItem value="item-1">
              <AccordionTrigger>How long does it take to implement an AI solution?</AccordionTrigger>
              <AccordionContent>
                Implementation timelines vary based on the complexity of the solution and your organization's readiness.
                Simple AI applications can be deployed in as little as 4-6 weeks, while more complex enterprise-wide
                solutions may take 3-6 months. During our initial assessment, we'll provide you with a detailed timeline
                based on your specific requirements and organizational constraints.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-2">
              <AccordionTrigger>What kind of ROI can we expect from AI implementation?</AccordionTrigger>
              <AccordionContent>
                Our clients typically see ROI within 6-12 months of implementation. The specific returns depend on your
                use case, but common outcomes include 20-40% reduction in operational costs, 15-30% increase in
                productivity, and 25-50% improvement in decision-making accuracy. We work with you to establish clear
                KPIs and ROI metrics at the beginning of the project and track them throughout implementation.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-3">
              <AccordionTrigger>How do you ensure data security and compliance?</AccordionTrigger>
              <AccordionContent>
                We implement multiple layers of security including end-to-end encryption, secure access controls, and
                regular security audits. Our solutions comply with industry standards such as GDPR, CCPA, HIPAA, and SOC
                2. We also work closely with your security and compliance teams to ensure our solutions meet your
                specific regulatory requirements and internal security policies.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-4">
              <AccordionTrigger>Do we need to have data scientists on our team?</AccordionTrigger>
              <AccordionContent>
                No, you don't need to have data scientists on your team. Our solutions are designed to be used by
                business users without specialized AI expertise. We provide comprehensive training and documentation for
                your team. For clients who want to build internal AI capabilities, we offer knowledge transfer programs
                and can help you establish your own AI center of excellence.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-5">
              <AccordionTrigger>Can your AI solutions integrate with our existing systems?</AccordionTrigger>
              <AccordionContent>
                Yes, our AI solutions are designed to integrate seamlessly with your existing IT infrastructure. We
                support integration with major ERP systems, CRMs, databases, and cloud platforms. Our team includes
                integration specialists who will work with your IT department to ensure smooth connectivity with minimal
                disruption to your operations.
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto max-w-4xl text-center">
          <div className="bg-blue-900/5 p-12 rounded-3xl" data-aos="fade-up">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to Transform Your Business with AI?</h2>
            <p className="text-xl text-gray-600 mb-10 max-w-2xl mx-auto">
              Schedule a consultation with our enterprise AI experts to discuss your business challenges and how our
              solutions can help.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="rounded-full bg-blue-900">
                Schedule Consultation
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
              <Button variant="outline" size="lg" className="rounded-full">
                View Case Studies
                <ExternalLink className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}

