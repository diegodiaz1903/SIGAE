import type React from "react"
import "./globals.css"
import ClientLayout from "./clientLayout"

export const metadata = {
  title: "SIGAE - Softedu",
  description: "Sistema Integrado para la Gestión de Atributos de Egreso",
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return <ClientLayout>{children}</ClientLayout>
}
