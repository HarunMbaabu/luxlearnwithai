"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Loader2, CreditCard, Check } from "lucide-react"
import { processPayment } from "@/lib/actions"


export default function PaymentForm({ registrationId, onPaymentSuccess }) {
  const [isProcessing, setIsProcessing] = useState(false)
  const [paymentError, setPaymentError] = useState(null)

  const handlePayment = async () => {
    try {
      setIsProcessing(true)
      setPaymentError(null)

      // Integration with Paystack
      const result = await processPayment({
        registrationId,
        amount: 500,
        currency: "KES",
        paymentMethod: "card",
        paymentReference: `REG-${registrationId}-${Date.now()}`,
      })

      if (result.success) {
        onPaymentSuccess()
      } else {
        setPaymentError(result.error || "Payment failed. Please try again.")
      }
    } catch (error) {
      console.error("Payment processing error:", error)
      setPaymentError("An unexpected error occurred. Please try again.")
    } finally {
      setIsProcessing(false)
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Registration Fee Payment</CardTitle>
        <CardDescription>Please pay the registration fee of 500 KES to complete your application.</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          <div className="bg-slate-50 p-4 rounded-lg">
            <div className="flex justify-between items-center">
              <span className="font-medium">Registration Fee</span>
              <span>500 KES</span>
            </div>
          </div>

          <div className="border rounded-lg p-4">
            <h3 className="font-medium mb-2 flex items-center">
              <CreditCard className="h-4 w-4 mr-2" /> Payment Information
            </h3>
            <p className="text-sm text-slate-600 mb-4">
              In a real application, this would integrate with Paystack for secure payment processing. For this demo,
              we'll simulate the payment process.
            </p>

            {paymentError && <div className="bg-red-50 text-red-700 p-3 rounded-md text-sm mb-4">{paymentError}</div>}

            <Button
              onClick={handlePayment}
              className="w-full bg-emerald-600 hover:bg-emerald-700"
              disabled={isProcessing}
            >
              {isProcessing ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Processing...
                </>
              ) : (
                "Pay 500 KES"
              )}
            </Button>
          </div>

          <div className="text-sm text-slate-500">
            <p>
              This fee is refundable if you fail the entrance test. Otherwise, it will be applied toward your first
              month's tuition.
            </p>
          </div>
        </div>
      </CardContent>
      <CardFooter className="border-t pt-6 flex justify-between">
        <div className="flex items-center text-sm text-emerald-600">
          <Check className="h-4 w-4 mr-1" />
          Secure payment processing
        </div>
      </CardFooter>
    </Card>
  )
}
