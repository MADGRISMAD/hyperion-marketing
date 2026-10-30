import { Globe, Smartphone, Zap } from "lucide-react"
import ServicePage from "@/components/landing/ServicePage"

export const metadata = {
  title: "Desarrollo web | Hyperion Software",
  description: "Sitios web modernos y rápidos que convierten visitas en clientes.",
  alternates: { canonical: "/servicios/desarrollo-web" },
  openGraph: { url: "/servicios/desarrollo-web", images: ["/og.png"] },
}

export default function DesarrolloWeb() {
  return (
    <ServicePage
      path="/servicios/desarrollo-web"
      icon={Globe}
      title="Desarrollo web"
      intro="Creamos sitios web modernos y funcionales que impulsan el crecimiento de tu negocio en línea."
      heading="Sitios web profesionales"
      text="Desarrollamos sitios web que no solo se ven bien, sino que también generan resultados. Desde landing pages hasta sitios web corporativos completos."
      items={[
        "Diseño responsivo y adaptativo",
        "Optimización para motores de búsqueda (SEO)",
        "Integración con redes sociales",
        "Sistema de gestión de contenido",
        "Formularios de contacto y suscripción",
        "Análisis de tráfico y conversiones",
      ]}
      extras={[
        { icon: Smartphone, title: "Diseño responsivo", text: "Tu sitio se adapta al celular, la tablet y la computadora." },
        { icon: Zap, title: "Rendimiento óptimo", text: "Sitios web rápidos y optimizados para mejorar la experiencia del usuario y el posicionamiento SEO." },
      ]}
      ctaTitle="¿Listo para comenzar tu proyecto web?"
      ctaText="Contáctanos para discutir cómo podemos ayudarte a crear el sitio web perfecto para tu negocio."
      ctaLabel="Solicitar cotización"
    />
  )
}
