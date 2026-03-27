import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/')({
  component: RouteComponent
})

function RouteComponent() {
  return (
    <main className="page-wrap px-4 pb-8 pt-14">
      <section className="island-shell rise-in relative overflow-hidden rounded-4xl px-6 py-10 sm:px-10 sm:py-14">
        <div className="pointer-events-none absolute -left-20 -top-24 h-56 w-56 rounded-full bg-[radial-gradient(circle,rgba(79,184,178,0.32),transparent_66%)]" />
        <div className="pointer-events-none absolute -bottom-20 -right-20 h-56 w-56 rounded-full bg-[radial-gradient(circle,rgba(47,106,74,0.18),transparent_66%)]" />
        <p className="island-kicker mb-3">Fullstack Go + React</p>
        <h1 className="display-title mb-5 max-w-3xl text-4xl leading-[1.02] font-bold tracking-tight text-(--sea-ink) sm:text-6xl">
          Go + React, one binary.
        </h1>
        <p className="mb-8 max-w-2xl text-base text-(--sea-ink-soft) sm:text-lg">
          A single Go binary serves your React SPA and API. No separate web
          server, no deployment headaches.
        </p>
        <div className="flex flex-wrap gap-3">
          <a
            href="/about"
            className="rounded-full border border-[rgba(50,143,151,0.3)] bg-[rgba(79,184,178,0.14)] px-5 py-2.5 text-sm font-semibold text-(--lagoon-deep) no-underline transition hover:-translate-y-0.5 hover:bg-[rgba(79,184,178,0.24)]"
          >
            About
          </a>
          <a
            href="https://go-chi.io/"
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-full border border-[rgba(23,58,64,0.2)] bg-white/50 px-5 py-2.5 text-sm font-semibold text-(--sea-ink) no-underline transition hover:-translate-y-0.5 hover:border-[rgba(23,58,64,0.35)]"
          >
            Chi Router
          </a>
        </div>
      </section>

      <section className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {[
          [
            'Embedded SPA',
            'Frontend built into a single Go binary — no web server needed.',
          ],
          [
            'Chi Router',
            'Fast, composable HTTP routing with middleware support.',
          ],
          [
            'Hot Reload',
            'Go files are watched and auto-rebuilt during development.',
          ],
          [
            'Cobra CLI',
            'Production-ready CLI with serve, migrate, and more.',
          ],
        ].map(([title, desc], index) => (
          <article
            key={title}
            className="island-shell feature-card rise-in rounded-2xl p-5"
            style={{ animationDelay: `${index * 90 + 80}ms` }}
          >
            <h2 className="mb-2 text-base font-semibold text-(--sea-ink)">
              {title}
            </h2>
            <p className="m-0 text-sm text-(--sea-ink-soft)">{desc}</p>
          </article>
        ))}
      </section>

      <section className="island-shell mt-8 rounded-2xl p-6">
        <p className="island-kicker mb-2">Quick Start</p>
        <ul className="m-0 list-disc space-y-2 pl-5 text-sm text-(--sea-ink-soft)">
          <li>
            Edit <code>app/routes/index.tsx</code> to customize the home page.
          </li>
          <li>
            Update <code>app/components/Header.tsx</code> and{' '}
            <code>app/components/Footer.tsx</code> for brand links.
          </li>
          <li>
            Add routes in <code>app/routes</code> and tweak visual tokens in{' '}
            <code>app/styles.css</code>.
          </li>
        </ul>
      </section>
    </main>
  )
}
