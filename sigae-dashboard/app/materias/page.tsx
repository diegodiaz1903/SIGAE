"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { FadeIn, SlideIn } from "@/components/transition-wrapper"
import { useIsMobile } from "@/hooks/use-mobile"
import { MobileSubjectManagement } from "@/components/mobile-subject-management"
import { Plus, Upload } from "lucide-react"
import { motion } from "framer-motion"

interface Subject {
  id: string
  name: string
  code: string
  credits: number
}

export default function SubjectManagement() {
  const isMobile = useIsMobile()
  const [mounted, setMounted] = useState(false)

  // Estado para el formulario
  const [formData, setFormData] = useState({
    name: "",
    code: "",
    credits: "",
  })

  // Estado para la lista de materias
  const [subjects, setSubjects] = useState<Subject[]>([
    { id: "1", name: "Ejemplo de nombre uno", code: "AC567", credits: 5 },
    { id: "2", name: "Data", code: "Data", credits: 4 },
    { id: "3", name: "Data", code: "Data", credits: 3 },
    { id: "4", name: "Data", code: "Data", credits: 5 },
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
    if (!formData.name || !formData.code || !formData.credits) {
      alert("Por favor complete todos los campos")
      return
    }

    // Agregar nueva materia
    const newSubject: Subject = {
      id: Date.now().toString(),
      name: formData.name,
      code: formData.code,
      credits: Number.parseInt(formData.credits),
    }

    setSubjects([newSubject, ...subjects])

    // Limpiar formulario
    setFormData({
      name: "",
      code: "",
      credits: "",
    })
  }

  const handleDelete = (id: string) => {
    setSubjects(subjects.filter((subject) => subject.id !== id))
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
      <MobileSubjectManagement
        formData={formData}
        subjects={subjects}
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
        {/* Formulario de alta de materias */}
        <SlideIn direction="right">
          <Card className="hover-glow">
            <CardHeader>
              <CardTitle className="text-2xl font-bold text-[#0045aa]">Alta de materias</CardTitle>
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
                      placeholder="Nombre de la materia"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      className="border-[#70aad8] focus-visible:ring-[#0045aa]"
                    />
                  </div>

                  <div className="space-y-2">
                    <Input
                      placeholder="Clave de la materia"
                      name="code"
                      value={formData.code}
                      onChange={handleInputChange}
                      className="border-[#70aad8] focus-visible:ring-[#0045aa]"
                    />
                  </div>

                  <div className="space-y-2">
                    <Input
                      placeholder="Número de créditos"
                      name="credits"
                      type="number"
                      value={formData.credits}
                      onChange={handleInputChange}
                      className="border-[#70aad8] focus-visible:ring-[#0045aa]"
                    />
                  </div>

                  <div className="flex justify-center">
                    <Button
                      type="submit"
                      className="bg-[#a5d6a7] hover:bg-[#81c784] text-black transition-all duration-300"
                    >
                      Registrar materia
                    </Button>
                  </div>
                </form>
              </div>
            </CardContent>
          </Card>
        </SlideIn>
      </div>

      {/* Lista de materias */}
      <FadeIn delay={0.2}>
        <Card className="hover-glow">
          <CardHeader>
            <div className="flex justify-between items-center">
              <CardTitle className="text-2xl font-bold text-[#0045aa]">Lista de las materias</CardTitle>
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
                    <TableHead className="font-bold text-[#0045aa]">Nombre de la materia</TableHead>
                    <TableHead className="font-bold text-[#0045aa]">Clave</TableHead>
                    <TableHead className="font-bold text-[#0045aa]">Créditos</TableHead>
                    <TableHead className="font-bold text-[#0045aa] text-center">Eliminar</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {subjects.map((subject, index) => (
                    <motion.tr
                      key={subject.id}
                      custom={index}
                      initial="hidden"
                      animate="visible"
                      variants={tableRowVariants}
                      className="hover:bg-[#f0f7ff] transition-colors duration-200 border-b"
                    >
                      <TableCell>{subject.name}</TableCell>
                      <TableCell>{subject.code}</TableCell>
                      <TableCell>{subject.credits}</TableCell>
                      <TableCell className="text-center">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleDelete(subject.id)}
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
