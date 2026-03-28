import { queryOptions, useSuspenseQuery, useMutation } from '@tanstack/react-query'
import { Link, createFileRoute } from '@tanstack/react-router'
import { Activity, useState } from 'react'
import { fetcher } from '#/libraries/api-client'

type User = { id: string; name: string }

const usersQueryOpts = queryOptions({
  queryKey: ['users'],
  queryFn: () => fetcher<User[]>('/users')
})

export const Route = createFileRoute('/demo/api')({
  component: RouteComponent,
  loader: ({ context }) => {
    context.queryClient.ensureQueryData(usersQueryOpts)
  }
})

function RouteComponent() {
  const { queryClient } = Route.useRouteContext()
  const [name, setName] = useState('')
  const { data: users, isPending, error, refetch, isFetching } = useSuspenseQuery(usersQueryOpts)

  const createUser = useMutation({
    mutationFn: (body: { name: string }) => fetcher<User>('/users', { method: 'POST', body }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['users'] })
      setName('')
    }
  })

  const handleCreateUser = (e: React.FormEvent) => {
    e.preventDefault()
    createUser.mutate({ name })
  }

  return (
    <main className='page-wrap px-4 py-12'>
      <section className='island-shell rounded-2xl p-6 sm:p-8'>
        <p className='island-kicker mb-2'>REST API Demo</p>
        <h1 className='display-title mb-3 text-4xl font-bold text-(--sea-ink) sm:text-5xl'>
          User List
        </h1>
        <p className='m-0 mb-8 max-w-3xl text-base leading-8 text-(--sea-ink-soft)'>
          Fetch users from the Go Chi backend via TanStack Query + ofetch. Create new users with
          useMutation.
        </p>

        <form onSubmit={handleCreateUser} className='island-shell mb-8 rounded-xl p-4'>
          <p className='mb-3 text-sm font-semibold text-(--sea-ink)'>Create User</p>
          <div className='flex gap-3'>
            <input
              type='text'
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder='Enter user name'
              className='rounded-lg border border-[rgba(23,58,64,0.2)] bg-white/50 px-4 py-2.5 text-sm text-(--sea-ink) outline-none transition placeholder:text-(--sea-ink-soft)/50 focus:border-[rgba(50,143,151,0.4)]'
            />
            <button
              type='submit'
              disabled={createUser.isPending || !name.trim()}
              className='rounded-full border border-[rgba(50,143,151,0.3)] bg-[rgba(79,184,178,0.14)] px-5 py-2.5 text-sm font-semibold text-(--lagoon-deep) transition hover:-translate-y-0.5 hover:bg-[rgba(79,184,178,0.24)] disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:translate-y-0'
            >
              {createUser.isPending ? 'Creating...' : 'Create'}
            </button>
          </div>

          <Activity mode={createUser.isError ? 'visible' : 'hidden'}>
            <p className='mt-2 text-sm text-red-600'>Error: {createUser.error?.message}</p>
          </Activity>
        </form>

        <div className='mb-6 flex items-center gap-3'>
          <button
            type='button'
            onClick={() => refetch()}
            disabled={isPending}
            className='rounded-full border border-[rgba(50,143,151,0.3)] bg-[rgba(79,184,178,0.14)] px-5 py-2.5 text-sm font-semibold text-(--lagoon-deep) transition hover:-translate-y-0.5 hover:bg-[rgba(79,184,178,0.24)] disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:translate-y-0'
          >
            Refresh
          </button>
          {isFetching && !isPending && (
            <span className='text-sm text-(--sea-ink-soft)'>Updating...</span>
          )}
        </div>

        <Activity mode={isPending ? 'visible' : 'hidden'}>
          <p className='text-sm text-(--sea-ink-soft)'>Loading users...</p>
        </Activity>

        <Activity mode={error ? 'visible' : 'hidden'}>
          <p className='mt-2 text-sm text-red-600'>Error: {error?.message}</p>
        </Activity>

        {users && (
          <div className='grid gap-3 sm:grid-cols-2'>
            {users.map((user) => (
              <div key={user.id} className='island-shell rounded-xl p-4'>
                <p className='m-0 text-base font-medium text-(--sea-ink)'>{user.name}</p>
                <p className='m-0 mt-1 text-sm text-(--sea-ink-soft)'>#{user.id}</p>
              </div>
            ))}
          </div>
        )}

        <div className='mt-8'>
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
