import { useEffect, useRef, useState } from 'react'
import { Link, useUrl } from '@/lib/router'
import { useCart } from '@/lib/cart'
import { perfumes, inspiredLabel, fromPrice, pics } from '@/data/perfumes'
import { priceLabel } from '@/lib/format'
import { Icon } from './Icon'
import { Img } from './Img'

const left = [
  ['Inicio', '/'],
  ['Originales', '/perfumes/originales'],
  ['Inspiraciones', '/perfumes/inspiraciones'],
] as const
const right = [
  ['Hombre', '/perfumes/hombre'],
  ['Mujer', '/perfumes/mujer'],
  ['Nicho', '/perfumes/nicho'],
] as const

const norm = (s: string) => s.normalize('NFD').replace(/[̀-ͯ]/g, '').toLowerCase()

function Search({ close }: { close: () => void }) {
  const [q, setQ] = useState('')
  const input = useRef<HTMLInputElement>(null)
  useEffect(() => input.current?.focus(), [])
  const results = q.trim()
    ? perfumes.filter((p) => norm([p.name, p.brand, p.family, p.notes.top, p.notes.heart, p.notes.base, p.notes.main].join(' ')).includes(norm(q))).slice(0, 6)
    : []
  return (
    <div className="search-layer" role="dialog" aria-label="Buscar perfumes" onKeyDown={(e) => e.key === 'Escape' && close()}>
      <button className="search-scrim" onClick={close} aria-label="Cerrar búsqueda" />
      <div className="search-panel">
        <div className="search-field">
          <Icon name="search" />
          <input ref={input} value={q} onChange={(e) => setQ(e.target.value)} placeholder="Busca por nombre, marca o nota (ej. vainilla)…" aria-label="Buscar" />
          <button onClick={close} aria-label="Cerrar"><Icon name="close" /></button>
        </div>
        {q.trim() && (
          <ul className="search-results">
            {results.length === 0 && <li className="empty">No encontramos “{q}”. Escríbenos por WhatsApp y te asesoramos.</li>}
            {results.map((p) => (
              <li key={p.slug}>
                <Link to={`/perfume/${p.slug}`} onClick={close}>
                  <Img src={pics(p)[0]} alt="" sizes="64px" width={64} height={80} />
                  <span><b>{p.name}</b><small>{inspiredLabel(p)}</small></span>
                  <em>{priceLabel(fromPrice(p))}</em>
                </Link>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  )
}

export function Header() {
  const { pathname } = useUrl()
  const { count, setOpen } = useCart()
  const [mobile, setMobile] = useState(false)
  const [search, setSearch] = useState(false)
  useEffect(() => setMobile(false), [pathname])
  const navLink = ([label, to]: readonly [string, string]) => (
    <Link key={to} to={to} className={pathname === to ? 'active' : ''} aria-current={pathname === to ? 'page' : undefined}>
      {label}
    </Link>
  )
  return (
    <header className="site-header">
      <button className="icon-btn menu-btn" onClick={() => setMobile(!mobile)} aria-label={mobile ? 'Cerrar menú' : 'Abrir menú'} aria-expanded={mobile}>
        <Icon name={mobile ? 'close' : 'menu'} />
      </button>
      <nav className="nav nav-left" aria-label="Principal">{left.map(navLink)}</nav>
      <Link to="/" className="brand" aria-label="LUXUME Perfumería, inicio">
        <img src="/img/brand/logo-240.webp" srcSet="/img/brand/logo-240.webp 240w, /img/brand/logo-480.webp 480w" sizes="120px" width={120} height={73} alt="LUXUME Perfumería" />
      </Link>
      <nav className="nav nav-right" aria-label="Colecciones">{right.map(navLink)}</nav>
      <div className="header-actions">
        <button className="icon-btn" aria-label="Buscar" onClick={() => setSearch(true)}>
          <Icon name="search" />
        </button>
        <button className="icon-btn bag-icon" onClick={() => setOpen(true)} aria-label={`Abrir bolsa, ${count} productos`}>
          <Icon name="bag" />
          <span>{count}</span>
        </button>
      </div>
      {mobile && <nav className="mobile-nav" aria-label="Menú móvil">{[...left, ...right].map(([label, to]) => (
        <Link key={to} to={to}>{label}<Icon name="arrow" size={16} /></Link>
      ))}</nav>}
      {search && <Search close={() => setSearch(false)} />}
    </header>
  )
}
