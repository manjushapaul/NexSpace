'use client'

import Header from '@/components/Header'
import Footer from '@/components/Footer'
import Image from 'next/image'
import Link from 'next/link'
import { useScrollAnimation } from '@/hooks/useScrollAnimation'
import { useState, useEffect, useMemo, useCallback } from 'react'

interface WorkspaceCard {
  id: string
  title: string
  description: string
  price: string
  image: string
  tags: {
    label: string
    icon: string
  }[]
  features: string[]
}

const workspaces: WorkspaceCard[] = [
  {
    id: '1',
    title: 'Hot Desks',
    description: 'Flexible seating in our open collaborative area. Perfect for freelancers and remote workers.',
    price: '₹200/Day',
    image: '/images/space-1.jpg',
    tags: [
      { label: '75 Mbps', icon: 'wifi' },
      { label: 'Flexible', icon: 'clock' },
      { label: '₹200/Day', icon: 'currency' },
    ],
    features: [
      'High-speed WiFi',
      'Power outlets at every desk',
      'Access to common areas',
      'Daily/weekly/monthly plans',
    ],
  },
  {
    id: '2',
    title: 'Dedicated Desks',
    description: 'Your own desk in a shared office environment. Leave your setup and come back anytime.',
    price: '₹5,000/Month',
    image: '/images/space-2.jpg',
    tags: [
      { label: '75 Mbps', icon: 'wifi' },
      { label: 'Reserved', icon: 'lock' },
      { label: '₹5,000/Month', icon: 'currency' },
    ],
    features: [
      'Personal lockable drawer',
      'Reserved desk space',
      '24/7 access',
      'Name plate included',
    ],
  },
  {
    id: '3',
    title: 'Private Cabins',
    description: 'Quiet, enclosed workspace for small teams. Ideal for focused work and privacy.',
    price: '₹12,000/Month',
    image: '/images/space-3.jpg',
    tags: [
      { label: '75 Mbps', icon: 'wifi' },
      { label: '2-3 Seats', icon: 'users' },
      { label: '₹12,000/Month', icon: 'currency' },
    ],
    features: [
      'Lockable door',
      'Whiteboard included',
      'Natural lighting',
      'Customizable setup',
    ],
  },
  {
    id: '4',
    title: 'Meeting Rooms',
    description: 'Professional meeting spaces with modern amenities. Book by the hour.',
    price: '₹500/Hour',
    image: '/images/space-1.jpg',
    tags: [
      { label: 'Smart TV', icon: 'tv' },
      { label: '6-8 Seats', icon: 'users' },
      { label: '₹500/Hour', icon: 'currency' },
    ],
    features: [
      'Video conferencing setup',
      'Projector/Smart TV',
      'Whiteboard & markers',
      'Complimentary refreshments',
    ],
  },
  {
    id: '5',
    title: 'Phone Booths',
    description: 'Private, soundproof booths for calls and video meetings.',
    price: 'Free for Members',
    image: '/images/space-2.jpg',
    tags: [
      { label: 'Soundproof', icon: 'volume' },
      { label: '1 Person', icon: 'user' },
      { label: 'Free for Members', icon: 'gift' },
    ],
    features: [
      'Acoustic insulation',
      'Ventilation system',
      'Power outlet & USB',
      'First-come basis',
    ],
  },
  {
    id: '6',
    title: 'Event Space',
    description: 'Host workshops, training sessions, or networking events in our flexible venue.',
    price: '₹15,000/Day',
    image: '/images/space-3.jpg',
    tags: [
      { label: '100+ Seats', icon: 'users' },
      { label: 'Full Day', icon: 'clock' },
      { label: '₹15,000/Day', icon: 'currency' },
    ],
    features: [
      'Flexible seating arrangements',
      'AV equipment',
      'Catering options',
      'Dedicated support staff',
    ],
  },
]

