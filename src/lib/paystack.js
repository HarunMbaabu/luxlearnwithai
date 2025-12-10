import crypto from "crypto"

// Paystack API endpoints
const PAYSTACK_BASE_URL = "https://api.paystack.co"
const INITIALIZE_URL = `${PAYSTACK_BASE_URL}/transaction/initialize`
const VERIFY_URL = `${PAYSTACK_BASE_URL}/transaction/verify`

// Get Paystack secret key from environment variables
const PAYSTACK_SECRET_KEY = process.env.PAYSTACK_SECRET_KEY


// Function to initialize a payment
export async function initializePayment(email, amount, metadata) {
  // Validate required parameters
  if (!email) {
    throw new Error("Email is required")
  }
  
  if (!amount || amount <= 0) {
    throw new Error("Valid amount is required")
  }

  if (!PAYSTACK_SECRET_KEY) {
    throw new Error("Paystack secret key is not configured")
  }

  // Generate a unique reference
  const reference = `LUX-${Date.now()}-${Math.floor(Math.random() * 1000000)}`

  // Convert amount to kobo (Paystack uses the smallest currency unit)
  const amountInKobo = Math.floor(amount * 100)

  // console.log("Initializing payment:", { email, amount, amountInKobo, reference })

  try {
    const requestBody = {
      email,
      amount: amountInKobo,
      reference,
      currency: "KES",
      callback_url: `${process.env.NEXT_PUBLIC_APP_URL}/payment/callback`,
      ...(metadata && { metadata })
    }

    // console.log("Paystack request body:", requestBody)

    const response = await fetch(INITIALIZE_URL, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${PAYSTACK_SECRET_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(requestBody),
    })

    // console.log("Paystack response status:", response.status)

    if (!response.ok) {
      const errorData = await response.json()
      // console.error("Paystack error response:", errorData)
      throw new Error(errorData.message || `HTTP ${response.status}: Failed to initialize payment`)
    }

    const responseData = await response.json()
    // console.log("Paystack success response:", responseData)
    
    return responseData
  } catch (error) {
    // console.error("Paystack initialization error:", error)
    throw error
  }
}

// Function to verify a payment
export async function verifyPayment(reference) {
  try {
    const response = await fetch(`${VERIFY_URL}/${reference}`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${PAYSTACK_SECRET_KEY}`,
        "Content-Type": "application/json",
      },
    })

    if (!response.ok) {
      const errorData = await response.json()
      throw new Error(errorData.message || "Failed to verify payment")
    }

    return await response.json()
  } catch (error) {
    console.error("Paystack verification error:", error)
    throw error
  }
}

// Function to validate Paystack webhook
export function validateWebhook(requestBody, signature) {
  try {
    const hash = crypto.createHmac("sha512", PAYSTACK_SECRET_KEY).update(JSON.stringify(requestBody)).digest("hex")

    return hash === signature
  } catch (error) {
    console.error("Webhook validation error:", error)
    return false
  }
}
