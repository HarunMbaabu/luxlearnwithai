"use client";

import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Check, Loader2 } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { submitRegistration } from "@/lib/actions";
import { sendAssessmentEmail } from "@/lib/use-email-service";

const formSchema = z.object({
  paymentId: z.number(),
  fullName: z.string().min(2, {
    message: "Full name must be at least 2 characters.",
  }),
  email: z.string().email({
    message: "Please enter a valid email address.",
  }),
  phoneNumber: z.string().min(10, {
    message: "Please enter a valid phone number.",
  }),
  country: z.string({
    required_error: "Please select your country.",
  }),
  education: z.string({
    required_error: "Please select your highest level of education.",
  }),
  previousRegistration: z.enum(["Yes", "No"], {
    required_error: "Please indicate if you registered for the last cohort.",
  }),
  learningMode: z.enum(["Online", "Physical"], {
    required_error: "Please select your preferred mode of learning.",
  }),
  referralSource: z.string({
    required_error: "Please let us know how you heard about us.",
  }),
});

export default function RegistrationForm({ paymentId, email }) {
  const [step, setStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState(null);

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      paymentId,
      fullName: "",
      email: email || "",
      phoneNumber: "",
      country: "",
      education: "",
      previousRegistration: undefined,
      learningMode: undefined,
      referralSource: "",
    },
  });

  const totalSteps = 3;

  const nextStep = async () => {
    // Made async for better error handling
    if (step === 1) {
      const isValid = await form.trigger([
        "fullName",
        "email",
        "phoneNumber",
        "country",
      ]);
      if (isValid) setStep(2);
    } else if (step === 2) {
      const isValid = await form.trigger([
        "education",
        "previousRegistration",
        "learningMode",
      ]);
      if (isValid) setStep(3);
    }
  };

  const prevStep = () => {
    setStep(Math.max(1, step - 1));
  };

  const onSubmit = async (values) => {
    // Only proceed if we're on the final step
    if (step !== totalSteps) {
      return;
    }

    try {
      setIsSubmitting(true);
      setError(null);

      const result = await submitRegistration(values);

      if (result.success) {
        // Send assessment email if registration was successful
        if (result.emailData) {
          try {
            await sendAssessmentEmail(result.emailData);
          } catch (emailError) {
            console.error("Error sending assessment email:", emailError);
          }
        }

        setIsSuccess(true);
      } else {
        setError(result.error || "Registration failed. Please try again.");
      }
    } catch (error) {
      console.error("Registration failed:", error);
      setError("An unexpected error occurred. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSuccess) {
  return (
    <Card className="p-6 bg-emerald-50 border-emerald-200">
      <div className="text-center">
        <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-emerald-100">
          <Check className="h-6 w-6 text-emerald-600" />
        </div>
        <h3 className="mt-4 text-lg font-medium text-emerald-900">
          Registration Successful!
        </h3>
        <p className="mt-2 text-sm text-emerald-700">
          Thank you for registering for the LuxDevHQ June 2025 Intake. We have
          received your application and payment.
        </p>
        <p className="mt-2 text-sm text-emerald-700 font-medium">
          Please check your email ({form.getValues("email")}) for important information 
          about your assessment and next steps.
        </p>
        <div className="mt-6">
          <Button asChild>
            <a href="/" className="bg-emerald-600 hover:bg-emerald-700">
              Return to Homepage
            </a>
          </Button>
        </div>
      </div>
    </Card>
  );
}

  return (
    <div>
      {error && (
        <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg text-red-700 text-sm">
          {error}
        </div>
      )}

      {/* Progress Indicator */}
      <div className="mb-8">
        <div className="flex justify-between">
          {Array.from({ length: totalSteps }).map((_, index) => (
            <div key={index} className="flex flex-col items-center">
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center ${
                  step > index + 1
                    ? "bg-emerald-600 text-white"
                    : step === index + 1
                    ? "bg-emerald-100 border-2 border-emerald-600 text-emerald-600"
                    : "bg-slate-100 text-slate-400"
                }`}
              >
                {step > index + 1 ? <Check className="h-4 w-4" /> : index + 1}
              </div>
              <span className="text-xs mt-1 text-slate-600">
                {index === 0
                  ? "Personal Info"
                  : index === 1
                  ? "Education & Mode"
                  : "Program Details"}
              </span>
            </div>
          ))}
        </div>
        <div className="mt-2 h-2 bg-slate-100 rounded-full overflow-hidden">
          <div
            className="h-full bg-emerald-600 transition-all duration-300 ease-in-out"
            style={{ width: `${(step / totalSteps) * 100}%` }}
          ></div>
        </div>
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          {/* Hidden payment ID field */}
          <input type="hidden" name="paymentId" value={paymentId} />

          {step === 1 && (
            <>
              <FormField
                control={form.control}
                name="fullName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Full Name</FormLabel>
                    <FormControl>
                      <Input placeholder="John Doe" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email Address</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="johndoe@example.com"
                        type="email"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="phoneNumber"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Phone Number</FormLabel>
                    <FormControl>
                      <Input placeholder="+254 700 000 000" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="country"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Which country are you from?</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select your country" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="Kenya">Kenya</SelectItem>
                        <SelectItem value="Uganda">Uganda</SelectItem>
                        <SelectItem value="Tanzania">Tanzania</SelectItem>
                        <SelectItem value="Rwanda">Rwanda</SelectItem>
                        <SelectItem value="Nigeria">Nigeria</SelectItem>
                        <SelectItem value="Ghana">Ghana</SelectItem>
                        <SelectItem value="South Africa">
                          South Africa
                        </SelectItem>
                        <SelectItem value="Other">Other</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </>
          )}

          {step === 2 && (
            <>
              <FormField
                control={form.control}
                name="education"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      What is your highest level of education?
                    </FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select your education level" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="High School">High School</SelectItem>
                        <SelectItem value="Certificate">Certificate</SelectItem>
                        <SelectItem value="Diploma">Diploma</SelectItem>
                        <SelectItem value="Bachelor's Degree">
                          Bachelor's Degree
                        </SelectItem>
                        <SelectItem value="Master's Degree">
                          Master's Degree
                        </SelectItem>
                        <SelectItem value="PhD">PhD</SelectItem>
                        <SelectItem value="Other">Other</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="previousRegistration"
                render={({ field }) => (
                  <FormItem className="space-y-3">
                    <FormLabel>
                      Did you register for the last cohort and got assessed?
                    </FormLabel>
                    <FormControl>
                      <RadioGroup
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                        className="flex flex-col space-y-1"
                      >
                        <FormItem className="flex items-center space-x-3 space-y-0">
                          <FormControl>
                            <RadioGroupItem value="Yes" />
                          </FormControl>
                          <FormLabel className="font-normal">Yes</FormLabel>
                        </FormItem>
                        <FormItem className="flex items-center space-x-3 space-y-0">
                          <FormControl>
                            <RadioGroupItem value="No" />
                          </FormControl>
                          <FormLabel className="font-normal">No</FormLabel>
                        </FormItem>
                      </RadioGroup>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="learningMode"
                render={({ field }) => (
                  <FormItem className="space-y-3">
                    <FormLabel>Mode of learning?</FormLabel>
                    <FormControl>
                      <RadioGroup
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                        className="flex flex-col space-y-1"
                      >
                        <FormItem className="flex items-center space-x-3 space-y-0">
                          <FormControl>
                            <RadioGroupItem value="Online" />
                          </FormControl>
                          <FormLabel className="font-normal">
                            Online (10,500 KES)
                          </FormLabel>
                        </FormItem>
                        <FormItem className="flex items-center space-x-3 space-y-0">
                          <FormControl>
                            <RadioGroupItem value="Physical" />
                          </FormControl>
                          <FormLabel className="font-normal">
                            Physical (12,500 KES)
                          </FormLabel>
                        </FormItem>
                      </RadioGroup>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </>
          )}

          {step === 3 && (
            <>
              <FormField
                control={form.control}
                name="referralSource"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      Where did you hear about Lux Academy and Data Science East
                      Africa?
                    </FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Social media, friend, etc."
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </>
          )}

          <div className="flex justify-between pt-4">
            {step > 1 && (
              <Button type="button" variant="outline" onClick={prevStep}>
                Previous
              </Button>
            )}
            {step < totalSteps ? (
              <Button type="button" className="ml-auto" onClick={nextStep}>
                Next
              </Button>
            ) : (
              <Button
                type="submit"
                className="ml-auto bg-emerald-600 hover:bg-emerald-700"
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Submitting...
                  </>
                ) : (
                  "Complete Registration"
                )}
              </Button>
            )}
          </div>
        </form>
      </Form>
    </div>
  );
}
