# LUXUME Perfumería · Tienda web

React 19 + Vite + Tailwind 4. Cada URL se genera como HTML estático (SEO real para Google) y luego se vuelve interactiva.

## Arrancar
```bash
npm install
npm run dev        # desarrollo → http://localhost:5173
npm run build      # producción → carpeta dist/
npm run preview    # ver la versión de producción
```

## Lo que debes cambiar
| Qué | Dónde |
|---|---|
| WhatsApp, dominio, Instagram, horario | `src/config.ts` |
| Perfumes (37, con precios en 0 = "Consultar precio") | `src/data/perfumes.ts` |
| Video de intro | `public/intro/intro.mp4` |
| Reseñas de ejemplo (reemplazar por reales) | `src/pages/Home.tsx` |

## Video de intro
- Archivo: `public/intro/intro.mp4`, en H.264 y 1080p, sin audio, de 4 a 8 s, de menos de 3 MB.
- Compresión recomendada: `ffmpeg -i video.mp4 -an -vf scale=-2:1080 -c:v libx264 -crf 26 -preset veryfast -movflags +faststart public/intro/intro.mp4`
- En `index.html`, `data-logo="true"` hace aparecer el logo animado al terminar tu video. Usa `"false"` si tu video ya cierra con el logo.
- Si no hay video, se reproduce la intro animada de respaldo.
- La intro se muestra una sola vez por sesión, tiene botón para saltarla y nunca se le muestra a Google.

## Fotos reales
1. Pon las fotos en `/fotos`, por ejemplo `nuit-eternelle-1.jpg`, `nuit-eternelle-2.jpg`.
2. Ejecuta `npm run images`. Se generan en AVIF y WebP, en 4 tamaños y recortadas a 4:5.
3. En `perfumes.ts` escribe `images: ['perfumes/nuit-eternelle-1', 'perfumes/nuit-eternelle-2']`.

La segunda foto es la que aparece al pasar el mouse sobre la tarjeta.

## Publicar (Netlify o Vercel)
Conecta el repositorio. El comando de build es `npm run build` y la carpeta de salida es `dist`; ya vienen configurados en `netlify.toml` y `vercel.json`.
Después ve a Google Search Console, agrega el dominio y envía `https://tudominio/sitemap.xml`.

## Qué incluye el SEO
- Título, descripción, enlace canónico y Open Graph por página.
- Datos estructurados: tienda local (Store), Product con precios en COP y migas de pan (Breadcrumb).
- `sitemap.xml` y `robots.txt` automáticos.
- URLs limpias: `/perfumes/inspiraciones`, `/perfume/nuit-eternelle`.

## Catálogo
- 37 perfumes: 6 de dama, 10 de caballero y 21 unisex.
- No hay colección Unisex: los unisex aparecen en **Hombre** y en **Mujer**.
- **Nicho** (`/perfumes/nicho`) muestra los de `line: 'Nicho'`: Xerjoff, Montale y Bharara.
- Precios: en `perfumes.ts` cambia `price: 0` por el valor real. Con 0 se muestra "Consultar precio" y el pedido va por WhatsApp.
- Fotos: guarda `slug-1.jpg` y `slug-2.jpg` en `/fotos`, ejecuta `npm run images` y escribe `images: ['perfumes/slug-1', 'perfumes/slug-2']` en el perfume.
