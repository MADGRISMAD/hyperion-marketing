import Link from "next/link"
import { ArrowLeft } from "lucide-react"
import { Logo } from "../../components/landing/Navbar"
import { getPosts } from "../../lib/faro"
import { SITE, ORG_ID } from "../../lib/site"

export const metadata = {
  title: "Blog | Hyperion Software",
  description: "Ideas sobre sistemas a la medida, puntos de venta y automatización para negocios.",
  alternates: { canonical: "/blog" },
  openGraph: { url: "/blog", images: ["/og.png"] },
}

export default async function Blog() {
  const { site, posts } = await getPosts()
  const ld = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Blog",
        "@id": `${SITE}/blog#blog`,
        url: `${SITE}/blog`,
        name: "Blog de Hyperion Software",
        inLanguage: "es-MX",
        publisher: { "@id": ORG_ID },
        blogPost: posts.map((p) => ({ "@type": "BlogPosting", headline: p.title, url: `${SITE}${p.path}`, datePublished: p.published_at })),
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Inicio", item: SITE },
          { "@type": "ListItem", position: 2, name: "Blog", item: `${SITE}/blog` },
        ],
      },
    ],
  }
  return (
    <div className="min-h-screen bg-canvas text-ink">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(ld) }} />
      <header className="border-b border-ink/15">
        <div className="container flex h-16 items-center justify-between">
          <Link href="/" aria-label="Hyperion Software, inicio"><Logo className="h-10" /></Link>
          <Link href="/" className="inline-flex items-center gap-1.5 text-sm font-medium text-grey-700 hover:text-ink"><ArrowLeft className="h-4 w-4" aria-hidden="true" /> Inicio</Link>
        </div>
      </header>
      <main className="container py-14 md:py-20">
        {site && <meta name="faro-site" content={site.id} />}
        <p className="eyebrow text-grey-500">Blog</p>
        <h1 className="display mt-4 max-w-3xl text-[clamp(2.4rem,6vw,4.6rem)]">Ideas para tu negocio.</h1>
        <ul className="mt-14 divide-y divide-ink/15 border-y border-ink/15">
          {posts.map((p) => (
            <li key={p.id}>
              <Link href={p.path} className="group grid items-center gap-6 py-8 md:grid-cols-[260px_1fr]">
                {p.image ? <img src={p.image.url} alt={p.image.alt} width={p.image.width} height={p.image.height} className="aspect-video w-full rounded-lg object-cover" /> : <div className="aspect-video rounded-lg bg-ink/5" />}
                <div>
                  <p className="eyebrow text-grey-500">{new Date(p.published_at).toLocaleDateString("es-MX", { day: "numeric", month: "long", year: "numeric" })}</p>
                  <h2 className="mt-2 text-2xl font-bold tracking-[-0.02em] group-hover:underline">{p.title}</h2>
                  <p className="mt-2 max-w-2xl text-grey-700">{p.summary}</p>
                </div>
              </Link>
            </li>
          ))}
        </ul>
        {posts.length === 0 && <p className="mt-10 text-grey-700">Pronto habrá artículos.</p>}
      </main>
    </div>
  )
}
