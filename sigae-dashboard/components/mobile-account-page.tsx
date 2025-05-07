"use client"

import type React from "react"

import { useState } from "react"
import Image from "next/image"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Key, Upload, User } from "lucide-react"

interface PasswordForm {
  oldPassword: string
  newPassword: string
  confirmPassword: string
  verificationCode: string
}

interface UsernameForm {
  newUsername: string
  confirmUsername: string
  password: string
}

interface MobileAccountPageProps {
  userName: string
  userEmail: string
  passwordForm: PasswordForm
  usernameForm: UsernameForm
  handlePasswordChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  handleUsernameChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  handlePasswordSubmit: (e: React.FormEvent) => void
  handleUsernameSubmit: (e: React.FormEvent) => void
  handleImageUpload: () => void
}

export function MobileAccountPage({
  userName,
  userEmail,
  passwordForm,
  usernameForm,
  handlePasswordChange,
  handleUsernameChange,
  handlePasswordSubmit,
  handleUsernameSubmit,
  handleImageUpload,
}: MobileAccountPageProps) {
  const [activeTab, setActiveTab] = useState("profile")

  return (
    <main className="flex flex-col p-4 animate-fade-in">
      <h1 className="text-2xl font-bold text-[#0045aa] mb-4">Mi Cuenta</h1>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid grid-cols-3 mb-4">
          <TabsTrigger value="profile" className="text-[#0045aa]">
            Perfil
          </TabsTrigger>
          <TabsTrigger value="password" className="text-[#0045aa]">
            Contraseña
          </TabsTrigger>
          <TabsTrigger value="username" className="text-[#0045aa]">
            Usuario
          </TabsTrigger>
        </TabsList>

        {/* Perfil */}
        <TabsContent value="profile" className="space-y-4">
          <Card className="hover-glow">
            <CardContent className="flex flex-col items-center pt-6">
              <div className="relative w-32 h-32 mb-4">
                {/* Reemplazamos el componente Image con un div para evitar problemas */}
                <div className="w-full h-full rounded-full border-4 border-[#70aad8] bg-[#0045aa] flex items-center justify-center text-white text-4xl font-bold">
                  {userName.charAt(0)}
                </div>
                <Button
                  variant="secondary"
                  size="icon"
                  className="absolute bottom-0 right-0 rounded-full bg-white text-[#0045aa] border border-[#70aad8] w-8 h-8"
                  onClick={handleImageUpload}
                >
                  <Upload className="h-4 w-4" />
                </Button>
              </div>

              <h2 className="text-lg font-bold text-[#0045aa] mb-1">{userName}</h2>
              <p className="text-sm text-[#0f6fbd] mb-4">{userEmail}</p>

              <div className="grid grid-cols-2 gap-2 w-full">
                <Button
                  className="bg-[#0045aa] hover:bg-[#0f6fbd] text-white transition-all duration-300"
                  onClick={() => setActiveTab("password")}
                >
                  <Key className="mr-2 h-4 w-4" /> Cambiar contraseña
                </Button>
                <Button
                  variant="outline"
                  className="border-[#70aad8] text-[#0045aa] hover:bg-[#70aad8]/20 transition-all duration-300"
                  onClick={() => setActiveTab("username")}
                >
                  <User className="mr-2 h-4 w-4" /> Cambiar usuario
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Logo SIGAE */}
          <div className="flex justify-center mt-4">
            <div className="w-24 h-24 flex items-center justify-center">
              <div className="relative w-full h-full">
                <Image
                  src="/images/isotipo.png"
                  alt="Logo de SIGAE"
                  width={96}
                  height={96}
                  className="object-contain"
                  priority
                />
              </div>
            </div>
          </div>
        </TabsContent>

        {/* Cambiar contraseña */}
        <TabsContent value="password">
          <Card className="hover-glow">
            <CardHeader className="pb-2">
              <CardTitle className="text-[#0045aa] flex items-center gap-2 text-lg">
                <Key className="h-4 w-4 text-[#0f6fbd]" />
                Cambiar Contraseña
              </CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handlePasswordSubmit} className="space-y-3">
                <div className="space-y-1">
                  <Label htmlFor="oldPassword" className="text-[#0045aa] text-sm">
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

                <div className="space-y-1">
                  <Label htmlFor="newPassword" className="text-[#0045aa] text-sm">
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

                <div className="space-y-1">
                  <Label htmlFor="confirmPassword" className="text-[#0045aa] text-sm">
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

                <div className="space-y-1">
                  <Label htmlFor="verificationCode" className="text-[#0045aa] text-sm">
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

                <div className="pt-2">
                  <Button
                    type="submit"
                    className="w-full bg-[#0045aa] hover:bg-[#0f6fbd] text-white transition-all duration-300"
                  >
                    Confirmar
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Cambiar nombre de usuario */}
        <TabsContent value="username">
          <Card className="hover-glow">
            <CardHeader className="pb-2">
              <CardTitle className="text-[#0045aa] flex items-center gap-2 text-lg">
                <User className="h-4 w-4 text-[#0f6fbd]" />
                Cambiar Usuario
              </CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleUsernameSubmit} className="space-y-3">
                <div className="space-y-1">
                  <Label htmlFor="newUsername" className="text-[#0045aa] text-sm">
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

                <div className="space-y-1">
                  <Label htmlFor="confirmUsername" className="text-[#0045aa] text-sm">
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

                <div className="space-y-1">
                  <Label htmlFor="password" className="text-[#0045aa] text-sm">
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

                <div className="pt-2">
                  <Button
                    type="submit"
                    className="w-full bg-[#0045aa] hover:bg-[#0f6fbd] text-white transition-all duration-300"
                  >
                    Confirmar
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </main>
  )
}
