"use client"
import { useState } from "react"
import Link from "next/link"
import {
  ArrowRight,
  ArrowUpRight,
  Code2,
  MessageCircle,
  ShoppingCart,
  Wrench,
  Zap,
  Search,
  PenTool,
  Rocket,
  LifeBuoy,
  Loader2,
} from "lucide-react"
import Navbar, { Logo } from "../components/landing/Navbar"
import Hero from "../components/landing/Hero"
import Intro from "../components/landing/Intro"
import { Reveal, CountUp } from "../components/landing/parallax"
import { TienditaMockup, RestauranteMockup, InternshipsMockup, CaresiaMockup, BeHiveMockup, MiInfoMockup } from "../components/landing/Mockups"

// URLs temporales: cuando tengan dominio propio, cambiarlas solo aquí.
const CARESIA_URL = "https://caresia.mx/"
const MIRESTAURANTE_URL = "https://mirestaurante-ten.vercel.app/"
const BEHIVE_URL = "https://micolmena-eta.vercel.app/"
const MIINFO_URL = "https://miinfo.15-235-62-27.sslip.io/"

const WHATSAPP = "https://wa.me/526645798903?text=Hola%20Hyperion%2C%20me%20interesa%20cotizar%20un%20proyecto"

// Encabezado de lámina: número de sección, rótulo y titular. `dark` = sobre la noche (titular en cromo).
function SectionHead({ index, tag, title, text, dark = false, compact = false }) {
  return (
    <Reveal className={`mb-14 grid gap-6 md:mb-20 lg:items-end ${compact ? "" : "lg:grid-cols-[1.4fr_1fr]"}`}>
      <div>
        <div className={`spec flex items-center gap-4 ${dark ? "text-paper/50" : "text-ink/50"}`}>
          <span className="text-coral">§{index}</span>
          <span className={`h-px w-10 ${dark ? "bg-paper/25" : "bg-ink/25"}`} />
          <span>{tag}</span>
        </div>
        <h2
          className={`mt-6 font-display text-[2.05rem] leading-[0.95] font-extrabold tracking-[-0.03em] uppercase sm:text-6xl ${compact ? "lg:text-[3.4rem]" : "lg:text-[4.6rem]"} ${dark ? "" : "text-ink"}`}
        >
          {dark ? <span className="chrome">{title}</span> : title}
        </h2>
      </div>
      {text && <p className={`max-w-md text-[17px] leading-relaxed lg:justify-self-end ${dark ? "text-paper/65" : "text-ink/70"}`}>{text}</p>}
    </Reveal>
  )
}

/* ───────────────────────── Marquesina ───────────────────────── */
function Marquee() {
  const items = ["Sistemas a la medida", "Puntos de venta", "Automatizaciones", "Servicio técnico", "Desarrollo web", "Marketing digital"]
  const row = [...items, ...items]
  return (
    <div className="overflow-hidden border-y border-white/10 bg-night py-5" aria-hidden="true">
      <div className="marquee flex w-max items-center whitespace-nowrap">
        {row.map((t, i) => (
          <span key={i} className="flex items-center">
            <span className="px-8 font-display text-2xl font-extrabold uppercase md:text-4xl">
              <span className="chrome">{t}</span>
            </span>
            <span className="relative block h-6 w-6">
              <span className="glint" style={{ left: "50%", top: "50%", "--s": "26px", "--d": `${(i % 6) * 0.9}s` }} />
            </span>
          </span>
        ))}
      </div>
    </div>
  )
}

