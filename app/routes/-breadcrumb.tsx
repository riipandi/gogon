import type { AnyRouteMatch } from '@tanstack/react-router'
import { Link, useMatches } from '@tanstack/react-router'
import { Activity, Fragment } from 'react'

export type BreadcrumbValue = string | string[] | ((match: AnyRouteMatch) => string | string[])

type ResolvedBreadcrumbItem = {
  path: string
  label: string
}

interface AppBreadcrumbProps {
  className?: string
}

export function AppBreadcrumb({ className }: AppBreadcrumbProps) {
  const matches = useMatches()

  const breadcrumbs: ResolvedBreadcrumbItem[] = matches.flatMap((match) => {
    const staticData = match.staticData
    if (!staticData?.breadcrumb) return []

    const breadcrumbValue =
      typeof staticData.breadcrumb === 'function'
        ? staticData.breadcrumb(match)
        : staticData.breadcrumb

    const items = Array.isArray(breadcrumbValue) ? breadcrumbValue : [breadcrumbValue]

    return items.map((item) => ({
      path: match.pathname,
      label: item
    }))
  })

  if (breadcrumbs.length === 0) {
    return null
  }

  return (
    <div id='breadcrumb-root' className={className}>
      <div id='breadcrumb-list'>
        {breadcrumbs.map((crumb, index) => {
          const isLast = index === breadcrumbs.length - 1
          return (
            <Fragment key={`${crumb.path}-${index}`}>
              <Activity mode={isLast ? 'visible' : 'hidden'}>
                <div id='breadcrumb-item'>{crumb.label}</div>
              </Activity>
              <Activity mode={!isLast ? 'visible' : 'hidden'}>
                <div id='breadcrumb-item'>
                  <Link to={crumb.path}>{crumb.label}</Link>
                </div>
                <div id='breadcrumb-separator' />
              </Activity>
            </Fragment>
          )
        })}
      </div>
    </div>
  )
}
