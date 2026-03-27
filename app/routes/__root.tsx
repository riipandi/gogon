import { TransportProvider } from '@connectrpc/connect-query'
import { createConnectTransport } from '@connectrpc/connect-web'
import { TanStackDevtools } from '@tanstack/react-devtools'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { Outlet, createRootRoute } from '@tanstack/react-router'
import { TanStackRouterDevtoolsPanel } from '@tanstack/react-router-devtools'
import { GlobalNotFound, GlobalError } from './-boundaries'
import '../styles/globals.css'

const transport = createConnectTransport({ baseUrl: '/rpc' })
const queryClient = new QueryClient()

export const Route = createRootRoute({
  notFoundComponent: GlobalNotFound,
  errorComponent: GlobalError,
  component: RootComponent
})

function RootComponent() {
  return (
    <TransportProvider transport={transport}>
      <QueryClientProvider client={queryClient}>
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
      </QueryClientProvider>
    </TransportProvider>
  )
}
