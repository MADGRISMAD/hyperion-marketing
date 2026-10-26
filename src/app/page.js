"use client"
import { useEffect, useRef, useState } from "react"
import Image from "next/image"
import Link from "next/link"
import {
  ArrowRight,
  ArrowUpRight,
  BarChart3,
  Bell,
  CalendarCheck,
  ChevronRight,
  Code2,
  FileText,
  Loader2,
  Mail,
  MessageCircle,
  Package,
  PenTool,
  Phone,
  Rocket,
  Search,
  ShoppingBag,
  ShoppingCart,
  LifeBuoy,
  UtensilsCrossed,
  Wrench,
  Zap,
} from "lucide-react"
import Navbar, { Logo } from "../components/landing/Navbar"
import Hero from "../components/landing/HeroVideo"
import { IPhone, MacBook, Notif } from "../components/landing/Devices"
import { CountUp, Move, Reveal, Scene, useMouseDepth } from "../components/landing/parallax"
// Imágenes importadas: Next conoce su tamaño y genera una miniatura borrosa que se ve mientras carga la real
import tienditaApp from "../../public/productos/mitiendita-landing.jpg"
import tienditaMovil from "../../public/productos/mitiendita-movil.jpg"
import caresiaWeb from "../../public/productos/caresia-web.jpg"
import caresiaMovil from "../../public/productos/caresia-movil.jpg"
import restauranteWeb from "../../public/productos/mirestaurante-landing.webp"
import internshipsWeb from "../../public/productos/internships-landing.png"
import gridsWeb from "../../public/productos/grids-web.jpg"
import gridsMovil from "../../public/productos/grids-movil.jpg"
import barbellaWeb from "../../public/productos/barbella-web.jpg"
import barbellaMovil from "../../public/productos/barbella-movil.jpg"
import faroWeb from "../../public/productos/faro-web.jpg"
import faroMovil from "../../public/productos/faro-movil.jpg"
import behiveWeb from "../../public/productos/behive-landing.webp"
import camionWeb from "../../public/productos/camion-web.jpg"
import camionMovil from "../../public/productos/camion-movil.jpg"
import fotoTienda from "../../public/fotos/tienda.jpg"
import fotoConsultorio from "../../public/fotos/consultorio.jpg"
import fotoRestaurante from "../../public/fotos/restaurante.jpg"
import fotoSecuoya from "../../public/fotos/secuoya.jpg"
import fotoTijuana from "../../public/fotos/tijuana.jpg"

const WA = "526645798903"
const wa = (text) => `https://wa.me/${WA}?text=${encodeURIComponent(text)}`
const WHATSAPP = wa("Hola Hyperion, me interesa cotizar un proyecto")

// Diseño según DESIGN.md (press kit): hueso, tinta y rosa; bordes de 2 px; sombras duras; Space Grotesk.
// Todo lo que está debajo del hero vive dentro de .hy (ver globals.css).

// Anillos abiertos del logo, enormes y recortados por el borde: el motivo gráfico de la marca
function Rings({ className = "", stroke = "#141414", opacity = 0.1 }) {
  return (
    <svg viewBox="0 0 100 100" className={className} fill="none" stroke={stroke} strokeOpacity={opacity} strokeWidth="2" strokeLinecap="round" aria-hidden="true">
      <path vectorEffect="non-scaling-stroke" d="M72.5 14.54A42 42 0 1 1 27.5 14.54" />
      <path vectorEffect="non-scaling-stroke" d="M71.22 38.4A31 31 0 1 1 28.78 38.4" />
      <path vectorEffect="non-scaling-stroke" d="M66.89 61.28A20 20 0 1 1 33.11 61.28" />
    </svg>
  )
}

// El punto final rosa de los titulares grandes, igual que el del logo
const Dot = () => <span className="dot">.</span>

// Encabezado de sección: rótulo, titular grande con punto rosa y una nota opcional
function Head({ eyebrow, title, text, center = false, light = false, small = false, className = "" }) {
  return (
    <Reveal className={`${center ? "mx-auto text-center" : ""} max-w-4xl ${className}`}>
      <p className={`eyebrow ${light ? "text-grey-300" : "text-grey-500"}`}>{eyebrow}</p>
      <h2 className={`display mt-4 ${small ? "text-[clamp(2.4rem,4.8vw,4.2rem)]" : "text-[clamp(2.6rem,6vw,5.4rem)]"} ${light ? "text-canvas" : ""}`}>
        {title}
        <Dot />
      </h2>
      {text && <p className={`mt-6 max-w-2xl text-lg leading-relaxed md:text-[1.3rem] ${center ? "mx-auto" : ""} ${light ? "text-grey-300" : "text-grey-700"}`}>{text}</p>}
    </Reveal>
  )
}

/* ───────────────────────── Cifras (bloque lima) ───────────────────────── */
function Numbers() {
  const stats = [
    { n: 10, s: "+", label: "años construyendo software" },
    { n: 9, s: "", label: "productos propios, diseñados y construidos aquí" },
    { n: 100, s: "%", label: "desarrollo a la medida, sin plantillas" },
    { n: 1, s: "", label: "equipo que diseña, programa, instala y da soporte" },
  ]
  return (
    <Scene className="relative overflow-hidden border-y border-ink/10 bg-white py-16 md:py-24">
      <Rings className="pointer-events-none absolute -top-40 -right-32 h-[560px] w-[560px]" opacity={0.14} />
      <div className="container relative grid grid-cols-2 gap-x-6 gap-y-12 lg:grid-cols-4">
        {stats.map((s, i) => (
          <Move key={s.label} y={[40 + i * 18, -20 - i * 10]} className="border-t border-ink/10 pt-5">
            <div className="display text-[clamp(3rem,6vw,5.2rem)] tabular-nums">
              <CountUp to={s.n} suffix={s.s} />
            </div>
            <p className="mt-3 max-w-[16rem] text-[15px] leading-snug font-medium">{s.label}</p>
          </Move>
        ))}
      </div>
    </Scene>
  )
}

