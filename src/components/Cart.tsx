import { useEffect, useState } from 'react'
import { useCart } from '@/lib/cart'
import { formatPrice, priceLabel, waLink } from '@/lib/format'
import { pics } from '@/data/perfumes'
import { SHIPPING, shippingFor } from '@/lib/shipping'
import { Link } from '@/lib/router'
import { Icon } from './Icon'
import { Img } from './Img'

export function Cart() {
  const { lines, count, subtotal, open, setOpen, update } = useCart()
  const [form, setForm] = useState({ nombre: '', ciudad: '', direccion: '', telefono: '' })
  const close = () => setOpen(false)
  const ship = shippingFor(form.ciudad, count, subtotal)
  const total = subtotal + (ship ?? 0)

  useEffect(() => {
    document.documentElement.classList.toggle('lock', open)
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && close()
    if (open) window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [open])

  const send = () => {
    const items = lines.map((l) => `• ${l.qty} x ${l.perfume.name} (${l.perfume.brand}) ${l.ml} ml — ${l.price > 0 ? formatPrice(l.price * l.qty) : 'precio a consultar'}`).join('\n')
    const datos = [
      form.nombre && `Nombre: ${form.nombre}`,
      form.ciudad && `Ciudad: ${form.ciudad}`,
      form.direccion && `Dirección: ${form.direccion}`,
      form.telefono && `Teléfono: ${form.telefono}`,
    ].filter(Boolean).join('\n')
    const msg = `Hola LUXUME ✨, quiero confirmar este pedido:\n\n${items}\n\nSubtotal: ${formatPrice(subtotal)}${ship !== null ? `\nEnvío estimado: ${ship === 0 ? 'Gratis' : formatPrice(ship)}\nTotal estimado: ${formatPrice(total)}` : ''}${datos ? `\n\n${datos}` : ''}`
    window.open(waLink(msg), '_blank', 'noopener')
  }

  const field = (key: keyof typeof form, label: string, placeholder: string, type = 'text', auto?: string) => (
    <label>
      {label}
      <input type={type} autoComplete={auto} placeholder={placeholder} value={form[key]} onChange={(e) => setForm({ ...form, [key]: e.target.value })} />
    </label>
  )

  return (
    <>
      {open && <button className="cart-scrim" onClick={close} aria-label="Cerrar bolsa" />}
      <aside className={`cart ${open ? 'open' : ''}`} aria-hidden={!open} aria-label="Bolsa de compras" inert={!open}>
        <div className="cart-head">
          <div>
            <span className="eyebrow">Tu selección</span>
            <h2>Bolsa <small>({count})</small></h2>
          </div>
          <button onClick={close} aria-label="Cerrar bolsa"><Icon name="close" /></button>
        </div>
        {lines.length === 0 ? (
          <div className="empty-cart">
            <Icon name="bag" size={38} />
            <h3>Tu bolsa espera una historia</h3>
            <p>Explora la colección y encuentra una fragancia que hable por ti.</p>
            <Link to="/perfumes" className="btn outline" onClick={close}>Descubrir fragancias</Link>
          </div>
        ) : (
          <>
            <div className="cart-items">
              {lines.map((l) => (
                <article key={l.slug + l.ml}>
                  <Img src={pics(l.perfume)[0]} alt="" sizes="90px" width={90} height={120} />
                  <div>
                    <span>{l.perfume.type === 'ORIGINAL' ? 'Original' : 'Inspiración'}</span>
                    <h3>{l.perfume.name}</h3>
                    <p>{l.ml} ml</p>
                    <div className="cart-line">
                      <div className="quantity small">
                        <button onClick={() => update(l.slug, l.ml, -1)} aria-label="Quitar uno"><Icon name="minus" /></button>
                        <span aria-live="polite">{l.qty}</span>
                        <button onClick={() => update(l.slug, l.ml, 1)} aria-label="Agregar uno"><Icon name="plus" /></button>
                      </div>
                      <b>{priceLabel(l.price * l.qty)}</b>
                    </div>
                  </div>
                </article>
              ))}
            </div>
            <div className="cart-form">
              <h3>Datos para tu pedido</h3>
              <div className="form-grid">
                {field('nombre', 'Nombre', 'Tu nombre', 'text', 'name')}
                {field('ciudad', 'Ciudad', 'Bucaramanga', 'text', 'address-level2')}
                {field('direccion', 'Dirección', 'Dirección de entrega', 'text', 'street-address')}
                {field('telefono', 'Teléfono', '+57 300 000 0000', 'tel', 'tel')}
              </div>
            </div>
            <div className="cart-total">
              <span>Subtotal</span>
              <b>{formatPrice(subtotal)}</b>
              <span>Envío {ship === null && <em>(escribe tu ciudad)</em>}</span>
              <b>{ship === null ? '—' : ship === 0 ? 'Gratis' : formatPrice(ship)}</b>
              <span className="grand">Total estimado</span>
              <b className="grand">{formatPrice(total)}</b>
              <small>
                Envío gratis desde {SHIPPING.metro.freeFromItems} perfumes en Bucaramanga y su área metropolitana, y desde {formatPrice(SHIPPING.national.freeFrom)} al resto del país. Entrega en {SHIPPING.days}. Los costos finales se confirman por WhatsApp.
              </small>
            </div>
            <button className="btn gold checkout" onClick={send}>
              <Icon name="chat" /> Enviar pedido por WhatsApp
            </button>
            <p className="confirm-note">Te confirmaremos disponibilidad y envío por WhatsApp.</p>
            <button className="future-pay" disabled>
              <Icon name="shield" /> Pago en línea <span>Próximamente</span>
            </button>
          </>
        )}
      </aside>
    </>
  )
}
