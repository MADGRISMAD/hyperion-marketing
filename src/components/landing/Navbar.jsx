"use client"
import { useRef, useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { ArrowUpRight, Menu, X } from "lucide-react"
import { useScrollFrame } from "./parallax"

// Símbolo del logo (árbol + H + flecha) con el nombre al lado.
// `target` marca la instancia de la barra: ahí aterriza el logo de la animación de entrada.
export function Logo({ className = "", target = false, compact = false }) {
  return (
    <span className={`flex items-center gap-2.5 ${className}`}>
      <Image
        src="/brand/hyperion-mark.png"
        alt=""
        width={273}
        height={480}
        priority={target}
        className={compact ? "h-8 w-auto" : "h-10 w-auto"}
        {...(target ? { "data-logo-target": "" } : {})}
      />
      <span className="leading-none">
        <span className="block font-chrome text-[1.15rem] tracking-tight text-ink">HYPERION</span>
        <span className="mt-1 block font-tech text-[8px] tracking-[0.42em] text-forest uppercase">Software</span>
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
    header.current?.classList.toggle("is-scrolled", y > 40)
    const max = document.documentElement.scrollHeight - window.innerHeight
    if (bar.current) bar.current.style.transform = `scaleX(${max > 0 ? y / max : 0})`
  })

  return (
    <>
      <header ref={header} className="group fixed inset-x-0 top-0 z-50 px-3 pt-3 md:px-6 md:pt-4">
        <div className="relative mx-auto flex h-16 max-w-[1320px] items-center justify-between overflow-hidden rounded-full border border-white/90 bg-white/35 pr-2 pl-5 shadow-glass backdrop-blur-xl">
          <Link href="#inicio" aria-label="Hyperion Software, inicio">
            <Logo target />
          </Link>

          <nav className="hidden items-center gap-1 lg:flex">
            {links.map(([href, label]) => (
              <Link
                key={href}
                href={href}
                className="rounded-full px-3.5 py-2 font-tech text-[10px] tracking-[0.18em] text-ink/80 uppercase transition hover:bg-white/60 hover:text-ink"
              >
                {label}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-2">
            <Link
              href="#contacto"
              className="press hidden items-center gap-1.5 rounded-full border border-white/90 bg-holo px-5 py-2.5 font-tech text-[10px] tracking-[0.18em] text-ink uppercase shadow-glass sm:inline-flex"
            >
              Cotizar <ArrowUpRight className="h-4 w-4" />
            </Link>
            <button
              className="flex h-11 w-11 items-center justify-center rounded-full border border-white/90 bg-white/50 text-ink lg:hidden"
              onClick={() => setOpen(true)}
              aria-label="Abrir menú"
            >
              <Menu className="h-5 w-5" />
            </button>
          </div>
          {/* Avance de lectura */}
          <div className="absolute inset-x-0 bottom-0 h-[3px] origin-left bg-holo" ref={bar} style={{ transform: "scaleX(0)" }} />
        </div>
      </header>

      {/* Menú móvil (fuera del header: backdrop-filter rompería el position: fixed) */}
      <div
        className={`y2k-dots fixed inset-0 z-[60] bg-paper transition-all duration-500 lg:hidden ${open ? "visible opacity-100" : "invisible opacity-0"}`}
      >
        <div className="flex h-16 items-center justify-between px-5 pt-3">
          <Logo />
          <button
            className="flex h-11 w-11 items-center justify-center rounded-full border border-white/90 bg-white/50"
            onClick={() => setOpen(false)}
            aria-label="Cerrar menú"
          >
            <X className="h-5 w-5" />
          </button>
        </div>
        <nav className="mt-10 flex flex-col px-5">
          {links.map(([href, label], i) => (
            <Link
              key={href}
              href={href}
              onClick={() => setOpen(false)}
              className={`flex items-baseline gap-4 border-b border-white/70 py-4 font-chrome text-4xl uppercase transition-all duration-500 ${open ? "translate-x-0 opacity-100" : "translate-x-8 opacity-0"}`}
              style={{ transitionDelay: open ? `${80 + i * 60}ms` : "0ms" }}
            >
              <span className="font-tech text-xs text-forest">0{i + 1}</span>
              <span className="chrome-3d">{label}</span>
            </Link>
          ))}
          <Link
            href="#contacto"
            onClick={() => setOpen(false)}
            className="mt-8 rounded-full border border-white/90 bg-holo py-4 text-center font-tech text-xs tracking-[0.2em] text-ink uppercase shadow-glass"
          >
            Cotizar proyecto
          </Link>
        </nav>
      </div>
    </>
  )
}
