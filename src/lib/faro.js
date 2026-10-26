// FaroContenido escribe y publica los artículos; aquí solo se LEEN los datos. El diseño del blog es de este sitio.
// Referencia de la API: https://faro.15-235-62-27.sslip.io/api/v1/hyperionmkt.com/posts
const FARO = "https://faro.15-235-62-27.sslip.io"
const SITE = "hyperionmkt.com"
const opts = { next: { revalidate: 300 } } // un artículo nuevo aparece en unos 5 minutos, sin volver a desplegar

export async function getPosts() {
  const r = await fetch(`${FARO}/api/v1/${SITE}/posts?limit=50`, opts)
  return r.ok ? r.json() : { site: null, posts: [] }
}

export async function getPost(slug) {
  const r = await fetch(`${FARO}/api/v1/${SITE}/posts/${encodeURIComponent(slug)}`, opts)
  return r.ok ? r.json() : null
}
