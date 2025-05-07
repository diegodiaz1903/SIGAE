"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

interface Student {
  name: string
  matricula: string
  activity1: string
  activity2: string
  activityN: string
  finalGrade: string
}

interface MobileGradingPageProps {
  students: Student[]
  selectedSubject: string
  selectedGroup: string
  handleSubjectChange: (value: string) => void
  handleGroupChange: (value: string) => void
  handleGradeChange: (index: number, field: keyof Student, value: string) => void
  handleSave: () => void
  handleModify: () => void
  handleExportExcel: () => void
}

export function MobileGradingPage({
  students,
  selectedSubject,
  selectedGroup,
  handleSubjectChange,
  handleGroupChange,
  handleGradeChange,
  handleSave,
  handleModify,
  handleExportExcel,
}: MobileGradingPageProps) {
  const [activeTab, setActiveTab] = useState("settings")
  const [selectedStudent, setSelectedStudent] = useState<Student | null>(null)
  const [selectedStudentIndex, setSelectedStudentIndex] = useState<number | null>(null)

  const handleSelectStudent = (student: Student, index: number) => {
    setSelectedStudent(student)
    setSelectedStudentIndex(index)
    setActiveTab("grade")
  }

  const handleBackToList = () => {
    setSelectedStudent(null)
    setSelectedStudentIndex(null)
    setActiveTab("students")
  }

  return (
    <main className="flex flex-col p-4 animate-fade-in">
      <h1 className="text-2xl font-bold text-[#0045aa] mb-4">Calificar actividades</h1>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid grid-cols-3 mb-4">
          <TabsTrigger value="settings" className="text-[#0045aa]">
            Ajustes
          </TabsTrigger>
          <TabsTrigger value="students" className="text-[#0045aa]">
            Alumnos
          </TabsTrigger>
          <TabsTrigger value="grade" className="text-[#0045aa]" disabled={selectedStudent === null}>
            Calificar
          </TabsTrigger>
        </TabsList>

        {/* Configuración */}
        <TabsContent value="settings" className="space-y-4">
          <Card className="hover-glow">
            <CardHeader>
              <CardTitle className="text-lg text-[#0045aa]">Seleccionar materia y grupo</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <label className="text-sm text-[#0045aa] font-medium mb-1 block">Materia</label>
                <Select defaultValue={selectedSubject} onValueChange={handleSubjectChange}>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Seleccione materia" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="matematicas">Matemáticas</SelectItem>
                    <SelectItem value="fisica">Física</SelectItem>
                    <SelectItem value="quimica">Química</SelectItem>
                    <SelectItem value="programacion">Programación</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <label className="text-sm text-[#0045aa] font-medium mb-1 block">Grupo</label>
                <Select defaultValue={selectedGroup} onValueChange={handleGroupChange}>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Seleccione grupo" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="grupo1">Grupo 1</SelectItem>
                    <SelectItem value="grupo2">Grupo 2</SelectItem>
                    <SelectItem value="grupo3">Grupo 3</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="pt-2">
                <Button
                  onClick={() => setActiveTab("students")}
                  className="w-full bg-[#0045aa] hover:bg-[#0f6fbd] text-white transition-all duration-300"
                >
                  Continuar
                </Button>
              </div>
            </CardContent>
          </Card>

          <div className="text-xs text-[#70aad8] text-center p-2">
            Use este bosquejo para calificaciones ya que se pueden modificar sus calificaciones
          </div>
        </TabsContent>

        {/* Lista de estudiantes */}
        <TabsContent value="students" className="space-y-4">
          <Card className="hover-glow">
            <CardHeader>
              <CardTitle className="text-lg text-[#0045aa]">Lista de alumnos</CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              <div className="divide-y">
                {students.map((student, index) => (
                  <div
                    key={index}
                    className="p-3 hover:bg-[#f0f7ff] transition-colors duration-200 flex justify-between items-center"
                    onClick={() => handleSelectStudent(student, index)}
                  >
                    <div>
                      <p className="font-medium text-[#0045aa]">{student.name}</p>
                      <p className="text-xs text-[#70aad8]">Matrícula: {student.matricula}</p>
                    </div>
                    <div className="text-sm font-semibold text-[#0045aa]">{student.finalGrade}</div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <div className="flex justify-between gap-2">
            <Button
              onClick={handleModify}
              className="flex-1 bg-[#673ab7] hover:bg-[#5e35b1] text-white transition-all duration-300"
            >
              Modificar
            </Button>
            <Button
              onClick={handleExportExcel}
              className="flex-1 bg-[#8bc34a] hover:bg-[#7cb342] text-white transition-all duration-300"
            >
              Exportar
            </Button>
          </div>
        </TabsContent>

        {/* Calificar estudiante individual */}
        <TabsContent value="grade" className="space-y-4">
          {selectedStudent && (
            <Card className="hover-glow">
              <CardHeader>
                <CardTitle className="text-lg text-[#0045aa]">{selectedStudent.name}</CardTitle>
                <p className="text-xs text-[#70aad8]">Matrícula: {selectedStudent.matricula}</p>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <label className="text-sm text-[#0045aa] font-medium mb-1 block">Actividad 1</label>
                  <Input
                    type="text"
                    value={selectedStudent.activity1}
                    onChange={(e) =>
                      selectedStudentIndex !== null &&
                      handleGradeChange(selectedStudentIndex, "activity1", e.target.value)
                    }
                    className="w-full"
                  />
                </div>

                <div>
                  <label className="text-sm text-[#0045aa] font-medium mb-1 block">Actividad 2</label>
                  <Input
                    type="text"
                    value={selectedStudent.activity2}
                    onChange={(e) =>
                      selectedStudentIndex !== null &&
                      handleGradeChange(selectedStudentIndex, "activity2", e.target.value)
                    }
                    className="w-full"
                  />
                </div>

                <div>
                  <label className="text-sm text-[#0045aa] font-medium mb-1 block">Actividad N</label>
                  <Input
                    type="text"
                    value={selectedStudent.activityN}
                    onChange={(e) =>
                      selectedStudentIndex !== null &&
                      handleGradeChange(selectedStudentIndex, "activityN", e.target.value)
                    }
                    className="w-full"
                  />
                </div>

                <div>
                  <label className="text-sm text-[#0045aa] font-medium mb-1 block">Calificación final</label>
                  <Input
                    type="text"
                    value={selectedStudent.finalGrade}
                    onChange={(e) =>
                      selectedStudentIndex !== null &&
                      handleGradeChange(selectedStudentIndex, "finalGrade", e.target.value)
                    }
                    className="w-full"
                  />
                </div>

                <div className="flex justify-between gap-2 pt-2">
                  <Button
                    onClick={handleBackToList}
                    className="flex-1 bg-[#9e9e9e] hover:bg-[#757575] text-white transition-all duration-300"
                  >
                    Volver
                  </Button>
                  <Button
                    onClick={handleSave}
                    className="flex-1 bg-[#4caf50] hover:bg-[#43a047] text-white transition-all duration-300"
                  >
                    Guardar
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}
        </TabsContent>
      </Tabs>
    </main>
  )
}
