import { createFileRoute, Link } from '@tanstack/react-router'
import { z } from 'zod'
import { clx } from '#/utils/variant'

const searchSchema = z.object({
  method: z.string().optional().default('totp')
})

export const Route = createFileRoute('/(auth)/two-factor')({
  component: RouteComponent,
  validateSearch: searchSchema,
  staticData: {
    pageTitle: 'Two Factor Authentication',
    breadcrumb: 'Two Factor Authentication'
  }
})

function RouteComponent() {
  const { method } = Route.useSearch()

  return (
    <div className='h-full flex items-center justify-center'>
      <div className='mx-auto w-full max-w-lg p-4'>
        <div className='bg-background-elevation-base border border-border-neutral rounded-lg p-4 sm:p-6 w-full'>
          <h1 className='mb-3 text-3xl font-bold text-foreground-neutral'>
            Two Factor Authentication
          </h1>
          <p className='m-0 max-w-3xl text-base text-foreground-neutral-faded'>
            This section supose to be a 2FA form. <br />
            2FA Method: {method}
          </p>
          <div className='mt-6'>
            <Link
              to='/'
              className={clx(
                'rounded-full border border-border-neutral bg-background-elevation-base/50 px-5 py-2.5 text-sm font-semibold',
                'text-foreground-neutral no-underline transition hover:-translate-y-0.5 hover:border-foreground-neutral-faded'
              )}
            >
              &larr; Back
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
