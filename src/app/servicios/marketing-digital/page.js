import { Megaphone, Target, BarChart3 } from "lucide-react"
import ServicePage from "@/components/landing/ServicePage"

export const metadata = {
  title: "Marketing digital | Hyperion Software",
  description: "Estrategia, contenido y campañas para que tu negocio se vea.",
  alternates: { canonical: "/servicios/marketing-digital" },
  openGraph: { url: "/servicios/marketing-digital", images: ["/og.png"] },
}

export default function MarketingDigital() {
  return (
    <ServicePage
      path="/servicios/marketing-digital"
      icon={Megaphone}
      title="Marketing Digital"
      intro="Campañas, contenido y redes para que más clientes encuentren tu negocio, con métricas que puedes revisar."
      heading="Estrategias Digitales"
      text="Desarrollamos campañas de marketing digital personalizadas que conectan con tu audiencia y generan conversiones."
      items={[
        "Publicidad en redes sociales",
        "Email marketing personalizado",
        "Optimización de conversiones",
        "Análisis de datos y métricas",
        "Gestión de reputación online",
        "Campañas de remarketing",
      ]}
      extras={[
        { icon: Target, title: "Audiencia Objetivo", text: "Identificamos y segmentamos tu audiencia ideal para maximizar el impacto de tus campañas." },
        { icon: BarChart3, title: "Análisis de Resultados", text: "Monitoreamos y optimizamos continuamente tus campañas y ajustamos lo que no funciona." },
      ]}
      ctaTitle="¿Listo para hacer crecer tu marca?"
      ctaText="Contáctanos para desarrollar una estrategia de marketing digital que genere resultados."
      ctaLabel="Solicitar Cotización"
    />
  )
}
