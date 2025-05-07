"use client"

import type React from "react"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Plus, Upload } from "lucide-react"
import { motion } from "framer-motion"

interface Teacher {
  id: string
  name: string
  matricula: string
  email: string
}

interface MobileTeacherManagementProps {
  formData: {
    name: string
    matricula: string
    email: string
  }
  teachers: Teacher[]
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  handleSubmit: (e: React.FormEvent) => void
  handleDelete: (id: string) => void
  handleImportFile: () => void
}

export function MobileTeacherManagement({
  formData,
  teachers,
  handleInputChange,
  handleSubmit,
  handleDelete,
  handleImportFile,
}: MobileTeacherManagementProps) {
  const [activeTab, setActiveTab] = useState("register")

  // Variantes de animación para las tarjetas
  const cardVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.1,
        duration: 0.3,
      },
    }),
  }

  return (
    <main className="flex flex-col p-4 animate-fade-in">
      <h1 className="text-2xl font-bold text-[#0045aa] mb-4">Gestión de Maestros</h1>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid grid-cols-2 mb-4">
          <TabsTrigger value="register" className="text-[#0045aa]">
            Registrar
          </TabsTrigger>
          <TabsTrigger value="list" className="text-[#0045aa]">
            Lista
          </TabsTrigger>
        </TabsList>

        {/* Formulario de registro */}
        <TabsContent value="register" className="space-y-4">
          <Card className="hover-glow">
            <CardHeader>
              <CardTitle className="text-xl text-[#0045aa]">Alta de profesores</CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-2">
                  <Input
                    placeholder="Nombre completo"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    className="border-[#70aad8] focus-visible:ring-[#0045aa]"
                  />
                </div>

                <div className="space-y-2">
                  <Input
                    placeholder="Matrícula"
                    name="matricula"
                    value={formData.matricula}
                    onChange={handleInputChange}
                    className="border-[#70aad8] focus-visible:ring-[#0045aa]"
                  />
                </div>

                <div className="space-y-2">
                  <Input
                    placeholder="Correo"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className="border-[#70aad8] focus-visible:ring-[#0045aa]"
                  />
                </div>

                <div className="flex justify-center">
                  <Button
                    type="submit"
                    className="w-full bg-[#a5d6a7] hover:bg-[#81c784] text-black transition-all duration-300"
                  >
                    Registrar profesor
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Lista de profesores */}
        <TabsContent value="list" className="space-y-4">
          <div className="flex justify-between items-center mb-2">
            <h2 className="text-lg font-semibold text-[#0045aa]">Lista de profesores</h2>
            <Button
              onClick={handleImportFile}
              size="sm"
              className="bg-[#8bc34a] hover:bg-[#7cb342] text-white transition-all duration-300"
            >
              <Upload className="mr-1 h-3 w-3" /> Importar
            </Button>
          </div>

          <div className="space-y-3">
            {teachers.map((teacher, index) => (
              <motion.div key={teacher.id} custom={index} initial="hidden" animate="visible" variants={cardVariants}>
                <Card className="hover-glow">
                  <CardContent className="p-4">
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="font-medium text-[#0045aa]">{teacher.name}</h3>
                        <p className="text-sm text-[#70aad8]">Matrícula: {teacher.matricula}</p>
                        <p className="text-sm text-[#70aad8]">{teacher.email}</p>
                      </div>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleDelete(teacher.id)}
                        className="bg-[#90caf9] hover:bg-[#64b5f6] text-white h-8 w-8 p-0 rounded"
                      >
                        <Plus className="h-5 w-5 rotate-45" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </main>
  )
}
