import { Store } from '@tanstack/react-store'

const STORAGE_KEY = 'sidebar-collapsed'

const getInitialCollapsed = (): boolean => {
  try {
    return localStorage.getItem(STORAGE_KEY) === 'true'
  } catch {
    return false
  }
}

export const uiStore = new Store({
  sidebarOpen: false,
  sidebarCollapsed: getInitialCollapsed()
})

uiStore.subscribe(() => {
  try {
    localStorage.setItem(STORAGE_KEY, String(uiStore.state.sidebarCollapsed))
  } catch {}
})

export const sidebarActions = {
  open: () => uiStore.setState((s) => ({ ...s, sidebarOpen: true })),
  close: () => uiStore.setState((s) => ({ ...s, sidebarOpen: false })),
  toggle: () => uiStore.setState((s) => ({ ...s, sidebarOpen: !s.sidebarOpen })),
  toggleCollapse: () => uiStore.setState((s) => ({ ...s, sidebarCollapsed: !s.sidebarCollapsed })),
  collapse: () => uiStore.setState((s) => ({ ...s, sidebarCollapsed: true })),
  expand: () => uiStore.setState((s) => ({ ...s, sidebarCollapsed: false }))
}
