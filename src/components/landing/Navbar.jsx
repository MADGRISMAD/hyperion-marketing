"use client"
import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { Menu, X } from "lucide-react"

// Símbolo del logo (árbol + H + flecha) con el nombre al lado.
export function Logo({ className = "", compact = false, light = false }) {
  return (
    <span className={`flex items-center gap-2.5 ${className}`}>
      <Image src="/brand/hyperion-mark.png" alt="" width={273} height={480} priority sizes="40px" className={`${compact ? "h-7" : "h-9"} w-auto`} />
      <span className="leading-none">
        <span className={`block text-[1.2rem] font-extrabold tracking-[-0.03em] ${light ? "text-white" : "text-ink group-data-[hero]/nav:text-white"}`}>Hyperion</span>
        <span className={`mt-1 block font-mono text-[9px] tracking-[0.3em] uppercase ${light ? "text-white/60" : "text-mist group-data-[hero]/nav:text-white/70"}`}>Software</span>
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


  return (
    <>
      <header className="fixed top-3 left-3 z-50 max-w-[calc(100vw-1.5rem)] rounded-2xl border border-white/10 bg-[#0c0f0d]/55 shadow-[0_12px_30px_-14px_rgba(0,0,0,0.7)] backdrop-blur-xl backdrop-saturate-150">
        <div className="flex items-center gap-1 p-1.5 pl-3">
          <Link href="#inicio" aria-label="Hyperion Software, inicio" className="mr-1.5">
            <Logo compact light />
          </Link>
          <nav className="hidden items-center text-[13px] font-medium text-white/75 lg:flex">
            {links.map(([href, label]) => (
              <Link key={href} href={href} className="rounded-lg px-2.5 py-1.5 transition-colors hover:bg-white/10 hover:text-white">
                {label}
              </Link>
            ))}
          </nav>
          <Link href="#contacto" className="btn btn-light ml-1 hidden !h-8 !px-3.5 !text-[13px] sm:inline-flex">
            Cotizar
          </Link>
          <button className="flex h-8 w-8 items-center justify-center rounded-lg text-white lg:hidden" onClick={() => setOpen(true)} aria-label="Abrir menú">
            <Menu className="h-5 w-5" />
          </button>
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
