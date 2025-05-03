"use client"
import { Settings, Shield, Clock, CheckCircle } from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"

export default function ConsultoriaIT() {
  const servicios = [
    "Auditoría de sistemas y procesos",
    "Optimización de infraestructura",
    "Seguridad y protección de datos",
    "Migración a la nube",
    "Gestión de riesgos IT",
    "Capacitación y soporte técnico"
  ]

  return (
    <div className="min-h-screen bg-gradient-to-b from-zinc-950 to-black text-white">
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-green-400 to-emerald-300 bg-clip-text text-transparent">
              Consultoría IT
            </h1>
            <p className="text-zinc-400 max-w-2xl mx-auto">
              Asesoramiento experto para optimizar tu infraestructura tecnológica y maximizar su rendimiento.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-16">
            <div className="bg-zinc-900/50 backdrop-blur-sm rounded-xl p-8 border border-zinc-800">
              <div className="w-16 h-16 rounded-lg bg-green-500/10 flex items-center justify-center mb-6">
                <Settings className="h-8 w-8 text-green-400" />
              </div>
              <h2 className="text-2xl font-bold mb-4">Servicios de Consultoría</h2>
              <p className="text-zinc-400 mb-6">
                Ofrecemos soluciones estratégicas para optimizar tu infraestructura tecnológica
                y mejorar la eficiencia operativa.
              </p>
              <ul className="space-y-4">
                {servicios.map((servicio, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <CheckCircle className="h-5 w-5 text-green-400 mt-1" />
                    <span className="text-zinc-300">{servicio}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="space-y-8">
              <div className="bg-zinc-900/50 backdrop-blur-sm rounded-xl p-6 border border-zinc-800">
                <div className="w-12 h-12 rounded-lg bg-green-500/10 flex items-center justify-center mb-4">
                  <Shield className="h-6 w-6 text-green-400" />
                </div>
                <h3 className="text-xl font-bold mb-2">Seguridad Informática</h3>
                <p className="text-zinc-400">
                  Protegemos tus sistemas y datos con las mejores prácticas de seguridad informática.
                </p>
              </div>

              <div className="bg-zinc-900/50 backdrop-blur-sm rounded-xl p-6 border border-zinc-800">
                <div className="w-12 h-12 rounded-lg bg-green-500/10 flex items-center justify-center mb-4">
                  <Clock className="h-6 w-6 text-green-400" />
                </div>
                <h3 className="text-xl font-bold mb-2">Optimización Continua</h3>
                <p className="text-zinc-400">
                  Monitoreamos y mejoramos constantemente tus sistemas para mantenerlos al máximo rendimiento.
                </p>
              </div>
            </div>
          </div>

          <div className="text-center">
            <h2 className="text-2xl font-bold mb-4">¿Necesitas asesoramiento IT?</h2>
            <p className="text-zinc-400 mb-8">
              Contáctanos para una consulta gratuita y descubre cómo podemos optimizar tu infraestructura tecnológica.
            </p>
            <Button asChild>
              <Link href="/contacto">
                Solicitar Consulta
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
} 