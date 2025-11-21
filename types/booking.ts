export type WorkspaceType = 'hot-desk' | 'dedicated-desk' | 'private-cabin' | 'meeting-room' | 'phone-booth'

export type BookingType = 'hourly' | 'daily' | 'weekly' | 'monthly'

export type PaymentMethod = 'online' | 'reception' | 'bank'

export interface BookingFormData {
  fullName: string
  email: string
  phone: string
  company?: string
  workspaceType: WorkspaceType | ''
  seats: number
  bookingType: BookingType
  startDate: string
  endDate?: string
  startTime?: string
  endTime?: string
  addOns: string[]
  specialRequirements?: string
  paymentMethod: PaymentMethod
  agreedToTerms: boolean
}

export interface WorkspaceOption {
  id: WorkspaceType
  name: string
  icon: JSX.Element
  dailyPrice: number
  weeklyPrice?: number
  monthlyPrice: number
  hourlyPrice?: number
  description: string
}

export interface AddOn {
  id: string
  name: string
  price: number
  unit: 'per-page' | 'per-day' | 'per-month'
}

