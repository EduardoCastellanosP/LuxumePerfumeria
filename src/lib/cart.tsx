import { createContext, useCallback, useContext, useEffect, useMemo, useState, type ReactNode } from 'react'
import { bySlug, type Perfume } from '@/data/perfumes'

export type CartItem = { slug: string; ml: number; qty: number }
type Line = CartItem & { perfume: Perfume; price: number }

type Ctx = {
  lines: Line[]
  count: number
  subtotal: number
  open: boolean
  setOpen: (v: boolean) => void
  add: (p: Perfume, ml?: number, qty?: number) => void
  update: (slug: string, ml: number, delta: number) => void
  clear: () => void
}

const CartCtx = createContext<Ctx | null>(null)
const KEY = 'luxume-cart-v1'

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([])
  const [open, setOpen] = useState(false)
  const [ready, setReady] = useState(false)

  useEffect(() => {
    try {
      const saved = JSON.parse(localStorage.getItem(KEY) || '[]')
      if (Array.isArray(saved)) setItems(saved.filter((i) => bySlug(i.slug)))
    } catch {}
    setReady(true)
  }, [])
  useEffect(() => {
    if (!ready) return
    try { localStorage.setItem(KEY, JSON.stringify(items)) } catch {}
  }, [items, ready])

  const add = useCallback((p: Perfume, ml = p.sizes[0].ml, qty = 1) => {
    setItems((prev) => {
      const found = prev.find((i) => i.slug === p.slug && i.ml === ml)
      return found
        ? prev.map((i) => (i === found ? { ...i, qty: i.qty + qty } : i))
        : [...prev, { slug: p.slug, ml, qty }]
    })
    setOpen(true)
  }, [])

  const update = useCallback((slug: string, ml: number, delta: number) => {
    setItems((prev) => prev.map((i) => (i.slug === slug && i.ml === ml ? { ...i, qty: i.qty + delta } : i)).filter((i) => i.qty > 0))
  }, [])

  const value = useMemo<Ctx>(() => {
    const lines = items.map((i) => {
      const perfume = bySlug(i.slug)!
      const price = perfume.sizes.find((s) => s.ml === i.ml)?.price ?? perfume.sizes[0].price
      return { ...i, perfume, price }
    })
    return {
      lines,
      count: lines.reduce((a, l) => a + l.qty, 0),
      subtotal: lines.reduce((a, l) => a + l.price * l.qty, 0),
      open,
      setOpen,
      add,
      update,
      clear: () => setItems([]),
    }
  }, [items, open, add, update])

  return <CartCtx.Provider value={value}>{children}</CartCtx.Provider>
}

export const useCart = () => {
  const c = useContext(CartCtx)
  if (!c) throw new Error('useCart fuera de CartProvider')
  return c
}
