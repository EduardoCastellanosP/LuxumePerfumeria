import { SITE } from '@/config'
import { formatPrice, waLink } from '@/lib/format'
import { SHIPPING } from '@/lib/shipping'

export function Policy() {
  return (
    <main className="page-main" id="contenido">
      <div className="catalog-hero">
        <span className="eyebrow">Compra con tranquilidad</span>
        <h1>Envíos y garantía</h1>
        <p>Todo lo que necesitas saber sobre tarifas, tiempos de entrega, cambios y garantía de tu fragancia.</p>
      </div>
      <div className="policy">
        <section id="envios">
          <h2>Políticas de envío</h2>
          <div className="rates">
            <div><b>{formatPrice(SHIPPING.metro.price).replace(' COP', '')}</b><span>Bucaramanga y área metropolitana. <strong>Gratis</strong> desde {SHIPPING.metro.freeFromItems} perfumes.</span></div>
            <div><b>{formatPrice(SHIPPING.national.price).replace(' COP', '')}</b><span>Envío nacional para una compra individual.</span></div>
            <div><b>Gratis</b><span>Envío nacional desde {formatPrice(SHIPPING.national.freeFrom)} en productos.</span></div>
          </div>
          <h3>Tiempos de entrega</h3>
          <p>Los pedidos se preparan una vez confirmado el pago. El tiempo estimado de entrega es de {SHIPPING.days}, según la ciudad de destino. Para zonas rurales o de difícil acceso, el plazo puede ser mayor.</p>
          <p>Una vez despachado el pedido, te compartimos el número de guía para que hagas el seguimiento. Los costos y tiempos definitivos se confirman antes de finalizar la compra.</p>
        </section>

        <section id="garantia">
          <h2>Cambios, devoluciones y garantía</h2>
          <p>En LUXUME Perfumería queremos que recibas tu fragancia en perfectas condiciones. Así puedes reportar una novedad de entrega o solicitar la revisión de una posible falla de calidad.</p>
          <h3>Pedido con novedades</h3>
          <p>Repórtanos daños visibles, faltantes o referencias equivocadas dentro de las 48 horas calendario siguientes a la entrega. Incluye tu número de pedido y fotografías del empaque y del producto. Este plazo facilita la revisión del envío y no limita la presentación de solicitudes de garantía.</p>
          <h3>Garantía por calidad</h3>
          <p>Los productos cuentan con 30 días calendario de garantía por fallas de calidad, contados desde la entrega. Evaluamos el producto y te informamos la solución correspondiente conforme a la garantía aplicable.</p>
          <h3>Qué cubre la garantía</h3>
          <ul>
            <li>Fugas del producto.</li>
            <li>Válvula dosificadora defectuosa.</li>
            <li>Impurezas en el contenido.</li>
          </ul>
          <p>No cubre daños por golpes, manipulación inadecuada o mala conservación.</p>
          <h3>Qué información enviar</h3>
          <p>Escríbenos con tu número de pedido, fecha de entrega, descripción de la falla y fotos o video. Conserva el producto y su empaque mientras revisamos el caso; te indicaremos los pasos para su evaluación.</p>
          <h3>Fijación y duración</h3>
          <p>La duración de una fragancia puede variar según el tipo de piel, la aplicación y el ambiente. La fijación, por sí sola, no se considera una falla del producto.</p>
          <h3>Cambios por gusto o preferencia</h3>
          <p>Por tratarse de productos de uso personal, no ofrecemos cambios por gusto o preferencia. Esta condición no limita la atención de fallas cubiertas por la garantía legal.</p>
        </section>

        <section id="contacto">
          <h2>Contacto</h2>
          <p>
            WhatsApp: <a className="text-link" href={waLink('Hola LUXUME, tengo una pregunta sobre mi pedido.')} target="_blank" rel="noopener">+57 {SITE.whatsapp.slice(2, 5)} {SITE.whatsapp.slice(5, 8)} {SITE.whatsapp.slice(8)}</a>
            <br />
            Correo: <a className="text-link" href={`mailto:${SITE.email}`}>{SITE.email}</a>
          </p>
        </section>
      </div>
    </main>
  )
}
