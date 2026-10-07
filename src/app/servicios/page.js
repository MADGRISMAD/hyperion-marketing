import Link from "next/link"
import { ArrowRight, ChevronRight, Code, Globe, Megaphone, Settings } from "lucide-react"
import { Logo } from "@/components/landing/Navbar"

export const metadata = {
  title: "Servicios | Hyperion Marketing",
  description: "Desarrollo web, sistemas a medida, marketing digital y consultoría IT.",
  alternates: { canonical: "/servicios" },
}

const servicios = [
  { icon: Globe, title: "Desarrollo Web", description: "Sitios web modernos y responsivos que convierten visitantes en clientes.", href: "/servicios/desarrollo-web" },
  { icon: Code, title: "Sistemas a Medida", description: "Soluciones de software personalizadas para optimizar tus procesos de negocio.", href: "/servicios/sistemas-a-medida" },
  { icon: Megaphone, title: "Marketing Digital", description: "Estrategias efectivas para aumentar tu visibilidad online y atraer clientes.", href: "/servicios/marketing-digital" },
  { icon: Settings, title: "Consultoría IT", description: "Asesoramiento experto para optimizar tu infraestructura tecnológica.", href: "/servicios/consultoria-it" },
]

export default function Servicios() {
  return (
    <div className="min-h-screen bg-ink-900 text-fog">
      <header className="border-b border-slate-200 bg-white">
        <div className="container flex h-16 items-center justify-between">
          <Link href="/" aria-label="Hyperion Marketing, inicio">
            <Logo />
          </Link>
          <Link href="/" className="text-sm font-medium text-fog/60 hover:text-fog">Volver al inicio</Link>
        </div>
      </header>

      <main className="container py-14 md:py-20">
        <div className="mb-14 text-center">
          <h1 className="font-display text-4xl font-bold tracking-tight md:text-5xl">
            Nuestros <span className="text-brand">Servicios</span>
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-fog/65">
            Ofrecemos soluciones tecnológicas integrales para impulsar el crecimiento de tu negocio en la era digital.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {servicios.map(({ icon: Icon, title, description, href }) => (
            <Link
              key={href}
              href={href}
              className="group flex flex-col rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-lg"
            >
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-brand/10 ring-1 ring-brand/20">
                <Icon className="h-6 w-6 text-brand" aria-hidden="true" />
              </div>
              <h3 className="font-display mb-2 text-xl font-bold">{title}</h3>
              <p className="mb-5 flex-1 text-fog/65">{description}</p>
              <span className="inline-flex items-center justify-between text-sm font-semibold text-brand">
                Ver más detalles
                <ChevronRight className="h-4 w-4 transition group-hover:translate-x-1" aria-hidden="true" />
              </span>
            </Link>
          ))}
        </div>

        <div className="mt-16 text-center">
          <h2 className="font-display mb-3 text-2xl font-bold">¿Necesitas una solución personalizada?</h2>
          <p className="mb-8 text-fog/65">Contáctanos para discutir cómo podemos ayudarte a alcanzar tus objetivos.</p>
          <Link
            href="/#contacto"
            className="inline-flex items-center gap-2 rounded-full bg-brand px-7 py-3.5 font-semibold text-white transition hover:scale-[1.03]"
          >
            Contactar Ahora <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </Link>
        </div>
      </main>
    </div>
  )
}
