import { getPaymentById } from "@/lib/db"
import { notFound } from "next/navigation"
import RegistrationForm from "@/components/registration-form"

export const metadata = {
  title: "Complete Your Registration - LuxDevHQ",
  description: "Complete your registration for LuxDevHQ's AI & Data Science Training Program",
}

export default async function RegistrationPage({ params }) {
  // Await params before accessing its properties
  const resolvedParams = await params
  const paymentId = Number.parseInt(resolvedParams.paymentId, 10)

  if (isNaN(paymentId)) {
    notFound()
  }

  // Fetch payment details
  const payment = await getPaymentById(paymentId)

  if (!payment || payment.payment_status !== "success") {
    notFound()
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-slate-100">
      <div className="container mx-auto px-4 md:px-6 py-12">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-3xl font-bold mb-2 text-slate-900 text-center">Complete Your Registration</h1>
          <p className="text-slate-600 text-center mb-8">
            Your payment has been confirmed. Please complete your registration details below.
          </p>

          <div className="bg-white rounded-xl shadow-md p-6 md:p-8">
            <RegistrationForm paymentId={paymentId} email={payment.email} />
          </div>
        </div>
      </div>
    </div>
  )
}