/* ───────────────────────── Productos ───────────────────────── */
// bg: color de bloque del producto · fg: color del texto sobre él (tinta sobre naranja y lima; blanco sobre azul, violeta y verde agua)
const products = [
  {
    name: "Mitiendita",
    logo: "/productos/logos/mitiendita.svg",
    cat: "Punto de venta",
    bg: "#ffffff",
    fg: "ink",
    live: "https://mitiendita.software",
    tagline: "Tu tienda no cierra aunque la compu falle.",
    description: "Punto de venta en la nube para abarrotes y comercios. Abre caja desde el celular, la tablet o la PC sin instalar nada.",
    features: ["Lector de código de barras o búsqueda por nombre", "Cobrar en segundos con F12", "Ventas en espera, descuentos y cortes de caja"],
    web: [tienditaApp, "Página de inicio de Mitiendita"],
    phone: [tienditaMovil, "Pantalla de venta de Mitiendita en el celular"],
  },
  {
    name: "Caresia",
    logo: "/productos/logos/caresia.svg",
    cat: "Salud",
    bg: "#ffffff",
    fg: "ink",
    live: "https://caresia.mx",
    tagline: "Menos papeleo, más consulta.",
    description: "Agenda, expedientes, recetas y cobros para clínicas dentales y consultorios. Funciona desde el navegador, sin instalar nada.",
    features: ["Agenda compartida por día y por profesional", "Expediente completo con búsqueda por CURP", "Permisos por rol: recepción agenda, el doctor consulta"],
    web: [caresiaWeb, "Página de Caresia con su agenda de citas"],
    phone: [caresiaMovil, "Panel de inicio de Caresia en el celular"],
  },
  {
    name: "Camión TJ",
    logo: "/productos/logos/camiontj.svg",
    cat: "Movilidad",
    bg: "#ffffff",
    fg: "ink",
    live: "https://camion.15-235-62-27.sslip.io",
    tagline: "Cómo llegar en camión, y cuánto te va a costar.",
    description: "Rutas reales de Tijuana: camiones, taxis de ruta y calafias. Te dice qué tomar, cuánto cuesta cada pasaje y te guía a pie hasta la parada.",
    features: ["Más de 100 rutas con su trazado real", "Opciones por más barata, más rápida o menos caminar", "Camino a pie a la parada y aviso para bajar"],
    web: [camionWeb, "Pantallas de búsqueda, opciones y detalle de Camión TJ"],
    phone: [camionMovil, "Camino a pie a la parada en Camión TJ"],
  },
  {
    name: "Grids",
    logo: "/productos/logos/grids.svg",
    cat: "Tu enlace en cuadros",
    bg: "#ffffff",
    fg: "ink",
    live: "https://miinfo.15-235-62-27.sslip.io",
    liveLabel: "Grids",
    tagline: "Tu negocio, armado en cuadritos.",
    description: "Fotos, WhatsApp, redes, menú y agenda en un solo enlace. Cada cosa en su cuadro, para compartir por WhatsApp.",
    features: ["WhatsApp, teléfono, correo y hasta 8 enlaces", "Botón para guardar tu contacto", "Agenda opcional con confirmación por correo"],
    web: [gridsWeb, "Página de inicio de Grids con un grid de ejemplo"],
    phone: [gridsMovil, "Grids en el celular"],
  },
  {
    name: "Barbella",
    logo: "/productos/logos/barbella.svg",
    cat: "Agenda y caja",
    bg: "#ffffff",
    fg: "ink",
    live: "https://barbella.mx",
    liveLabel: "Barbella",
    tagline: "Todo tu local, en una sola agenda.",
    description: "Agenda por persona que no deja empalmar, anticipos y caja para barberías, salones de uñas, pestañas y spas. Hecho en México.",
    features: ["Agenda por persona, sin citas empalmadas", "Anticipos para apartar el horario", "Caja y comisión de cada quien"],
    web: [barbellaWeb, "Página de inicio de Barbella con el recorrido de una barbería"],
    phone: [barbellaMovil, "Barbella en el celular"],
  },
  {
    name: "FaroContenido",
    logo: "/productos/logos/faro.svg",
    cat: "Blog con IA",
    bg: "#ffffff",
    fg: "ink",
    live: "https://faro.hyperionmkt.com",
    liveLabel: "FaroContenido",
    tagline: "Tu blog, escrito solo.",
    description: "Pegas la dirección de tu sitio y la IA investiga tu negocio, elige los temas y escribe y publica artículos con imagen, a un ritmo que Google ve con buenos ojos.",
    features: ["Brand DNA sugerido por la IA, que tú ajustas", "Piloto automático con ritmo prudente; en salud, legal y finanzas queda en borrador", "Analytics reales con Google Search Console"],
    web: [faroWeb, "Página de inicio de FaroContenido"],
    phone: [faroMovil, "Panel de FaroContenido en el celular con la próxima publicación"],
  },
  {
    name: "Mirestaurante",
    logo: "/productos/logos/mirestaurante.svg",
    cat: "Restaurantes",
    bg: "#ffffff",
    fg: "ink",
    tagline: "Cada comanda, en su lugar.",
    description: "Comandas del mesero a la cocina y de la cocina a la caja, con mapa de mesas en vivo. Sin papelitos ni gritos.",
    features: ["Pedidos desde el celular, directo a cocina", "Mapa de mesas: libre, pidiendo, listo, comiendo", "Pase de cocina con el tiempo de cada comanda"],
    web: [restauranteWeb, "Pase de cocina y mapa de mesas de Mirestaurante"],
  },
  {
    name: "internships.gg",
    cat: "Talento",
    bg: "#ffffff",
    fg: "ink",
    tagline: "Sube de nivel tu carrera mientras estudias.",
    description: "Misiones reales en empresas reales para universitarios: freelance, remotas y por proyecto, con XP y portafolio.",
    features: ["Misiones freelance, remotas y por proyecto", "XP y rachas que motivan a seguir", "Sección para empresas que buscan talento"],
    web: [internshipsWeb, "Página de inicio de internships.gg"],
  },
  {
    name: "BeHive",
    logo: "/productos/logos/behive.png",
    cat: "Mesa de ayuda",
    bg: "#ffffff",
    fg: "ink",
    tagline: "Mesa de ayuda profesional, con precio en pesos.",
    description: "Tickets, SLA, centro de ayuda y reportes en una sola herramienta en español, pensada para empresas en México.",
    features: ["Tickets con prioridad, estados y notas internas", "SLA, centro de ayuda y reportes", "Gratis con 1 agente y hasta 10 personas"],
    web: [behiveWeb, "Lista de tickets de BeHive"],
  },
]

