import { createFileRoute, Outlet } from '@tanstack/react-router'
import { GlobalNotFound } from '#/routes/-boundaries'

export const Route = createFileRoute('/demo')({
  notFoundComponent: GlobalNotFound,
  component: RouteComponent
})

function RouteComponent() {
  return <Outlet />
}
