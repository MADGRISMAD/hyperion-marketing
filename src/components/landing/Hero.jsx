"use client"
import dynamic from "next/dynamic"
import Link from "next/link"
import { ArrowRight, ArrowDownRight } from "lucide-react"
import Sparkle from "./Sparkle"
import {
  Barcode,
  ChromeBlob,
  ChromeRing,
  ChromeSquiggle,
  DotsIcon,
  Glass,
  LoadingWindow,
  SmileySticker,
  StarSticker,
  WireGlobe,
  WireTorus,
} from "./Y2K"

const HeroScene = dynamic(() => import("./HeroScene"), { ssr: false })

const tech = "font-tech text-[10px] tracking-[0.18em] text-ink uppercase md:text-[11px]"

export default function Hero() {
  return (
    <section id="inicio" className="y2k-dots relative overflow-hidden pt-24 pb-10 md:pt-28">
      {/* Horizonte de cuadrícula */}
      <div className="pointer-events-none absolute inset-x-[-30%] bottom-0 h-[38%]" aria-hidden="true">
        <div className="grid-floor absolute inset-0" />
      </div>

      <div className="container relative">
        {/* Cabecera tipo revista */}
        <div className="flex items-center gap-3 md:gap-5">
          <span className={`${tech} rounded-full border border-white/90 bg-glass px-3 py-1 shadow-glass`}>Vol. 10</span>
          <span className={`${tech} hidden sm:inline`}>Haz crecer tu futuro</span>
          <span className="hidden h-px flex-1 bg-white/80 md:block" />
          <WireGlobe className="ml-auto h-7 w-7 text-white drop-shadow-[0_1px_2px_rgba(58,44,153,0.5)] md:ml-0" />
          <Sparkle className="twinkle h-7 w-7" />
          <DotsIcon className="hidden sm:grid" />
        </div>
        <div className="mt-4 inline-flex items-center gap-3 rounded-full border border-white/90 bg-glass px-4 py-1.5 shadow-glass">
          <span className="text-sm text-ink/80">未来をつくるソフトウェア</span>
          <Sparkle className="h-3.5 w-3.5" />
        </div>

        {/* Título cromado con anillo */}
        <div className="relative mt-4 md:mt-2">
          <ChromeRing className="pointer-events-none absolute top-[8%] left-[-4%] h-[92%] w-[108%]" />
          <h1 className="relative text-center font-chrome leading-[0.86] uppercase">
            <span className="chrome-3d block text-[17vw] tracking-[-0.02em] lg:text-[11.5rem]">Software</span>
            <span className="relative z-10 mx-auto my-2 inline-flex items-center gap-2 rounded-full border border-white/90 bg-holo px-5 py-1.5 font-tech text-[11px] tracking-[0.3em] text-ink shadow-glass md:my-3 md:text-sm">
              <Sparkle className="h-3.5 w-3.5" /> que hace crecer <Sparkle className="h-3.5 w-3.5" />
            </span>
            <span className="chrome-3d block text-[15vw] tracking-[-0.02em] lg:text-[10rem]">tu negocio</span>
          </h1>
          <Sparkle className="twinkle pointer-events-none absolute top-0 right-[6%] h-10 w-10 md:h-14 md:w-14" />
        </div>

        {/* Escena central con paneles laterales */}
        <div className="relative mt-2 grid items-center gap-6 lg:-mt-10 lg:grid-cols-[1fr_1.35fr_1fr]">
          {/* Izquierda */}
          <div className="order-2 grid grid-cols-2 gap-4 lg:order-1 lg:grid-cols-1 lg:gap-6">
            <div className={`${tech} space-y-1 self-center text-[11px] leading-relaxed md:text-sm`}>
              <div>Sistemas</div>
              <div>Puntos de venta</div>
              <div>Automatización</div>
              <div>Soporte</div>
              <Sparkle className="mt-2 h-4 w-4" />
            </div>
            <Glass className="relative overflow-hidden p-5 lg:max-w-[240px]">
              <div className="font-tech text-2xl leading-none text-ink md:text-3xl">2026</div>
              <div className="mt-1 font-tech text-lg tracking-widest text-ink">Visión</div>
              <p className="mt-3 font-tech text-[9px] leading-relaxed tracking-[0.2em] text-ink/70 uppercase">
                Diseñando
                <br />
                el mañana,
                <br />
                hoy.
              </p>
              <WireTorus className="mt-3 h-16 w-full text-pine/50" />
            </Glass>
          </div>

          {/* Centro: árbol 3D */}
          <div className="relative order-1 -mx-4 h-[440px] sm:mx-0 sm:h-[560px] lg:order-2 lg:h-[680px]">
            <HeroScene />
            <ChromeBlob className="float pointer-events-none absolute bottom-[14%] -left-2 h-16 w-16 md:h-20 md:w-20" />
            <ChromeBlob shape="pebble" className="float pointer-events-none absolute right-0 bottom-[30%] h-14 w-14" style={{ animationDelay: "1.4s" }} />
            <Sparkle className="twinkle pointer-events-none absolute top-[16%] left-[8%] h-9 w-9" style={{ animationDelay: "0.8s" }} />
          </div>

          {/* Derecha */}
          <div className="order-3 grid grid-cols-2 items-center gap-4 lg:grid-cols-1 lg:justify-items-end lg:gap-6">
            <SmileySticker className="h-32 w-32 justify-self-center md:h-40 md:w-40 lg:justify-self-end" />
            <div className={`${tech} space-y-1 text-[11px] leading-relaxed font-bold md:text-sm lg:text-right`}>
              <div>Innovar</div>
              <div>Elevar</div>
              <div>Crecer</div>
            </div>
            <Glass className="col-span-2 p-5 lg:col-span-1 lg:w-[240px]">
              <WireGlobe className="h-10 w-10 text-pine/60" />
              <ul className="mt-3 space-y-1 font-tech text-[11px] tracking-[0.18em] text-ink uppercase">
                <li>Web</li>
                <li>POS</li>
                <li>ERP · CRM</li>
                <li>Bots</li>
                <li>IA</li>
                <li>&amp; más</li>
              </ul>
              <Sparkle className="mt-3 h-4 w-4" />
            </Glass>
          </div>
        </div>

        {/* Franja inferior: código de barras, estrella y ventana con la llamada a la acción */}
        <div className="relative mt-6 grid items-end gap-6 lg:-mt-24 lg:grid-cols-[auto_auto_1fr]">
          <Glass className="hidden h-44 w-24 flex-col items-center justify-between py-4 lg:flex">
            <span className="font-tech text-[9px] tracking-[0.3em] text-ink [writing-mode:vertical-rl] rotate-180">Hyperion</span>
            <Barcode className="h-16 rotate-90" />
            <WireGlobe className="h-5 w-5 text-ink" />
          </Glass>
          <StarSticker className="float mx-auto h-40 w-40 md:h-48 md:w-48" />
          <div className="relative lg:ml-auto lg:max-w-xl">
          <LoadingWindow bodyClassName="p-5 md:p-6">
            <p className="text-base text-ink/80 md:text-lg">
              Desarrollamos <strong className="text-ink">sistemas a la medida</strong>, <strong className="text-ink">puntos de venta</strong> y{" "}
              <strong className="text-ink">automatizaciones</strong>, y damos <strong className="text-ink">servicio técnico</strong>. Diez años
              ayudando a negocios a vender más y trabajar menos.
            </p>
            <div className="mt-5 flex flex-col gap-3 sm:flex-row">
              <Link
                href="#contacto"
                className="press group inline-flex items-center justify-center gap-2 rounded-full border border-white/90 bg-holo px-6 py-3.5 font-tech text-[11px] tracking-[0.18em] text-ink uppercase shadow-glass"
              >
                Cotiza tu proyecto <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" />
              </Link>
              <Link
                href="#productos"
                className="press inline-flex items-center justify-center gap-2 rounded-full border border-white/90 bg-white/40 px-6 py-3.5 font-tech text-[11px] tracking-[0.18em] text-ink uppercase shadow-glass"
              >
                Ver productos <ArrowDownRight className="h-4 w-4" />
              </Link>
            </div>
          </LoadingWindow>
            <ChromeSquiggle className="pointer-events-none absolute -right-8 -bottom-12 hidden h-24 w-48 md:block" />
          </div>
        </div>
      </div>
    </section>
  )
}
