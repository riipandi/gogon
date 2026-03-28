import { TransportProvider } from '@connectrpc/connect-query'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { Outlet, createRootRouteWithContext } from '@tanstack/react-router'
import { rpcTransport } from '#/libraries/api-client'
import { GlobalNotFound, GlobalError } from './-boundaries'
import DevTools from './-devtools'
import '../styles/globals.css'

export interface GlobalContext {
  queryClient: QueryClient
}

export const Route = createRootRouteWithContext<GlobalContext>()({
  notFoundComponent: GlobalNotFound,
  errorComponent: GlobalError,
  component: RootComponent,
  loader({ context }) {
    return { ...context }
  }
})

function RootComponent() {
  const { queryClient } = Route.useRouteContext()
  return (
    <TransportProvider transport={rpcTransport}>
      <QueryClientProvider client={queryClient}>
        <Outlet />
        <DevTools queryClient={queryClient} />
      </QueryClientProvider>
    </TransportProvider>
  )
}
