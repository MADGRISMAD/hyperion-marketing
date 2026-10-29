const { test } = require('node:test')
const assert = require('node:assert/strict')
const config = require('./next-sitemap.config')

test('sitemap: paginación, fecha de modificación y fallos de Faro', async (t) => {
  const fetch = global.fetch
  const warn = console.warn
  const warnings = []
  t.after(() => { global.fetch = fetch; console.warn = warn })
  console.warn = (...args) => warnings.push(args)
  const calls = []
  global.fetch = async (url, options) => {
    calls.push(url)
    assert.ok(options.signal)
    const data = url.includes('?')
      ? { total: 51, posts: [{ slug: `post-${new URL(url).searchParams.get('page')}`, path: `/blog/post-${new URL(url).searchParams.get('page')}` }] }
      : { published_at: '2026-01-01T00:00:00Z', jsonld: [{ '@type': 'BlogPosting', dateModified: '2026-10-26T02:24:54.442662Z' }] }
    return { ok: true, json: async () => data }
  }
  const paths = await config.additionalPaths()
  assert.deepEqual(paths.map((p) => p.loc), ['/blog/post-1', '/blog/post-2'])
  assert.ok(paths.every((p) => p.lastmod === '2026-10-26T02:24:54.442662Z'))
  assert.equal(calls.length, 4)
  for (const response of [() => { throw new Error('sin conexión') }, () => ({ ok: false, status: 503 }), () => ({ ok: true, json: async () => ({}) })]) {
    global.fetch = async () => response()
    assert.deepEqual(await config.additionalPaths(), [])
  }
  assert.equal(warnings.length, 3)
  assert.equal(config.siteUrl, 'https://www.hyperionmkt.com')
  assert.deepEqual(config.exclude, ['/gracias', '/icon.svg', '/apple-icon.png'])
  const robots = await config.robotsTxtOptions.transformRobotsTxt(config, '# Host\nHost: https://www.hyperionmkt.com\n\nSitemap: https://www.hyperionmkt.com/sitemap.xml\n')
  assert.ok(!robots.includes('Host:'))
  assert.ok(robots.includes('Sitemap: https://www.hyperionmkt.com/sitemap.xml'))
})

test('blog: una caída de Faro tampoco interrumpe el prerender del build', async (t) => {
  const { getPosts } = await import('./src/lib/faro.js')
  const fetch = global.fetch
  const warn = console.warn
  const warnings = []
  t.after(() => { global.fetch = fetch; console.warn = warn })
  console.warn = (...args) => warnings.push(args)
  for (const response of [() => { throw new Error('sin conexión') }, () => ({ ok: false, status: 503 })]) {
    global.fetch = async () => response()
    assert.deepEqual(await getPosts(), { site: null, posts: [] })
  }
  assert.equal(warnings.length, 2)
})
