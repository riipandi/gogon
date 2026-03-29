import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/(auth)/signin')({
  component: RouteComponent,
  staticData: {
    pageTitle: 'Sign In',
    breadcrumb: 'Sign In'
  }
})

function RouteComponent() {
  return <div>Hello "/(auth)/signin"!</div>
}
