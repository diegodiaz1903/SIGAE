"use client"

import { useState, useEffect } from "react"

export function useIsMobile() {
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    // Función para comprobar si es un dispositivo móvil
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768)
    }

    // Comprobar al montar el componente
    checkMobile()

    // Añadir listener para cambios de tamaño
    window.addEventListener("resize", checkMobile)

    // Limpiar listener al desmontar
    return () => window.removeEventListener("resize", checkMobile)
  }, [])

  return isMobile
}
