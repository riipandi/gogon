import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/(auth)/forgot-password')({
  component: RouteComponent,
  staticData: {
    pageTitle: 'Forgot Password',
    breadcrumb: 'Forgot Password'
  }
})

function RouteComponent() {
  return <div>Hello "/(auth)/password/forgot"!</div>
}
