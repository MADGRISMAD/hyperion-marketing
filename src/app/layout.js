import React from "react"


import "../app/globals.css"
import { ThemeProvider } from "../components/ThemeProvider"

export const metadata = {
  title: "Hyperion Marketing - Soluciones IT a la medida para tu negocio",
  description:
    "Creamos páginas web y sistemas personalizados que impulsan el crecimiento de tu empresa y mejoran la experiencia de tus clientes.",
}

export default function RootLayout(props) {
  const { children } = props;
  return (
    <html lang="es" suppressHydrationWarning>
      <body>
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem disableTransitionOnChange>
          {children}
        </ThemeProvider>
      </body>
    </html>
  )
}
