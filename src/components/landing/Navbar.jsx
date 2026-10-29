"use client"
import { useState } from "react"
import Link from "next/link"
import { Menu, X } from "lucide-react"

// Logo del press kit: tres anillos con su brote rosa y el nombre. «reverse» es para fondos oscuros.
// Los SVG traen su área de protección dentro del archivo, por eso el alto es mayor al que se ve.
export function Logo({ variant = "color", className = "h-10" }) {
  return <img src={`/brand/hyperion-horizontal-${variant}.svg`} alt="Hyperion Software" width={504} height={180} className={`w-auto ${className}`} />
}

const links = [
  ["#productos", "Productos"],
  ["#servicios", "Servicios"],
  ["#automatizar", "Automatizar"],
  ["#proceso", "Proceso"],
  ["#estudio", "Estudio"],
  ["/blog", "Blog"],
]

export default function Navbar() {
  const [open, setOpen] = useState(false)

  return (
    <>
      {/* Barra pequeña, fija arriba a la izquierda */}
      <header className="fixed top-3 left-3 z-50 max-w-[calc(100vw-1.5rem)] rounded-full border border-[#141414]/15 bg-[#f5f4f0]/95 shadow-[0_8px_24px_-12px_rgba(20,20,20,0.35)] backdrop-blur">
        <div className="flex items-center gap-1 py-0.5 pr-1.5 pl-1">
          <Link href="#inicio" aria-label="Hyperion Software, inicio" className="-my-1 mr-1 flex items-center">
            <Logo className="h-11" />
          </Link>
          <nav aria-label="Principal" className="hidden items-center text-[14px] font-medium text-[#141414] lg:flex">
            {links.map(([href, label]) => (
              <Link key={href} href={href} className="rounded-full px-3 py-1.5 transition-colors hover:bg-[#141414] hover:text-[#f5f4f0]">
                {label}
              </Link>
            ))}
          </nav>
          <Link href="#contacto" className="bt bt-pink bt-sm ml-1 hidden sm:inline-flex">
            Cotizar
          </Link>
          <button className="flex h-9 w-9 items-center justify-center rounded-lg text-[#141414] lg:hidden" onClick={() => setOpen(true)} aria-label="Abrir menú" aria-expanded={open} aria-controls="menu-movil">
            <Menu className="h-5 w-5" />
          </button>
        </div>
      </header>

      {/* Menú móvil: pantalla completa sobre tinta */}
      <div
        id="menu-movil"
        role="dialog"
        aria-modal="true"
        aria-label="Menú"
        aria-hidden={!open}
        className={`fixed inset-0 z-[60] bg-[#141414] text-[#f5f4f0] transition-[opacity,visibility] duration-300 lg:hidden ${open ? "visible opacity-100" : "invisible opacity-0"}`}
      >
        <div className="flex h-16 items-center justify-between px-5">
          <Logo variant="reverse" className="h-11" />
          <button className="flex h-10 w-10 items-center justify-center rounded-full text-[#f5f4f0]" onClick={() => setOpen(false)} aria-label="Cerrar menú">
            <X className="h-6 w-6" />
          </button>
        </div>
        <nav aria-label="Menú móvil" className="mt-6 flex flex-col px-5">
          {links.map(([href, label], i) => (
            <Link
              key={href}
              href={href}
              onClick={() => setOpen(false)}
              className={`flex items-baseline gap-3 border-b border-[#f5f4f0]/15 py-4 text-4xl font-bold tracking-[-0.04em] transition-[opacity,transform] duration-300 ${open ? "translate-y-0 opacity-100" : "translate-y-2 opacity-0"}`}
              style={{ transitionDelay: open ? `${50 + i * 35}ms` : "0ms" }}
            >
              <span className="font-mono text-sm font-normal tracking-normal text-[#ff3d7f]">0{i + 1} /</span>
              {label}
            </Link>
          ))}
          <Link href="#contacto" onClick={() => setOpen(false)} className="bt bt-pink bt-inv mt-8 self-start">
            Cotiza tu proyecto
          </Link>
        </nav>
      </div>
    </>
  )
}
