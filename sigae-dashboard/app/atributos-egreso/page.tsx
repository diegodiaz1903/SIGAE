"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { FadeIn, SlideIn } from "@/components/transition-wrapper"
import { useIsMobile } from "@/hooks/use-mobile"
import { MobileAttributesManagement } from "@/components/mobile-attributes-management"
import { Plus, Upload } from "lucide-react"
import { motion } from "framer-motion"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

interface Professor {
  id: string
  name: string
  description: string
  subject: string
}

export default function AttributesManagement() {
  const isMobile = useIsMobile()
  const [mounted, setMounted] = useState(false)

  // Estado para el formulario
  const [formData, setFormData] = useState({
    name: "",
    description: "",
  })

  // Estado para la lista de profesores
  const [professors, setProfessors] = useState<Professor[]>([
    { id: "1", name: "Ejemplo de nombre uno", description: "22334455", subject: "Matemáticas" },
    { id: "2", name: "Data", description: "Data", subject: "Física" },
    { id: "3", name: "Data", description: "Data", subject: "Química" },
    { id: "4", name: "Data", description: "Data", subject: "Programación" },
  ])

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return null

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    // Validar que todos los campos estén completos
    if (!formData.name || !formData.description) {
      alert("Por favor complete todos los campos")
      return
    }

    // Agregar nuevo atributo (en una implementación real, esto sería diferente)
    const newProfessor: Professor = {
      id: Date.now().toString(),
      name: formData.name,
      description: formData.description,
      subject: "Nueva materia",
    }

    setProfessors([newProfessor, ...professors])

    // Limpiar formulario
    setFormData({
      name: "",
      description: "",
    })
  }

  const handleDelete = (id: string) => {
    setProfessors(professors.filter((professor) => professor.id !== id))
  }

  const handleImportFile = () => {
    alert("Función para importar archivo")
  }

  // Variantes de animación para las filas de la tabla
  const tableRowVariants = {
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

  if (isMobile) {
    return (
      <MobileAttributesManagement
        formData={formData}
        professors={professors}
        handleInputChange={handleInputChange}
        handleSubmit={handleSubmit}
        handleDelete={handleDelete}
        handleImportFile={handleImportFile}
      />
    )
  }

  return (
    <main className="flex flex-col p-6 md:p-8 animate-fade-in">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
        {/* Formulario de alta de atributos */}
        <SlideIn direction="right">
          <Card className="hover-glow">
            <CardHeader>
              <CardTitle className="text-2xl font-bold text-[#0045aa]">Alta de atributos de egreso</CardTitle>
            </CardHeader>
            <CardContent className="flex flex-col md:flex-row gap-6">
              <div className="w-full md:w-1/3 flex items-center justify-center">
                <div className="w-48 h-48 border-2 border-dashed border-[#70aad8] rounded-lg flex items-center justify-center text-[#70aad8]">
                  <span className="text-sm">Imagen alusiva a altas</span>
                </div>
              </div>

              <div className="w-full md:w-2/3">
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
                      className="bg-[#a5d6a7] hover:bg-[#81c784] text-black transition-all duration-300"
                    >
                      Registrar atributo
                    </Button>
                  </div>
                </form>
              </div>
            </CardContent>
          </Card>
        </SlideIn>
      </div>

      {/* Lista de profesores */}
      <FadeIn delay={0.2}>
        <Card className="hover-glow">
          <CardHeader>
            <div className="flex justify-between items-center">
              <CardTitle className="text-2xl font-bold text-[#0045aa]">Lista de profesores</CardTitle>
              <Button
                onClick={handleImportFile}
                className="bg-[#8bc34a] hover:bg-[#7cb342] text-white transition-all duration-300"
              >
                <Upload className="mr-2 h-4 w-4" /> Importar archivo
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="border rounded-md overflow-hidden">
              <Table>
                <TableHeader>
                  <TableRow className="bg-[#f5f5f5]">
                    <TableHead className="font-bold text-[#0045aa]">Nombre</TableHead>
                    <TableHead className="font-bold text-[#0045aa]">Descripción</TableHead>
                    <TableHead className="font-bold text-[#0045aa]">Materia</TableHead>
                    <TableHead className="font-bold text-[#0045aa] text-center">Eliminar</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {professors.map((professor, index) => (
                    <motion.tr
                      key={professor.id}
                      custom={index}
                      initial="hidden"
                      animate="visible"
                      variants={tableRowVariants}
                      className="hover:bg-[#f0f7ff] transition-colors duration-200 border-b"
                    >
                      <TableCell>{professor.name}</TableCell>
                      <TableCell>{professor.description}</TableCell>
                      <TableCell>
                        <Select defaultValue={professor.subject}>
                          <SelectTrigger className="w-full">
                            <SelectValue placeholder="Ver Materias" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="Matemáticas">Matemáticas</SelectItem>
                            <SelectItem value="Física">Física</SelectItem>
                            <SelectItem value="Química">Química</SelectItem>
                            <SelectItem value="Programación">Programación</SelectItem>
                          </SelectContent>
                        </Select>
                      </TableCell>
                      <TableCell className="text-center">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleDelete(professor.id)}
                          className="bg-[#90caf9] hover:bg-[#64b5f6] text-white h-8 w-8 p-0 rounded"
                        >
                          <Plus className="h-5 w-5 rotate-45" />
                        </Button>
                      </TableCell>
                    </motion.tr>
                  ))}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>
      </FadeIn>
    </main>
  )
}