function ProductCard({ p, i, eager }) {
  const onDark = false
  return (
    <article
      data-card
      className={`relative grid h-full shrink-0 snap-center grid-rows-[auto_1fr] overflow-hidden rounded-[24px] border border-ink/15 lg:grid-cols-[minmax(0,0.82fr)_minmax(0,1.18fr)] lg:grid-rows-1 w-[86vw] lg:w-[min(1120px,84vw)] ${onDark ? "text-white" : "text-ink"}`}
      style={{ background: p.bg }}
    >
      <Rings className="pointer-events-none absolute -top-36 -left-28 h-[480px] w-[480px]" stroke={onDark ? "#ffffff" : "#141414"} opacity={0.16} />
      <div className="relative flex flex-col p-7 md:p-10 lg:p-12">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <span className="tag">
            {String(i + 1).padStart(2, "0")} · {p.cat}
          </span>
          <span className="tag !flex items-center gap-1.5 !bg-white">
            <span className="h-2 w-2 shrink-0 rounded-full border border-ink" style={{ background: p.live ? "#141414" : "#ff3d7f" }} />
            {p.live ? "En línea" : "Demo bajo pedido"}
          </span>
        </div>
        <div className="mt-6 flex items-center gap-4">
          {p.logo && <img src={p.logo} alt="" width={56} height={56} className="h-14 w-14 shrink-0 rounded-2xl object-contain" />}
          <h3 className={`display ${p.name.length > 12 ? "text-[clamp(1.9rem,3.1vw,2.8rem)]" : p.name.length > 11 ? "text-[clamp(2.2rem,3.6vw,3.2rem)]" : "text-[clamp(2.4rem,4.4vw,3.8rem)]"}`}>{p.name}</h3>
        </div>
        <p className="mt-3 text-xl leading-snug font-bold tracking-[-0.02em] md:text-2xl">{p.tagline}</p>
        <p className={`mt-3 leading-relaxed ${onDark ? "text-white" : "text-ink/80"}`}>{p.description}</p>
        <ul className={`mt-6 hidden space-y-2 text-[15px] md:block [@media(max-height:820px)]:hidden ${onDark ? "text-white" : "text-ink/85"}`}>
          {p.features.map((f) => (
            <li key={f} className="flex gap-2.5">
              <span className="mt-[7px] h-2.5 w-2.5 shrink-0 rounded-full border border-ink/30 bg-pink" />
              {f}
            </li>
          ))}
        </ul>
        <div className="mt-auto pt-7">
          {p.live ? (
            <a href={p.live} target="_blank" rel="noopener noreferrer" className="bt bt-white bt-sm">
              Visitar {p.liveLabel || p.live.replace("https://", "")} <ArrowUpRight className="h-4 w-4" />
            </a>
          ) : (
            <a href={wa(`Hola Hyperion, me gustaría ver una demo de ${p.name}`)} target="_blank" rel="noopener noreferrer" className="bt bt-white bt-sm">
              Pedir una demo <ChevronRight className="h-4 w-4" />
            </a>
          )}
        </div>
      </div>
      {/* pantallas recortadas abajo: se desplazan a su propio ritmo mientras la tarjeta cruza la pantalla */}
      <div className="relative min-h-[240px] overflow-hidden border-t border-ink/10 bg-white/25 lg:border-t-0 lg:border-l-2">
        <div className="absolute inset-0 flex items-end justify-center px-[8%] pt-[8%] pb-[7%]">
          <div data-shift className={`w-full lg:w-[min(100%,calc((100svh-20.5rem)*1.2))] will-change-transform ${p.phone ? "lg:-translate-x-[6%]" : ""}`}>
            <MacBook eager={eager} img={p.web[0]} alt={p.web[1]} sizes="(min-width: 1024px) 560px, 80vw" />
          </div>
        </div>
        {p.phone && (
          <div data-shift-phone className="absolute right-[5%] bottom-[-10%] w-[22%] will-change-transform lg:bottom-[-6%] lg:w-[20%]">
            <IPhone eager={eager} img={p.phone[0]} alt={p.phone[1]} />
          </div>
        )}
      </div>
    </article>
  )
}

// Galería horizontal: en escritorio la sección se fija y el scroll vertical la mueve de lado
function Products() {
  const sticky = useRef(null)
  const track = useRef(null)
  const count = useRef(null)
  const bar = useRef(null)
  const total = products.length + 1
  // Las capturas entran de lado (fuera de la vista del navegador): se descargan cuando la sección está a una pantalla
  const [near, setNear] = useState(false)
  useEffect(() => {
    const el = sticky.current?.parentElement
    if (!el) return
    const io = new IntersectionObserver(([e]) => e.isIntersecting && (setNear(true), io.disconnect()), { rootMargin: "100% 0px" })
    io.observe(el)
    return () => io.disconnect()
  }, [])

  const onProgress = (p, reduced) => {
    const t = track.current
    if (!t) return
    const wide = window.innerWidth >= 1024 && !reduced
    if (!wide) {
      t.style.transform = ""
      return
    }
    // cada tarjeta se detiene al centro de la pantalla y se queda un momento antes de pasar a la siguiente
    const cards = [...t.querySelectorAll("[data-card]")]
    const vw = window.innerWidth
    const at = (c) => vw / 2 - (c.offsetLeft + c.offsetWidth / 2)
    const f = p * (cards.length - 1)
    const i = Math.min(cards.length - 2, Math.floor(f))
    const k = Math.max(0, Math.min(1, (f - i - 0.18) / 0.64))
    const e = k * k * (3 - 2 * k)
    t.style.transform = `translate3d(${(at(cards[i]) + (at(cards[i + 1]) - at(cards[i])) * e).toFixed(1)}px,0,0)`
    if (count.current) count.current.textContent = String(Math.round(i + e) + 1).padStart(2, "0")
    if (bar.current) bar.current.style.transform = `scaleX(${p.toFixed(3)})`
    // parallax dentro de cada tarjeta: la laptop va más lenta que la tarjeta y el teléfono sube
    cards.forEach((card) => {
      const r = card.getBoundingClientRect()
      const d = (r.left + r.width / 2 - vw / 2) / vw // -1 … 1 respecto al centro
      const m = card.querySelector("[data-shift]")
      const ph = card.querySelector("[data-shift-phone]")
      if (m) m.style.transform = `translate3d(${(d * 36).toFixed(1)}px, 0, 0)`
      if (ph) ph.style.transform = `translate3d(${(d * -30).toFixed(1)}px, ${(d * 60).toFixed(1)}px, 0) rotate(${(d * 5).toFixed(2)}deg)`
    })
  }

  return (
    <Scene id="productos" mode="pin" onProgress={onProgress} className="relative lg:h-[800vh]">
      <div ref={sticky} className="overflow-hidden bg-paper-2 py-20 lg:sticky lg:top-0 lg:flex lg:h-screen lg:flex-col lg:py-0 lg:pt-24">
        <div className="container flex items-end justify-between gap-6 lg:pb-8">
          <div>
            <p className="eyebrow text-grey-500">Productos propios</p>
            <h2 className="display mt-3 text-[clamp(2.4rem,5vw,4.4rem)]">
              Nueve productos.
              <br />
              <span className="text-grey-500">Hechos por nosotros</span>
              <Dot />
            </h2>
          </div>
          <div className="hidden w-48 shrink-0 lg:block">
            <div className="mono flex items-baseline justify-between text-sm">
              <span ref={count}>01</span>
              <span>{String(total).padStart(2, "0")}</span>
            </div>
            <div className="mt-2 h-1.5 rounded-full border border-ink/15 bg-white">
              <div ref={bar} className="h-full origin-left rounded-full bg-pink" style={{ transform: "scaleX(0)" }} />
            </div>
          </div>
        </div>
        <div className="mt-10 overflow-x-auto [scrollbar-width:none] lg:mt-0 lg:flex-1 lg:overflow-visible lg:pb-12">
          <div ref={track} className="flex h-[min(76vh,660px)] snap-x snap-mandatory gap-5 px-5 pb-3 will-change-transform md:px-10 lg:h-[max(420px,calc(100svh-20.5rem))] lg:gap-8 lg:px-[max(2.5rem,calc((100vw-1160px)/2))] lg:pb-0">
            {products.map((p, i) => (
              <ProductCard key={p.name} p={p} i={i} eager={near} />
            ))}
            {/* el último */}
            <article
              data-card
              className="relative flex h-full w-[86vw] shrink-0 snap-center flex-col justify-center overflow-hidden rounded-[24px] border border-ink/15 bg-ink p-10 text-canvas md:p-14 lg:w-[min(720px,70vw)]"
            >
              <Rings className="pointer-events-none absolute -right-32 -bottom-40 h-[520px] w-[520px]" stroke="#f5f4f0" opacity={0.12} />
              <span className="eyebrow relative text-grey-300">{String(total).padStart(2, "0")} · ¿El tuyo?</span>
              <h3 className="display relative mt-6 text-[clamp(2.6rem,5vw,4.6rem)]">
                El décimo puede ser <span className="inline-block -rotate-1 rounded-lg bg-pink px-2 text-ink">tu idea</span>
                <Dot />
              </h3>
              <p className="relative mt-5 max-w-md text-lg text-grey-300">El mismo equipo que construyó estos nueve, trabajando en el tuyo.</p>
              <Link href="#contacto" className="bt bt-pink bt-inv relative mt-9 self-start">
                Cotizar proyecto <ArrowRight className="h-4 w-4" />
              </Link>
            </article>
          </div>
        </div>
      </div>
    </Scene>
  )
}

