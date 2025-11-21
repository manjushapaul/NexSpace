'use client'

import Header from '@/components/Header'
import Footer from '@/components/Footer'
import Image from 'next/image'
import Link from 'next/link'
import { useState, useEffect, useMemo, useCallback } from 'react'
import { useScrollAnimation } from '@/hooks/useScrollAnimation'
import { calculateTotalPrice } from '@/utils/calculatePrice'

interface BookingFormData {
  fullName: string
  email: string
  phone: string
  company: string
  workspaceType: string
  seats: number
  bookingType: string
  startDate: string
  endDate: string
  startTime: string
  endTime: string
  addOns: string[]
  specialRequirements: string
  paymentMethod: string
  agreedToTerms: boolean
}

interface WorkspaceOption {
  id: string
  name: string
  icon: JSX.Element
  prices: {
    hourly?: number
    daily?: number
    weekly?: number
    monthly?: number
  }
}

const workspaceOptions: WorkspaceOption[] = [
  {
    id: 'hot-desk',
    name: 'Hot Desk',
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
      </svg>
    ),
    prices: { daily: 200, weekly: 1000, monthly: 4000 },
  },
  {
    id: 'dedicated-desk',
    name: 'Dedicated Desk',
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
      </svg>
    ),
    prices: { weekly: 1250, monthly: 5000 },
  },
  {
    id: 'private-cabin',
    name: 'Private Cabin (2-3 seater)',
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
      </svg>
    ),
    prices: { monthly: 12000 },
  },
  {
    id: 'meeting-room',
    name: 'Meeting Room',
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
      </svg>
    ),
    prices: { hourly: 500, daily: 3000 },
  },
  {
    id: 'phone-booth',
    name: 'Phone Booth',
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
      </svg>
    ),
    prices: { daily: 0 },
  },
]

const addOnsOptions = [
  { id: 'printing', name: 'Printing Services', price: 5, unit: 'per page' },
  { id: 'locker', name: 'Locker Rental', price: 500, unit: 'per month' },
  { id: 'refreshments', name: 'Refreshments', price: 100, unit: 'per day' },
  { id: 'parking', name: 'Parking Spot', price: 100, unit: 'per day' },
  { id: 'access-24-7', name: '24/7 Access', price: 1000, unit: 'per month' },
]

