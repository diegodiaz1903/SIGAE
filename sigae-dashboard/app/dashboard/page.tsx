"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import Image from "next/image"
import { MobileWelcome } from "@/components/mobile-welcome"

export default function Dashboard() {
  const router = useRouter()
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [username, setUsername] = useState("usuario")
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Verificar si el usuario está autenticado
    const checkAuth = () => {
      const authStatus = localStorage.getItem("isAuthenticated") === "true"
      const storedUsername = localStorage.getItem("username") || "usuario"

      setIsAuthenticated(authStatus)
      setUsername(storedUsername)
      setIsLoading(false)
    }

    checkAuth()
  }, [])

  // Si no está autenticado, redirigir a login
  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      router.push("/login")
    }
  }, [isAuthenticated, isLoading, router])

  if (isLoading || !isAuthenticated) {
    return null // No mostrar nada mientras se verifica la autenticación
  }

  return (
    <>
      {/* Versión móvil */}
      <div className="md:hidden">
        <MobileWelcome username={username} />
      </div>

      {/* Versión escritorio */}
      <div className="hidden md:block">
        <main className="flex min-h-screen flex-col items-center p-8 animate-fade-in">
          <div className="flex flex-col md:flex-row items-center justify-center gap-8 w-full max-w-5xl mx-auto">
            <div className="w-64 h-64 relative animate-slide-in-up hover-scale">
              <Image src="/images/logo.png" alt="SIGAE Logo" fill className="object-contain animate-rotate" />
            </div>
            <div className="text-center md:text-left">
              <h1 className="text-4xl md:text-6xl font-bold text-[#0045aa] animate-slide-in-right">
                Bienvenido {username}
              </h1>
              <p className="mt-4 text-xl text-[#0f6fbd] animate-slide-in-right" style={{ animationDelay: "0.2s" }}>
                Sistema Integrado para la Gestión de Atributos de Egreso
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full max-w-5xl mx-auto mt-16">
            <a
              href="/maestros"
              className="bg-white p-6 rounded-lg shadow-md hover-scale hover-glow animate-slide-in-up cursor-pointer"
              style={{ animationDelay: "0.1s" }}
            >
              <h3 className="text-xl font-semibold text-[#0045aa] mb-2">Gestión de Maestros</h3>
              <p className="text-[#0f6fbd]">Accede rápidamente a las funciones más utilizadas del sistema.</p>
            </a>
            <a
              href="/asignaciones"
              className="bg-white p-6 rounded-lg shadow-md hover-scale hover-glow animate-slide-in-up cursor-pointer"
              style={{ animationDelay: "0.2s" }}
            >
              <h3 className="text-xl font-semibold text-[#0045aa] mb-2">Asignaciones</h3>
              <p className="text-[#0f6fbd]">Accede rápidamente a las funciones más utilizadas del sistema.</p>
            </a>
            <a
              href="/reportes"
              className="bg-white p-6 rounded-lg shadow-md hover-scale hover-glow animate-slide-in-up cursor-pointer"
              style={{ animationDelay: "0.3s" }}
            >
              <h3 className="text-xl font-semibold text-[#0045aa] mb-2">Reportes</h3>
              <p className="text-[#0f6fbd]">Accede rápidamente a las funciones más utilizadas del sistema.</p>
            </a>
          </div>
        </main>
      </div>
    </>
  )
}
