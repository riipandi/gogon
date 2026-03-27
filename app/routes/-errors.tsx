import { Link, type ErrorComponentProps } from '@tanstack/react-router'
import { SearchX, AlertCircle } from 'lucide-react'

export function GlobalNotFound() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center px-4 rise-in">
      <SearchX className="mb-6 h-16 w-16 text-(--lagoon) opacity-60" strokeWidth={1.5} />
      <h1 className="display-title mb-3 text-7xl font-bold text-(--sea-ink)">404</h1>
      <p className="mb-8 text-lg text-(--sea-ink-soft)">Page not found</p>
      <Link
        to="/"
        className="rounded-full border border-(--lagoon) bg-(--lagoon) px-6 py-2.5 text-sm font-medium text-white transition-all hover:-translate-y-0.5 hover:opacity-90"
      >
        Back to Home
      </Link>
    </div>
  )
}

export function GlobalError({ error, reset }: ErrorComponentProps) {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center px-4 rise-in">
      <AlertCircle className="mb-6 h-16 w-16 text-(--lagoon) opacity-60" strokeWidth={1.5} />
      <h1 className="display-title mb-3 text-5xl font-bold text-(--sea-ink)">Something went wrong</h1>
      <p className="mb-2 max-w-md text-center text-lg text-(--sea-ink-soft)">
        {error.message || 'An unexpected error occurred.'}
      </p>
      <button
        type="button"
        onClick={reset}
        className="mt-6 rounded-full border border-(--lagoon) bg-(--lagoon) px-6 py-2.5 text-sm font-medium text-white transition-all hover:-translate-y-0.5 hover:opacity-90"
      >
        Try again
      </button>
    </div>
  )
}
