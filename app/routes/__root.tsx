import { TransportProvider } from '@connectrpc/connect-query'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import type { AnyRouteMatch } from '@tanstack/react-router'
import { Outlet, createRootRouteWithContext, useMatches } from '@tanstack/react-router'
import { rpcTransport } from '#/libraries/api-client'
import { ThemeProvider } from '#/routes/-theme'
import { GlobalNotFound, GlobalError } from './-boundaries'
import DevTools from './-devtools'
import '../styles/globals.css'

export interface GlobalContext {
  queryClient: QueryClient
}

export type BreadcrumbValue = string | string[] | ((match: AnyRouteMatch) => string | string[])

export const Route = createRootRouteWithContext<GlobalContext>()({
  notFoundComponent: GlobalNotFound,
  errorComponent: GlobalError,
  component: RootComponent,
  loader({ context }) {
    return { ...context }
  }
})

function RootComponent() {
  const matches = useMatches()
  const { queryClient } = Route.useRouteContext()

  const pageTitle = matches.findLast((match) => match.staticData?.pageTitle)?.staticData?.pageTitle

  return (
    <TransportProvider transport={rpcTransport}>
      <title>{pageTitle ? `${pageTitle} - MyApplication` : 'MyApplication'}</title>
      <QueryClientProvider client={queryClient}>
        <ThemeProvider>
          <Outlet />
        </ThemeProvider>
        <DevTools queryClient={queryClient} />
      </QueryClientProvider>
    </TransportProvider>
  )
}
