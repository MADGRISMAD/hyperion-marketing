"use client"
import { useRef, useState } from "react"
import Link from "next/link"
import { Menu, X } from "lucide-react"
import { useScrollFrame } from "./parallax"

export function Logo({ className = "" }) {
  return (
    <span className={`flex items-center gap-2.5 ${className}`}>
      <svg viewBox="0 0 32 40" className="h-9 w-7" aria-hidden="true">
        <defs>
          <linearGradient id="logo-g" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor="#ffe2b8" />
            <stop offset="0.5" stopColor="#f2a65a" />
            <stop offset="1" stopColor="#b8552b" />
          </linearGradient>
        </defs>
        <path d="M16 1 L19 9 L17.5 9 L22 17 L19.5 17 L25 26 L21 26 L27 33 L17.5 33 L17.5 39 L14.5 39 L14.5 33 L5 33 L11 26 L7 26 L12.5 17 L10 17 L14.5 9 L13 9 Z" fill="url(#logo-g)" />
      </svg>
      <span className="leading-none">
        <span className="block font-display text-xl font-semibold tracking-tight text-cream">Hyperion</span>
        <span className="block text-[10px] tracking-[0.35em] text-amber/80 uppercase">Marketing</span>
      </span>
    </span>
  )
}

const links = [
  ["#nombre", "Nosotros"],
  ["#productos", "Productos"],
  ["#servicios", "Servicios"],
  ["#proceso", "Proceso"],
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
    <header
      ref={header}
      className="group fixed inset-x-0 top-0 z-50 transition-all duration-500 [&.is-scrolled]:border-b [&.is-scrolled]:border-white/5 [&.is-scrolled]:bg-forest-950/75 [&.is-scrolled]:backdrop-blur-xl"
    >
      <div className="container flex h-20 items-center justify-between">
        <Link href="#inicio" aria-label="Hyperion Marketing, inicio">
          <Logo />
        </Link>

        <nav className="hidden items-center gap-8 md:flex">
          {links.map(([href, label]) => (
            <Link key={href} href={href} className="relative text-sm font-medium text-cream/70 transition hover:text-cream after:absolute after:-bottom-1 after:left-0 after:h-px after:w-0 after:bg-amber after:transition-all hover:after:w-full">
              {label}
            </Link>
          ))}
        </nav>

        <Link
          href="#contacto"
          className="hidden rounded-full bg-cream px-5 py-2.5 text-sm font-semibold text-forest-950 transition hover:bg-amber md:inline-flex"
        >
          Cotizar ahora
        </Link>

        <button className="p-2 text-cream md:hidden" onClick={() => setOpen(true)} aria-label="Abrir menú">
          <Menu className="h-6 w-6" />
        </button>
      </div>
      <div className="absolute inset-x-0 bottom-0 h-px origin-left bg-gradient-to-r from-moss via-amber to-bark" ref={bar} style={{ transform: "scaleX(0)" }} />
    </header>

      {/* Menú móvil (fuera del header: backdrop-filter rompería el position: fixed) */}
      <div className={`fixed inset-0 z-[60] bg-forest-950/97 backdrop-blur-xl transition-all duration-500 md:hidden ${open ? "visible opacity-100" : "invisible opacity-0"}`}>
        <div className="container flex h-20 items-center justify-between">
          <Logo />
          <button className="p-2 text-cream" onClick={() => setOpen(false)} aria-label="Cerrar menú">
            <X className="h-6 w-6" />
          </button>
        </div>
        <nav className="container mt-10 flex flex-col gap-6">
          {links.map(([href, label], i) => (
            <Link
              key={href}
              href={href}
              onClick={() => setOpen(false)}
              className={`font-display text-4xl text-cream transition-all duration-500 hover:text-amber ${open ? "translate-x-0 opacity-100" : "translate-x-8 opacity-0"}`}
              style={{ transitionDelay: open ? `${100 + i * 60}ms` : "0ms" }}
            >
              {label}
            </Link>
          ))}
          <Link href="#contacto" onClick={() => setOpen(false)} className="mt-6 rounded-full bg-gradient-to-r from-amber to-bark py-4 text-center font-semibold text-forest-950">
            Cotizar ahora
          </Link>
        </nav>
      </div>
    </>
  )
}

// Indicador lateral: bajamos desde la copa (116 m) hasta las raíces.
export function AltitudeMeter() {
  const label = useRef(null)
  const dot = useRef(null)
  useScrollFrame((y) => {
    const max = document.documentElement.scrollHeight - window.innerHeight
    const p = max > 0 ? Math.min(1, y / max) : 0
    if (label.current) label.current.textContent = `${Math.round(116 * (1 - p))} m`
    if (dot.current) dot.current.style.top = `${p * 100}%`
  })
  return (
    <div className="pointer-events-none fixed top-1/2 right-6 z-40 hidden h-[46vh] -translate-y-1/2 flex-col items-center gap-3 xl:flex" aria-hidden="true">
      <span className="text-[10px] tracking-[0.3em] text-cream/40 uppercase [writing-mode:vertical-rl]">Copa</span>
      <div className="relative w-px flex-1 bg-gradient-to-b from-moss/60 via-cream/15 to-bark/60">
        <div ref={dot} className="absolute left-1/2 -translate-x-1/2 -translate-y-1/2">
          <div className="h-2.5 w-2.5 rounded-full bg-amber shadow-[0_0_12px_rgba(242,166,90,0.9)]" />
          <span ref={label} className="absolute top-1/2 right-5 -translate-y-1/2 font-display text-sm whitespace-nowrap text-amber">116 m</span>
        </div>
      </div>
      <span className="text-[10px] tracking-[0.3em] text-cream/40 uppercase [writing-mode:vertical-rl]">Raíces</span>
    </div>
  )
}
