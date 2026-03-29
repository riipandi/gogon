import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/(auth)/signup')({
  component: RouteComponent,
  staticData: {
    pageTitle: 'Sign Up',
    breadcrumb: 'Sign Up'
  }
})

function RouteComponent() {
  return <div>Hello "/(auth)/signup"!</div>
}
