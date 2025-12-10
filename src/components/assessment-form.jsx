"use client"

import { useState } from "react"
import { usePaystackPayment } from "@/lib/use-paystack"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent } from "@/components/ui/card"
import { detectUserCountry } from "@/lib/use-country-detection"
import { PaymentNoticeDialog } from "@/components/payment-notice-dialog"
import { sendAssessmentEmail, getAssessmentLink } from "@/lib/use-email-service"
import { toast } from "sonner"
import { Toaster } from "./ui/sonner"

export default function AssessmentForm() {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    courseOfStudy: "",
    amount: "",
  })
  const [loading, setLoading] = useState(false)
  const [showPaymentNotice, setShowPaymentNotice] = useState(false)
  const [countryName, setCountryName] = useState("")

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const { initializePayment, isReady } = usePaystackPayment()

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)

    try {
      // Validate form
      if (!formData.fullName || !formData.email || !formData.courseOfStudy || !formData.amount) {
        toast.warning("Please fill all fields")
        setLoading(false)
        return
      }

      if (!isReady) {
        toast.info("Payment System Initializing")
        setLoading(false)
        return
      }

      // Detect user's country
      const countryData = await detectUserCountry()

      // Show dialog for users outside Kenya
      if (countryData.country_code !== "KE") {
        setCountryName(countryData.country_name)
        setShowPaymentNotice(true)
        setLoading(false)
        return
      }

      // If user is from Kenya, proceed directly
      proceedToPayment(countryData.country_name)
    } catch (error) {
      console.error("Payment error:", error)
      toast.error("Please try again later")
      setLoading(false)
    }
  }

  const proceedToPayment = (country) => {
    setLoading(true)

    try {
      // Initialize Paystack payment
      initializePayment({
        email: formData.email,
        amount: Number.parseFloat(formData.amount) * 100, // Convert to kobo/cents
        currency: "KES", // Explicitly set currency to KES (Kenyan Shillings)
        metadata: {
          fullName: formData.fullName,
          courseOfStudy: formData.courseOfStudy,
          paymentType: "Assessment",
          country: country,
        },
        onSuccess: async (reference) => {
          // Get the assessment link based on the course
          const assessmentLink = getAssessmentLink(formData.courseOfStudy)

          // Send assessment email
          const emailSent = await sendAssessmentEmail({
            recipientEmail: formData.email,
            recipientName: formData.fullName,
            courseOfStudy: formData.courseOfStudy,
            assessmentLink: assessmentLink,
            paymentReference: reference,
          })

          if (emailSent) {
            toast.success("Assessment link has been sent to your email")
          } else {
            toast.success(
                "Your payment was successful, but we couldn't send the assessment link. Please contact support."
            )
          }

          setFormData({
            fullName: "",
            email: "",
            courseOfStudy: "",
            amount: "",
          })

          setLoading(false)
        },
        onClose: () => {
          console.log("Payment window closed")
          setLoading(false)
        },
      })
    } catch (error) {
      console.error("Payment error:", error)
      toast.error("Please try again later")
      setLoading(false)
    }
  }

  return (
    <Card className="shadow-none border-none bg-transparent">
      <CardContent className="px-0">
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="fullName">Full Name</Label>
            <Input
              id="fullName"
              name="fullName"
              placeholder="Enter your full name"
              value={formData.fullName}
              onChange={handleChange}
              required
              className="bg-white border-none"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="email">Email Address</Label>
            <Input
              id="email"
              name="email"
              type="email"
              placeholder="Enter your email address"
              value={formData.email}
              onChange={handleChange}
              required
              className="bg-white border-none"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="courseOfStudy">Course of Study</Label>
            <select
              id="courseOfStudy"
              name="courseOfStudy"
              className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
              value={formData.courseOfStudy}
              onChange={handleChange}
              required
            >
              <option value="">Select Course</option>
              <option value="Data Science">Data Science</option>
              <option value="Data Engineering">Data Engineering</option>
              <option value="Data Analytics">Data Analytics</option>
            </select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="amount">Amount (KES)</Label>
            <Input
              id="amount"
              name="amount"
              type="number"
              placeholder="Enter amount in Kenyan Shillings"
              value={formData.amount}
              onChange={handleChange}
              required
              className="bg-white border-none"
            />
          </div>

          <Button type="submit" className="w-full mt-6 bg-blue-900" disabled={loading}>
            {loading ? "Processing..." : "Pay Now"}
          </Button>
        </form>
      </CardContent>
      <PaymentNoticeDialog
        isOpen={showPaymentNotice}
        onClose={() => {
          setShowPaymentNotice(false)
          setLoading(false)
        }}
        onProceed={() => {
          setShowPaymentNotice(false)
          proceedToPayment(countryName)
        }}
        countryName={countryName}
      />
      <Toaster />
    </Card>
  )
}
