import { SITE } from '@/config'
import { bySlug, fromPrice, genderLabel, isFor, perfumes, pics, type Perfume } from '@/data/perfumes'
import { imgUrl } from '@/components/Img'

export const collections = {
  originales: { title: 'Perfumes originales', h1: 'Originales', intro: 'Creaciones auténticas de las casas más deseadas.', match: (p: Perfume) => p.type === 'ORIGINAL' },
  inspiraciones: { title: 'Perfumes inspiración 1.1', h1: 'Inspiraciones', intro: 'Fragancias de la casa inspiradas en íconos memorables, con alta duración.', match: (p: Perfume) => p.type === 'INSPIRACIÓN' },
  hombre: { title: 'Perfumes para hombre', h1: 'Hombre', intro: 'Presencia, carácter y estela que se recuerda.', match: (p: Perfume) => isFor(p, 'Hombre') },
  mujer: { title: 'Perfumes para mujer', h1: 'Mujer', intro: 'Elegancia, sensualidad y aromas que perduran.', match: (p: Perfume) => isFor(p, 'Mujer') },
  nicho: { title: 'Perfumes nicho', h1: 'Nicho', intro: 'Casas de perfumería exclusiva como Xerjoff, Montale y Bharara: aromas fuera de lo común.', match: (p: Perfume) => p.line === 'Nicho' },
} as const
export type CollectionKey = keyof typeof collections

export type Route =
  | { page: 'home' }
  | { page: 'catalog'; collection?: CollectionKey }
  | { page: 'detail'; perfume: Perfume }
  | { page: 'policy' }
  | { page: '404' }

export function matchRoute(pathname: string): Route {
  if (pathname === '/') return { page: 'home' }
  if (pathname === '/perfumes') return { page: 'catalog' }
  if (pathname === '/envios-y-garantia') return { page: 'policy' }
  const c = pathname.match(/^\/perfumes\/([a-z-]+)$/)
  if (c && c[1] in collections) return { page: 'catalog', collection: c[1] as CollectionKey }
  const d = pathname.match(/^\/perfume\/([a-z0-9-]+)$/)
  const perfume = d && bySlug(d[1])
  if (perfume) return { page: 'detail', perfume }
  return { page: '404' }
}

/** Todas las URLs que se pre-renderizan como HTML estático (SEO). */
export const staticPaths = () => [
  '/',
  '/perfumes',
  '/envios-y-garantia',
  ...Object.keys(collections).map((k) => `/perfumes/${k}`),
  ...perfumes.map((p) => `/perfume/${p.slug}`),
]

export type Seo = { title: string; description: string; path: string; image: string; type: string; jsonLd: object[]; noindex?: boolean }

const org = {
  '@context': 'https://schema.org',
  '@type': 'Store',
  '@id': `${SITE.url}/#store`,
  name: SITE.name,
  slogan: SITE.slogan,
  url: SITE.url,
  logo: `${SITE.url}/img/brand/icon-512.png`,
  image: `${SITE.url}/og-image.jpg`,
  telephone: `+${SITE.whatsapp}`,
  email: SITE.email,
  priceRange: '$$',
  address: { '@type': 'PostalAddress', addressLocality: SITE.city, addressRegion: SITE.region, addressCountry: SITE.country },
  areaServed: { '@type': 'Country', name: 'Colombia' },
  sameAs: [SITE.instagram],
}

const crumbs = (items: [string, string][]) => ({
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: items.map(([name, path], i) => ({ '@type': 'ListItem', position: i + 1, name, item: SITE.url + path })),
})