/* ───────────────────────── Servicios ───────────────────────── */
const services = [
  {
    icon: Code2,
    title: "Sistemas a la medida",
    text: "Software diseñado alrededor de tus procesos, no al revés: ERPs, CRMs, portales, inventarios y paneles de control.",
    points: ["Análisis de tus procesos", "Web y móvil", "Integración con lo que ya usas"],
    href: "/servicios/sistemas-a-medida",
  },
  {
    icon: ShoppingCart,
    title: "Puntos de venta",
    text: "Instalamos y personalizamos puntos de venta para tiendas, restaurantes y comercios, con nuestro propio sistema en la nube.",
    points: ["Lector de código de barras", "Inventario y cortes de caja", "Funciona en PC, tablet o celular"],
    href: "#productos",
  },
  {
    icon: Zap,
    title: "Automatizaciones",
    text: "Eliminamos tareas repetitivas: reportes automáticos, integraciones entre sistemas, bots y flujos de trabajo.",
    points: ["Reportes sin hacerlos a mano", "Conecta tus herramientas", "Menos errores humanos"],
    href: "#automatizaciones",
  },
  {
    icon: Wrench,
    title: "Servicio técnico",
    text: "Soporte, mantenimiento de equipos, redes e instalación. Un equipo que responde cuando lo necesitas.",
    points: ["Mantenimiento de equipos", "Redes e instalación", "Soporte a tus sistemas"],
    href: "#contacto",
  },
]

// Índice de catálogo: una fila por servicio, que se invierte a tinta al pasar el cursor
function Services() {
  return (
    <section id="servicios" className="grain bg-paper py-24 text-ink md:py-32">
      <div className="container">
        <SectionHead
          index="01"
          tag="Servicios"
          title="Todo lo que tu negocio necesita"
          text="Diseñamos, desarrollamos, instalamos y damos soporte. Un solo equipo que conoce tu negocio y te acompaña de principio a fin."
        />
        <ul className="border-b border-ink/15">
          {services.map((s, i) => (
            <li key={s.title}>
              <Reveal delay={i * 60}>
                <Link
                  href={s.href}
                  className="group grid gap-3 border-t border-ink/15 py-7 transition-colors duration-200 md:grid-cols-[72px_1.1fr_1.4fr_1fr_40px] md:items-baseline md:gap-8 md:px-4 md:py-9 md:hover:bg-ink md:hover:text-paper"
                >
                  <span className="spec text-coral">0{i + 1}</span>
                  <h3 className="font-display text-2xl leading-tight font-extrabold uppercase md:text-[1.7rem]">{s.title}</h3>
                  <p className="text-ink/70 transition-colors group-hover:text-current md:group-hover:text-paper/70">{s.text}</p>
                  <ul className="spec space-y-1.5 text-ink/55 md:group-hover:text-paper/55">
                    {s.points.map((p) => (
                      <li key={p}>— {p}</li>
                    ))}
                  </ul>
                  <ArrowUpRight className="hidden h-5 w-5 justify-self-end transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 md:block" />
                </Link>
              </Reveal>
            </li>
          ))}
        </ul>
        <Reveal className="spec mt-8 flex flex-wrap items-center gap-x-8 gap-y-3 text-ink/55">
          <span>También:</span>
          <Link href="/servicios/desarrollo-web" className="text-ink underline decoration-ink/30 underline-offset-4 hover:decoration-coral">
            Desarrollo web
          </Link>
          <Link href="/servicios/marketing-digital" className="text-ink underline decoration-ink/30 underline-offset-4 hover:decoration-coral">
            Marketing digital
          </Link>
          <Link href="/servicios/consultoria-it" className="text-ink underline decoration-ink/30 underline-offset-4 hover:decoration-coral">
            Consultoría IT
          </Link>
        </Reveal>
      </div>
    </section>
  )
}

