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
  },
  staticData: { breadcrumb: 'Demo API Call' }
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
    <main className='mx-auto max-w-5xl px-4 py-12'>
      <section className='bg-background-elevation-base border border-border-neutral rounded-2xl p-6 sm:p-8'>
        <p className='text-foreground-primary text-xs font-semibold uppercase tracking-widest mb-2'>
          REST API Demo
        </p>
        <h1 className='mb-3 text-4xl font-bold text-foreground-neutral sm:text-5xl'>User List</h1>
        <p className='m-0 mb-8 max-w-3xl text-base leading-8 text-foreground-neutral-faded'>
          Fetch users from the Go Chi backend via TanStack Query + ofetch. Create new users with
          useMutation.
        </p>

        <form
          onSubmit={handleCreateUser}
          className='bg-background-elevation-base border border-border-neutral mb-8 rounded-xl p-4'
        >
          <p className='mb-3 text-sm font-semibold text-foreground-neutral'>Create User</p>
          <div className='flex gap-3'>
            <input
              type='text'
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder='Enter user name'
              className='rounded-lg border border-border-neutral bg-background-elevation-base/50 px-4 py-2.5 text-sm text-foreground-neutral outline-none transition placeholder:text-foreground-neutral-faded/50 focus:border-border-primary'
            />
            <button
              type='submit'
              disabled={createUser.isPending || !name.trim()}
              className='rounded-full border border-border-primary bg-background-primary-faded px-5 py-2.5 text-sm font-semibold text-foreground-primary transition hover:-translate-y-0.5 hover:bg-background-primary-faded/60 disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:translate-y-0'
            >
              {createUser.isPending ? 'Creating...' : 'Create'}
            </button>
          </div>

          <Activity mode={createUser.isError ? 'visible' : 'hidden'}>
            <p className='mt-2 text-sm text-foreground-critical'>
              Error: {createUser.error?.message}
            </p>
          </Activity>
        </form>

        <div className='mb-6 flex items-center gap-3'>
          <button
            type='button'
            onClick={() => refetch()}
            disabled={isPending}
            className='rounded-full border border-border-primary bg-background-primary-faded px-5 py-2.5 text-sm font-semibold text-foreground-primary transition hover:-translate-y-0.5 hover:bg-background-primary-faded/60 disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:translate-y-0'
          >
            Refresh
          </button>
          {isFetching && !isPending && (
            <span className='text-sm text-foreground-neutral-faded'>Updating...</span>
          )}
        </div>

        <Activity mode={isPending ? 'visible' : 'hidden'}>
          <p className='text-sm text-foreground-neutral-faded'>Loading users...</p>
        </Activity>

        <Activity mode={error ? 'visible' : 'hidden'}>
          <p className='mt-2 text-sm text-foreground-critical'>Error: {error?.message}</p>
        </Activity>

        {users && (
          <div className='grid gap-3 sm:grid-cols-2'>
            {users.map((user) => (
              <div
                key={user.id}
                className='bg-background-elevation-base border border-border-neutral rounded-xl p-4'
              >
                <p className='m-0 text-base font-medium text-foreground-neutral'>{user.name}</p>
                <p className='m-0 mt-1 text-sm text-foreground-neutral-faded'>#{user.id}</p>
              </div>
            ))}
          </div>
        )}

        <div className='mt-8'>
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
