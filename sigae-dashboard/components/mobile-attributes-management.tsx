"use client"

import type React from "react"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Plus, Upload } from "lucide-react"
import { motion } from "framer-motion"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

interface Professor {
  id: string
  name: string
  description: string
  subject: string
}

interface MobileAttributesManagementProps {
  formData: {
    name: string
    description: string
  }
  professors: Professor[]
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  handleSubmit: (e: React.FormEvent) => void
  handleDelete: (id: string) => void
  handleImportFile: () => void
}

export function MobileAttributesManagement({
  formData,
  professors,
  handleInputChange,
  handleSubmit,
  handleDelete,
  handleImportFile,
}: MobileAttributesManagementProps) {
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
      <h1 className="text-2xl font-bold text-[#0045aa] mb-4">Atributos de Egreso</h1>

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
              <CardTitle className="text-xl text-[#0045aa]">Alta de atributos</CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-2">
                  <Input
                    placeholder="Nombre del atributo"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    className="border-[#70aad8] focus-visible:ring-[#0045aa]"
                  />
                </div>

                <div className="space-y-2">
                  <Input
                    placeholder="Descripción"
                    name="description"
                    value={formData.description}
                    onChange={handleInputChange}
                    className="border-[#70aad8] focus-visible:ring-[#0045aa]"
                  />
                </div>

                <div className="flex justify-center">
                  <Button
                    type="submit"
                    className="w-full bg-[#a5d6a7] hover:bg-[#81c784] text-black transition-all duration-300"
                  >
                    Registrar atributo
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
            {professors.map((professor, index) => (
              <motion.div key={professor.id} custom={index} initial="hidden" animate="visible" variants={cardVariants}>
                <Card className="hover-glow">
                  <CardContent className="p-4">
                    <div className="flex justify-between items-start">
                      <div className="w-full">
                        <h3 className="font-medium text-[#0045aa]">{professor.name}</h3>
                        <p className="text-sm text-[#70aad8] mb-2">{professor.description}</p>
                        <Select defaultValue={professor.subject}>
                          <SelectTrigger className="w-full h-8 text-xs">
                            <SelectValue placeholder="Ver Materias" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="Matemáticas">Matemáticas</SelectItem>
                            <SelectItem value="Física">Física</SelectItem>
                            <SelectItem value="Química">Química</SelectItem>
                            <SelectItem value="Programación">Programación</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleDelete(professor.id)}
                        className="bg-[#90caf9] hover:bg-[#64b5f6] text-white h-8 w-8 p-0 rounded ml-2"
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
