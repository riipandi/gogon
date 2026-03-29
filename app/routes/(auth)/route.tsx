import { createFileRoute, Outlet } from '@tanstack/react-router'
import { GlobalNotFound } from '#/routes/-boundaries'

export const Route = createFileRoute('/(auth)')({
  notFoundComponent: GlobalNotFound,
  component: RouteComponent
})

function RouteComponent() {
  return <Outlet />
}
