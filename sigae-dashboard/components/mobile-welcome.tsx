"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import { Home, Users, Calendar, FileText } from "lucide-react"
import { useSidebar } from "@/components/ui/sidebar"

interface MobileWelcomeProps {
  username?: string
}

export function MobileWelcome({ username = "usuario" }: MobileWelcomeProps) {
  const { toggleSidebar } = useSidebar()
  const [greeting, setGreeting] = useState("Bienvenido")

  useEffect(() => {
    const hour = new Date().getHours()
    if (hour < 12) setGreeting("Buenos días")
    else if (hour < 18) setGreeting("Buenas tardes")
    else setGreeting("Buenas noches")
  }, [])

  return (
    <main className="flex flex-col min-h-screen p-4">
      {/* Cabecera con saludo */}
      <div className="flex flex-col items-center mb-8 animate-fade-in">
        <div className="w-24 h-24 relative mb-4">
          <Image src="/images/logo.png" alt="SIGAE Logo" fill className="object-contain" />
        </div>
        <h1 className="text-3xl font-bold text-[#0045aa] text-center">{greeting}</h1>
        <p className="text-lg text-[#0f6fbd] text-center mt-2">
          Sistema Integrado para la Gestión de Atributos de Egreso
        </p>
      </div>

      {/* Tarjetas de acceso rápido */}
      <div className="grid grid-cols-2 gap-4 mb-8">
        <a
          href="/maestros"
          className="bg-white rounded-xl p-4 shadow-md flex flex-col items-center justify-center hover-glow animate-fade-in"
          style={{
            animationDelay: "100ms",
            height: "120px",
          }}
        >
          <Users size={36} color="#0045aa" className="mb-2" />
          <span className="text-sm font-medium text-[#0045aa]">Maestros</span>
        </a>
        <a
          href="/asignaciones"
          className="bg-white rounded-xl p-4 shadow-md flex flex-col items-center justify-center hover-glow animate-fade-in"
          style={{
            animationDelay: "200ms",
            height: "120px",
          }}
        >
          <Calendar size={36} color="#0f6fbd" className="mb-2" />
          <span className="text-sm font-medium text-[#0045aa]">Asignaciones</span>
        </a>
        <a
          href="/reportes"
          className="bg-white rounded-xl p-4 shadow-md flex flex-col items-center justify-center hover-glow animate-fade-in"
          style={{
            animationDelay: "300ms",
            height: "120px",
          }}
        >
          <FileText size={36} color="#004cae" className="mb-2" />
          <span className="text-sm font-medium text-[#0045aa]">Reportes</span>
        </a>
        <button
          className="bg-white rounded-xl p-4 shadow-md flex flex-col items-center justify-center hover-glow animate-fade-in"
          style={{
            animationDelay: "400ms",
            height: "120px",
          }}
          onClick={() => toggleSidebar()}
        >
          <Home size={36} color="#70aad8" className="mb-2" />
          <span className="text-sm font-medium text-[#0045aa]">Menú</span>
        </button>
      </div>

      {/* Actividad reciente */}
      <div className="bg-white rounded-xl p-4 shadow-md animate-slide-in-up">
        <h2 className="text-xl font-semibold text-[#0045aa] mb-4">Actividad reciente</h2>
        <div className="space-y-3">
          {[
            "Asignación de Matemáticas actualizada",
            "Nuevo maestro registrado",
            "Reporte de calificaciones generado",
          ].map((activity, index) => (
            <div key={index} className="p-3 border-b border-[#70aad8]/30 last:border-0">
              <p className="text-sm text-[#0f6fbd]">{activity}</p>
              <p className="text-xs text-gray-500 mt-1">
                Hace {index + 1} {index === 0 ? "hora" : "horas"}
              </p>
            </div>
          ))}
        </div>
      </div>
    </main>
  )
}
