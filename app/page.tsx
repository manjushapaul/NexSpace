import dynamic from 'next/dynamic'
import type { Metadata } from 'next'
import Script from 'next/script'
import Header from '@/components/Header'
import ComingSoonBanner from '@/components/ComingSoonBanner'
import HeroBanner from '@/components/HeroBanner'
import AboutBlock from '@/components/AboutBlock'
import ExploreSpace from '@/components/ExploreSpace'
import Footer from '@/components/Footer'

// Dynamic imports for heavy components (code splitting)
// const TestimonialSlider = dynamic(() => import('@/components/TestimonialSlider'), {
//   loading: () => <div className="w-full bg-[#fafbfc] py-10 lg:pb-8 px-4 sm:px-6 lg:px-8" />,
//   ssr: true,
// })

const QuestionsFAQ = dynamic(() => import('@/components/QuestionsFAQ'), {
  loading: () => <div className="w-full bg-white py-12 sm:py-16 lg:py-20 px-4 sm:px-6 lg:px-8" />,
  ssr: true,
})

export const metadata: Metadata = {
  title: 'NexSpot Coworking Kottayam | Flexible Workspaces, Cabins & Meeting Rooms',
  description: 'NexSpot is a modern coworking space in Kottayam offering flexible desks, private cabins, meeting rooms and high-speed Wi-Fi for freelancers, startups and teams.',
  alternates: {
    canonical: 'https://nexspot.com',
  },
}

// Structured Data for SEO
const structuredData = {
  '@context': 'https://schema.org',
  '@type': 'CoworkingSpace',
  name: 'NexSpot Coworking Kottayam',
  image: 'https://nexspot.com/images/hero-banner.jpg',
  '@id': 'https://nexspot.com',
  url: 'https://nexspot.com',
  telephone: '+91-98765-43210',
  email: 'nexspotcoworking@gmail.com',
  address: {
    '@type': 'PostalAddress',
    streetAddress: 'Near Thiruvathira Temple',
    addressLocality: 'Kottayam',
    addressRegion: 'Kerala',
    postalCode: '686001',
    addressCountry: 'IN',
  },
  geo: {
    '@type': 'GeoCoordinates',
    latitude: 9.5961,
    longitude: 76.5178,
  },
  openingHoursSpecification: [
    {
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
      opens: '09:00',
      closes: '19:00',
    },
  ],
  priceRange: '₹₹',
  description: 'Modern coworking space in Kottayam offering flexible workspaces, private cabins, meeting rooms, and high-speed Wi-Fi. Startup-friendly environment for freelancers, entrepreneurs, and teams.',
  amenityFeature: [
    { '@type': 'LocationFeatureSpecification', name: 'High-Speed Wi-Fi' },
    { '@type': 'LocationFeatureSpecification', name: 'Private Cabins' },
    { '@type': 'LocationFeatureSpecification', name: 'Meeting Rooms' },
    { '@type': 'LocationFeatureSpecification', name: 'Hot Desks' },
    { '@type': 'LocationFeatureSpecification', name: 'Dedicated Desks' },
    { '@type': 'LocationFeatureSpecification', name: 'Air Conditioning' },
    { '@type': 'LocationFeatureSpecification', name: 'Parking' },
    { '@type': 'LocationFeatureSpecification', name: 'Coffee & Tea' },
    { '@type': 'LocationFeatureSpecification', name: '24/7 Access' },
  ],
}

export default function Home() {
  return (
    <>
      <Script
        id="structured-data"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      <main className="min-h-screen">
        <Header />
        <ComingSoonBanner />
        <HeroBanner />
        <AboutBlock />
        <ExploreSpace />
        {/* <TestimonialSlider /> */}
        <QuestionsFAQ />
        <Footer />
      </main>
    </>
  )
}
