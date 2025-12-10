import { NextResponse } from "next/server"

export async function POST(request) {
  try {
    const { reference } = await request.json()

    if (!reference) {
      return NextResponse.json({ success: false, message: "Payment reference is required" }, { status: 400 })
    }

    // Verify payment with Paystack
    const verifyUrl = `https://api.paystack.co/transaction/verify/${reference}`
    const response = await fetch(verifyUrl, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${process.env.PAYSTACK_SECRET_KEY}`,
        "Content-Type": "application/json",
      },
    })

    const data = await response.json()

    if (data.status) {
      // Payment verified successfully
      return NextResponse.json({
        success: true,
        data: data.data,
        message: "Payment verified successfully",
      })
    } else {
      // Payment verification failed
      return NextResponse.json(
        {
          success: false,
          message: "Payment verification failed",
        },
        { status: 400 },
      )
    }
  } catch (error) {
    console.error("Error verifying payment:", error)
    return NextResponse.json({ success: false, message: "An error occurred while verifying payment" }, { status: 500 })
  }
}
