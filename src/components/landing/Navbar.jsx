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
        <span className="block font-display text-[1.05rem] font-bold tracking-tight text-ink">HYPERION</span>
        <span className="mt-1 block font-mono text-[9px] tracking-[0.42em] text-forest uppercase">Software</span>
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
        <div className="relative mx-auto flex h-16 max-w-[1320px] items-center justify-between overflow-hidden rounded-2xl border-[1.5px] border-ink bg-paper/85 pr-2 pl-4 backdrop-blur-md transition-shadow duration-300 group-[.is-scrolled]:shadow-hard">
          <Link href="#inicio" aria-label="Hyperion Software, inicio">
            <Logo target />
          </Link>

          <nav className="hidden items-center gap-1 lg:flex">
            {links.map(([href, label]) => (
              <Link
                key={href}
                href={href}
                className="rounded-lg px-3 py-2 font-mono text-xs tracking-wider text-ink/75 uppercase transition hover:bg-ink hover:text-lime"
              >
                {label}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-2">
            <Link
              href="#contacto"
              className="press hidden items-center gap-1.5 rounded-xl border-[1.5px] border-ink bg-lime px-4 py-2.5 font-mono text-xs font-bold tracking-wider text-ink uppercase shadow-hard sm:inline-flex"
            >
              Cotizar <ArrowUpRight className="h-4 w-4" />
            </Link>
            <button
              className="flex h-11 w-11 items-center justify-center rounded-xl border-[1.5px] border-ink bg-white text-ink lg:hidden"
              onClick={() => setOpen(true)}
              aria-label="Abrir menú"
            >
              <Menu className="h-5 w-5" />
            </button>
          </div>
          {/* Avance de lectura */}
          <div className="absolute inset-x-0 bottom-0 h-[3px] origin-left bg-forest" ref={bar} style={{ transform: "scaleX(0)" }} />
        </div>
      </header>

      {/* Menú móvil (fuera del header: backdrop-filter rompería el position: fixed) */}
      <div
        className={`y2k-dots fixed inset-0 z-[60] bg-paper transition-all duration-500 lg:hidden ${open ? "visible opacity-100" : "invisible opacity-0"}`}
      >
        <div className="flex h-16 items-center justify-between px-5 pt-3">
          <Logo />
          <button
            className="flex h-11 w-11 items-center justify-center rounded-xl border-[1.5px] border-ink bg-white"
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
              className={`flex items-baseline gap-4 border-b-[1.5px] border-ink py-4 font-display text-3xl font-bold text-ink uppercase transition-all duration-500 ${open ? "translate-x-0 opacity-100" : "translate-x-8 opacity-0"}`}
              style={{ transitionDelay: open ? `${80 + i * 60}ms` : "0ms" }}
            >
              <span className="font-mono text-xs text-forest">0{i + 1}</span>
              {label}
            </Link>
          ))}
          <Link
            href="#contacto"
            onClick={() => setOpen(false)}
            className="mt-8 rounded-xl border-[1.5px] border-ink bg-lime py-4 text-center font-mono font-bold tracking-wider text-ink uppercase shadow-hard"
          >
            Cotizar proyecto
          </Link>
        </nav>
      </div>
    </>
  )
}
