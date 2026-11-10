// Formato de la hoja de Google ⇄ formato del catálogo de la web.
import { slugify } from './photo.mjs'

export const COLUMNS = [
  'mostrar', 'slug', 'nombre', 'marca', 'tipo', 'genero', 'linea', 'precio', 'ml', 'familia', 'grupos',
  'ocasiones', 'temporada', 'resumen', 'descripcion', 'salida', 'corazon', 'fondo', 'notas_principales', 'destacado', 'fotos',
]

const GROUPS = ['Amaderado', 'Oriental', 'Floral', 'Cítrico', 'Fresco', 'Dulce']
const OCCASIONS = ['Día', 'Noche', 'Oficina', 'Cita']
const norm = (s) => slugify(s ?? '')
const pickList = (txt, allowed, warn) =>
  String(txt ?? '').split(/[,;\n]/).map((x) => x.trim()).filter(Boolean).map((x) => {
    const hit = allowed.find((a) => norm(a) === norm(x))
    if (!hit) warn(`"${x}" no es válido (usa: ${allowed.join(', ')})`)
    return hit
  }).filter(Boolean)
const yes = (v) => ['si', 'sí', 'x', 'true', '1'].includes(String(v ?? '').trim().toLowerCase())

// ── CSV ──
export function parseCSV(text) {
  const rows = []; let row = []; let cell = ''; let q = false
  text = text.replace(/^﻿/, '')
  for (let i = 0; i < text.length; i++) {
    const c = text[i]
    if (q) {
      if (c === '"' && text[i + 1] === '"') { cell += '"'; i++ }
      else if (c === '"') q = false
      else cell += c
    } else if (c === '"') q = true
    else if (c === ',') { row.push(cell); cell = '' }
    else if (c === '\n' || c === '\r') {
      if (c === '\r' && text[i + 1] === '\n') i++
      row.push(cell); rows.push(row); row = []; cell = ''
    } else cell += c
  }
  if (cell || row.length) { row.push(cell); rows.push(row) }
  const head = (rows.shift() ?? []).map((h) => norm(h).replace(/-/g, '_'))
  return rows.filter((r) => r.some((c) => c.trim())).map((r) => Object.fromEntries(head.map((h, i) => [h, (r[i] ?? '').trim()])))
}
export const toCSV = (rows) =>
  [COLUMNS, ...rows.map((r) => COLUMNS.map((c) => r[c] ?? ''))]
    .map((r) => r.map((v) => (/[",\n]/.test(String(v)) ? `"${String(v).replace(/"/g, '""')}"` : v)).join(','))
    .join('\n')

// ── Catálogo → fila (para crear la hoja la primera vez) ──
export const perfumeToRow = (p) => ({
  mostrar: 'SI', slug: p.slug, nombre: p.name, marca: p.brand,
  tipo: p.type === 'ORIGINAL' ? 'Original' : '1.1',
  genero: p.gender, linea: p.line, precio: p.sizes[0].price || '', ml: p.sizes[0].ml,
  familia: p.family, grupos: p.groups.join(', '), ocasiones: p.occasions.join(', '), temporada: p.season,
  resumen: p.short, descripcion: p.description,
  salida: p.notes.top ?? '', corazon: p.notes.heart ?? '', fondo: p.notes.base ?? '', notas_principales: p.notes.main ?? '',
  destacado: p.featured ? 'SI' : '', fotos: p.images.join('\n'),
})

// ── Fila → perfume (sin fotos; las fotos las resuelve sync-sheet) ──
export function rowToPerfume(r, warn) {
  const name = r.nombre; const brand = r.marca
  if (!name || !brand) throw new Error('falta nombre o marca')
  const t = norm(r.tipo)
  const type = t === 'original' ? 'ORIGINAL' : 'INSPIRACIÓN'
  const g = norm(r.genero)
  const gender = g.startsWith('muj') || g.startsWith('dam') ? 'Mujer' : g.startsWith('hom') || g.startsWith('cab') ? 'Hombre' : 'Unisex'
  const l = norm(r.linea)
  const line = l.startsWith('nich') ? 'Nicho' : l.startsWith('dise') ? 'Diseñador' : 'Árabe'
  const price = Number(String(r.precio).replace(/[^\d]/g, '')) || 0
  const ml = Number(String(r.ml).replace(/[^\d]/g, '')) || 100
  const sep = (s) => String(s ?? '').split(/[,;\n·]/).map((x) => x.trim()).filter(Boolean).map((x) => x[0].toUpperCase() + x.slice(1)).join(' · ')
  const notes = {}
  if (r.salida) notes.top = sep(r.salida)
  if (r.corazon) notes.heart = sep(r.corazon)
  if (r.fondo) notes.base = sep(r.fondo)
  if (r.notas_principales || !Object.keys(notes).length) notes.main = sep(r.notas_principales)
  const p = {
    slug: slugify(r.slug || name), name, brand, type, gender, line,
    family: r.familia || '', groups: pickList(r.grupos, GROUPS, warn), occasions: pickList(r.ocasiones, OCCASIONS, warn),
    season: r.temporada || 'Todo el año', short: r.resumen || '', description: r.descripcion || r.resumen || '',
    notes, sizes: [{ ml, price }], images: [],
  }
  if (yes(r.destacado)) p.featured = true
  return p
}
export { yes }
