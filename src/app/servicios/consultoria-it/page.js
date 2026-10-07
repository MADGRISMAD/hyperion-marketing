import { Settings, Shield, Clock } from "lucide-react"
import ServicePage from "@/components/landing/ServicePage"

export const metadata = {
  title: "Consultoría IT | Hyperion Marketing",
  description: "Asesoramiento experto para optimizar tu infraestructura tecnológica.",
  alternates: { canonical: "/servicios/consultoria-it" },
}

export default function ConsultoriaIT() {
  return (
    <ServicePage
      icon={Settings}
      title="Consultoría IT"
      intro="Asesoramiento experto para optimizar tu infraestructura tecnológica y maximizar su rendimiento."
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
        { icon: Shield, title: "Seguridad Informática", text: "Protegemos tus sistemas y datos con las mejores prácticas de seguridad informática." },
        { icon: Clock, title: "Optimización Continua", text: "Monitoreamos y mejoramos constantemente tus sistemas para mantenerlos al máximo rendimiento." },
      ]}
      ctaTitle="¿Necesitas asesoría tecnológica?"
      ctaText="Contáctanos para una consulta gratuita y descubre cómo podemos optimizar tu infraestructura tecnológica."
      ctaLabel="Solicitar Consulta"
    />
  )
}
