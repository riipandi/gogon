import { Link, type LinkProps } from '@tanstack/react-router'
import { useStore } from '@tanstack/react-store'
import * as Lucide from 'lucide-react'
import { Activity } from 'react'
import { uiStore, sidebarActions } from '#/stores/ui.store'
import { clx } from '#/utils/variant'

type NavItem = {
  label: string
  to: LinkProps['to']
  icon: React.ComponentType<{ className?: string }>
  exact?: boolean
}

type NavGroup = {
  title?: string
  items: NavItem[]
}

const navigation: NavGroup[] = [
  {
    items: [{ label: 'Overview', to: '/', icon: Lucide.LayoutDashboard, exact: true }]
  },
  {
    title: 'Billing',
    items: [
      { label: 'Invoices', to: '/billing', icon: Lucide.FileText, exact: true },
      { label: 'Balance', to: '/billing/balance', icon: Lucide.Wallet },
      { label: 'Payment', to: '/billing/payment', icon: Lucide.CreditCard }
    ]
  },
  {
    title: 'Settings',
    items: [{ label: 'Account', to: '/settings/account', icon: Lucide.UserCog }]
  }
]

function NavContent({ collapsed, mobile }: { collapsed: boolean; mobile?: boolean }) {
  return (
    <div className='flex h-full flex-col'>
      <div
        className={clx(
          'flex h-14 shrink-0 items-center',
          collapsed ? 'justify-center px-0' : 'px-4'
        )}
      >
        <Link
          to='/'
          className='flex items-center no-underline'
          onClick={() => sidebarActions.close()}
          title='MyApplication'
        >
          <Activity mode={collapsed ? 'visible' : 'hidden'}>
            <Lucide.Globe className='size-6 text-foreground-primary' />
          </Activity>

          <Activity mode={!collapsed ? 'visible' : 'hidden'}>
            <span className='text-foreground-neutral text-lg font-bold tracking-tight'>
              MyApplication
            </span>
          </Activity>
        </Link>

        <Activity mode={!collapsed ? 'visible' : 'hidden'}>
          <div className='flex-1' />
          <button
            type='button'
            onClick={() => sidebarActions.close()}
            className='shrink-0 rounded-lg p-2.5 text-foreground-neutral-faded transition hover:bg-background-neutral-faded hover:text-foreground-neutral lg:hidden'
          >
            <Lucide.X className='size-5' />
          </button>
        </Activity>
      </div>

      <nav className={clx('flex-1 overflow-y-auto pt-2 pb-4', collapsed ? 'px-3' : 'px-2')}>
        {navigation.map((group, groupIndex) => (
          <div key={group.title ?? 'home'}>
            <Activity mode={group.title && !collapsed ? 'visible' : 'hidden'}>
              <p
                className={clx(
                  'text-foreground-neutral-faded/70 mb-1.5 whitespace-nowrap px-3 text-[11px] font-semibold uppercase tracking-widest',
                  groupIndex > 0 ? 'mt-6' : 'mt-4'
                )}
              >
                {group.title}
              </p>
            </Activity>

            <Activity mode={group.title && collapsed && groupIndex > 0 ? 'visible' : 'hidden'}>
              <div className='border-border-neutral mx-3 my-4 border-t' />
            </Activity>

            <ul className='m-0 list-none p-0 space-y-0.5'>
              {group.items.map((item) => (
                <li key={item.to}>
                  <Link
                    to={item.to}
                    onClick={() => sidebarActions.close()}
                    title={collapsed ? item.label : undefined}
                    className={clx(
                      'flex items-center rounded-lg text-sm font-medium no-underline transition text-foreground-neutral-faded',
                      collapsed
                        ? 'justify-center px-0 py-2.5'
                        : mobile
                          ? 'gap-3 px-3 py-2'
                          : 'gap-2.5 px-3 py-1.5'
                    )}
                    activeOptions={{ exact: item.exact }}
                    activeProps={{
                      className: 'bg-background-primary-faded text-foreground-primary'
                    }}
                    inactiveProps={{
                      className: 'hover:bg-background-neutral-faded hover:text-foreground-neutral'
                    }}
                  >
                    <item.icon
                      className={clx(
                        'shrink-0',
                        collapsed ? 'h-4.5 w-4.5' : mobile ? 'size-5' : 'size-4'
                      )}
                    />
                    {!collapsed && <span className='whitespace-nowrap'>{item.label}</span>}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </nav>
    </div>
  )
}

export function Sidebar() {
  const sidebarOpen = useStore(uiStore, (s) => s.sidebarOpen)
  const collapsed = useStore(uiStore, (s) => s.sidebarCollapsed)

  return (
    <>
      <Activity mode={sidebarOpen ? 'visible' : 'hidden'}>
        <button
          type='button'
          aria-label='Close sidebar'
          className='fixed inset-0 z-40 block bg-black/40 lg:hidden'
          onClick={() => sidebarActions.close()}
          onKeyDown={(e) => {
            if (e.key === 'Escape') sidebarActions.close()
          }}
        />
      </Activity>

      <div
        className={clx(
          'bg-background-elevation-base border-border-neutral fixed inset-y-0 left-0 z-50 w-72 border-r transition-transform duration-200 ease-in-out lg:hidden',
          sidebarOpen ? 'translate-x-0' : '-translate-x-full'
        )}
      >
        <NavContent collapsed={false} mobile />
      </div>

      <div
        className={clx(
          'bg-background-elevation-base border-border-neutral hidden shrink-0 border-r transition-[width] duration-200 ease-in-out lg:block',
          collapsed ? 'w-16' : 'w-64'
        )}
      >
        <div className='sticky top-0 h-screen overflow-y-auto overflow-x-hidden'>
          <NavContent collapsed={collapsed} />
        </div>
      </div>
    </>
  )
}
