// Visitas de los sitios de Hyperion, leídas de Umami (nuestro servidor de estadísticas).
// Los enlaces públicos ("share") son de solo lectura y de un solo sitio: por diseño pueden verse,
// por eso viven en el código. Lo único que cambia entre entornos es la dirección de Umami.
export const UMAMI_URL = (process.env.UMAMI_URL || "https://stats.hyperionmkt.com").replace(/\/$/, "")
export const TZ = "America/Tijuana"
const WEEK_MS = 7 * 86400000

export const SITES = [
  { name: "Mitiendita", href: "https://mitiendita.software", websiteId: "dc14a46f-1716-4d6a-be4b-bbea3eb73811", shareId: "a6b900cc9dd3a89c", color: "#e8750c" },
  { name: "Mirestaurante", href: "https://mirestaurante-ten.vercel.app", websiteId: "4e315292-f774-4979-8a5c-d9f7365317dd", shareId: "6b86f137e64e5ea5", color: "#c8341b", beta: true },
  { name: "Caresia", href: "https://caresia.vercel.app", websiteId: "055800fe-8fa4-42a7-a6af-daca83ab9c81", shareId: "e2bfb4fd7f072684", color: "#2a5d9f" },
  { name: "BeHive", href: "https://micolmena-eta.vercel.app", websiteId: "5604b26b-c871-4d2f-afbb-855757dea310", shareId: "96351afc8ce48306", color: "#b45309", beta: true },
  { name: "Hyperion", href: "https://www.hyperionmkt.com", websiteId: "2df43349-9f98-473d-936a-7b70b6005039", shareId: "e77c8cb351dbea3e", color: "#1d4ed8" },
]

const parts = (fmt, ms) => Object.fromEntries(fmt.formatToParts(new Date(ms)).map((p) => [p.type, p.value]))

/** Diferencia (ms) entre la hora de pared de Tijuana y UTC en ese instante. */
export function offsetMs(utcMs, tz = TZ) {
  const p = parts(
    new Intl.DateTimeFormat("en-US", { timeZone: tz, hourCycle: "h23", year: "numeric", month: "2-digit", day: "2-digit", hour: "2-digit", minute: "2-digit", second: "2-digit" }),
    utcMs
  )
  return Date.UTC(p.year, p.month - 1, p.day, p.hour, p.minute, p.second) - Math.floor(utcMs / 1000) * 1000
}

/** Instante (ms UTC) en que empezó, en Tijuana, el día de hace `daysAgo` días. */
export function localMidnight(daysAgo, now = Date.now(), tz = TZ) {
  const p = parts(new Intl.DateTimeFormat("en-CA", { timeZone: tz, year: "numeric", month: "2-digit", day: "2-digit" }), now)
  const wall = Date.UTC(p.year, p.month - 1, p.day - daysAgo)
  return wall - offsetMs(wall, tz)
}

/** Las 7 fechas (AAAA-MM-DD) que se muestran: de hace 6 días a hoy (hoy va incompleto). */
export function weekDates(now = Date.now(), tz = TZ) {
  const p = parts(new Intl.DateTimeFormat("en-CA", { timeZone: tz, year: "numeric", month: "2-digit", day: "2-digit" }), now)
  return Array.from({ length: 7 }, (_, i) => new Date(Date.UTC(p.year, p.month - 1, p.day - (6 - i))).toISOString().slice(0, 10))
}

/** Cambio porcentual contra la semana anterior; null si antes no había visitas (no se puede comparar). */
export function change(now, before) {
  return before > 0 ? Math.round(((now - before) / before) * 100) : null
}

const num = (v) => (v && typeof v === "object" ? Number(v.value) || 0 : Number(v) || 0)

async function getJson(url, headers) {
  const res = await fetch(url, { headers, next: { revalidate: 600 } })
  if (!res.ok) throw new Error(`${res.status} ${url.split("?")[0]}`)
  return res.json()
}

/**
 * Visitas de los últimos 7 días de un sitio, contando hoy hasta este momento. Se compara con los 7 días
 * anteriores cortados a la misma hora, para que la comparación sea justa. Si Umami no responde: { error: true }.
 */
export async function getTraffic(site, now = Date.now()) {
  try {
    const share = await getJson(`${UMAMI_URL}/api/share/${site.shareId}`)
    const h = { "x-umami-share-token": share.token, "x-umami-share-context": "1" }
    const start = localMidnight(6, now)
    const end = now
    const prevStart = localMidnight(13, now)
    const prevEnd = now - WEEK_MS
    const base = `${UMAMI_URL}/api/websites/${share.websiteId}`
    const [cur, prev, series] = await Promise.all([
      getJson(`${base}/stats?startAt=${start}&endAt=${end}`, h),
      getJson(`${base}/stats?startAt=${prevStart}&endAt=${prevEnd}`, h),
      getJson(`${base}/pageviews?startAt=${start}&endAt=${end}&unit=day&timezone=${TZ}`, h),
    ])
    const byDay = (rows) => Object.fromEntries((rows || []).map((r) => [String(r.x).slice(0, 10), Number(r.y) || 0]))
    const views = byDay(series.pageviews)
    const visitors = byDay(series.sessions)
    return {
      visitors: num(cur.visitors),
      pageviews: num(cur.pageviews),
      prevVisitors: num(prev.visitors),
      days: weekDates(now).map((date) => ({ date, visitors: visitors[date] || 0, pageviews: views[date] || 0 })),
    }
  } catch {
    return { error: true }
  }
}

