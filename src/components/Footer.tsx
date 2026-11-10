import { SITE } from '@/config'
import { waLink } from '@/lib/format'
import { Link } from '@/lib/router'
import { Icon } from './Icon'

export function Footer() {
  return (
    <>
      <footer>
        <div className="footer-brand">
          <img src="/img/brand/logo-480.webp" alt="LUXUME Perfumería" width={180} height={110} loading="lazy" decoding="async" />
          <p>{SITE.slogan}.</p>
          <span>{SITE.city}, Colombia · Envíos a todo el país</span>
        </div>
        <div>
          <h4>Explorar</h4>
          <Link to="/perfumes/originales">Originales</Link>
          <Link to="/perfumes/inspiraciones">Inspiraciones</Link>
          <Link to="/perfumes/hombre">Hombre</Link>
          <Link to="/perfumes/mujer">Mujer</Link>
          <Link to="/perfumes/nicho">Nicho</Link>
        </div>
        <div>
          <h4>Ayuda</h4>
          <Link to="/envios-y-garantia#envios">Envíos</Link>
          <Link to="/envios-y-garantia#garantia">Cambios y garantía</Link>
          <Link to="/#como-comprar">Cómo comprar</Link>
        </div>
        <div>
          <h4>Hablemos</h4>
          <a href={waLink()} target="_blank" rel="noopener">WhatsApp</a>
          <a href={`mailto:${SITE.email}`}>{SITE.email}</a>
          <a href={SITE.instagram} target="_blank" rel="noopener">Instagram</a>
          <p>{SITE.hours.split(' · ')[0]}<br />{SITE.hours.split(' · ')[1]}</p>
        </div>
        <div className="footer-bottom">
          <span>© {new Date().getFullYear()} {SITE.name}</span>
          <span>{SITE.city}, Santander · Colombia</span>
        </div>
      </footer>
      <a className="floating-wa" href={waLink('Hola LUXUME, quiero asesoría para elegir un perfume.')} target="_blank" rel="noopener" aria-label="Hablar por WhatsApp">
        <Icon name="chat" size={25} />
        <span>¿Te asesoramos?</span>
      </a>
    </>
  )
}
