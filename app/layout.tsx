import type { Metadata, Viewport } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import BackToTop from '@/components/BackToTop'

const inter = Inter({ 
  subsets: ['latin'],
  display: 'swap',
})

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  themeColor: '#000000',
}

export const metadata: Metadata = {
  title: 'NexSpot Coworking Kottayam | Flexible Workspaces, Cabins & Meeting Rooms',
  description: 'NexSpot is a modern coworking space in Kottayam offering flexible desks, private cabins, meeting rooms and high-speed Wi-Fi for freelancers, startups and teams.',
  keywords: [
    'coworking space in Kottayam',
    'office space in Kottayam',
    'shared office Kottayam',
    'private cabins in Kottayam',
    'meeting rooms in Kottayam',
    'startup coworking Kottayam',
    'flexible workspaces Kottayam',
    'coworking Kerala',
    'shared workspace Kottayam',
    'startup office Kottayam',
  ],
  authors: [{ name: 'NexSpot' }],
  creator: 'NexSpot',
  publisher: 'NexSpot',
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
    },
  },
  openGraph: {
    type: 'website',
    locale: 'en_IN',
    url: 'https://nexspot.com',
    siteName: 'NexSpot Coworking Kottayam',
    title: 'NexSpot Coworking Kottayam | Flexible Workspaces, Cabins & Meeting Rooms',
    description: 'NexSpot is a modern coworking space in Kottayam offering flexible desks, private cabins, meeting rooms and high-speed Wi-Fi for freelancers, startups and teams.',
    images: [
      {
        url: '/images/hero-banner.jpg',
        width: 1200,
        height: 630,
        alt: 'NexSpot Coworking Space Kottayam',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'NexSpot Coworking Kottayam | Flexible Workspaces, Cabins & Meeting Rooms',
    description: 'NexSpot is a modern coworking space in Kottayam offering flexible desks, private cabins, meeting rooms and high-speed Wi-Fi for freelancers, startups and teams.',
    images: ['/images/hero-banner.jpg'],
  },
  verification: {
    google: 'your-google-verification-code',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        {children}
        <BackToTop />
      </body>
    </html>
  )
}
