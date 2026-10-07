import Link from "next/link"
import { ArrowLeft, ArrowRight, CheckCircle2 } from "lucide-react"
import { Logo } from "./Navbar"

// Plantilla compartida de las páginas /servicios/*: mismo esquema claro que la página principal.
export default function ServicePage({ icon: Icon, title, intro, heading, text, items, extras, ctaTitle, ctaText, ctaLabel }) {
  return (
    <div className="min-h-screen bg-ink-900 text-fog">
      <header className="border-b border-slate-200 bg-white">
        <div className="container flex h-16 items-center justify-between">
          <Link href="/" aria-label="Hyperion Marketing, inicio">
            <Logo />
          </Link>
          <Link href="/servicios" className="inline-flex items-center gap-1.5 text-sm font-medium text-fog/60 hover:text-fog">
            <ArrowLeft className="h-4 w-4" aria-hidden="true" /> Todos los servicios
          </Link>
        </div>
      </header>

      <main className="container py-14 md:py-20">
        <div className="mx-auto max-w-4xl">
          <div className="mb-14 text-center">
            <h1 className="font-display text-4xl font-bold tracking-tight md:text-5xl">
              <span className="text-brand">{title}</span>
            </h1>
            <p className="mx-auto mt-4 max-w-2xl text-lg text-fog/65">{intro}</p>
          </div>

          <div className="mb-14 grid gap-8 md:grid-cols-2">
            <div className="rounded-2xl border border-slate-200 bg-white p-8 shadow-sm">
              <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-2xl bg-brand/10 ring-1 ring-brand/20">
                <Icon className="h-7 w-7 text-brand" aria-hidden="true" />
              </div>
              <h2 className="font-display mb-3 text-2xl font-bold">{heading}</h2>
              <p className="mb-6 text-fog/65">{text}</p>
              <ul className="space-y-3">
                {items.map((item) => (
                  <li key={item} className="flex items-start gap-3">
                    <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-aqua" aria-hidden="true" />
                    <span className="text-fog/80">{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="space-y-8">
              {extras.map(({ icon: ExtraIcon, title: extraTitle, text: extraText }) => (
                <div key={extraTitle} className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
                  <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-brand/10 ring-1 ring-brand/20">
                    <ExtraIcon className="h-6 w-6 text-brand" aria-hidden="true" />
                  </div>
                  <h3 className="font-display mb-2 text-xl font-bold">{extraTitle}</h3>
                  <p className="text-fog/65">{extraText}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="text-center">
            <h2 className="font-display mb-3 text-2xl font-bold">{ctaTitle}</h2>
            <p className="mb-8 text-fog/65">{ctaText}</p>
            <Link
              href="/#contacto"
              className="inline-flex items-center gap-2 rounded-full bg-brand px-7 py-3.5 font-semibold text-white transition hover:scale-[1.03]"
            >
              {ctaLabel} <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Link>
          </div>
        </div>
      </main>
    </div>
  )
}
