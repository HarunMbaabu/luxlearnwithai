"use client"

import emailjs from "@emailjs/browser"

export async function sendAssessmentEmail(params) {
  try {
    // Get environment variables
    const publicKey = process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY
    const serviceId = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID
    const templateId = process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID

    // Validate required environment variables
    if (!publicKey || !serviceId || !templateId) {
      console.error("Missing required EmailJS configuration")
      console.error("Required env vars:", { publicKey: !!publicKey, serviceId: !!serviceId, templateId: !!templateId })
      return false
    }

    // Initialize EmailJS with your public key
    emailjs.init(publicKey)

    // Always use the Cal.com assessment link
    const assessmentLink =
      "https://cal.com/luxedevhq.com/2nd-luxdevhq-prep-course-personalized-profile-assessment-interview"

    // Prepare template parameters
    const templateParams = {
      to_email: params.recipientEmail,
      to_name: params.recipientName,
      course: params.courseOfStudy,
      assessment_link: assessmentLink,
      payment_reference: params.paymentReference,
      sent_date: new Date().toLocaleDateString(),
    }

    console.log("Sending email with params:", templateParams)

    // Send the email using EmailJS
    const response = await emailjs.send(serviceId, templateId, templateParams)

    console.log("Assessment email sent successfully:", response)
    return true
  } catch (error) {
    console.error("Failed to send assessment email:", error)
    return false
  }
}

/**
 * Gets the assessment link URL - now returns the fixed Cal.com link
 * @param course The course name (kept for backward compatibility)
 * @returns The assessment link URL
 */
export function getAssessmentLink(course) {
  // Return the same assessment link for all courses
  return "https://cal.com/luxedevhq.com/2nd-luxdevhq-prep-course-personalized-profile-assessment-interview"
}