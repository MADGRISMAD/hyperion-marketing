import Legal from "../../../components/legal/Legal"

export const metadata = {
  title: "Condiciones del servicio | Faro by Hyperion",
  description: "Las reglas de uso de Faro, de Hyperion Software.",
  alternates: { canonical: "/faro/terminos" },
  openGraph: { url: "/faro/terminos", images: ["/og.png"] },
}

export default function Terminos() {
  return (
    <Legal title="Condiciones del servicio" updated="25 de octubre de 2026">
      <p>Al crear una cuenta o usar Faro by Hyperion («Faro»), un servicio de Hyperion Software, aceptas estas condiciones. Si no estás de acuerdo, no uses el servicio.</p>

      <h2>1. Qué es Faro</h2>
      <p>Faro lee tu sitio web, propone temas de contenido y, con inteligencia artificial, redacta artículos e imágenes de portada que puedes revisar y publicar en tu blog, ya sea en una dirección alojada por Faro, en tu propio dominio o con tu propio diseño a través de nuestra API de lectura. Opcionalmente muestra datos reales de Google Search Console y de palabras clave.</p>

      <h2>2. Tu cuenta</h2>
      <ul>
        <li>Debes dar un correo válido y mantener tu contraseña en secreto. Eres responsable de lo que ocurra desde tu cuenta.</li>
        <li>Solo puedes dar de alta sitios que sean tuyos o sobre los que tengas autorización para publicar contenido.</li>
      </ul>

      <h2>3. Contenido generado con inteligencia artificial</h2>
      <ul>
        <li>Los textos e imágenes los produce un modelo de inteligencia artificial y <b>pueden contener errores, imprecisiones o información desactualizada</b>.</li>
        <li><b>Tú decides qué se publica.</b> Con el piloto automático encendido, los artículos se publican sin tu revisión previa, bajo tu responsabilidad; puedes apagarlo en cualquier momento. En sectores sensibles (salud, legal, finanzas) Faro deja todo en borrador y recomendamos que lo revise un profesional.</li>
        <li>No debes usar Faro para generar contenido ilegal, engañoso, difamatorio, que infrinja derechos de terceros o que suplante a personas u organizaciones.</li>
        <li>Faro no garantiza posiciones en Google ni resultados de tráfico, ventas o negocio.</li>
      </ul>

      <h2>4. Propiedad del contenido</h2>
      <p>El contenido que Faro genera para ti y el que editas es tuyo para usarlo en tu negocio. Nos concedes el permiso necesario para almacenarlo, procesarlo y mostrarlo en tu blog y en tu API de lectura mientras uses el servicio. La marca, el software y el diseño de Faro son de Hyperion Software.</p>

      <h2>5. Límites de uso y créditos</h2>
      <p>Cada cuenta tiene un crédito de uso de inteligencia artificial y límites de ritmo (por ejemplo, un máximo de artículos por semana). Podemos ajustarlos para proteger la calidad y la estabilidad del servicio. Si agotas tu crédito, Faro dejará de generar contenido nuevo hasta que se amplíe.</p>

      <h2>6. Conexiones de terceros</h2>
      <p>Si conectas Google Search Console, lo haces con tu propia cuenta y con un permiso de solo lectura que puedes revocar cuando quieras. El uso de esos datos se describe en nuestra <a href="/faro/privacidad">política de privacidad</a>. Los servicios de terceros (Google, DataForSEO y otros) tienen sus propias condiciones.</p>

      <h2>7. Uso aceptable</h2>
      <p>No puedes intentar acceder a cuentas de otras personas, saturar o atacar el servicio, evadir los límites, extraer datos de forma masiva ni usar Faro para enviar spam o crear contenido masivo de baja calidad.</p>

      <h2>8. Disponibilidad y cambios del servicio</h2>
      <p>Hacemos lo posible por mantener Faro disponible, pero se ofrece «tal cual», sin garantía de disponibilidad continua. Podemos modificar, suspender o descontinuar funciones; si es algo importante, te avisaremos con anticipación razonable.</p>

      <h2>9. Cancelación y eliminación</h2>
      <p>Puedes quitar un sitio cuando quieras desde <i>Ajustes</i>, lo que borra sus datos. También puedes pedir que cerremos tu cuenta escribiendo a <a href="mailto:info@hyperionmkt.com">info@hyperionmkt.com</a>. Podemos suspender cuentas que incumplan estas condiciones.</p>

      <h2>10. Limitación de responsabilidad</h2>
      <p>En la medida que lo permita la ley, Hyperion Software no será responsable por daños indirectos, pérdida de ingresos o de posicionamiento, ni por el contenido que se publique en tu sitio. Nuestra responsabilidad total por cualquier reclamación se limita a lo que hayas pagado por el servicio en los 12 meses anteriores.</p>

      <h2>11. Ley aplicable</h2>
      <p>Estas condiciones se rigen por las leyes de México. Para cualquier controversia, las partes se someten a los tribunales competentes de Tijuana, Baja California.</p>

      <h2>12. Cambios y contacto</h2>
      <p>Podemos actualizar estas condiciones; publicaremos la versión vigente aquí con su fecha. Dudas o solicitudes: <a href="mailto:info@hyperionmkt.com">info@hyperionmkt.com</a>.</p>
    </Legal>
  )
}
