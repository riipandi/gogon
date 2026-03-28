import { useMutation } from '@connectrpc/connect-query'
import { Link, createFileRoute } from '@tanstack/react-router'
import { useState, Activity } from 'react'
import { GreetService } from '#/generated/api/myapp/v1/greet_pb'

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
    <main className='page-wrap px-4 py-12'>
      <section className='island-shell rounded-2xl p-6 sm:p-8'>
        <p className='island-kicker mb-2'>ConnectRPC Demo</p>
        <h1 className='display-title mb-3 text-4xl font-bold text-(--sea-ink) sm:text-5xl'>
          Greet RPC
        </h1>
        <p className='m-0 mb-8 max-w-3xl text-base leading-8 text-(--sea-ink-soft)'>
          Send a greeting via ConnectRPC. Uses TanStack Query + Connect-Query for type-safe
          client-server communication.
        </p>

        <form onSubmit={handleSubmit} className='flex gap-3'>
          <input
            type='text'
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder='Enter your name'
            className='rounded-lg border border-[rgba(23,58,64,0.2)] bg-white/50 px-4 py-2.5 text-sm text-(--sea-ink) outline-none transition placeholder:text-(--sea-ink-soft)/50 focus:border-[rgba(50,143,151,0.4)]'
          />
          <button
            type='submit'
            disabled={mutation.isPending || !name.trim()}
            className='rounded-full border border-[rgba(50,143,151,0.3)] bg-[rgba(79,184,178,0.14)] px-5 py-2.5 text-sm font-semibold text-(--lagoon-deep) transition hover:-translate-y-0.5 hover:bg-[rgba(79,184,178,0.24)] disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:translate-y-0'
          >
            {mutation.isPending ? 'Sending...' : 'Greet'}
          </button>
        </form>

        <Activity mode={mutation.error ? 'visible' : 'hidden'}>
          <p className='mt-4 text-sm text-red-600'>Error: {mutation.error?.message}</p>
        </Activity>

        <Activity mode={mutation.data ? 'visible' : 'hidden'}>
          <div className='island-shell mt-6 rounded-xl p-4'>
            <p className='m-0 text-base text-(--sea-ink)'>{mutation.data?.greeting}</p>
          </div>
        </Activity>

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
