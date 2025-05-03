"use client"
import { Code, Cpu, Database, CheckCircle } from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"

export default function SistemasAMedida() {
  const caracteristicas = [
    "Desarrollo de software personalizado",
    "Integración con sistemas existentes",
    "Automatización de procesos",
    "Análisis de datos y reportes",
    "Soporte y mantenimiento continuo",
    "Escalabilidad y seguridad"
  ]

  return (
    <div className="min-h-screen bg-gradient-to-b from-zinc-950 to-black text-white">
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-green-400 to-emerald-300 bg-clip-text text-transparent">
              Sistemas a Medida
            </h1>
            <p className="text-zinc-400 max-w-2xl mx-auto">
              Desarrollamos soluciones de software personalizadas que optimizan tus procesos de negocio.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-16">
            <div className="bg-zinc-900/50 backdrop-blur-sm rounded-xl p-8 border border-zinc-800">
              <div className="w-16 h-16 rounded-lg bg-green-500/10 flex items-center justify-center mb-6">
                <Code className="h-8 w-8 text-green-400" />
              </div>
              <h2 className="text-2xl font-bold mb-4">Soluciones Personalizadas</h2>
              <p className="text-zinc-400 mb-6">
                Creamos sistemas de software adaptados a tus necesidades específicas,
                optimizando tus procesos y mejorando la eficiencia.
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
                  <Cpu className="h-6 w-6 text-green-400" />
                </div>
                <h3 className="text-xl font-bold mb-2">Tecnología Avanzada</h3>
                <p className="text-zinc-400">
                  Utilizamos las últimas tecnologías y frameworks para garantizar el mejor rendimiento
                  y escalabilidad.
                </p>
              </div>

              <div className="bg-zinc-900/50 backdrop-blur-sm rounded-xl p-6 border border-zinc-800">
                <div className="w-12 h-12 rounded-lg bg-green-500/10 flex items-center justify-center mb-4">
                  <Database className="h-6 w-6 text-green-400" />
                </div>
                <h3 className="text-xl font-bold mb-2">Gestión de Datos</h3>
                <p className="text-zinc-400">
                  Sistemas robustos para la gestión y análisis de datos que impulsan la toma de decisiones.
                </p>
              </div>
            </div>
          </div>

          <div className="text-center">
            <h2 className="text-2xl font-bold mb-4">¿Necesitas un sistema personalizado?</h2>
            <p className="text-zinc-400 mb-8">
              Contáctanos para desarrollar la solución perfecta para tu negocio.
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