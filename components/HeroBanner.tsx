'use client'

import Image from 'next/image'
import { useState, FormEvent } from 'react'

export default function HeroBanner() {
  const [name, setName] = useState('')
  const [mobile, setMobile] = useState('')
  const [email, setEmail] = useState('')

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    
    // Log form data to console for future backend integration
    console.log('Form submitted:', {
      name,
      mobile,
      email,
    })

    // Reset form after submission
    setName('')
    setMobile('')
    setEmail('')
  }

  return (
    <div className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/hero-banner.jpg"
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
        NEXSPACE
        </h1>

        {/* Slogans */}
        <div className="w-full max-w-5xl flex flex-col sm:flex-row items-center justify-between mb-10 sm:mb-10 px-4">
          <p className="text-white text-lg sm:text-xl md:text-2xl font-light mb-4 sm:mb-0">
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
                  className="flex-1 bg-transparent border-none outline-none text-white placeholder-white text-sm sm:text-base font-light w-full"
                />
              </div>
            </div>

            {/* Submit Button */}
            <a
              href="#"
              onClick={(e) => {
                e.preventDefault()
                const form = e.currentTarget.closest('form')
                if (form) {
                  form.requestSubmit()
                }
              }}
              className="block w-full bg-white text-black rounded-full py-3 sm:py-3 text-center
               font-semibold text-sm sm:text-base hover:bg-opacity-90 transition-colors
                shadow-md cursor-pointer"
            >
              Start Your Collective Journey
            </a>
          </form>
        </div>
      </div>
    </div>
  )
}
