import React from "react"
import Script from "next/script"
import { Fraunces, Manrope } from "next/font/google"
import "../app/globals.css"
import { ThemeProvider } from "../components/ThemeProvider"
import { Analytics } from "@vercel/analytics/react"

const fraunces = Fraunces({ subsets: ["latin"], variable: "--font-fraunces", display: "swap" })
const manrope = Manrope({ subsets: ["latin"], variable: "--font-manrope", display: "swap" })

export const metadata = {
  metadataBase: new URL("https://hyperionmkt.com"),
  title: "Hyperion Marketing | Sistemas a medida, puntos de venta y automatización",
  description:
    "10 años creando sistemas a la medida, puntos de venta, automatizaciones y servicio técnico para negocios. Creadores de mitiendita.software, mirestaurante.software e interships.gg.",
  alternates: { canonical: "/" },
  openGraph: {
    title: "Hyperion Marketing | Software que crece con tu negocio",
    description:
      "Sistemas a la medida, puntos de venta, automatizaciones y servicio técnico. 10 años de experiencia.",
    url: "https://hyperionmkt.com",
    siteName: "Hyperion Marketing",
    locale: "es_MX",
    type: "website",
  },
}

export const viewport = {
  themeColor: "#040906",
}

const organizationLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "Hyperion Marketing",
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
    <html lang="es" suppressHydrationWarning className={`${fraunces.variable} ${manrope.variable}`}>
      <body>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationLd) }} />
        <ThemeProvider attribute="class" defaultTheme="dark" forcedTheme="dark" disableTransitionOnChange>
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
        <Analytics />
      </body>
    </html>
  )
}
