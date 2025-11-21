'use client'

import Header from '@/components/Header'
import Footer from '@/components/Footer'
import Image from 'next/image'
import Link from 'next/link'
import { useSearchParams } from 'next/navigation'
import { useScrollAnimation } from '@/hooks/useScrollAnimation'

export default function BookingConfirmation() {
  const searchParams = useSearchParams()
  const bookingRef = searchParams.get('ref') || 'NEX-00000000'
  const heroRef = useScrollAnimation()
  const detailsRef = useScrollAnimation()

  const handlePrint = () => {
    window.print()
  }

  const handleDownloadPDF = () => {
    // TODO: Generate and download PDF
    alert('PDF download feature will be available soon!')
  }

  return (
    <main className="min-h-screen">
      <Header />

      {/* Hero Section */}
      <div
        ref={heroRef.ref}
        className={`relative min-h-[60vh] flex flex-col items-center justify-center overflow-hidden transition-all duration-700 ease-out ${
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
          {/* Success Icon */}
          <div className="mb-6">
            <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-full bg-green-500 flex items-center justify-center">
              <svg className="w-12 h-12 sm:w-16 sm:h-16 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
          </div>

          {/* Main Title */}
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-normal text-white text-center tracking-tight mb-4">
            Booking Confirmed!
          </h1>

          {/* Subheading */}
          <p className="text-white text-lg sm:text-xl md:text-2xl font-light text-center">
            Your workspace reservation has been successfully confirmed
          </p>

          {/* Booking Reference */}
          <div className="mt-8 px-6 py-3 bg-white/20 backdrop-blur-lg rounded-full border border-white/30">
            <p className="text-white text-sm sm:text-base">
              Booking Reference: <span className="font-bold">{bookingRef}</span>
            </p>
          </div>
        </div>
      </div>

      {/* Booking Details Section */}
      <section
        ref={detailsRef.ref}
        className={`w-full bg-white py-12 sm:py-16 lg:py-20 px-4 sm:px-6 lg:px-8 transition-all duration-700 ease-out ${
          detailsRef.isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
        }`}
      >
        <div className="max-w-4xl mx-auto">
          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 mb-8 print:hidden">
            <button
              onClick={handlePrint}
              className="flex-1 bg-black text-white rounded-full py-3 text-center font-semibold text-base hover:bg-opacity-90 transition-colors"
            >
              Print Confirmation
            </button>
            <button
              onClick={handleDownloadPDF}
              className="flex-1 border-2 border-black text-black rounded-full py-3 text-center font-semibold text-base hover:bg-black hover:text-white transition-colors"
            >
              Download PDF
            </button>
          </div>

          {/* Booking Details Card */}
          <div className="bg-white rounded-2xl border border-gray-200 shadow-lg p-6 sm:p-8 lg:p-10">
            <h2 className="text-2xl sm:text-3xl font-semibold text-black mb-6">Booking Details</h2>

            <div className="space-y-6">
              {/* Personal Information */}
              <div>
                <h3 className="text-lg font-semibold text-black mb-4">Personal Information</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm sm:text-base">
                  <div>
                    <p className="text-gray-500 mb-1">Full Name</p>
                    <p className="text-black font-medium">[Name from booking]</p>
                  </div>
                  <div>
                    <p className="text-gray-500 mb-1">Email</p>
                    <p className="text-black font-medium">[Email from booking]</p>
                  </div>
                  <div>
                    <p className="text-gray-500 mb-1">Phone</p>
                    <p className="text-black font-medium">[Phone from booking]</p>
                  </div>
                  <div>
                    <p className="text-gray-500 mb-1">Company</p>
                    <p className="text-black font-medium">[Company from booking]</p>
                  </div>
                </div>
              </div>

              {/* Workspace Details */}
              <div className="border-t border-gray-200 pt-6">
                <h3 className="text-lg font-semibold text-black mb-4">Workspace Details</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm sm:text-base">
                  <div>
                    <p className="text-gray-500 mb-1">Workspace Type</p>
                    <p className="text-black font-medium">[Workspace type from booking]</p>
                  </div>
                  <div>
                    <p className="text-gray-500 mb-1">Number of Seats</p>
                    <p className="text-black font-medium">[Seats from booking]</p>
                  </div>
                  <div>
                    <p className="text-gray-500 mb-1">Booking Period</p>
                    <p className="text-black font-medium">[Dates from booking]</p>
                  </div>
                  <div>
                    <p className="text-gray-500 mb-1">Duration</p>
                    <p className="text-black font-medium">[Duration from booking]</p>
                  </div>
                </div>
              </div>

              {/* Payment Information */}
              <div className="border-t border-gray-200 pt-6">
                <h3 className="text-lg font-semibold text-black mb-4">Payment Information</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm sm:text-base">
                  <div>
                    <p className="text-gray-500 mb-1">Payment Method</p>
                    <p className="text-black font-medium">[Payment method from booking]</p>
                  </div>
                  <div>
                    <p className="text-gray-500 mb-1">Total Amount</p>
                    <p className="text-black font-medium text-lg">₹[Total from booking]</p>
                  </div>
                  <div>
                    <p className="text-gray-500 mb-1">Payment Status</p>
                    <p className="text-green-600 font-medium">Pending</p>
                  </div>
                </div>
              </div>

              {/* QR Code Section */}
              <div className="border-t border-gray-200 pt-6">
                <h3 className="text-lg font-semibold text-black mb-4">Check-in QR Code</h3>
                <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6">
                  <div className="w-48 h-48 bg-gray-100 rounded-lg flex items-center justify-center border-2 border-dashed border-gray-300">
                    <p className="text-gray-400 text-sm text-center px-4">
                      QR Code will be generated after payment confirmation
                    </p>
                  </div>
                  <div className="flex-1">
                    <p className="text-sm text-gray-600 mb-2">
                      Present this QR code at reception for check-in. The QR code will be activated after payment confirmation.
                    </p>
                  </div>
                </div>
              </div>

              {/* Important Notes */}
              <div className="border-t border-gray-200 pt-6">
                <h3 className="text-lg font-semibold text-black mb-4">Important Information</h3>
                <ul className="space-y-2 text-sm sm:text-base text-gray-600">
                  <li className="flex items-start gap-2">
                    <svg className="w-5 h-5 text-gray-400 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <span>A confirmation email has been sent to your registered email address.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <svg className="w-5 h-5 text-gray-400 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <span>Please complete payment to confirm your booking. Payment link will be sent via email.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <svg className="w-5 h-5 text-gray-400 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <span>For any queries, contact us at info@nexspace.com or +91 98765 43210</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          {/* CTA Buttons */}
          <div className="mt-8 flex flex-col sm:flex-row gap-4 print:hidden">
            <Link
              href="/booking"
              className="flex-1 bg-black text-white rounded-full py-3 text-center font-semibold text-base hover:bg-opacity-90 transition-colors"
            >
              Book Again
            </Link>
            <Link
              href="/workspace"
              className="flex-1 border-2 border-black text-black rounded-full py-3 text-center font-semibold text-base hover:bg-black hover:text-white transition-colors"
            >
              Explore Workspaces
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}

