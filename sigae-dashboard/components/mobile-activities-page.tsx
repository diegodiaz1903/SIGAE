"use client"

import type React from "react"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

interface Activity {
  name: string
  description: string
  startDate: string
  endDate: string
  subject: string
}

interface MobileActivitiesPageProps {
  formData: Activity
  activities: Activity[]
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  handleSubjectChange: (value: string) => void
  handleSave: () => void
  handleDelete: () => void
  handleExportExcel: () => void
}

export function MobileActivitiesPage({
  formData,
  activities,
  handleInputChange,
  handleSubjectChange,
  handleSave,
  handleDelete,
  handleExportExcel,
}: MobileActivitiesPageProps) {
  const [activeTab, setActiveTab] = useState("create")

  return (
    <main className="flex flex-col p-4 animate-fade-in">
      <h1 className="text-2xl font-bold text-[#0045aa] mb-4">Actividades</h1>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid grid-cols-2 mb-4">
          <TabsTrigger value="create" className="text-[#0045aa]">
            Crear
          </TabsTrigger>
          <TabsTrigger value="list" className="text-[#0045aa]">
            Lista
          </TabsTrigger>
        </TabsList>

        {/* Crear actividad */}
        <TabsContent value="create" className="space-y-4">
          <Card className="hover-glow">
            <CardHeader>
              <CardTitle className="text-lg text-[#0045aa]">Creación de actividades</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <label className="text-sm text-[#0045aa] font-medium mb-1 block">Nombre de la actividad</label>
                <Input
                  placeholder="Nombre de la actividad"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  className="border-[#70aad8] focus-visible:ring-[#0045aa]"
                />
              </div>

              <div>
                <label className="text-sm text-[#0045aa] font-medium mb-1 block">Descripción</label>
                <Input
                  placeholder="Descripción de la actividad"
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  className="border-[#70aad8] focus-visible:ring-[#0045aa]"
                />
              </div>

              <div>
                <label className="text-sm text-[#0045aa] font-medium mb-1 block">Fecha de inicio</label>
                <Input
                  placeholder="Fecha de inicio"
                  name="startDate"
                  type="date"
                  value={formData.startDate}
                  onChange={handleInputChange}
                  className="border-[#70aad8] focus-visible:ring-[#0045aa]"
                />
              </div>

              <div>
                <label className="text-sm text-[#0045aa] font-medium mb-1 block">Fecha de finalización</label>
                <Input
                  placeholder="Fecha de finalización"
                  name="endDate"
                  type="date"
                  value={formData.endDate}
                  onChange={handleInputChange}
                  className="border-[#70aad8] focus-visible:ring-[#0045aa]"
                />
              </div>

              <div>
                <label className="text-sm text-[#0045aa] font-medium mb-1 block">Materia</label>
                <Select defaultValue={formData.subject} onValueChange={handleSubjectChange}>
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
              </div>

              <div className="pt-2">
                <Button
                  onClick={handleSave}
                  className="w-full bg-[#4caf50] hover:bg-[#43a047] text-white transition-all duration-300"
                >
                  Guardar
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Lista de actividades */}
        <TabsContent value="list" className="space-y-4">
          <div className="space-y-3">
            {activities.map((activity, index) => (
              <Card key={index} className="hover-glow">
                <CardContent className="p-4">
                  <div className="space-y-2">
                    <div className="flex justify-between items-start">
                      <h3 className="font-medium text-[#0045aa]">{activity.name}</h3>
                      <span className="text-xs bg-[#0045aa]/10 text-[#0045aa] px-2 py-0.5 rounded">
                        {activity.subject}
                      </span>
                    </div>
                    <p className="text-sm text-[#70aad8]">{activity.description}</p>
                    <div className="flex justify-between text-xs text-[#70aad8]">
                      <span>Inicio: {activity.startDate}</span>
                      <span>Fin: {activity.endDate}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="flex justify-between gap-2">
            <Button
              onClick={handleDelete}
              className="flex-1 bg-[#f44336] hover:bg-[#e53935] text-white transition-all duration-300"
            >
              Eliminar
            </Button>
            <Button
              onClick={handleExportExcel}
              className="flex-1 bg-[#8bc34a] hover:bg-[#7cb342] text-white transition-all duration-300"
            >
              Exportar
            </Button>
          </div>
        </TabsContent>
      </Tabs>
    </main>
  )
}
