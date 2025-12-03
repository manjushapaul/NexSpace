'use client'

import Header from '@/components/Header'
import Footer from '@/components/Footer'
import Image from 'next/image'
import { useState, FormEvent } from 'react'
import { useScrollAnimation } from '@/hooks/useScrollAnimation'

interface ContactInfoCard {
  id: string
  icon: JSX.Element
  heading: string
  content: string[]
  link?: {
    text: string
    href: string
  }
}

interface FAQItem {
  id: string
  number: string
  question: string
  answer: string
}

const contactInfoCards: ContactInfoCard[] = [
  {
    id: '1',
    icon: (
      <svg className="w-12 h-12 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
      </svg>
    ),
    heading: 'Visit Us',
    content: [
      'NexSpot Coworking',
      'Near Thiruvathira Temple',
      'Kottayam, Kerala 686001',
    ],
    link: {
      text: 'Get Directions',
      href: 'https://maps.google.com/?q=Thiruvathira+Temple+Kottayam',
    },
  },
  {
    id: '2',
    icon: (
      <svg className="w-12 h-12 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
      </svg>
    ),
    heading: 'Call Us',
    content: ['Coming soon', 'Mon-Sat: 9:00 AM - 7:00 PM', 'Sunday: Closed'],
    link: {
      text: 'Call Now',
      href: '#',
    },
  },
  {
    id: '3',
    icon: (
      <svg className="w-12 h-12 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
      </svg>
    ),
    heading: 'Email Us',
    content: ['nexspotcoworking@gmail.com'],
    link: {
      text: 'Send Email',
      href: 'mailto:nexspotcoworking@gmail.com',
    },
  },
  {
    id: '4',
    icon: (
      <svg className="w-12 h-12 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M8.684 13.342c-.400 0-.784.03-1.152.085 2.744.824 4.739 3.33 5.488 6.231h-3.336c.577-1.566.717-3.33-.001-4.316zm-2.458-2.025c-.499-1.423-1.272-2.852-1.446-3.991-1.432 1.719-2.304 3.776-2.304 6.011 0 3.314 2.69 6 6 6 .276 0 .543-.027.807-.075-.613-.936-1.001-2.05-1.001-3.26 0-1.37.558-2.617 1.47-3.485zM5.281 8.783c1.023-.663 2.2-1.033 3.403-1.033.276 0 .543.027.807.075-.613.936-1.001 2.05-1.001 3.26 0 1.37.558 2.617 1.47 3.485-1.023.663-2.2 1.033-3.403 1.033-.276 0-.543-.027-.807-.075.613-.936 1.001-2.05 1.001-3.26 0-1.37-.558-2.617-1.47-3.485zm15.438 0c-1.023-.663-2.2-1.033-3.403-1.033-.276 0-.543.027-.807.075.613.936 1.001 2.05 1.001 3.26 0 1.37-.558 2.617-1.47 3.485 1.023.663 2.2 1.033 3.403 1.033.276 0 .543-.027.807-.075-.613-.936-1.001-2.05-1.001-3.26 0-1.37.558-2.617 1.47-3.485zM12 6.5c-3.314 0-6 2.686-6 6s2.686 6 6 6 6-2.686 6-6-2.686-6-6-6z" />
      </svg>
    ),
    heading: 'Follow Us',
    content: ['Connect with us on social media'],
    link: {
      text: 'View Profiles',
      href: '#social',
    },
  },
]

const faqData: FAQItem[] = [
  {
    id: '1',
    number: '01',
    question: "What are your office hours?",
    answer: 'Our office is open Monday through Saturday from 9:00 AM to 7:00 PM. We are closed on Sundays and public holidays. For members with 24/7 access plans, you can access the workspace at any time using your access card.',
  },
  {
    id: '2',
    number: '02',
    question: 'How do I schedule a tour?',
    answer: 'You can schedule a tour by filling out our contact form, calling us at +91 98765 43210, or emailing us at nexspotcoworking@gmail.com. We typically schedule tours during business hours and can accommodate same-day requests when possible.',
  },
  {
    id: '3',
    number: '03',
    question: 'Do you offer day passes?',
    answer: 'Yes, we offer day passes starting at ₹200 per day for hot desk access. Day passes include WiFi, access to common areas, and complimentary refreshments. Perfect for occasional users or those trying out our space.',
  },
  {
    id: '4',
    number: '04',
    question: 'Is parking available?',
    answer: 'Yes, we provide parking facilities for all members and visitors. Parking is included with dedicated desk and private cabin memberships. Day pass users can access parking on a first-come, first-served basis.',
  },
  {
    id: '5',
    number: '05',
    question: "What's included in membership?",
    answer: 'All memberships include high-speed WiFi, access to common areas, printing services, complimentary coffee and tea, and participation in community events. Dedicated desk and private cabin members also get 24/7 access and personal storage.',
  },
]

