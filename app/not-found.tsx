import Link from 'next/link'

export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center">
      <h2 className="text-4xl font-bold text-black mb-4">404 - Page Not Found</h2>
      <p className="text-gray-600 mb-8">The page you are looking for does not exist.</p>
      <Link
        href="/"
        className="px-6 py-3 bg-black text-white rounded-lg hover:bg-opacity-90 transition-colors"
      >
        Return Home
      </Link>
    </div>
  )
}

