import React from "react"
import Head from "next/head"
import Script from "next/script"
import "../app/globals.css"
import { ThemeProvider } from "../components/ThemeProvider"

export const metadata = {
  title: "Soluciones IT personalizadas | Hyperion Marketing",
  description:
    "Impulsa tu negocio con soluciones digitales personalizadas en desarrollo web, marketing digital y sistemas IT a medida.",
}

export default function RootLayout(props) {
  const { children } = props

  return (
    <html lang="es" suppressHydrationWarning>
      <Head>
        {/* Canonical */}
        <link rel="canonical" href="https://hyperionmkt.com/" />

        {/* Datos estructurados de Schema.org */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              name: "Hyperion Marketing",
              url: "https://hyperionmkt.com",
              logo: "https://hyperionmkt.com/logo.png", // actualiza si usas otro path
              description:
                "Agencia de marketing y desarrollo IT que crea soluciones digitales personalizadas para empresas.",
              address: {
                "@type": "PostalAddress",
                addressLocality: "Tijuana",
                addressRegion: "Baja California",
                addressCountry: "MX",
              },
              contactPoint: {
                "@type": "ContactPoint",
                telephone: "+52 6645798903",
                contactType: "customer service",
                areaServed: "MX",
                availableLanguage: ["Spanish", "English"],
              },
              sameAs: [
                "https://facebook.com/tuPagina",
                "https://twitter.com/tuCuenta",
                "https://instagram.com/tuPerfil",
                "https://linkedin.com/company/tuEmpresa",
              ],
            }),
          }}
        />
      </Head>

      <body>
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem disableTransitionOnChange>
          {children}
        </ThemeProvider>

        {/* Google Analytics */}
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-LZKWCDZ9L1"
          strategy="afterInteractive"
        />
        <Script id="gtag-init" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-LZKWCDZ9L1');
          `}
        </Script>
      </body>
    </html>
  )
}
