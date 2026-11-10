import { useEffect } from 'react'
import { Cart } from '@/components/Cart'
import { Footer } from '@/components/Footer'
import { Header } from '@/components/Header'
import { CartProvider } from '@/lib/cart'
import { useUrl } from '@/lib/router'
import { applyHead, matchRoute, seoFor } from '@/lib/routes'
import { Catalog } from '@/pages/Catalog'
import { Detail } from '@/pages/Detail'
import { Home } from '@/pages/Home'
import { NotFound } from '@/pages/NotFound'
import { Policy } from '@/pages/Policy'

export default function App() {
  const { pathname } = useUrl()
  const route = matchRoute(pathname)

  useEffect(() => {
    applyHead(seoFor(route, pathname))
  }, [pathname])

  return (
    <CartProvider>
      <div className="app">
        <a className="skip-link" href="#contenido">Saltar al contenido</a>
        <Header />
        {route.page === 'home' && <Home />}
        {route.page === 'catalog' && <Catalog key={route.collection ?? 'all'} collection={route.collection} />}
        {route.page === 'detail' && <Detail perfume={route.perfume} />}
        {route.page === 'policy' && <Policy />}
        {route.page === '404' && <NotFound />}
        <Footer />
        <Cart />
      </div>
    </CartProvider>
  )
}
