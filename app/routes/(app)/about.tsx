import { Link, createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/(app)/about')({
  component: RouteComponent,
  staticData: {
    pageTitle: 'About',
    breadcrumb: 'About'
  }
})

function RouteComponent() {
  return (
    <div className='mx-auto max-w-5xl p-4'>
      <section className='bg-background-elevation-base border border-border-neutral rounded-2xl p-6 sm:p-8'>
        <p className='text-foreground-primary text-xs font-semibold uppercase tracking-widest mb-2'>
          About
        </p>
        <h1 className='mb-3 text-4xl font-bold text-foreground-neutral sm:text-5xl'>
          A Go + React fullstack starter.
        </h1>
        <p className='m-0 max-w-3xl text-base leading-8 text-foreground-neutral-faded'>
          This starter combines Chi router for the backend, React with TanStack Router for the
          frontend, and a Vite plugin that handles the entire Go build pipeline — including
          embedding the SPA into a single binary.
        </p>
        <div className='mt-6'>
          <Link
            to='/'
            className='rounded-full border border-border-neutral bg-background-elevation-base/50 px-5 py-2.5 text-sm font-semibold text-foreground-neutral no-underline transition hover:-translate-y-0.5 hover:border-foreground-neutral-faded'
          >
            &larr; Back
          </Link>
        </div>
      </section>
    </div>
  )
}
