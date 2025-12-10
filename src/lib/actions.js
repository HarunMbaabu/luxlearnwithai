"use server"

import { z } from "zod"
import { revalidatePath } from "next/cache"
import { redirect } from "next/navigation"
import {
  createPayment,
  createRegistration,
  getPaymentByReference,
  getPaymentById,
  hasRegistration,
  updatePaymentStatus,
} from "./db"
import { initializePayment, verifyPayment } from "./paystack"

// Schema for payment initialization
const paymentSchema = z.object({
  email: z.string().email({
    message: "Please enter a valid email address.",
  }),
})

const registrationSchema = z.object({
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
})

export async function initiatePayment(formData) {
  try {
    const email = formData.get("email")?.toString();
    
    // Basic validation
    if (!email) {
      return { error: "Please enter your email address" };
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return { error: "Please enter a valid email address" };
    }

    // Initialize payment
    const response = await initializePayment(email, 500, {
      purpose: "LuxDevHQ Registration Fee",
    });

    if (!response?.status) {
      return { 
        error: "We're having trouble connecting to our payment processor. Please try again or contact info@luxdevhq.com" 
      };
    }

    // Create payment record
    const payment = await createPayment({
      reference: response.data.reference,
      amount: 500,
      email,
      status: "pending",
      metadata: { purpose: "LuxDevHQ Registration Fee" },
    });

    if (!payment) {
      return { 
        error: "We couldn't create your payment record. Please contact info@luxdevhq.com for assistance" 
      };
    }

    // Redirect to payment page
    if (response.data.authorization_url) {
      redirect(response.data.authorization_url);
    }

    return { 
      error: "We're unable to redirect you to the payment page. Please try again or contact info@luxdevhq.com" 
    };

  } catch (error) {
    console.error("Payment initiation error:", error);
    
    return {
      error: error instanceof Error 
        ? error.message 
        : "We're experiencing technical difficulties. Please try again later or contact info@luxdevhq.com for assistance"
    };
  }
}
export async function verifyPaymentStatus(reference) {
  try {
    // Check if payment exists
    const existingPayment = await getPaymentByReference(reference)
    if (!existingPayment) {
      throw new Error("Payment record not found")
    }

    // Return if already verified
    if (existingPayment.payment_status === "success") {
      return {
        success: true,
        payment: existingPayment,
        message: "Payment already verified",
      }
    }

    // Verify with Paystack
    const verification = await verifyPayment(reference)
    if (!verification.status || verification.data.status !== "success") {
      throw new Error(verification.message || "Payment verification failed")
    }

    // Update payment status
    const updatedPayment = await updatePaymentStatus(reference, "success")
    if (!updatedPayment || updatedPayment.length === 0) {
      throw new Error("Failed to update payment status")
    }

    revalidatePath(`/payment/verify/${reference}`)

    return {
      success: true,
      payment: updatedPayment[0],
      message: "Payment verified successfully",
    }

  } catch (error) {
    console.error("Payment verification error:", error)

    return {
      success: false,
      error: error instanceof Error 
        ? error.message 
        : "Payment verification failed",
    }
  }
}

export async function submitRegistration(prevState, formData) {
  try {
    // Parse form data
    const rawData = Object.fromEntries(formData.entries())
    const data = {
      ...rawData,
      paymentId: Number(rawData.paymentId),
      previousRegistration: rawData.previousRegistration === "Yes",
    }

    // Validate data
    const validatedData = registrationSchema.parse(data)

    // Verify payment status
    const payment = await getPaymentById(validatedData.paymentId)
    if (!payment) {
      throw new Error("Payment record not found")
    }

    if (payment.payment_status !== "success") {
      throw new Error("Payment is not completed")
    }

    // Check for existing registration
    const existingRegistration = await hasRegistration(validatedData.paymentId)
    if (existingRegistration) {
      throw new Error("This payment already has a registration")
    }

    // Create registration
    const registration = await createRegistration(validatedData.paymentId, {
      fullName: validatedData.fullName,
      email: validatedData.email,
      phoneNumber: validatedData.phoneNumber,
      country: validatedData.country,
      education: validatedData.education,
      previousRegistration: validatedData.previousRegistration,
      learningMode: validatedData.learningMode,
      learningTime: validatedData.learningMode === "Online" 
        ? "Online - 7:00 PM to 10:00 PM EAT" 
        : "Physical - 10:00 AM to 2:30 PM EAT",
      fieldOfInterest: "Analytics, Data Science and AI",
      referralSource: validatedData.referralSource,
    })

    if (!registration || registration.length === 0) {
      throw new Error("Failed to create registration")
    }

    revalidatePath("/")

    return {
      success: true,
      registration: registration[0],
      message: "Registration submitted successfully",
    }

  } catch (error) {
    console.error("Registration error:", error)

    if (error instanceof z.ZodError) {
      return {
        success: false,
        error: "Validation error: " + error.errors.map(e => e.message).join(", "),
        fieldErrors: error.errors.reduce((acc, curr) => {
          acc[curr.path[0]] = curr.message
          return acc
        }, {} ),
      }
    }

    return {
      success: false,
      error: error instanceof Error 
        ? error.message 
        : "Registration failed. Please try again.",
    }
  }
}

export async function resendVerificationEmail(paymentId) {
  try {
    const payment = await getPaymentById(paymentId)
    if (!payment) {
      throw new Error("Payment record not found")
    }

    // In a real implementation, you would send the email here
    // This is just a simulation
    await new Promise(resolve => setTimeout(resolve, 1000))

    return {
      success: true,
      message: "Verification email sent successfully",
    }

  } catch (error) {
    console.error("Email resend error:", error)

    return {
      success: false,
      error: error instanceof Error 
        ? error.message 
        : "Failed to resend verification email",
    }
  }
}