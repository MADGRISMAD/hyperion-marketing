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
import { ORG_ID } from "../lib/site"
import Hero from "../components/landing/HeroVideo"
import { IPhone, MacBook3D, Notif } from "../components/landing/Devices"
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
    { n: 10, s: "", label: "años construyendo software" },
    { n: 9, s: "", label: "productos propios, diseñados y construidos aquí" },
    { n: 6, s: "", label: "productos en línea que puedes probar hoy" },
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
    name: "Faro",
    by: true,
    logo: "/productos/logos/faro.svg",
    cat: "Blog con IA",
    bg: "#ffffff",
    fg: "ink",
    live: "https://faro.hyperionmkt.com",
    liveLabel: "Faro",
    tagline: "Tu blog, escrito solo.",
    description: "Pegas la dirección de tu sitio y la IA investiga tu negocio, elige los temas y escribe y publica artículos con imagen, a la frecuencia que tú elijas: uno, dos o tres por semana.",
    features: ["Brand DNA sugerido por la IA, que tú ajustas", "Piloto automático con ritmo prudente; en salud, legal y finanzas queda en borrador", "Analytics reales con Google Search Console"],
    mascot: "/productos/faro-mascota.png",
    web: [faroWeb, "Página de inicio de Faro"],
    phone: [faroMovil, "Panel de Faro en el celular con la próxima publicación"],
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

// Cada producto con sitio propio, como aplicación de la organización (solo datos que ya muestra la página)
const productsLd = {
  "@context": "https://schema.org",
  "@graph": products
    .filter((p) => p.live)
    .map((p) => ({
      "@type": "SoftwareApplication",
      name: p.name,
      // las direcciones temporales (*.sslip.io) no se publican como URL del producto
      ...(p.live.includes("sslip.io") ? {} : { url: p.live }),
      description: p.description,
      applicationCategory: { Caresia: "HealthApplication", "Camión TJ": "TravelApplication" }[p.name] || "BusinessApplication",
      operatingSystem: "Web",
      creator: { "@id": ORG_ID },
    })),
}

// ── Productos: una MacBook que se abre con el scroll y luego muestra cada producto ──
// Escritorio sin movimiento reducido: la sección se fija; el primer tramo abre la tapa y cada tramo siguiente
// cambia la portada de la pantalla, la ficha y el selector. Móvil o movimiento reducido: la MacBook ya abierta
// y el selector cambia de producto con un clic (el mismo contenido, sin fijar la sección).
const OPEN = 1 // tramos de scroll que tarda la tapa en abrirse
const STEPS = products.length + 1 // los nueve productos y «el tuyo»
const STEP_VH = 90 // alto de scroll de cada tramo
const LID_CLOSED = -88 // grados: la tapa casi plana sobre la base
// ease-in-out cúbico: la tapa arranca suave, gana velocidad y se asienta
const inOut = (k) => (k < 0.5 ? 4 * k * k * k : 1 - Math.pow(-2 * k + 2, 3) / 2)
const twoDigits = (n) => String(n).padStart(2, "0")

function ProductInfo({ p, i }) {
  return (
    <>
      <div className="flex flex-wrap items-center gap-2">
        <span className="tag">
          {twoDigits(i + 1)} · {p.cat}
        </span>
        <span className="tag !flex items-center gap-1.5 !bg-white">
          <span className="h-2 w-2 shrink-0 rounded-full border border-ink" style={{ background: p.live ? "#141414" : "#ff3d7f" }} />
          {p.live ? "En línea" : "Demo bajo pedido"}
        </span>
      </div>
      <div className="mt-6 flex items-center gap-4">
        {p.logo && <img src={p.logo} alt="" width={56} height={56} className="h-14 w-14 shrink-0 rounded-2xl object-contain" />}
        <h3 className="display text-[clamp(2.2rem,3.6vw,3.4rem)]">
          {p.name}
          {p.by && (
            <>
              {" "}
              <small className="ml-1 align-baseline font-sans text-[0.32em] font-bold tracking-normal text-ink/60">by Hyperion</small>
            </>
          )}
        </h3>
      </div>
      <p className="mt-4 text-xl leading-snug font-bold tracking-[-0.02em] md:text-2xl">{p.tagline}</p>
      <p className="mt-3 max-w-xl leading-relaxed text-ink/80">{p.description}</p>
      <ul className="mt-6 space-y-2 text-[15px] text-ink/85 [@media(max-height:760px)]:hidden">
        {p.features.map((f) => (
          <li key={f} className="flex gap-2.5">
            <span className="mt-[7px] h-2.5 w-2.5 shrink-0 rounded-full border border-ink/30 bg-pink" />
            {f}
          </li>
        ))}
      </ul>
      <div className="mt-8">
        {p.live ? (
          <a href={p.live} target="_blank" rel="noopener noreferrer" className="bt bt-white bt-sm">
            Visitar {p.liveLabel || p.live.replace("https://", "")} <ArrowUpRight className="h-4 w-4" />
          </a>
        ) : (
          <a href={wa(`Hola Hyperion, me gustaría ver una demo de ${p.name}`)} target="_blank" rel="noopener noreferrer" aria-label={`Pedir una demo de ${p.name} por WhatsApp`} className="bt bt-white bt-sm">
            Pedir una demo <ChevronRight className="h-4 w-4" />
          </a>
        )}
      </div>
    </>
  )
}

