import { Link, createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/(app)/')({
  component: RouteComponent,
  staticData: {
    pageTitle: 'Overview',
    breadcrumb: 'Overview'
  }
})

function RouteComponent() {
  return (
    <div className='mx-auto max-w-5xl p-4'>
      <section className='bg-background-elevation-base border border-border-neutral animate-in fade-in slide-in-from-bottom-3 duration-500 relative overflow-hidden rounded-xl px-6 py-10 sm:px-10 sm:py-14'>
        <div className='pointer-events-none absolute -top-24 -left-20 h-56 w-56 rounded-full bg-background-primary/20 blur-3xl' />
        <div className='pointer-events-none absolute -right-20 -bottom-20 h-56 w-56 rounded-full bg-background-primary-faded/15 blur-3xl' />
        <p className='text-foreground-primary text-xs font-semibold uppercase tracking-widest mb-3'>
          Fullstack Go + React
        </p>
        <h1 className='mb-5 max-w-3xl text-4xl leading-[1.02] font-bold tracking-tight text-foreground-neutral sm:text-6xl'>
          Go + React, one binary.
        </h1>
        <p className='mb-8 max-w-2xl text-base text-foreground-neutral-faded sm:text-lg'>
          A single Go binary serves your React SPA and API. No separate web server, no deployment
          headaches.
        </p>
        <div className='flex flex-wrap gap-3'>
          <a
            href='/about'
            className='rounded-full border border-border-primary bg-background-primary-faded px-5 py-2.5 text-sm font-semibold text-foreground-primary no-underline transition hover:-translate-y-0.5 hover:bg-background-primary-faded/60'
          >
            About
          </a>
          <a
            href='https://go-chi.io/'
            target='_blank'
            rel='noopener noreferrer'
            className='rounded-full border border-border-neutral bg-background-elevation-base/50 px-5 py-2.5 text-sm font-semibold text-foreground-neutral no-underline transition hover:-translate-y-0.5 hover:border-foreground-neutral-faded'
          >
            Chi Router
          </a>
        </div>
      </section>

      <section className='mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4'>
        {[
          ['Embedded SPA', 'Frontend built into a single Go binary — no web server needed.'],
          ['Chi Router', 'Fast, composable HTTP routing with middleware support.'],
          ['Hot Reload', 'Go files are watched and auto-rebuilt during development.'],
          ['Cobra CLI', 'Production-ready CLI with serve, migrate, and more.']
        ].map(([title, desc], index) => (
          <article
            key={title}
            className='bg-background-elevation-base border border-border-neutral transition-all hover:shadow-raised hover:-translate-y-0.5 animate-in fade-in slide-in-from-bottom-3 duration-500 rounded-2xl p-5'
            style={{ animationDelay: `${index * 90 + 80}ms` }}
          >
            <h2 className='text-foreground-neutral mb-2 text-base font-semibold'>{title}</h2>
            <p className='text-foreground-neutral-faded m-0 text-sm'>{desc}</p>
          </article>
        ))}
      </section>

      <section className='bg-background-elevation-base border border-border-neutral mt-8 rounded-2xl p-6'>
        <p className='text-foreground-primary text-xs font-semibold uppercase tracking-widest mb-2'>
          Quick Start
        </p>
        <ul className='text-foreground-neutral-faded m-0 list-disc space-y-2 pl-5 text-sm'>
          <li>
            Edit <code>app/routes/(app)/index.tsx</code> to customize the home page.
          </li>
          <li>
            <Link
              to='/demo/api'
              className='text-foreground-primary underline-offset-2 hover:underline'
            >
              Demo for REST API call
            </Link>
          </li>
          <li>
            <Link
              to='/demo/rpc'
              className='text-foreground-primary underline-offset-2 hover:underline'
            >
              Demo for Connect RPC call
            </Link>
          </li>
        </ul>
      </section>
    </div>
  )
}
