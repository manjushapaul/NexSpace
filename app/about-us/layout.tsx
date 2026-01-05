import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'About NexSpot | Modern Coworking Space in Kottayam, Kerala',
  description: 'Learn about NexSpot - Kottayam\'s premier coworking space. We provide flexible workspaces, private cabins, and meeting rooms for freelancers, startups, and growing teams in Kerala.',
  keywords: [
    'about NexSpot',
    'coworking space Kottayam',
    'startup office Kottayam',
    'modern workspace Kerala',
    'coworking community Kottayam',
    'professional workspace Kottayam',
  ],
  alternates: {
    canonical: 'https://nexspot.com/about-us',
  },
  openGraph: {
    title: 'About NexSpot | Modern Coworking Space in Kottayam, Kerala',
    description: 'Learn about NexSpot - Kottayam\'s premier coworking space. We provide flexible workspaces for freelancers, startups, and teams.',
    url: 'https://nexspot.com/about-us',
    type: 'website',
  },
}

export default function AboutLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}




