import { createContext, useContext, useSyncExternalStore, type AnchorHTMLAttributes, type MouseEvent } from 'react'

/** Router mínimo (sin dependencias): URLs reales, enlaces rastreables por Google y SSR. */
const ServerUrl = createContext<string | null>(null)
export const ServerUrlProvider = ServerUrl.Provider

const subscribe = (cb: () => void) => {
  window.addEventListener('popstate', cb)
  window.addEventListener('lx:navigate', cb)
  return () => {
    window.removeEventListener('popstate', cb)
    window.removeEventListener('lx:navigate', cb)
  }
}
const getSnapshot = () => window.location.pathname + window.location.search

export function useUrl() {
  const server = useContext(ServerUrl)
  const url = useSyncExternalStore(subscribe, getSnapshot, () => server ?? '/')
  const [pathname, search = ''] = url.split('?')
  return { url, pathname: pathname.replace(/\/+$/, '') || '/', params: new URLSearchParams(search) }
}

export function navigate(to: string, { replace = false, scroll = true } = {}) {
  if (replace) history.replaceState(null, '', to)
  else history.pushState(null, '', to)
  window.dispatchEvent(new Event('lx:navigate'))
  if (scroll && !to.includes('#')) window.scrollTo({ top: 0, behavior: 'instant' as ScrollBehavior })
  if (to.includes('#')) requestAnimationFrame(() => document.getElementById(to.split('#')[1])?.scrollIntoView({ behavior: 'smooth' }))
}

type LinkProps = AnchorHTMLAttributes<HTMLAnchorElement> & { to: string }

export function Link({ to, onClick, ...rest }: LinkProps) {
  const handle = (e: MouseEvent<HTMLAnchorElement>) => {
    onClick?.(e)
    if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return
    e.preventDefault()
    navigate(to)
  }
  return <a href={to} onClick={handle} {...rest} />
}
