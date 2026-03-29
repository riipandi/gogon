import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/(app)/billing/balance')({
  component: RouteComponent,
  staticData: {
    pageTitle: 'Balance',
    breadcrumb: 'Balance'
  }
})

function RouteComponent() {
  return <div>Balance and top up</div>
}
