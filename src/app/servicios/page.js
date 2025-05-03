"use client"
import { Layers, Globe, Code, Megaphone, Settings, ChevronRight } from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"

export default function Servicios() {
  const servicios = [
    {
      icon: <Globe className="h-6 w-6" />,
      title: "Desarrollo Web",
      description: "Sitios web modernos y responsivos que convierten visitantes en clientes.",
      href: "/servicios/desarrollo-web"
    },
    {
      icon: <Code className="h-6 w-6" />,
      title: "Sistemas a Medida",
      description: "Soluciones de software personalizadas para optimizar tus procesos de negocio.",
      href: "/servicios/sistemas-a-medida"
    },
    {
      icon: <Megaphone className="h-6 w-6" />,
      title: "Marketing Digital",
      description: "Estrategias efectivas para aumentar tu visibilidad online y atraer clientes.",
      href: "/servicios/marketing-digital"
    },
    {
      icon: <Settings className="h-6 w-6" />,
      title: "Consultoría IT",
      description: "Asesoramiento experto para optimizar tu infraestructura tecnológica.",
      href: "/servicios/consultoria-it"
    }
  ]

  return (
    <div className="min-h-screen bg-gradient-to-b from-zinc-950 to-black text-white">
      <div className="container mx-auto px-4 py-16">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-green-400 to-emerald-300 bg-clip-text text-transparent">
            Nuestros Servicios
          </h1>
          <p className="text-zinc-400 max-w-2xl mx-auto">
            Ofrecemos soluciones tecnológicas integrales para impulsar el crecimiento de tu negocio
            en la era digital.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {servicios.map((servicio, index) => (
            <div
              key={index}
              className="bg-zinc-900/50 backdrop-blur-sm rounded-xl p-6 border border-zinc-800 hover:border-green-500/50 transition-all duration-300"
            >
              <div className="w-12 h-12 rounded-lg bg-green-500/10 flex items-center justify-center mb-4">
                {servicio.icon}
              </div>
              <h3 className="text-xl font-bold mb-2">{servicio.title}</h3>
              <p className="text-zinc-400 mb-4">{servicio.description}</p>
              <Button variant="ghost" asChild className="w-full">
                <Link href={servicio.href} className="flex items-center justify-between">
                  Ver más detalles
                  <ChevronRight className="h-4 w-4" />
                </Link>
              </Button>
            </div>
          ))}
        </div>

        <div className="mt-16 text-center">
          <h2 className="text-2xl font-bold mb-4">¿Necesitas una solución personalizada?</h2>
          <p className="text-zinc-400 mb-8">
            Contáctanos para discutir cómo podemos ayudarte a alcanzar tus objetivos.
          </p>
          <Button asChild>
            <Link href="/contacto">
              Contactar Ahora
            </Link>
          </Button>
        </div>
      </div>
    </div>
  )
} 