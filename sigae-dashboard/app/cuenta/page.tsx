"use client"

import type React from "react"

import { useState, useEffect } from "react"
import Image from "next/image"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { FadeIn, SlideIn, StaggerChildren, StaggerItem } from "@/components/transition-wrapper"
import { useIsMobile } from "@/hooks/use-mobile"
import { MobileAccountPage } from "@/components/mobile-account-page"
import { Upload, Key, User } from "lucide-react"

export default function AccountPage() {
  const isMobile = useIsMobile()
  const [userName, setUserName] = useState("Dr. Juan Pérez")
  const [userEmail, setUserEmail] = useState("juan.perez@ejemplo.com")
  const [mounted, setMounted] = useState(false)

  // Formularios
  const [passwordForm, setPasswordForm] = useState({
    oldPassword: "",
    newPassword: "",
    confirmPassword: "",
    verificationCode: "",
  })

  const [usernameForm, setUsernameForm] = useState({
    newUsername: "",
    confirmUsername: "",
    password: "",
  })

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return null

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPasswordForm({
      ...passwordForm,
      [e.target.name]: e.target.value,
    })
  }

  const handleUsernameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUsernameForm({
      ...usernameForm,
      [e.target.name]: e.target.value,
    })
  }

  const handlePasswordSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Aquí iría la lógica para cambiar la contraseña
    console.log("Cambio de contraseña:", passwordForm)
    // Resetear el formulario
    setPasswordForm({
      oldPassword: "",
      newPassword: "",
      confirmPassword: "",
      verificationCode: "",
    })
    // Mostrar mensaje de éxito (en una implementación real)
    alert("Contraseña cambiada con éxito")
  }

  const handleUsernameSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Aquí iría la lógica para cambiar el nombre de usuario
    console.log("Cambio de usuario:", usernameForm)
    // Actualizar el nombre de usuario en la interfaz
    setUserName(usernameForm.newUsername)
    // Resetear el formulario
    setUsernameForm({
      newUsername: "",
      confirmUsername: "",
      password: "",
    })
    // Mostrar mensaje de éxito (en una implementación real)
    alert("Nombre de usuario cambiado con éxito")
  }

  const handleImageUpload = () => {
    // En una implementación real, esto abriría un selector de archivos
    alert("Función para subir imagen")
  }

  if (isMobile) {
    return (
      <MobileAccountPage
        userName={userName}
        userEmail={userEmail}
        handlePasswordChange={handlePasswordChange}
        handleUsernameChange={handleUsernameChange}
        handlePasswordSubmit={handlePasswordSubmit}
        handleUsernameSubmit={handleUsernameSubmit}
        handleImageUpload={handleImageUpload}
        passwordForm={passwordForm}
        usernameForm={usernameForm}
      />
    )
  }

  return (
    <main className="flex flex-col p-6 md:p-8 animate-fade-in">
      <SlideIn direction="right">
        <h1 className="text-3xl md:text-4xl font-bold text-[#0045aa] mb-8">Mi Cuenta</h1>
      </SlideIn>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Perfil del usuario */}
        <FadeIn delay={0.2}>
          <Card className="hover-glow">
            <CardHeader>
              <CardTitle className="text-[#0045aa]">Información de Perfil</CardTitle>
            </CardHeader>
            <CardContent className="flex flex-col items-center">
              <div className="relative w-48 h-48 mb-6 group">
                {/* Reemplazamos el componente Image con un div para evitar problemas */}
                <div className="w-full h-full rounded-lg border-4 border-[#70aad8] bg-[#0045aa] flex items-center justify-center text-white text-4xl font-bold">
                  {userName.charAt(0)}
                </div>
                <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-30 transition-all duration-300 rounded-lg flex items-center justify-center">
                  <Button
                    variant="ghost"
                    size="icon"
                    className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-white text-[#0045aa] hover:bg-white/90"
                    onClick={handleImageUpload}
                  >
                    <Upload className="h-5 w-5" />
                  </Button>
                </div>
              </div>

              <h2 className="text-xl font-bold text-[#0045aa] mb-2">{userName}</h2>
              <p className="text-[#0f6fbd] mb-6">{userEmail}</p>

              <div className="flex flex-col gap-3 w-full">
                <Button
                  className="bg-[#0045aa] hover:bg-[#0f6fbd] text-white transition-all duration-300"
                  onClick={() => document.getElementById("password-section")?.scrollIntoView({ behavior: "smooth" })}
                >
                  <Key className="mr-2 h-4 w-4" /> Cambiar contraseña
                </Button>
                <Button
                  variant="outline"
                  className="border-[#70aad8] text-[#0045aa] hover:bg-[#70aad8]/20 transition-all duration-300"
                  onClick={handleImageUpload}
                >
                  <Upload className="mr-2 h-4 w-4" /> Subir imagen
                </Button>
                <Button
                  variant="outline"
                  className="border-[#70aad8] text-[#0045aa] hover:bg-[#70aad8]/20 transition-all duration-300"
                  onClick={() => document.getElementById("username-section")?.scrollIntoView({ behavior: "smooth" })}
                >
                  <User className="mr-2 h-4 w-4" /> Cambiar usuario
                </Button>
              </div>
            </CardContent>
          </Card>
        </FadeIn>

        <div className="md:col-span-2">
          <StaggerChildren className="space-y-8">
            {/* Cambiar contraseña */}
            <StaggerItem>
              <Card className="hover-glow" id="password-section">
                <CardHeader>
                  <CardTitle className="text-[#0045aa] flex items-center gap-2">
                    <Key className="h-5 w-5 text-[#0f6fbd]" />
                    Cambiar Contraseña
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handlePasswordSubmit} className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="oldPassword" className="text-[#0045aa]">
                        Contraseña antigua
                      </Label>
                      <Input
                        id="oldPassword"
                        name="oldPassword"
                        type="password"
                        value={passwordForm.oldPassword}
                        onChange={handlePasswordChange}
                        className="border-[#70aad8] focus-visible:ring-[#0045aa]"
                        required
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="newPassword" className="text-[#0045aa]">
                        Contraseña nueva
                      </Label>
                      <Input
                        id="newPassword"
                        name="newPassword"
                        type="password"
                        value={passwordForm.newPassword}
                        onChange={handlePasswordChange}
                        className="border-[#70aad8] focus-visible:ring-[#0045aa]"
                        required
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="confirmPassword" className="text-[#0045aa]">
                        Confirmar nueva contraseña
                      </Label>
                      <Input
                        id="confirmPassword"
                        name="confirmPassword"
                        type="password"
                        value={passwordForm.confirmPassword}
                        onChange={handlePasswordChange}
                        className="border-[#70aad8] focus-visible:ring-[#0045aa]"
                        required
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="verificationCode" className="text-[#0045aa]">
                        Código de verificación
                      </Label>
                      <Input
                        id="verificationCode"
                        name="verificationCode"
                        type="text"
                        value={passwordForm.verificationCode}
                        onChange={handlePasswordChange}
                        className="border-[#70aad8] focus-visible:ring-[#0045aa]"
                        required
                      />
                    </div>

                    <Button
                      type="submit"
                      className="bg-[#0045aa] hover:bg-[#0f6fbd] text-white transition-all duration-300"
                    >
                      Confirmar
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </StaggerItem>

            {/* Cambiar nombre de usuario */}
            <StaggerItem>
              <Card className="hover-glow" id="username-section">
                <CardHeader>
                  <CardTitle className="text-[#0045aa] flex items-center gap-2">
                    <User className="h-5 w-5 text-[#0f6fbd]" />
                    Cambiar Usuario
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleUsernameSubmit} className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="newUsername" className="text-[#0045aa]">
                        Usuario nuevo
                      </Label>
                      <Input
                        id="newUsername"
                        name="newUsername"
                        type="text"
                        value={usernameForm.newUsername}
                        onChange={handleUsernameChange}
                        className="border-[#70aad8] focus-visible:ring-[#0045aa]"
                        required
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="confirmUsername" className="text-[#0045aa]">
                        Confirmar nuevo Usuario
                      </Label>
                      <Input
                        id="confirmUsername"
                        name="confirmUsername"
                        type="text"
                        value={usernameForm.confirmUsername}
                        onChange={handleUsernameChange}
                        className="border-[#70aad8] focus-visible:ring-[#0045aa]"
                        required
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="password" className="text-[#0045aa]">
                        Contraseña
                      </Label>
                      <Input
                        id="password"
                        name="password"
                        type="password"
                        value={usernameForm.password}
                        onChange={handleUsernameChange}
                        className="border-[#70aad8] focus-visible:ring-[#0045aa]"
                        required
                      />
                    </div>

                    <Button
                      type="submit"
                      className="bg-[#0045aa] hover:bg-[#0f6fbd] text-white transition-all duration-300"
                    >
                      Confirmar
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </StaggerItem>
          </StaggerChildren>
        </div>
      </div>

      {/* Logo SIGAE */}
      <div className="flex justify-center mt-8">
        <FadeIn delay={0.5}>
          <div className="w-32 h-32 flex items-center justify-center">
            <div className="relative w-full h-full">
              <Image
                src="/images/isotipo.png"
                alt="Logo de SIGAE"
                width={128}
                height={128}
                className="object-contain"
                priority
              />
            </div>
          </div>
        </FadeIn>
      </div>
    </main>
  )
}
