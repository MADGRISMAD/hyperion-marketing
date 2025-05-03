"use client"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { CheckCircle } from "lucide-react"

export default function Gracias() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-zinc-950 to-black flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-zinc-900/50 backdrop-blur-sm rounded-xl p-8 shadow-xl border border-zinc-800">
        <div className="flex flex-col items-center text-center space-y-6">
          <CheckCircle className="w-16 h-16 text-green-500" />
          <h1 className="text-3xl font-bold text-white">¡Gracias por contactarnos!</h1>
          <p className="text-zinc-400">
            Hemos recibido tu mensaje y nos pondremos en contacto contigo lo antes posible.
          </p>
          <Button asChild>
            <Link href="/">
              Volver al inicio
            </Link>
          </Button>
        </div>
      </div>
    </div>
  )
}
