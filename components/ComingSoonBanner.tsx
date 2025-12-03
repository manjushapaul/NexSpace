'use client'

import { useState, FormEvent } from 'react'

export default function ComingSoonBanner() {
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
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
    if (!phone || !phone.trim()) return false // Phone is required
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
    if (!email.trim() || !validateEmail(email)) {
      setError('Please enter a valid email address')
      return
    }

    if (!validatePhone(phone)) {
      setError('Please enter a valid phone number')
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
          name: 'Waitlist Signup',
          email: email.trim(),
          mobile: phone.trim(),
        }),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || 'Failed to join waitlist')
      }

      // Success
      setIsSubmitting(false)
      setSubmitSuccess(true)
      setEmail('')
      setPhone('')

      // Hide success message after 5 seconds
      setTimeout(() => {
        setSubmitSuccess(false)
      }, 5000)
    } catch (error) {
      console.error('Error submitting form:', error)
      setIsSubmitting(false)
      setError(error instanceof Error ? error.message : 'Failed to join waitlist. Please try again.')
    }
  }

  return (
    <div className="relative w-full bg-gradient-to-r from-black via-gray-900 to-black border-b border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-8 sm:pt-28 sm:pb-12 lg:pt-32 lg:pb-16">
        <div className="flex flex-col items-center text-center">
          {/* Badge */}
          <div className="mb-6 sm:mb-8">
            <span className="inline-flex items-center gap-3 px-6 sm:px-8 py-3 sm:py-4 bg-white/10 backdrop-blur-sm rounded-full border-2 border-white/30 text-white text-lg sm:text-xl lg:text-2xl font-bold shadow-lg hover:scale-105 transition-transform">
              <svg className="w-6 h-6 sm:w-7 sm:h-7" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
              </svg>
              Coming Soon
            </span>
          </div>

          {/* H1 Title - SEO Optimized */}
          {/* <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4 sm:mb-6">
            Modern Coworking Space in Kottayam for Startups & Remote Teams
          </h1> */}

          {/* Subtitle */}
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-semibold text-white/90 mb-4 sm:mb-6">
            NexSpot Coworking Kottayam
          </h2>

          {/* Description */}
          <p className="text-base sm:text-lg lg:text-xl text-gray-300 font-light max-w-3xl mb-3 sm:mb-4">
            Flexible workspaces, private cabins, high-speed Wi-Fi, and meeting rooms – a startup-friendly coworking environment in Kottayam designed for productivity and collaboration.
          </p>

          {/* Special Offer */}
          <div className="mb-8 sm:mb-10 px-4 py-3 sm:py-4 bg-gradient-to-r from-yellow-500/20 via-yellow-400/20 to-yellow-500/20 backdrop-blur-sm rounded-2xl border-2 border-yellow-400/50 shadow-xl">
            <p className="text-lg sm:text-xl lg:text-2xl text-yellow-400 font-bold animate-pulse">
              🎉 Special founding offer for the first 15 people who book
            </p>
          </div>

          {/* Form */}
          <div className="w-full max-w-2xl">
            {submitSuccess && (
              <div className="mb-4 p-3 bg-green-500/20 border border-green-500/50 rounded-lg text-white text-center text-sm">
                <p className="font-medium">Thank you! You&apos;re on the waitlist. We&apos;ll notify you at launch!</p>
              </div>
            )}

            {error && (
              <div className="mb-4 p-3 bg-red-500/20 border border-red-500/50 rounded-lg text-white text-center text-sm">
                <p className="font-medium">{error}</p>
              </div>
            )}

            <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 sm:gap-4">
              {/* Email Input */}
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                required
                maxLength={254}
                className="flex-1 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full px-4 sm:px-6 py-3 text-white placeholder-white/60 text-base font-light focus:outline-none focus:ring-2 focus:ring-white/40 transition-all"
              />

              {/* Phone Input (Required) */}
              <input
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="Phone number"
                required
                maxLength={20}
                className="flex-1 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full px-4 sm:px-6 py-3 text-white placeholder-white/60 text-base font-light focus:outline-none focus:ring-2 focus:ring-white/40 transition-all"
              />

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="bg-white text-black rounded-full px-6 sm:px-8 py-3 text-center font-semibold text-sm sm:text-base hover:bg-opacity-90 transition-colors shadow-lg disabled:opacity-50 disabled:cursor-not-allowed whitespace-nowrap"
              >
                {isSubmitting ? (
                  <span className="flex items-center justify-center gap-2">
                    <svg className="animate-spin h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Joining...
                  </span>
                ) : (
                  'Join Waitlist'
                )}
              </button>
            </form>

            <p className="mt-4 text-xs sm:text-sm text-gray-400 text-center">
              Be the first to know when we launch and claim your exclusive founding member benefits
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

