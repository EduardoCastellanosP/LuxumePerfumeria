import { SITE } from '@/config'

export const formatPrice = (price: number) => `$${new Intl.NumberFormat('es-CO').format(price)} COP`

export const waLink = (text?: string) =>
  `https://wa.me/${SITE.whatsapp}${text ? `?text=${encodeURIComponent(text)}` : ''}`

/** 0 = aún sin precio → "Consultar precio" */
export const priceLabel = (price: number) => (price > 0 ? formatPrice(price) : 'Consultar precio')
