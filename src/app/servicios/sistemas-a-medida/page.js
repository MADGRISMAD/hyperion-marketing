import { Code, Cpu, Database } from "lucide-react"
import ServicePage from "@/components/landing/ServicePage"

export const metadata = {
  title: "Sistemas a medida | Hyperion Software",
  description: "Software personalizado que optimiza los procesos de tu negocio.",
  alternates: { canonical: "/servicios/sistemas-a-medida" },
  openGraph: { url: "/servicios/sistemas-a-medida", images: ["/og.png"] },
}

export default function SistemasAMedida() {
  return (
    <ServicePage
      path="/servicios/sistemas-a-medida"
      related={{ href: "/blog/que-es-un-sistema-a-la-medida-y-cuando-le-conviene-a-tu-negocio-acbc03c5", label: "¿Qué es un sistema a la medida y cuándo le conviene a tu negocio?" }}
      icon={Code}
      title="Sistemas a la medida"
      intro="Desarrollamos soluciones de software personalizadas que optimizan tus procesos de negocio."
      heading="Soluciones personalizadas"
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
        { icon: Cpu, title: "Hecho por el mismo equipo", text: "El mismo equipo que construyó Mitiendita, Caresia y Barbella diseña, programa y da soporte a tu sistema." },
        { icon: Database, title: "Gestión de datos", text: "Sistemas robustos para la gestión y análisis de datos que impulsan la toma de decisiones." },
      ]}
      ctaTitle="¿Necesitas un sistema a tu medida?"
      ctaText="Cuéntanos tu proceso y te proponemos un plan con tiempos y costos definidos."
      ctaLabel="Solicitar cotización"
    />
  )
}
