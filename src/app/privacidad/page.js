import Legal from "../../components/legal/Legal"

export const metadata = {
  title: "Aviso de privacidad | Hyperion Software",
  description: "Qué datos recibe Hyperion Software por este sitio, para qué los usa y cómo pedir que se borren.",
  alternates: { canonical: "/privacidad" },
  openGraph: { url: "/privacidad", images: ["/og.png"] },
}

export default function Privacidad() {
  return (
    <Legal title="Aviso de privacidad" updated="28 de octubre de 2026" back={["/", "Inicio"]} eyebrow="Hyperion Software">
      <p>Este aviso explica qué datos recibimos cuando visitas hyperionmkt.com o nos escribes desde él. Los productos de Hyperion (por ejemplo Faro, Caresia o Mitiendita) tienen su propio aviso, que aplica al usarlos.</p>

      <h2>1. Quién es responsable</h2>
      <p>Hyperion Software, Tijuana, Baja California, México. Para cualquier tema de privacidad escríbenos a <a href="mailto:info@hyperionmkt.com">info@hyperionmkt.com</a>.</p>

      <h2>2. Qué datos recibimos</h2>
      <ul>
        <li><b>Formulario de contacto:</b> tu nombre, correo, teléfono (si lo escribes), el servicio que te interesa y tu mensaje. Nos llegan por correo electrónico a info@hyperionmkt.com.</li>
        <li><b>WhatsApp, correo o teléfono:</b> si nos contactas por ahí, recibimos lo que tú nos envíes por ese medio.</li>
        <li><b>Estadísticas de visitas:</b> usamos Google Analytics, Vercel Analytics y Umami para saber qué páginas se visitan y desde qué tipo de dispositivo. Umami no usa cookies; Google Analytics sí puede usarlas.</li>
      </ul>

      <h2>3. Para qué los usamos</h2>
      <p>Solo para responderte, preparar la cotización o el proyecto que nos pidas y darle seguimiento. Las estadísticas las usamos para mejorar el sitio. No vendemos tus datos ni los usamos para publicidad de terceros.</p>

      <h2>4. Con quién se comparten</h2>
      <p>Con los proveedores que hacen posible el servicio: el de correo electrónico, el de alojamiento del sitio (Vercel) y los de estadísticas mencionados arriba. No los compartimos con nadie más salvo que la ley nos lo exija.</p>

      <h2>5. Cuánto tiempo los guardamos</h2>
      <p>Los mensajes de contacto, mientras dure la relación contigo o hasta que nos pidas borrarlos.</p>

      <h2>6. Tus derechos</h2>
      <p>Puedes pedir en cualquier momento acceder a tus datos, corregirlos, cancelarlos u oponerte a su uso escribiendo a <a href="mailto:info@hyperionmkt.com">info@hyperionmkt.com</a>. Te responderemos por el mismo medio.</p>

      <h2>7. Cambios</h2>
      <p>Si cambiamos este aviso, publicaremos la nueva versión en esta misma página con su fecha de actualización.</p>
    </Legal>
  )
}
