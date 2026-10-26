import React from "react"
import Script from "next/script"
import localFont from "next/font/local"
import "../app/globals.css"
import { ThemeProvider } from "../components/ThemeProvider"
import { Analytics } from "@vercel/analytics/react"
import { UMAMI_URL } from "../lib/traffic.mjs"

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
  metadataBase: new URL("https://hyperionmkt.com"),
  title: "Hyperion Software | Sistemas a medida, puntos de venta y automatización",
  description:
    "10 años creando sistemas a la medida, puntos de venta, automatizaciones y servicio técnico para negocios. Creadores de Mitiendita, Caresia, Camión TJ, Grids, Barbella, Mirestaurante, Internships.gg y BeHive.",
  alternates: { canonical: "/" },
  // Verificación de propiedad en Google Search Console (necesaria para publicar FaroContenido con Google)
  verification: { google: "0cHVa4OdvzTtasKE6twq695QpSrM7D0UjVdBfsprBrs" },
  openGraph: {
    title: "Hyperion Software | Sistemas a medida, puntos de venta y automatización",
    description:
      "Sistemas a la medida, puntos de venta, automatizaciones y servicio técnico. 10 años de experiencia.",
    url: "https://hyperionmkt.com",
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

const organizationLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "Hyperion Software",
  url: "https://hyperionmkt.com",
  description:
    "Empresa de tecnología con 10 años de experiencia en sistemas a la medida, puntos de venta, automatizaciones y servicio técnico.",
  address: {
    "@type": "PostalAddress",
    addressLocality: "Tijuana",
    addressRegion: "Baja California",
    addressCountry: "MX",
  },
  contactPoint: {
    "@type": "ContactPoint",
    telephone: "+52 6645798903",
    email: "info@hyperionmkt.com",
    contactType: "customer service",
    areaServed: "MX",
    availableLanguage: ["Spanish", "English"],
  },
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