export function seoFor(route: Route, pathname: string): Seo {
  const base = { path: pathname, image: `${SITE.url}/og-image.jpg`, type: 'website' }
  if (route.page === 'home')
    return { ...base, title: `${SITE.name} · ${SITE.slogan} | Bucaramanga`, description: SITE.description, jsonLd: [org, { '@context': 'https://schema.org', '@type': 'WebSite', name: SITE.name, url: SITE.url }] }
  if (route.page === 'catalog') {
    const c = route.collection ? collections[route.collection] : null
    const title = c ? `${c.title} en Bucaramanga | ${SITE.shortName}` : `Perfumes originales e inspiraciones 1.1 | ${SITE.shortName}`
    const list = c ? perfumes.filter(c.match) : perfumes
    return {
      ...base,
      title,
      description: `${c ? c.intro : 'Descubre nuestra colección de perfumes originales e inspiraciones de alta duración.'} Envíos a toda Colombia desde Bucaramanga. Pide por WhatsApp.`,
      jsonLd: [
        crumbs([['Inicio', '/'], ['Perfumes', '/perfumes'], ...(c ? [[c.h1, pathname] as [string, string]] : [])]),
        { '@context': 'https://schema.org', '@type': 'ItemList', itemListElement: list.map((p, i) => ({ '@type': 'ListItem', position: i + 1, url: `${SITE.url}/perfume/${p.slug}`, name: p.name })) },
      ],
    }
  }
  if (route.page === 'detail') {
    const p = route.perfume
    const price = fromPrice(p)
    const tipo = p.type === 'ORIGINAL' ? 'original' : '1.1 premium'
    const offers = price > 0
      ? { offers: { '@type': 'Offer', priceCurrency: 'COP', price, availability: p.inStock === false ? 'https://schema.org/OutOfStock' : 'https://schema.org/InStock', seller: { '@id': `${SITE.url}/#store` } } }
      : {}
    return {
      ...base,
      type: 'product',
      image: imgUrl(pics(p)[0], 1200),
      title: `${p.name} ${p.brand} ${tipo} · ${p.sizes[0].ml} ml | ${SITE.shortName} Bucaramanga`,
      description: `${p.name} de ${p.brand}, versión ${tipo}. ${p.short} ${p.family}, para ${genderLabel(p).toLowerCase()}.${price > 0 ? ` Desde ${new Intl.NumberFormat('es-CO').format(price)} COP.` : ''} Envíos a toda Colombia.`.slice(0, 300),
      jsonLd: [
        crumbs([['Inicio', '/'], ['Perfumes', '/perfumes'], [p.type === 'ORIGINAL' ? 'Originales' : 'Inspiraciones', `/perfumes/${p.type === 'ORIGINAL' ? 'originales' : 'inspiraciones'}`], [p.name, pathname]]),
        {
          '@context': 'https://schema.org',
          '@type': 'Product',
          name: `${p.name} ${tipo}`,
          description: p.description,
          image: pics(p).map((i) => imgUrl(i, 1200)),
          sku: p.slug,
          category: 'Perfumes',
          brand: { '@type': 'Brand', name: p.type === 'ORIGINAL' ? p.brand : SITE.shortName },
          ...offers,
        },
      ],
    }
  }
  if (route.page === 'policy')
    return { ...base, title: `Envíos, cambios y garantía | ${SITE.shortName}`, description: 'Tarifas de envío en Bucaramanga y a toda Colombia, tiempos de entrega, garantía de 30 días por fallas de calidad y política de cambios de LUXUME Perfumería.', jsonLd: [crumbs([['Inicio', '/'], ['Envíos y garantía', '/envios-y-garantia']])] }
  return { ...base, title: `Página no encontrada | ${SITE.shortName}`, description: SITE.description, jsonLd: [], noindex: true }
}

const esc = (s: string) => s.replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;')

/** Etiquetas <head> como HTML (usado por el pre-render). */
export function headHtml(s: Seo) {
  const url = SITE.url + (s.path === '/' ? '/' : s.path)
  return [
    `<title>${esc(s.title)}</title>`,
    `<meta name="description" content="${esc(s.description)}">`,
    `<link rel="canonical" href="${url}">`,
    s.noindex ? `<meta name="robots" content="noindex">` : `<meta name="robots" content="index, follow, max-image-preview:large">`,
    `<meta property="og:type" content="${s.type}">`,
    `<meta property="og:site_name" content="${SITE.name}">`,
    `<meta property="og:locale" content="es_CO">`,
    `<meta property="og:title" content="${esc(s.title)}">`,
    `<meta property="og:description" content="${esc(s.description)}">`,
    `<meta property="og:url" content="${url}">`,
    `<meta property="og:image" content="${esc(s.image)}">`,
    `<meta name="twitter:card" content="summary_large_image">`,
    ...s.jsonLd.map((j) => `<script type="application/ld+json">${JSON.stringify(j).replace(/</g, '\\u003c')}</script>`),
  ].join('\n    ')
}

/** Actualiza el <head> al navegar en el navegador. */
export function applyHead(s: Seo) {
  document.title = s.title
  const url = SITE.url + (s.path === '/' ? '/' : s.path)
  const set = (sel: string, attr: string, val: string) => document.head.querySelector(sel)?.setAttribute(attr, val)
  set('meta[name="description"]', 'content', s.description)
  set('link[rel="canonical"]', 'href', url)
  set('meta[property="og:title"]', 'content', s.title)
  set('meta[property="og:description"]', 'content', s.description)
  set('meta[property="og:url"]', 'content', url)
  set('meta[property="og:image"]', 'content', s.image)
  document.head.querySelectorAll('script[type="application/ld+json"]').forEach((n) => n.remove())
  s.jsonLd.forEach((j) => {
    const el = document.createElement('script')
    el.type = 'application/ld+json'
    el.text = JSON.stringify(j)
    document.head.appendChild(el)
  })
}