/* ───────────────────────── En la calle (fotos) ───────────────────────── */
// Cada foto se mueve dentro de su marco (más lenta que la página) y su notificación flota en otra capa
function Photo({ img, alt, className = "", frame = [0, 0], inner = [-50, 50], children, caption }) {
  return (
    <Move y={frame} className={className}>
      <figure className="md:flex md:h-full md:flex-col">
        <div className="relative overflow-hidden rounded-[18px] border border-ink/15 md:min-h-0 md:flex-1">
          <Move y={inner} s={[1.18, 1.18]} className="relative aspect-[4/5] md:aspect-auto md:h-full">
            <Image src={img} alt={alt} placeholder="blur" sizes="(min-width: 1024px) 50vw, 92vw" className="h-full w-full object-cover" />
          </Move>
          {children}
        </div>
        {caption && <figcaption className="mono mt-4 text-[12px] tracking-wide text-grey-500 uppercase">{caption}</figcaption>}
      </figure>
    </Move>
  )
}

function InTheWild() {
  return (
    <Scene className="relative overflow-hidden py-24 md:py-36">
      <Rings className="pointer-events-none absolute -bottom-52 -left-44 h-[720px] w-[720px]" stroke="#ebe9e2" opacity={1} />
      <div className="container relative">
        <Head
          eyebrow="En negocios reales"
          title={
            <>
              Donde vive
              <br />
              nuestro software
            </>
          }
          text="En el mostrador de una tienda, en la recepción de un consultorio, en la cocina de una taquería. Lo hacemos para que funcione ahí."
        />
        <div className="mt-16 grid gap-6 md:grid-cols-12 md:gap-8">
          <Photo img={fotoTienda} alt="Tienda de abarrotes de barrio" frame={[60, -40]} className="md:col-span-7 md:h-[640px]" caption="Tienda de abarrotes · Mitiendita">
            <Move x={[-40, 30]} y={[40, -40]} className="absolute bottom-6 left-6">
              <Notif app="Mitiendita" color="var(--color-orange)" icon={ShoppingBag} title="Venta registrada · $118.50" text="Guardada en la nube" className="!w-[270px]" />
            </Move>
          </Photo>
          <div className="grid gap-6 md:col-span-5 md:gap-8">
            <Photo img={fotoConsultorio} alt="Consultorio dental con sillón naranja" frame={[120, -80]} className="md:h-[300px]" caption="Consultorio dental · Caresia">
              <Move x={[50, -30]} className="absolute top-5 right-5">
                <Notif app="Caresia" color="var(--color-teal)" icon={CalendarCheck} title="Cita confirmada · 10:30" className="!w-[240px]" />
              </Move>
            </Photo>
            <Photo img={fotoRestaurante} alt="Plato de tacos con guacamole" frame={[180, -120]} className="md:h-[300px]" caption="Taquería · Mirestaurante">
              <Move x={[-50, 20]} className="absolute bottom-5 left-5">
                <Notif app="Mirestaurante" color="var(--color-pink)" icon={UtensilsCrossed} title="Mesa 7 · 3 al pastor" text="Enviado a cocina" className="!w-[240px]" />
              </Move>
            </Photo>
          </div>
        </div>
      </div>
    </Scene>
  )
}

/* ───────────────────────── Servicios ───────────────────────── */
// Tarjeta de servicio: blanca, con borde de tinta y sombra dura; arriba, un chip con el color del servicio y su icono
function Chip({ icon: Icon }) {
  return (
    <span className={`flex h-12 w-12 items-center justify-center rounded-[14px] border border-ink/15 text-canvas bg-ink`}>
      <Icon className="h-6 w-6" strokeWidth={2.2} />
    </span>
  )
}

function Tile({ className = "", children }) {
  return <Reveal className={`card relative overflow-hidden p-7 transition-transform duration-200 hover:-translate-y-1 md:p-9 ${className}`}>{children}</Reveal>
}

