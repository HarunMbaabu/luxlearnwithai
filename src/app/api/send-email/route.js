import { NextResponse } from "next/server"
import emailjs from "@emailjs/browser"

export async function POST(request) {
  try {
    const body = await request.json()
    const { recipientEmail, recipientName, courseOfStudy, paymentReference } = body

    // Validate required fields
    if (!recipientEmail || !recipientName || !courseOfStudy || !paymentReference) {
      return NextResponse.json({ success: false, error: "Missing required fields" }, { status: 400 })
    }

    // Get environment variables
    const publicKey = process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY
    const serviceId = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID
    const templateId = process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID

    // Validate required environment variables
    if (!publicKey || !serviceId || !templateId) {
      console.error("Missing required EmailJS configuration")
      return NextResponse.json({ success: false, error: "Email service not configured" }, { status: 500 })
    }

    // Initialize EmailJS
    emailjs.init(publicKey)

    // Prepare template parameters
    const templateParams = {
      to_email: recipientEmail,
      to_name: recipientName,
      course: courseOfStudy,
      assessment_link:
        "https://cal.com/luxedevhq.com/2nd-luxdevhq-prep-course-personalized-profile-assessment-interview",
      payment_reference: paymentReference,
      sent_date: new Date().toLocaleDateString(),
    }

    console.log("Sending assessment email to:", recipientEmail)

    // Send the email using EmailJS
    const response = await emailjs.send(serviceId, templateId, templateParams)

    console.log("Assessment email sent successfully:", {
      status: response.status,
      text: response.text,
      recipient: recipientEmail,
    })

    return NextResponse.json({
      success: true,
      message: "Email sent successfully",
      details: {
        status: response.status,
        recipient: recipientEmail,
      },
    })
  } catch (error) {
    console.error("Failed to send assessment email:", error)
    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : "Unknown error occurred",
      },
      { status: 500 },
    )
  }
}
