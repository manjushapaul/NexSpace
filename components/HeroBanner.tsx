'use client'

import Image from 'next/image'
import { useState, FormEvent } from 'react'

export default function HeroBanner() {
  const [name, setName] = useState('')
  const [mobile, setMobile] = useState('')
  const [email, setEmail] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitSuccess, setSubmitSuccess] = useState(false)
  const [error, setError] = useState('')

  // Email validation
  const validateEmail = (email: string) => {
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
    return domainParts.length >= 2 && domainParts[domainParts.length - 1].length >= 2
  }

  // Phone validation
  const validatePhone = (phone: string) => {
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
    return cleanedPhone.length >= 7 && cleanedPhone.length <= 15 && !cleanedPhone.startsWith('0')
  }

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setError('')
    setSubmitSuccess(false)

    // Validation
    if (!name.trim() || name.trim().length < 2) {
      setError('Please enter a valid name (at least 2 characters)')
      return
    }

    if (!email.trim() || !validateEmail(email)) {
      setError('Please enter a valid email address')
      return
    }

    if (!mobile.trim() || !validatePhone(mobile)) {
      setError('Please enter a valid mobile number (10 digits for Indian numbers)')
      return
    }

    setIsSubmitting(true)

    try {
      const response = await fetch('/api/hero-contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: name.trim(),
          email: email.trim(),
          mobile: mobile.trim(),
        }),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || 'Failed to send message')
      }

      // Success
      setIsSubmitting(false)
      setSubmitSuccess(true)

      // Reset form
      setName('')
      setMobile('')
      setEmail('')

      // Hide success message after 5 seconds
      setTimeout(() => {
        setSubmitSuccess(false)
      }, 5000)
    } catch (error) {
      console.error('Error submitting form:', error)
      setIsSubmitting(false)
      setError(error instanceof Error ? error.message : 'Failed to send message. Please try again later.')
    }
  }

  return (
    <div className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden">
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
        <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-[200px] font-normal
         text-white text-center tracking-tight">
        NE<span className="text-[#F5C553] font-semibold italic">X</span>SPOT
        </h1>

        {/* Slogans */}
        <div className="w-full max-w-5xl flex flex-col sm:flex-row items-center justify-between mb-10 sm:mb-10 px-4">
          <p className="text-white text-lg sm:text-xl md:text-2xl font-light mb-4 sm:mb-0 ">
            Your exclusive space
          </p>
          <p className="text-white text-lg sm:text-xl md:text-2xl font-light">
            to innovate
          </p>
        </div>

        {/* Glassmorphism Contact Form Card */}
        <div className="w-full max-w-[420px]  mx-auto bg-white/20 backdrop-blur-lg rounded-2xl p-6 sm:p-8 lg:p-10 shadow-2xl border border-white/30">
          <h2 className="text-white text-xl sm:text-2xl lg:text-3xl font-light text-center mb-6 sm:mb-8">
          Uncover Cozy Spaces
          </h2>

          {submitSuccess && (
            <div className="mb-4 p-3 bg-green-500/20 border border-green-500/50 rounded-lg text-white text-center text-sm">
              <p className="font-medium">Thank you! We will contact you soon.</p>
            </div>
          )}

          {error && (
            <div className="mb-4 p-3 bg-red-500/20 border border-red-500/50 rounded-lg text-white text-center text-sm">
              <p className="font-medium">{error}</p>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-3 sm:space-y-4">
            {/* Name Field */}
            <div className="relative">
              <label htmlFor="name" className="sr-only">
                Name
              </label>
              <div className="relative bg-transparent rounded-full shadow-md p-3 flex items-center  gap-3 border border-white">
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
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Enter your name"
                  required
                  minLength={2}
                  maxLength={100}
                  autoComplete="name"
                  className="flex-1 bg-transparent border-none outline-none text-white placeholder-white text-sm sm:text-base font-light w-full"
                />
              </div>
            </div>

            {/* Mobile Number Field */}
            <div className="relative">
              <label htmlFor="mobile" className="sr-only">
                Mobile Number
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
                    d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                  />
                </svg>
                <input
                  type="tel"
                  id="mobile"
                  name="mobile"
                  value={mobile}
                  onChange={(e) => setMobile(e.target.value)}
                  placeholder="Mobile Number"
                  required
                  autoComplete="tel"
                  maxLength={20}
                  className="flex-1 bg-transparent border-none outline-none text-white placeholder-white text-sm sm:text-base font-light w-full"
                />
              </div>
            </div>

            {/* Email Field */}
            <div className="relative">
              <label htmlFor="email" className="sr-only">
                Email
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
                    d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                  />
                </svg>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  required
                  autoComplete="email"
                  maxLength={254}
                  className="flex-1 bg-transparent border-none outline-none text-white placeholder-white text-sm sm:text-base font-light w-full"
                />
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isSubmitting}
              className="block w-full bg-white text-black rounded-full py-3 sm:py-3 text-center
               font-semibold text-sm sm:text-base hover:bg-opacity-90 transition-colors
                shadow-md cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
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
                'Start Your Collective Journey'
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}
