import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/(app)/settings/account')({
  component: RouteComponent,
  staticData: {
    pageTitle: 'Account Settings',
    breadcrumb: 'Account Settings'
  }
})

function RouteComponent() {
  return <div>Account settings</div>
}
