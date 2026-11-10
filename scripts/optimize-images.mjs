// 📸 Optimiza fotos locales: pon JPG/PNG en /fotos y ejecuta `npm run images`.
// Genera AVIF + WebP en 4 tamaños dentro de public/img/perfumes/ (sin recortar el producto).
import fs from 'node:fs'
import path from 'node:path'
import { processPhoto, slugify } from './lib/photo.mjs'

const IN = path.resolve('fotos')
const files = fs.existsSync(IN) ? fs.readdirSync(IN).filter((f) => /\.(jpe?g|png|webp|tiff?)$/i.test(f)) : []
if (!files.length) console.log('No hay fotos en /fotos')
for (const f of files) {
  const name = slugify(path.parse(f).name)
  await processPhoto(path.join(IN, f), name)
  console.log(`✔ ${f} → 'perfumes/${name}'`)
}
