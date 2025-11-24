import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import BackToTop from '@/components/BackToTop'

const inter = Inter({ 
  subsets: ['latin'],
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'NexSpace® - Best websites to find workspaces',
  description: 'Find the perfect workspace for your needs',
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
