// Crea luxume-catalogo.csv con el catálogo actual, para importarlo en Google Sheets la primera vez.
import fs from 'node:fs'
import { perfumeToRow, toCSV } from './lib/sheet.mjs'
const c = JSON.parse(fs.readFileSync('src/data/catalog.json', 'utf8'))
fs.writeFileSync('luxume-catalogo.csv', '﻿' + toCSV(c.map(perfumeToRow)))
console.log(`✔ luxume-catalogo.csv (${c.length} perfumes)`)
