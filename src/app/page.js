"use client"
import { useState } from "react"
import Link from "next/link"
import {
  ArrowRight,
  ArrowUpRight,
  Check,
  Code2,
  Globe,
  Mail,
  Megaphone,
  MessageCircle,
  Phone,
  MapPin,
  ShoppingCart,
  Wrench,
  Zap,
  Search,
  PenTool,
  Rocket,
  LifeBuoy,
  Send,
  Loader2,
  FileText,
  Database,
  BarChart3,
  Bell,
} from "lucide-react"
import Navbar, { Logo } from "../components/landing/Navbar"
import Hero from "../components/landing/Hero"
import { Parallax, Reveal, CountUp } from "../components/landing/parallax"
import { TienditaMockup, RestauranteMockup, IntershipsMockup } from "../components/landing/Mockups"

const WHATSAPP = "https://wa.me/526645798903?text=Hola%20Hyperion%2C%20me%20interesa%20cotizar%20un%20proyecto"

function trackGlow(e) {
  const r = e.currentTarget.getBoundingClientRect()
  e.currentTarget.style.setProperty("--mx", `${e.clientX - r.left}px`)
  e.currentTarget.style.setProperty("--my", `${e.clientY - r.top}px`)
}

function SectionTag({ children }) {
  return (
    <span className="mb-4 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs font-semibold tracking-[0.15em] text-amber uppercase">
      {children}
    </span>
  )
}

