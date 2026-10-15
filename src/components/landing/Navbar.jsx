"use client"
import { useRef, useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { Menu, X } from "lucide-react"
import { useScrollFrame } from "./parallax"

// Símbolo del logo (árbol + H + flecha) con el nombre al lado.
export function Logo({ className = "", compact = false, light = false }) {
  return (
    <span className={`flex items-center gap-2.5 ${className}`}>
      <Image src="/brand/hyperion-mark.png" alt="" width={273} height={480} priority sizes="40px" className={`${compact ? "h-7" : "h-9"} w-auto`} />
      <span className="leading-none">
        <span className={`block text-[1.2rem] font-extrabold tracking-[-0.03em] ${light ? "text-white" : "text-ink"}`}>Hyperion</span>
        <span className={`mt-1 block font-mono text-[9px] tracking-[0.3em] uppercase ${light ? "text-white/60" : "text-mist"}`}>Software</span>
      </span>
    </span>
  )
}

const links = [
  ["#productos", "Productos"],
  ["#servicios", "Servicios"],
  ["#automatizar", "Automatizar"],
  ["#proceso", "Proceso"],
  ["#estudio", "Estudio"],
]

export default function Navbar() {
  const [open, setOpen] = useState(false)
  const header = useRef(null)

  useScrollFrame((y) => header.current?.toggleAttribute("data-scrolled", y > 24))

  return (
    <>
      <header
        ref={header}
        className="fixed inset-x-0 top-0 z-50 border-b border-transparent transition-[background-color,border-color] duration-300 data-[scrolled]:border-line/80 data-[scrolled]:bg-canvas/75 data-[scrolled]:backdrop-blur-xl data-[scrolled]:backdrop-saturate-150"
      >
        <div className="container flex h-16 items-center justify-between">
          <Link href="#inicio" aria-label="Hyperion Software, inicio">
            <Logo compact />
          </Link>
          <nav className="hidden items-center gap-8 text-[14px] font-medium text-graphite lg:flex">
            {links.map(([href, label]) => (
              <Link key={href} href={href} className="transition-colors hover:text-ink">
                {label}
              </Link>
            ))}
          </nav>
          <div className="flex items-center gap-2">
            <Link href="#contacto" className="btn btn-ink hidden !h-9 !px-4 !text-[14px] sm:inline-flex">
              Cotizar proyecto
            </Link>
            <button
              className="flex h-10 w-10 items-center justify-center rounded-full text-ink lg:hidden"
              onClick={() => setOpen(true)}
              aria-label="Abrir menú"
            >
              <Menu className="h-5 w-5" />
            </button>
          </div>
        </div>
      </header>

      {/* Menú móvil */}
      <div
        className={`fixed inset-0 z-[60] bg-canvas transition-[opacity,visibility] duration-300 lg:hidden ${open ? "visible opacity-100" : "invisible opacity-0"}`}
      >
        <div className="container flex h-16 items-center justify-between">
          <Logo compact />
          <button className="flex h-10 w-10 items-center justify-center rounded-full text-ink" onClick={() => setOpen(false)} aria-label="Cerrar menú">
            <X className="h-5 w-5" />
          </button>
        </div>
        <nav className="container mt-6 flex flex-col">
          {links.map(([href, label], i) => (
            <Link
              key={href}
              href={href}
              onClick={() => setOpen(false)}
              className={`border-b border-line py-4 text-4xl font-extrabold tracking-[-0.04em] text-ink transition-[opacity,transform] duration-300 ${open ? "translate-y-0 opacity-100" : "translate-y-2 opacity-0"}`}
              style={{ transitionDelay: open ? `${50 + i * 35}ms` : "0ms" }}
            >
              {label}
            </Link>
          ))}
          <Link href="#contacto" onClick={() => setOpen(false)} className="btn btn-ink mt-8">
            Cotizar proyecto
          </Link>
        </nav>
      </div>
    </>
  )
}
