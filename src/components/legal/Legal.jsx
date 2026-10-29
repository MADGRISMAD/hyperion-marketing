import Link from "next/link"
import { ArrowLeft } from "lucide-react"
import { Logo } from "../landing/Navbar"

// Plantilla de las páginas legales (Faro y el sitio): mismo esquema claro del sitio, texto largo y legible.
export default function Legal({ title, updated, children, back = ["/faro", "Faro"], eyebrow = "Faro · Hyperion Software" }) {
  return (
    <div className="min-h-screen bg-canvas text-ink">
      <header className="border-b border-ink/15">
        <div className="container flex h-16 items-center justify-between">
          <Link href="/" aria-label="Hyperion Software, inicio"><Logo className="h-10" /></Link>
          <Link href={back[0]} className="inline-flex items-center gap-1.5 text-sm font-medium text-grey-700 hover:text-ink"><ArrowLeft className="h-4 w-4" aria-hidden="true" /> {back[1]}</Link>
        </div>
      </header>
      <main className="container py-14 md:py-20">
        <article className="mx-auto max-w-3xl [&_a]:underline [&_h2]:mt-12 [&_h2]:text-2xl [&_h2]:font-bold [&_h2]:tracking-[-0.02em] [&_li]:mt-2 [&_p]:mt-4 [&_ul]:mt-4 [&_ul]:list-disc [&_ul]:pl-6">
          <p className="eyebrow text-grey-500">{eyebrow}</p>
          <h1 className="display mt-4 text-[clamp(2.2rem,5vw,3.6rem)]">{title}</h1>
          <p className="mt-4 text-grey-500">Última actualización: {updated}</p>
          <div className="mt-8 text-[17px] leading-relaxed">{children}</div>
        </article>
      </main>
    </div>
  )
}
