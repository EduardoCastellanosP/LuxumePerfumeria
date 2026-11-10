// Convierte una foto (ruta o Buffer) en AVIF + WebP de 4 tamaños, formato 4:5, SIN recortar el producto.
import fs from 'node:fs'
import path from 'node:path'
import sharp from 'sharp'

export const OUT = path.resolve('public/img/perfumes')
const WIDTHS = [480, 800, 1200, 1600]

export async function processPhoto(input, name) {
  fs.mkdirSync(OUT, { recursive: true })
  const img = sharp(input).rotate()
  const meta = await img.metadata()
  const W0 = (meta.orientation ?? 1) >= 5 ? meta.height : meta.width
  const H0 = (meta.orientation ?? 1) >= 5 ? meta.width : meta.height
  for (const w of WIDTHS) {
    const tw = w
    const th = Math.round(w * 1.25)
    const scale = Math.min(tw / W0, th / H0) * 0.96
    const rw = Math.min(tw, Math.round(W0 * scale))
    const rh = Math.min(th, Math.round(H0 * scale))
    const left = Math.floor((tw - rw) / 2)
    const top = Math.floor((th - rh) / 2)
    // El espacio que falta se rellena extendiendo el fondo de la misma foto (sin bordes visibles)
    const pipe = img.clone().resize({ width: rw, height: rh, fit: 'fill' })
      .extend({ left, right: tw - rw - left, top, bottom: th - rh - top, extendWith: 'copy' })
    await pipe.clone().webp({ quality: 80, effort: 5 }).toFile(path.join(OUT, `${name}-${w}.webp`))
    await pipe.clone().avif({ quality: 55, effort: 3 }).toFile(path.join(OUT, `${name}-${w}.avif`))
  }
}

export const photoExists = (name) => fs.existsSync(path.join(OUT, `${name}-480.webp`))

export const slugify = (s) =>
  String(s).toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '').replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '')
