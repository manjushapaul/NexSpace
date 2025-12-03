import { NextRequest, NextResponse } from 'next/server'
import nodemailer from 'nodemailer'

// Validate environment variables
const getEmailConfig = () => {
  const email = process.env.GMAIL_EMAIL
  const password = process.env.GMAIL_APP_PASSWORD

  if (!email || !password) {
    throw new Error('Gmail credentials are not configured. Please set GMAIL_EMAIL and GMAIL_APP_PASSWORD environment variables.')
  }

  return { email, password }
}

// Create reusable transporter
const createTransporter = () => {
  const { email, password } = getEmailConfig()

  return nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: email,
      pass: password,
    },
  })
}

// Validate request body
interface HeroFormData {
  name: string
  email: string
  mobile: string
}

// Enhanced email validation
const validateEmailFormat = (email: string): boolean => {
  if (!email || !email.trim()) return false
  
  const trimmedEmail = email.trim().toLowerCase()
  const emailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/
  
  if (!emailRegex.test(trimmedEmail)) return false
  if (trimmedEmail.startsWith('.') || trimmedEmail.startsWith('@') || 
      trimmedEmail.endsWith('.') || trimmedEmail.endsWith('@') ||
      trimmedEmail.includes('..') || trimmedEmail.includes('@.') ||
      trimmedEmail.includes('.@')) return false
  if (trimmedEmail.length > 254) return false
  
  const parts = trimmedEmail.split('@')
  if (parts.length !== 2 || !parts[1].includes('.')) return false
  
  const domainParts = parts[1].split('.')
  if (domainParts.length < 2 || domainParts[domainParts.length - 1].length < 2) return false
  
  return true
}

// Enhanced phone validation
const validatePhoneFormat = (phone: string): boolean => {
  if (!phone || !phone.trim()) return false
  
  const cleanedPhone = phone.replace(/[\s\-().+]/g, '')
  if (!/^\d+$/.test(cleanedPhone)) return false
  if (cleanedPhone.length < 7 || cleanedPhone.length > 15) return false
  
  // Indian phone number validation
  if (cleanedPhone.startsWith('91')) {
    if (cleanedPhone.length === 12) {
      const mobilePart = cleanedPhone.substring(2)
      if (/^[6-9]\d{9}$/.test(mobilePart)) return true
    }
  } else if (cleanedPhone.length === 10) {
    if (/^[6-9]\d{9}$/.test(cleanedPhone)) return true
  }
  
  // International numbers
  if (cleanedPhone.length >= 7 && cleanedPhone.length <= 15 && !cleanedPhone.startsWith('0')) {
    return true
  }
  
  return false
}

const validateFormData = (data: any): data is HeroFormData => {
  if (typeof data !== 'object' || data === null) return false
  
  // Name validation
  if (typeof data.name !== 'string' || data.name.trim().length < 2 || data.name.trim().length > 100) {
    return false
  }
  
  // Email validation
  if (typeof data.email !== 'string' || !validateEmailFormat(data.email)) {
    return false
  }
  
  // Mobile validation
  if (typeof data.mobile !== 'string' || !validatePhoneFormat(data.mobile)) {
    return false
  }
  
  return true
}

export async function POST(request: NextRequest) {
  try {
    // Parse request body
    const body = await request.json()

    // Validate form data
    if (!validateFormData(body)) {
      let errorMessage = 'Invalid form data. '
      const errors: string[] = []
      
      if (!body.name || typeof body.name !== 'string' || body.name.trim().length < 2) {
        errors.push('Name must be at least 2 characters long')
      }
      if (!body.email || typeof body.email !== 'string' || !validateEmailFormat(body.email)) {
        errors.push('Please provide a valid email address')
      }
      if (!body.mobile || typeof body.mobile !== 'string' || !validatePhoneFormat(body.mobile)) {
        errors.push('Please provide a valid mobile number')
      }
      
      errorMessage += errors.length > 0 ? errors.join('. ') : 'Please check all fields and try again.'
      
      return NextResponse.json(
        { error: errorMessage },
        { status: 400 }
      )
    }

    // Get email configuration
    const { email: senderEmail } = getEmailConfig()
    const recipientEmail = 'nexspotcoworking@gmail.com'

    // Create email content
    const emailSubject = `New Lead from Home Page: ${body.name}`
    const emailHtml = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; background-color: #f9f9f9;">
        <h2 style="color: #333; border-bottom: 2px solid #333; padding-bottom: 10px;">
          New Lead from Home Page
        </h2>
        
        <div style="background-color: white; padding: 20px; border-radius: 8px; margin-top: 20px;">
          <p style="margin: 10px 0;"><strong>Name:</strong> ${body.name}</p>
          <p style="margin: 10px 0;"><strong>Email:</strong> <a href="mailto:${body.email}">${body.email}</a></p>
          <p style="margin: 10px 0;"><strong>Mobile:</strong> <a href="tel:${body.mobile}">${body.mobile}</a></p>
        </div>
        
        <div style="margin-top: 20px; padding-top: 20px; border-top: 1px solid #eee; font-size: 12px; color: #999;">
          <p>This email was sent from the NexSpot home page hero form.</p>
          <p>You can reply directly to this email to respond to ${body.name}.</p>
        </div>
      </div>
    `

    const emailText = `
New Lead from Home Page

Name: ${body.name}
Email: ${body.email}
Mobile: ${body.mobile}

---
This email was sent from the NexSpot home page hero form.
You can reply directly to this email to respond to ${body.name}.
    `.trim()

    // Create transporter and send email
    const transporter = createTransporter()

    const mailOptions = {
      from: `"NexSpot Home Page" <${senderEmail}>`,
      to: recipientEmail,
      replyTo: body.email,
      subject: emailSubject,
      text: emailText,
      html: emailHtml,
    }

    await transporter.sendMail(mailOptions)

    return NextResponse.json(
      { message: 'Thank you! We will contact you soon.' },
      { status: 200 }
    )
  } catch (error) {
    console.error('Error sending email:', error)

    if (error instanceof Error) {
      if (error.message.includes('credentials') || error.message.includes('not configured')) {
        return NextResponse.json(
          { 
            error: 'Email service is not configured. Please set up GMAIL_EMAIL and GMAIL_APP_PASSWORD environment variables. For local development, add them to .env.local. For Vercel deployment, add them in Project Settings > Environment Variables.',
            code: 'EMAIL_NOT_CONFIGURED'
          },
          { status: 500 }
        )
      }

      if (error.message.includes('Invalid login') || error.message.includes('authentication')) {
        return NextResponse.json(
          { 
            error: 'Email authentication failed. Please verify your Gmail app password is correct.',
            code: 'AUTH_FAILED'
          },
          { status: 500 }
        )
      }
    }

    return NextResponse.json(
      { error: 'Failed to send message. Please try again later.' },
      { status: 500 }
    )
  }
}

// Handle unsupported methods
export async function GET() {
  return NextResponse.json(
    { error: 'Method not allowed. Please use POST.' },
    { status: 405 }
  )
}

