"use client"

import { useEffect, useState } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Loader2, CheckCircle, XCircle } from "lucide-react"
import { verifyPaymentStatus } from "@/lib/actions"

export default function PaymentCallbackPage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const reference = searchParams.get("reference")

  const [isVerifying, setIsVerifying] = useState(true)
  const [verificationResult, setVerificationResult] = useState(null)

  useEffect(() => {
    async function verifyPayment() {
      if (!reference) {
        setVerificationResult({
          success: false,
          error: "Payment reference not found",
        })
        setIsVerifying(false)
        return
      }

      try {
        const result = await verifyPaymentStatus(reference)
        setVerificationResult(result)

        // If payment is successful, redirect to registration form
        if (result.success) {
          setTimeout(() => {
            router.push(`/registration/${result.payment.id}`)
          }, 3000)
        }
      } catch (error) {
        setVerificationResult({
          success: false,
          error: "Failed to verify payment",
        })
      } finally {
        setIsVerifying(false)
      }
    }

    verifyPayment()
  }, [reference, router])

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-slate-100 flex items-center justify-center p-4">
      <Card className="w-full max-w-md">
        <CardContent className="pt-6">
          <div className="text-center">
            <h1 className="text-2xl font-bold mb-6">Payment Verification</h1>

            {isVerifying ? (
              <div className="flex flex-col items-center justify-center py-8">
                <Loader2 className="h-12 w-12 text-blue-600 animate-spin mb-4" />
                <p className="text-slate-600">Verifying your payment...</p>
              </div>
            ) : verificationResult?.success ? (
              <div className="py-8">
                <CheckCircle className="h-16 w-16 text-blue-600 mx-auto mb-4" />
                <h2 className="text-xl font-semibold text-blue-700 mb-2">Payment Successful!</h2>
                <p className="text-slate-600 mb-6">
                  Your payment of 500 KES has been successfully processed. You will be redirected to complete your
                  registration.
                </p>
                <Button
                  className="bg-blue-600 hover:bg-blue-700"
                  onClick={() => router.push(`/registration/${verificationResult.payment.id}`)}
                >
                  Continue to Registration
                </Button>
              </div>
            ) : (
              <div className="py-8">
                <XCircle className="h-16 w-16 text-red-600 mx-auto mb-4" />
                <h2 className="text-xl font-semibold text-red-700 mb-2">Payment Verification Failed</h2>
                <p className="text-slate-600 mb-6">
                  {verificationResult?.error || "We couldn't verify your payment. Please try again or contact support."}
                </p>
                <Button variant="outline" onClick={() => router.push("/")}>
                  Return to Homepage
                </Button>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
