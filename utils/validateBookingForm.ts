import { BookingFormData } from '@/types/booking'

export interface ValidationErrors {
  fullName?: string
  email?: string
  phone?: string
  workspaceType?: string
  seats?: string
  bookingType?: string
  startDate?: string
  endDate?: string
  startTime?: string
  endTime?: string
  paymentMethod?: string
  agreedToTerms?: string
  submit?: string
}

export function validateBookingForm(formData: BookingFormData): ValidationErrors {
  const errors: ValidationErrors = {}

  // Full Name validation
  if (!formData.fullName || formData.fullName.trim().length < 2) {
    errors.fullName = 'Please enter your full name'
  } else if (/\d/.test(formData.fullName)) {
    errors.fullName = 'Name should not contain numbers'
  }

  // Email validation
  if (!formData.email) {
    errors.email = 'Email is required'
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
    errors.email = 'Please enter a valid email address'
  }

  // Phone validation
  const phoneDigits = formData.phone.replace(/\D/g, '')
  if (!formData.phone) {
    errors.phone = 'Phone number is required'
  } else if (phoneDigits.length !== 10) {
    errors.phone = 'Phone number must be 10 digits'
  }

  // Workspace Type validation
  if (!formData.workspaceType) {
    errors.workspaceType = 'Please select a workspace type'
  }

  // Seats validation (if applicable)
  if (
    formData.workspaceType &&
    ['hot-desk', 'dedicated-desk', 'private-cabin'].includes(formData.workspaceType)
  ) {
    if (!formData.seats || formData.seats < 1 || formData.seats > 10) {
      errors.seats = 'Please select number of seats (1-10)'
    }
  }

  // Booking Type validation
  if (!formData.bookingType) {
    errors.bookingType = 'Please select a booking type'
  }

  // Start Date validation
  if (!formData.startDate) {
    errors.startDate = 'Please select a start date'
  } else {
    const startDate = new Date(formData.startDate)
    const today = new Date()
    today.setHours(0, 0, 0, 0)
    if (startDate < today) {
      errors.startDate = 'Start date cannot be in the past'
    }
  }

  // End Date validation (for daily/weekly bookings)
  if (
    formData.bookingType === 'daily' ||
    formData.bookingType === 'weekly' ||
    formData.bookingType === 'monthly'
  ) {
    if (!formData.endDate) {
      errors.endDate = 'Please select an end date'
    } else if (formData.startDate) {
      const startDate = new Date(formData.startDate)
      const endDate = new Date(formData.endDate)
      if (endDate <= startDate) {
        errors.endDate = 'End date must be after start date'
      }
    }
  }

  // Time validation (for hourly/meeting room)
  if (formData.bookingType === 'hourly' || formData.workspaceType === 'meeting-room') {
    if (!formData.startTime) {
      errors.startTime = 'Please select a start time'
    }
    if (!formData.endTime) {
      errors.endTime = 'Please select an end time'
    } else if (formData.startTime && formData.endTime) {
      const start = new Date(`2000-01-01 ${formData.startTime}`)
      const end = new Date(`2000-01-01 ${formData.endTime}`)
      if (end <= start) {
        errors.endTime = 'End time must be after start time'
      }
      // Check business hours (9 AM - 7 PM)
      const startHour = start.getHours()
      const endHour = end.getHours()
      if (startHour < 9 || endHour > 19) {
        errors.startTime = 'Booking hours are 9:00 AM - 7:00 PM'
      }
    }
  }

  // Payment Method validation
  if (!formData.paymentMethod) {
    errors.paymentMethod = 'Please select a payment method'
  }

  // Terms agreement validation
  if (!formData.agreedToTerms) {
    errors.agreedToTerms = 'You must agree to terms and conditions'
  }

  return errors
}

