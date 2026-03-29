import { useMatches } from '@tanstack/react-router'
import { useStore } from '@tanstack/react-store'
import * as Lucide from 'lucide-react'
import { Activity } from 'react'
import { ThemeSwitcher } from '#/routes/-theme'
import { uiStore, sidebarActions } from '#/stores/ui.store'
import { clx } from '#/utils/variant'

export function TopBar() {
  const matches = useMatches()
  const collapsed = useStore(uiStore, (s) => s.sidebarCollapsed)
  const pageTitle = matches.findLast((m) => m.staticData?.pageTitle)?.staticData?.pageTitle

  return (
    <header className='bg-background-elevation-base border-border-neutral z-20 flex h-14 shrink-0 items-center justify-between border-b px-4'>
      <div className='flex items-center gap-2'>
        <button
          type='button'
          onClick={() => sidebarActions.toggleCollapse()}
          className='hidden rounded-lg p-2 text-foreground-neutral-faded transition hover:bg-background-neutral-faded hover:text-foreground-neutral lg:block'
          aria-label={collapsed ? 'Expand sidebar' : 'Collapse sidebar'}
        >
          <Activity mode={collapsed ? 'visible' : 'hidden'}>
            <Lucide.PanelLeftOpen className='size-4' />
          </Activity>

          <Activity mode={!collapsed ? 'visible' : 'hidden'}>
            <Lucide.PanelLeftClose className='size-4' />
          </Activity>
        </button>

        <button
          type='button'
          onClick={() => sidebarActions.toggle()}
          className='rounded-lg p-2 text-foreground-neutral-faded transition hover:bg-background-neutral-faded hover:text-foreground-neutral lg:hidden'
          aria-label='Toggle menu'
        >
          <Lucide.Menu className='size-4' />
        </button>

        <span className='text-foreground-neutral text-sm font-semibold lg:hidden'>
          MyApplication
        </span>
      </div>

      <Activity mode={pageTitle ? 'visible' : 'hidden'}>
        <span className='text-foreground-neutral-faded hidden text-sm font-medium lg:block'>
          {pageTitle}
        </span>
      </Activity>

      <div className='flex gap-4 items-center justify-between'>
        <ThemeSwitcher />
        <div
          className={clx(
            'flex items-center justify-center rounded-full bg-background-neutral',
            'size-8 text-foreground-neutral-faded'
          )}
        >
          <Lucide.User className='size-4' />
        </div>
      </div>
    </header>
  )
}
