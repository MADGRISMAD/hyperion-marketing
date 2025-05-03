"use client"
import { Megaphone, Target, BarChart, CheckCircle } from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"

export default function MarketingDigital() {
  const estrategias = [
    "Publicidad en redes sociales",
    "Email marketing personalizado",
    "Optimización de conversiones",
    "Análisis de datos y métricas",
    "Gestión de reputación online",
    "Campañas de remarketing"
  ]

  return (
    <div className="min-h-screen bg-gradient-to-b from-zinc-950 to-black text-white">
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-green-400 to-emerald-300 bg-clip-text text-transparent">
              Marketing Digital
            </h1>
            <p className="text-zinc-400 max-w-2xl mx-auto">
              Impulsamos tu presencia online con estrategias efectivas que generan resultados medibles.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-16">
            <div className="bg-zinc-900/50 backdrop-blur-sm rounded-xl p-8 border border-zinc-800">
              <div className="w-16 h-16 rounded-lg bg-green-500/10 flex items-center justify-center mb-6">
                <Megaphone className="h-8 w-8 text-green-400" />
              </div>
              <h2 className="text-2xl font-bold mb-4">Estrategias Digitales</h2>
              <p className="text-zinc-400 mb-6">
                Desarrollamos campañas de marketing digital personalizadas que conectan con tu audiencia
                y generan conversiones.
              </p>
              <ul className="space-y-4">
                {estrategias.map((estrategia, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <CheckCircle className="h-5 w-5 text-green-400 mt-1" />
                    <span className="text-zinc-300">{estrategia}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="space-y-8">
              <div className="bg-zinc-900/50 backdrop-blur-sm rounded-xl p-6 border border-zinc-800">
                <div className="w-12 h-12 rounded-lg bg-green-500/10 flex items-center justify-center mb-4">
                  <Target className="h-6 w-6 text-green-400" />
                </div>
                <h3 className="text-xl font-bold mb-2">Audiencia Objetivo</h3>
                <p className="text-zinc-400">
                  Identificamos y segmentamos tu audiencia ideal para maximizar el impacto de tus campañas.
                </p>
              </div>

              <div className="bg-zinc-900/50 backdrop-blur-sm rounded-xl p-6 border border-zinc-800">
                <div className="w-12 h-12 rounded-lg bg-green-500/10 flex items-center justify-center mb-4">
                  <BarChart className="h-6 w-6 text-green-400" />
                </div>
                <h3 className="text-xl font-bold mb-2">Análisis de Resultados</h3>
                <p className="text-zinc-400">
                  Monitoreamos y optimizamos continuamente tus campañas para asegurar el mejor ROI.
                </p>
              </div>
            </div>
          </div>

          <div className="text-center">
            <h2 className="text-2xl font-bold mb-4">¿Listo para impulsar tu negocio?</h2>
            <p className="text-zinc-400 mb-8">
              Contáctanos para desarrollar una estrategia de marketing digital que genere resultados.
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