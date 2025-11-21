'use client'

import Header from '@/components/Header'
import Footer from '@/components/Footer'
import Image from 'next/image'
import Link from 'next/link'
import { useScrollAnimation } from '@/hooks/useScrollAnimation'

export default function AboutUs() {
  const storyRef = useScrollAnimation()
  const missionRef = useScrollAnimation()
  const differentRef = useScrollAnimation()
  const serveRef = useScrollAnimation()
  const ctaRef = useScrollAnimation()

  const differentCards = [
    {
      id: '1',
      title: 'Community-Driven Culture',
      description: 'A vibrant community of professionals who inspire and support each other.',
      icon: (
        <svg className="w-12 h-12 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
        </svg>
      ),
    },
    {
      id: '2',
      title: 'Premium Amenities',
      description: 'State-of-the-art facilities designed for productivity and comfort.',
      icon: (
        <svg className="w-12 h-12 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
        </svg>
      ),
    },
    {
      id: '3',
      title: 'Flexible Plans',
      description: 'Choose from daily, weekly, or monthly plans that fit your needs.',
      icon: (
        <svg className="w-12 h-12 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
    },
    {
      id: '4',
      title: 'Strategic Location',
      description: 'Centrally located in Kottayam with easy access to all major areas.',
      icon: (
        <svg className="w-12 h-12 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
        </svg>
      ),
    },
  ]

  return (
    <main className="min-h-screen">
      <Header />

      {/* Hero Section */}
      <div className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0 z-0">
          <Image
            src="/images/creative-group-working-startup-using-laptops.jpg"
            alt="Creative group working startup using laptops"
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
            About Us
          </h1>

          {/* Subheading */}
          <p className="text-white text-lg sm:text-xl md:text-2xl font-light mt-6 sm:mt-8 text-center">
            Kottayam&apos;s Premier Collaborative Workspace
          </p>

          {/* Tagline */}
          <p className="text-white text-base sm:text-lg md:text-xl font-light mt-4 text-center">
            Where innovation meets collaboration
          </p>
        </div>
      </div>

      {/* Our Story Section */}
      <section
        ref={storyRef.ref}
        className={`w-full bg-gray-100 py-16 sm:py-20 lg:py-24 px-4 sm:px-6 lg:px-8 transition-all duration-700 ease-out ${
          storyRef.isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
        }`}
      >
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-normal text-black text-center mb-8 sm:mb-12">
            Our Story
          </h2>
          <div className="text-center space-y-4 sm:space-y-6 lg:space-y-8">
            {/* Line 1: "We Created NexSpace To Fill The Gap In" [image] "Kottayam's" */}
            <p className="text-black text-lg sm:text-xl md:text-2xl lg:text-3xl xl:text-4xl 
            font-normal leading-tight flex flex-wrap items-center justify-center gap-2 sm:gap-3">
              <span>We Created NexSpace To Fill The Gap In</span>
              <Image
                src="/images/community-image.jpg"
                alt="Kottayam workspace"
                width={180}
                height={40}
                className="inline-block h-10 w-auto object-cover rounded rotate-[20deg]"
              />
              <span>Kottayam&apos;s</span>
            </p>

            {/* Line 2: "Professional Workspace Ecosystem. Our Mission Is To Foster" */}
            <p className="text-black text-lg sm:text-xl md:text-2xl lg:text-3xl xl:text-4xl
             font-normal leading-tight">
              Professional Workspace Ecosystem. Our Mission Is To Foster
            </p>

            {/* Line 3: "Community, Productivity," [image] "And Innovation." */}
            <p className="text-black text-lg sm:text-xl md:text-2xl lg:text-3xl xl:text-4xl 
            font-normal leading-tight flex flex-wrap items-center justify-center gap-2 sm:gap-3">
              <span>Community, Productivity,</span>
              <Image
                src="/images/creativity-image.jpg"
                alt="Innovation and creativity"
                width={180}
                height={80}
                className="inline-block h-10 w-auto object-cover rounded -rotate-[20deg]"
              />
              <span>And Innovation.</span>
            </p>
          </div>
        </div>
      </section>

      {/* Mission & Vision Section */}
      <section
        ref={missionRef.ref}
        className={`w-full bg-white py-16 sm:py-20 lg:py-24 px-4 sm:px-6 lg:px-8 transition-all duration-700 ease-out ${
          missionRef.isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
        }`}
      >
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
            {/* Mission Card */}
            <div className="bg-white rounded-lg p-6 sm:p-8 lg:p-10 shadow-lg border border-gray-100">
              <h3 className="text-2xl sm:text-3xl lg:text-4xl font-normal text-black mb-4 sm:mb-6">
                Our Mission
              </h3>
              <p className="text-base sm:text-lg lg:text-xl text-gray-700 font-light leading-relaxed">
                To provide an inspiring, comfortable, and collaborative environment for professionals and entrepreneurs in Kottayam.
              </p>
            </div>

            {/* Vision Card */}
            <div className="bg-white rounded-lg p-6 sm:p-8 lg:p-10 shadow-lg border border-gray-100">
              <h3 className="text-2xl sm:text-3xl lg:text-4xl font-normal text-black mb-4 sm:mb-6">
                Our Vision
              </h3>
              <p className="text-base sm:text-lg lg:text-xl text-gray-700 font-light leading-relaxed">
                To become the go-to hub for innovation, networking, and business growth in Kerala.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* What Makes Us Different Section */}
      <section
        ref={differentRef.ref}
        className={`relative w-full py-16 sm:py-20 lg:py-24 px-4 sm:px-6 lg:px-8 transition-all duration-700 ease-out overflow-hidden ${
          differentRef.isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
        }`}
      >
        {/* Background Image */}
        <div className="absolute inset-0 z-0">
          <Image
            src="/images/team-focused-designers-sitting-together-table-with-blueprints-working-project.jpg"
            alt="Team focused designers sitting together at table with blueprints working on project"
            fill
            className="object-cover"
            quality={90}
          />
          {/* Vertical black gradient overlay - dense at top, fades to clear at bottom */}
          <div className="absolute inset-0 bg-gradient-to-b from-black/100 via-black/50 to-black/5 pointer-events-none" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto">
          {/* Section Header */}
          <div className="mb-8 sm:mb-12">
            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-normal text-white">
              What Makes Us Different
            </h2>
          </div>

          {/* Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            {differentCards.map((card) => (
              <div
                key={card.id}
                className="bg-white/20 backdrop-blur-md rounded-2xl p-6 sm:p-8 border border-white/30 shadow-2xl transition-all duration-300 hover:bg-white/25"
              >
                {/* Icon */}
                <div className="flex justify-center mb-4 sm:mb-6">
                  {card.icon}
                </div>

                {/* Card Content */}
                <div className="text-center">
                  <h3 className="text-base sm:text-lg lg:text-xl font-semibold text-white mb-2 sm:mb-3">
                    {card.title}
                  </h3>
                  <p className="text-gray-200 text-sm sm:text-base font-light leading-relaxed">
                    {card.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Who We Serve Section */}
      <section
        ref={serveRef.ref}
        className={`relative w-full bg-black py-20 sm:py-24 lg:py-28 px-4 sm:px-6 lg:px-8 transition-all duration-700 ease-out overflow-hidden ${
          serveRef.isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
        }`}
      >
        {/* Background Image */}
        <div className="absolute inset-0 z-0">
       
          {/* Subtle gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-b from-black/20 to-black/40 pointer-events-none" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto">
          <div className="text-center mb-12 sm:mb-16">
            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-normal text-white mb-4">
              Who We Serve
            </h2>
            <p className="text-lg sm:text-xl text-white font-light">
              Empowering diverse professionals across industries
            </p>
          </div>

          {/* Coin Badges Grid */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 justify-items-center">
            {/* Freelancers & Remote Workers Coin */}
            <div
              className={`bg-white/30 backdrop-blur-2xl rounded-full w-40 h-40 sm:w-48 sm:h-48 lg:w-52 lg:h-52 flex flex-col items-center justify-center pt-6 sm:pt-8 pb-4 sm:pb-6 px-4 border border-white/50 shadow-2xl transition-all duration-300 ease-in-out hover:bg-white/50 hover:backdrop-blur-3xl hover:shadow-2xl hover:scale-105 cursor-pointer ${
                serveRef.isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
              }`}
            >
              <svg
                className="w-10 h-10 sm:w-12 sm:h-12 text-white mb-3 sm:mb-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1}
                  d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                />
              </svg>
              <span className="text-xs sm:text-sm font-semibold text-white text-center leading-tight">
                Freelancers &<br />Remote Workers
              </span>
            </div>

            {/* Startups & Small Teams Coin */}
            <div
              className={`bg-white/30 backdrop-blur-2xl rounded-full w-40 h-40 sm:w-48 sm:h-48 lg:w-52 lg:h-52 flex flex-col items-center justify-center pt-6 sm:pt-8 pb-4 sm:pb-6 px-4 border border-white/50 shadow-2xl transition-all duration-300 ease-in-out hover:bg-white/50 hover:backdrop-blur-3xl hover:shadow-2xl hover:scale-105 cursor-pointer ${
                serveRef.isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
              }`}
            >
              <svg
                className="w-10 h-10 sm:w-12 sm:h-12 text-white mb-3 sm:mb-4"
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
              <span className="text-xs sm:text-sm font-semibold text-white text-center leading-tight">
                Startups &<br />Small Teams
              </span>
            </div>

            {/* Entrepreneurs & Consultants Coin */}
            <div
              className={`bg-white/30 backdrop-blur-2xl rounded-full w-40 h-40 sm:w-48 sm:h-48 lg:w-52 lg:h-52 flex flex-col items-center justify-center pt-6 sm:pt-8 pb-4 sm:pb-6 px-4 border border-white/50 shadow-2xl transition-all duration-300 ease-in-out hover:bg-white/50 hover:backdrop-blur-3xl hover:shadow-2xl hover:scale-105 cursor-pointer ${
                serveRef.isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
              }`}
            >
              <svg
                className="w-10 h-10 sm:w-12 sm:h-12 text-white mb-3 sm:mb-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1}
                  d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                />
              </svg>
              <span className="text-xs sm:text-sm font-semibold text-white text-center leading-tight">
                Entrepreneurs &<br />Consultants
              </span>
            </div>

            {/* Digital Marketers, Designers, Developers Coin */}
            <div
              className={`bg-white/30 backdrop-blur-2xl rounded-full w-40 h-40 sm:w-48 sm:h-48 lg:w-52 lg:h-52 flex flex-col items-center justify-center pt-6 sm:pt-8 pb-4 sm:pb-6 px-4 border border-white/50 shadow-2xl transition-all duration-300 ease-in-out hover:bg-white/50 hover:backdrop-blur-3xl hover:shadow-2xl hover:scale-105 cursor-pointer ${
                serveRef.isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
              }`}
            >
              <svg
                className="w-10 h-10 sm:w-12 sm:h-12 text-white mb-3 sm:mb-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1}
                  d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4"
                />
              </svg>
              <span className="text-xs sm:text-sm font-semibold text-white text-center leading-tight">
                Digital Marketers,<br />Designers, Developers
              </span>
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
              Experience Kottayam&apos;s most inspiring workspace.
            </p>
            <a
              href="/#contact"
              className="block w-full bg-white text-black rounded-full py-3 sm:py-3 text-center font-semibold text-sm sm:text-base hover:bg-opacity-90 transition-colors shadow-md"
            >
              Start Your Collective Journey
            </a>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}