export default function Contact() {
  const heroRef = useScrollAnimation()
  const contactInfoRef = useScrollAnimation()
  const formMapRef = useScrollAnimation()
  const faqRef = useScrollAnimation()
  const ctaRef = useScrollAnimation()
  const [openFaq, setOpenFaq] = useState<string | null>('1')

  // Form state
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
    workspaceInterest: 'Not specified',
  })

  const [errors, setErrors] = useState<Record<string, string>>({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitSuccess, setSubmitSuccess] = useState(false)

  const toggleFaq = (id: string) => {
    setOpenFaq((prev) => (prev === id ? null : id))
  }

  const validateEmail = (email: string) => {
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

  const validatePhone = (phone: string) => {
    if (!phone || !phone.trim()) return false // Phone is required
    
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
    // If it starts with 91 and has 12 digits total, or has 10 digits, it's valid
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

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
    
    // Real-time validation for email and phone
    if (name === 'email' && value.trim()) {
      if (!validateEmail(value)) {
        setErrors((prev) => ({
          ...prev,
          email: 'Please enter a valid email address (e.g., example@domain.com)'
        }))
      } else {
        setErrors((prev) => {
          const newErrors = { ...prev }
          delete newErrors.email
          return newErrors
        })
      }
    } else if (name === 'phone' && value.trim()) {
      if (!validatePhone(value)) {
        setErrors((prev) => ({
          ...prev,
          phone: 'Please enter a valid phone number (10 digits for Indian numbers, or international format)'
        }))
      } else {
        setErrors((prev) => {
          const newErrors = { ...prev }
          delete newErrors.phone
          return newErrors
        })
      }
    } else {
      // Clear error for other fields when user starts typing
      if (errors[name]) {
        setErrors((prev) => {
          const newErrors = { ...prev }
          delete newErrors[name]
          return newErrors
        })
      }
    }
  }

  const validateForm = () => {
    const newErrors: Record<string, string> = {}

    // Name validation
    if (!formData.name.trim()) {
      newErrors.name = 'Name is required'
    } else if (formData.name.trim().length < 2) {
      newErrors.name = 'Name must be at least 2 characters long'
    } else if (formData.name.trim().length > 100) {
      newErrors.name = 'Name must be less than 100 characters'
    }

    // Email validation
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required'
    } else {
      const emailError = validateEmail(formData.email)
      if (!emailError) {
        newErrors.email = 'Please enter a valid email address (e.g., example@domain.com)'
      }
    }

    // Phone validation (required)
    if (!formData.phone || !formData.phone.trim()) {
      newErrors.phone = 'Phone number is required'
    } else {
      const phoneError = validatePhone(formData.phone)
      if (!phoneError) {
        newErrors.phone = 'Please enter a valid phone number (10 digits for Indian numbers, or international format)'
      }
    }

    // Subject validation
    if (!formData.subject.trim()) {
      newErrors.subject = 'Subject is required'
    } else if (formData.subject.trim().length < 3) {
      newErrors.subject = 'Subject must be at least 3 characters long'
    } else if (formData.subject.trim().length > 200) {
      newErrors.subject = 'Subject must be less than 200 characters'
    }

    // Message validation
    if (!formData.message.trim()) {
      newErrors.message = 'Message is required'
    } else if (formData.message.trim().length < 10) {
      newErrors.message = 'Message must be at least 10 characters long'
    } else if (formData.message.trim().length > 2000) {
      newErrors.message = 'Message must be less than 2000 characters'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setSubmitSuccess(false)

    if (!validateForm()) {
      return
    }

    setIsSubmitting(true)

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || 'Failed to send message')
      }

      // Success
      setIsSubmitting(false)
      setSubmitSuccess(true)

      // Reset form
      setFormData({
        name: '',
        email: '',
        phone: '',
        subject: '',
        message: '',
        workspaceInterest: 'Not specified',
      })
      setErrors({})

      // Hide success message after 5 seconds
      setTimeout(() => {
        setSubmitSuccess(false)
      }, 5000)
    } catch (error) {
      console.error('Error submitting form:', error)
      setIsSubmitting(false)
      setErrors({
        submit: error instanceof Error ? error.message : 'Failed to send message. Please try again later.',
      })
    }
  }

  return (
    <main className="min-h-screen">
      <Header />

      {/* Hero Section */}
        <div
          className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden"
        >
        {/* Background Image */}
        <div className="absolute inset-0 z-0">
          <Image
            src="/images/hero-banner.jpg"
            alt="Modern office workspace"
            fill
            priority
            className="object-cover"
            quality={90}
          />
          {/* Vertical black gradient overlay - dense at top, fades to clear at bottom */}
          <div className="absolute inset-0 bg-gradient-to-b from-black/100 via-black/50 to-black/5 pointer-events-none" />
        </div>

        {/* Main Content */}
        <div className="relative z-10 w-full flex flex-col items-center justify-center px-4 sm:px-6 lg:px-8 pt-24 sm:pt-40 lg:pt-24 pb-20 sm:pb-24">
          {/* Main Title */}
          <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-[200px] font-normal text-white text-center tracking-tight">
            Get In Touch
          </h1>

          {/* Subheading */}
          <p className="text-white text-lg sm:text-xl md:text-2xl font-light mt-6 sm:mt-8 text-center">
            We&apos;d love to hear from you. Reach out to us anytime.
          </p>
        </div>
      </div>

      {/* Contact Information Section */}
      <section
        ref={contactInfoRef.ref}
        className={`relative w-full py-16 sm:py-20 lg:py-24 px-4 sm:px-6 lg:px-8 transition-all duration-700 ease-out overflow-hidden ${
          contactInfoRef.isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
        }`}
      >
        {/* Background Image */}
        <div className="absolute inset-0 z-0">
          <Image
            src="/images/creative-group-working-startup-using-laptops.jpg"
            alt="Creative group working startup using laptops"
            fill
            className="object-cover"
            quality={90}
          />
          {/* Vertical black gradient overlay - dense at top, fades to clear at bottom */}
          <div className="absolute inset-0 bg-gradient-to-b from-black/100 via-black/50 to-black/5 pointer-events-none" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
            {contactInfoCards.map((card) => (
              <div
                key={card.id}
                className="bg-white/20 backdrop-blur-lg rounded-2xl p-6 sm:p-8 border border-white/30 shadow-xl transition-all duration-300 ease-in-out hover:bg-white/30 hover:shadow-2xl hover:scale-105 cursor-pointer text-center"
              >
                <div className="flex justify-center mb-4 sm:mb-6">
                  {card.icon}
                </div>
                <h3 className="text-xl sm:text-2xl font-bold text-white text-center mb-4">
                  {card.heading}
                </h3>
                <div className="space-y-2 mb-4">
                  {card.content.map((line, index) => (
                    <p key={index} className="text-sm sm:text-base text-gray-200 text-center leading-relaxed">
                      {line}
                    </p>
                  ))}
                </div>
                {card.link && (
                  <a
                    href={card.link.href}
                    target={card.link.href.startsWith('http') ? '_blank' : undefined}
                    rel={card.link.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                    className="inline-block text-white text-sm sm:text-base font-medium hover:opacity-70 transition-opacity underline"
                  >
                    {card.link.text} →
                  </a>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Form & Map Section */}
      <section
        id="send-us-a-message"
        ref={formMapRef.ref}
        className={`relative w-full py-16 sm:py-20 lg:py-24 px-4 sm:px-6 lg:px-8 transition-all duration-700 ease-out overflow-hidden ${
          formMapRef.isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
        }`}
      >
        {/* Background Image */}
        <div className="absolute inset-0 z-0">
          <Image
            src="/images/hero-banner.jpg"
            alt="Modern office workspace"
            fill
            className="object-cover"
            quality={90}
          />
          {/* Vertical black gradient overlay - dense at top, fades to clear at bottom */}
          <div className="absolute inset-0 bg-gradient-to-b from-black/100 via-black/50 to-black/5 pointer-events-none" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto">
          <div className="text-center mb-12 sm:mb-16">
            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-normal text-white mb-4">
              Send Us a Message
            </h2>
            <p className="text-lg sm:text-xl text-gray-200 font-light mb-6">
              Fill out the form below and we&apos;ll get back to you within 24 hours.
            </p>
            <h3 className="text-2xl sm:text-3xl lg:text-4xl font-normal text-white">
              Find Us on the Map
            </h3>
          </div>

          {/* Two Column Layout: Form and Map */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
            {/* Contact Form */}
            <div className="bg-white/20 backdrop-blur-lg rounded-2xl p-6 sm:p-8 lg:p-10 shadow-2xl border border-white/30">
            {submitSuccess && (
              <div className="mb-6 p-4 bg-green-500/20 border border-green-500/50 rounded-lg text-white text-center">
                <p className="font-medium">Thank you! We&apos;ll get back to you soon.</p>
              </div>
            )}

            {errors.submit && (
              <div className="mb-6 p-4 bg-red-500/20 border border-red-500/50 rounded-lg text-white">
                <p className="font-medium mb-2">{errors.submit}</p>
                {errors.submit.includes('GMAIL_EMAIL') && (
                  <p className="text-sm text-red-200 mt-2">
                    To fix this: For local development, create a <code className="bg-red-900/30 px-2 py-1 rounded">.env.local</code> file. For Vercel, add environment variables in Project Settings &gt; Environment Variables.
                  </p>
                )}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-5">
              {/* Name Field */}
              <div className="relative">
                <label htmlFor="name" className="sr-only">
                  Name
                </label>
                <div className={`relative bg-transparent rounded-full shadow-md p-3 flex items-center gap-3 border ${
                  errors.name ? 'border-red-400' : 'border-white'
                }`}>
                  <svg
                    className="w-5 h-5 text-white flex-shrink-0"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={1}
                      d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                    />
                  </svg>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    placeholder="Your Name"
                    required
                    className="flex-1 bg-transparent border-none outline-none text-white placeholder-white/70 text-sm sm:text-base font-light w-full"
                    aria-invalid={errors.name ? 'true' : 'false'}
                    aria-describedby={errors.name ? 'name-error' : undefined}
                  />
                </div>
                {errors.name && (
                  <p id="name-error" className="mt-1 text-sm text-red-400 pl-4" role="alert">
                    {errors.name}
                  </p>
                )}
              </div>

              {/* Email Field */}
              <div className="relative">
                <label htmlFor="email" className="sr-only">
                  Email
                </label>
                <div className={`relative bg-transparent rounded-full shadow-md p-3 flex items-center gap-3 border ${
                  errors.email ? 'border-red-400' : 'border-white'
                }`}>
                  <svg
                    className="w-5 h-5 text-white flex-shrink-0"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={1}
                      d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                    />
                  </svg>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    placeholder="Your Email Address (e.g., name@example.com)"
                    required
                    autoComplete="email"
                    pattern="[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*"
                    maxLength={254}
                    className="flex-1 bg-transparent border-none outline-none text-white placeholder-white/70 text-sm sm:text-base font-light w-full"
                    aria-invalid={errors.email ? 'true' : 'false'}
                    aria-describedby={errors.email ? 'email-error' : undefined}
                  />
                </div>
                {errors.email && (
                  <p id="email-error" className="mt-1 text-sm text-red-400 pl-4" role="alert">
                    {errors.email}
                  </p>
                )}
              </div>

              {/* Phone Field */}
              <div className="relative">
                <label htmlFor="phone" className="sr-only">
                  Phone
                </label>
                <div className={`relative bg-transparent rounded-full shadow-md p-3 flex items-center gap-3 border ${
                  errors.phone ? 'border-red-400' : 'border-white'
                }`}>
                  <svg
                    className="w-5 h-5 text-white flex-shrink-0"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={1}
                      d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                    />
                  </svg>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    placeholder="Your Phone Number - e.g., +91 9876543210"
                    required
                    autoComplete="tel"
                    maxLength={20}
                    className="flex-1 bg-transparent border-none outline-none text-white placeholder-white/70 text-sm sm:text-base font-light w-full"
                    aria-invalid={errors.phone ? 'true' : 'false'}
                    aria-describedby={errors.phone ? 'phone-error' : undefined}
                  />
                </div>
                {errors.phone && (
                  <p id="phone-error" className="mt-1 text-sm text-red-400 pl-4" role="alert">
                    {errors.phone}
                  </p>
                )}
              </div>

              {/* Subject Field */}
              <div className="relative">
                <label htmlFor="subject" className="sr-only">
                  Subject
                </label>
                <div className={`relative bg-transparent rounded-full shadow-md p-3 flex items-center gap-3 border ${
                  errors.subject ? 'border-red-400' : 'border-white'
                }`}>
                  <svg
                    className="w-5 h-5 text-white flex-shrink-0"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={1}
                      d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z"
                    />
                  </svg>
                  <input
                    type="text"
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleInputChange}
                    placeholder="Subject"
                    required
                    className="flex-1 bg-transparent border-none outline-none text-white placeholder-white/70 text-sm sm:text-base font-light w-full"
                    aria-invalid={errors.subject ? 'true' : 'false'}
                    aria-describedby={errors.subject ? 'subject-error' : undefined}
                  />
                </div>
                {errors.subject && (
                  <p id="subject-error" className="mt-1 text-sm text-red-400 pl-4" role="alert">
                    {errors.subject}
                  </p>
                )}
              </div>

              {/* Workspace Interest Dropdown */}
              <div className="relative">
                <label htmlFor="workspaceInterest" className="sr-only">
                  Workspace Interest
                </label>
                <div className="relative bg-transparent rounded-full shadow-md p-3 flex items-center gap-3 border border-white">
                  <svg
                    className="w-5 h-5 text-white flex-shrink-0"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={1}
                      d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
                    />
                  </svg>
                  <select
                    id="workspaceInterest"
                    name="workspaceInterest"
                    value={formData.workspaceInterest}
                    onChange={handleInputChange}
                    className="flex-1 bg-transparent border-none outline-none text-white text-sm sm:text-base font-light w-full appearance-none cursor-pointer"
                  >
                    <option value="Not specified" className="bg-gray-800">Not specified</option>
                    <option value="Hot Desks" className="bg-gray-800">Hot Desks</option>
                    <option value="Dedicated Desks" className="bg-gray-800">Dedicated Desks</option>
                    <option value="Private Cabins" className="bg-gray-800">Private Cabins</option>
                    <option value="Meeting Rooms" className="bg-gray-800">Meeting Rooms</option>
                    <option value="General Inquiry" className="bg-gray-800">General Inquiry</option>
                  </select>
                </div>
              </div>

              {/* Message Field */}
              <div className="relative">
                <label htmlFor="message" className="sr-only">
                  Message
                </label>
                <div className={`relative bg-transparent rounded-lg shadow-md p-3 flex items-start gap-3 border ${
                  errors.message ? 'border-red-400' : 'border-white'
                }`}>
                  <svg
                    className="w-5 h-5 text-white flex-shrink-0 mt-1"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={1}
                      d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
                    />
                  </svg>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    placeholder="Your Message"
                    rows={5}
                    required
                    className="flex-1 bg-transparent border-none outline-none text-white placeholder-white/70 text-sm sm:text-base font-light w-full resize-none"
                    aria-invalid={errors.message ? 'true' : 'false'}
                    aria-describedby={errors.message ? 'message-error' : undefined}
                  />
                </div>
                {errors.message && (
                  <p id="message-error" className="mt-1 text-sm text-red-400 pl-4" role="alert">
                    {errors.message}
                  </p>
                )}
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="block w-full bg-white text-black rounded-full py-3 sm:py-3 text-center font-semibold text-sm sm:text-base hover:bg-opacity-90 transition-colors shadow-md disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? (
                  <span className="flex items-center justify-center gap-2">
                    <svg className="animate-spin h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Sending...
                  </span>
                ) : (
                  'Send Message'
                )}
              </button>
            </form>
            </div>

            {/* Map */}
            <div className="bg-white/20 backdrop-blur-lg rounded-2xl p-6 sm:p-8 lg:p-10 shadow-2xl border border-white/30">
              <div className="rounded-xl overflow-hidden shadow-xl h-full min-h-[500px]">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3929.8763534127753!2d76.5178!3d9.5961!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3b062bdc7b6e2c27%3A0x8e42f5f6f3f0c8c9!2sThiruvathira%20Mahadeva%20Temple%2C%20Thrikkunnapuzha!5e0!3m2!1sen!2sin!4v1234567890123!5m2!1sen!2sin"
                  width="100%"
                  height="100%"
                  style={{ border: 0, minHeight: '500px' }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="NexSpot Location Map - Near Thiruvathira Temple, Kottayam"
                  className="w-full h-full"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section
        ref={faqRef.ref}
        className={`w-full bg-white py-12 sm:py-16 lg:py-20 px-4 sm:px-6 lg:px-8 transition-all duration-700 ease-out ${
          faqRef.isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
        }`}
      >
        <div className="max-w-7xl mx-auto">
          <div className="mb-8 sm:mb-12">
            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-normal text-black">
              Frequently Asked Questions
            </h2>
          </div>

          <div className="space-y-0">
            {faqData.map((item, index) => {
              const isOpen = openFaq === item.id
              const isLast = index === faqData.length - 1

              return (
                <div key={item.id}>
                  <button
                    id={`faq-question-${item.id}`}
                    onClick={() => toggleFaq(item.id)}
                    className="w-full py-4 sm:py-5 lg:py-6 flex items-start sm:items-center gap-4 sm:gap-6 text-left hover:opacity-80 transition-opacity focus:outline-none rounded-sm"
                    aria-expanded={isOpen}
                    aria-controls={`faq-answer-${item.id}`}
                  >
                    <span className="text-base sm:text-lg lg:text-xl font-bold text-black flex-shrink-0 min-w-[2.5rem] sm:min-w-[3rem]">
                      {item.number}.
                    </span>
                    <span className="text-base sm:text-lg lg:text-xl font-semibold text-black flex-grow">
                      {item.question}
                    </span>
                    <span className="flex-shrink-0 transition-transform duration-300 ease-in-out" aria-hidden="true">
                      <svg
                        className={`w-5 h-5 sm:w-6 sm:h-6 text-black transition-transform duration-300 ease-in-out ${
                          isOpen ? 'rotate-90' : 'rotate-0'
                        }`}
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M9 5l7 7-7 7"
                        />
                      </svg>
                    </span>
                  </button>

                  <div
                    className={`overflow-hidden transition-all duration-300 ease-in-out ${
                      isOpen ? 'max-h-[1000px] opacity-100' : 'max-h-0 opacity-0'
                    }`}
                  >
                    {item.answer && (
                      <div
                        id={`faq-answer-${item.id}`}
                        className="pl-0 sm:pl-14 lg:pl-20 pr-0 sm:pr-16 lg:pr-20 pb-4 sm:pb-5 lg:pb-6"
                        role="region"
                        aria-labelledby={`faq-question-${item.id}`}
                      >
                        <p className="text-sm sm:text-base text-gray-500 font-normal leading-relaxed">
                          {item.answer}
                        </p>
                      </div>
                    )}
                  </div>

                  {!isLast && (
                    <div className="border-b border-gray-200" aria-hidden="true" />
                  )}
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section
        ref={ctaRef.ref}
        className={`relative w-full py-16 sm:py-20 lg:py-24 px-4 sm:px-6 lg:px-8 transition-all duration-700 ease-out overflow-hidden ${
          ctaRef.isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
        }`}
      >
        {/* Background Image */}
        <div className="absolute inset-0 z-0">
          <Image
            src="/images/creative-group-working-startup-using-laptops.jpg"
            alt="Creative group working startup using laptops"
            fill
            className="object-cover"
            quality={90}
          />
          {/* Vertical black gradient overlay - dense at top, fades to clear at bottom */}
          <div className="absolute inset-0 bg-gradient-to-b from-black/100 via-black/50 to-black/5 pointer-events-none" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto flex justify-center">
          {/* Glassmorphism CTA Card */}
          <div className="w-full max-w-[420px] mx-auto bg-white/20 backdrop-blur-lg rounded-2xl p-6 sm:p-8 lg:p-10 shadow-2xl border border-white/30">
            <h2 className="text-white text-xl sm:text-2xl lg:text-3xl font-light text-center mb-4 sm:mb-6">
              Ready to Visit NexSpot?
            </h2>
            <p className="text-white text-base sm:text-lg font-light text-center mb-6 sm:mb-8">
              Schedule a tour and see our space in person
            </p>
            <div className="space-y-3 sm:space-y-4">
              <a
                href="#schedule-tour"
                className="block w-full bg-white text-black rounded-full py-3 sm:py-3 text-center font-semibold text-sm sm:text-base hover:bg-opacity-90 transition-colors shadow-md"
              >
                Schedule a Tour
              </a>
              <a
                href="tel:+919876543210"
                className="block w-full text-center text-white text-sm sm:text-base font-medium hover:opacity-70 transition-opacity"
              >
                Call Us Now
              </a>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}

