/**
 * Imagen responsive optimizada: srcset por tamaños, AVIF/WebP, lazy-load y decodificación asíncrona.
 * - URL remota (Unsplash) → el CDN entrega AVIF/WebP en el ancho exacto.
 * - Ruta local ('perfumes/nombre-1') → usa los archivos que genera `npm run images` en /public/img.
 */
const REMOTE_W = [480, 800, 1200, 1600, 2000]
export const LOCAL_W = [480, 800, 1200, 1600]

const isRemote = (src: string) => src.startsWith('http')

export function imgUrl(src: string, w = 1200, fmt: 'webp' | 'avif' = 'webp') {
  if (isRemote(src)) return `${src}?auto=format&fit=crop&w=${w}&q=72`
  const near = LOCAL_W.reduce((a, b) => (Math.abs(b - w) < Math.abs(a - w) ? b : a))
  return `/img/${src}-${near}.${fmt}`
}

type Props = {
  src: string
  alt: string
  sizes?: string
  className?: string
  priority?: boolean
  width?: number
  height?: number
}

export function Img({ src, alt, sizes = '100vw', className, priority, width = 800, height = 1000 }: Props) {
  const common = {
    alt,
    sizes,
    className,
    width,
    height,
    loading: priority ? ('eager' as const) : ('lazy' as const),
    decoding: priority ? ('sync' as const) : ('async' as const),
    fetchPriority: priority ? ('high' as const) : undefined,
  }
  if (isRemote(src)) {
    return <img {...common} src={imgUrl(src, 1200)} srcSet={REMOTE_W.map((w) => `${imgUrl(src, w)} ${w}w`).join(', ')} />
  }
  const set = (f: 'webp' | 'avif') => LOCAL_W.map((w) => `/img/${src}-${w}.${f} ${w}w`).join(', ')
  return (
    <picture>
      <source type="image/avif" srcSet={set('avif')} sizes={sizes} />
      <img {...common} src={imgUrl(src, 1200)} srcSet={set('webp')} />
    </picture>
  )
}
