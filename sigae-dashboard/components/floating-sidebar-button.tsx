"use client"

import { PanelLeft } from "lucide-react"
import { useSidebar } from "@/components/ui/sidebar"
import { Button } from "@/components/ui/button"
import { useEffect, useState } from "react"
import { useIsMobile } from "@/hooks/use-mobile"

export function FloatingSidebarButton() {
  const { toggleSidebar, open } = useSidebar()
  const isMobile = useIsMobile()
  const [mounted, setMounted] = useState(false)

  // Evitar problemas de hidratación
  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return null

  // Solo mostrar el botón flotante cuando la barra lateral está oculta
  if (open) return null

  return (
    <Button
      variant="default"
      size="icon"
      onClick={toggleSidebar}
      className={`fixed z-50 bg-[#0045aa] text-white hover:bg-[#0f6fbd] transition-all duration-300 shadow-md hover:shadow-lg ${
        isMobile ? "bottom-6 right-6 rounded-full w-14 h-14" : "top-4 left-4 w-10 h-10"
      } animate-pulse-slow`}
      aria-label="Mostrar menú"
    >
      <PanelLeft className={isMobile ? "h-6 w-6" : "h-5 w-5"} />
    </Button>
  )
}
