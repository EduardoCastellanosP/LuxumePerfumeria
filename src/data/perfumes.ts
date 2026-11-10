/**
 * 🧴 CATÁLOGO LUXUME
 * Los perfumes se editan en la hoja de Google del cliente. Cada hora GitHub la lee,
 * optimiza las fotos nuevas y publica la web. Ver GUIA-GOOGLE-SHEETS.md
 */

import catalog from './catalog.json'

export type Gender = 'Hombre' | 'Mujer' | 'Unisex'
export type FamilyGroup = 'Amaderado' | 'Oriental' | 'Floral' | 'Cítrico' | 'Fresco' | 'Dulce'
export type Occasion = 'Día' | 'Noche' | 'Oficina' | 'Cita'
export type Line = 'Árabe' | 'Diseñador' | 'Nicho'

export type Perfume = {
  slug: string
  name: string
  /** Casa / marca de la fragancia */
  brand: string
  type: 'ORIGINAL' | 'INSPIRACIÓN'
  gender: Gender
  line: Line
  family: string
  groups: FamilyGroup[]
  occasions: Occasion[]
  season: string
  sizes: { ml: number; price: number }[]
  images: string[]
  short: string
  description: string
  /** Pirámide (salida/corazón/fondo) o, si no hay, notas principales en "main" */
  notes: { top?: string; heart?: string; base?: string; main?: string }
  featured?: boolean
  inStock?: boolean
}

const U = 'https://images.unsplash.com/photo-'
export const photos = {
  silk: `${U}1518893063132-36e46dbe2428`,
  hero: `${U}1608528577891-eb055944f2e7`,
  noir: `${U}1585218334450-afcf929da36e`,
  black: `${U}1594035910387-fea47794261f`,
  blue: `${U}1615160460366-2c9a41771b51`,
  red: `${U}1720423738890-37689a6f6b95`,
  glass: `${U}1598634222670-87c5f558119c`,
  gold: `${U}1588405748880-12d1d2a59f75`,
}
const sample = [photos.noir, photos.red, photos.black, photos.blue, photos.glass, photos.gold, photos.hero]

// El catálogo vive en catalog.json y se actualiza solo desde la hoja de Google (scripts/sync-sheet.mjs).
export const perfumes = catalog as Perfume[]

export const familyGroups: FamilyGroup[] = ['Amaderado', 'Oriental', 'Floral', 'Cítrico', 'Fresco', 'Dulce']
export const genders = ['Mujer', 'Hombre'] as const
export const lines: Line[] = ['Árabe', 'Diseñador', 'Nicho']
export const occasions: Occasion[] = ['Día', 'Noche', 'Oficina', 'Cita']

/** Unisex cuenta como Hombre y como Mujer */
export const isFor = (p: Perfume, g: 'Hombre' | 'Mujer') => p.gender === g || p.gender === 'Unisex'
export const genderLabel = (p: Perfume) => (p.gender === 'Unisex' ? 'Hombre y mujer' : p.gender)

/** Precio más bajo con valor (0 = sin precio aún) */
export const fromPrice = (p: Perfume) => {
  const v = p.sizes.map((s) => s.price).filter((x) => x > 0)
  return v.length ? Math.min(...v) : 0
}
/** Fotos reales o, mientras llegan, fotos de muestra */
export const pics = (p: Perfume) => {
  if (p.images.length) return p.images
  const i = perfumes.indexOf(p)
  return [sample[i % sample.length], sample[(i + 3) % sample.length]]
}
export const bySlug = (slug: string) => perfumes.find((p) => p.slug === slug)
export const inspiredLabel = (p: Perfume) => (p.type === 'ORIGINAL' ? `Original · ${p.brand}` : `Versión 1.1 premium · ${p.brand}`)

export const related = (p: Perfume, n = 4) =>
  perfumes
    .filter((x) => x.slug !== p.slug)
    .map((x) => ({ x, score: x.groups.filter((g) => p.groups.includes(g)).length * 2 + (x.gender === p.gender ? 1 : 0) + (x.brand === p.brand ? 1 : 0) }))
    .sort((a, b) => b.score - a.score)
    .slice(0, n)
    .map((r) => r.x)
