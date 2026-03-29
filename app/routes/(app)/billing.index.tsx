import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/(app)/billing/')({
  component: RouteComponent,
  staticData: {
    pageTitle: 'Invoices',
    breadcrumb: 'Invoices'
  }
})

function RouteComponent() {
  return <div>List of invoices</div>
}
