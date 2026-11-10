import { Link } from '@/lib/router'

export function NotFound() {
  return (
    <main className="page-main not-found" id="contenido">
      <span className="eyebrow">Error 404</span>
      <h1>Esta fragancia se evaporó</h1>
      <p>La página que buscas no existe o cambió de lugar.</p>
      <Link to="/perfumes" className="btn gold">Ver la colección</Link>
    </main>
  )
}
