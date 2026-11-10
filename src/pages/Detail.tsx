import { useEffect, useState } from 'react'
import { Icon } from '@/components/Icon'
import { Img } from '@/components/Img'
import { ProductCard, SectionTitle, Tag } from '@/components/ui'
import { genderLabel, inspiredLabel, pics, related, type Perfume } from '@/data/perfumes'
import { useCart } from '@/lib/cart'
import { formatPrice, priceLabel, waLink } from '@/lib/format'
import { Link } from '@/lib/router'


export function Detail({ perfume: p }: { perfume: Perfume }) {
  const { add } = useCart()
  const [ml, setMl] = useState(p.sizes[Math.min(1, p.sizes.length - 1)].ml)
  const [qty, setQty] = useState(1)
  const [img, setImg] = useState(0)
  const [info, setInfo] = useState(0)

  useEffect(() => {
    setMl(p.sizes[Math.min(1, p.sizes.length - 1)].ml)
    setQty(1)
    setImg(0)
  }, [p.slug])

  const gallery = pics(p)
  const price = p.sizes.find((s) => s.ml === ml)?.price ?? p.sizes[0].price
  const col = p.type === 'ORIGINAL' ? ['Originales', '/perfumes/originales'] : ['Inspiraciones', '/perfumes/inspiraciones']
  const waMsg = `Hola LUXUME ✨, quiero pedir:\n• ${qty} x ${p.name} (${p.brand}) ${ml} ml — ${price > 0 ? formatPrice(price * qty) : 'precio a consultar'}`

  const accordions = [
    ['Descripción', p.description],
    ['Cómo aplicarlo', 'Aplica sobre puntos de pulso limpios: muñecas, cuello y detrás de las orejas. No frotes la fragancia; deja que se asiente sobre la piel.'],
    ['Envíos y entrega', 'Bucaramanga y área metropolitana: $5.000, gratis desde 2 perfumes. Resto del país: $14.900, gratis desde $300.000. Entrega estimada de 3 a 5 días hábiles después de confirmado el pago; te compartimos el número de guía.'],
    ['Garantía', 'Garantía de 30 días por fallas de calidad (fugas, válvula defectuosa o impurezas). Reporta novedades de entrega dentro de las 48 horas siguientes. No hay cambios por gusto o preferencia, por ser un producto de uso personal.'],
    ['Preguntas frecuentes', p.type === 'ORIGINAL'
      ? 'Es un perfume original de la marca. Te confirmamos lote y disponibilidad por WhatsApp antes del envío.'
      : `Es una versión 1.1 premium inspirada en ${p.name} de ${p.brand}: réplica de alta calidad que busca el mismo aroma y una excelente duración. No es el producto original de la marca.`],
  ]

  return (
    <main className="page-main detail-page" id="contenido">
      <nav className="breadcrumbs" aria-label="Ruta de navegación">
        <Link to="/">Inicio</Link> / <Link to={col[1]}>{col[0]}</Link> / <span>{p.name}</span>
      </nav>
      <section className="detail-grid">
        <div className="gallery">
          <div className="thumbs">
            {gallery.map((src, i) => (
              <button key={src + i} className={img === i ? 'active' : ''} onClick={() => setImg(i)} aria-label={`Ver foto ${i + 1}`}>
                <Img src={src} alt="" sizes="90px" width={90} height={110} />
              </button>
            ))}
          </div>
          <div className="main-image">
            <Img key={gallery[img]} src={gallery[img]} alt={`Perfume ${p.name}, ${inspiredLabel(p)}`} priority sizes="(max-width: 900px) 100vw, 50vw" />
            <span>Pasa para ampliar</span>
          </div>
        </div>
        <div className="product-info">
          <Tag type={p.type} />
          <h1>{p.name}</h1>
          <p className="inspired">{inspiredLabel(p)}</p>
          <p className="family">{p.family} · {genderLabel(p)}</p>
          <p className="short">{p.short}</p>
          <div className="detail-price">{priceLabel(price)}</div>
          <div className="choice">
            <span className="choice-label">Tamaño</span>
            <div role="radiogroup" aria-label="Tamaño">
              {p.sizes.map((s) => (
                <button key={s.ml} role="radio" aria-checked={ml === s.ml} className={ml === s.ml ? 'active' : ''} onClick={() => setMl(s.ml)}>
                  {s.ml} ml
                </button>
              ))}
            </div>
          </div>
          <div className="purchase">
            <div className="quantity">
              <button onClick={() => setQty(Math.max(1, qty - 1))} aria-label="Disminuir cantidad"><Icon name="minus" /></button>
              <span aria-live="polite">{qty}</span>
              <button onClick={() => setQty(qty + 1)} aria-label="Aumentar cantidad"><Icon name="plus" /></button>
            </div>
            <button className="btn gold" onClick={() => add(p, ml, qty)}>Agregar a la bolsa</button>
          </div>
          <a className="btn outline whatsapp-order" href={waLink(waMsg)} target="_blank" rel="noopener">
            <Icon name="chat" /> Pedir ahora por WhatsApp
          </a>
          <div className="mini-trust">
            <span><Icon name="truck" /> Envíos nacionales</span>
            <span><Icon name="shield" /> Compra acompañada</span>
          </div>
        </div>
      </section>

      <section className="notes section alt">
        <SectionTitle eyebrow="Arquitectura de la fragancia" title="Pirámide olfativa" />
        {p.notes.main ? (
          <div className="note-grid single">
            <article><Icon name="spark" /><span>Notas principales</span><h3>{p.notes.main}</h3></article>
          </div>
        ) : (
          <div className="note-grid">
            <article><Icon name="spark" /><span>Notas de salida</span><h3>{p.notes.top}</h3></article>
            <article><Icon name="leaf" /><span>Notas de corazón</span><h3>{p.notes.heart}</h3></article>
            <article><Icon name="drop" /><span>Notas de fondo</span><h3>{p.notes.base}</h3></article>
          </div>
        )}
        <dl className="ficha">
          {([
            ['Casa', p.brand],
            ['Calidad', p.type === 'ORIGINAL' ? 'Original' : '1.1 · Réplica premium'],
            ['Tamaño', p.sizes.map((s) => `${s.ml} ml`).join(' · ')],
            ['Familia olfativa', p.family],
            ['Ideal para', genderLabel(p)],
            ['Temporada', p.season],
          ] as const).map(([k, v]) => (
            <div key={k}><dt>{k}</dt><dd>{v}</dd></div>
          ))}
        </dl>
        <div className="chips">
          {p.occasions.map((c) => <span key={c}>{c}</span>)}
        </div>
      </section>

      <section className="accordions section">
        {accordions.map(([title, copy], i) => (
          <article className={info === i ? 'active' : ''} key={title}>
            <h2>
              <button onClick={() => setInfo(info === i ? -1 : i)} aria-expanded={info === i}>
                <span>{title}</span>
                <Icon name={info === i ? 'minus' : 'plus'} />
              </button>
            </h2>
            <p hidden={info !== i}>{copy}</p>
          </article>
        ))}
      </section>

      <section className="related section alt">
        <SectionTitle eyebrow="Continúa explorando" title="También te puede gustar" />
        <div className="product-grid">
          {related(p).map((r) => <ProductCard key={r.slug} product={r} />)}
        </div>
      </section>

      <div className="mobile-buy">
        <div>
          <small>{ml} ml</small>
          <b>{priceLabel(price)}</b>
        </div>
        <button className="btn gold" onClick={() => add(p, ml, qty)}>Agregar</button>
      </div>
    </main>
  )
}
