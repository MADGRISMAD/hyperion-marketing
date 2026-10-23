"use client"
import { useEffect, useRef } from "react"
import Link from "next/link"
import { ArrowRight, ArrowDownRight } from "lucide-react"

export default function Hero() {
  const track = useRef(null)
  const stage = useRef(null)
  const media = useRef(null)
  const video = useRef(null)
  const content = useRef(null)
  const progress = useRef(null)

  useEffect(() => {
    const root = track.current
    const player = video.current
    const copy = content.current
    const motion = window.matchMedia("(prefers-reduced-motion: reduce)")

    function mount() {
      root.dataset.motion = "false"
      root.dataset.painted = "false"
      root.style.setProperty("--hero-shade", "1")
      media.current.style.transform = ""
      copy.style.transform = ""
      copy.style.opacity = ""
      copy.inert = false
      progress.current.style.transform = "scaleX(0)"
      if (motion.matches) return () => {}

      const controller = new AbortController()
      let objectURL, raf, frameCallback
      let target = 0
      let current = 0
      let primed = false
      let disposed = false

      // Adaptado de Scroll World: blob seekable, interpolación y un solo seek pendiente.
      function frame() {
        raf = null
        if (disposed || root.dataset.motion !== "true") return
        const rect = root.getBoundingClientRect()
        const distance = root.offsetHeight - stage.current.offsetHeight
        target = Math.max(0, Math.min(1, -rect.top / Math.max(1, distance)))
        const fade = Math.max(0, 1 - target / 0.28)
        root.style.setProperty("--hero-shade", String(0.3 + fade * 0.7))
        copy.style.opacity = String(fade)
        copy.style.transform = `translate3d(0, ${-Math.min(target, 0.3) * 180}px, 0)`
        copy.inert = fade < 0.05
        media.current.style.transform = `translate3d(0, ${target * -3}%, 0) scale(1.07)`
        progress.current.style.transform = `scaleX(${target})`
        if (!Number.isFinite(player.duration) || player.seeking || disposed) return
        current += (target - current) * 0.18
        if (Math.abs(target - current) < 0.001) current = target
        const time = current * Math.max(0, player.duration - 1 / 24)
        if (Math.abs(player.currentTime - time) > 0.015) player.currentTime = time
        if (current !== target) schedule()
      }

      function schedule() {
        if (!disposed && raf == null) raf = requestAnimationFrame(frame)
      }

      function painted() {
        if (!disposed) root.dataset.painted = "true"
      }

      function seeked() {
        if (!player.requestVideoFrameCallback) painted()
        schedule()
      }

      function prime() {
        if (primed || player.readyState < 2) return
        primed = true
        player.play()?.then(() => {
          player.pause()
          schedule()
        }).catch(() => { primed = false })
      }

      function ready() {
        root.dataset.motion = "true"
        schedule()
        if (window.matchMedia("(pointer: coarse)").matches) prime()
      }

      function failed() {
        root.dataset.motion = "false"
        root.dataset.painted = "false"
        root.style.setProperty("--hero-shade", "1")
        copy.style.opacity = ""
        copy.style.transform = ""
        copy.inert = false
      }

      player.addEventListener("loadeddata", ready)
      player.addEventListener("seeked", seeked)
      player.addEventListener("error", failed)
      window.addEventListener("scroll", schedule, { passive: true })
      window.addEventListener("resize", schedule)
      window.addEventListener("pointerdown", prime, { passive: true })
      if (player.requestVideoFrameCallback) frameCallback = player.requestVideoFrameCallback(painted)

      fetch("/video/recorrido-1080.mp4", { signal: controller.signal })
        .then((response) => {
          if (!response.ok) throw new Error("No se pudo cargar el recorrido")
          return response.blob()
        })
        .then((blob) => {
          if (disposed) return
          objectURL = URL.createObjectURL(blob)
          player.src = objectURL
        })
        .catch((error) => { if (error.name !== "AbortError") failed() })

      return () => {
        disposed = true
        controller.abort()
        cancelAnimationFrame(raf)
        if (frameCallback != null) player.cancelVideoFrameCallback(frameCallback)
        window.removeEventListener("scroll", schedule)
        window.removeEventListener("resize", schedule)
        window.removeEventListener("pointerdown", prime)
        player.removeEventListener("loadeddata", ready)
        player.removeEventListener("seeked", seeked)
        player.removeEventListener("error", failed)
        player.pause()
        player.removeAttribute("src")
        player.load()
        if (objectURL) URL.revokeObjectURL(objectURL)
      }
    }

    let cleanup = mount()
    const change = () => { cleanup(); cleanup = mount() }
    motion.addEventListener("change", change)
    return () => { cleanup(); motion.removeEventListener("change", change) }
  }, [])

  return (
    <section id="inicio" aria-label="Hyperion Software">
      <div ref={track} className="hero-journey">
        <div ref={stage} className="hero-stage">
          <div ref={media} className="hero-media" aria-hidden="true">
            {/* El poster sigue visible hasta que el decodificador pinta un cuadro. */}
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/video/recorrido-poster.jpg" alt="" width="1920" height="1080" fetchPriority="high" />
            <video ref={video} muted playsInline preload="auto" disablePictureInPicture tabIndex={-1} />
          </div>
          <div className="hero-scrim" aria-hidden="true" />

          <div className="container hero-copy-wrap">
            <div ref={content} className="hero-copy">
              <div className="mb-5 flex flex-wrap items-center gap-2 font-mono text-[10px] tracking-wider uppercase sm:text-xs">
                <span className="rounded-full border border-white/40 bg-white/10 px-3 py-1 backdrop-blur-md">Hyperion Software</span>
                <span className="px-2 py-1">Tijuana → MX · Desde 2016</span>
              </div>
              <h1 className="font-display text-[clamp(2.4rem,5.8vw,5.6rem)] leading-[1.04] font-bold tracking-tight">
                Software que<br />hace <span className="hero-highlight">crecer</span><br />tu negocio.
              </h1>
              <p className="mt-6 max-w-lg text-sm leading-relaxed text-white/85 sm:text-base lg:text-lg">
                Sistemas a la medida, puntos de venta, automatizaciones y servicio técnico.
                Diez años ayudando a negocios a vender más y trabajar menos.
              </p>
              <div className="mt-7 flex flex-wrap gap-3">
                <Link href="#contacto" className="inline-flex items-center justify-center gap-2 rounded-xl border border-white/80 bg-white px-5 py-3.5 font-mono text-xs font-bold text-ink uppercase sm:px-7">
                  Cotiza tu proyecto <ArrowRight className="h-4 w-4" />
                </Link>
                <Link href="#productos" className="inline-flex items-center justify-center gap-2 rounded-xl border border-white/50 bg-black/20 px-5 py-3.5 font-mono text-xs font-bold uppercase backdrop-blur-md hover:bg-white/15">
                  Ver productos <ArrowDownRight className="h-4 w-4" />
                </Link>
              </div>
            </div>
          </div>

          <div className="container hero-journey-footer">
            <div className="hero-scroll-hint font-mono text-[10px] tracking-[0.15em] uppercase sm:text-xs">
              <ArrowDownRight className="h-4 w-4" /> Desliza para explorar
            </div>
            <a href="#servicios" className="rounded-full border border-white/40 bg-black/30 px-4 py-2 font-mono text-[10px] uppercase backdrop-blur-md hover:bg-black/50 sm:text-xs">
              Ir a servicios ↗
            </a>
          </div>
          <div className="hero-progress" aria-hidden="true"><div ref={progress} /></div>
        </div>
      </div>

    </section>
  )
}
