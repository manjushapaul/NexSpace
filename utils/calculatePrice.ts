import { BookingFormData, WorkspaceOption, AddOn } from '@/types/booking'

const workspaceOptions: Record<string, WorkspaceOption> = {
  'hot-desk': {
    id: 'hot-desk',
    name: 'Hot Desk',
    icon: <></>,
    dailyPrice: 200,
    weeklyPrice: 1000,
    monthlyPrice: 4000,
    description: 'Flexible seating in open area',
  },
  'dedicated-desk': {
    id: 'dedicated-desk',
    name: 'Dedicated Desk',
    icon: <></>,
    dailyPrice: 250,
    monthlyPrice: 5000,
    description: 'Your own reserved desk',
  },
  'private-cabin': {
    id: 'private-cabin',
    name: 'Private Cabin',
    icon: <></>,
    dailyPrice: 600,
    monthlyPrice: 12000,
    description: '2-3 seater private office',
  },
  'meeting-room': {
    id: 'meeting-room',
    name: 'Meeting Room',
    icon: <></>,
    hourlyPrice: 500,
    dailyPrice: 3000,
    monthlyPrice: 0,
    description: 'Professional meeting space',
  },
  'phone-booth': {
    id: 'phone-booth',
    name: 'Phone Booth',
    icon: <></>,
    dailyPrice: 0,
    monthlyPrice: 0,
    description: 'Free for members',
  },
}

const addOns: Record<string, AddOn> = {
  printing: {
    id: 'printing',
    name: 'Printing Services',
    price: 5,
    unit: 'per-page',
  },
  locker: {
    id: 'locker',
    name: 'Locker Rental',
    price: 500,
    unit: 'per-month',
  },
  refreshments: {
    id: 'refreshments',
    name: 'Refreshments',
    price: 100,
    unit: 'per-day',
  },
  parking: {
    id: 'parking',
    name: 'Parking Spot',
    price: 100,
    unit: 'per-day',
  },
  '24-7-access': {
    id: '24-7-access',
    name: '24/7 Access',
    price: 1000,
    unit: 'per-month',
  },
}

export function calculateDuration(startDate: string, endDate?: string, bookingType?: string): number {
  if (!startDate) return 0

  if (bookingType === 'hourly') {
    return 1 // For hourly, duration is calculated separately
  }

  if (!endDate) {
    if (bookingType === 'daily') return 1
    if (bookingType === 'weekly') return 7
    if (bookingType === 'monthly') return 30
    return 1
  }

  const start = new Date(startDate)
  const end = new Date(endDate)
  const diffTime = Math.abs(end.getTime() - start.getTime())
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)) + 1
  return diffDays
}

export function calculateBasePrice(
  workspaceType: string,
  bookingType: BookingFormData['bookingType'],
  duration: number,
  startTime?: string,
  endTime?: string
): number {
  if (!workspaceType || !workspaceOptions[workspaceType]) return 0

  const workspace = workspaceOptions[workspaceType]

  if (bookingType === 'hourly' && workspace.hourlyPrice) {
    if (startTime && endTime) {
      const start = new Date(`2000-01-01 ${startTime}`)
      const end = new Date(`2000-01-01 ${endTime}`)
      const hours = Math.ceil((end.getTime() - start.getTime()) / (1000 * 60 * 60))
      return workspace.hourlyPrice * Math.max(1, hours)
    }
    return workspace.hourlyPrice
  }

  if (bookingType === 'daily') {
    return workspace.dailyPrice * duration
  }

  if (bookingType === 'weekly') {
    const weeks = Math.ceil(duration / 7)
    return workspace.weeklyPrice ? workspace.weeklyPrice * weeks : workspace.dailyPrice * duration
  }

  if (bookingType === 'monthly') {
    const months = Math.ceil(duration / 30)
    return workspace.monthlyPrice * months
  }

  return 0
}

export function calculateAddOnsPrice(
  addOnsList: string[],
  bookingType: BookingFormData['bookingType'],
  duration: number
): number {
  let total = 0

  addOnsList.forEach((addOnId) => {
    const addOn = addOns[addOnId]
    if (!addOn) return

    if (addOn.unit === 'per-page') {
      // For printing, assume 1 page per booking
      total += addOn.price
    } else if (addOn.unit === 'per-day') {
      total += addOn.price * duration
    } else if (addOn.unit === 'per-month') {
      const months = Math.ceil(duration / 30)
      total += addOn.price * months
    }
  })

  return total
}

export function calculateTotalPrice(formData: BookingFormData): {
  basePrice: number
  addOnsPrice: number
  subtotal: number
  gst: number
  total: number
  breakdown: {
    workspace: string
    duration: string
    basePrice: number
    addOns: Array<{ name: string; price: number }>
    subtotal: number
    gst: number
    total: number
  }
} {
  const duration = calculateDuration(formData.startDate, formData.endDate, formData.bookingType)
  const basePrice = calculateBasePrice(
    formData.workspaceType,
    formData.bookingType,
    duration,
    formData.startTime,
    formData.endTime
  )
  const addOnsPrice = calculateAddOnsPrice(formData.addOns, formData.bookingType, duration)
  const subtotal = basePrice + addOnsPrice
  const gst = subtotal * 0.18
  const total = subtotal + gst

  const addOnsBreakdown = formData.addOns.map((id) => {
    const addOn = addOns[id]
    if (!addOn) return { name: '', price: 0 }
    const price = addOn.unit === 'per-page' ? addOn.price : addOn.unit === 'per-day' ? addOn.price * duration : addOn.price * Math.ceil(duration / 30)
    return { name: addOn.name, price }
  }).filter((item) => item.name)

  let durationText = ''
  if (formData.bookingType === 'hourly') {
    durationText = formData.startTime && formData.endTime ? `${formData.startTime} - ${formData.endTime}` : '1 hour'
  } else if (formData.bookingType === 'daily') {
    durationText = duration === 1 ? '1 day' : `${duration} days`
  } else if (formData.bookingType === 'weekly') {
    const weeks = Math.ceil(duration / 7)
    durationText = weeks === 1 ? '1 week' : `${weeks} weeks`
  } else if (formData.bookingType === 'monthly') {
    const months = Math.ceil(duration / 30)
    durationText = months === 1 ? '1 month' : `${months} months`
  }

  return {
    basePrice,
    addOnsPrice,
    subtotal,
    gst,
    total,
    breakdown: {
      workspace: workspaceOptions[formData.workspaceType]?.name || '',
      duration: durationText,
      basePrice,
      addOns: addOnsBreakdown,
      subtotal,
      gst,
      total,
    },
  }
}

