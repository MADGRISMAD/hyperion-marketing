import Link from "next/link"
import { ArrowLeft, CheckCircle2 } from "lucide-react"

export const metadata = {
  title: "¡Gracias! | Hyperion Marketing",
  robots: { index: false },
}

export default function Gracias() {
  return (
    <main className="relative flex min-h-screen items-center justify-center overflow-hidden px-4">
      <div className="absolute inset-0 bg-gradient-to-b from-[#eef4ff] to-white" />
      <div className="relative z-10 max-w-lg rounded-3xl border border-slate-200 bg-white p-10 text-center shadow-xl shadow-slate-900/5">
        <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-aqua/15 ring-1 ring-aqua/40">
          <CheckCircle2 className="h-8 w-8 text-aqua" />
        </div>
        <h1 className="font-display text-3xl font-bold text-fog">¡Mensaje recibido!</h1>
        <p className="mt-4 text-fog/70">
          Gracias por escribirnos. Nuestro equipo revisará tu proyecto y te contactará muy pronto.
        </p>
        <Link
          href="/"
          className="mt-8 inline-flex items-center gap-2 rounded-full bg-brand px-7 py-3.5 font-semibold text-white transition hover:scale-[1.03]"
        >
          <ArrowLeft className="h-4 w-4" /> Volver al inicio
        </Link>
      </div>
    </main>
  )
}
