import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/(app)/billing/payment')({
  component: RouteComponent,
  staticData: {
    pageTitle: 'Payment Information',
    breadcrumb: 'Payment Information'
  }
})

function RouteComponent() {
  return <div>Payment information</div>
}
