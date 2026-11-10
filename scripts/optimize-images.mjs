// 📸 Optimiza las fotos reales: pon JPG/PNG en /fotos y ejecuta `npm run images`.
// Genera AVIF + WebP en 4 tamaños dentro de public/img/perfumes/.
// Luego en src/data/perfumes.ts usa: images: ['perfumes/nombre-archivo'] (sin extensión).
import fs from 'node:fs'
import path from 'node:path'
import sharp from 'sharp'

const IN = path.resolve('fotos')
const OUT = path.resolve('public/img/perfumes')
const WIDTHS = [480, 800, 1200, 1600]
fs.mkdirSync(OUT, { recursive: true })

const files = fs.readdirSync(IN).filter((f) => /\.(jpe?g|png|webp|tiff?)$/i.test(f))
if (!files.length) console.log('No hay fotos en /fotos')

for (const f of files) {
  const name = path.parse(f).name.toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '').replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '')
  const img = sharp(path.join(IN, f)).rotate()
  const { width } = await img.metadata()
  // Nunca se recorta el producto: la foto se ajusta completa dentro del formato 4:5
  // y el espacio que falta se rellena extendiendo el fondo de la misma foto (sin bordes visibles).
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
    const pipe = img
      .clone()
      .resize({ width: rw, height: rh, fit: 'fill' })
      .extend({ left, right: tw - rw - left, top, bottom: th - rh - top, extendWith: 'copy' })
    await pipe.clone().webp({ quality: 80, effort: 5 }).toFile(path.join(OUT, `${name}-${w}.webp`))
    await pipe.clone().avif({ quality: 55, effort: 3 }).toFile(path.join(OUT, `${name}-${w}.avif`))
  }
  console.log(`✔ ${f} → 'perfumes/${name}'`)
}
