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
interface ContactFormData {
  name: string
  email: string
  phone?: string
  subject: string
  message: string
  workspaceInterest?: string
}

// Enhanced email validation (matches client-side)
const validateEmailFormat = (email: string): boolean => {
  if (!email || !email.trim()) return false
  
  const trimmedEmail = email.trim().toLowerCase()
  
  // Basic email format check
  const emailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/
  
  if (!emailRegex.test(trimmedEmail)) {
    return false
  }
  
  // Check for common invalid patterns
  if (trimmedEmail.startsWith('.') || 
      trimmedEmail.startsWith('@') || 
      trimmedEmail.endsWith('.') || 
      trimmedEmail.endsWith('@') ||
      trimmedEmail.includes('..') ||
      trimmedEmail.includes('@.') ||
      trimmedEmail.includes('.@')) {
    return false
  }
  
  // Check length limits (RFC 5321)
  if (trimmedEmail.length > 254) {
    return false
  }
  
  // Check domain has at least one dot
  const parts = trimmedEmail.split('@')
  if (parts.length !== 2 || !parts[1].includes('.')) {
    return false
  }
  
  // Check domain extension is valid (at least 2 characters)
  const domainParts = parts[1].split('.')
  if (domainParts.length < 2 || domainParts[domainParts.length - 1].length < 2) {
    return false
  }
  
  return true
}

// Enhanced phone validation (matches client-side)
const validatePhoneFormat = (phone: string): boolean => {
  if (!phone || !phone.trim()) return true // Phone is optional
  
  // Remove all whitespace, dashes, dots, parentheses, and plus signs for validation
  const cleanedPhone = phone.replace(/[\s\-().+]/g, '')
  
  // Check if it contains only digits
  if (!/^\d+$/.test(cleanedPhone)) {
    return false
  }
  
  // Check minimum length (at least 7 digits for international numbers)
  if (cleanedPhone.length < 7) {
    return false
  }
  
  // Check maximum length (15 digits is the ITU-T E.164 standard)
  if (cleanedPhone.length > 15) {
    return false
  }
  
  // Indian phone number validation (10 digits, optionally with country code 91)
  if (cleanedPhone.startsWith('91')) {
    // Indian number with country code: should be 12 digits (91 + 10 digits)
    if (cleanedPhone.length === 12) {
      // Check if the number after 91 is a valid Indian mobile number (starts with 6-9)
      const mobilePart = cleanedPhone.substring(2)
      if (/^[6-9]\d{9}$/.test(mobilePart)) {
        return true
      }
    }
  } else if (cleanedPhone.length === 10) {
    // Indian mobile number without country code (should start with 6-9)
    if (/^[6-9]\d{9}$/.test(cleanedPhone)) {
      return true
    }
  }
  
  // For international numbers (other countries), validate general format
  // Must be between 7-15 digits and not start with 0
  if (cleanedPhone.length >= 7 && cleanedPhone.length <= 15 && !cleanedPhone.startsWith('0')) {
    return true
  }
  
  return false
}

