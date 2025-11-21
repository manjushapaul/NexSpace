'use client'

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center">
      <h2 className="text-2xl font-bold text-black mb-4">Something went wrong!</h2>
      <button
        onClick={() => reset()}
        className="px-4 py-2 bg-black text-white rounded-lg hover:bg-opacity-90"
      >
        Try again
      </button>
    </div>
  )
}

