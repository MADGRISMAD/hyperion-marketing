import Link from "next/link"
import { ArrowLeft, ArrowRight } from "lucide-react"
import { Logo } from "../../components/landing/Navbar"

export const metadata = {
  title: "FaroContenido | Tu blog escrito solo, por Hyperion Software",
  description: "FaroContenido lee tu sitio, entiende tu negocio y escribe y publica artículos con imagen para tu blog, con datos reales de Google Search Console.",
  alternates: { canonical: "/faro" },
}

const pasos = [
  ["Pegas la dirección de tu sitio", "Con o sin https, con o sin www. Sin formularios."],
  ["La IA entiende tu negocio", "Deduce qué haces, a quién le vendes, tu tono y los temas que te conviene cubrir. Tú lo revisas en un asistente de pocos pasos."],
  ["Escribe y publica a un ritmo prudente", "Un artículo con su imagen de portada, a un ritmo moderado que Google ve con buenos ojos. En sectores sensibles queda en borrador para tu revisión."],
  ["Lo ves en tu sitio, con tu diseño", "Por una API de lectura, por tu propio dominio o en un blog alojado. Y con Google Search Console conectado, ves tus datos reales."],
]

export default function Faro() {
  return (
    <div className="min-h-screen bg-canvas text-ink">
      <header className="border-b border-ink/15">
        <div className="container flex h-16 items-center justify-between">
          <Link href="/" aria-label="Hyperion Software, inicio"><Logo className="h-10" /></Link>
          <Link href="/" className="inline-flex items-center gap-1.5 text-sm font-medium text-grey-700 hover:text-ink"><ArrowLeft className="h-4 w-4" aria-hidden="true" /> Hyperion</Link>
        </div>
      </header>
      <main className="container py-14 md:py-20">
        <p className="eyebrow text-grey-500">Un producto de Hyperion Software</p>
        <h1 className="display mt-4 max-w-4xl text-[clamp(2.6rem,7vw,5.2rem)]">FaroContenido: tu blog, escrito solo.</h1>
        <p className="mt-6 max-w-2xl text-xl text-grey-700">Pegas la dirección de tu sitio y la inteligencia artificial investiga tu negocio, elige los temas y escribe y publica artículos con imagen. Tú conservas el control y el diseño.</p>
        <div className="mt-8 flex flex-wrap items-center gap-4">
          <a href="https://faro.15-235-62-27.sslip.io/dashboard" className="bt bt-pink">Entrar a FaroContenido <ArrowRight className="h-4 w-4" aria-hidden="true" /></a>
        </div>
        <ol className="mt-16 grid gap-px overflow-hidden rounded-lg border border-ink/15 bg-ink/15 md:grid-cols-2">
          {pasos.map(([t, d], i) => (
            <li key={t} className="bg-canvas p-7">
              <span className="mono text-[13px] text-pink-text">0{i + 1} /</span>
              <h2 className="mt-2 text-xl font-bold tracking-[-0.02em]">{t}</h2>
              <p className="mt-2 text-grey-700">{d}</p>
            </li>
          ))}
        </ol>
        <section className="mt-16 max-w-2xl">
          <h2 className="text-2xl font-bold tracking-[-0.02em]">Tus datos, con cuidado</h2>
          <p className="mt-3 text-grey-700">Si conectas Google Search Console, FaroContenido solo lee las métricas de tu sitio (permiso de solo lectura) para mostrártelas y priorizar temas. No las vende ni las comparte, y puedes desconectarlo cuando quieras. Lee nuestra <Link href="/faro/privacidad" className="underline">política de privacidad</Link> y las <Link href="/faro/terminos" className="underline">condiciones del servicio</Link>.</p>
        </section>
      </main>
    </div>
  )
}
