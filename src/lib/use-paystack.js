"use client"

import { useEffect, useState } from "react"


export function usePaystackPayment() {
  const [isPaystackReady, setIsPaystackReady] = useState(false)

  useEffect(() => {
    // Check if Paystack script is already loaded
    if (window.PaystackPop) {
      setIsPaystackReady(true)
      return
    }

    // Load Paystack script if not already loaded
    const script = document.createElement("script")
    script.src = "https://js.paystack.co/v1/inline.js"
    script.async = true
    script.onload = () => setIsPaystackReady(true)
    document.body.appendChild(script)

    return () => {
      // Cleanup if component unmounts before script loads
      if (document.body.contains(script)) {
        document.body.removeChild(script)
      }
    }
  }, [])

  const initializePayment = (config) => {
    if (!isPaystackReady) {
      console.error("Paystack SDK is not loaded yet")
      return
    }

    // Generate a unique reference if not provided
    const reference = config.reference || `ref_${Date.now()}_${Math.floor(Math.random() * 1000000)}`

    try {
      const handler = window.PaystackPop.setup({
        key: process.env.NEXT_PUBLIC_PAYSTACK_PUBLIC_KEY,
        email: config.email,
        amount: config.amount,
        currency: config.currency || "KES", // Default to KES (Kenyan Shillings)
        ref: reference,
        metadata: config.metadata || {},
        callback: (response) => {
          config.onSuccess(response.reference)
        },
        onClose: config.onClose,
      })
      handler.openIframe()
    } catch (error) {
      console.error("Error initializing Paystack payment:", error)
      alert("Failed to initialize payment. Please try again.")
    }
  }

  return { initializePayment, isReady: isPaystackReady }
}