function Services() {
  return (
    <Scene id="servicios" className="relative overflow-hidden border-y border-ink/10 bg-paper-2 py-24 md:py-36">
      <div className="container">
        <Head
          eyebrow="Servicios"
          title={
            <>
              Cuatro cosas.
              <br />
              <span className="text-grey-500">Muy bien hechas</span>
            </>
          }
          text="Desde el sistema que corre tu operación hasta el cable de red que lo conecta. Un solo equipo, de principio a fin."
        />

        <div className="mt-16 grid gap-6 lg:grid-cols-6">
          {/* Sistemas a la medida */}
          <Tile className="lg:col-span-4 lg:row-span-2">
            <div className="flex items-center gap-3">
              <Chip icon={Code2} />
              <span className="mono text-sm text-grey-500">01 /</span>
            </div>
            <h3 className="display mt-5 text-4xl md:text-5xl">Sistemas a la medida</h3>
            <p className="mt-3 max-w-md text-grey-700">Software diseñado alrededor de tus procesos, no al revés: ERP, CRM, portales, inventarios y paneles de control.</p>
            <Link href="/servicios/sistemas-a-medida" className="link-pink mt-5 inline-flex items-center gap-1 text-[15px]">
              Conocer más <ChevronRight className="h-4 w-4" />
            </Link>
            {/* tablero de ejemplo */}
            <Move y={[60, -30]} className="mt-10 md:mt-12">
              <div className="card grid gap-4 !rounded-[12px] p-5 md:grid-cols-[1.3fr_1fr]">
                <div>
                  <div className="flex items-baseline justify-between">
                    <span className="text-[13px] font-semibold text-grey-500">Ventas de la semana</span>
                    <span className="mono rounded-full bg-pink px-2 py-0.5 text-[12px]">+18%</span>
                  </div>
                  <div className="display mt-2 text-4xl tabular-nums">$84,210</div>
                  <div className="mt-5 flex h-28 items-end gap-2">
                    {[38, 52, 46, 64, 58, 82, 96].map((v, i) => (
                      <span key={i} className="flex-1 rounded-t-md" style={{ height: `${v}%`, background: i === 6 ? "#FF3D7F" : "#141414" }} />
                    ))}
                  </div>
                  <div className="mono mt-2 flex justify-between text-[11px] text-grey-500">
                    {["L", "M", "M", "J", "V", "S", "D"].map((d, i) => (
                      <span key={i} className="flex-1 text-center">
                        {d}
                      </span>
                    ))}
                  </div>
                </div>
                <ul className="space-y-2.5 text-[14px]">
                  {[
                    ["Inventario", "1,284 productos", "#ff3d7f"],
                    ["Clientes", "312 activos", "#141414"],
                    ["Pedidos abiertos", "17", "#141414"],
                    ["Sucursales", "3 en línea", "#141414"],
                  ].map(([k, v, c]) => (
                    <li key={k} className="flex items-center justify-between rounded-[10px] border border-ink/15 bg-canvas px-3.5 py-2.5">
                      <span className="flex items-center gap-2 text-grey-700">
                        <span className="h-2.5 w-2.5 rounded-full" style={{ background: c }} />
                        {k}
                      </span>
                      <span className="font-bold">{v}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </Move>
          </Tile>

          {/* Puntos de venta */}
          <Tile className="lg:col-span-2">
            <div className="flex items-center gap-3">
              <Chip icon={ShoppingCart} />
              <span className="mono text-sm text-grey-500">02 /</span>
            </div>
            <h3 className="display mt-5 text-3xl">Puntos de venta</h3>
            <p className="mt-3 text-grey-700">Instalación y personalización para tiendas, restaurantes y comercios, con sistema propio en la nube.</p>
            <Move y={[50, -20]} r={[-4, 2]} className="mt-7">
              <div className="card mx-auto max-w-[260px] !rounded-[12px] p-5 font-mono text-[12px]">
                <div className="flex justify-between text-grey-500">
                  <span>Ticket 0482</span>
                  <span>14:32</span>
                </div>
                {[
                  ["Refresco 600 ml", "22.00"],
                  ["Papas 45 g", "19.00"],
                  ["Pan blanco", "48.00"],
                  ["Leche 1 L", "29.50"],
                ].map(([k, v]) => (
                  <div key={k} className="mt-2 flex justify-between">
                    <span>{k}</span>
                    <span>${v}</span>
                  </div>
                ))}
                <div className="mt-3 flex justify-between border-t-2 border-dashed border-ink pt-3 text-[14px] font-bold">
                  <span>Total</span>
                  <span>$118.50</span>
                </div>
              </div>
            </Move>
          </Tile>

          {/* Automatizaciones */}
          <Tile className="lg:col-span-2">
            <div className="flex items-center gap-3">
              <Chip icon={Zap} />
              <span className="mono text-sm text-grey-500">03 /</span>
            </div>
            <h3 className="display mt-5 text-3xl">Automatizaciones</h3>
            <p className="mt-3 text-grey-700">Que tus sistemas hablen entre ellos y hagan solos el trabajo repetitivo: reportes, integraciones y bots.</p>
            <Link href="#automatizar" className="link-pink mt-5 inline-flex items-center gap-1 text-[15px]">
              Ver cómo funciona <ChevronRight className="h-4 w-4" />
            </Link>
          </Tile>

          {/* Servicio técnico */}
          <Tile className="lg:col-span-3">
            <div className="flex items-center gap-3">
              <Chip icon={Wrench} />
              <span className="mono text-sm text-grey-500">04 /</span>
            </div>
            <h3 className="display mt-5 text-3xl md:text-4xl">Servicio técnico</h3>
            <p className="mt-3 max-w-md text-grey-700">Mantenimiento de equipos, redes, instalación y soporte a los sistemas que ya tienes funcionando.</p>
            <ul className="mt-7 grid gap-2 sm:grid-cols-2">
              {["Mantenimiento de equipos", "Redes e instalación", "Soporte a tus sistemas", "Respaldos y seguridad"].map((t) => (
                <li key={t} className="flex items-center gap-2.5 rounded-[10px] border border-ink/15 bg-canvas px-4 py-3 text-[14px] font-medium">
                  <span className="h-2.5 w-2.5 rounded-full border border-ink/30 bg-pink" /> {t}
                </li>
              ))}
            </ul>
          </Tile>

          {/* También */}
          <Tile className="lg:col-span-3">
            <p className="eyebrow text-grey-500">También hacemos</p>
            <ul className="mt-5 divide-y-2 divide-ink/15">
              {[
                ["/servicios/desarrollo-web", "Desarrollo web", "Sitios rápidos que convierten visitas en clientes."],
                ["/servicios/marketing-digital", "Marketing digital", "Estrategia, contenido y campañas."],
                ["/servicios/consultoria-it", "Consultoría IT", "Te ayudamos a decidir antes de invertir."],
              ].map(([href, t, d]) => (
                <li key={href}>
                  <Link href={href} className="group flex items-center justify-between gap-4 py-4">
                    <span>
                      <span className="block text-xl font-bold tracking-[-0.02em]">{t}</span>
                      <span className="text-[14px] text-grey-700">{d}</span>
                    </span>
                    <ArrowRight className="h-5 w-5 shrink-0 text-grey-500 transition-transform group-hover:translate-x-1 group-hover:text-ink" />
                  </Link>
                </li>
              ))}
            </ul>
          </Tile>
        </div>
      </div>
    </Scene>
  )
}

/* ───────────────────────── Automatizar (iPhone que recibe avisos) ───────────────────────── */
const flow = [
  { step: "Evento", text: "Un cliente compra, reserva o paga. Es el único paso que hace una persona.", app: "Barbella", color: "var(--color-orange)", icon: CalendarCheck, title: "Cita reservada · sáb 5:30 pm", body: "Corte y barba · Sucursal Centro" },
  { step: "Registro", text: "Cada sistema se entera: inventario, agenda o expediente se actualizan solos.", app: "Mitiendita", color: "var(--color-blue)", icon: Package, title: "Inventario actualizado", body: "Refresco 600 ml · quedan 23" },
  { step: "Comprobante", text: "El cliente recibe su confirmación, recibo o factura sin que nadie la envíe.", app: "Facturación", color: "var(--color-violet)", icon: FileText, title: "Factura enviada", body: "CFDI al correo del cliente" },
  { step: "Reporte", text: "Al cierre, el resumen del día llega a tu correo sin que nadie lo arme.", app: "Reportes", color: "var(--color-teal)", icon: BarChart3, title: "Reporte del día", body: "$12,480 · 86 operaciones" },
  { step: "Aviso", text: "Si algo se acaba o falla, te enteras antes de que sea un problema.", app: "Alertas", color: "var(--color-pink)", icon: Bell, title: "Stock bajo: pan blanco", body: "Pide al proveedor hoy" },
]

function Automation() {
  const [active, setActive] = useState(0)
  const onProgress = (p, reduced) => {
    const wide = window.innerWidth >= 1024 && !reduced
    const next = wide ? Math.min(flow.length - 1, Math.floor(p * flow.length * 1.1)) : flow.length - 1
    setActive((a) => (a === next ? a : next))
  }
  return (
    <Scene id="automatizar" mode="pin" onProgress={onProgress} className="relative overflow-clip bg-ink text-canvas lg:h-[360vh]">
      <Rings className="pointer-events-none absolute -right-48 -bottom-56 h-[860px] w-[860px]" stroke="#f5f4f0" opacity={0.08} />
      <div className="container relative grid items-center gap-14 py-24 lg:sticky lg:top-0 lg:h-screen lg:grid-cols-2 lg:py-0">
        <div>
          <p className="eyebrow text-grey-300">Automatizar</p>
          <h2 className="display mt-4 text-[clamp(2.5rem,5.4vw,4.8rem)]">
            Un evento.
            <br />
            <span className="inline-block -rotate-1 rounded-lg bg-pink px-2 text-ink">Cinco tareas</span> que ya no haces
            <Dot />
          </h2>
          <p className="mt-6 max-w-lg text-lg text-grey-300">Una venta, una cita o un pedido: conectamos tus sistemas para que un solo evento dispare todo lo demás. Sin capturar dos veces, sin hojas de cálculo a medianoche.</p>
          <ol className="mt-10 space-y-2">
            {flow.map((f, i) => (
              <li
                key={f.step}
                className={`grid grid-cols-[2.6rem_1fr] gap-3 rounded-[14px] border px-3 py-3 transition-[background-color,opacity,border-color] duration-300 ${
                  i === active ? "border-canvas bg-white/10 opacity-100" : i < active ? "border-transparent opacity-60" : "border-transparent opacity-35"
                }`}
              >
                <span className="mono text-[13px] text-pink">0{i + 1} /</span>
                <span>
                  <span className="block font-bold">{f.step}</span>
                  {i === active && <span className="mt-1 block text-[15px] text-grey-300">{f.text}</span>}
                </span>
              </li>
            ))}
          </ol>
        </div>

        {/* pantalla de bloqueo con las notificaciones llegando */}
        <div className="relative mx-auto w-[min(330px,78vw)]">
          <IPhone>
            <div className="absolute inset-0 bg-[#1c1c1c]" />
            <div className="relative px-[7%] pt-[18%] text-center">
              <div className="text-[13px] font-medium text-white/80">Martes, 14 de octubre</div>
              <div className="display text-[clamp(3.4rem,8vw,5rem)] font-bold">21:00</div>
            </div>
            <div className="relative mt-4 space-y-2 px-[4%]">
              {flow.slice(0, active + 1).map((f, i) => (
                <div key={f.step} style={{ animation: "notif-in 420ms var(--ease-out) both" }}>
                  <Notif app={f.app} color={f.color} icon={f.icon} time={i === active ? "ahora" : `hace ${(active - i) * 2} s`} title={f.title} text={f.body} className="!w-full !rounded-[12px] !p-3" />
                </div>
              ))}
            </div>
          </IPhone>
          <p className="mono mt-6 text-center text-[12px] tracking-[0.12em] text-grey-300 uppercase">≈ 0.2 s de punta a punta</p>
        </div>
      </div>
    </Scene>
  )
}

/* ───────────────────────── Proceso ───────────────────────── */
const steps = [
  { icon: Search, title: "Diagnóstico", text: "Entendemos tu negocio y tus procesos antes de escribir una línea de código." },
  { icon: PenTool, title: "Diseño", text: "Plan de trabajo con tiempos y costos definidos. Sabes qué recibes y cuándo." },
  { icon: Rocket, title: "Desarrollo", text: "Entregas cortas con avances que puedes ver y probar desde la primera semana." },
  { icon: LifeBuoy, title: "Soporte", text: "Instalación, capacitación a tu equipo y mejoras continuas. No desaparecemos al entregar." },
]

function Process() {
  const line = useRef(null)
  return (
    <Scene id="proceso" onProgress={(p) => line.current && (line.current.style.transform = `scaleX(${Math.min(1, Math.max(0, (p - 0.25) / 0.45)).toFixed(3)})`)} className="py-24 md:py-36">
      <div className="container">
        <Head
          center
          eyebrow="Cómo trabajamos"
          title={
            <>
              Cuatro fases.
              <br />
              <span className="text-grey-500">Cero sorpresas</span>
            </>
          }
          text="Avanzas una fase a la vez y siempre sabes en cuál vas, qué sigue y cuánto cuesta."
        />
        <div className="relative mt-20">
          <div className="absolute top-7 right-[12%] left-[12%] hidden h-1.5 rounded-full border border-ink/15 bg-white lg:block" aria-hidden="true">
            <div ref={line} className="h-full origin-left rounded-full bg-pink" style={{ transform: "scaleX(0)" }} />
          </div>
          <ol className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4 lg:gap-6">
            {steps.map(({ icon: Icon, title, text }, i) => (
              <Move as="li" key={title} y={[50, 0]} className="relative text-center">
                <span
                  className={`relative mx-auto flex h-14 w-14 items-center justify-center rounded-[16px] border border-ink/15 bg-ink text-canvas`}
                >
                  <Icon className="h-6 w-6" strokeWidth={2.2} />
                </span>
                <p className="mono mt-6 text-[13px]">0{i + 1} /</p>
                <h3 className="mt-2 text-2xl font-bold tracking-[-0.03em]">{title}</h3>
                <p className="mx-auto mt-2 max-w-[17rem] text-[15px] leading-relaxed text-grey-700">{text}</p>
              </Move>
            ))}
          </ol>
        </div>
      </div>
    </Scene>
  )
}

/* ───────────────────────── Estudio ───────────────────────── */
function Studio() {
  return (
    <section id="estudio">
      {/* la secuoya: la foto se aleja mientras el texto sube */}
      <Scene className="relative h-[115vh] min-h-[720px] overflow-hidden border-y border-ink/10 bg-ink text-canvas">
        <Move s={[1.3, 1.02]} y={[-60, 60]} className="absolute inset-0">
          <Image src={fotoSecuoya} alt="Troncos de secuoyas gigantes en un bosque de California" placeholder="blur" fill sizes="100vw" className="object-cover" />
        </Move>
        <div className="absolute inset-0 bg-ink/55" />
        <Rings className="pointer-events-none absolute -top-40 -right-40 h-[760px] w-[760px]" stroke="#f5f4f0" opacity={0.18} />
        <div className="container relative flex h-full flex-col justify-end pb-20 md:pb-28">
          <Move y={[120, -60]}>
            <p className="eyebrow text-grey-300">El estudio</p>
            <h2 className="display mt-4 max-w-4xl text-[clamp(2.6rem,6.4vw,5.8rem)]">
              Nos llamamos como el árbol más alto del mundo
              <Dot />
            </h2>
            <p className="mt-6 max-w-2xl text-lg leading-relaxed text-canvas/85 md:text-xl">
              Hyperion es una secuoya roja de casi 116 metros en California. No creció de golpe: creció sobre una base sólida, un anillo a la vez. Así construimos software.
            </p>
          </Move>
          <Move y={[200, -20]} className="mt-12 grid max-w-3xl grid-cols-3 gap-6 border-t border-canvas/30 pt-6">
            {[
              ["116 m", "el árbol más alto conocido"],
              ["2016", "el año en que empezamos"],
              ["1", "equipo de principio a fin"],
            ].map(([n, l]) => (
              <div key={l}>
                <div className="display text-3xl md:text-4xl">{n}</div>
                <div className="mt-1 text-[14px] text-canvas/75">{l}</div>
              </div>
            ))}
          </Move>
        </div>
      </Scene>

      {/* Tijuana: la foto entra de lado y el texto del otro */}
      <Scene className="overflow-hidden py-24 md:py-36">
        <div className="container grid items-center gap-12 lg:grid-cols-[1.2fr_1fr] lg:gap-20">
          <Move x={[-120, 20]} className="relative">
            <div className="relative aspect-[4/3] overflow-hidden rounded-[24px] border border-ink/15">
              <Move x={[40, -40]} s={[1.15, 1.15]} className="absolute inset-0">
                <Image src={fotoTijuana} alt="Vista de Tijuana desde una avenida en lo alto" placeholder="blur" fill sizes="(min-width: 1024px) 55vw, 92vw" className="object-cover" />
              </Move>
            </div>
            <Move x={[80, -20]} className="absolute -right-4 -bottom-6 md:-right-10">
              <div className="notif px-5 py-4">
                <div className="eyebrow !text-[11px] text-grey-500">Base</div>
                <div className="mt-1 font-bold">Tijuana, Baja California</div>
                <div className="mono mt-0.5 text-[12px] text-grey-500">32.5149° N · 117.0382° O</div>
              </div>
            </Move>
          </Move>
          <Move x={[120, -10]}>
            <p className="eyebrow text-grey-500">Dónde estamos</p>
            <h2 className="display mt-4 text-[clamp(2.4rem,5vw,4.4rem)]">
              Desde Tijuana,
              <br />
              <span className="inline-block -rotate-1 rounded-lg bg-pink px-2">para todo México</span>
              <Dot />
            </h2>
            <p className="mt-6 text-lg leading-relaxed text-grey-700">
              Somos un equipo de desarrollo y soporte en Tijuana, Baja California. Trabajamos de cerca con cada cliente, en persona o a distancia, para entender su operación y entregar soluciones que de verdad se usan.
            </p>
          </Move>
        </div>
      </Scene>
    </section>
  )
}

/* ───────────────────────── Contacto ───────────────────────── */
const needs = ["Sistema a la medida", "Punto de venta", "Automatización", "Servicio técnico", "Sitio web / marketing", "Otro"]

function Contact() {
  const [form, setForm] = useState({ name: "", email: "", phone: "", need: needs[0], message: "" })
  const [status, setStatus] = useState("idle")
  const onChange = (e) => setForm({ ...form, [e.target.name]: e.target.value })
  const summary = `Interés: ${form.need}\nTeléfono: ${form.phone || "—"}\n\n${form.message}`

  const onSubmit = async (e) => {
    e.preventDefault()
    setStatus("sending")
    try {
      const res = await fetch("/api/send-email", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: form.name, email: form.email, message: summary }),
      })
      if (!res.ok) throw new Error("Error al enviar")
      window.location.href = "/gracias"
    } catch (err) {
      console.error(err)
      setStatus("error")
    }
  }

  const label = "mb-2 block text-[14px] font-bold"

  return (
    <section id="contacto" className="relative overflow-hidden border-t border-ink/10 bg-paper-2 py-24 md:py-36">
      <Rings className="pointer-events-none absolute -top-48 -left-40 h-[680px] w-[680px]" stroke="#f5f4f0" opacity={1} />
      <div className="container relative grid gap-14 lg:grid-cols-[1fr_1.1fr] lg:gap-20">
        <div>
          <Head
            small
            eyebrow="Contacto"
            title={
              <>
                Cuéntanos qué
                <br />
                quieres construir
              </>
            }
            text="Empezamos con un diagnóstico de tu negocio. Después, un plan con tiempos y costos definidos."
          />
          <Reveal className="mt-10 divide-y divide-ink/15 border-y border-ink/15">
            {[
              [MessageCircle, "WhatsApp", "Respuesta rápida", WHATSAPP, "#141414"],
              [Mail, "info@hyperionmkt.com", "Escríbenos", "mailto:info@hyperionmkt.com", "#141414"],
              [Phone, "+52 664 579 8903", "Llámanos", "tel:+526645798903", "#141414"],
            ].map(([Icon, t, d, href]) => (
              <a key={t} href={href} target={href.startsWith("http") ? "_blank" : undefined} rel="noopener noreferrer" className="group flex items-center gap-4 py-5">
                <span className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-[14px] border border-ink/15 bg-ink text-canvas`}>
                  <Icon className="h-5 w-5" />
                </span>
                <span className="flex-1">
                  <span className="block text-lg font-bold tracking-[-0.02em]">{t}</span>
                  <span className="text-[14px] text-grey-700">{d}</span>
                </span>
                <ArrowUpRight className="h-5 w-5 text-grey-500 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-ink" />
              </a>
            ))}
          </Reveal>
        </div>

        <Reveal delay={100}>
          <form onSubmit={onSubmit} className="card !rounded-[24px] p-6 md:p-10">
            <h3 className="text-2xl font-bold tracking-[-0.03em]">Cotiza tu proyecto</h3>
            <div className="mt-7 grid gap-5 md:grid-cols-2">
              <label className="block">
                <span className={label}>Nombre</span>
                <input name="name" required value={form.name} onChange={onChange} autoComplete="name" placeholder="Tu nombre" className="field" />
              </label>
              <label className="block">
                <span className={label}>Email</span>
                <input name="email" type="email" required value={form.email} onChange={onChange} autoComplete="email" placeholder="tu@negocio.com" className="field" />
              </label>
              <label className="block md:col-span-2">
                <span className={label}>
                  Teléfono <span className="font-normal text-grey-500">(opcional)</span>
                </span>
                <input name="phone" type="tel" value={form.phone} onChange={onChange} autoComplete="tel" placeholder="664 000 0000" className="field" />
              </label>
            </div>
            <fieldset className="mt-6">
              <legend className={label}>¿Qué necesitas?</legend>
              <div className="flex flex-wrap gap-2">
                {needs.map((n) => (
                  <label
                    key={n}
                    className={`cursor-pointer rounded-full border border-ink/15 px-4 py-2 text-[14px] font-medium transition-colors has-[:focus-visible]:outline-[3px] has-[:focus-visible]:outline-offset-2 has-[:focus-visible]:outline-pink ${
                      form.need === n ? "bg-ink text-canvas" : "bg-white text-ink hover:bg-paper-2"
                    }`}
                  >
                    <input type="radio" name="need" value={n} checked={form.need === n} onChange={onChange} className="sr-only" />
                    {n}
                  </label>
                ))}
              </div>
            </fieldset>
            <label className="mt-6 block">
              <span className={label}>Mensaje</span>
              <textarea name="message" required rows={5} value={form.message} onChange={onChange} placeholder="Cuéntanos de tu negocio y qué te gustaría resolver" className="field resize-none" />
            </label>
            {status === "error" && (
              <p role="alert" className="mt-4 rounded-[10px] border border-ink/15 bg-pink/20 px-4 py-3 text-sm font-medium">
                No pudimos enviar tu mensaje. Inténtalo de nuevo o escríbenos por WhatsApp.
              </p>
            )}
            <div className="mt-8 grid gap-4 sm:grid-cols-2">
              <button type="submit" disabled={status === "sending"} className="bt bt-pink w-full whitespace-nowrap !px-4 disabled:opacity-70">
                {status === "sending" ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin" /> Enviando…
                  </>
                ) : (
                  <>
                    Enviar por correo <ArrowRight className="h-4 w-4" />
                  </>
                )}
              </button>
              <a href={wa(`Hola Hyperion, soy ${form.name || "…"}.\n${summary}`)} target="_blank" rel="noopener noreferrer" className="bt bt-line w-full whitespace-nowrap !px-4">
                <MessageCircle className="h-4 w-4" /> Enviar por WhatsApp
              </a>
            </div>
          </form>
        </Reveal>
      </div>
    </section>
  )
}

/* ───────────────────────── Pie ───────────────────────── */
function Footer() {
  const col = "space-y-2.5 text-[14px] text-grey-300"
  const a = "transition-colors hover:text-canvas"
  return (
    <Scene as="footer" className="overflow-hidden bg-ink pt-20 text-canvas">
      <div className="container">
        <div className="grid gap-10 border-b border-canvas/20 pb-12 md:grid-cols-[1.5fr_1fr_1fr_1fr]">
          <div>
            <Logo variant="reverse" className="-ml-2 h-14" />
            <p className="mt-3 max-w-xs text-[15px] text-grey-300">Software que hace crecer tu negocio. Desde Tijuana para todo México.</p>
            <Link href="#contacto" className="bt bt-pink bt-inv bt-sm mt-6">
              Cotizar proyecto
            </Link>
          </div>
          <div>
            <h4 className="eyebrow mb-4 text-grey-500">Productos</h4>
            <ul className={col}>
              {products.map((p) => (
                <li key={p.name}>
                  {p.live ? (
                    <a href={p.live} target="_blank" rel="noopener noreferrer" className={a}>
                      {p.name}
                    </a>
                  ) : (
                    <a href="#productos" className={a}>
                      {p.name}
                    </a>
                  )}
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="eyebrow mb-4 text-grey-500">Servicios</h4>
            <ul className={col}>
              <li><Link href="/servicios/sistemas-a-medida" className={a}>Sistemas a la medida</Link></li>
              <li><Link href="#servicios" className={a}>Puntos de venta</Link></li>
              <li><Link href="#automatizar" className={a}>Automatizaciones</Link></li>
              <li><Link href="#servicios" className={a}>Servicio técnico</Link></li>
              <li><Link href="/servicios/desarrollo-web" className={a}>Desarrollo web</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="eyebrow mb-4 text-grey-500">Contacto</h4>
            <ul className={col}>
              <li><a href="mailto:info@hyperionmkt.com" className={a}>info@hyperionmkt.com</a></li>
              <li><a href="tel:+526645798903" className={a}>+52 664 579 8903</a></li>
              <li><a href={WHATSAPP} target="_blank" rel="noopener noreferrer" className={a}>WhatsApp</a></li>
              <li><Link href="/trafico" className={a}>Tráfico de nuestros sitios</Link></li>
            </ul>
          </div>
        </div>
      </div>
      {/* el nombre, gigante y recortado en el borde inferior, cruza de lado mientras llegas al final */}
      <div className="relative h-[15vw] overflow-hidden pt-4" aria-hidden="true">
        <Move x={[10, 0]} unit="vw" className="pointer-events-none whitespace-nowrap select-none">
          <span className="display block px-[4vw] text-[17.5vw] leading-[0.85] text-canvas">
            hyperion<Dot />
          </span>
        </Move>
      </div>
      <div className="container flex flex-col justify-between gap-2 border-t border-canvas/20 py-6 text-[13px] text-grey-500 md:flex-row">
        <p>© {new Date().getFullYear()} Hyperion Software · Tijuana, B.C.</p>
        <a href="#inicio" className="hover:text-canvas">
          Volver arriba ↑
        </a>
      </div>
    </Scene>
  )
}

export default function Home() {
  useMouseDepth()
  return (
    <div className="relative">
      <Navbar />
      <main>
        {/* el hero conserva su propio estilo: se queda fuera de .hy */}
        <div className="tema-oscuro">
          <Hero />
        </div>
        <div className="hy">
          <Numbers />
          <Products />
          <InTheWild />
          <Services />
          <Automation />
          <Process />
          <Studio />
          <Contact />
        </div>
      </main>
      <div className="hy">
        <Footer />
        <a
          href={WHATSAPP}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Escríbenos por WhatsApp"
          className="fixed right-5 bottom-5 z-50 flex h-13 w-13 items-center justify-center rounded-[16px] bg-pink text-ink transition-transform hover:scale-105"
        >
          <MessageCircle className="h-6 w-6" />
        </a>
      </div>
    </div>
  )
}
