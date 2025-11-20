'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useScrollAnimation } from '@/hooks/useScrollAnimation'

interface SpaceCard {
  id: string
  title: string
  price: string
  image: string
  wifi: string
  seats: string
  area: string
}

const spaces: SpaceCard[] = [
  {
    id: '1',
    title: 'Ambarukmo Space',
    price: '₹5,400.55 / Day',
    image: '/space-1.jpg',
    wifi: '75 Mbps',
    seats: '50 Seat',
    area: '100 m²',
  },
  {
    id: '2',
    title: 'Commodities Space',
    price: '₹3000.00 / Day',
    image: '/space-2.jpg',
    wifi: '75 Mbps',
    seats: '50 Seat',
    area: '100 m²',
  },
  {
    id: '3',
    title: 'Equity Work & Cafe',
    price: '₹8000.80 / Day',
    image: '/space-3.jpg',
    wifi: '75 Mbps',
    seats: '50 Seat',
    area: '100 m²',
  },
]

export default function ExploreSpace() {
  const { ref, isVisible } = useScrollAnimation()

  return (
    <section
      ref={ref}
      className={`w-full bg-white pt-10 pb-6 px-4 sm:px-6 lg:px-8 transition-all duration-700 ease-out ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
      }`}
    >
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 sm:mb-12 gap-4">
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-normal text-black">
            Explore Space
          </h2>
          <Link
            href="/spaces"
            className="text-black text-base sm:text-lg font-medium hover:opacity-70 transition-opacity flex items-center gap-2"
          >
            See More
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 5l7 7-7 7"
              />
            </svg>
          </Link>
        </div>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 lg:gap-3">
          {spaces.map((space) => (
            <div
              key={space.id}
              className="bg-white rounded-lg overflow-hidden  transition-all duration-300"
            >
              {/* Image Container */}
              <div className="relative w-full aspect-[3/4] overflow-hidden rounded-2xl group">
                <Image
                  src={space.image}
                  alt={`${space.title} workspace`}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  className="object-cover group-hover:scale-105 transition-transform duration-300 ease-in-out"
                />
                
                {/* Floating Badges */}
                <div className="absolute top-3 left-3 flex flex-wrap gap-2 z-10">
                  {/* WiFi Badge */}
                  <div className="bg-gray-100 rounded-full px-2.5 py-1.5 flex items-center gap-1.5">
                    <svg
                      className="w-3.5 h-3.5 text-black"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      aria-hidden="true"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M8.111 16.404a5.5 5.5 0 017.778 0M12 20h.01m-7.08-7.071c3.904-3.905 10.236-3.905 14.141 0M1.394 9.393c5.857-5.857 15.355-5.857 21.213 0"
                      />
                    </svg>
                    <span className="text-xs font-medium text-black">
                      {space.wifi}
                    </span>
                  </div>

                  {/* Seats Badge */}
                  <div className="bg-gray-100 rounded-full px-2.5 py-1.5 flex items-center gap-1.5">
                    <svg
                      className="w-3.5 h-3.5 text-black"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      aria-hidden="true"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                      />
                    </svg>
                    <span className="text-xs font-medium text-black">
                      {space.seats}
                    </span>
                  </div>

                  {/* Area Badge */}
                  <div className="bg-gray-100 rounded-full px-2.5 py-1.5 flex items-center gap-1.5">
                    <svg
                      className="w-3.5 h-3.5 text-black"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      aria-hidden="true"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M4 8h16M4 8v8h16V8M4 8V4h16v4"
                      />
                    </svg>
                    <span className="text-xs font-medium text-black">
                      {space.area}
                    </span>
                  </div>
                </div>
              </div>

              {/* Card Content */}
              <div className="py-2 sm:py-3">
                <h3 className="text-base sm:text-base lg:text-base font-semibold text-black">
                  {space.title}
                </h3>
                <p className="text-gray-400 text-base sm:text-base lg:text-base font-medium">
                  {space.price}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