/* ───────────────────────── Productos ───────────────────────── */
const products = [
  {
    name: "Mitiendita",
    tld: "",
    href: "https://mitiendita.software",
    color: "#e8750c",
    status: "Disponible",
    tagline: "Tu tienda no cierra aunque la compu falle.",
    description:
      "Punto de venta en la nube para abarrotes y comercios. Abre caja desde el celular, la tablet o la PC sin instalar nada: tus ventas, productos y cortes siempre a la mano.",
    features: [
      "Escanea con lector de código de barras o busca por nombre",
      "Atajos de teclado para cobrar en segundos (F12)",
      "Ventas en espera, descuentos y cortes de caja",
      "Prueba gratis, sin tarjeta",
    ],
    Mockup: TienditaMockup,
  },
  {
    name: "Mirestaurante",
    tld: "",
    href: MIRESTAURANTE_URL,
    cta: "Visitar Mirestaurante",
    color: "#c8341b",
    status: "Beta",
    tagline: "Cada comanda, en su lugar.",
    description:
      "Sistema de comandas para restaurantes: del mesero a la cocina y de la cocina a la caja. Toma pedidos desde el celular y míralos llegar al instante, sin papelitos ni gritos.",
    features: [
      "Pedidos desde el celular, directo a cocina",
      "Mapa de mesas con estado en vivo: libre, pidiendo, listo, comiendo",
      "Pase de cocina con el tiempo de cada comanda",
      "Prueba gratis 14 días, sin instalar nada",
    ],
    Mockup: RestauranteMockup,
  },
  {
    name: "internships",
    tld: ".gg",
    href: "https://internships.gg",
    color: "#059669",
    status: "Disponible",
    tagline: "Sube de nivel tu carrera mientras estudias.",
    description:
      "Plataforma para universitarios con misiones reales en empresas reales: trabajos freelance, remotos y por proyecto. Los estudiantes ganan dinero, juntan XP y llenan su portafolio; las empresas encuentran talento joven.",
    features: ["Misiones freelance, remotas y por proyecto", "XP y rachas que motivan a seguir avanzando", "Sección para empresas que buscan talento"],
    Mockup: InternshipsMockup,
  },
  {
    name: "Caresia",
    tld: "",
    href: CARESIA_URL,
    color: "#2a5d9f",
    status: "Disponible",
    tagline: "Menos papeleo, más consulta.",
    description:
      "Agenda, expedientes e historial clínico para clínicas dentales y consultorios médicos. Todo en un solo lugar, sin instalar nada: funciona desde el navegador.",
    features: [
      "Agenda compartida por día y por profesional",
      "Expediente completo: antecedentes, alergias y búsqueda por CURP",
      "Historial de cada consulta y tratamientos de varias sesiones",
      "Permisos por rol: recepción agenda, el doctor consulta",
    ],
    Mockup: CaresiaMockup,
  },
  {
    name: "Mi Info",
    tld: "",
    href: MIINFO_URL,
    cta: "Visitar Mi Info",
    color: "#1f3a5f",
    status: "Beta",
    tagline: "Tu tarjeta de presentación, en un enlace.",
    description:
      "Tus datos, tus redes y, si quieres, tu agenda en una sola página. La compartes por WhatsApp o en tu perfil, y tus clientes te guardan en su teléfono con un toque.",
    features: [
      "Tarjeta con WhatsApp, teléfono, correo, web y hasta 8 enlaces",
      "Botón para guardar tu contacto en el teléfono",
      "Agenda opcional: tú pones los horarios, tus clientes apartan su cita",
      "Confirmación por correo y enlace para cancelar",
    ],
    Mockup: MiInfoMockup,
  },
  {
    name: "BeHive",
    tld: "",
    href: BEHIVE_URL,
    color: "#b45309",
    status: "Beta",
    tagline: "Mesa de ayuda profesional, con precio en pesos.",
    description:
      "Nuestro sistema de tickets: tickets, SLA, centro de ayuda y reportes en una sola herramienta en español. Pensada para empresas en México y actualmente en beta.",
    features: [
      "Tickets con prioridad, estados y notas internas",
      "SLA, centro de ayuda y reportes en un solo lugar",
      "Todo en español y sin pagar en dólares",
      "Gratis con 1 agente y hasta 10 personas",
    ],
    Mockup: BeHiveMockup,
  },
]

