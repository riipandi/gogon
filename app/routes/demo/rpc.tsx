import { useMutation } from '@connectrpc/connect-query'
import { Link, createFileRoute } from '@tanstack/react-router'
import { useState, Activity } from 'react'
import { GreetService } from '#/generated/api/v1/greet_pb'

export const Route = createFileRoute('/demo/rpc')({
  component: RouteComponent,
  staticData: { breadcrumb: 'Demo RPC Call' }
})

function RouteComponent() {
  const [name, setName] = useState('')
  const mutation = useMutation(GreetService.method.greet)

  const handleSubmit = (e: React.SubmitEvent) => {
    e.preventDefault()
    mutation.mutate({ name })
  }

  return (
    <main className='mx-auto max-w-5xl px-4 py-12'>
      <section className='bg-background-elevation-base border border-border-neutral rounded-2xl p-6 sm:p-8'>
        <p className='text-foreground-primary text-xs font-semibold uppercase tracking-widest mb-2'>
          ConnectRPC Demo
        </p>
        <h1 className='mb-3 text-4xl font-bold text-foreground-neutral sm:text-5xl'>Greet RPC</h1>
        <p className='m-0 mb-8 max-w-3xl text-base leading-8 text-foreground-neutral-faded'>
          Send a greeting via ConnectRPC. Uses TanStack Query + Connect-Query for type-safe
          client-server communication.
        </p>

        <form onSubmit={handleSubmit} className='flex gap-3'>
          <input
            type='text'
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder='Enter your name'
            className='rounded-lg border border-border-neutral bg-background-elevation-base/50 px-4 py-2.5 text-sm text-foreground-neutral outline-none transition placeholder:text-foreground-neutral-faded/50 focus:border-border-primary'
          />
          <button
            type='submit'
            disabled={mutation.isPending || !name.trim()}
            className='rounded-full border border-border-primary bg-background-primary-faded px-5 py-2.5 text-sm font-semibold text-foreground-primary transition hover:-translate-y-0.5 hover:bg-background-primary-faded/60 disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:translate-y-0'
          >
            {mutation.isPending ? 'Sending...' : 'Greet'}
          </button>
        </form>

        <Activity mode={mutation.error ? 'visible' : 'hidden'}>
          <p className='mt-4 text-sm text-foreground-critical'>Error: {mutation.error?.message}</p>
        </Activity>

        <Activity mode={mutation.data ? 'visible' : 'hidden'}>
          <div className='bg-background-elevation-base border border-border-neutral mt-6 rounded-xl p-4'>
            <p className='m-0 text-base text-foreground-neutral'>{mutation.data?.greeting}</p>
          </div>
        </Activity>

        <div className='mt-6'>
          <Link
            to='/'
            className='rounded-full border border-border-neutral bg-background-elevation-base/50 px-5 py-2.5 text-sm font-semibold text-foreground-neutral no-underline transition hover:-translate-y-0.5 hover:border-foreground-neutral-faded'
          >
            &larr; Back
          </Link>
        </div>
      </section>
    </main>
  )
}
