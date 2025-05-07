"use client"

import { useEffect } from "react"

export function MobileDetector() {
  useEffect(() => {
    // Detectar si es un dispositivo móvil y establecer una variable CSS
    const checkMobile = () => {
      const isMobile = window.innerWidth < 768
      document.documentElement.style.setProperty("--is-mobile", isMobile ? "1" : "0")

      // Añadir/quitar clase al body
      if (isMobile) {
        document.body.classList.add("is-mobile")
      } else {
        document.body.classList.remove("is-mobile")
      }
    }

    // Comprobar al cargar
    checkMobile()

    // Comprobar al cambiar el tamaño de la ventana
    window.addEventListener("resize", checkMobile)

    return () => {
      window.removeEventListener("resize", checkMobile)
    }
  }, [])

  return null
}
