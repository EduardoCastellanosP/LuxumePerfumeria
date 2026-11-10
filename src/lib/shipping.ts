/** 🚚 Tarifas de envío LUXUME (propuesta inicial; se confirman por WhatsApp). Edita aquí los valores. */
export const SHIPPING = {
  metro: { price: 5000, freeFromItems: 2 },
  national: { price: 14900, freeFrom: 300000 },
  metroCities: ['bucaramanga', 'floridablanca', 'giron', 'piedecuesta', 'lebrija'],
  days: '3 a 5 días hábiles',
}

const norm = (s: string) => s.normalize('NFD').replace(/[̀-ͯ]/g, '').toLowerCase().trim()

export const isMetro = (city: string) => SHIPPING.metroCities.some((c) => norm(city).includes(c))

/** Devuelve el costo estimado del envío, o null si aún no hay ciudad. */
export function shippingFor(city: string, items: number, subtotal: number): number | null {
  if (!norm(city)) return null
  if (isMetro(city)) return items >= SHIPPING.metro.freeFromItems ? 0 : SHIPPING.metro.price
  return subtotal >= SHIPPING.national.freeFrom ? 0 : SHIPPING.national.price
}
