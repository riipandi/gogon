import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/(auth)/reset-password/$token')({
  component: RouteComponent,
  loader: async ({ params }) => {
    const { token } = params
    return { token }
  },
  staticData: {
    pageTitle: 'Reset Password',
    breadcrumb: 'Reset Password'
  }
})

function RouteComponent() {
  const { token } = Route.useParams()
  return <div>Token: {token}</div>
}
