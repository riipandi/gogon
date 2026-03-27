import { TanStackDevtools } from '@tanstack/react-devtools'
import { Outlet, createRootRoute } from '@tanstack/react-router'
import { TanStackRouterDevtoolsPanel } from '@tanstack/react-router-devtools'
import { GlobalNotFound, GlobalError } from './-errors'
import '../styles/globals.css'

export const Route = createRootRoute({
  notFoundComponent: GlobalNotFound,
  errorComponent: GlobalError,
  component: RootComponent
})

function RootComponent() {
  return (
    <>
      <Outlet />
      <TanStackDevtools
        config={{ position: 'bottom-right' }}
        plugins={[
          {
            name: 'TanStack Router',
            render: <TanStackRouterDevtoolsPanel />
          }
        ]}
      />
    </>
  )
}
