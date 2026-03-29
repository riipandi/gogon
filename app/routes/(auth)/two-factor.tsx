import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/(auth)/two-factor')({
  component: RouteComponent,
  staticData: {
    pageTitle: 'Two Factor Authentication',
    breadcrumb: 'Two Factor Authentication'
  }
})

function RouteComponent() {
  return <div>Hello "/(auth)/two-factor"!</div>
}