const amenities = [
  {
    id: '1',
    title: 'High-speed WiFi',
    description: '75 Mbps internet connection',
    icon: (
      <svg className="w-12 h-12 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M8.111 16.404a5.5 5.5 0 017.778 0M12 20h.01m-7.08-7.071c3.904-3.905 10.236-3.905 14.141 0M1.394 9.393c5.857-5.857 15.355-5.857 21.213 0" />
      </svg>
    ),
  },
  {
    id: '2',
    title: 'Free Coffee & Tea',
    description: 'Complimentary refreshments',
    icon: (
      <svg className="w-12 h-12 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M5 11h14M5 11a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v3a2 2 0 01-2 2M5 11v6a2 2 0 002 2h10a2 2 0 002-2v-6m-9 0V9a2 2 0 012-2h2a2 2 0 012 2v2" />
      </svg>
    ),
  },
  {
    id: '3',
    title: 'Printing & Scanning',
    description: 'Professional printing services',
    icon: (
      <svg className="w-12 h-12 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z" />
      </svg>
    ),
  },
  {
    id: '4',
    title: '24/7 Access',
    description: 'Round-the-clock availability',
    icon: (
      <svg className="w-12 h-12 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
  },
  {
    id: '5',
    title: 'Air Conditioning',
    description: 'Climate-controlled environment',
    icon: (
      <svg className="w-12 h-12 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z" />
      </svg>
    ),
  },
  {
    id: '6',
    title: 'Parking Available',
    description: 'Convenient parking facilities',
    icon: (
      <svg className="w-12 h-12 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M8 14v3m4-3v3m4-3v3M3 21h18M3 10h18M3 7l9-4 9 4M4 10h16v11H4V10z" />
      </svg>
    ),
  },
  {
    id: '7',
    title: 'Reception Services',
    description: 'Professional front desk support',
    icon: (
      <svg className="w-12 h-12 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
      </svg>
    ),
  },
  {
    id: '8',
    title: 'Community Events',
    description: 'Networking and social gatherings',
    icon: (
      <svg className="w-12 h-12 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
      </svg>
    ),
  },
]

const faqData = [
  {
    id: '1',
    number: '01',
    question: "What's included in membership?",
    answer: 'All memberships include high-speed WiFi, access to common areas, printing services, complimentary coffee and tea, and participation in community events. Dedicated desk and private cabin members also get 24/7 access and personal storage.',
  },
  {
    id: '2',
    number: '02',
    question: 'Can I book meeting rooms separately?',
    answer: 'Yes, meeting rooms can be booked separately by the hour. Members receive discounted rates, while non-members can book at standard hourly rates. Advance booking is recommended, especially during peak hours.',
  },
  {
    id: '3',
    number: '03',
    question: 'Are there day passes available?',
    answer: 'Yes, we offer day passes starting at ₹200 per day for hot desk access. Day passes include WiFi, access to common areas, and complimentary refreshments. Perfect for occasional users or those trying out our space.',
  },
  {
    id: '4',
    number: '04',
    question: 'What are the access hours?',
    answer: 'Hot desk users have access from 9 AM to 6 PM. Dedicated desk and private cabin members enjoy 24/7 access. Meeting rooms and phone booths are available during business hours, with extended hours for members.',
  },
  {
    id: '5',
    number: '05',
    question: 'Is parking available?',
    answer: 'Yes, we provide parking facilities for all members and visitors. Parking is included with dedicated desk and private cabin memberships. Day pass users can access parking on a first-come, first-served basis.',
  },
]

export default function Workspace() {
  const heroRef = useScrollAnimation()
  const workspaceRef = useScrollAnimation()
  const amenitiesRef = useScrollAnimation()
  const bookingRef = useScrollAnimation()
  const ctaRef = useScrollAnimation()
  const faqRef = useScrollAnimation()
  const [openFaq, setOpenFaq] = useState<string | null>('1')
  const [selectedWorkspace, setSelectedWorkspace] = useState<WorkspaceCard | null>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)

  const toggleFaq = useCallback((id: string) => {
    setOpenFaq((prev) => (prev === id ? null : id))
  }, [])

  const openModal = useCallback((workspace: WorkspaceCard) => {
    setSelectedWorkspace(workspace)
    // Trigger animation after a tiny delay to ensure DOM is ready
    setTimeout(() => {
      setIsModalOpen(true)
    }, 10)
    document.body.style.overflow = 'hidden'
  }, [])

  const closeModal = useCallback(() => {
    setIsModalOpen(false)
    // Wait for animation to complete before removing from DOM
    setTimeout(() => {
      setSelectedWorkspace(null)
      document.body.style.overflow = 'unset'
    }, 300)
  }, [])

  // Reset animation state when workspace changes
  useEffect(() => {
    if (selectedWorkspace) {
      setIsModalOpen(false)
      setTimeout(() => {
        setIsModalOpen(true)
      }, 10)
    }
  }, [selectedWorkspace])

  const getTagIcon = useCallback((iconType: string) => {
    switch (iconType) {
      case 'wifi':
        return (
          <svg className="w-3.5 h-3.5 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.111 16.404a5.5 5.5 0 017.778 0M12 20h.01m-7.08-7.071c3.904-3.905 10.236-3.905 14.141 0M1.394 9.393c5.857-5.857 15.355-5.857 21.213 0" />
          </svg>
        )
      case 'clock':
        return (
          <svg className="w-3.5 h-3.5 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        )
      case 'currency':
        return (
          <svg className="w-3.5 h-3.5 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        )
      case 'lock':
        return (
          <svg className="w-3.5 h-3.5 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
          </svg>
        )
      case 'users':
        return (
          <svg className="w-3.5 h-3.5 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
          </svg>
        )
      case 'tv':
        return (
          <svg className="w-3.5 h-3.5 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
          </svg>
        )
      case 'volume':
        return (
          <svg className="w-3.5 h-3.5 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.536 8.464a5 5 0 010 7.072m2.828-9.9a9 9 0 010 12.728M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z" />
          </svg>
        )
      case 'user':
        return (
          <svg className="w-3.5 h-3.5 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
          </svg>
        )
      case 'gift':
        return (
          <svg className="w-3.5 h-3.5 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v13m0-13V6a2 2 0 112 2h-2zm0 0V5.5A2.5 2.5 0 109.5 8H12zm-7 4h14M5 12a2 2 0 110-4h14a2 2 0 110 4M5 12v7a2 2 0 002 2h10a2 2 0 002-2v-7" />
          </svg>
        )
      default:
        return null
    }
  }, [])

  return (
    <main className="min-h-screen">
      <Header />

      {/* Hero Section */}
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
             Workspaces
          </h1>

          {/* Subheading */}
          <p className="text-white text-lg sm:text-xl md:text-2xl font-light mt-6 sm:mt-8 text-center">
            Find the perfect space for your productivity needs
          </p>
        </div>
      </div>

      {/* Workspace Types Grid Section */}
      <section
        id="our-workspace-options"
        ref={workspaceRef.ref}
        className={`w-full bg-white pt-10 pb-6 px-4 sm:px-6 lg:px-8 transition-all duration-700 ease-out ${
          workspaceRef.isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
        }`}
      >
        <div className="max-w-7xl mx-auto">
          {/* Section Header */}
          <div className="mb-8 sm:mb-12">
            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-normal text-black mb-4">
              Our Workspace Options
            </h2>
            <p className="text-lg sm:text-xl text-gray-600 font-light">
              Choose from flexible options designed for every work style
            </p>
          </div>

          {/* Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 lg:gap-3">
            {workspaces.map((workspace) => (
              <div
                key={workspace.id}
                className="bg-white rounded-lg overflow-hidden transition-all duration-300 cursor-pointer"
                onClick={() => openModal(workspace)}
              >
                {/* Image Container */}
                <div className="relative w-full aspect-[4/3] overflow-hidden rounded-2xl group">
                  <Image
                    src={workspace.image}
                    alt={`${workspace.title} workspace`}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    className="object-cover group-hover:scale-105 transition-transform duration-300 ease-in-out"
                  />
                  
                  {/* Dark Gradient Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-b 
                  from-black/0 via-black/20 to-black/60 pointer-events-none" />
                  
                  {/* Floating Badges */}
                  <div className="absolute top-3 left-3 flex flex-wrap gap-2 z-10">
                    {workspace.tags.map((tag, index) => (
                      <div key={index} className="bg-gray-100 rounded-full px-2.5 py-1.5 flex items-center gap-1.5">
                        {getTagIcon(tag.icon)}
                        <span className="text-xs font-medium text-black">
                          {tag.label}
                        </span>
                      </div>
                    ))}
                  </div>

                  {/* Title and Price - Bottom Left */}
                  <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-5 z-10">
                    <h3 className="text-lg sm:text-xl font-semibold text-white mb-1">
                      {workspace.title}
                    </h3>
                    <p className="text-base sm:text-lg text-white/90 font-medium">
                      {workspace.price}
                    </p>
                  </div>

                  {/* Hover Overlay - Center */}
                  <div className="absolute inset-0 bg-black/40 backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center z-20 pointer-events-none">
                    <div className="text-center">
                      <svg
                        className="w-12 h-12 sm:w-16 sm:h-16 text-white mx-auto mb-3"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={.5}
                          d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                        />
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={.5}
                          d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                        />
                      </svg>
                      <p className="text-white text-sm sm:text-base font-medium">
                        Click for more details
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Amenities Section */}
      <section
        ref={amenitiesRef.ref}
        className={`relative w-full py-16 sm:py-20 lg:py-24 px-4 sm:px-6 lg:px-8 transition-all duration-700 ease-out overflow-hidden ${
          amenitiesRef.isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
        }`}
      >
        {/* Background Image */}
        <div className="absolute inset-0 z-0">
          <Image
            src="/images/team-focused-designers-sitting-together-table-with-blueprints-working-project.jpg"
            alt="Team working together"
            fill
            className="object-cover"
            quality={90}
          />
          {/* Dark overlay */}
          <div className="absolute inset-0 bg-black/40 pointer-events-none" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto">
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-normal text-white mb-8 sm:mb-12">
            Included Amenities
          </h2>

          {/* Amenities Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            {amenities.map((amenity) => (
              <div
                key={amenity.id}
                className="bg-white/20 backdrop-blur-xl rounded-2xl p-6 sm:p-8 border border-white/30 shadow-xl transition-all duration-300 hover:bg-white/30 hover:shadow-2xl hover:scale-105 cursor-pointer"
              >
                <div className="flex justify-center mb-4 sm:mb-6">
                  {amenity.icon}
                </div>
                <h3 className="text-lg sm:text-xl font-semibold text-white text-center mb-2">
                  {amenity.title}
                </h3>
                <p className="text-sm sm:text-base text-gray-200 text-center">
                  {amenity.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How to Book Section */}
      <section
        ref={bookingRef.ref}
        className={`w-full bg-gray-100 py-16 sm:py-20 lg:py-24 px-4 sm:px-6 lg:px-8 transition-all duration-700 ease-out ${
          bookingRef.isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
        }`}
      >
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-normal text-black mb-8 sm:mb-12 text-center">
            How to Get Started
          </h2>

          {/* Steps Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
            {/* Step 1 */}
            <div className="bg-white rounded-lg p-6 sm:p-8 shadow-lg border border-gray-100">
              <div className="flex items-center gap-4 mb-4">
                <div className="w-12 h-12 rounded-full bg-black text-white flex items-center justify-center text-xl font-bold">
                  1
                </div>
                <h3 className="text-2xl sm:text-3xl font-normal text-black">
                  Choose Your Space
                </h3>
              </div>
              <p className="text-base sm:text-lg text-gray-700 font-light leading-relaxed">
                Browse options and select what fits your needs
              </p>
            </div>

            {/* Step 2 */}
            <div className="bg-white rounded-lg p-6 sm:p-8 shadow-lg border border-gray-100">
              <div className="flex items-center gap-4 mb-4">
                <div className="w-12 h-12 rounded-full bg-black text-white flex items-center justify-center text-xl font-bold">
                  2
                </div>
                <h3 className="text-2xl sm:text-3xl font-normal text-black">
                  Book Online or Visit
                </h3>
              </div>
              <p className="text-base sm:text-lg text-gray-700 font-light leading-relaxed">
                Reserve online or schedule a tour
              </p>
            </div>

            {/* Step 3 */}
            <div className="bg-white rounded-lg p-6 sm:p-8 shadow-lg border border-gray-100">
              <div className="flex items-center gap-4 mb-4">
                <div className="w-12 h-12 rounded-full bg-black text-white flex items-center justify-center text-xl font-bold">
                  3
                </div>
                <h3 className="text-2xl sm:text-3xl font-normal text-black">
                  Start Working
                </h3>
              </div>
              <p className="text-base sm:text-lg text-gray-700 font-light leading-relaxed">
                Move in and enjoy your workspace
              </p>
            </div>
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
              Ready to Join NexSpace?
            </h2>
            <p className="text-white text-base sm:text-lg font-light text-center mb-6 sm:mb-8">
              Book your workspace today
            </p>
            <div className="space-y-3 sm:space-y-4">
              <a
                href="#schedule-tour"
                className="block w-full bg-white text-black rounded-full py-3 sm:py-3 text-center font-semibold text-sm sm:text-base hover:bg-opacity-90 transition-colors shadow-md"
              >
                Schedule a Tour
              </a>
              <Link
                href="/contact#send-us-a-message"
                className="block w-full text-center text-white text-sm sm:text-base font-medium hover:opacity-70 transition-opacity"
              >
                Contact Us
              </Link>
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
          {/* Section Header */}
          <div className="mb-8 sm:mb-12">
            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-normal text-black">
              Workspace FAQs
            </h2>
          </div>

          {/* FAQ List */}
          <div className="space-y-0">
            {faqData.map((item, index) => {
              const isOpen = openFaq === item.id
              const isLast = index === faqData.length - 1

              return (
                <div key={item.id}>
                  <button
                    onClick={() => toggleFaq(item.id)}
                    className="w-full py-4 sm:py-5 lg:py-6 flex items-start sm:items-center gap-4 sm:gap-6 text-left hover:opacity-80 transition-opacity focus:outline-none rounded-sm"
                    aria-expanded={isOpen}
                  >
                    {/* Question Number */}
                    <span className="text-base sm:text-lg lg:text-xl font-bold text-black flex-shrink-0 min-w-[2.5rem] sm:min-w-[3rem]">
                      {item.number}.
                    </span>

                    {/* Question Text */}
                    <span className="text-base sm:text-lg lg:text-xl font-semibold text-black flex-grow">
                      {item.question}
                    </span>

                    {/* Arrow Icon */}
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

                  {/* Answer Section */}
                  <div
                    className={`overflow-hidden transition-all duration-300 ease-in-out ${
                      isOpen ? 'max-h-[1000px] opacity-100' : 'max-h-0 opacity-0'
                    }`}
                  >
                    <div className="pl-0 sm:pl-14 lg:pl-20 pr-0 sm:pr-16 lg:pr-20 pb-4 sm:pb-5 lg:pb-6">
                      <p className="text-sm sm:text-xs lg:text-base text-gray-500 font-normal leading-relaxed">
                        {item.answer}
                      </p>
                    </div>
                  </div>

                  {/* Divider */}
                  {!isLast && (
                    <div className="border-b border-gray-200" aria-hidden="true" />
                  )}
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Modal Popup */}
      {selectedWorkspace && (
        <div
          className={`fixed inset-0 z-[100] flex items-center justify-center p-4 transition-opacity duration-300 ${
            isModalOpen ? 'opacity-100' : 'opacity-0'
          }`}
          onClick={closeModal}
        >
          {/* Backdrop */}
          <div
            className={`absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity duration-300 ${
              isModalOpen ? 'opacity-100' : 'opacity-0'
            }`}
            onClick={closeModal}
          />

          {/* Modal Content */}
          <div
            className={`relative z-10 bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto shadow-2xl transition-all duration-300 ${
              isModalOpen
                ? 'opacity-100 scale-100 translate-y-0'
                : 'opacity-0 scale-95 translate-y-4'
            }`}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button
              onClick={closeModal}
              className="absolute top-4 right-4 z-20 text-gray-600 hover:text-black transition-colors p-2"
              aria-label="Close modal"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>

            {/* Modal Body */}
            <div className="flex flex-col lg:flex-row">
              {/* Image */}
              <div className="relative w-full lg:w-1/2 h-64 lg:h-auto lg:min-h-[500px]">
                <Image
                  src={selectedWorkspace.image}
                  alt={`${selectedWorkspace.title} workspace`}
                  fill
                  className="object-cover rounded-t-2xl lg:rounded-l-2xl lg:rounded-tr-none"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
              </div>

              {/* Content */}
              <div className="flex-1 p-6 sm:p-8 lg:p-10">
                <h2 className="text-3xl sm:text-4xl font-semibold text-black mb-4">
                  {selectedWorkspace.title}
                </h2>
                <p className="text-xl sm:text-2xl text-gray-400 font-medium mb-6">
                  {selectedWorkspace.price}
                </p>
                <p className="text-base sm:text-lg text-gray-600 leading-relaxed mb-6">
                  {selectedWorkspace.description}
                </p>
                
                <h3 className="text-lg sm:text-xl font-semibold text-black mb-4">
                  Features
                </h3>
                <ul className="text-sm sm:text-base text-gray-500 space-y-2 mb-8">
                  {selectedWorkspace.features.map((feature, index) => (
                    <li key={index} className="flex items-start gap-2">
                      <svg className="w-5 h-5 text-gray-400 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      {feature}
                    </li>
                  ))}
                </ul>

                <div className="flex flex-col sm:flex-row gap-4">
                  <Link
                    href="/booking"
                    className="flex-1 bg-black text-white rounded-full py-3 text-center font-semibold text-base hover:bg-opacity-90 transition-colors"
                    onClick={(e) => {
                      e.stopPropagation()
                      closeModal()
                    }}
                  >
                    Book Now
                  </Link>
                  <Link
                    href="/contact#send-us-a-message"
                    className="flex-1 border-2 border-black text-black rounded-full py-3 text-center font-semibold text-base hover:bg-black hover:text-white transition-colors"
                    onClick={(e) => {
                      e.stopPropagation()
                      closeModal()
                    }}
                  >
                    Contact Us
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      <Footer />
    </main>
  )
}

