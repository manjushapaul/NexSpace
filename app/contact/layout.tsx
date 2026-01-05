import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Contact NexSpot Coworking Kottayam | Location & Enquiry',
  description: 'Get in touch with NexSpot Coworking in Kottayam. Find our location near Town Hall, MG Road, Kottayam. Call +91 98765 43210 or email nexspotcoworking@gmail.com for workspace enquiries.',
  keywords: [
    'contact NexSpot Kottayam',
    'coworking space location Kottayam',
    'NexSpot address',
    'workspace enquiry Kottayam',
    'coworking near Town Hall Kottayam',
    'MG Road coworking space',
  ],
  alternates: {
    canonical: 'https://nexspot.com/contact',
  },
  openGraph: {
    title: 'Contact NexSpot Coworking Kottayam | Location & Enquiry',
    description: 'Get in touch with NexSpot Coworking in Kottayam. Find our location near Town Hall, MG Road, Kottayam.',
    url: 'https://nexspot.com/contact',
    type: 'website',
  },
}

export default function ContactLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}




