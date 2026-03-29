import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/(auth)/verify-email')({
  component: RouteComponent,
  staticData: {
    pageTitle: 'Verify Email',
    breadcrumb: 'Verify Email'
  }
})

function RouteComponent() {
  return <div>Hello "/(auth)/verify-email"!</div>
}
