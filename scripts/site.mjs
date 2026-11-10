// Lee SITE.url desde src/config.ts sin compilar TypeScript.
import fs from 'node:fs'
const src = fs.readFileSync(new URL('../src/config.ts', import.meta.url), 'utf8')
export const SITE = { url: src.match(/url:\s*'([^']+)'/)[1].replace(/\/$/, '') }
