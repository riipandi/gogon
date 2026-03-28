import { createConnectTransport } from '@connectrpc/connect-web'
import { QueryClient } from '@tanstack/react-query'
import { ofetch } from 'ofetch'

// Define ConnectRPC transport with some options.
export const rpcTransport = createConnectTransport({
  baseUrl: '/rpc'
})

// Initialize a QueryClient instance with default options.
export const queryClient = new QueryClient({
  defaultOptions: {
    mutations: {
      retry: 1
    },
    queries: {
      refetchOnWindowFocus: false,
      staleTime: 60000 // 1 minute
    }
  }
})

// Define a custom fetcher using ofetch with some options.
export const fetcher = ofetch.create({
  baseURL: '/api'
})