// Cada producto es una lámina: nombre en cromo, ficha técnica y la captura real en su monitor
function Products() {
  return (
    <section id="productos" className="grain bg-night py-24 md:py-32">
      <div className="container">
        <SectionHead
          dark
          index="02"
          tag="Productos propios"
          title="Software propio"
          text="Además de crear sistemas para nuestros clientes, desarrollamos y operamos nuestras propias plataformas. Lo que aprendemos en ellas lo llevamos a cada proyecto."
        />
        <Reveal as="nav" aria-label="Productos" className="spec mb-20 flex flex-wrap gap-x-6 gap-y-3 text-paper/45">
          {products.map((p, i) => (
            <a key={p.name} href={`#producto-${i + 1}`} className="transition-colors hover:text-paper">
              <span className="text-coral">0{i + 1}</span> {p.name}
              {p.tld}
            </a>
          ))}
        </Reveal>

        <div className="space-y-28 md:space-y-40">
          {products.map((p, i) => {
            const flip = i % 2 === 1
            const beta = p.status === "Beta"
            return (
              <article key={p.name} id={`producto-${i + 1}`} className="grid scroll-mt-28 items-center gap-10 lg:grid-cols-[1fr_1.15fr] lg:gap-20">
                <Reveal className={`min-w-0 ${flip ? "lg:order-2" : ""}`}>
                  <div className="spec flex items-center gap-3 text-paper/50">
                    <span>Lámina 0{i + 1}</span>
                    <span className="h-px w-8 bg-paper/25" />
                    <span className="flex items-center gap-2">
                      <span className="h-1.5 w-1.5 rounded-full" style={{ background: beta ? "var(--color-apricot)" : "#4ade80" }} />
                      {beta ? "Beta abierta" : "En línea"}
                    </span>
                  </div>
                  <h3 className="mt-5 font-display text-[1.75rem] leading-none font-extrabold tracking-[-0.03em] uppercase [overflow-wrap:anywhere] sm:text-5xl xl:text-[3.6rem]">
                    <span className="chrome">
                      {p.name}
                      {p.tld}
                    </span>
                  </h3>
                  <p className="mt-6 text-xl font-medium text-paper">{p.tagline}</p>
                  <p className="mt-4 max-w-xl leading-relaxed text-paper/65">{p.description}</p>
                  <dl className="mt-8 border-t border-white/10">
                    {p.features.map((f, k) => (
                      <div key={f} className="grid grid-cols-[36px_1fr] gap-3 border-b border-white/10 py-3 text-[15px]">
                        <dt className="spec pt-0.5 text-paper/35">{String(k + 1).padStart(2, "0")}</dt>
                        <dd className="text-paper/85">{f}</dd>
                      </div>
                    ))}
                  </dl>
                  <a href={p.href} target="_blank" rel="noopener noreferrer" className="btn-chrome group mt-9">
                    {p.cta ?? `Visitar ${p.name}${p.tld}`}
                    <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </a>
                </Reveal>
                <Reveal delay={120} className={`min-w-0 ${flip ? "lg:order-1" : ""}`}>
                  <p.Mockup />
                </Reveal>
              </article>
            )
          })}
        </div>
      </div>
    </section>
  )
}

