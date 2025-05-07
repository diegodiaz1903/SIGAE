"use client"

import { useState, useEffect } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { FadeIn, SlideIn } from "@/components/transition-wrapper"
import { useIsMobile } from "@/hooks/use-mobile"
import { MobileGradingPage } from "@/components/mobile-grading-page"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

interface Student {
  name: string
  matricula: string
  activity1: string
  activity2: string
  activityN: string
  finalGrade: string
}

export default function GradingPage() {
  const isMobile = useIsMobile()
  const [mounted, setMounted] = useState(false)
  const [selectedSubject, setSelectedSubject] = useState("matematicas")
  const [selectedGroup, setSelectedGroup] = useState("grupo1")

  // Datos de ejemplo para los estudiantes
  const [students, setStudents] = useState<Student[]>([
    {
      name: "Nombre del alumno",
      matricula: "A2023-01",
      activity1: "80",
      activity2: "90",
      activityN: "85",
      finalGrade: "85.00",
    },
    {
      name: "Data",
      matricula: "Data",
      activity1: "Data",
      activity2: "Data",
      activityN: "Data",
      finalGrade: "Data",
    },
    {
      name: "Data",
      matricula: "Data",
      activity1: "Data",
      activity2: "Data",
      activityN: "Data",
      finalGrade: "Data",
    },
    {
      name: "Data",
      matricula: "Data",
      activity1: "Data",
      activity2: "Data",
      activityN: "Data",
      finalGrade: "Data",
    },
    {
      name: "Data",
      matricula: "Data",
      activity1: "Data",
      activity2: "Data",
      activityN: "Data",
      finalGrade: "Data",
    },
    {
      name: "Data",
      matricula: "Data",
      activity1: "Data",
      activity2: "Data",
      activityN: "Data",
      finalGrade: "Data",
    },
    {
      name: "Data",
      matricula: "Data",
      activity1: "Data",
      activity2: "Data",
      activityN: "Data",
      finalGrade: "Data",
    },
  ])

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return null

  const handleSubjectChange = (value: string) => {
    setSelectedSubject(value)
    // Aquí se cargarían los datos de los estudiantes según la materia seleccionada
  }

  const handleGroupChange = (value: string) => {
    setSelectedGroup(value)
    // Aquí se cargarían los datos de los estudiantes según el grupo seleccionado
  }

  const handleGradeChange = (index: number, field: keyof Student, value: string) => {
    const updatedStudents = [...students]
    updatedStudents[index] = { ...updatedStudents[index], [field]: value }
    setStudents(updatedStudents)
  }

  const handleSave = () => {
    alert("Calificaciones guardadas correctamente")
  }

  const handleModify = () => {
    alert("Modo de modificación activado")
  }

  const handleExportExcel = () => {
    alert("Exportando a Excel...")
  }

  if (isMobile) {
    return (
      <MobileGradingPage
        students={students}
        selectedSubject={selectedSubject}
        selectedGroup={selectedGroup}
        handleSubjectChange={handleSubjectChange}
        handleGroupChange={handleGroupChange}
        handleGradeChange={handleGradeChange}
        handleSave={handleSave}
        handleModify={handleModify}
        handleExportExcel={handleExportExcel}
      />
    )
  }

  return (
    <main className="flex flex-col p-6 md:p-8 animate-fade-in">
      <SlideIn direction="right">
        <h1 className="text-3xl font-bold text-[#0045aa] mb-6">Calificar actividades</h1>
      </SlideIn>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        <div className="flex items-center justify-center">
          <div className="w-48 h-48 border-2 border-dashed border-[#70aad8] rounded-lg flex items-center justify-center text-[#70aad8]">
            <span className="text-sm text-center p-4">
              Use este bosquejo para calificaciones ya que se pueden modificar sus calificaciones
            </span>
          </div>
        </div>

        <div className="flex flex-col gap-4">
          <div>
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
        </div>
      </div>

      <FadeIn delay={0.2}>
        <Card className="hover-glow mb-6">
          <CardContent className="p-0 overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow className="bg-[#f5f5f5]">
                  <TableHead className="font-bold text-[#0045aa]">Nombre</TableHead>
                  <TableHead className="font-bold text-[#0045aa]">Matrícula</TableHead>
                  <TableHead className="font-bold text-[#0045aa]">Actividad1</TableHead>
                  <TableHead className="font-bold text-[#0045aa]">Actividad2</TableHead>
                  <TableHead className="font-bold text-[#0045aa]">ActividadN</TableHead>
                  <TableHead className="font-bold text-[#0045aa]">Calificación</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {students.map((student, index) => (
                  <TableRow key={index} className="hover:bg-[#f0f7ff] transition-colors duration-200 border-b">
                    <TableCell>{student.name}</TableCell>
                    <TableCell>{student.matricula}</TableCell>
                    <TableCell>
                      <Input
                        type="text"
                        value={student.activity1}
                        onChange={(e) => handleGradeChange(index, "activity1", e.target.value)}
                        className="h-8 w-16 text-center"
                      />
                    </TableCell>
                    <TableCell>
                      <Input
                        type="text"
                        value={student.activity2}
                        onChange={(e) => handleGradeChange(index, "activity2", e.target.value)}
                        className="h-8 w-16 text-center"
                      />
                    </TableCell>
                    <TableCell>
                      <Input
                        type="text"
                        value={student.activityN}
                        onChange={(e) => handleGradeChange(index, "activityN", e.target.value)}
                        className="h-8 w-16 text-center"
                      />
                    </TableCell>
                    <TableCell>
                      <Input
                        type="text"
                        value={student.finalGrade}
                        onChange={(e) => handleGradeChange(index, "finalGrade", e.target.value)}
                        className="h-8 w-16 text-center"
                      />
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
          onClick={handleModify}
          className="bg-[#673ab7] hover:bg-[#5e35b1] text-white transition-all duration-300"
        >
          Modificar
        </Button>
        <Button onClick={handleSave} className="bg-[#4caf50] hover:bg-[#43a047] text-white transition-all duration-300">
          Guardar
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
