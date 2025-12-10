"use client"


import { useState } from "react"
import { usePaystackPayment } from "@/lib/use-paystack"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent } from "@/components/ui/card"
import { detectUserCountry } from "@/lib/use-country-detection"
import { PaymentNoticeDialog } from "@/components/payment-notice-dialog"

export default function SponsorForm() {
  const [formData, setFormData] = useState({
    sponsorName: "",
    sponsorPhone: "",
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
      if (!formData.sponsorName || !formData.sponsorPhone || !formData.amount) {
        alert("Please fill all fields")
        setLoading(false)
        return
      }

      if (!isReady) {
        alert("Payment system is initializing. Please try again in a moment.")
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
      alert("Payment failed. Please try again.")
      setLoading(false)
    }
  }

  const proceedToPayment = (country) => {
    setLoading(true)

    // Generate a temporary email for the sponsor if not collected
    const sponsorEmail = `sponsor-${Date.now()}@example.com`

    try {
      // Initialize Paystack payment
      initializePayment({
        email: sponsorEmail,
        amount: Number.parseFloat(formData.amount) * 100, // Convert to kobo/cents
        currency: "KES", // Explicitly set currency to KES (Kenyan Shillings)
        metadata: {
          sponsorName: formData.sponsorName,
          sponsorPhone: formData.sponsorPhone,
          paymentType: "Sponsor a Student",
          country: country,
        },
        onSuccess: (reference) => {
          alert(`Payment successful! Reference: ${reference}`)
          setFormData({
            sponsorName: "",
            sponsorPhone: "",
            amount: "",
          })
        },
        onClose: () => {
          console.log("Payment window closed")
          setLoading(false)
        },
      })
    } catch (error) {
      console.error("Payment error:", error)
      alert("Payment failed. Please try again.")
      setLoading(false)
    }
  }

  return (
      <Card className="shadow-none border-none bg-transparent">
            <CardContent className="px-0">
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="sponsorName">Sponsor Name</Label>
            <Input
              id="sponsorName"
              name="sponsorName"
              placeholder="Enter sponsor name"
              value={formData.sponsorName}
              onChange={handleChange}
              required
              className="bg-white border-none"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="sponsorPhone">Sponsor Phone Number</Label>
            <Input
              id="sponsorPhone"
              name="sponsorPhone"
              placeholder="Enter sponsor phone number"
              value={formData.sponsorPhone}
              onChange={handleChange}
              required
              className="bg-white border-none"
            />
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
    </Card>
  )
}