/* ───────────────────────── Automatizaciones ───────────────────────── */
// Diagrama de señal, como el de un manual de equipo de audio: cada módulo pasa el dato al siguiente
function Automation() {
  const nodes = [
    ["Nueva venta", "Entrada"],
    ["Inventario", "Se actualiza"],
    ["Factura", "Se genera"],
    ["Reporte diario", "Por correo"],
    ["Aviso a tu celular", "Al instante"],
  ]
  return (
    <section id="automatizaciones" className="bg-sunset grain overflow-hidden pt-24 pb-14 [--h:97%] md:pt-32 md:pb-16">
      <div className="container grid items-center gap-16 lg:grid-cols-2">
        <div>
          <SectionHead dark compact index="03" tag="Automatizaciones" title="Deja que el sistema trabaje" />
          <Reveal className="-mt-6 md:-mt-10">
            <p className="max-w-lg text-[17px] leading-relaxed text-paper/75">
              Conectamos tus herramientas para que la información fluya sola: menos captura manual, menos errores y más tiempo para
              atender a tus clientes.
            </p>
            <ul className="spec mt-8 grid gap-x-8 gap-y-3 text-paper/70 sm:grid-cols-2">
              {["Reportes automáticos por correo", "Inventario sincronizado", "Integraciones entre sistemas", "Respaldos y alertas"].map((t) => (
                <li key={t} className="border-t border-paper/15 pt-3">
                  {t}
                </li>
              ))}
            </ul>
          </Reveal>
        </div>

        <Reveal delay={120} className="relative mx-auto w-full max-w-md">
          {/* cable de cromo por donde corre la señal */}
          <svg className="absolute top-6 bottom-6 left-[27px] w-[6px]" aria-hidden="true">
            <defs>
              <linearGradient id="auto-cable" x1="0" x2="1">
                <stop offset="0" stopColor="#3d3a4a" />
                <stop offset="0.45" stopColor="#f4f5f7" />
                <stop offset="1" stopColor="#6b6f7a" />
              </linearGradient>
            </defs>
            <rect width="6" height="100%" rx="3" fill="url(#auto-cable)" />
            <line x1="3" y1="0" x2="3" y2="100%" stroke="#ff5a47" strokeWidth="3" strokeLinecap="round" className="flow-line" />
          </svg>
          <ol className="relative space-y-4">
            {nodes.map(([label, meta], i) => (
              <li
                key={label}
                className="flex items-center gap-5 rounded-2xl border border-white/10 bg-night/85 p-3 pr-5 backdrop-blur-sm"
              >
                <span className="relative flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[linear-gradient(180deg,#fff_0%,#cfd3da_45%,#7d828d_52%,#e2e4e8_100%)] shadow-[inset_0_1px_0_#fff,0_0_0_1px_rgba(0,0,0,0.6)]">
                  <span className="spec text-[10px] text-ink">{i + 1}</span>
                </span>
                <span className="flex-1 font-display text-base font-extrabold uppercase md:text-lg">{label}</span>
                <span className="spec text-paper/45">{meta}</span>
              </li>
            ))}
          </ol>
        </Reveal>
      </div>
    </section>
  )
}

/* ───────────────────────── Nosotros + cifras ───────────────────────── */
function About() {
  const stats = [
    { n: 10, s: "+", label: "Años de experiencia" },
    { n: 6, s: "", label: "Productos propios" },
    { n: 100, s: "%", label: "Desarrollo a la medida" },
    { n: 1, s: "", label: "Equipo de principio a fin" },
  ]
  return (
    <section id="nosotros" className="grain bg-paper py-24 text-ink md:py-32">
      <div className="container grid gap-16 lg:grid-cols-2 lg:gap-24 [&>*]:min-w-0">
        <div>
          <SectionHead compact index="04" tag="Nosotros" title="10 años construyendo" />
          <Reveal className="-mt-6 space-y-6 md:-mt-10">
            <p className="max-w-lg text-[17px] leading-relaxed text-ink/75">
              Somos un equipo de desarrollo y soporte en Tijuana, Baja California. Trabajamos de cerca con cada cliente para entender su
              operación y entregar soluciones que realmente se usan.
            </p>
            <div className="flex max-w-lg gap-5 border-t border-ink/15 pt-6">
              <Logo compact className="shrink-0 [&>span:last-child]:hidden" />
              <p className="text-[15px] leading-relaxed text-ink/70">
                <strong className="font-bold text-ink">¿Por qué &quot;Hyperion&quot;?</strong> Hyperion es el árbol más alto del mundo. Nos
                gusta la idea: bases sólidas y crecimiento constante. Así construimos el software de nuestros clientes.
              </p>
            </div>
          </Reveal>
        </div>
        <dl className="grid grid-cols-2 self-end border-t border-l border-ink/15">
          {stats.map((s, i) => (
            <Reveal key={s.label} delay={i * 70} className="border-r border-b border-ink/15 p-6 md:p-8">
              <dd className="font-display text-5xl leading-none font-extrabold tracking-[-0.04em] tabular-nums md:text-7xl">
                <span className="chrome chrome-on-paper">
                  <CountUp to={s.n} suffix={s.s} />
                </span>
              </dd>
              <dt className="spec mt-5 text-ink/60">{s.label}</dt>
            </Reveal>
          ))}
        </dl>
      </div>
    </section>
  )
}

