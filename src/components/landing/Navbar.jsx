"use client"
import { useRef, useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { ArrowUpRight, Menu, X } from "lucide-react"
import { useScrollFrame } from "./parallax"

// Símbolo del logo (árbol + H + flecha) con el nombre al lado.
// `chrome`: sobre fondo oscuro el símbolo se pinta en cromo (el PNG sirve de molde) y el nombre en papel.
// `target` marca la instancia de la barra: ahí aterriza el logo de la animación de entrada.
export function Logo({ className = "", target = false, compact = false, chrome = false }) {
  const size = compact ? "h-8" : "h-10"
  const targetProps = target ? { "data-logo-target": "" } : {}
  return (
    <span className={`flex items-center gap-2.5 ${className}`}>
      {chrome ? (
        <span
          className={`chrome-mask block aspect-[273/480] ${size}`}
          style={{ "--mask": "url(/brand/hyperion-mark.png)" }}
          {...targetProps}
        />
      ) : (
        <Image src="/brand/hyperion-mark.png" alt="" width={273} height={480} priority={target} className={`${size} w-auto`} {...targetProps} />
      )}
      <span className="leading-none">
        <span className={`block font-display text-[1.05rem] font-extrabold tracking-tight ${chrome ? "text-paper" : "text-ink"}`}>HYPERION</span>
        <span className={`mt-1 block font-mono text-[8px] tracking-[0.42em] uppercase ${chrome ? "text-steel" : "text-brand"}`}>Software</span>
      </span>
    </span>
  )
}

const links = [
  ["#servicios", "Servicios"],
  ["#productos", "Productos"],
  ["#automatizaciones", "Automatizar"],
  ["#nosotros", "Nosotros"],
  ["#contacto", "Contacto"],
]

export default function Navbar() {
  const [open, setOpen] = useState(false)
  const header = useRef(null)
  const bar = useRef(null)

  useScrollFrame((y) => {
    header.current?.toggleAttribute("data-scrolled", y > 40)
    const max = document.documentElement.scrollHeight - window.innerHeight
    if (bar.current) bar.current.style.transform = `scaleX(${max > 0 ? y / max : 0})`
  })

  return (
    <>
      <header
        ref={header}
        className="group fixed inset-x-0 top-0 z-50 border-b border-transparent transition-[background-color,border-color] duration-300 data-[scrolled]:border-white/10 data-[scrolled]:bg-night/80 data-[scrolled]:backdrop-blur-xl"
      >
        <div className="container flex h-16 items-center justify-between md:h-[72px]">
          <Link href="#inicio" aria-label="Hyperion Software, inicio">
            <Logo target chrome />
          </Link>

          <nav className="hidden items-center gap-8 lg:flex">
            {links.map(([href, label]) => (
              <Link key={href} href={href} className="spec text-paper/60 transition-colors hover:text-paper">
                {label}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-3">
            <Link href="#contacto" className="btn-chrome hidden !px-5 !py-2.5 !text-[11px] sm:inline-flex">
              Cotizar <ArrowUpRight className="h-3.5 w-3.5" />
            </Link>
            <button
              className="flex h-11 w-11 items-center justify-center rounded-full border border-white/15 text-paper lg:hidden"
              onClick={() => setOpen(true)}
              aria-label="Abrir menú"
            >
              <Menu className="h-5 w-5" />
            </button>
          </div>
        </div>
        {/* Avance de lectura */}
        <div ref={bar} className="absolute inset-x-0 bottom-[-1px] h-px origin-left bg-coral" style={{ transform: "scaleX(0)" }} />
      </header>

      {/* Menú móvil (fuera del header: backdrop-filter rompería el position: fixed) */}
      <div
        className={`fixed inset-0 z-[60] bg-night transition-[opacity,visibility] duration-300 lg:hidden ${open ? "visible opacity-100" : "invisible opacity-0"}`}
      >
        <div className="flex h-16 items-center justify-between px-4">
          <Logo chrome />
          <button
            className="flex h-11 w-11 items-center justify-center rounded-full border border-white/15 text-paper"
            onClick={() => setOpen(false)}
            aria-label="Cerrar menú"
          >
            <X className="h-5 w-5" />
          </button>
        </div>
        <nav className="mt-8 flex flex-col px-4">
          {links.map(([href, label], i) => (
            <Link
              key={href}
              href={href}
              onClick={() => setOpen(false)}
              className={`flex items-baseline gap-4 border-b border-white/10 py-5 font-display text-3xl font-extrabold text-paper uppercase transition-[opacity,transform] duration-300 ${open ? "translate-y-0 opacity-100" : "translate-y-3 opacity-0"}`}
              style={{ transitionDelay: open ? `${60 + i * 40}ms` : "0ms" }}
            >
              <span className="spec text-coral">0{i + 1}</span>
              {label}
            </Link>
          ))}
          <Link href="#contacto" onClick={() => setOpen(false)} className="btn-chrome mt-8">
            Cotizar proyecto
          </Link>
        </nav>
      </div>
    </>
  )
}
