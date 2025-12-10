"use client";

import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import AssessmentForm from "@/components/assessment-form";
import SchoolFeeForm from "@/components/school-fee-form";
import SponsorForm from "@/components/sponsor-form";
import { Users } from "lucide-react";

export default function PaymentPlatform() {
  const [activeTab, setActiveTab] = useState("assessment");

  return (
    <div className="min-h-screen ">
      <section className="min-h-screen px-4 hero-bg text-gray-400 flex justify-between items-center">
        <div className="container mx-auto max-w-7xl">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div data-aos="fade-up">
              <div className="inline-flex items-center px-3 py-1 rounded-full bg-blue-900/10 text-blue-600 mb-6">
                <Users className="h-4 w-4 mr-2" />
                <span className="text-sm font-medium">
                  Fee payment made easy
                </span>
              </div>
              <h1 className="text-4xl md:text-5xl lg:text-7xl font-bold mb-6 leading-tight">
                Fee <span className="text-blue-600">Payment</span> Forms
              </h1>
              <p className="text-xl text-gray-500 mb-8 max-w-xl">
                Simple, secure payments for your educational journey
              </p>
              
            </div>
            <div
              className="relative h-[400px] lg:h-[500px] rounded-2xl"
              data-aos="fade-up"
            >
              {/* Payment Forms Section */}
              <div className="container mx-auto px-4 relative z-10">
                <div className="bg-white/10 backdrop-blur-md border border-gray-500/15 rounded-2xl max-w-3xl mx-auto px-6 md:px-8 pt-6 md:pt-8">
                  <Tabs
                    defaultValue="assessment"
                    value={activeTab}
                    onValueChange={setActiveTab}
                    className="w-full shadow-none"
                  >
                    <TabsList className="mx-autogrid grid-cols-3 mb-4 bg-transparent ">
                      <TabsTrigger
                        value="assessment"
                        className="data-[state=active]:bg-[#4169E1] text-gray-800 data-[state=active]:text-white"
                      >
                        Assessment
                      </TabsTrigger>
                      <TabsTrigger
                        value="schoolfee"
                        className="data-[state=active]:bg-[#4169E1] text-gray-800 data-[state=active]:text-white"
                      >
                        School Fee
                      </TabsTrigger>
                      <TabsTrigger
                        value="sponsor"
                        className="data-[state=active]:bg-[#4169E1] text-gray-800 data-[state=active]:text-white"
                      >
                        Sponsor a Student
                      </TabsTrigger>
                    </TabsList>

                    <TabsContent value="assessment" className="p-0">
                      <AssessmentForm />
                    </TabsContent>

                    <TabsContent value="schoolfee">
                      <SchoolFeeForm />
                    </TabsContent>

                    <TabsContent value="sponsor">
                      <SponsorForm />
                    </TabsContent>
                  </Tabs>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