/* ───────────────────────── Proceso ───────────────────────── */
const steps = [
  { icon: Search, title: "Diagnóstico", text: "Escuchamos tu negocio, entendemos tus procesos y definimos qué necesitas realmente." },
  { icon: PenTool, title: "Diseño", text: "Planeamos la solución con un plan de trabajo claro, tiempos y costos definidos." },
  { icon: Rocket, title: "Desarrollo", text: "Construimos en entregas cortas para que veas avances reales desde el inicio." },
  { icon: LifeBuoy, title: "Soporte", text: "Instalamos, capacitamos a tu equipo y seguimos contigo con soporte y mejoras." },
]

function Process() {
  return (
    <section id="proceso" className="grain bg-paper pb-24 text-ink md:pb-32">
      <div className="container">
        <div className="border-t border-ink/15 pt-16 md:pt-24">
          <SectionHead index="05" tag="Cómo trabajamos" title="Un proceso claro" text="Sin sorpresas: sabes qué sigue, cuánto cuesta y cuándo llega." />
        </div>
        <ol className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4 lg:gap-8">
          {steps.map((s, i) => (
            <Reveal as="li" key={s.title} delay={i * 80}>
              <div className="flex items-center gap-3">
                <span className="h-2.5 w-2.5 rounded-full border-2 border-coral" />
                <span className="h-px flex-1 bg-ink/20" />
              </div>
              <div className="spec mt-5 text-coral">Paso 0{i + 1}</div>
              <h3 className="mt-2 font-display text-2xl font-extrabold uppercase">{s.title}</h3>
              <p className="mt-3 text-[15px] leading-relaxed text-ink/70">{s.text}</p>
            </Reveal>
          ))}
        </ol>
      </div>
    </section>
  )
}

/* ───────────────────────── Contacto ───────────────────────── */
const needs = ["Sistema a la medida", "Punto de venta", "Automatización", "Servicio técnico", "Sitio web / Marketing", "Mirestaurante", "Otro"]

