"use client"


export async function detectUserCountry() {
  try {
    const response = await fetch("https://ipapi.co/json/")
    if (!response.ok) {
      throw new Error("Failed to detect country")
    }
    return await response.json()
  } catch (error) {
    console.error("Error detecting country:", error)
    // Return a default value if detection fails
    return {
      ip: "",
      country_name: "Unknown",
      country_code: "",
      currency: "",
      currency_name: "",
    }
  }
}
