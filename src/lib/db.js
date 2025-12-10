import { Pool } from "pg"

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  connectionTimeoutMillis: 5000,
  idleTimeoutMillis: 30000,
})

let isConnectionTested = false

export async function testConnection() {
  if (isConnectionTested) return true
  
  try {
    const client = await pool.connect()
    client.release()
    isConnectionTested = true
    return true
  } catch (error) {
    console.error('PostgreSQL connection error:', error.message)
    throw new Error("Database connection failed. Please try again later.")
  }
}

export async function query(text, params) {
  let client;
  try {
    client = await pool.connect();
    const result = await client.query(text, params);
    return result.rows;
  } catch (error) {
    console.error("Database query error:", error);
    
    // Customer-friendly error messages
    let errorMessage = "We're experiencing technical difficulties";
    if (error.message.includes("timeout")) {
      errorMessage = "Our systems are currently busy. Please try again in a few moments.";
    } else if (error.message.includes("connection")) {
      errorMessage = "We're having trouble connecting to our servers. Please check your internet connection.";
    }
    
    throw new Error(
      `${errorMessage}. If the problem persists, please contact info@luxdevhq.com for assistance.`
    );
  } finally {
    if (client) client.release();
  }
}

// Helper function to get a payment by reference
export async function getPaymentByReference(reference) {
  const results = await query("SELECT * FROM prep_program_intakes.payments WHERE payment_reference = $1", [reference])
  return results[0] || null
}

// Helper function to get a payment by ID
export async function getPaymentById(id) {
  const results = await query("SELECT * FROM prep_program_intakes.payments WHERE id = $1", [id])
  return results[0] || null
}

// Helper function to update payment status
export async function updatePaymentStatus(reference, status) {
  return await query("UPDATE prep_program_intakes.payments SET payment_status = $1 WHERE payment_reference = $2 RETURNING *", [
    status,
    reference,
  ])
}

// Helper function to create a new payment record
export async function createPayment(paymentData) {
  const { reference, amount, email, status, metadata } = paymentData

  return await query(
    `INSERT INTO prep_program_intakes.payments (
      payment_reference, 
      amount, 
      currency, 
      payment_status, 
      email,
      metadata
    ) 
    VALUES ($1, $2, $3, $4, $5, $6)
    RETURNING *`,
    [reference, amount, "KES", status, email, metadata ? JSON.stringify(metadata) : null],
  )
}

// Helper function to create a registration linked to a payment
export async function createRegistration(
  paymentId,
  registrationData
) {
  const {
    fullName,
    email,
    phoneNumber,
    country,
    education,
    previousRegistration,
    learningMode,
    learningTime,
    fieldOfInterest,
    referralSource,
  } = registrationData

  return await query(
    `INSERT INTO prep_program_intakes.registrations (
      payment_id,
      full_name, 
      email, 
      phone_number, 
      country, 
      education, 
      previous_registration, 
      learning_mode, 
      learning_time, 
      field_of_interest, 
      referral_source
    ) 
    VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11)
    RETURNING *`,
    [
      paymentId,
      fullName,
      email,
      phoneNumber,
      country,
      education,
      previousRegistration,
      learningMode,
      learningTime,
      fieldOfInterest,
      referralSource,
    ],
  )
}

// Helper function to check if a payment has a registration
export async function hasRegistration(paymentId) {
  const result = await query("SELECT EXISTS(SELECT 1 FROM prep_program_intakes.registrations WHERE payment_id = $1)", [paymentId])
  return result[0].exists
}

// Helper function to get all registrations
export async function getRegistrations() {
  return await query(`
    SELECT r.*, p.payment_reference, p.amount, p.payment_status 
    FROM registrations r
    JOIN payments p ON r.payment_id = p.id
    ORDER BY r.created_at DESC
  `)
}
