import { createFileRoute, Outlet } from '@tanstack/react-router'
import { z } from 'zod'
import { GlobalNotFound } from '#/routes/-boundaries'
import { ThemeSwitcher } from '#/routes/-theme'

const searchSchema = z.object({
  redirect: z.string().optional()
})

export const Route = createFileRoute('/(auth)')({
  notFoundComponent: GlobalNotFound,
  component: RouteComponent,
  beforeLoad: async (_ctx) => {
    return null // TODO: add auth check
  },
  validateSearch: searchSchema
})

function RouteComponent() {
  return (
    <div className='flex h-screen bg-background-page'>
      <div className='flex flex-1 flex-col overflow-hidden'>
        <ThemeSwitcher className='absolute right-4 top-4' />
        <main className='flex-1 overflow-y-auto h-full'>
          <Outlet />
        </main>
      </div>
    </div>
  )
}
