// Genera un HTML estático por cada URL (SEO real: Google ve el contenido completo), sitemap y robots.
import fs from 'node:fs'
import path from 'node:path'
import { pathToFileURL } from 'node:url'

const dist = path.resolve('dist')
const { render, staticPaths } = await import(pathToFileURL(path.resolve('dist-server/entry-server.js')).href)
const { SITE } = await import('./site.mjs')
const template = fs.readFileSync(path.join(dist, 'index.html'), 'utf8')

const write = (url, file) => {
  const { html, head } = render(url)
  const out = template.replace('<!--app-head-->', head).replace('<!--app-html-->', html)
  fs.mkdirSync(path.dirname(file), { recursive: true })
  fs.writeFileSync(file, out)
}

const paths = staticPaths()
for (const url of paths) write(url, path.join(dist, url === '/' ? 'index.html' : `${url}/index.html`))
write('/404', path.join(dist, '404.html'))

const today = new Date().toISOString().slice(0, 10)
fs.writeFileSync(
  path.join(dist, 'sitemap.xml'),
  `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${paths
    .map((u) => `  <url><loc>${SITE.url}${u === '/' ? '/' : u}</loc><lastmod>${today}</lastmod><priority>${u === '/' ? '1.0' : u.startsWith('/perfume/') ? '0.8' : '0.9'}</priority></url>`)
    .join('\n')}\n</urlset>\n`,
)
fs.writeFileSync(path.join(dist, 'robots.txt'), `User-agent: *\nAllow: /\n\nSitemap: ${SITE.url}/sitemap.xml\n`)
fs.rmSync('dist-server', { recursive: true, force: true })
console.log(`✔ Pre-renderizadas ${paths.length} páginas + 404, sitemap.xml y robots.txt`)
