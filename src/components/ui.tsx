import { priceLabel } from '@/lib/format'
import { Link } from '@/lib/router'
import { useCart } from '@/lib/cart'
import { fromPrice, inspiredLabel, pics, type Perfume } from '@/data/perfumes'
import { Icon } from './Icon'
import { Img } from './Img'

export function SectionTitle({ eyebrow, title, intro, as: H = 'h2' }: { eyebrow: string; title: string; intro?: string; as?: 'h1' | 'h2' }) {
  return (
    <div className="section-heading">
      <span className="eyebrow">{eyebrow}</span>
      <H>{title}</H>
      {intro && <p>{intro}</p>}
    </div>
  )
}

export function Tag({ type }: { type: Perfume['type'] }) {
  return <span className={`tag ${type === 'ORIGINAL' ? 'filled' : ''}`}>{type === 'ORIGINAL' ? 'Original' : 'Inspiración'}</span>
}

export function ProductCard({ product }: { product: Perfume }) {
  const { add } = useCart()
  const href = `/perfume/${product.slug}`
  const [first, second] = pics(product)
  return (
    <article className="product-card">
      <Link to={href} className="product-image" aria-label={`Ver ${product.name}`}>
        <Img src={first} alt={`Perfume ${product.name}, ${inspiredLabel(product)}`} sizes="(max-width: 900px) 50vw, 25vw" />
        {second && <Img src={second} alt="" className="alt-photo" sizes="(max-width: 900px) 50vw, 25vw" />}
        <Tag type={product.type} />
        <span className="view-label">
          Ver fragancia <Icon name="arrow" size={15} />
        </span>
      </Link>
      <div className="product-copy">
        <Link to={href}>
          <h3>{product.name}</h3>
        </Link>
        <p className="inspired">{inspiredLabel(product)}</p>
        <p className="family">{product.family}</p>
        <div>
          <strong>{product.sizes.length > 1 && fromPrice(product) > 0 && <small>Desde </small>}{priceLabel(fromPrice(product))}</strong>
          <button className="quick-add" onClick={() => add(product)} aria-label={`Agregar ${product.name} a la bolsa`}>
            Agregar <Icon name="plus" size={15} />
          </button>
        </div>
      </div>
    </article>
  )
}
