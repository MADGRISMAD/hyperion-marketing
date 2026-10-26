import Link from "next/link"
import { notFound, permanentRedirect } from "next/navigation"
import { ArrowLeft } from "lucide-react"
import { Logo } from "../../../components/landing/Navbar"
import { getPost } from "../../../lib/faro"

export async function generateMetadata({ params }) {
  const post = await getPost((await params).slug)
  if (!post) return {}
  return {
    title: post.seo.title,
    description: post.seo.description,
    alternates: { canonical: post.canonical },
    openGraph: { type: "article", title: post.title, description: post.seo.description, images: post.image ? [post.image.url] : [] },
    other: { "faro-site": post.site_id }, // Faro lo usa para marcar este sitio como conectado
  }
}

export default async function Post({ params }) {
  const { slug } = await params
  const post = await getPost(slug)
  if (!post) notFound()
  // Faro responde también a direcciones anteriores del artículo (p. ej. cuando se quitaron los acentos): se lleva a la actual
  if (post.slug !== slug) permanentRedirect(`/blog/${post.slug}`)
  return (
    <div className="min-h-screen bg-canvas text-ink">
      {post.jsonld.map((d, i) => (
        <script key={i} type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(d).replace(/</g, "\\u003c") }} />
      ))}
      <header className="border-b border-ink/15">
        <div className="container flex h-16 items-center justify-between">
          <Link href="/" aria-label="Hyperion Software, inicio"><Logo className="h-10" /></Link>
          <Link href="/blog" className="inline-flex items-center gap-1.5 text-sm font-medium text-grey-700 hover:text-ink"><ArrowLeft className="h-4 w-4" aria-hidden="true" /> Blog</Link>
        </div>
      </header>
      <main className="container py-14 md:py-20">
        <article className="mx-auto max-w-3xl">
          <p className="eyebrow text-grey-500">{new Date(post.published_at).toLocaleDateString("es-MX", { day: "numeric", month: "long", year: "numeric" })}</p>
          <h1 className="display mt-4 text-[clamp(2.2rem,5vw,3.8rem)]">{post.title}</h1>
          <p className="mt-6 text-xl text-grey-700">{post.summary}</p>
          {post.image && <img src={post.image.url} alt={post.image.alt} width={post.image.width} height={post.image.height} className="mt-10 aspect-video w-full rounded-lg object-cover" />}
          {/* post.html viene escapado desde Faro; el estilo del cuerpo se define aquí */}
          <div
            className="mt-10 text-lg leading-relaxed [&_h2]:mt-12 [&_h2]:text-3xl [&_h2]:font-bold [&_h2]:tracking-[-0.03em] [&_h3]:mt-8 [&_h3]:text-xl [&_h3]:font-bold [&_li]:mt-2 [&_p]:mt-5 [&_ul]:mt-5 [&_ul]:list-disc [&_ul]:pl-6"
            dangerouslySetInnerHTML={{ __html: post.html }}
          />
        </article>
      </main>
    </div>
  )
}
