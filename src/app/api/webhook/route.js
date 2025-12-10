import { NextResponse } from "next/server"
import { headers } from "next/headers"
import crypto from "crypto"

export async function POST(request) {
  try {
    const body = await request.text()
    const headersList = await headers()
    const signature = headersList.get("x-paystack-signature")

    // Verify webhook signature
    const hash = crypto
      .createHmac("sha512", process.env.PAYSTACK_SECRET_KEY || "")
      .update(body)
      .digest("hex")

    if (hash !== signature) {
      return NextResponse.json({ message: "Invalid signature" }, { status: 401 })
    }

    // Parse the event data
    const event = JSON.parse(body)

    // Handle different event types
    switch (event.event) {
      case "charge.success":
        // Handle successful payment
        // You can save to database, send email, etc.
        console.log("Payment successful:", event.data)
        break

      case "transfer.success":
        // Handle successful transfer
        console.log("Transfer successful:", event.data)
        break

      // Add other event types as needed
      default:
        console.log("Unhandled event type:", event.event)
    }

    return NextResponse.json({ received: true })
  } catch (error) {
    console.error("Webhook error:", error)
    return NextResponse.json({ message: "Error processing webhook" }, { status: 500 })
  }
}

export const config = {
  api: {
    bodyParser: false,
  },
}
