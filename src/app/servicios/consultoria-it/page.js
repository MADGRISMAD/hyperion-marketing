import { Settings, Shield, Clock } from "lucide-react"
import ServicePage from "@/components/landing/ServicePage"

export const metadata = {
  title: "Consultoría IT | Hyperion Software",
  description: "Te ayudamos a decidir qué tecnología conviene a tu negocio antes de invertir.",
  alternates: { canonical: "/servicios/consultoria-it" },
  openGraph: { url: "/servicios/consultoria-it", images: ["/og.png"] },
}

export default function ConsultoriaIT() {
  return (
    <ServicePage
      path="/servicios/consultoria-it"
      icon={Settings}
      title="Consultoría IT"
      intro="Te ayudamos a decidir qué tecnología conviene a tu negocio antes de invertir."
      heading="Servicios de Consultoría"
      text="Ofrecemos soluciones estratégicas para optimizar tu infraestructura tecnológica y mejorar la eficiencia operativa."
      items={[
        "Auditoría de sistemas y procesos",
        "Optimización de infraestructura",
        "Seguridad y protección de datos",
        "Migración a la nube",
        "Gestión de riesgos IT",
        "Capacitación y soporte técnico",
      ]}
      extras={[
        { icon: Shield, title: "Seguridad Informática", text: "Revisamos accesos, respaldos y actualizaciones de tus equipos y sistemas." },
        { icon: Clock, title: "Optimización Continua", text: "Monitoreamos y mejoramos constantemente tus sistemas para mantenerlos al máximo rendimiento." },
      ]}
      ctaTitle="¿Necesitas asesoría tecnológica?"
      ctaText="Contáctanos para una consulta gratuita y descubre cómo podemos optimizar tu infraestructura tecnológica."
      ctaLabel="Solicitar Consulta"
    />
  )
}
