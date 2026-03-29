import { createFileRoute, Outlet } from '@tanstack/react-router'
import { z } from 'zod'
import { GlobalNotFound } from '#/routes/-boundaries'
import { Sidebar } from './-sidebar'
import { TopBar } from './-topbar'

const searchSchema = z.object({
  redirect: z.string().optional()
})

export const Route = createFileRoute('/(app)')({
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
      <Sidebar />
      <div className='flex flex-1 flex-col overflow-hidden'>
        <TopBar />
        <main className='flex-1 overflow-y-auto'>
          <div className='w-full p-4'>
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  )
}