// ── iPhone: al cambiar de proyecto, sale a la pantalla de inicio y abre la siguiente app desde su icono ──
// Como en iOS: la app actual se encoge hacia su icono mientras aparece el inicio, se «toca» el icono siguiente y
// esa app crece desde él. Si el proyecto cambia a media animación, al terminar va directo al último pedido.
// Con movimiento reducido solo hay un fundido. Es una ilustración: los lectores de pantalla la ignoran.
const EASE_IOS = "cubic-bezier(0.32, 0.72, 0, 1)" // curva tipo iOS (Ionic)
const appIcon = (p) => (p ? { logo: p.logo, label: p.name, bg: p.logo ? "#ffffff" : "#141414", text: p.name.slice(0, 2) } : { label: "Tu app", bg: "#ff3d7f", text: "+" })

function PhoneApps({ active, reduced }) {
  const screen = useRef(null)
  const home = useRef(null)
  const app = useRef(null)
  const icons = useRef([])
  const shown = useRef(active)
  const busy = useRef(false)
  const wanted = useRef(active)
  const items = [...products, null] // el último es «tu app»

  const showOnly = (i) => app.current?.querySelectorAll("[data-app]").forEach((el) => (el.style.opacity = Number(el.dataset.app) === i ? "1" : "0"))
  // transformación que lleva la pantalla completa al lugar y tamaño del icono i
  const toIcon = (i) => {
    const s = screen.current.getBoundingClientRect()
    const r = icons.current[i].getBoundingClientRect()
    const k = r.width / s.width
    return `translate(${(r.left + r.width / 2 - (s.left + s.width / 2)).toFixed(1)}px, ${(r.top + r.height / 2 - (s.top + s.height / 2)).toFixed(1)}px) scale(${k.toFixed(3)})`
  }

  useEffect(() => {
    wanted.current = active
    if (reduced) {
      shown.current = active
      showOnly(active)
      return
    }
    const run = async () => {
      if (busy.current || shown.current === wanted.current || !screen.current) return
      busy.current = true
      const from = shown.current
      const to = wanted.current
      const opts = (duration) => ({ duration, easing: EASE_IOS, fill: "forwards" })
      // se descartan las animaciones anteriores para medir los iconos en su lugar real (sin escala)
      ;[app.current, home.current].forEach((el) => el.getAnimations().forEach((a) => a.cancel()))
      try {
        // 1) salir al inicio: la app se encoge hacia su icono y el inicio aparece desde un poco más cerca
        await Promise.all([
          app.current.animate([{ transform: "none", opacity: 1 }, { transform: toIcon(from), opacity: 0 }], opts(360)).finished,
          home.current.animate([{ transform: "scale(1.12)", opacity: 0 }, { transform: "none", opacity: 1 }], opts(360)).finished,
        ])
        // 2) se toca el icono de la siguiente
        await new Promise((r) => setTimeout(r, 120))
        await icons.current[to].animate([{ transform: "none" }, { transform: "scale(0.86)" }, { transform: "none" }], { duration: 220, easing: "ease-out" }).finished
        // 3) la app nueva crece desde su icono
        showOnly(to)
        await Promise.all([
          app.current.animate([{ transform: toIcon(to), opacity: 0 }, { transform: "none", opacity: 1 }], opts(420)).finished,
          home.current.animate([{ transform: "none", opacity: 1 }, { transform: "scale(0.94)", opacity: 0 }], opts(420)).finished,
        ])
        shown.current = to
      } catch {
        // animación cancelada (la sección se desmontó): el estado se arregla en la siguiente vuelta
      } finally {
        busy.current = false
      }
      if (wanted.current !== shown.current) run()
    }
    run()
  }, [active, reduced])

  return (
    <IPhone>
      <div ref={screen} className="absolute inset-0 overflow-hidden" aria-hidden="true">
        {/* pantalla de inicio */}
        <div ref={home} className="absolute inset-0 bg-[#1c1c1c] px-[9%] pt-[24%] opacity-0">
          <div className="absolute top-[3.2%] left-[11%] text-[clamp(6px,0.75vw,11px)] font-semibold text-white">9:41</div>
          <div className="grid grid-cols-4 gap-x-[12%] gap-y-[7%]">
            {items.map((p, i) => {
              const ic = appIcon(p)
              return (
                <div key={ic.label} className="flex flex-col items-center gap-[3px]">
                  <span ref={(el) => (icons.current[i] = el)} className="flex aspect-square w-full items-center justify-center overflow-hidden rounded-[22%] text-[clamp(7px,0.9vw,13px)] font-bold text-white" style={{ background: ic.bg }}>
                    {ic.logo ? <img src={ic.logo} alt="" className="h-full w-full object-contain" /> : ic.text}
                  </span>
                  <span className="w-full truncate text-center text-[clamp(4px,0.5vw,7px)] text-white/85">{ic.label}</span>
                </div>
              )
            })}
          </div>
        </div>
        {/* la app abierta: todas apiladas; se ve solo la actual */}
        <div ref={app} className="absolute inset-0">
          {items.map((p, i) => (
            // la visible es la que el teléfono está mostrando (la animación decide cuándo cambia), no la activa
            <div key={i} data-app={i} className={`absolute inset-0 ${reduced ? "transition-opacity duration-300" : ""}`} style={{ opacity: i === (reduced ? active : shown.current) ? 1 : 0 }}>
              {p?.phone ? (
                <Image src={p.phone[0]} alt="" fill sizes="(min-width: 1024px) 220px, 34vw" className="object-cover object-top" />
              ) : (
                <div className="flex h-full flex-col items-center justify-center gap-3" style={{ background: p ? "#141414" : "#ff3d7f" }}>
                  <span className="flex aspect-square w-[34%] items-center justify-center overflow-hidden rounded-[22%] text-[clamp(10px,1.4vw,20px)] font-bold" style={{ background: appIcon(p).bg, color: p ? "#fff" : "#141414" }}>
                    {appIcon(p).logo ? <img src={appIcon(p).logo} alt="" className="h-full w-full object-contain" /> : appIcon(p).text}
                  </span>
                  <span className={`text-[clamp(7px,0.9vw,13px)] font-semibold ${p ? "text-white" : "text-ink"}`}>{appIcon(p).label}</span>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </IPhone>
  )
}

function Products() {
  const lid = useRef(null)
  const screen = useRef(null)
  const phone = useRef(null)
  const count = useRef(null)
  const bar = useRef(null)
  const tabs = useRef([])
  const [pinned, setPinned] = useState(false) // escritorio y sin movimiento reducido
  const [reducedPref, setReducedPref] = useState(false)
  const [active, setActive] = useState(0)
  const [seen, setSeen] = useState(2) // portadas que ya se pueden cargar: la actual y la siguiente
  useEffect(() => setSeen((s) => Math.max(s, active + 2)), [active])
  useEffect(() => {
    const wide = window.matchMedia("(min-width: 1024px)")
    const still = window.matchMedia("(prefers-reduced-motion: reduce)")
    const update = () => {
      setPinned(wide.matches && !still.matches)
      setReducedPref(still.matches)
    }
    update()
    wide.addEventListener("change", update)
    still.addEventListener("change", update)
    return () => {
      wide.removeEventListener("change", update)
      still.removeEventListener("change", update)
    }
  }, [])
  // sin recorrido fijado, la MacBook se queda abierta y encendida
  useEffect(() => {
    if (pinned) return
    if (lid.current) lid.current.style.transform = ""
    if (screen.current) screen.current.style.opacity = ""
    if (phone.current) phone.current.style.cssText = ""
  }, [pinned])

  const onProgress = (p) => {
    if (!pinned) return
    const u = p * (OPEN + STEPS)
    const k = Math.min(1, u / OPEN)
    if (lid.current) lid.current.style.transform = `rotateX(${(LID_CLOSED * (1 - inOut(k))).toFixed(2)}deg)`
    // la pantalla se enciende en el último tramo de la apertura
    const on = Math.max(0, Math.min(1, (k - 0.55) / 0.45))
    if (screen.current) screen.current.style.opacity = on.toFixed(3)
    // el iPhone llega cuando la pantalla de la laptop se enciende
    if (phone.current) {
      phone.current.style.opacity = on.toFixed(3)
      phone.current.style.transform = `translate3d(0, ${((1 - on) * 28).toFixed(1)}px, 0)`
    }
    const i = Math.max(0, Math.min(STEPS - 1, Math.floor(u - OPEN)))
    setActive((a) => (a === i ? a : i))
    if (count.current) count.current.textContent = twoDigits(i + 1)
    if (bar.current) bar.current.style.transform = `scaleX(${p.toFixed(3)})`
  }

  // elegir un producto: con el recorrido fijado, el scroll va al tramo de ese producto; si no, cambia en el lugar
  const go = (i, focus = false) => {
    const n = (i + STEPS) % STEPS
    if (focus) tabs.current[n]?.focus()
    if (!pinned) return setActive(n)
    const el = document.getElementById("productos")
    const top = el.getBoundingClientRect().top + window.scrollY
    window.scrollTo({ top: top + (el.offsetHeight - window.innerHeight) * ((OPEN + n + 0.5) / (OPEN + STEPS)), behavior: "smooth" })
  }
  const onKeyDown = (e) => {
    const map = { ArrowRight: active + 1, ArrowDown: active + 1, ArrowLeft: active - 1, ArrowUp: active - 1, Home: 0, End: STEPS - 1 }
    if (!(e.key in map)) return
    e.preventDefault()
    go(map[e.key], true)
  }

  const faro = products.findIndex((p) => p.mascot)
  return (
    <Scene id="productos" mode={pinned ? "pin" : "pass"} onProgress={onProgress} className="relative bg-paper-2" style={pinned ? { height: `${(OPEN + STEPS) * STEP_VH + 100}vh` } : undefined}>
      <div className={pinned ? "sticky top-0 flex h-screen flex-col pt-24 pb-8 [@media(max-height:800px)]:pt-20" : "py-20"}>
        <div className="container flex items-end justify-between gap-6">
          <div>
            <p className="eyebrow text-grey-500">Productos propios</p>
            <h2 className="display mt-3 text-[clamp(2.4rem,4.6vw,4rem)] lg:[@media(max-height:800px)]:text-[2.6rem]">
              Nueve productos. <span className="text-grey-500">Hechos por nosotros</span>
              <Dot />
            </h2>
          </div>
          {pinned && (
            <div className="hidden w-48 shrink-0 lg:block" aria-hidden="true">
              <div className="mono flex items-baseline justify-between text-sm">
                <span ref={count}>01</span>
                <span>{twoDigits(STEPS)}</span>
              </div>
              <div className="mt-2 h-1.5 rounded-full border border-ink/15 bg-white">
                <div ref={bar} className="h-full origin-left rounded-full bg-pink" style={{ transform: "scaleX(0)" }} />
              </div>
            </div>
          )}
        </div>

        <div className={`container mt-10 grid gap-10 lg:mt-8 lg:grid-cols-[minmax(0,1.15fr)_minmax(0,0.85fr)] lg:items-center lg:gap-14 ${pinned ? "min-h-0 flex-1" : ""}`}>
          <div className="min-w-0">
            <div className="relative mx-auto w-[88%] lg:w-[min(88%,calc((100svh-25rem)*1.55))]">
              <img
                src={products[faro].mascot}
                alt=""
                width={900}
                height={507}
                loading="lazy"
                className={`pointer-events-none absolute right-[8%] bottom-[calc(100%-6px)] z-10 w-[30%] drop-shadow-[0_14px_14px_rgba(232,51,109,0.22)] transition-opacity duration-300 ${active === faro ? "opacity-100" : "opacity-0"}`}
              />
              <div ref={phone} className="absolute -right-[6%] -bottom-[6%] z-20 w-[28%] lg:w-[22%]">
                <PhoneApps active={active} reduced={!pinned && reducedPref} />
              </div>
              <MacBook3D lidRef={lid} screenRef={screen}>
                {products.map((p, i) =>
                  i < seen ? (
                    <Image
                      key={p.name}
                      src={p.web[0]}
                      alt={i === active ? p.web[1] : ""}
                      fill
                      placeholder="blur"
                      sizes="(min-width: 1024px) 720px, 92vw"
                      className={`object-cover object-top transition-opacity duration-300 ease-out ${i === active ? "opacity-100" : "opacity-0"}`}
                    />
                  ) : null,
                )}
                <div className={`absolute inset-0 flex items-center justify-center bg-ink transition-opacity duration-300 ease-out ${active === STEPS - 1 ? "opacity-100" : "opacity-0"}`} aria-hidden="true">
                  <span className="display text-[clamp(1.6rem,3vw,2.6rem)] text-canvas">
                    tu idea<Dot />
                  </span>
                </div>
              </MacBook3D>
            </div>

            <div role="tablist" aria-label="Productos" aria-orientation="horizontal" onKeyDown={onKeyDown} className="mt-24 flex gap-2 overflow-x-auto pb-1 [scrollbar-width:none] lg:mt-12 lg:flex-wrap lg:justify-center lg:overflow-visible">
              {[...products.map((p) => p.name), "¿El tuyo?"].map((name, i) => (
                <button
                  key={name}
                  ref={(el) => (tabs.current[i] = el)}
                  role="tab"
                  id={`producto-tab-${i}`}
                  aria-selected={i === active}
                  aria-controls={`producto-panel-${i}`}
                  tabIndex={i === active ? 0 : -1}
                  onClick={() => go(i)}
                  className={`shrink-0 cursor-pointer rounded-full border px-3.5 py-2 text-[14px] font-medium whitespace-nowrap transition-colors duration-150 ${i === active ? "border-ink bg-ink text-canvas" : "border-ink/15 bg-white text-ink hover:border-ink/40"}`}
                >
                  {name}
                </button>
              ))}
            </div>
          </div>

          {/* fichas apiladas en la misma celda: se cruzan con opacidad y la inactiva no se puede enfocar */}
          <div className="grid min-w-0">
            {products.map((p, i) => (
              <div
                key={p.name}
                role="tabpanel"
                id={`producto-panel-${i}`}
                aria-labelledby={`producto-tab-${i}`}
                inert={i !== active}
                className={`[grid-area:1/1] transition-[opacity,visibility] duration-300 ease-out ${i === active ? "visible opacity-100" : "invisible opacity-0"}`}
              >
                <ProductInfo p={p} i={i} />
              </div>
            ))}
            <div
              role="tabpanel"
              id={`producto-panel-${STEPS - 1}`}
              aria-labelledby={`producto-tab-${STEPS - 1}`}
              inert={active !== STEPS - 1}
              className={`[grid-area:1/1] transition-[opacity,visibility] duration-300 ease-out ${active === STEPS - 1 ? "visible opacity-100" : "invisible opacity-0"}`}
            >
              <span className="tag">{twoDigits(STEPS)} · ¿El tuyo?</span>
              <h3 className="display mt-6 text-[clamp(2.4rem,4vw,3.8rem)]">
                El décimo puede ser <span className="inline-block -rotate-1 rounded-lg bg-pink px-2">tu idea</span>
                <Dot />
              </h3>
              <p className="mt-5 max-w-md text-lg text-ink/80">El mismo equipo que construyó estos nueve, trabajando en el tuyo.</p>
              <Link href="#contacto" className="bt bt-pink mt-8">
                Cotizar proyecto <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
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
          eyebrow="Para negocios como estos"
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
  return <Reveal className={`card relative overflow-hidden p-7 transition-transform duration-200 motion-safe:hover:-translate-y-1 md:p-9 ${className}`}>{children}</Reveal>
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
                    <span className="text-[13px] font-semibold text-grey-500">Ventas de la semana · ejemplo</span>
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
            <p className="mt-3 text-grey-700">Instalación y personalización para tiendas, restaurantes y comercios, con sistema propio en la nube: <a href="https://mitiendita.software" target="_blank" rel="noopener noreferrer" className="link-pink">Mitiendita</a>.</p>
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
  // sin el recorrido animado (móvil, movimiento reducido o antes de hidratar) se muestran los cinco pasos completos
  const [all, setAll] = useState(true)
  const onProgress = (p, reduced) => {
    const wide = window.innerWidth >= 1024 && !reduced
    const next = wide ? Math.min(flow.length - 1, Math.floor(p * flow.length * 1.1)) : flow.length - 1
    setActive((a) => (a === next ? a : next))
    setAll((a) => (a === !wide ? a : !wide))
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
                  all ? "border-transparent opacity-100" : i === active ? "border-canvas bg-white/10 opacity-100" : i < active ? "border-transparent opacity-60" : "border-transparent opacity-35"
                }`}
              >
                <span className="mono text-[13px] text-pink">0{i + 1} /</span>
                <span>
                  <span className="block font-bold">{f.step}</span>
                  {(all || i === active) && <span className="mt-1 block text-[15px] text-grey-300">{f.text}</span>}
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
                <div key={f.step} className="notif-in">
                  <Notif app={f.app} color={f.color} icon={f.icon} time={i === active ? "ahora" : `hace ${(active - i) * 2} s`} title={f.title} text={f.body} className="!w-full !rounded-[22px] !p-3" />
                </div>
              ))}
            </div>
          </IPhone>
          <p className="mono mt-6 text-center text-[12px] tracking-[0.12em] text-grey-300 uppercase">Notificaciones de ejemplo</p>
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
              El nombre viene de Hyperion, una secuoya roja de unos 116 metros en California. No creció de golpe: creció sobre una base sólida, un anillo a la vez. Así construimos software.
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
                <div className="eyebrow !text-[12px] text-grey-500">Base</div>
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
              Hyperion Software es un equipo de desarrollo y soporte en Tijuana, Baja California, desde 2016. Trabajamos de cerca con cada cliente, en persona o a distancia, para entender su operación y entregar soluciones que de verdad se usan.
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
          <form onSubmit={onSubmit} className="card p-6 md:p-10">
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
            <p className="mt-6 text-[13px] text-grey-500">
              Usamos tus datos solo para responderte. Consulta el <Link href="/privacidad" className="link-pink">aviso de privacidad</Link>.
            </p>
            <div className="mt-6 grid gap-4 sm:grid-cols-2">
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
            <h3 className="eyebrow mb-4 text-grey-300">Productos</h3>
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
            <h3 className="eyebrow mb-4 text-grey-300">Servicios</h3>
            <ul className={col}>
              <li><Link href="/servicios/sistemas-a-medida" className={a}>Sistemas a la medida</Link></li>
              <li><Link href="#servicios" className={a}>Puntos de venta</Link></li>
              <li><Link href="#automatizar" className={a}>Automatizaciones</Link></li>
              <li><Link href="#servicios" className={a}>Servicio técnico</Link></li>
              <li><Link href="/servicios/desarrollo-web" className={a}>Desarrollo web</Link></li>
              <li><Link href="/servicios/marketing-digital" className={a}>Marketing digital</Link></li>
              <li><Link href="/servicios/consultoria-it" className={a}>Consultoría IT</Link></li>
              <li><Link href="/servicios" className={a}>Todos los servicios</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="eyebrow mb-4 text-grey-300">Contacto</h3>
            <ul className={col}>
              <li><a href="mailto:info@hyperionmkt.com" className={a}>info@hyperionmkt.com</a></li>
              <li><a href="tel:+526645798903" className={a}>+52 664 579 8903</a></li>
              <li><a href={WHATSAPP} target="_blank" rel="noopener noreferrer" className={a}>WhatsApp</a></li>
              <li><Link href="/trafico" className={a}>Tráfico de nuestros sitios</Link></li>
              <li><Link href="/blog" className={a}>Blog</Link></li>
              <li><Link href="/faro" className={a}>Cómo funciona Faro</Link></li>
              <li><Link href="/privacidad" className={a}>Aviso de privacidad</Link></li>
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
      <div className="container">
        <div className="flex flex-col justify-between gap-2 border-t border-canvas/20 py-6 text-[13px] text-grey-300 md:flex-row">
          <p>© {new Date().getFullYear()} Hyperion Software · Tijuana, B.C.</p>
          <a href="#inicio" className="hover:text-canvas">
            Volver arriba ↑
          </a>
        </div>
      </div>
    </Scene>
  )
}

export default function Home() {
  useMouseDepth()
  return (
    <div className="relative">
      <a href="#contenido" className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-[80] focus:rounded-lg focus:bg-ink focus:px-4 focus:py-2 focus:text-canvas">
        Saltar al contenido
      </a>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(productsLd) }} />
      <Navbar />
      <main id="contenido">
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