export default function Booking() {
  const heroRef = useScrollAnimation()
  const formRef = useScrollAnimation()

  const [formData, setFormData] = useState<BookingFormData>({
    fullName: '',
    email: '',
    phone: '',
    company: '',
    workspaceType: '',
    seats: 1,
    bookingType: 'daily',
    startDate: '',
    endDate: '',
    startTime: '',
    endTime: '',
    addOns: [],
    specialRequirements: '',
    paymentMethod: 'online',
    agreedToTerms: false,
  })

  const [errors, setErrors] = useState<Record<string, string>>({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [totalPrice, setTotalPrice] = useState(0)
  const [priceBreakdown, setPriceBreakdown] = useState({
    basePrice: 0,
    addOnsTotal: 0,
    subtotal: 0,
    gst: 0,
    total: 0,
  })

  // Memoize price calculation to avoid unnecessary recalculations
  const priceCalculation = useMemo(() => {
    if (!formData.workspaceType || !formData.startDate) {
      return {
        basePrice: 0,
        addOnsPrice: 0,
        subtotal: 0,
        gst: 0,
        total: 0,
        breakdown: {
          workspace: '',
          duration: '',
          basePrice: 0,
          addOns: [],
          subtotal: 0,
          gst: 0,
          total: 0,
        },
      }
    }

    try {
      const calculated = calculateTotalPrice({
        ...formData,
        workspaceType: formData.workspaceType as any,
      } as any)
      
      // Apply seats multiplier for certain workspace types
      let adjustedBasePrice = calculated.basePrice
      if (['hot-desk', 'dedicated-desk', 'private-cabin'].includes(formData.workspaceType)) {
        adjustedBasePrice = calculated.basePrice * formData.seats
      }
      
      const adjustedSubtotal = adjustedBasePrice + calculated.addOnsPrice
      const adjustedGst = adjustedSubtotal * 0.18
      const adjustedTotal = adjustedSubtotal + adjustedGst
      
      return {
        basePrice: adjustedBasePrice,
        addOnsPrice: calculated.addOnsPrice,
        subtotal: adjustedSubtotal,
        gst: adjustedGst,
        total: adjustedTotal,
        breakdown: {
          ...calculated.breakdown,
          basePrice: adjustedBasePrice,
          subtotal: adjustedSubtotal,
          gst: adjustedGst,
          total: adjustedTotal,
        },
      }
    } catch (error) {
      console.error('Price calculation error:', error)
      return {
        basePrice: 0,
        addOnsPrice: 0,
        subtotal: 0,
        gst: 0,
        total: 0,
        breakdown: {
          workspace: '',
          duration: '',
          basePrice: 0,
          addOns: [],
          subtotal: 0,
          gst: 0,
          total: 0,
        },
      }
    }
  }, [
    formData.workspaceType,
    formData.seats,
    formData.bookingType,
    formData.startDate,
    formData.endDate,
    formData.startTime,
    formData.endTime,
    formData.addOns,
  ])

  // Update state when price calculation changes
  useEffect(() => {
    setTotalPrice(priceCalculation.total)
    setPriceBreakdown({
      basePrice: priceCalculation.basePrice,
      addOnsTotal: priceCalculation.addOnsPrice,
      subtotal: priceCalculation.subtotal,
      gst: priceCalculation.gst,
      total: priceCalculation.total,
    })
  }, [priceCalculation])

  const handleInputChange = useCallback((
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value, type } = e.target
    const checked = (e.target as HTMLInputElement).checked

    if (type === 'checkbox') {
      if (name === 'agreedToTerms') {
        setFormData((prev) => ({ ...prev, [name]: checked }))
      } else {
        // Handle add-ons
        setFormData((prev) => ({
          ...prev,
          addOns: checked
            ? [...prev.addOns, value]
            : prev.addOns.filter((id) => id !== value),
        }))
      }
    } else if (type === 'radio') {
      setFormData((prev) => ({ ...prev, [name]: value }))
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }))
    }

    // Clear error for this field
    if (errors[name]) {
      setErrors((prev) => {
        const newErrors = { ...prev }
        delete newErrors[name]
        return newErrors
      })
    }
  }, [errors])

  const validateForm = useCallback((): boolean => {
    const newErrors: Record<string, string> = {}

    if (!formData.fullName || formData.fullName.length < 2) {
      newErrors.fullName = 'Please enter your full name (min 2 characters)'
    } else if (/\d/.test(formData.fullName)) {
      newErrors.fullName = 'Name should not contain numbers'
    }

    if (!formData.email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address'
    }

    const phoneDigits = formData.phone.replace(/\D/g, '')
    if (!formData.phone || phoneDigits.length !== 10) {
      newErrors.phone = 'Please enter a valid 10-digit phone number'
    }

    if (!formData.workspaceType) {
      newErrors.workspaceType = 'Please select a workspace type'
    }

    if (!formData.startDate) {
      newErrors.startDate = 'Please select a start date'
    } else {
      const startDate = new Date(formData.startDate)
      const today = new Date()
      today.setHours(0, 0, 0, 0)
      if (startDate < today) {
        newErrors.startDate = 'Start date cannot be in the past'
      }
    }

    if (formData.bookingType !== 'monthly' && formData.endDate) {
      const startDate = new Date(formData.startDate)
      const endDate = new Date(formData.endDate)
      if (endDate <= startDate) {
        newErrors.endDate = 'End date must be after start date'
      }
    }

    if (formData.bookingType === 'hourly') {
      if (!formData.startTime || !formData.endTime) {
        newErrors.startTime = 'Please select both start and end time'
      } else {
        const start = new Date(`2000-01-01T${formData.startTime}`)
        const end = new Date(`2000-01-01T${formData.endTime}`)
        if (end <= start) {
          newErrors.endTime = 'End time must be after start time'
        }
      }
    }

    if (!formData.agreedToTerms) {
      newErrors.agreedToTerms = 'You must agree to terms and conditions'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }, [formData])

  const handleSubmit = useCallback(async (e: React.FormEvent) => {
    e.preventDefault()

    if (!validateForm()) {
      return
    }

    setIsSubmitting(true)

    try {
      // Log booking data (for now)
      console.log('Booking submitted:', formData)
      console.log('Total Price:', totalPrice)

      // TODO: Send to API endpoint
      // const response = await fetch('/api/bookings', {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify({ ...formData, totalPrice }),
      // })

      // Generate booking reference
      const bookingRef = `NEX-${Date.now().toString().slice(-8)}`

      // Redirect to confirmation page
      window.location.href = `/booking/confirmation?ref=${bookingRef}`
    } catch (error) {
      console.error('Booking error:', error)
      setErrors({ submit: 'Booking failed. Please try again.' })
      setIsSubmitting(false)
    }
  }, [formData, totalPrice, validateForm])

  const selectedWorkspace = workspaceOptions.find((w) => w.id === formData.workspaceType)
  const showSeatsInput = ['hot-desk', 'dedicated-desk', 'private-cabin'].includes(formData.workspaceType)
  const showEndDate = formData.bookingType === 'daily' || formData.bookingType === 'weekly'
  const showTimeSlots = formData.bookingType === 'hourly'

  // Get available booking types for selected workspace
  const getAvailableBookingTypes = () => {
    if (!selectedWorkspace) return []
    const types = []
    if (selectedWorkspace.prices.hourly) types.push({ value: 'hourly', label: 'Hourly' })
    if (selectedWorkspace.prices.daily) types.push({ value: 'daily', label: 'Daily' })
    if (selectedWorkspace.prices.weekly) types.push({ value: 'weekly', label: 'Weekly' })
    if (selectedWorkspace.prices.monthly) types.push({ value: 'monthly', label: 'Monthly' })
    return types
  }

  return (
    <main className="min-h-screen">
      <Header />

      {/* Hero Section */}
      <div
        ref={heroRef.ref}
        className={`relative min-h-screen flex flex-col items-center justify-center overflow-hidden transition-all duration-700 ease-out ${
          heroRef.isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
        }`}
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
            Book Now
          </h1>

          {/* Subheading */}
          <p className="text-white text-lg sm:text-xl md:text-2xl font-light mt-6 sm:mt-8 text-center">
            Reserve your ideal workspace in just a few clicks
          </p>
        </div>
      </div>

      {/* Booking Form Section */}
      <section
        ref={formRef.ref}
        className={`relative w-full bg-white py-16 sm:py-20 lg:py-24 px-4 sm:px-6 lg:px-8 transition-all duration-700 ease-out ${
          formRef.isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
        }`}
      >
        <div className="relative z-10 max-w-7xl mx-auto">
          <div className="text-center mb-12 sm:mb-16">
            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-normal text-black mb-4">
              Complete Your Reservation
            </h2>
            <p className="text-lg sm:text-xl text-gray-600 font-light">
              Fill in the details below to secure your workspace
            </p>
          </div>

          <div>
            {/* Booking Form */}
            <div>
              <div className="bg-white rounded-2xl p-6 sm:p-8 lg:p-10 shadow-xl border border-gray-200">
                {errors.submit && (
                  <div className="mb-6 p-4 bg-red-50 border border-red-500/50 rounded-lg text-red-700 text-center">
                    <p className="font-medium">{errors.submit}</p>
                  </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-6 sm:space-y-8">
                  {/* Step 1: Personal Information */}
                  <div>
                    <h3 className="text-xl sm:text-2xl font-semibold text-black mb-6">Personal Information</h3>
                    <div className="space-y-4 sm:space-y-5">
                      {/* Full Name */}
                      <div>
                        <label htmlFor="fullName" className="sr-only">
                          Full Name
                        </label>
                        <div
                          className={`relative bg-transparent p-3 flex items-center gap-3 border-b ${
                            errors.fullName ? 'border-red-400' : 'border-black'
                          }`}
                        >
                          <svg
                            className="w-5 h-5 text-black flex-shrink-0"
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
                            id="fullName"
                            name="fullName"
                            value={formData.fullName}
                            onChange={handleInputChange}
                            placeholder="Enter your full name"
                            required
                            className="flex-1 bg-transparent border-none outline-none text-black placeholder-gray-400 text-sm sm:text-base font-light w-full"
                            aria-invalid={errors.fullName ? 'true' : 'false'}
                            aria-describedby={errors.fullName ? 'fullName-error' : undefined}
                          />
                        </div>
                        {errors.fullName && (
                          <p id="fullName-error" className="mt-1 text-sm text-red-400 pl-4" role="alert">
                            {errors.fullName}
                          </p>
                        )}
                      </div>

                      {/* Email */}
                      <div>
                        <label htmlFor="email" className="sr-only">
                          Email Address
                        </label>
                        <div
                            className={`relative bg-transparent p-3 flex items-center gap-3 border-b ${
                            errors.email ? 'border-red-400' : 'border-black'
                          }`}
                        >
                          <svg
                            className="w-5 h-5 text-black flex-shrink-0"
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
                            placeholder="your.email@example.com"
                            required
                            className="flex-1 bg-transparent border-none outline-none text-black placeholder-gray-400 text-sm sm:text-base font-light w-full"
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

                      {/* Phone */}
                      <div>
                        <label htmlFor="phone" className="sr-only">
                          Phone Number
                        </label>
                        <div
                            className={`relative bg-transparent p-3 flex items-center gap-3 border-b ${
                            errors.phone ? 'border-red-400' : 'border-black'
                          }`}
                        >
                          <svg
                            className="w-5 h-5 text-black flex-shrink-0"
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
                            placeholder="+91 XXXXX XXXXX"
                            required
                            className="flex-1 bg-transparent border-none outline-none text-black placeholder-gray-400 text-sm sm:text-base font-light w-full"
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

                      {/* Company */}
                      <div>
                        <label htmlFor="company" className="sr-only">
                          Company/Organization
                        </label>
                        <div className="relative bg-transparent p-3 flex items-center gap-3 border-b border-black">
                          <svg
                            className="w-5 h-5 text-black flex-shrink-0"
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
                          <input
                            type="text"
                            id="company"
                            name="company"
                            value={formData.company}
                            onChange={handleInputChange}
                            placeholder="Company name (if applicable)"
                            className="flex-1 bg-transparent border-none outline-none text-black placeholder-gray-400 text-sm sm:text-base font-light w-full"
                          />
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Step 2 & 3: Workspace Selection and Booking Duration - Side by Side */}
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8">
                    {/* Step 2: Workspace Selection */}
                    <div>
                      <h3 className="text-xl sm:text-2xl font-semibold text-black mb-6">Workspace Selection</h3>
                    <div>
                      <label className="sr-only">Select Workspace Type</label>
                      {errors.workspaceType && (
                        <p className="mb-2 text-sm text-red-400" role="alert">
                          {errors.workspaceType}
                        </p>
                      )}
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        {workspaceOptions.map((option) => (
                          <label
                            key={option.id}
                            className={`relative flex items-center gap-3 p-4 rounded-xl border-2 
                                cursor-pointer transition-all ${
                                formData.workspaceType === option.id
                                  ? 'border-green-500 bg-gray-50'
                                  : 'border-black/30 bg-gray-50 hover:bg-gray-100'
                              }`}
                            >
                            <input
                              type="radio"
                              name="workspaceType"
                              value={option.id}
                              checked={formData.workspaceType === option.id}
                              onChange={handleInputChange}
                              className="sr-only"
                            />
                            <div className="text-black">{option.icon}</div>
                            <div className="flex-1">
                              <div className="text-black font-semibold text-sm sm:text-base">{option.name}</div>
                              <div className="text-gray-600 text-xs sm:text-sm">
                                {option.prices.hourly && `₹${option.prices.hourly}/hr • `}
                                {option.prices.daily && `₹${option.prices.daily}/day • `}
                                {option.prices.weekly && `₹${option.prices.weekly}/week • `}
                                {option.prices.monthly && `₹${option.prices.monthly}/month`}
                              </div>
                            </div>
                          </label>
                        ))}
                      </div>
                    </div>

                    {/* Number of Seats */}
                    {showSeatsInput && (
                      <div className="mt-4">
                        <label htmlFor="seats" className="block text-black text-sm sm:text-base font-medium mb-2">
                          Number of Seats
                        </label>
                        <div className="relative bg-transparent p-3 flex items-center gap-3 border-b border-black">
                          <input
                            type="number"
                            id="seats"
                            name="seats"
                            min="1"
                            max="10"
                            value={formData.seats}
                            onChange={handleInputChange}
                            className="flex-1 bg-transparent border-none outline-none text-black text-sm sm:text-base font-light w-full"
                          />
                        </div>
                      </div>
                    )}
                    </div>

                    {/* Step 3: Booking Duration */}
                    <div>
                      <h3 className="text-xl sm:text-2xl font-semibold text-black mb-6">Booking Duration</h3>
                    <div className="space-y-4 sm:space-y-5">
                      {/* Booking Type */}
                      <div>
                        <label className="block text-black text-sm sm:text-base font-medium mb-3">
                          Booking Type
                        </label>
                        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                          {getAvailableBookingTypes().map((type) => (
                            <label
                              key={type.value}
                              className={`relative flex items-center justify-center p-3 rounded-xl border-2 cursor-pointer transition-all ${
                                formData.bookingType === type.value
                                  ? 'border-green-500 bg-gray-50'
                                  : 'border-black/30 bg-gray-50 hover:bg-gray-100'
                              }`}
                            >
                              <input
                                type="radio"
                                name="bookingType"
                                value={type.value}
                                checked={formData.bookingType === type.value}
                                onChange={handleInputChange}
                                className="sr-only"
                              />
                              <span className="text-black text-sm font-medium">{type.label}</span>
                            </label>
                          ))}
                        </div>
                      </div>

                      {/* Date Fields - Stacked Vertically */}
                      <div className="space-y-4">
                        {/* Start Date */}
                        <div>
                          <label htmlFor="startDate" className="block text-black text-sm sm:text-base font-medium mb-2">
                            Start Date
                          </label>
                          <div
                            className={`relative bg-transparent p-3 flex items-center gap-3 border-b ${
                              errors.startDate ? 'border-red-400' : 'border-black'
                            }`}
                          >
                            <svg
                              className="w-5 h-5 text-black flex-shrink-0"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                              aria-hidden="true"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={1}
                                d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                              />
                            </svg>
                            <input
                              type="date"
                              id="startDate"
                              name="startDate"
                              value={formData.startDate}
                              onChange={handleInputChange}
                              min={new Date().toISOString().split('T')[0]}
                              required
                              className="flex-1 bg-transparent border-none outline-none text-black text-sm sm:text-base font-light w-full"
                              aria-invalid={errors.startDate ? 'true' : 'false'}
                              aria-describedby={errors.startDate ? 'startDate-error' : undefined}
                            />
                          </div>
                          {errors.startDate && (
                            <p id="startDate-error" className="mt-1 text-sm text-red-400 pl-4" role="alert">
                              {errors.startDate}
                            </p>
                          )}
                        </div>

                        {/* End Date */}
                        {showEndDate && (
                          <div>
                            <label htmlFor="endDate" className="block text-black text-sm sm:text-base font-medium mb-2">
                              End Date
                            </label>
                            <div
                              className={`relative bg-transparent p-3 flex items-center gap-3 border-b ${
                                errors.endDate ? 'border-red-400' : 'border-black'
                              }`}
                            >
                              <svg
                                className="w-5 h-5 text-black flex-shrink-0"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                                aria-hidden="true"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth={1}
                                  d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                                />
                              </svg>
                              <input
                                type="date"
                                id="endDate"
                                name="endDate"
                                value={formData.endDate}
                                onChange={handleInputChange}
                              min={formData.startDate || new Date().toISOString().split('T')[0]}
                              required
                              className="flex-1 bg-transparent border-none outline-none text-black text-sm sm:text-base font-light w-full"
                                aria-invalid={errors.endDate ? 'true' : 'false'}
                                aria-describedby={errors.endDate ? 'endDate-error' : undefined}
                              />
                            </div>
                            {errors.endDate && (
                              <p id="endDate-error" className="mt-1 text-sm text-red-400 pl-4" role="alert">
                                {errors.endDate}
                              </p>
                            )}
                          </div>
                        )}
                      </div>

                      {/* Time Slots */}
                      {showTimeSlots && (
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <label htmlFor="startTime" className="block text-black text-sm sm:text-base font-medium mb-2">
                              Start Time
                            </label>
                            <div
                              className={`relative bg-transparent p-3 flex items-center gap-3 border-b ${
                                errors.startTime ? 'border-red-400' : 'border-black'
                              }`}
                            >
                              <input
                                type="time"
                                id="startTime"
                                name="startTime"
                                value={formData.startTime}
                                onChange={handleInputChange}
                                min="09:00"
                                max="19:00"
                                required
                                className="flex-1 bg-transparent border-none outline-none text-black text-sm sm:text-base font-light w-full"
                                aria-invalid={errors.startTime ? 'true' : 'false'}
                              />
                            </div>
                          </div>
                          <div>
                            <label htmlFor="endTime" className="block text-black text-sm sm:text-base font-medium mb-2">
                              End Time
                            </label>
                            <div
                              className={`relative bg-transparent p-3 flex items-center gap-3 border-b ${
                                errors.endTime ? 'border-red-400' : 'border-black'
                              }`}
                            >
                              <input
                                type="time"
                                id="endTime"
                                name="endTime"
                                value={formData.endTime}
                                onChange={handleInputChange}
                                min={formData.startTime || '09:00'}
                                max="19:00"
                                required
                                className="flex-1 bg-transparent border-none outline-none text-black text-sm sm:text-base font-light w-full"
                                aria-invalid={errors.endTime ? 'true' : 'false'}
                              />
                            </div>
                            {errors.endTime && (
                              <p id="endTime-error" className="mt-1 text-sm text-red-400 pl-4" role="alert">
                                {errors.endTime}
                              </p>
                            )}
                          </div>
                        </div>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Step 4 & 5: Additional Services and Payment Information - Side by Side */}
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8">
                    {/* Step 4: Additional Services */}
                    <div>
                      <h3 className="text-xl sm:text-2xl font-semibold text-black mb-6">Additional Services (Optional)</h3>
                    <div className="space-y-3">
                      {addOnsOptions.map((addOn) => (
                        <label
                          key={addOn.id}
                          className="flex items-center gap-3 p-3 rounded-xl border border-black/30 bg-gray-50 hover:bg-gray-100 cursor-pointer transition-all"
                        >
                          <input
                            type="checkbox"
                            name="addOns"
                            value={addOn.id}
                            checked={formData.addOns.includes(addOn.id)}
                            onChange={handleInputChange}
                            className="w-5 h-5 text-black rounded border-black/30 bg-transparent"
                          />
                          <div className="flex-1">
                            <span className="text-black text-sm sm:text-base font-medium">{addOn.name}</span>
                            <span className="text-gray-600 text-xs sm:text-sm ml-2">
                              ₹{addOn.price} {addOn.unit}
                            </span>
                          </div>
                        </label>
                      ))}
                    </div>

                    {/* Special Requirements */}
                    <div className="mt-4">
                      <label htmlFor="specialRequirements" className="block text-black text-sm sm:text-base font-medium mb-2">
                        Special Requirements
                      </label>
                      <div className="relative bg-transparent p-3 flex items-start gap-3 border-b border-black">
                        <textarea
                          id="specialRequirements"
                          name="specialRequirements"
                          value={formData.specialRequirements}
                          onChange={handleInputChange}
                          placeholder="Any special requirements or requests?"
                          rows={4}
                          maxLength={500}
                          className="flex-1 bg-transparent border-none outline-none text-black placeholder-gray-400 text-sm sm:text-base font-light w-full resize-none"
                        />
                      </div>
                      <p className="mt-1 text-xs text-gray-500 text-right">
                        {formData.specialRequirements.length}/500
                      </p>
                    </div>
                    </div>

                    {/* Step 5: Payment Information */}
                    <div>
                      <h3 className="text-xl sm:text-2xl font-semibold text-black mb-6">Payment Information</h3>
                    <div className="space-y-4">
                      {/* Payment Method */}
                      <div>
                        <label className="block text-black text-sm sm:text-base font-medium mb-3">
                          Preferred Payment Method
                        </label>
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                          {[
                            { value: 'online', label: 'Pay Online (Card/UPI)' },
                            { value: 'reception', label: 'Pay at Reception' },
                            { value: 'bank', label: 'Bank Transfer' },
                          ].map((method) => (
                            <label
                              key={method.value}
                              className={`relative flex items-center justify-center p-3 rounded-xl border-2 cursor-pointer transition-all ${
                                formData.paymentMethod === method.value
                                  ? 'border-green-500 bg-gray-50'
                                  : 'border-black/30 bg-gray-50 hover:bg-gray-100'
                              }`}
                            >
                              <input
                                type="radio"
                                name="paymentMethod"
                                value={method.value}
                                checked={formData.paymentMethod === method.value}
                                onChange={handleInputChange}
                                className="sr-only"
                              />
                              <span className="text-black text-sm font-medium text-center">{method.label}</span>
                            </label>
                          ))}
                        </div>
                      </div>

                      {/* Terms Agreement */}
                      <div>
                        <label
                          className={`flex items-start gap-3 p-3 rounded-xl border ${
                            errors.agreedToTerms ? 'border-red-400' : 'border-black/30'
                          } bg-gray-50 cursor-pointer transition-all`}
                        >
                          <input
                            type="checkbox"
                            name="agreedToTerms"
                            checked={formData.agreedToTerms}
                            onChange={handleInputChange}
                            className="mt-1 w-5 h-5 text-black rounded border-black/30 bg-transparent"
                            aria-invalid={errors.agreedToTerms ? 'true' : 'false'}
                            aria-describedby={errors.agreedToTerms ? 'terms-error' : undefined}
                          />
                          <span className="text-black text-sm sm:text-base">
                            I agree to the{' '}
                            <Link href="/terms" className="underline hover:opacity-70" target="_blank">
                              Terms & Conditions
                            </Link>{' '}
                            and{' '}
                            <Link href="/cancellation-policy" className="underline hover:opacity-70" target="_blank">
                              Cancellation Policy
                            </Link>
                          </span>
                        </label>
                        {errors.agreedToTerms && (
                          <p id="terms-error" className="mt-1 text-sm text-red-400 pl-4" role="alert">
                            {errors.agreedToTerms}
                          </p>
                        )}
                      </div>
                    </div>
                    </div>
                  </div>

                  {/* Submit Button */}
                  <button
                    type="submit"
                    disabled={isSubmitting || !formData.agreedToTerms}
                    className="block w-full bg-black text-white rounded-full py-3 sm:py-3 text-center font-semibold text-sm sm:text-base hover:bg-opacity-90 transition-colors shadow-md disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isSubmitting ? (
                      <span className="flex items-center justify-center gap-2">
                        <svg className="animate-spin h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        Processing...
                      </span>
                    ) : (
                      'Confirm Booking'
                    )}
                  </button>
                </form>
              </div>
            </div>

            {/* Price Summary */}
            <div className="mt-8">
              <div className="bg-white rounded-2xl p-6 sm:p-8 shadow-xl border border-gray-200">
                <h3 className="text-xl sm:text-2xl font-semibold text-black mb-6">Price Summary</h3>
                {totalPrice > 0 ? (
                  <div className="space-y-4">
                    {selectedWorkspace && (
                      <div>
                        <div className="text-gray-600 text-sm mb-2">Workspace Type</div>
                        <div className="text-black font-medium">{selectedWorkspace.name}</div>
                      </div>
                    )}
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between text-gray-600">
                        <span>Base Price</span>
                        <span>₹{priceBreakdown.basePrice.toLocaleString()}</span>
                      </div>
                      {priceBreakdown.addOnsTotal > 0 && (
                        <div className="flex justify-between text-gray-600">
                          <span>Add-ons</span>
                          <span>₹{priceBreakdown.addOnsTotal.toLocaleString()}</span>
                        </div>
                      )}
                      <div className="flex justify-between text-gray-600">
                        <span>Subtotal</span>
                        <span>₹{priceBreakdown.subtotal.toLocaleString()}</span>
                      </div>
                      <div className="flex justify-between text-gray-600">
                        <span>GST (18%)</span>
                        <span>₹{priceBreakdown.gst.toLocaleString()}</span>
                      </div>
                      <div className="border-t border-gray-300 pt-2 mt-2">
                        <div className="flex justify-between text-black font-bold text-lg">
                          <span>Total Amount</span>
                          <span>₹{priceBreakdown.total.toLocaleString()}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                ) : (
                  <p className="text-gray-500 text-sm">Select workspace and dates to see pricing</p>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}

