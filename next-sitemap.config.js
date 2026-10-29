// Misma API pública de artículos publicados que usa src/lib/faro.js.
const POSTS = 'https://faro.hyperionmkt.com/api/v1/hyperionmkt.com/posts'

async function read(url) {
  const response = await fetch(url, { signal: AbortSignal.timeout(10000) })
  if (!response.ok) throw new Error(`Faro: HTTP ${response.status}`)
  return response.json()
}

/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: 'https://www.hyperionmkt.com',
  generateRobotsTxt: true,
  sitemapSize: 5000,
  exclude: ['/gracias', '/icon.svg', '/apple-icon.png'],
  robotsTxtOptions: {
    transformRobotsTxt: async (_, text) => text.replace(/# Host\nHost: [^\n]+\n/, ''),
  },
  additionalPaths: async () => {
    const paths = []
    try {
      let page = 1
      let totalPages = 1
      do {
        const data = await read(`${POSTS}?limit=50&page=${page}`)
        if (!Array.isArray(data.posts)) throw new Error('Faro: listado de artículos inválido')
        totalPages = Math.ceil(data.total / 50)
        for (const post of data.posts) {
          const detail = await read(`${POSTS}/${encodeURIComponent(post.slug)}`)
          const modified = detail.jsonld?.find((item) => item['@type'] === 'BlogPosting')?.dateModified
          paths.push({ loc: post.path, lastmod: modified || detail.published_at })
        }
        page++
      } while (page <= totalPages)
    } catch (error) {
      console.warn('[next-sitemap] No se pudieron cargar todos los artículos de Faro:', error.message)
    }
    return paths
  },
}
