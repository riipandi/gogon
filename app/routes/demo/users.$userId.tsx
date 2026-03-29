import { createFileRoute, Link } from '@tanstack/react-router'

export const Route = createFileRoute('/demo/users/$userId')({
  component: RouteComponent,
  loader: async ({ params }) => {
    const { userId } = params
    return { userId }
  },
  staticData: {
    pageTitle: 'Reset Password',
    breadcrumb: 'Reset Password'
  }
})

function RouteComponent() {
  const { userId } = Route.useParams()

  return (
    <div className='mx-auto max-w-5xl p-4'>
      <section className='bg-background-elevation-base border border-border-neutral rounded-2xl p-6 sm:p-8'>
        <p className='text-foreground-primary text-xs font-semibold uppercase tracking-widest mb-2'>
          Demo
        </p>
        <h1 className='mb-3 text-4xl font-bold text-foreground-neutral'>
          Example of a dynamic route
        </h1>
        <p className='m-0 max-w-3xl text-base leading-8 text-foreground-neutral-faded'>
          User ID: {userId}
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
