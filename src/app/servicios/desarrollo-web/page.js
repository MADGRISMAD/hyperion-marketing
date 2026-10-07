import { Globe, Smartphone, Zap } from "lucide-react"
import ServicePage from "@/components/landing/ServicePage"

export const metadata = {
  title: "Desarrollo web | Hyperion Marketing",
  description: "Sitios web modernos y rápidos que convierten visitas en clientes.",
  alternates: { canonical: "/servicios/desarrollo-web" },
}

export default function DesarrolloWeb() {
  return (
    <ServicePage
      icon={Globe}
      title="Desarrollo Web"
      intro="Creamos sitios web modernos y funcionales que impulsan el crecimiento de tu negocio en línea."
      heading="Sitios Web Profesionales"
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
        { icon: Smartphone, title: "Diseño Responsivo", text: "Tu sitio web se verá perfecto en cualquier dispositivo, desde móviles hasta pantallas de escritorio." },
        { icon: Zap, title: "Rendimiento Óptimo", text: "Sitios web rápidos y optimizados para mejorar la experiencia del usuario y el posicionamiento SEO." },
      ]}
      ctaTitle="¿Listo para comenzar tu proyecto web?"
      ctaText="Contáctanos para discutir cómo podemos ayudarte a crear el sitio web perfecto para tu negocio."
      ctaLabel="Solicitar Cotización"
    />
  )
}