function Contact() {
  const [form, setForm] = useState({ name: "", email: "", phone: "", need: needs[0], message: "" })
  const [status, setStatus] = useState("idle")

  const onChange = (e) => setForm({ ...form, [e.target.name]: e.target.value })

  const onSubmit = async (e) => {
    e.preventDefault()
    setStatus("sending")
    const message = `Interés: ${form.need}\nTeléfono: ${form.phone || "—"}\n\n${form.message}`
    try {
      const res = await fetch("/api/send-email", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: form.name, email: form.email, message }),
      })
      if (!res.ok) throw new Error("Error al enviar")
      window.location.href = "/gracias"
    } catch (err) {
      console.error(err)
      setStatus("error")
    }
  }

  const field =
    "w-full rounded-xl border border-white/12 bg-night-2 px-4 py-3.5 text-[16px] text-paper placeholder:text-paper/30 outline-none transition-[border-color] focus:border-coral"
  const label = "spec mb-2 block text-paper/55"

  return (
    <section id="contacto" className="grain bg-night py-24 md:py-32">
      <div className="container grid gap-14 lg:grid-cols-[1fr_1.2fr] lg:gap-20">
        <div>
          <SectionHead dark compact index="06" tag="Contacto" title="Cuéntanos de tu proyecto" />
          <Reveal className="-mt-6 md:-mt-10">
            <p className="text-[17px] text-paper/70">Te respondemos con una propuesta clara y sin compromiso.</p>
            <a
              href={WHATSAPP}
              target="_blank"
              rel="noopener noreferrer"
              className="group mt-10 flex items-center gap-4 border-y border-white/10 py-5 transition-colors hover:text-paper"
            >
              <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-[#25d366] text-white">
                <MessageCircle className="h-5 w-5" />
              </span>
              <span className="flex-1">
                <span className="block font-display text-lg font-extrabold uppercase">Escríbenos por WhatsApp</span>
                <span className="spec text-paper/45">Respuesta rápida</span>
              </span>
              <ArrowUpRight className="h-5 w-5 text-paper/60 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </a>
            <dl className="mt-2">
              {[
                ["Email", "info@hyperionmkt.com", "mailto:info@hyperionmkt.com"],
                ["Teléfono", "+52 664 579 8903", "tel:+526645798903"],
                ["Ubicación", "Tijuana, Baja California, México"],
              ].map(([l, value, href]) => (
                <div key={l} className="grid grid-cols-[110px_1fr] items-baseline border-b border-white/10 py-4">
                  <dt className="spec text-paper/40">{l}</dt>
                  <dd className="text-paper/90">
                    {href ? (
                      <a href={href} className="underline decoration-paper/25 underline-offset-4 hover:decoration-coral">
                        {value}
                      </a>
                    ) : (
                      value
                    )}
                  </dd>
                </div>
              ))}
            </dl>
          </Reveal>
        </div>

        <Reveal delay={120}>
          <form onSubmit={onSubmit} className="rounded-[24px] border border-white/10 bg-night-2/60 p-6 md:p-9">
            <div className="grid gap-5 md:grid-cols-2">
              <label className="block">
                <span className={label}>Nombre</span>
                <input name="name" required value={form.name} onChange={onChange} autoComplete="name" className={field} />
              </label>
              <label className="block">
                <span className={label}>Email</span>
                <input name="email" type="email" required value={form.email} onChange={onChange} autoComplete="email" className={field} />
              </label>
              <label className="block md:col-span-2">
                <span className={label}>Teléfono (opcional)</span>
                <input name="phone" type="tel" value={form.phone} onChange={onChange} autoComplete="tel" className={field} />
              </label>
            </div>
            <fieldset className="mt-6">
              <legend className={label}>¿Qué necesitas?</legend>
              <div className="flex flex-wrap gap-2">
                {needs.map((n) => (
                  <label
                    key={n}
                    className={`cursor-pointer rounded-full border px-3.5 py-2 text-[13px] transition-colors has-[:focus-visible]:outline has-[:focus-visible]:outline-2 has-[:focus-visible]:outline-coral ${
                      form.need === n ? "border-paper bg-paper text-ink" : "border-white/15 text-paper/75 hover:border-white/35"
                    }`}
                  >
                    <input type="radio" name="need" value={n} checked={form.need === n} onChange={onChange} className="sr-only" />
                    {n}
                  </label>
                ))}
              </div>
            </fieldset>
            <label className="mt-6 block">
              <span className={label}>Cuéntanos de tu proyecto</span>
              <textarea
                name="message"
                required
                rows={5}
                value={form.message}
                onChange={onChange}
                placeholder="¿Qué quieres lograr? ¿Qué usas hoy?"
                className={`${field} resize-none`}
              />
            </label>
            {status === "error" && (
              <p role="alert" className="mt-4 rounded-xl border border-coral/40 bg-coral/10 px-4 py-3 text-sm text-paper">
                No pudimos enviar tu mensaje. Inténtalo de nuevo o escríbenos por WhatsApp.
              </p>
            )}
            <button type="submit" disabled={status === "sending"} className="btn-chrome mt-8 w-full disabled:opacity-70">
              {status === "sending" ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" /> Enviando…
                </>
              ) : (
                <>
                  Enviar mensaje <ArrowRight className="h-4 w-4" />
                </>
              )}
            </button>
          </form>
        </Reveal>
      </div>
    </section>
  )
}

