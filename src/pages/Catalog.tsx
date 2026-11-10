import { useEffect, useMemo, useState } from 'react'
import { Icon } from '@/components/Icon'
import { ProductCard } from '@/components/ui'
import { familyGroups, fromPrice, genders, isFor, lines, occasions, perfumes } from '@/data/perfumes'
import { formatPrice } from '@/lib/format'
import { collections, type CollectionKey } from '@/lib/routes'
import { useUrl } from '@/lib/router'

type Filters = { tipo: string[]; genero: string[]; linea: string[]; familia: string[]; ocasion: string[] }
const empty: Filters = { tipo: [], genero: [], linea: [], familia: [], ocasion: [] }
const groups: [keyof Filters, string, readonly string[]][] = [
  ['tipo', 'Tipo', ['Original', 'Inspiración']],
  ['genero', 'Género', genders],
  ['linea', 'Línea', lines],
  ['familia', 'Familia olfativa', familyGroups],
  ['ocasion', 'Ocasión', occasions],
]

const allPrices = perfumes.map(fromPrice).filter((x) => x > 0)
const HAS_PRICES = allPrices.length > 1
const MIN = HAS_PRICES ? Math.floor(Math.min(...allPrices) / 10000) * 10000 : 0
const MAX = HAS_PRICES ? Math.ceil(Math.max(...allPrices) / 10000) * 10000 : 0

export function Catalog({ collection }: { collection?: CollectionKey }) {
  const { params } = useUrl()
  const c = collection ? collections[collection] : null
  const [open, setOpen] = useState(false)
  const [sort, setSort] = useState('destacados')
  const [max, setMax] = useState(MAX)
  const [f, setF] = useState<Filters>(empty)

  // Filtros desde la URL (ej. /perfumes?familia=Floral)
  useEffect(() => {
    const familia = params.get('familia')
    setF({ ...empty, familia: familia ? [familia] : [] })
    setMax(MAX)
  }, [collection, params.get('familia')])

  const toggle = (k: keyof Filters, v: string) =>
    setF((prev) => ({ ...prev, [k]: prev[k].includes(v) ? prev[k].filter((x) => x !== v) : [...prev[k], v] }))

  const list = useMemo(() => {
    const r = perfumes.filter(
      (p) =>
        (!c || c.match(p)) &&
        (!f.tipo.length || f.tipo.includes(p.type === 'ORIGINAL' ? 'Original' : 'Inspiración')) &&
        (!f.genero.length || f.genero.some((g) => isFor(p, g as 'Hombre' | 'Mujer'))) &&
        (!f.linea.length || f.linea.includes(p.line)) &&
        (!f.familia.length || p.groups.some((g) => f.familia.includes(g))) &&
        (!f.ocasion.length || p.occasions.some((o) => f.ocasion.includes(o))) &&
        (!HAS_PRICES || fromPrice(p) === 0 || fromPrice(p) <= max),
    )
    const pv = (x: typeof r[number], asc: boolean) => fromPrice(x) || (asc ? Infinity : -Infinity)
    if (sort === 'precio-asc') r.sort((a, b) => pv(a, true) - pv(b, true))
    if (sort === 'precio-desc') r.sort((a, b) => pv(b, false) - pv(a, false))
    if (sort === 'az') r.sort((a, b) => a.name.localeCompare(b.name, 'es'))
    if (sort === 'destacados') r.sort((a, b) => Number(!!b.featured) - Number(!!a.featured))
    return r
  }, [c, f, max, sort])

  const active = Object.values(f).flat().length + (max < MAX ? 1 : 0)

  return (
    <main className="page-main" id="contenido">
      <div className="catalog-hero">
        <span className="eyebrow">Colección LUXUME</span>
        <h1>{c ? c.h1 : 'Perfumería'}</h1>
        <p>{c ? c.intro : 'Perfumes originales e inspiraciones de alta duración. Encuentra una presencia que hable por ti.'}</p>
      </div>
      <div className="catalog-toolbar">
        <span aria-live="polite">{list.length} fragancias</span>
        <button className="mobile-filter" onClick={() => setOpen(true)}>
          <Icon name="filter" /> Filtrar{active ? ` (${active})` : ''}
        </button>
        <label>
          Ordenar por
          <select value={sort} onChange={(e) => setSort(e.target.value)}>
            <option value="destacados">Destacados</option>
            <option value="precio-asc">Precio ↑</option>
            <option value="precio-desc">Precio ↓</option>
            <option value="az">Nombre A–Z</option>
          </select>
        </label>
      </div>
      <div className="catalog-layout">
        <aside className={`filters ${open ? 'open' : ''}`} aria-label="Filtros">
          <div className="filter-head">
            <span>Filtros</span>
            <button onClick={() => setOpen(false)} aria-label="Cerrar filtros"><Icon name="close" /></button>
          </div>
          {groups
            .filter(([k]) => !(k === 'tipo' && (collection === 'originales' || collection === 'inspiraciones')) && !(k === 'genero' && (collection === 'hombre' || collection === 'mujer')) && !(k === 'linea' && collection === 'nicho'))
            .map(([k, title, options]) => (
              <fieldset key={k}>
                <legend>{title}</legend>
                {options.map((o) => (
                  <label key={o}>
                    <input type="checkbox" checked={f[k].includes(o)} onChange={() => toggle(k, o)} /> <span>{o}</span>
                  </label>
                ))}
              </fieldset>
            ))}
          {HAS_PRICES && <fieldset>
            <legend>Precio máximo</legend>
            <input className="price-slider" type="range" min={MIN} max={MAX} step={10000} value={max} onChange={(e) => setMax(+e.target.value)} aria-label="Precio máximo" />
            <div className="price-range">
              <span>{formatPrice(MIN).replace(' COP', '')}</span>
              <span>{formatPrice(max).replace(' COP', '')}</span>
            </div>
          </fieldset>}
          {active > 0 && (
            <button className="clear-filters" onClick={() => { setF(empty); setMax(MAX) }}>Limpiar filtros</button>
          )}
          <button className="btn gold apply" onClick={() => setOpen(false)}>Ver {list.length} resultados</button>
        </aside>
        {open && <button className="filter-scrim" onClick={() => setOpen(false)} aria-label="Cerrar filtros" />}
        <div className="product-grid catalog-grid">
          {list.map((p) => <ProductCard key={p.slug} product={p} />)}
          {list.length === 0 && (
            <p className="no-results">No hay fragancias con esos filtros. <button onClick={() => { setF(empty); setMax(MAX) }}>Limpiar filtros</button></p>
          )}
        </div>
      </div>
    </main>
  )
}
