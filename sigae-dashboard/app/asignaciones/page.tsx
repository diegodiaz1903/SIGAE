"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { FadeIn, SlideIn } from "@/components/transition-wrapper"
import { useIsMobile } from "@/hooks/use-mobile"
import { MobileAssignmentsManagement } from "@/components/mobile-assignments-management"
import { Plus, Upload, Save } from "lucide-react"
import { motion } from "framer-motion"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

interface Assignment {
  id: string
  professor: string
  matricula: string
  subjects: string[]
}

export default function AssignmentsManagement() {
  const isMobile = useIsMobile()
  const [mounted, setMounted] = useState(false)

  // Estado para la lista de asignaciones
  const [assignments, setAssignments] = useState<Assignment[]>([
    {
      id: "1",
      professor: "Seleccione al profesor",
      matricula: "22334455",
      subjects: ["Ver Materias"],
    },
    {
      id: "2",
      professor: "Seleccione al profesor",
      matricula: "Data",
      subjects: ["Ver Materias"],
    },
  ])

  // Estado para el nuevo registro
  const [newAssignment, setNewAssignment] = useState<Assignment>({
    id: "new",
    professor: "Seleccione al profesor",
    matricula: "",
    subjects: ["Ver Materias"],
  })

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return null

  const handleSave = () => {
    // Validar que se haya seleccionado un profesor y materia
    if (newAssignment.professor === "Seleccione al profesor" || newAssignment.subjects[0] === "Ver Materias") {
      alert("Por favor seleccione un profesor y al menos una materia")
      return
    }

    // Agregar nueva asignación
    setAssignments([
      {
        id: Date.now().toString(),
        professor: newAssignment.professor,
        matricula: newAssignment.matricula || "22334455",
        subjects: newAssignment.subjects,
      },
      ...assignments,
    ])

    // Resetear el formulario
    setNewAssignment({
      id: "new",
      professor: "Seleccione al profesor",
      matricula: "",
      subjects: ["Ver Materias"],
    })
  }

  const handleDelete = (id: string) => {
    setAssignments(assignments.filter((assignment) => assignment.id !== id))
  }

  const handleExportFile = () => {
    alert("Función para exportar archivo")
  }

  const handleProfessorChange = (value: string) => {
    setNewAssignment({
      ...newAssignment,
      professor: value,
      matricula: "22334455", // Simulamos que se obtiene la matrícula del profesor seleccionado
    })
  }

  const handleSubjectChange = (value: string) => {
    setNewAssignment({
      ...newAssignment,
      subjects: [value],
    })
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
      <MobileAssignmentsManagement
        assignments={assignments}
        newAssignment={newAssignment}
        handleProfessorChange={handleProfessorChange}
        handleSubjectChange={handleSubjectChange}
        handleSave={handleSave}
        handleDelete={handleDelete}
        handleExportFile={handleExportFile}
      />
    )
  }

  return (
    <main className="flex flex-col p-6 md:p-8 animate-fade-in">
      <SlideIn direction="right">
        <h1 className="text-3xl font-bold text-[#0045aa] mb-6">Asignaciones</h1>
      </SlideIn>

      <div className="mb-8">
        <SlideIn direction="right">
          <Card className="hover-glow">
            <CardHeader>
              <CardTitle className="text-2xl font-bold text-[#0045aa]">Lista de profesores</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="border rounded-md overflow-hidden mb-4">
                <Table>
                  <TableHeader>
                    <TableRow className="bg-[#f5f5f5]">
                      <TableHead className="font-bold text-[#0045aa]">Nombre del profesor</TableHead>
                      <TableHead className="font-bold text-[#0045aa]">Matrícula</TableHead>
                      <TableHead className="font-bold text-[#0045aa]">Materias</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    <TableRow>
                      <TableCell>
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
                      </TableCell>
                      <TableCell>{newAssignment.matricula || "22334455"}</TableCell>
                      <TableCell>
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
                      </TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </div>

              <div className="flex justify-between">
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
                  <Upload className="mr-2 h-4 w-4" /> Exportar archivo
                </Button>
              </div>
            </CardContent>
          </Card>
        </SlideIn>
      </div>

      {/* Lista de asignaciones existentes */}
      <FadeIn delay={0.2}>
        <Card className="hover-glow">
          <CardContent className="pt-6">
            <div className="border rounded-md overflow-hidden">
              <Table>
                <TableHeader>
                  <TableRow className="bg-[#f5f5f5]">
                    <TableHead className="font-bold text-[#0045aa]">Nombre del profesor</TableHead>
                    <TableHead className="font-bold text-[#0045aa]">Matrícula</TableHead>
                    <TableHead className="font-bold text-[#0045aa]">Materias</TableHead>
                    <TableHead className="font-bold text-[#0045aa] text-center">Eliminar</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {assignments.map((assignment, index) => (
                    <motion.tr
                      key={assignment.id}
                      custom={index}
                      initial="hidden"
                      animate="visible"
                      variants={tableRowVariants}
                      className="hover:bg-[#f0f7ff] transition-colors duration-200 border-b"
                    >
                      <TableCell>
                        <Select defaultValue={assignment.professor}>
                          <SelectTrigger className="w-full">
                            <SelectValue placeholder="Seleccione al profesor" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="Dr. Juan Pérez">Dr. Juan Pérez</SelectItem>
                            <SelectItem value="Dra. María López">Dra. María López</SelectItem>
                            <SelectItem value="Ing. Roberto Gómez">Ing. Roberto Gómez</SelectItem>
                          </SelectContent>
                        </Select>
                      </TableCell>
                      <TableCell>{assignment.matricula}</TableCell>
                      <TableCell>
                        <Select defaultValue={assignment.subjects[0]}>
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
                          onClick={() => handleDelete(assignment.id)}
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
