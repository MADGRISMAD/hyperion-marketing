import { Code, Cpu, Database } from "lucide-react"
import ServicePage from "@/components/landing/ServicePage"

export const metadata = {
  title: "Sistemas a medida | Hyperion Marketing",
  description: "Software personalizado que optimiza los procesos de tu negocio.",
  alternates: { canonical: "/servicios/sistemas-a-medida" },
}

export default function SistemasAMedida() {
  return (
    <ServicePage
      icon={Code}
      title="Sistemas a Medida"
      intro="Desarrollamos soluciones de software personalizadas que optimizan tus procesos de negocio."
      heading="Soluciones Personalizadas"
      text="Creamos sistemas de software adaptados a tus necesidades específicas, optimizando tus procesos y mejorando la eficiencia."
      items={[
        "Desarrollo de software personalizado",
        "Integración con sistemas existentes",
        "Automatización de procesos",
        "Análisis de datos y reportes",
        "Soporte y mantenimiento continuo",
        "Escalabilidad y seguridad",
      ]}
      extras={[
        { icon: Cpu, title: "Tecnología Avanzada", text: "Utilizamos las últimas tecnologías y frameworks para garantizar el mejor rendimiento y escalabilidad." },
        { icon: Database, title: "Gestión de Datos", text: "Sistemas robustos para la gestión y análisis de datos que impulsan la toma de decisiones." },
      ]}
      ctaTitle="¿Necesitas un sistema a tu medida?"
      ctaText="Contáctanos para desarrollar la solución perfecta para tu negocio."
      ctaLabel="Solicitar Cotización"
    />
  )
}
