"use client"

import type React from "react"

import { useState, useEffect } from "react"
import Image from "next/image"
import { useRouter } from "next/navigation"
import { motion } from "framer-motion"

export default function LoginPage() {
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const router = useRouter()

  // Verificar si ya hay una sesión activa
  useEffect(() => {
    const isAuthenticated = localStorage.getItem("isAuthenticated") === "true"
    if (isAuthenticated) {
      const userRole = localStorage.getItem("userRole") || "admin"
      if (userRole === "admin") {
        router.push("/dashboard")
      } else if (userRole === "student") {
        router.push("/alumnos")
      } else if (userRole === "teacher") {
        router.push("/maestros")
      }
    }
  }, [router])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setError("")

    // Verificar las credenciales
    if (username === "Jefe" && password === "jefe1") {
      // Guardar el estado de autenticación en localStorage
      localStorage.setItem("isAuthenticated", "true")
      localStorage.setItem("username", username)
      localStorage.setItem("userRole", "admin")

      // Credenciales correctas, redirigir al dashboard
      router.push("/dashboard")
    } else if (username === "Alumno" && password === "alumno1") {
      // Guardar el estado de autenticación en localStorage
      localStorage.setItem("isAuthenticated", "true")
      localStorage.setItem("username", "Ana García")
      localStorage.setItem("userRole", "student")

      // Credenciales correctas, redirigir al dashboard de estudiantes
      router.push("/alumnos")
    } else if (username === "Maestro" && password === "maestro1") {
      // Guardar el estado de autenticación en localStorage
      localStorage.setItem("isAuthenticated", "true")
      localStorage.setItem("username", "Dr. Juan Pérez")
      localStorage.setItem("userRole", "teacher")

      // Credenciales correctas, redirigir al dashboard de maestros
      router.push("/maestros")
    } else {
      // Credenciales incorrectas, mostrar error
      setError("Usuario o contraseña incorrectos")
    }
  }

  return (
    <div className="flex min-h-screen bg-[#a6a6a6]">
      {/* Lado izquierdo - Logo y título */}
      <div className="hidden md:flex md:w-1/2 items-center justify-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center"
        >
          <div className="mb-4">
            <Image src="/images/sigae-text.png" alt="SIGAE" width={600} height={200} className="object-contain" />
          </div>
        </motion.div>
      </div>

      {/* Lado derecho - Formulario de inicio de sesión */}
      <div className="w-full md:w-1/2 flex items-center justify-center p-8">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="bg-white rounded-lg shadow-lg p-8 w-full max-w-md"
        >
          <div className="flex justify-center mb-8">
            <Image src="/images/sigae-logo.png" alt="SIGAE Logo" width={80} height={80} className="object-contain" />
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <input
                type="text"
                placeholder="Usuario"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#0045aa]"
                required
              />
            </div>

            <div>
              <input
                type="password"
                placeholder="Contraseña"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#0045aa]"
                required
              />
            </div>

            {error && <div className="text-red-500 text-sm font-medium">{error}</div>}

            <div className="text-right">
              <a href="#" className="text-[#0045aa] text-sm hover:underline">
                ¿Olvidaste tu contraseña?
              </a>
            </div>

            <button
              type="submit"
              className="w-full bg-[#0045aa] text-white py-3 rounded-md hover:bg-[#003d96] transition-colors duration-300"
            >
              Iniciar Sesión
            </button>
          </form>
        </motion.div>
      </div>
    </div>
  )
}
