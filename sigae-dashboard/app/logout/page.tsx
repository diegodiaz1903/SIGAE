"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"

export default function LogoutPage() {
  const router = useRouter()

  useEffect(() => {
    // Limpiar localStorage
    localStorage.removeItem("isAuthenticated")
    localStorage.removeItem("username")
    localStorage.removeItem("userRole")

    // Redirigir al login
    router.push("/login")
  }, [router])

  return (
    <div className="flex items-center justify-center min-h-screen bg-[#a6a6a6]">
      <div className="bg-white p-8 rounded-lg shadow-lg">
        <h1 className="text-2xl font-bold text-[#0045aa] mb-4">Cerrando sesión...</h1>
        <p className="text-[#70aad8]">Redirigiendo al inicio de sesión.</p>
      </div>
    </div>
  )
}
