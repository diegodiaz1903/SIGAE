"use client"

import type React from "react"
import { AppSidebar } from "@/components/app-sidebar"
import { SidebarInset } from "@/components/ui/sidebar"
import { ThemeProvider } from "@/components/theme-provider"
import { FloatingSidebarButton } from "@/components/floating-sidebar-button"
import { MobileDetector } from "@/components/mobile-detector"
import { usePathname } from "next/navigation"
import { SidebarProvider } from "@/components/ui/sidebar"

function LayoutWrapper({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const isLoginPage = pathname === "/login"

  if (isLoginPage) {
    return children
  }

  return (
    <>
      <MobileDetector />
      <SidebarProvider defaultOpen={false}>
        <AppSidebar />
        <FloatingSidebarButton />
        <SidebarInset className="bg-[#a6a6a6] transition-all duration-300">{children}</SidebarInset>
      </SidebarProvider>
    </>
  )
}

export default function ClientLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="es">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Source+Sans+3:wght@300;400;500;600;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="font-source-sans">
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem disableTransitionOnChange>
          <LayoutWrapper>{children}</LayoutWrapper>
        </ThemeProvider>
        <script
          dangerouslySetInnerHTML={{
            __html: `
            document.addEventListener('DOMContentLoaded', function() {
              // Añadir clase para iniciar animaciones después de que la página cargue
              setTimeout(() => {
                document.body.classList.add('loaded');
              }, 100);
            });
          `,
          }}
        />
      </body>
    </html>
  )
}