/* ───────────────────────── Marquesina ───────────────────────── */
function Marquee() {
  const items = ["Sistemas a la medida", "Puntos de venta", "Automatizaciones", "Servicio técnico", "Desarrollo web", "Marketing digital"]
  const row = [...items, ...items]
  return (
    <div className="relative z-10 overflow-hidden border-y border-white/5 bg-ink-900/80 py-5">
      <div className="marquee flex w-max gap-10 whitespace-nowrap">
        {row.map((t, i) => (
          <span key={i} className="flex items-center gap-10 font-display text-xl font-semibold text-fog/70 md:text-2xl">
            {t}
            <span className="h-1.5 w-1.5 rounded-full bg-amber" />
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
    accent: "#5b8cff",
  },
  {
    icon: ShoppingCart,
    title: "Puntos de venta",
    text: "Instalamos y personalizamos puntos de venta para tiendas, restaurantes y comercios, con nuestro propio sistema en la nube.",
    points: ["Lector de código de barras", "Inventario y cortes de caja", "Funciona en PC, tablet o celular"],
    href: "#productos",
    accent: "#f5a524",
  },
  {
    icon: Zap,
    title: "Automatizaciones",
    text: "Eliminamos tareas repetitivas: reportes automáticos, integraciones entre sistemas, bots y flujos de trabajo.",
    points: ["Reportes sin hacerlos a mano", "Conecta tus herramientas", "Menos errores humanos"],
    href: "#automatizaciones",
    accent: "#34d6c4",
  },
  {
    icon: Wrench,
    title: "Servicio técnico",
    text: "Soporte, mantenimiento de equipos, redes e instalación. Un equipo que responde cuando lo necesitas.",
    points: ["Mantenimiento de equipos", "Redes e instalación", "Soporte a tus sistemas"],
    href: "#contacto",
    accent: "#ff7a45",
  },
]

function Services() {
  return (
    <section id="servicios" className="relative overflow-hidden py-24 md:py-32">
      <div className="container relative">
        <div className="mb-14 grid gap-6 lg:grid-cols-2 lg:items-end">
          <Reveal>
            <SectionTag>Servicios</SectionTag>
            <h2 className="font-display text-3xl leading-tight font-bold md:text-5xl">
              Todo lo que tu negocio necesita en <span className="text-gradient">tecnología</span>.
            </h2>
          </Reveal>
          <Reveal delay={100}>
            <p className="text-lg text-fog/65">
              Diseñamos, desarrollamos, instalamos y damos soporte. Un solo equipo que conoce tu negocio y te acompaña de
              principio a fin.
            </p>
          </Reveal>
        </div>

        <div className="grid gap-5 md:grid-cols-2">
          {services.map((s, i) => {
            const Icon = s.icon
            return (
              <Reveal key={s.title} delay={(i % 2) * 100}>
                <Link
                  href={s.href}
                  onMouseMove={trackGlow}
                  className="glow-card group relative block h-full overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-b from-white/[0.05] to-white/[0.01] p-8 transition duration-500 hover:-translate-y-1 hover:border-white/25"
                >
                  <div
                    className="mb-6 flex h-14 w-14 items-center justify-center rounded-2xl transition group-hover:scale-110"
                    style={{ background: `${s.accent}22`, boxShadow: `inset 0 0 0 1px ${s.accent}55` }}
                  >
                    <Icon className="h-6 w-6" style={{ color: s.accent }} />
                  </div>
                  <h3 className="font-display text-2xl font-bold">{s.title}</h3>
                  <p className="mt-3 text-fog/65">{s.text}</p>
                  <ul className="mt-6 space-y-2">
                    {s.points.map((p) => (
                      <li key={p} className="flex items-center gap-2 text-sm text-fog/80">
                        <Check className="h-4 w-4" style={{ color: s.accent }} /> {p}
                      </li>
                    ))}
                  </ul>
                  <span className="mt-7 inline-flex items-center gap-1.5 text-sm font-semibold" style={{ color: s.accent }}>
                    Conocer más <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" />
                  </span>
                  <div
                    className="pointer-events-none absolute -top-20 -right-20 h-48 w-48 rounded-full opacity-0 blur-3xl transition duration-500 group-hover:opacity-60"
                    style={{ background: s.accent }}
                  />
                </Link>
              </Reveal>
            )
          })}
        </div>

        <Reveal delay={100} className="mt-5 grid gap-5 md:grid-cols-2">
          {[
            { icon: Globe, title: "Desarrollo web", text: "Sitios rápidos y atractivos que convierten visitas en clientes.", href: "/servicios/desarrollo-web" },
            { icon: Megaphone, title: "Marketing digital", text: "Estrategia, contenido y campañas para que tu negocio se vea.", href: "/servicios/marketing-digital" },
          ].map(({ icon: Icon, title, text, href }) => (
            <Link key={title} href={href} className="group flex items-center gap-5 rounded-2xl border border-white/10 bg-white/[0.02] p-6 transition hover:border-white/25">
              <Icon className="h-6 w-6 shrink-0 text-fog/60" />
              <div className="flex-1">
                <div className="font-display font-semibold">{title}</div>
                <div className="text-sm text-fog/55">{text}</div>
              </div>
              <ArrowRight className="h-4 w-4 text-fog/40 transition group-hover:translate-x-1 group-hover:text-fog" />
            </Link>
          ))}
        </Reveal>
      </div>
    </section>
  )
}

/* ───────────────────────── Productos ───────────────────────── */
const products = [
  {
    name: "mitiendita",
    tld: ".software",
    href: "https://mitiendita.software",
    color: "#f5a524",
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
    name: "mirestaurante",
    tld: ".software",
    href: null,
    color: "#ff7a45",
    status: "Próximamente",
    tagline: "Tu restaurante, en orden.",
    description:
      "Mesas, comandas y cocina conectadas en un solo sistema. Estamos afinando los últimos detalles; déjanos tus datos y sé de los primeros en probarlo.",
    features: ["Mapa de mesas", "Comandas directas a cocina", "Cuentas y cobro ágil"],
    Mockup: RestauranteMockup,
  },
  {
    name: "interships",
    tld: ".gg",
    href: "https://interships.gg",
    color: "#9b8cff",
    status: "Disponible",
    tagline: "Nuestra plataforma en línea.",
    description:
      "Una plataforma web diseñada, desarrollada y operada por nuestro equipo de principio a fin: la prueba de que construimos productos digitales que escalan.",
    features: ["Diseño y desarrollo propio", "Infraestructura escalable", "Evolución continua"],
    Mockup: IntershipsMockup,
  },
]

function Products() {
  return (
    <section id="productos" className="relative overflow-hidden py-24 md:py-32">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(91,140,255,0.10),transparent_60%)]" />
      <div className="container relative">
        <Reveal className="mx-auto mb-20 max-w-3xl text-center">
          <SectionTag>Nuestros productos</SectionTag>
          <h2 className="font-display text-3xl leading-tight font-bold md:text-5xl">
            Software propio, probado en <span className="text-gradient-volt">negocios reales</span>.
          </h2>
          <p className="mt-5 text-lg text-fog/65">
            Además de crear sistemas para nuestros clientes, desarrollamos y operamos nuestras propias plataformas. Lo que
            aprendemos en ellas lo llevamos a cada proyecto.
          </p>
        </Reveal>

        <div className="space-y-28 md:space-y-36">
          {products.map((p, i) => {
            const flip = i % 2 === 1
            return (
              <div key={p.name} className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2 lg:gap-20">
                <div className={`min-w-0 ${flip ? "lg:order-2" : ""}`}>
                  <Reveal>
                    <div className="mb-5 flex items-center gap-3">
                      <span className="font-display text-sm text-fog/40">0{i + 1}</span>
                      <span
                        className="rounded-full border px-3 py-1 text-xs font-semibold tracking-wider uppercase"
                        style={{ borderColor: `${p.color}55`, color: p.color, background: `${p.color}12` }}
                      >
                        {p.status}
                      </span>
                    </div>
                    <h3 className="font-display text-[1.7rem] font-bold break-words sm:text-4xl md:text-5xl">
                      {p.name}
                      <span style={{ color: p.color }}>{p.tld}</span>
                    </h3>
                    <p className="mt-3 text-xl font-medium text-fog/85">{p.tagline}</p>
                    <p className="mt-5 text-lg leading-relaxed text-fog/65">{p.description}</p>
                    <ul className="mt-7 space-y-3">
                      {p.features.map((f) => (
                        <li key={f} className="flex items-center gap-3 text-fog/85">
                          <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full" style={{ background: `${p.color}22` }}>
                            <Check className="h-3.5 w-3.5" style={{ color: p.color }} />
                          </span>
                          {f}
                        </li>
                      ))}
                    </ul>
                    <div className="mt-9">
                      {p.href ? (
                        <a
                          href={p.href}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="group inline-flex items-center gap-2 rounded-full px-7 py-3.5 font-semibold text-ink-950 transition hover:scale-[1.03]"
                          style={{ background: p.color }}
                        >
                          Visitar {p.name}
                          {p.tld}
                          <ArrowUpRight className="h-4 w-4 transition group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                        </a>
                      ) : (
                        <Link
                          href="#contacto"
                          className="group inline-flex items-center gap-2 rounded-full border px-7 py-3.5 font-semibold transition hover:scale-[1.03]"
                          style={{ borderColor: p.color, color: p.color }}
                        >
                          Quiero enterarme primero
                          <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" />
                        </Link>
                      )}
                    </div>
                  </Reveal>
                </div>

                <div className={`relative min-w-0 ${flip ? "lg:order-1" : ""}`}>
                  <Parallax speed={0.18} className="pointer-events-none absolute inset-0">
                    <div className="absolute inset-[5%] rounded-full blur-[90px]" style={{ background: `${p.color}30` }} />
                  </Parallax>
                  <Parallax speed={-0.12}>
                    <Reveal delay={150} className="relative">
                      <p.Mockup />
                      {p.status === "Próximamente" && (
                        <div className="float absolute -top-5 -right-3 rotate-6 rounded-xl bg-[#ff7a45] px-4 py-2 font-display text-sm font-bold text-ink-950 shadow-xl">
                          ¡Muy pronto!
                        </div>
                      )}
                    </Reveal>
                  </Parallax>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}

/* ───────────────────────── Automatizaciones (banda parallax) ───────────────────────── */
function Automation() {
  const nodes = [
    { icon: ShoppingCart, label: "Nueva venta", color: "#f5a524", speed: 0 },
    { icon: Database, label: "Inventario", color: "#5b8cff", speed: -0.025 },
    { icon: FileText, label: "Factura", color: "#34d6c4", speed: -0.05 },
    { icon: BarChart3, label: "Reporte diario", color: "#9b8cff", speed: -0.075 },
    { icon: Bell, label: "Aviso a tu celular", color: "#ff7a45", speed: -0.1 },
  ]
  return (
    <section id="automatizaciones" className="relative overflow-hidden border-y border-white/5 bg-ink-900 py-24 md:py-32">
      <Parallax speed={0.3} className="absolute inset-0">
        <div className="bg-grid absolute inset-0 opacity-60 [mask-image:radial-gradient(ellipse,#000_30%,transparent_75%)]" />
      </Parallax>
      <Parallax speed={0.2} className="pointer-events-none absolute inset-0">
        <div className="absolute top-1/3 left-1/2 h-[400px] w-[700px] -translate-x-1/2 rounded-full bg-aqua/10 blur-[120px]" />
      </Parallax>
      <div className="container relative grid items-center gap-16 lg:grid-cols-2">
        <Reveal>
          <SectionTag>Automatizaciones</SectionTag>
          <h2 className="font-display text-3xl leading-tight font-bold md:text-5xl">
            Deja que el sistema haga el <span className="text-gradient-volt">trabajo repetitivo</span>.
          </h2>
          <p className="mt-5 text-lg text-fog/65">
            Conectamos tus herramientas para que la información fluya sola: menos captura manual, menos errores y más tiempo
            para atender a tus clientes.
          </p>
          <ul className="mt-8 grid gap-3 sm:grid-cols-2">
            {["Reportes automáticos por correo", "Inventario sincronizado", "Integraciones entre sistemas", "Respaldos y alertas"].map((t) => (
              <li key={t} className="flex items-center gap-2 text-fog/85">
                <Check className="h-4 w-4 text-aqua" /> {t}
              </li>
            ))}
          </ul>
        </Reveal>

        <div className="relative mx-auto w-full max-w-md">
          <svg className="absolute top-0 bottom-0 left-[38px] h-full w-2" aria-hidden="true">
            <line x1="4" y1="20" x2="4" y2="100%" stroke="#34d6c4" strokeOpacity="0.5" strokeWidth="2" className="flow-line" />
          </svg>
          <div className="space-y-5">
            {nodes.map((n, i) => {
              const Icon = n.icon
              return (
                <Parallax key={n.label} speed={n.speed}>
                  <Reveal delay={i * 90}>
                    <div className="relative flex items-center gap-4 rounded-2xl border border-white/10 bg-ink-950/80 p-4 backdrop-blur" style={{ marginLeft: `${(i % 2) * 28}px` }}>
                      <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl" style={{ background: `${n.color}20`, boxShadow: `inset 0 0 0 1px ${n.color}55` }}>
                        <Icon className="h-5 w-5" style={{ color: n.color }} />
                      </span>
                      <span className="font-medium">{n.label}</span>
                      <span className="ml-auto flex items-center gap-1.5 text-xs text-aqua">
                        <span className="pulse-dot h-1.5 w-1.5 rounded-full bg-aqua" /> Automático
                      </span>
                    </div>
                  </Reveal>
                </Parallax>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}

/* ───────────────────────── Nosotros + cifras ───────────────────────── */
function About() {
  const stats = [
    { n: 10, s: "+", label: "Años de experiencia" },
    { n: 3, s: "", label: "Productos propios" },
    { n: 100, s: "%", label: "Desarrollo a la medida" },
    { n: 1, s: "", label: "Equipo de principio a fin" },
  ]
  return (
    <section id="nosotros" className="relative py-24 md:py-32">
      <div className="container grid items-center gap-14 lg:grid-cols-2">
        <Reveal>
          <SectionTag>Nosotros</SectionTag>
          <h2 className="font-display text-3xl leading-tight font-bold md:text-5xl">
            10 años construyendo tecnología para <span className="text-gradient">negocios que quieren crecer</span>.
          </h2>
          <p className="mt-5 text-lg text-fog/65">
            Somos un equipo de desarrollo y soporte en Tijuana, Baja California. Trabajamos de cerca con cada cliente para
            entender su operación y entregar soluciones que realmente se usan.
          </p>
          <div className="mt-8 rounded-2xl border border-white/10 bg-white/[0.03] p-5">
            <div className="text-sm font-semibold text-amber">¿Por qué &quot;Hyperion&quot;?</div>
            <p className="mt-1.5 text-sm text-fog/60">
              Hyperion es el árbol más alto del mundo. Nos gusta la idea: bases sólidas y crecimiento constante. Así
              construimos el software de nuestros clientes.
            </p>
          </div>
        </Reveal>
        <div className="grid grid-cols-2 gap-4">
          {stats.map((s, i) => (
            <Parallax key={s.label} speed={i % 2 ? -0.06 : 0.06}>
              <Reveal delay={i * 90} className="rounded-3xl border border-white/10 bg-gradient-to-b from-white/[0.06] to-white/[0.01] p-7">
                <div className="font-display text-4xl font-bold text-gradient md:text-5xl">
                  <CountUp to={s.n} suffix={s.s} />
                </div>
                <div className="mt-2 text-sm text-fog/60">{s.label}</div>
              </Reveal>
            </Parallax>
          ))}
        </div>
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
    <section id="proceso" className="relative py-24 md:py-28">
      <div className="container">
        <Reveal className="mx-auto mb-14 max-w-2xl text-center">
          <SectionTag>Cómo trabajamos</SectionTag>
          <h2 className="font-display text-3xl leading-tight font-bold md:text-5xl">
            Un proceso <span className="text-gradient-volt">claro</span>, sin sorpresas.
          </h2>
        </Reveal>
        <div className="relative grid gap-5 md:grid-cols-4">
          <div className="absolute top-10 right-[12%] left-[12%] hidden h-px bg-gradient-to-r from-volt/0 via-volt/50 to-volt/0 md:block" />
          {steps.map((s, i) => {
            const Icon = s.icon
            return (
              <Reveal key={s.title} delay={i * 100} className="relative text-center">
                <div className="relative mx-auto mb-5 flex h-20 w-20 items-center justify-center rounded-2xl border border-white/10 bg-ink-900">
                  <Icon className="h-7 w-7 text-volt" />
                  <span className="absolute -top-2 -right-2 flex h-7 w-7 items-center justify-center rounded-full bg-amber text-xs font-bold text-ink-950">{i + 1}</span>
                </div>
                <h3 className="font-display text-xl font-bold">{s.title}</h3>
                <p className="mx-auto mt-2 max-w-[260px] text-sm text-fog/60">{s.text}</p>
              </Reveal>
            )
          })}
        </div>
      </div>
    </section>
  )
}

/* ───────────────────────── Contacto ───────────────────────── */
const needs = ["Sistema a la medida", "Punto de venta", "Automatización", "Servicio técnico", "Sitio web / Marketing", "mirestaurante.software", "Otro"]

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
    "w-full rounded-xl border border-white/10 bg-black/30 px-4 py-3.5 text-fog placeholder:text-fog/30 outline-none transition focus:border-volt/60 focus:ring-4 focus:ring-volt/10"
  const quick = needs.slice(0, 4)

  return (
    <section id="contacto" className="relative overflow-hidden py-24 md:py-32">
      <Parallax speed={0.2} className="pointer-events-none absolute inset-0">
        <div className="absolute top-1/4 -left-40 h-[500px] w-[500px] rounded-full bg-volt/10 blur-[120px]" />
        <div className="absolute -right-40 bottom-0 h-[500px] w-[500px] rounded-full bg-amber/10 blur-[120px]" />
      </Parallax>
      <div className="container relative grid gap-14 lg:grid-cols-5">
        <div className="lg:col-span-2">
          <Reveal>
            <SectionTag>Contacto</SectionTag>
            <h2 className="font-display text-3xl leading-tight font-bold md:text-5xl">
              Cuéntanos de tu <span className="text-gradient">proyecto</span>.
            </h2>
            <p className="mt-5 text-lg text-fog/65">Te respondemos con una propuesta clara y sin compromiso.</p>
          </Reveal>
          <Reveal delay={120} className="mt-10 space-y-4">
            <a href={WHATSAPP} target="_blank" rel="noopener noreferrer" className="group flex items-center gap-4 rounded-2xl border border-[#25d366]/30 bg-[#25d366]/10 p-5 transition hover:border-[#25d366]/60">
              <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#25d366] text-ink-950">
                <MessageCircle className="h-6 w-6" />
              </span>
              <span>
                <span className="block font-semibold">Escríbenos por WhatsApp</span>
                <span className="text-sm text-fog/60">Respuesta rápida</span>
              </span>
              <ArrowUpRight className="ml-auto h-5 w-5 text-[#25d366] transition group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </a>
            {[
              { icon: Mail, label: "Email", value: "info@hyperionmkt.com", href: "mailto:info@hyperionmkt.com" },
              { icon: Phone, label: "Teléfono", value: "+52 664 579 8903", href: "tel:+526645798903" },
              { icon: MapPin, label: "Ubicación", value: "Tijuana, Baja California, México" },
            ].map(({ icon: Icon, label, value, href }) => {
              const inner = (
                <>
                  <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-volt/10 ring-1 ring-volt/25">
                    <Icon className="h-5 w-5 text-volt" />
                  </span>
                  <span>
                    <span className="block text-sm text-fog/50">{label}</span>
                    <span className="font-medium">{value}</span>
                  </span>
                </>
              )
              return href ? (
                <a key={label} href={href} className="flex items-center gap-4 rounded-2xl p-2 transition hover:bg-white/[0.03]">
                  {inner}
                </a>
              ) : (
                <div key={label} className="flex items-center gap-4 p-2">
                  {inner}
                </div>
              )
            })}
          </Reveal>
        </div>

        <Reveal delay={150} className="lg:col-span-3">
          <form onSubmit={onSubmit} className="relative rounded-3xl border border-white/10 bg-ink-900/80 p-6 shadow-[0_40px_120px_-40px_rgba(0,0,0,0.9)] backdrop-blur-xl md:p-10">
            <div className="grid gap-5 md:grid-cols-2">
              <label className="block">
                <span className="mb-2 block text-sm text-fog/60">Nombre</span>
                <input name="name" required value={form.name} onChange={onChange} placeholder="Tu nombre" className={field} />
              </label>
              <label className="block">
                <span className="mb-2 block text-sm text-fog/60">Email</span>
                <input name="email" type="email" required value={form.email} onChange={onChange} placeholder="tu@email.com" className={field} />
              </label>
              <label className="block">
                <span className="mb-2 block text-sm text-fog/60">Teléfono (opcional)</span>
                <input name="phone" type="tel" value={form.phone} onChange={onChange} placeholder="664 000 0000" className={field} />
              </label>
              <div className="block">
                <span className="mb-2 block text-sm text-fog/60">¿Qué necesitas?</span>
                <div className="flex flex-wrap gap-2">
                  {quick.map((n) => (
                    <button
                      type="button"
                      key={n}
                      onClick={() => setForm({ ...form, need: n })}
                      className={`rounded-full border px-3 py-1.5 text-xs transition ${form.need === n ? "border-amber bg-amber text-ink-950" : "border-white/15 text-fog/70 hover:border-amber/50"}`}
                    >
                      {n}
                    </button>
                  ))}
                  <select
                    name="need"
                    value={quick.includes(form.need) ? "" : form.need}
                    onChange={onChange}
                    aria-label="Otro servicio"
                    className={`rounded-full border bg-transparent px-3 py-1.5 text-xs outline-none ${quick.includes(form.need) ? "border-white/15 text-fog/70" : "border-amber bg-amber text-ink-950"}`}
                  >
                    <option value="" disabled className="bg-ink-900 text-fog">Más…</option>
                    {needs.slice(4).map((n) => (
                      <option key={n} value={n} className="bg-ink-900 text-fog">
                        {n}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </div>
            <label className="mt-5 block">
              <span className="mb-2 block text-sm text-fog/60">Cuéntanos de tu proyecto</span>
              <textarea name="message" required rows={5} value={form.message} onChange={onChange} placeholder="¿Qué quieres lograr? ¿Qué usas hoy?" className={`${field} resize-none`} />
            </label>
            {status === "error" && (
              <p className="mt-4 rounded-xl border border-red-400/30 bg-red-500/10 px-4 py-3 text-sm text-red-200">
                No pudimos enviar tu mensaje. Inténtalo de nuevo o escríbenos por WhatsApp.
              </p>
            )}
            <button
              type="submit"
              disabled={status === "sending"}
              className="group mt-8 inline-flex w-full items-center justify-center gap-2 rounded-full bg-amber px-8 py-4 font-semibold text-ink-950 shadow-[0_10px_40px_-10px_rgba(245,165,36,0.8)] transition hover:scale-[1.01] disabled:opacity-70"
            >
              {status === "sending" ? (
                <>
                  <Loader2 className="h-5 w-5 animate-spin" /> Enviando…
                </>
              ) : (
                <>
                  Enviar mensaje <Send className="h-4 w-4 transition group-hover:translate-x-1" />
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
  return (
    <footer className="relative overflow-hidden border-t border-white/5 bg-[#03050a] pt-16 pb-10">
      <div className="container relative">
        <div className="grid gap-12 md:grid-cols-4">
          <div className="md:col-span-2">
            <Logo />
            <p className="mt-5 max-w-sm text-fog/55">
              10 años desarrollando sistemas a la medida, puntos de venta, automatizaciones y dando servicio técnico a negocios
              en Tijuana y todo México.
            </p>
          </div>
          <div>
            <h4 className="mb-4 text-xs font-semibold tracking-[0.2em] text-amber uppercase">Productos</h4>
            <ul className="space-y-2.5 text-fog/65">
              <li><a href="https://mitiendita.software" target="_blank" rel="noopener noreferrer" className="hover:text-fog">mitiendita.software</a></li>
              <li className="flex items-center gap-2">mirestaurante.software <span className="rounded-full bg-amber/15 px-2 py-0.5 text-[10px] text-amber">Pronto</span></li>
              <li><a href="https://interships.gg" target="_blank" rel="noopener noreferrer" className="hover:text-fog">interships.gg</a></li>
            </ul>
          </div>
          <div>
            <h4 className="mb-4 text-xs font-semibold tracking-[0.2em] text-amber uppercase">Servicios</h4>
            <ul className="space-y-2.5 text-fog/65">
              <li><Link href="/servicios/sistemas-a-medida" className="hover:text-fog">Sistemas a la medida</Link></li>
              <li><Link href="#productos" className="hover:text-fog">Puntos de venta</Link></li>
              <li><Link href="#automatizaciones" className="hover:text-fog">Automatizaciones</Link></li>
              <li><Link href="#contacto" className="hover:text-fog">Servicio técnico</Link></li>
              <li><Link href="/servicios/desarrollo-web" className="hover:text-fog">Desarrollo web</Link></li>
            </ul>
          </div>
        </div>
        <div className="mt-14 flex flex-col items-center justify-between gap-4 border-t border-white/5 pt-8 text-sm text-fog/40 md:flex-row">
          <p>© {new Date().getFullYear()} Hyperion Marketing · Tijuana, B.C.</p>
          <a href="mailto:info@hyperionmkt.com" className="hover:text-fog">info@hyperionmkt.com</a>
        </div>
      </div>
    </footer>
  )
}

export default function Home() {
  return (
    <div className="relative min-h-screen bg-ink-950 text-fog">
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
        className="fixed right-5 bottom-5 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-[#25d366] text-ink-950 shadow-[0_10px_30px_-5px_rgba(37,211,102,0.6)] transition hover:scale-110"
      >
        <MessageCircle className="h-7 w-7" />
      </a>
    </div>
  )
}
