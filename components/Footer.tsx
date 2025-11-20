'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { useScrollAnimation } from '@/hooks/useScrollAnimation'

export default function Footer() {
  const [showBackToTop, setShowBackToTop] = useState(false)
  const { ref, isVisible } = useScrollAnimation()

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY >= 100) {
        setShowBackToTop(true)
      } else {
        setShowBackToTop(false)
      }
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    })
  }

  const sitemapLinks = [
    { href: '#about', label: 'About' },
    { href: '#workspace', label: 'Workspace' },
    { href: '#review', label: 'Review' },
  ]

  const communityLinks = [
    { href: '#faq', label: 'FAQ' },
    { href: '#twitter', label: 'Twitter' },
    { href: '#facebook', label: 'Facebook' },
  ]

  const socialLinks = [
    { href: '#instagram', label: 'Instagram' },
    { href: '#twitter', label: 'Twitter' },
    { href: '#facebook', label: 'Facebook' },
  ]

  return (
    <footer
      ref={ref}
      className={`w-full bg-black text-white transition-all duration-700 ease-out ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 lg:py-16">
        {/* Top Section - Logo and Book Now */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 sm:mb-8 gap-4">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white">
            NEXSPACE®
          </h2>
          <Link
            href="#book-now"
            className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white underline hover:opacity-80 transition-opacity"
            aria-label="Book now"
          >
            Book Now
          </Link>
        </div>

        {/* Divider */}
        <div className="border-b border-gray-600 mb-8 sm:mb-12" />

        {/* Three Columns */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 sm:gap-12 mb-8 sm:mb-12">
          {/* Sitemap Column */}
          <div>
            <h3 className="text-base sm:text-lg font-bold text-white mb-4 sm:mb-6">
              Sitemap
            </h3>
            <ul className="space-y-3 sm:space-y-4">
              {sitemapLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm sm:text-base text-gray-400 hover:text-white transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Community Column */}
          <div>
            <h3 className="text-base sm:text-lg font-bold text-white mb-4 sm:mb-6">
              Community
            </h3>
            <ul className="space-y-3 sm:space-y-4">
              {communityLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm sm:text-base text-gray-400 hover:text-white transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Social Column */}
          <div>
            <h3 className="text-base sm:text-lg font-bold text-white mb-4 sm:mb-6">
              Social
            </h3>
            <ul className="space-y-3 sm:space-y-4">
              {socialLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm sm:text-base text-gray-400 hover:text-white transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom Row - Copyright and Back to Top */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 pt-6 sm:pt-8 border-t border-gray-800">
          <p className="text-xs sm:text-sm text-gray-400">
            NEXSPACE© 2025
          </p>
          <button
            onClick={scrollToTop}
            className={`text-xs sm:text-sm text-gray-400 hover:text-white transition-all duration-300 inline-flex items-center gap-1 ${
              showBackToTop ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2 pointer-events-none'
            }`}
            aria-label="Back to top"
          >
            Back To Top
            <svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M5 10l7-7m0 0l7 7m-7-7v18"
              />
            </svg>
          </button>
        </div>
      </div>
    </footer>
  )
}

