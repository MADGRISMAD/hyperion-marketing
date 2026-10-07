import Link from "next/link"
import { ArrowLeft, ArrowUpRight, TrendingDown, TrendingUp } from "lucide-react"
import { Logo } from "../../components/landing/Navbar"
import { SITES, change, getTraffic } from "../../lib/traffic.mjs"

// Los números se leen de Umami y se guardan 10 minutos: la página se sirve rápido aunque haya mucha gente.
export const revalidate = 600

export const metadata = {
  title: "Tráfico de nuestros sitios | Hyperion Marketing",
  description: "Visitas de la última semana de Mitiendita, Mirestaurante, Caresia, BeHive y Hyperion. Datos públicos, sin cookies.",
  alternates: { canonical: "/trafico" },
}

const fmt = new Intl.NumberFormat("es-MX")
const dayLabel = (date) =>
  new Date(`${date}T12:00:00Z`).toLocaleDateString("es-MX", { day: "numeric", month: "short", timeZone: "UTC" }).replace(".", "")
const weekday = (date) => new Date(`${date}T12:00:00Z`).toLocaleDateString("es-MX", { weekday: "narrow", timeZone: "UTC" })

function Delta({ now, before }) {
  const pct = change(now, before)
  if (pct === null) return <span className="text-xs text-fog/40">sin datos de 7 días antes</span>
  const up = pct >= 0
  const Icon = up ? TrendingUp : TrendingDown
  return (
    <span className={`inline-flex items-center gap-1 text-xs font-semibold ${up ? "text-emerald-600" : "text-rose-600"}`}>
      <Icon className="h-3.5 w-3.5" aria-hidden="true" />
      {up ? "+" : ""}
      {pct}% vs. 7 días antes
    </span>
  )
}

function Bars({ days, color, name }) {
  const max = Math.max(1, ...days.map((d) => d.visitors))
  const resumen = days.map((d) => `${dayLabel(d.date)}: ${d.visitors}`).join(", ")
  return (
    <div role="img" aria-label={`Visitantes por día de ${name}. ${resumen}`}>
      <div className="flex h-24 items-end gap-1.5" aria-hidden="true">
        {days.map((d) => (
          <div key={d.date} className="flex h-full flex-1 items-end" title={`${dayLabel(d.date)}: ${fmt.format(d.visitors)} visitantes`}>
            <div
              className="w-full rounded-t-md"
              style={{ height: `${d.visitors ? Math.max(6, (d.visitors / max) * 100) : 3}%`, background: color, opacity: d.visitors ? 1 : 0.2 }}
            />
          </div>
        ))}
      </div>
      <div className="mt-1.5 flex gap-1.5 text-[10px] text-fog/40 uppercase" aria-hidden="true">
        {days.map((d) => (
          <span key={d.date} className="flex-1 text-center">
            {weekday(d.date)}
          </span>
        ))}
      </div>
    </div>
  )
}

function Card({ site, data }) {
  return (
    <article className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
      <header className="flex items-start justify-between gap-3">
        <div className="flex items-center gap-2.5">
          <span className="h-3 w-3 rounded-full" style={{ background: site.color }} aria-hidden="true" />
          <h2 className="font-display text-xl font-bold">{site.name}</h2>
          {site.beta && <span className="rounded-full bg-brand/10 px-2 py-0.5 text-[10px] text-brand">Beta</span>}
        </div>
        <a href={site.href} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 text-xs text-fog/50 hover:text-fog">
          Visitar <ArrowUpRight className="h-3.5 w-3.5" aria-hidden="true" />
        </a>
      </header>

      {data.error ? (
        <p className="mt-8 rounded-xl bg-slate-50 p-4 text-sm text-fog/55">No pudimos leer las visitas en este momento. Vuelve a intentar en unos minutos.</p>
      ) : (
        <>
          <div className="mt-5 grid grid-cols-2 gap-4">
            <div>
              <p className="font-display text-3xl font-bold">{fmt.format(data.visitors)}</p>
              <p className="text-xs text-fog/50">visitantes</p>
            </div>
            <div>
              <p className="font-display text-3xl font-bold">{fmt.format(data.pageviews)}</p>
              <p className="text-xs text-fog/50">páginas vistas</p>
            </div>
          </div>
          <div className="mt-2">
            <Delta now={data.visitors} before={data.prevVisitors} />
          </div>
          <div className="mt-6">
            <Bars days={data.days} color={site.color} name={site.name} />
          </div>
        </>
      )}
    </article>
  )
}

export default async function Trafico() {
  const results = await Promise.all(SITES.map((site) => getTraffic(site)))
  const ok = results.filter((r) => !r.error)
  const total = ok.reduce((sum, r) => sum + r.visitors, 0)
  const days = ok[0]?.days
  const rango = days ? `${dayLabel(days[0].date)} al ${dayLabel(days[days.length - 1].date)}` : ""
  // Recién instalado el contador no hay nada que enseñar: mejor decirlo que publicar puros ceros.
  const sinDatos = ok.length > 0 && ok.every((r) => r.pageviews === 0 && r.prevVisitors === 0)

  return (
    <div className="min-h-screen bg-ink-900 text-fog">
      <header className="border-b border-slate-200 bg-white">
        <div className="container flex h-16 items-center justify-between">
          <Link href="/" aria-label="Hyperion Marketing, inicio">
            <Logo />
          </Link>
          <Link href="/" className="inline-flex items-center gap-1.5 text-sm font-medium text-fog/60 hover:text-fog">
            <ArrowLeft className="h-4 w-4" aria-hidden="true" /> Volver al inicio
          </Link>
        </div>
      </header>

      <main className="container py-14 md:py-20">
        <span className="mb-3 inline-block text-sm font-semibold tracking-wide text-brand uppercase">Transparencia</span>
        <h1 className="font-display text-4xl font-bold tracking-tight md:text-5xl">Tráfico de nuestros sitios</h1>
        <p className="mt-4 max-w-2xl text-fog/65">
          Así de visitados son los productos que construimos y operamos. Mostramos los números tal cual, cada semana, para que puedas ver que
          lo que hacemos funciona.
        </p>

        {sinDatos && (
          <p className="mt-8 max-w-2xl rounded-2xl border border-slate-200 bg-white px-6 py-5 text-fog/70">
            Estamos empezando a medir. Los primeros números aparecen en cuanto entren las primeras visitas; vuelve en un rato.
          </p>
        )}

        {ok.length > 0 && !sinDatos && (
          <p className="mt-8 inline-flex flex-wrap items-baseline gap-x-3 rounded-2xl border border-slate-200 bg-white px-6 py-4">
            <span className="font-display text-4xl font-bold">{fmt.format(total)}</span>
            <span className="text-sm text-fog/60">
              visitantes en total, del {rango} <span className="text-fog/40">(suma de los sitios)</span>
            </span>
          </p>
        )}

        {!sinDatos && (
          <div className="mt-8 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {SITES.map((site, i) => (
              <Card key={site.name} site={site} data={results[i]} />
            ))}
          </div>
        )}

        <p className="mt-10 max-w-3xl text-sm text-fog/50">
          {!sinDatos && <>Últimos 7 días, del {rango} (hoy incluido, hasta este momento), con horario de Tijuana, actualizado cada 10 minutos. El cambio se compara con los 7 días anteriores, cortados a la misma hora. </>}Contamos visitas con Umami, un contador sin cookies que no guarda
          datos personales ni identifica a nadie. Un visitante es una persona distinta en ese sitio; si visita varios, cuenta una vez en cada uno.
        </p>
      </main>
    </div>
  )
}
