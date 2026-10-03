import Link from "next/link"
import { ArrowLeft, Sprout } from "lucide-react"
import { ForestLayer, Fireflies } from "../../components/landing/Forest"

export const metadata = {
  title: "¡Gracias! | Hyperion Marketing",
  robots: { index: false },
}

export default function Gracias() {
  return (
    <main className="grain relative flex min-h-screen items-center justify-center overflow-hidden px-4">
      <div className="absolute inset-0 bg-[linear-gradient(180deg,#020604_0%,#0d2219_55%,#4a2c17_100%)]" />
      <ForestLayer seed={11} count={30} minH={220} maxH={360} color="#1d3a30" className="opacity-70" />
      <ForestLayer seed={47} count={8} minH={500} maxH={800} color="#040906" skipCenter={420} />
      <Fireflies count={20} />
      <div className="relative z-10 max-w-lg rounded-3xl border border-white/10 bg-forest-950/70 p-10 text-center backdrop-blur-xl">
        <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br from-amber to-bark">
          <Sprout className="h-8 w-8 text-forest-950" />
        </div>
        <h1 className="font-display text-4xl font-semibold text-cream">¡La semilla está plantada!</h1>
        <p className="mt-4 text-cream/70">
          Recibimos tu mensaje. Nuestro equipo te contactará muy pronto para hacer crecer tu proyecto.
        </p>
        <Link
          href="/"
          className="mt-8 inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-amber to-bark px-7 py-3.5 font-semibold text-forest-950 transition hover:scale-[1.03]"
        >
          <ArrowLeft className="h-4 w-4" /> Volver al inicio
        </Link>
      </div>
    </main>
  )
}
