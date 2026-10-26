import Legal from "../../../components/legal/Legal"

export const metadata = {
  title: "Política de privacidad | Faro Ai",
  description: "Qué datos usa Faro Ai, para qué, con quién se comparten y cómo borrarlos.",
  alternates: { canonical: "/faro/privacidad" },
}

export default function Privacidad() {
  return (
    <Legal title="Política de privacidad" updated="25 de octubre de 2026">
      <p>Faro Ai («Faro») es un servicio de Hyperion Software («nosotros») que lee tu sitio web, propone temas y escribe y publica artículos para tu blog con ayuda de inteligencia artificial. Esta política explica qué datos tratamos, para qué y cómo puedes controlarlos.</p>

      <h2>1. Quién es responsable</h2>
      <p>Hyperion Software, Tijuana, Baja California, México. Contacto para cualquier tema de privacidad: <a href="mailto:info@hyperionmkt.com">info@hyperionmkt.com</a>.</p>

      <h2>2. Qué datos tratamos</h2>
      <ul>
        <li><b>Cuenta:</b> tu correo electrónico y una contraseña que guardamos solo como huella irreversible (Argon2id), nunca en texto.</li>
        <li><b>Tu sitio:</b> la dirección que registras y el contenido público de sus páginas, que leemos para entender tu negocio (qué haces, a quién le vendes, tono y temas).</li>
        <li><b>Lo que generamos y lo que editas:</b> el perfil de tu marca (Brand DNA), los artículos, sus imágenes de portada y tus ajustes.</li>
        <li><b>Uso y costos:</b> cuántas operaciones de inteligencia artificial se hicieron y su costo, para aplicar los límites de tu cuenta.</li>
        <li><b>Datos técnicos:</b> una cookie de sesión necesaria para mantenerte dentro de tu cuenta y registros del servidor para seguridad y detección de abuso. No usamos cookies de publicidad ni rastreadores de terceros en el panel.</li>
      </ul>

      <h2>3. Datos de Google Search Console</h2>
      <p>Si decides conectar Google Search Console, te pedimos un único permiso de <b>solo lectura</b> (<code>webmasters.readonly</code>). Con él leemos las métricas de rendimiento de tu sitio en Google: impresiones, clics, CTR, posición media, las búsquedas con las que te encuentran y tus páginas más vistas.</p>
      <ul>
        <li>Usamos esos datos <b>únicamente</b> para mostrártelos dentro de tu panel de Analytics y para priorizar los temas de tus artículos.</li>
        <li>No podemos modificar nada en tu cuenta de Google ni en tu Search Console.</li>
        <li>Guardamos el token de acceso <b>cifrado</b> y solo la <b>última consulta</b> de métricas, que reutilizamos durante 1 hora para no saturar a Google. Se borra al desconectar Google o al quitar el sitio. No guardamos tu historial de Search Console.</li>
        <li>No vendemos esos datos, no los usamos para publicidad, no los compartimos con terceros y no los usamos para entrenar modelos de inteligencia artificial.</li>
        <li>Puedes desconectarlo cuando quieras desde Analytics (botón «Desconectar Google», que además revoca el permiso en Google) o desde <a href="https://myaccount.google.com/permissions">myaccount.google.com/permissions</a>.</li>
      </ul>
      <p>El uso y la transferencia a cualquier otra aplicación de la información recibida de las APIs de Google respetará la <a href="https://developers.google.com/terms/api-services-user-data-policy">Política de Datos de Usuario de los Servicios de API de Google</a>, incluidos los requisitos de uso limitado.</p>
      <p><i>Faro Ai’s use and transfer to any other app of information received from Google APIs will adhere to the Google API Services User Data Policy, including the Limited Use requirements.</i></p>

      <h2>4. Con quién compartimos datos</h2>
      <p>Solo con los proveedores necesarios para prestar el servicio y únicamente para eso:</p>
      <ul>
        <li><b>Google (API de Gemini):</b> recibe el texto público de tu sitio y las instrucciones de tu marca para analizarlo y para redactar artículos e imágenes. Su tratamiento se rige por las condiciones de Google.</li>
        <li><b>DataForSEO (opcional):</b> recibe únicamente palabras clave (por ejemplo «software a la medida») para devolver volumen de búsqueda y dificultad. No recibe tus datos personales ni los de tu cuenta.</li>
        <li><b>Google Search Console:</b> solo si tú lo conectas, como se describe arriba.</li>
        <li><b>Infraestructura:</b> el servidor donde corre Faro.</li>
      </ul>
      <p>No vendemos tus datos ni los usamos para entrenar modelos propios.</p>

      <h2>5. Contenido publicado</h2>
      <p>Los artículos que tú publicas son públicos por naturaleza: cualquiera puede leerlos en tu blog y a través de la API de lectura de tu sitio. Lo que está en borrador no se muestra públicamente.</p>

      <h2>6. Cuánto tiempo los conservamos</h2>
      <p>Mientras tengas tu cuenta y el sitio esté dado de alta. Si quitas un sitio desde <i>Ajustes → Quitar este sitio</i>, se borran sus artículos, imágenes, planes, conexión con Google y métricas. Si cierras tu cuenta o quieres que borremos algo más, escríbenos y lo hacemos.</p>

      <h2>7. Seguridad</h2>
      <p>Usamos conexiones cifradas (HTTPS), contraseñas con Argon2id, sesiones con cookie HttpOnly, protección contra solicitudes falsificadas y tokens de terceros cifrados en reposo. Ningún sistema es infalible; si detectáramos un incidente que te afecte, te avisaremos.</p>

      <h2>8. Tus derechos</h2>
      <p>Puedes pedir acceso, rectificación, cancelación u oposición (derechos ARCO, conforme a la legislación mexicana de protección de datos personales) escribiendo a <a href="mailto:info@hyperionmkt.com">info@hyperionmkt.com</a>. Responderemos en un plazo razonable.</p>

      <h2>9. Menores de edad</h2>
      <p>Faro es un servicio para negocios y no está dirigido a menores de 18 años.</p>

      <h2>10. Cambios</h2>
      <p>Si cambiamos esta política, publicaremos la nueva versión en esta página con su fecha. Si el cambio es importante, te avisaremos por correo.</p>
    </Legal>
  )
}
