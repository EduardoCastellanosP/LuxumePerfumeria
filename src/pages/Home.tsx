import { Icon } from '@/components/Icon'
import { Img } from '@/components/Img'
import { ProductCard, SectionTitle } from '@/components/ui'
import { perfumes, photos } from '@/data/perfumes'
import { waLink } from '@/lib/format'
import { Link } from '@/lib/router'

const families = [
  ['leaf', 'Amaderado'],
  ['spark', 'Oriental'],
  ['leaf', 'Floral'],
  ['drop', 'Cítrico'],
  ['drop', 'Fresco'],
  ['spark', 'Dulce'],
] as const

const steps = [
  ['01', 'Elige tu fragancia', 'Explora por colección, familia olfativa o ocasión.'],
  ['02', 'Agrega a tu bolsa', 'Selecciona el tamaño y la cantidad que deseas.'],
  ['03', 'Confirma por WhatsApp', 'Validamos disponibilidad, envío y pago contigo. Despachamos con número de guía.'],
]

const reviews = [
  ['“La fragancia dura todo el día y la asesoría fue impecable. Sentí que elegí exactamente lo que buscaba.”', 'María C. · Bucaramanga'],
  ['“El empaque es precioso y llegó antes de lo esperado. Definitivamente volveré por otra inspiración.”', 'Valentina R. · Bogotá'],
  ['“Una experiencia cercana y muy elegante. Me ayudaron a elegir un perfume para regalar y fue un éxito.”', 'Andrés G. · Medellín'],
]

export function Home() {
  const featured = perfumes.filter((p) => p.featured).slice(0, 4)
  return (
    <main id="contenido">
      <section className="hero">
        <Img className="hero-bg" src={photos.hero} alt="" priority sizes="100vw" width={1920} height={1080} />
        <div className="hero-overlay" />
        <div className="hero-content">
          <span className="eyebrow">LUXUME · Perfumería en Bucaramanga</span>
          <h1>
            Fragancias
            <br />
            <em>que perduran</em>
          </h1>
          <p>Perfumes originales e inspiraciones 1.1 de alta duración. Aromas que convierten tu presencia en un recuerdo inolvidable.</p>
          <div className="button-row">
            <Link to="/perfumes" className="btn gold">Explorar colección</Link>
            <a className="btn outline" href={waLink('Hola LUXUME, quiero asesoría para elegir un perfume.')} target="_blank" rel="noopener">
              Pedir por WhatsApp
            </a>
          </div>
        </div>
        <a className="scroll-mark" href="#colecciones">Descubrir <span /></a>
      </section>

      <div className="trust-bar">
        <span><Icon name="truck" /> Envío gratis desde 2 perfumes en Bucaramanga</span>
        <span><Icon name="chat" /> Atención por WhatsApp</span>
        <span><Icon name="spark" /> Larga duración</span>
        <span><Icon name="shield" /> Garantía de 30 días</span>
      </div>

      <section className="collections section" id="colecciones">
        <SectionTitle eyebrow="Dos formas de vivir LUXUME" title="Elige tu colección" intro="La misma obsesión por la calidad. Dos maneras de encontrar tu aroma." />
        <div className="collection-grid">
          <Link to="/perfumes/originales" className="collection-card">
            <Img src="perfumes/vulcan-feu-1" alt="Perfumes originales de marca" sizes="(max-width: 900px) 100vw, 50vw" />
            <div>
              <span>La firma de autor</span>
              <h3>Originales</h3>
              <p>Creaciones auténticas de las casas más deseadas.</p>
              <b>Descubrir <Icon name="arrow" /></b>
            </div>
          </Link>
          <Link to="/perfumes/inspiraciones" className="collection-card">
            <Img src="perfumes/khamrah-1" alt="Perfumes inspiración 1.1" sizes="(max-width: 900px) 100vw, 50vw" />
            <div>
              <span>Nuestra interpretación 1.1</span>
              <h3>Inspiraciones</h3>
              <p>Fragancias de la casa inspiradas en íconos memorables.</p>
              <b>Descubrir <Icon name="arrow" /></b>
            </div>
          </Link>
        </div>
      </section>

      <section className="desired section alt">
        <SectionTitle eyebrow="Selección de la casa" title="Los más deseados" />
        <div className="product-grid home-products">
          {featured.map((p) => <ProductCard key={p.slug} product={p} />)}
        </div>
        <Link to="/perfumes" className="text-link">Ver toda la colección <Icon name="arrow" /></Link>
      </section>

      <section className="families section">
        <SectionTitle eyebrow="Una fragancia para cada historia" title="Encuentra tu aroma" />
        <div className="family-grid">
          {families.map(([icon, label]) => (
            <Link key={label} to={`/perfumes?familia=${encodeURIComponent(label)}`}>
              <Icon name={icon} size={29} />
              <span>{label}</span>
              <Icon name="arrow" size={15} />
            </Link>
          ))}
        </div>
      </section>

      <section className="story" id="esencia">
        <div className="story-image">
          <Img className="story-bg" src={photos.silk} alt="Textura de seda burdeos" sizes="(max-width: 900px) 100vw, 56vw" />
          <Img className="story-front" src={photos.glass} alt="Frasco de perfume de lujo LUXUME" sizes="(max-width: 900px) 54vw, 30vw" />
        </div>
        <div className="story-copy">
          <span className="eyebrow">Nuestra esencia</span>
          <h2>El lujo de dejar<br />una <em>huella</em></h2>
          <p>Nacimos en Bucaramanga con una convicción: una fragancia no solo se lleva, se recuerda. Seleccionamos cada aroma con criterio, sensibilidad y atención al detalle.</p>
          <p>Te acompañamos a encontrar esa fragancia que se siente profundamente tuya.</p>
          <a className="text-link" href={waLink('Hola LUXUME, quiero conocer más sobre ustedes.')} target="_blank" rel="noopener">
            Conoce LUXUME <Icon name="arrow" />
          </a>
        </div>
      </section>

      <section className="steps section alt" id="como-comprar">
        <SectionTitle eyebrow="Simple, personal, seguro" title="Cómo comprar" />
        <div className="step-grid">
          {steps.map(([n, t, d]) => (
            <article key={n}>
              <b>{n}</b>
              <div><h3>{t}</h3><p>{d}</p></div>
            </article>
          ))}
        </div>
      </section>

      {/* ⚠️ Reemplazar por reseñas reales del cliente antes de publicar. */}
      <section className="reviews section">
        <SectionTitle eyebrow="Historias que perduran" title="Opiniones de clientes" intro="Contenido de ejemplo · será reemplazado por reseñas reales verificadas." />
        <div className="review-grid">
          {reviews.map(([quote, name]) => (
            <article key={name}>
              <span aria-label="5 de 5 estrellas">★★★★★</span>
              <p>{quote}</p>
              <b>{name}</b>
             </article>
          ))}
        </div>
      </section>
    </main>
  )
}
