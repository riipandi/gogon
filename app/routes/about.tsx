import { Link, createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/about')({
  component: RouteComponent,
  staticData: { breadcrumb: 'About' }
})

function RouteComponent() {
  return (
    <main className='page-wrap px-4 py-12'>
      <section className='island-shell rounded-2xl p-6 sm:p-8'>
        <p className='island-kicker mb-2'>About</p>
        <h1 className='display-title mb-3 text-4xl font-bold text-(--sea-ink) sm:text-5xl'>
          A Go + React fullstack starter.
        </h1>
        <p className='m-0 max-w-3xl text-base leading-8 text-(--sea-ink-soft)'>
          This starter combines Chi router for the backend, React with TanStack Router for the
          frontend, and a Vite plugin that handles the entire Go build pipeline — including
          embedding the SPA into a single binary.
        </p>
        <div className='mt-6'>
          <Link
            to='/'
            className='rounded-full border border-[rgba(23,58,64,0.2)] bg-white/50 px-5 py-2.5 text-sm font-semibold text-(--sea-ink) no-underline transition hover:-translate-y-0.5 hover:border-[rgba(23,58,64,0.35)]'
          >
            &larr; Back
          </Link>
        </div>
      </section>
    </main>
  )
}
