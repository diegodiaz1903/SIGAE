"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { FadeIn, SlideIn } from "@/components/transition-wrapper"
import { useIsMobile } from "@/hooks/use-mobile"
import { MobileActivitiesPage } from "@/components/mobile-activities-page"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

interface Activity {
  name: string
  description: string
  startDate: string
  endDate: string
  subject: string
}

export default function ActivitiesPage() {
  const isMobile = useIsMobile()
  const [mounted, setMounted] = useState(false)

  // Estado para el formulario
  const [formData, setFormData] = useState<Activity>({
    name: "",
    description: "",
    startDate: "",
    endDate: "",
    subject: "matematicas",
  })

  // Estado para la lista de actividades
  const [activities, setActivities] = useState<Activity[]>([
    {
      name: "Data",
      description: "Data",
      startDate: "Data",
      endDate: "Data",
      subject: "Selección de Materia",
    },
    {
      name: "Data",
      description: "Data",
      startDate: "Data",
      endDate: "Data",
      subject: "Selección de Materia",
    },
    {
      name: "Data",
      description: "Data",
      startDate: "Data",
      endDate: "Data",
      subject: "Selección de Materia",
    },
    {
      name: "Data",
      description: "Data",
      startDate: "Data",
      endDate: "Data",
      subject: "Selección de Materia",
    },
    {
      name: "Data",
      description: "Data",
      startDate: "Data",
      endDate: "Data",
      subject: "Selección de Materia",
    },
    {
      name: "Data",
      description: "Data",
      startDate: "Data",
      endDate: "Data",
      subject: "Selección de Materia",
    },
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

  const handleSubjectChange = (value: string) => {
    setFormData((prev) => ({
      ...prev,
      subject: value,
    }))
  }

  const handleSave = () => {
    // Validar que todos los campos estén completos
    if (!formData.name || !formData.description || !formData.startDate || !formData.endDate) {
      alert("Por favor complete todos los campos")
      return
    }

    // Agregar nueva actividad
    setActivities([formData, ...activities])

    // Limpiar formulario
    setFormData({
      name: "",
      description: "",
      startDate: "",
      endDate: "",
      subject: "matematicas",
    })

    alert("Actividad guardada correctamente")
  }

  const handleDelete = () => {
    alert("Función para eliminar actividad")
  }

  const handleExportExcel = () => {
    alert("Exportando a Excel...")
  }

  if (isMobile) {
    return (
      <MobileActivitiesPage
        formData={formData}
        activities={activities}
        handleInputChange={handleInputChange}
        handleSubjectChange={handleSubjectChange}
        handleSave={handleSave}
        handleDelete={handleDelete}
        handleExportExcel={handleExportExcel}
      />
    )
  }

  return (
    <main className="flex flex-col p-6 md:p-8 animate-fade-in">
      <SlideIn direction="right">
        <h1 className="text-3xl font-bold text-[#0045aa] mb-6">Creación de actividades</h1>
      </SlideIn>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        <div className="flex items-center justify-center">
          <div className="w-48 h-48 border-2 border-dashed border-[#70aad8] rounded-lg flex items-center justify-center text-[#70aad8]">
            <span className="text-sm">Imagen alusiva a actividades</span>
          </div>
        </div>

        <div className="flex flex-col gap-4">
          <div>
            <Input
              placeholder="Nombre de la actividad"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              className="border-[#70aad8] focus-visible:ring-[#0045aa]"
            />
          </div>

          <div>
            <Input
              placeholder="Descripción de la actividad"
              name="description"
              value={formData.description}
              onChange={handleInputChange}
              className="border-[#70aad8] focus-visible:ring-[#0045aa]"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <Input
              placeholder="Fecha de inicio"
              name="startDate"
              type="date"
              value={formData.startDate}
              onChange={handleInputChange}
              className="border-[#70aad8] focus-visible:ring-[#0045aa]"
            />

            <Input
              placeholder="Fecha de finalización"
              name="endDate"
              type="date"
              value={formData.endDate}
              onChange={handleInputChange}
              className="border-[#70aad8] focus-visible:ring-[#0045aa]"
            />
          </div>

          <div className="flex justify-end">
            <Button
              onClick={handleSave}
              className="bg-[#4caf50] hover:bg-[#43a047] text-white transition-all duration-300"
            >
              Guardar
            </Button>
          </div>
        </div>
      </div>

      <FadeIn delay={0.2}>
        <Card className="hover-glow mb-6">
          <CardHeader>
            <CardTitle className="text-2xl font-bold text-[#0045aa]">Actividades</CardTitle>
          </CardHeader>
          <CardContent className="p-0 overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow className="bg-[#f5f5f5]">
                  <TableHead className="font-bold text-[#0045aa]">Actividad</TableHead>
                  <TableHead className="font-bold text-[#0045aa]">Descripción</TableHead>
                  <TableHead className="font-bold text-[#0045aa]">Fecha inicio</TableHead>
                  <TableHead className="font-bold text-[#0045aa]">Fecha final</TableHead>
                  <TableHead className="font-bold text-[#0045aa]">Materia asignada</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {activities.map((activity, index) => (
                  <TableRow key={index} className="hover:bg-[#f0f7ff] transition-colors duration-200 border-b">
                    <TableCell>{activity.name}</TableCell>
                    <TableCell>{activity.description}</TableCell>
                    <TableCell>{activity.startDate}</TableCell>
                    <TableCell>{activity.endDate}</TableCell>
                    <TableCell>
                      <Select defaultValue={activity.subject}>
                        <SelectTrigger className="w-full">
                          <SelectValue placeholder="Selección de Materia" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="matematicas">Matemáticas</SelectItem>
                          <SelectItem value="fisica">Física</SelectItem>
                          <SelectItem value="quimica">Química</SelectItem>
                          <SelectItem value="programacion">Programación</SelectItem>
                        </SelectContent>
                      </Select>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </FadeIn>

      <div className="flex flex-wrap justify-center gap-4">
        <Button
          onClick={handleDelete}
          className="bg-[#f44336] hover:bg-[#e53935] text-white transition-all duration-300"
        >
          Eliminar
        </Button>
        <Button
          onClick={handleExportExcel}
          className="bg-[#8bc34a] hover:bg-[#7cb342] text-white transition-all duration-300"
        >
          Exportar Excel
        </Button>
      </div>
    </main>
  )
}
