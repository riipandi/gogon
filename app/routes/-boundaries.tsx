import { Link, type ErrorComponentProps } from '@tanstack/react-router'
import * as Lucide from 'lucide-react'
import { Activity } from 'react'

export function GlobalNotFound() {
  return (
    <main className='mx-auto flex min-h-screen max-w-5xl items-center justify-center px-4 py-12'>
      <section className='bg-background-elevation-base border-border-neutral animate-in fade-in slide-in-from-bottom-3 duration-500 relative w-full overflow-hidden rounded-2xl border px-6 py-14 text-center sm:px-10'>
        <div className='pointer-events-none absolute -top-24 -left-20 h-56 w-56 rounded-full bg-background-primary/10 blur-3xl' />
        <div className='pointer-events-none absolute -right-20 -bottom-20 h-56 w-56 rounded-full bg-background-primary-faded/10 blur-3xl' />

        <Lucide.SearchX
          className='mx-auto mb-6 h-14 w-14 text-foreground-primary/50'
          strokeWidth={1.5}
        />

        <p className='text-foreground-primary mb-3 text-xs font-semibold uppercase tracking-widest'>
          Error 404
        </p>

        <h1 className='mb-3 text-4xl font-bold tracking-tight text-foreground-neutral sm:text-5xl'>
          Page not found
        </h1>

        <p className='mx-auto mb-8 max-w-md text-sm text-foreground-neutral-faded sm:text-base'>
          The page you&apos;re looking for doesn&apos;t exist or has been moved.
        </p>

        <div className='flex flex-col items-center gap-3 sm:flex-row sm:justify-center'>
          <Link
            to='/'
            className='rounded-full border border-border-primary bg-background-primary-faded px-5 py-2.5 text-sm font-semibold text-foreground-primary no-underline transition hover:-translate-y-0.5 hover:bg-background-primary-faded/60'
          >
            Back to Home
          </Link>
        </div>
      </section>
    </main>
  )
}

export function GlobalError({ error, reset }: ErrorComponentProps) {
  return (
    <main className='mx-auto flex min-h-screen max-w-5xl items-center justify-center px-4 py-12'>
      <section className='border-critical/20 bg-background-elevation-base animate-in fade-in slide-in-from-bottom-3 duration-500 relative w-full overflow-hidden rounded-2xl border px-6 py-14 text-center sm:px-10'>
        <div className='pointer-events-none absolute -top-24 -right-20 h-56 w-56 rounded-full bg-background-critical/10 blur-3xl' />
        <div className='pointer-events-none absolute -bottom-20 -left-20 h-56 w-56 rounded-full bg-background-critical-faded/10 blur-3xl' />

        <Lucide.AlertCircle
          className='mx-auto mb-6 h-14 w-14 text-foreground-critical/50'
          strokeWidth={1.5}
        />

        <p className='text-foreground-critical mb-3 text-xs font-semibold uppercase tracking-widest'>
          Unexpected error
        </p>

        <h1 className='mb-3 text-4xl font-bold tracking-tight text-foreground-neutral sm:text-5xl'>
          Something went wrong
        </h1>

        <p className='mx-auto mb-6 max-w-md text-sm text-foreground-neutral-faded sm:text-base'>
          An unexpected error occurred. You can try again or go back to the home page.
        </p>

        <Activity mode={error.message ? 'visible' : 'hidden'}>
          <div className='mx-auto mb-8 max-w-lg rounded-lg border border-border-neutral bg-background-page p-4 text-left'>
            <code className='text-foreground-critical block overflow-x-auto whitespace-pre-wrap wrap-break-word font-mono text-xs'>
              {error.message}
            </code>
          </div>
        </Activity>

        <div className='flex flex-col items-center gap-3 sm:flex-row sm:justify-center'>
          <button
            type='button'
            onClick={reset}
            className='rounded-full border border-border-critical bg-background-critical-faded px-5 py-2.5 text-sm font-semibold text-foreground-critical transition hover:-translate-y-0.5 hover:bg-background-critical-faded/60'
          >
            Try again
          </button>
          <Link
            to='/'
            className='rounded-full border border-border-neutral bg-background-elevation-base/50 px-5 py-2.5 text-sm font-semibold text-foreground-neutral no-underline transition hover:-translate-y-0.5 hover:border-foreground-neutral-faded'
          >
            Back to Home
          </Link>
        </div>
      </section>
    </main>
  )
}
