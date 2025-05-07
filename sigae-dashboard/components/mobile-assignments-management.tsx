"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Plus, Upload, Save } from "lucide-react"
import { motion } from "framer-motion"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

interface Assignment {
  id: string
  professor: string
  matricula: string
  subjects: string[]
}

interface MobileAssignmentsManagementProps {
  assignments: Assignment[]
  newAssignment: Assignment
  handleProfessorChange: (value: string) => void
  handleSubjectChange: (value: string) => void
  handleSave: () => void
  handleDelete: (id: string) => void
  handleExportFile: () => void
}

export function MobileAssignmentsManagement({
  assignments,
  newAssignment,
  handleProfessorChange,
  handleSubjectChange,
  handleSave,
  handleDelete,
  handleExportFile,
}: MobileAssignmentsManagementProps) {
  const [activeTab, setActiveTab] = useState("new")

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
      <h1 className="text-2xl font-bold text-[#0045aa] mb-4">Asignaciones</h1>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid grid-cols-2 mb-4">
          <TabsTrigger value="new" className="text-[#0045aa]">
            Nueva
          </TabsTrigger>
          <TabsTrigger value="list" className="text-[#0045aa]">
            Lista
          </TabsTrigger>
        </TabsList>

        {/* Nueva asignación */}
        <TabsContent value="new" className="space-y-4">
          <Card className="hover-glow">
            <CardHeader>
              <CardTitle className="text-xl text-[#0045aa]">Nueva asignación</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <label className="text-sm text-[#0045aa] font-medium">Profesor</label>
                <Select defaultValue={newAssignment.professor} onValueChange={handleProfessorChange}>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Seleccione al profesor" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Dr. Juan Pérez">Dr. Juan Pérez</SelectItem>
                    <SelectItem value="Dra. María López">Dra. María López</SelectItem>
                    <SelectItem value="Ing. Roberto Gómez">Ing. Roberto Gómez</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <label className="text-sm text-[#0045aa] font-medium">Matrícula</label>
                <p className="text-sm border border-input rounded-md px-3 py-2 bg-background">
                  {newAssignment.matricula || "22334455"}
                </p>
              </div>

              <div className="space-y-2">
                <label className="text-sm text-[#0045aa] font-medium">Materia</label>
                <Select defaultValue={newAssignment.subjects[0]} onValueChange={handleSubjectChange}>
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
              </div>

              <div className="flex justify-between pt-2">
                <Button
                  onClick={handleSave}
                  className="bg-[#673ab7] hover:bg-[#5e35b1] text-white transition-all duration-300"
                >
                  <Save className="mr-2 h-4 w-4" /> Guardar
                </Button>
                <Button
                  onClick={handleExportFile}
                  className="bg-[#8bc34a] hover:bg-[#7cb342] text-white transition-all duration-300"
                >
                  <Upload className="mr-2 h-4 w-4" /> Exportar
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Lista de asignaciones */}
        <TabsContent value="list" className="space-y-4">
          <div className="flex justify-between items-center mb-2">
            <h2 className="text-lg font-semibold text-[#0045aa]">Asignaciones actuales</h2>
            <Button
              onClick={handleExportFile}
              size="sm"
              className="bg-[#8bc34a] hover:bg-[#7cb342] text-white transition-all duration-300"
            >
              <Upload className="mr-1 h-3 w-3" /> Exportar
            </Button>
          </div>

          <div className="space-y-3">
            {assignments.map((assignment, index) => (
              <motion.div key={assignment.id} custom={index} initial="hidden" animate="visible" variants={cardVariants}>
                <Card className="hover-glow">
                  <CardContent className="p-4">
                    <div className="flex justify-between items-start">
                      <div className="w-full space-y-3">
                        <div>
                          <label className="text-xs text-[#0045aa] font-medium">Profesor</label>
                          <Select defaultValue={assignment.professor}>
                            <SelectTrigger className="w-full h-8 text-xs mt-1">
                              <SelectValue placeholder="Seleccione al profesor" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="Dr. Juan Pérez">Dr. Juan Pérez</SelectItem>
                              <SelectItem value="Dra. María López">Dra. María López</SelectItem>
                              <SelectItem value="Ing. Roberto Gómez">Ing. Roberto Gómez</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>

                        <div>
                          <label className="text-xs text-[#0045aa] font-medium">Matrícula</label>
                          <p className="text-xs border border-input rounded-md px-2 py-1 bg-background mt-1">
                            {assignment.matricula}
                          </p>
                        </div>

                        <div>
                          <label className="text-xs text-[#0045aa] font-medium">Materia</label>
                          <Select defaultValue={assignment.subjects[0]}>
                            <SelectTrigger className="w-full h-8 text-xs mt-1">
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
                      </div>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleDelete(assignment.id)}
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