/* ───────────────────────── Pie de página ───────────────────────── */
function Footer() {
  const product = (href, name, beta) => (
    <li key={name}>
      <a href={href} target="_blank" rel="noopener noreferrer" className="transition-colors hover:text-paper">
        {name}
      </a>
      {beta && <span className="spec ml-2 text-[9px] text-apricot">Beta</span>}
    </li>
  )
  const linkCls = "transition-colors hover:text-paper"
  return (
    <footer className="bg-sunset grain overflow-hidden pt-20 [--h:84%]">
      <div className="container">
        <div className="grid gap-12 border-b border-white/10 pb-14 md:grid-cols-[1.4fr_1fr_1fr]">
          <div>
            <Logo chrome />
            <p className="mt-5 max-w-sm text-paper/60">
              10 años desarrollando sistemas a la medida, puntos de venta, automatizaciones y dando servicio técnico a negocios en Tijuana y
              todo México.
            </p>
          </div>
          <div>
            <h4 className="spec mb-4 text-paper/40">Productos</h4>
            <ul className="space-y-2.5 text-sm text-paper/70">
              {product("https://mitiendita.software", "Mitiendita")}
              {product(MIRESTAURANTE_URL, "Mirestaurante", true)}
              {product("https://internships.gg", "internships.gg")}
              {product(CARESIA_URL, "Caresia")}
              {product(MIINFO_URL, "Mi Info", true)}
              {product(BEHIVE_URL, "BeHive", true)}
            </ul>
          </div>
          <div>
            <h4 className="spec mb-4 text-paper/40">Servicios</h4>
            <ul className="space-y-2.5 text-sm text-paper/70">
              <li><Link href="/servicios/sistemas-a-medida" className={linkCls}>Sistemas a la medida</Link></li>
              <li><Link href="#productos" className={linkCls}>Puntos de venta</Link></li>
              <li><Link href="#automatizaciones" className={linkCls}>Automatizaciones</Link></li>
              <li><Link href="#contacto" className={linkCls}>Servicio técnico</Link></li>
              <li><Link href="/servicios/desarrollo-web" className={linkCls}>Desarrollo web</Link></li>
            </ul>
          </div>
        </div>

        {/* El nombre en cromo, recortado por el borde inferior como un letrero al atardecer */}
        <div className="relative mt-10 select-none" aria-hidden="true">
          <div className="text-center font-display text-[12.4vw] leading-[0.8] font-extrabold tracking-[-0.05em] uppercase xl:text-[12.5rem]">
            <span className="chrome">Hyperion</span>
          </div>
          <span className="glint" style={{ left: "13%", top: "16%", "--s": "70px" }} />
          <span className="glint" style={{ left: "82%", top: "62%", "--s": "40px", "--d": "2.6s" }} />
        </div>

        <div className="spec flex flex-col items-center justify-between gap-4 py-8 text-paper/45 md:flex-row">
          <p>© {new Date().getFullYear()} Hyperion Software · Tijuana, B.C.</p>
          <div className="flex items-center gap-6">
            <Link href="/trafico" className="hover:text-paper">Tráfico de nuestros sitios</Link>
            <a href="mailto:info@hyperionmkt.com" className="hover:text-paper">info@hyperionmkt.com</a>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default function Home() {
  return (
    <div className="relative min-h-screen">
      <Intro />
      <Navbar />
      <main>
        <Hero />
        <Marquee />
        <Services />
        <Products />
        <Automation />
        <About />
        <Process />
        <Contact />
      </main>
      <Footer />
      <a
        href={WHATSAPP}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Escríbenos por WhatsApp"
        className="fixed right-5 bottom-5 z-50 flex h-13 w-13 items-center justify-center rounded-full bg-[#25d366] text-white shadow-[0_0_0_3px_#0b0a0d,0_0_0_4px_rgba(255,255,255,0.35),0_12px_30px_-8px_rgba(0,0,0,0.7)] transition-transform active:scale-95"
      >
        <MessageCircle className="h-6 w-6" />
      </a>
    </div>
  )
}
