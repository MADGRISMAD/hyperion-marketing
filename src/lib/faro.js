// Faro escribe y publica los artículos; aquí solo se LEEN los datos. El diseño del blog es de este sitio.
// Referencia de la API: https://faro.hyperionmkt.com/api/v1/hyperionmkt.com/posts
const FARO = "https://faro.hyperionmkt.com"
const SITE = "hyperionmkt.com"
const opts = { next: { revalidate: 300 } } // un artículo nuevo aparece en unos 5 minutos, sin volver a desplegar

export async function getPosts() {
  try {
    const r = await fetch(`${FARO}/api/v1/${SITE}/posts?limit=50`, { ...opts, signal: AbortSignal.timeout(10000) })
    if (!r.ok) throw new Error(`HTTP ${r.status}`)
    return await r.json()
  } catch (error) {
    console.warn("[Faro] No se pudieron cargar los artículos:", error.message)
    return { site: null, posts: [] }
  }
}

export async function getPost(slug) {
  const r = await fetch(`${FARO}/api/v1/${SITE}/posts/${encodeURIComponent(slug)}`, opts)
  return r.ok ? r.json() : null
}
