import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Workspaces & Amenities | Hot Desks, Cabins & Meeting Rooms – NexSpot Kottayam',
  description: 'Explore NexSpot\'s flexible workspace options in Kottayam: hot desks, dedicated desks, private cabins, and meeting rooms. High-speed Wi-Fi, AC, parking, and 24/7 access available.',
  keywords: [
    'hot desks Kottayam',
    'private cabins Kottayam',
    'meeting rooms Kottayam',
    'dedicated desk Kottayam',
    'flexible workspace Kottayam',
    'coworking amenities Kottayam',
    'office space rental Kottayam',
    'shared workspace Kottayam',
  ],
  alternates: {
    canonical: 'https://nexspot.com/workspace',
  },
  openGraph: {
    title: 'Workspaces & Amenities | Hot Desks, Cabins & Meeting Rooms – NexSpot Kottayam',
    description: 'Explore NexSpot\'s flexible workspace options in Kottayam: hot desks, dedicated desks, private cabins, and meeting rooms with premium amenities.',
    url: 'https://nexspot.com/workspace',
    type: 'website',
  },
}

export default function WorkspaceLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}

