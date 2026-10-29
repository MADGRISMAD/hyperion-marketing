import React from "react"
import Script from "next/script"
import localFont from "next/font/local"
import "../app/globals.css"
import { ThemeProvider } from "../components/ThemeProvider"
import { Analytics } from "@vercel/analytics/react"
import { UMAMI_URL } from "../lib/traffic.mjs"
import { SITE, ORG_ID } from "../lib/site"

// Schibsted Grotesk (variable): titulares y texto. Plex Mono: etiquetas pequeñas.
// Van dentro del proyecto (juego latino) para que la compilación no dependa de descargarlas de Google.
const schibsted = localFont({ src: "./fonts/schibsted.woff2", weight: "400 900", variable: "--font-schibsted", display: "swap" })
// Space Grotesk (variable) y Space Mono: la tipografía de la marca, según el press kit. Se usan en toda la landing salvo en el hero.
const spaceGrotesk = localFont({ src: "./fonts/SpaceGrotesk-Variable.ttf", weight: "300 700", variable: "--font-space", display: "swap" })
const spaceMono = localFont({ src: "./fonts/SpaceMono-Regular.ttf", weight: "400", variable: "--font-spacemono", display: "swap" })
const plex = localFont({
  src: [
    { path: "./fonts/plex-mono-400.woff2", weight: "400" },
    { path: "./fonts/plex-mono-500.woff2", weight: "500" },
  ],
  variable: "--font-plex",
  display: "swap",
})

export const metadata = {
  metadataBase: new URL("https://www.hyperionmkt.com"),
  title: "Hyperion Software | Sistemas a la medida y puntos de venta en Tijuana",
  description:
    "Estudio de software en Tijuana desde 2016: sistemas a la medida, puntos de venta, automatizaciones y servicio técnico para negocios de todo México.",
  alternates: { canonical: "/" },
  // Verificación de propiedad en Google Search Console (necesaria para publicar Faro con Google)
  verification: { google: "0cHVa4OdvzTtasKE6twq695QpSrM7D0UjVdBfsprBrs" },
  openGraph: {
    title: "Hyperion Software | Sistemas a la medida y puntos de venta en Tijuana",
    description:
      "Estudio de software en Tijuana desde 2016: sistemas a la medida, puntos de venta, automatizaciones y servicio técnico.",
    url: "https://www.hyperionmkt.com",
    siteName: "Hyperion Software",
    locale: "es_MX",
    type: "website",
    images: [{ url: "/og.png", width: 1200, height: 630, alt: "Hyperion Software" }],
  },
  twitter: { card: "summary_large_image", images: ["/og.png"] },
}

export const viewport = {
  themeColor: "#f5f4f0",
}

// Grafo de la marca: las demás páginas (productos, blog) enlazan a la organización por su @id
const organizationLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": ORG_ID,
      name: "Hyperion Software",
      url: SITE,
      logo: `${SITE}/brand/hyperion-logo.png`,
      foundingDate: "2016",
      description: "Estudio de software en Tijuana: sistemas a la medida, puntos de venta, automatizaciones y servicio técnico.",
      address: { "@type": "PostalAddress", addressLocality: "Tijuana", addressRegion: "Baja California", addressCountry: "MX" },
      contactPoint: {
        "@type": "ContactPoint",
        telephone: "+526645798903",
        email: "info@hyperionmkt.com",
        contactType: "customer service",
        areaServed: "MX",
        availableLanguage: ["Spanish"],
      },
    },
    { "@type": "WebSite", "@id": `${SITE}/#website`, url: SITE, name: "Hyperion Software", inLanguage: "es-MX", publisher: { "@id": ORG_ID } },
  ],
}

export default function RootLayout({ children }) {
  return (
    <html lang="es" suppressHydrationWarning className={`${schibsted.variable} ${plex.variable} ${spaceGrotesk.variable} ${spaceMono.variable}`}>
      <body>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationLd) }} />
        <ThemeProvider attribute="class" defaultTheme="light" forcedTheme="light" disableTransitionOnChange>
          {children}
        </ThemeProvider>

        {/* Google Analytics */}
        <Script src="https://www.googletagmanager.com/gtag/js?id=G-LZKWCDZ9L1" strategy="afterInteractive" />
        <Script id="gtag-init" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-LZKWCDZ9L1');
          `}
        </Script>
        {/* Umami: visitas sin cookies; alimenta la página pública /trafico. Sin parámetros de la URL (pueden traer datos). */}
        <Script src={`${UMAMI_URL}/script.js`} data-website-id="2df43349-9f98-473d-936a-7b70b6005039" data-domains="hyperionmkt.com,www.hyperionmkt.com" data-exclude-search="true" strategy="afterInteractive" />
        <Analytics />
      </body>
    </html>
  )
}
