"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { CreditCard, Info, Loader2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ErrorModal } from "@/components/ErrorModal"
import { initiatePayment } from "@/lib/actions"

export default function PaymentInitiationForm() {
  const router = useRouter()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isErrorModalOpen, setIsErrorModalOpen] = useState(false)
  const [error, setError] = useState("")

  const handleSubmit = async (event) => {
    event.preventDefault()
    setIsSubmitting(true)
    setError("")

    try {
      const formData = new FormData(event.currentTarget)
      const result = await initiatePayment(formData)

      if (result?.error) {
        setError(result.error)
        setIsErrorModalOpen(true)
        return
      }

      if (result?.redirectUrl) {
        router.push(result.redirectUrl)
        return
      }

      setError("Unexpected response from server")
      setIsErrorModalOpen(true)

    } catch (err) {
      setError(err instanceof Error ? err.message : "An unknown error occurred")
      setIsErrorModalOpen(true)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div>
      <ErrorModal
        isOpen={isErrorModalOpen}
        onClose={() => setIsErrorModalOpen(false)}
        error={error}
        onRetry={() => setIsErrorModalOpen(false)}
      />

      {/* Info Box */}
      <div className="mb-6 p-4 bg-blue-50 border border-blue-100 rounded-lg">
        <div className="flex items-start gap-3">
          <Info className="h-5 w-5 text-blue-900 mt-0.5 flex-shrink-0" />
          <div>
            <h3 className="font-medium text-blue-800 mb-1">Registration Process</h3>
            <p className="text-sm text-blue-700">
              To register for the LuxDevHQ program, you'll first need to pay the 500 KES registration fee.
            </p>
          </div>
        </div>
      </div>

      {/* Payment Form */}
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
            Email Address
          </label>
          <Input 
            id="email" 
            name="email" 
            type="email" 
            placeholder="johndoe@example.com" 
            required 
          />
          <p className="text-sm text-gray-500 mt-1">
            We'll send your payment receipt to this email address.
          </p>
        </div>

        <div className="bg-slate-50 p-4 rounded-lg">
          <div className="flex justify-between items-center">
            <span className="font-medium">Registration Fee</span>
            <span>500 KES</span>
          </div>
        </div>

        <Button 
          type="submit" 
          className="w-full bg-blue-900 hover:bg-blue-700" 
          disabled={isSubmitting}
        >
          {isSubmitting ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Processing...
            </>
          ) : (
            <>
              <CreditCard className="mr-2 h-4 w-4" />
              Proceed to Payment
            </>
          )}
        </Button>

        <div className="text-sm text-slate-500 text-center">
          <p>
            This fee is refundable if you fail the entrance test.
          </p>
        </div>
      </form>
    </div>
  )
}