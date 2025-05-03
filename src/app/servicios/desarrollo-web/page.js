"use client"
import { Globe, Code, Smartphone, Zap, CheckCircle } from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"

export default function DesarrolloWeb() {
  const caracteristicas = [
    "Diseño responsivo y adaptativo",
    "Optimización para motores de búsqueda (SEO)",
    "Integración con redes sociales",
    "Sistema de gestión de contenido",
    "Formularios de contacto y suscripción",
    "Análisis de tráfico y conversiones"
  ]

  return (
    <div className="min-h-screen bg-gradient-to-b from-zinc-950 to-black text-white">
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-green-400 to-emerald-300 bg-clip-text text-transparent">
              Desarrollo Web
            </h1>
            <p className="text-zinc-400 max-w-2xl mx-auto">
              Creamos sitios web modernos y funcionales que impulsan el crecimiento de tu negocio en línea.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-16">
            <div className="bg-zinc-900/50 backdrop-blur-sm rounded-xl p-8 border border-zinc-800">
              <div className="w-16 h-16 rounded-lg bg-green-500/10 flex items-center justify-center mb-6">
                <Globe className="h-8 w-8 text-green-400" />
              </div>
              <h2 className="text-2xl font-bold mb-4">Sitios Web Profesionales</h2>
              <p className="text-zinc-400 mb-6">
                Desarrollamos sitios web que no solo se ven bien, sino que también generan resultados.
                Desde landing pages hasta sitios web corporativos completos.
              </p>
              <ul className="space-y-4">
                {caracteristicas.map((caracteristica, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <CheckCircle className="h-5 w-5 text-green-400 mt-1" />
                    <span className="text-zinc-300">{caracteristica}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="space-y-8">
              <div className="bg-zinc-900/50 backdrop-blur-sm rounded-xl p-6 border border-zinc-800">
                <div className="w-12 h-12 rounded-lg bg-green-500/10 flex items-center justify-center mb-4">
                  <Smartphone className="h-6 w-6 text-green-400" />
                </div>
                <h3 className="text-xl font-bold mb-2">Diseño Responsivo</h3>
                <p className="text-zinc-400">
                  Tu sitio web se verá perfecto en cualquier dispositivo, desde móviles hasta pantallas de escritorio.
                </p>
              </div>

              <div className="bg-zinc-900/50 backdrop-blur-sm rounded-xl p-6 border border-zinc-800">
                <div className="w-12 h-12 rounded-lg bg-green-500/10 flex items-center justify-center mb-4">
                  <Zap className="h-6 w-6 text-green-400" />
                </div>
                <h3 className="text-xl font-bold mb-2">Rendimiento Óptimo</h3>
                <p className="text-zinc-400">
                  Sitios web rápidos y optimizados para mejorar la experiencia del usuario y el posicionamiento SEO.
                </p>
              </div>
            </div>
          </div>

          <div className="text-center">
            <h2 className="text-2xl font-bold mb-4">¿Listo para comenzar tu proyecto web?</h2>
            <p className="text-zinc-400 mb-8">
              Contáctanos para discutir cómo podemos ayudarte a crear el sitio web perfecto para tu negocio.
            </p>
            <Button asChild>
              <Link href="/contacto">
                Solicitar Cotización
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
} 