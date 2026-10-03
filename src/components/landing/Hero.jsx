"use client"
import { useRef } from "react"
import Link from "next/link"
import { ArrowRight, ChevronDown } from "lucide-react"
import { Parallax, useScrollFrame } from "./parallax"
import { ForestLayer, HyperionTree, Stars, Fireflies } from "./Forest"

export default function Hero() {
  const content = useRef(null)

  useScrollFrame((y, vh, reduced) => {
    const el = content.current
    if (!el || y > vh * 1.5) return
    const p = Math.min(1, y / (vh * 0.7))
    el.style.opacity = String(1 - p)
    if (!reduced) el.style.transform = `translate3d(0,${(y * 0.45).toFixed(1)}px,0) scale(${(1 - p * 0.08).toFixed(3)})`
  })

  return (
    <section id="inicio" className="grain relative h-[115svh] min-h-[720px] w-full overflow-hidden">
      {/* Cielo al amanecer */}
      <div className="absolute inset-0 bg-[linear-gradient(180deg,#020604_0%,#071510_35%,#14271c_60%,#4a2c17_82%,#7a3f1c_100%)]" />

      <Parallax mode="page" speed={0.75} className="absolute inset-0">
        <Stars />
      </Parallax>

      {/* Sol detrás de Hyperion */}
      <Parallax mode="page" speed={0.6} className="absolute inset-0">
        <div className="absolute left-1/2 top-[58%] h-[70vmin] w-[70vmin] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle,rgba(255,196,120,0.55)_0%,rgba(242,166,90,0.25)_30%,rgba(184,85,43,0.08)_55%,transparent_70%)]" />
        <div className="absolute left-1/2 top-[58%] h-[16vmin] w-[16vmin] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#ffd9a3] blur-[2px]" />
      </Parallax>

      <Parallax mode="page" speed={0.52} className="absolute inset-x-0 -bottom-[10%] top-0">
        <ForestLayer seed={11} count={34} minH={230} maxH={380} widthRatio={0.18} color="#2a4a3e" className="opacity-60" ground={30} />
      </Parallax>

      <Parallax mode="page" speed={0.45} className="absolute inset-x-0 bottom-[8%] h-[40%]" innerClassName="mist mist-drift" />

      <Parallax mode="page" speed={0.36} className="absolute inset-x-0 -bottom-[10%] top-0">
        <ForestLayer seed={23} count={26} minH={320} maxH={520} widthRatio={0.17} color="#183128" skipCenter={160} ground={20} />
      </Parallax>

      <Parallax mode="page" speed={0.22} className="absolute inset-x-0 -bottom-[10%] top-0">
        <HyperionTree />
      </Parallax>

      <Parallax mode="page" speed={0.3} className="absolute inset-x-0 bottom-[2%] h-[30%]" innerClassName="mist mist-drift opacity-70" />

      {/* Contenido */}
      <div ref={content} className="relative z-20 flex h-[100svh] min-h-[640px] flex-col items-center justify-center px-4 pb-24 text-center will-change-transform">
        <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-amber/30 bg-forest-950/40 px-4 py-1.5 text-xs font-medium tracking-[0.2em] text-amber uppercase backdrop-blur-md">
          <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-amber" />
          10 años echando raíces
        </div>
        <h1 className="max-w-5xl font-display text-5xl leading-[0.95] font-semibold tracking-tight text-cream drop-shadow-[0_4px_30px_rgba(0,0,0,0.6)] sm:text-7xl md:text-8xl">
          Software que crece
          <span className="block italic text-gradient">hasta el cielo.</span>
        </h1>
        <p className="mt-7 max-w-2xl text-base text-cream/75 sm:text-lg md:text-xl">
          Como <strong className="text-cream">Hyperion</strong>, el árbol más alto del mundo, construimos tecnología con raíces
          profundas: sistemas a la medida, puntos de venta, automatizaciones y servicio técnico.
        </p>
        <div className="mt-10 flex flex-col gap-3 sm:flex-row">
          <Link
            href="#contacto"
            className="group inline-flex items-center justify-center gap-2 rounded-full bg-gradient-to-r from-amber to-bark px-8 py-4 font-semibold text-forest-950 shadow-[0_10px_40px_-10px_rgba(242,166,90,0.8)] transition hover:scale-[1.03]"
          >
            Cotiza tu proyecto
            <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" />
          </Link>
          <Link
            href="#productos"
            className="inline-flex items-center justify-center gap-2 rounded-full border border-cream/20 bg-forest-950/30 px-8 py-4 font-semibold text-cream backdrop-blur-md transition hover:border-moss hover:text-moss"
          >
            Ver nuestros productos
          </Link>
        </div>
      </div>

      {/* Primer plano: troncos gigantes a los lados */}
      <Parallax mode="page" speed={0.04} className="pointer-events-none absolute inset-x-0 -bottom-[6%] top-0 z-30">
        <ForestLayer seed={47} count={7} minH={700} maxH={1100} widthRatio={0.2} color="#040906" skipCenter={520} groundHeight={36} />
      </Parallax>
      <Fireflies />

      <a href="#nombre" className="absolute bottom-10 left-1/2 z-40 flex -translate-x-1/2 flex-col items-center gap-1 text-xs tracking-widest text-cream/60 uppercase" aria-label="Seguir bajando">
        Desciende
        <ChevronDown className="scroll-cue h-5 w-5" />
      </a>
      <div className="pointer-events-none absolute inset-x-0 bottom-0 z-30 h-40 bg-gradient-to-b from-transparent to-forest-950" />
    </section>
  )
}