const validateFormData = (data: any): data is ContactFormData => {
  if (typeof data !== 'object' || data === null) {
    return false
  }
  
  // Name validation
  if (typeof data.name !== 'string' || 
      data.name.trim().length < 2 || 
      data.name.trim().length > 100) {
    return false
  }
  
  // Email validation
  if (typeof data.email !== 'string' || !validateEmailFormat(data.email)) {
    return false
  }
  
  // Phone validation (optional but must be valid if provided)
  if (data.phone && typeof data.phone === 'string' && data.phone.trim()) {
    if (!validatePhoneFormat(data.phone)) {
      return false
    }
  }
  
  // Subject validation
  if (typeof data.subject !== 'string' || 
      data.subject.trim().length < 3 || 
      data.subject.trim().length > 200) {
    return false
  }
  
  // Message validation
  if (typeof data.message !== 'string' || 
      data.message.trim().length < 10 || 
      data.message.trim().length > 2000) {
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
      // Provide more specific error messages
      let errorMessage = 'Invalid form data. '
      const errors: string[] = []
      
      if (!body.name || typeof body.name !== 'string' || body.name.trim().length < 2) {
        errors.push('Name must be at least 2 characters long')
      }
      if (!body.email || typeof body.email !== 'string' || !validateEmailFormat(body.email)) {
        errors.push('Please provide a valid email address')
      }
      if (body.phone && typeof body.phone === 'string' && body.phone.trim() && !validatePhoneFormat(body.phone)) {
        errors.push('Please provide a valid phone number')
      }
      if (!body.subject || typeof body.subject !== 'string' || body.subject.trim().length < 3) {
        errors.push('Subject must be at least 3 characters long')
      }
      if (!body.message || typeof body.message !== 'string' || body.message.trim().length < 10) {
        errors.push('Message must be at least 10 characters long')
      }
      
      errorMessage += errors.length > 0 ? errors.join('. ') : 'Please check all fields and try again.'
      
      return NextResponse.json(
        { error: errorMessage },
        { status: 400 }
      )
    }

    // Get email configuration
    const { email: senderEmail } = getEmailConfig()
    const recipientEmail = 'manjushapaul39@gmail.com'

    // Create email content
    const emailSubject = `Contact Form: ${body.subject}`
    const emailHtml = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; background-color: #f9f9f9;">
        <h2 style="color: #333; border-bottom: 2px solid #333; padding-bottom: 10px;">
          New Contact Form Submission
        </h2>
        
        <div style="background-color: white; padding: 20px; border-radius: 8px; margin-top: 20px;">
          <p style="margin: 10px 0;"><strong>Name:</strong> ${body.name}</p>
          <p style="margin: 10px 0;"><strong>Email:</strong> <a href="mailto:${body.email}">${body.email}</a></p>
          ${body.phone ? `<p style="margin: 10px 0;"><strong>Phone:</strong> <a href="tel:${body.phone}">${body.phone}</a></p>` : ''}
          <p style="margin: 10px 0;"><strong>Subject:</strong> ${body.subject}</p>
          ${body.workspaceInterest ? `<p style="margin: 10px 0;"><strong>Workspace Interest:</strong> ${body.workspaceInterest}</p>` : ''}
          
          <div style="margin-top: 20px; padding-top: 20px; border-top: 1px solid #eee;">
            <p style="margin: 10px 0;"><strong>Message:</strong></p>
            <p style="margin: 10px 0; white-space: pre-wrap; color: #555;">${body.message}</p>
          </div>
        </div>
        
        <div style="margin-top: 20px; padding-top: 20px; border-top: 1px solid #eee; font-size: 12px; color: #999;">
          <p>This email was sent from the NexSpace contact form.</p>
          <p>You can reply directly to this email to respond to ${body.name}.</p>
        </div>
      </div>
    `

    const emailText = `
New Contact Form Submission

Name: ${body.name}
Email: ${body.email}
${body.phone ? `Phone: ${body.phone}` : ''}
Subject: ${body.subject}
${body.workspaceInterest ? `Workspace Interest: ${body.workspaceInterest}` : ''}

Message:
${body.message}

---
This email was sent from the NexSpace contact form.
You can reply directly to this email to respond to ${body.name}.
    `.trim()

    // Create transporter and send email
    const transporter = createTransporter()

    const mailOptions = {
      from: `"NexSpace Contact Form" <${senderEmail}>`,
      to: recipientEmail,
      replyTo: body.email, // Allow direct reply to the sender
      subject: emailSubject,
      text: emailText,
      html: emailHtml,
    }

    await transporter.sendMail(mailOptions)

    return NextResponse.json(
      { message: 'Email sent successfully!' },
      { status: 200 }
    )
  } catch (error) {
    console.error('Error sending email:', error)

    // Handle specific error cases
    if (error instanceof Error) {
      if (error.message.includes('credentials') || error.message.includes('not configured')) {
        return NextResponse.json(
          { 
            error: 'Email service is not configured. Please set up GMAIL_EMAIL and GMAIL_APP_PASSWORD in your .env.local file.',
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
      { error: 'Failed to send email. Please try again later.' },
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

