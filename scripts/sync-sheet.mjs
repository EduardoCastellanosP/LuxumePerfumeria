// 🔄 Lee la hoja de Google (publicada como CSV), descarga y optimiza las fotos nuevas
// y actualiza src/data/catalog.json. Uso: SHEET_CSV_URL=... node scripts/sync-sheet.mjs
import fs from 'node:fs'
import crypto from 'node:crypto'
import { parseCSV, rowToPerfume, yes } from './lib/sheet.mjs'
import { processPhoto, photoExists } from './lib/photo.mjs'

const SRC = process.env.SHEET_CSV_URL
if (!SRC) { console.error('Falta SHEET_CSV_URL'); process.exit(1) }
const CATALOG = 'src/data/catalog.json'
const CACHE = 'src/data/photo-cache.json'
const cache = fs.existsSync(CACHE) ? JSON.parse(fs.readFileSync(CACHE, 'utf8')) : {}

const read = async (src) => (/^https?:/.test(src) ? (await fetch(src, { redirect: 'follow' })) : null)
let csv
try {
  const res = await read(SRC)
  csv = res ? (res.ok ? await res.text() : (() => { throw new Error(`HTTP ${res.status}`) })()) : fs.readFileSync(SRC, 'utf8')
} catch (e) { console.error(`❌ No se pudo leer la hoja: ${e.message}. La web NO se modifica.`); process.exit(1) }
if (/<html/i.test(csv.slice(0, 500))) { console.error('❌ El enlace no es CSV publicado (Archivo → Compartir → Publicar en la web → CSV). La web NO se modifica.'); process.exit(1) }

// Enlace de Drive / URL / ruta ya existente → { key, url } o { local }
function source(ref) {
  ref = ref.trim()
  if (/^perfumes\/[a-z0-9-]+$/.test(ref)) return { local: ref }
  const id = ref.match(/\/d\/([\w-]{20,})/)?.[1] ?? ref.match(/[?&]id=([\w-]{20,})/)?.[1]
  if (id) return { key: `drive:${id}`, url: `https://drive.usercontent.google.com/download?id=${id}&export=download&confirm=t` }
  if (/^https?:\/\//.test(ref)) return { key: ref, url: ref }
  return null
}

const rows = parseCSV(csv)
const out = []; const seen = new Set(); let problems = 0
for (const [i, r] of rows.entries()) {
  if (r.mostrar && !yes(r.mostrar)) continue
  const fila = i + 2
  const warn = (m) => { problems++; console.warn(`⚠️  Fila ${fila} (${r.nombre || 'sin nombre'}): ${m}`) }
  let p
  try { p = rowToPerfume(r, warn) } catch (e) { warn(`${e.message} → se omite`); continue }
  let s = p.slug; let n = 2
  while (seen.has(s)) s = `${p.slug}-${n++}`
  p.slug = s; seen.add(s)

  for (const ref of String(r.fotos ?? '').split(/[\n,]+/).filter((x) => x.trim())) {
    const src = source(ref)
    if (!src) { warn(`foto no reconocida: ${ref}`); continue }
    if (src.local) { photoExists(src.local.slice(9)) ? p.images.push(src.local) : warn(`no existe ${src.local}`); continue }
    const cached = cache[src.key]
    if (cached && photoExists(cached.slice(9))) { p.images.push(cached); continue }
    try {
      const res = await fetch(src.url, { redirect: 'follow' })
      if (!res.ok) throw new Error(`HTTP ${res.status}`)
      const buf = Buffer.from(await res.arrayBuffer())
      const name = `${p.slug}-${crypto.createHash('md5').update(src.key).digest('hex').slice(0, 6)}`
      await processPhoto(buf, name)
      cache[src.key] = `perfumes/${name}`
      p.images.push(`perfumes/${name}`)
      console.log(`📸 ${p.name}: foto nueva → perfumes/${name}`)
    } catch (e) { warn(`no se pudo descargar la foto (¿está compartida como "Cualquier persona con el enlace"? ¿es JPG/PNG?): ${e.message}`) }
  }
  if (!p.images.length) warn('sin fotos: se mostrará una foto de muestra')
  out.push(p)
}

if (!out.length) { console.error('❌ La hoja no tiene perfumes válidos. La web NO se modifica.'); process.exit(1) }
const next = JSON.stringify(out, null, 1)
const changed = !fs.existsSync(CATALOG) || fs.readFileSync(CATALOG, 'utf8') !== next
fs.writeFileSync(CATALOG, next)
fs.writeFileSync(CACHE, JSON.stringify(cache, null, 1))
console.log(`${changed ? '✅ Catálogo actualizado' : '✔ Sin cambios'}: ${out.length} perfumes${problems ? `, ${problems} avisos` : ''}`)
if (process.env.GITHUB_OUTPUT) fs.appendFileSync(process.env.GITHUB_OUTPUT, `changed=${changed}\n`)
