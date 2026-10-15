"use client"
import dynamic from "next/dynamic"
import Link from "next/link"
import { ArrowRight } from "lucide-react"

const HeroScene = dynamic(() => import("./HeroScene"), { ssr: false })

const specs = [
  ["01", "Sistemas a la medida"],
  ["02", "Puntos de venta"],
  ["03", "Automatización"],
  ["04", "Servicio técnico"],
]

// Lámina de apertura: atardecer aerografiado, titular de cromo y la secuoya de metal líquido.
export default function Hero() {
  return (
    <section id="inicio" className="bg-sunset grain relative overflow-hidden [--h:82%] lg:[--h:60%]">
      <div className="container relative flex min-h-[100svh] flex-col pt-24 pb-6 md:pt-28">
        {/* Rótulo vertical en japonés, como en los libros de ilustración: "software que construye el futuro" */}
        <span
          className="absolute top-28 right-4 hidden font-sans text-[13px] tracking-[0.5em] text-paper/45 [writing-mode:vertical-rl] md:block lg:right-8"
          lang="ja"
        >
          未来をつくるソフトウェア
        </span>

        <div className="spec flex items-center gap-4 text-paper/55">
          <span>N.º 10</span>
          <span className="h-px w-10 bg-paper/30" />
          <span>Tijuana, B.C. — desde 2016</span>
        </div>

        <div className="relative flex flex-1 flex-col justify-center">
          <div className="relative z-10 pt-8 lg:max-w-[62%] lg:pt-0">
            <h1 className="font-display leading-[0.86] font-extrabold tracking-[-0.03em] uppercase">
              <span className="relative block text-[12.2vw] sm:text-[11.6vw] lg:text-[6.6rem] xl:text-[7.6rem]">
                <span className="chrome">Software</span>
                <span className="glint" style={{ left: "4%", top: "18%", "--s": "46px" }} aria-hidden="true" />
              </span>
              <span className="mt-3 block font-sans text-[1.35rem] font-medium tracking-normal text-paper normal-case sm:text-3xl lg:mt-4 lg:text-[2.1rem]">
                que hace crecer
              </span>
              <span className="relative mt-2 block text-[12.2vw] sm:text-[11.6vw] lg:text-[6.6rem] xl:text-[7.6rem]">
                <span className="chrome">tu negocio</span>
                <span className="glint" style={{ left: "93%", top: "70%", "--s": "30px", "--d": "2.2s" }} aria-hidden="true" />
              </span>
            </h1>

            <p className="mt-8 max-w-[34rem] text-[17px] leading-relaxed text-paper/75 md:text-lg">
              Desarrollamos sistemas a la medida, puntos de venta y automatizaciones, y damos servicio técnico. Diez años ayudando a
              negocios a vender más y trabajar menos.
            </p>
            <div className="mt-8 flex flex-wrap items-center gap-x-8 gap-y-3">
              <Link href="#contacto" className="btn-chrome group">
                Cotiza tu proyecto <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
              </Link>
              <Link href="#productos" className="btn-line text-paper/80 hover:text-paper">
                Ver productos
              </Link>
            </div>
          </div>

          {/* La secuoya se para sobre el horizonte: en escritorio ocupa la mitad derecha, detrás del titular */}
          <div className="relative -mx-4 h-[420px] sm:mx-0 sm:h-[540px] lg:absolute lg:top-[-2%] lg:right-[-3rem] lg:h-[66%] lg:w-[46%]">
            <HeroScene />
          </div>
        </div>

        {/* Ficha técnica, como el pie de un anuncio de equipo de audio */}
        <dl className="relative z-10 mt-6 grid grid-cols-2 border-t border-paper/15 md:grid-cols-4">
          {specs.map(([n, label]) => (
            <div key={n} className="flex items-baseline gap-3 border-paper/15 py-4 even:border-l even:pl-4 md:border-l md:pl-5 md:first:border-l-0 md:first:pl-0">
              <dt className="spec text-coral">{n}</dt>
              <dd className="text-sm text-paper/80">{label}</dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  )
}
