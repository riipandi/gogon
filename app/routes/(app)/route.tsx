import { createFileRoute, Outlet } from '@tanstack/react-router'
import { GlobalNotFound } from '#/routes/-boundaries'
import { Sidebar } from './-sidebar'
import { TopBar } from './-topbar'

export const Route = createFileRoute('/(app)')({
  notFoundComponent: GlobalNotFound,
  component: RouteComponent
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
