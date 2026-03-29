import { createFileRoute, redirect } from '@tanstack/react-router'

export const Route = createFileRoute('/(app)/settings/')({
  component: () => null,
  beforeLoad: () => {
    return redirect({
      to: '/settings/account'
    })
  }
})
