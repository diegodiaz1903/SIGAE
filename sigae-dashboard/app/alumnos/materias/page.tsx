"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { FadeIn, SlideIn } from "@/components/transition-wrapper"
import { useIsMobile } from "@/hooks/use-mobile"
import { MobileSubjectSelectionPage } from "@/components/mobile-subject-selection-page"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

interface Subject {
  key: string
  name: string
  selected: boolean
}

export default function SubjectSelectionPage() {
  const isMobile = useIsMobile()
  const [mounted, setMounted] = useState(false)

  // Estado para la búsqueda
  const [searchTerm, setSearchTerm] = useState("")

  // Estado para el período seleccionado
  const [selectedPeriod, setSelectedPeriod] = useState("actual")

  // Estado para las materias disponibles
  const [availableSubjects, setAvailableSubjects] = useState<Subject[]>([
    { key: "MAT101", name: "Matemáticas I", selected: false },
    { key: "FIS102", name: "Física I", selected: false },
    { key: "QUI103", name: "Química I", selected: false },
    { key: "PROG104", name: "Programación I", selected: false },
    { key: "ING105", name: "Inglés I", selected: false },
  ])

  // Estado para las materias seleccionadas
  const [selectedSubjects, setSelectedSubjects] = useState<Subject[]>([
    { key: "Data", name: "Data", selected: true },
    { key: "Data", name: "Data", selected: true },
    { key: "Data", name: "Data", selected: true },
    { key: "Data", name: "Data", selected: true },
    { key: "Data", name: "Data", selected: true },
  ])

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return null

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value)
  }

  const handlePeriodChange = (value: string) => {
    setSelectedPeriod(value)
  }

  const handleSelectSubject = (subject: Subject) => {
    // Agregar la materia a las seleccionadas
    setSelectedSubjects([...selectedSubjects, subject])

    // Actualizar el estado de la materia en las disponibles
    const updatedAvailableSubjects = availableSubjects.map((s) =>
      s.key === subject.key ? { ...s, selected: true } : s,
    )
    setAvailableSubjects(updatedAvailableSubjects)
  }

  const handleSave = () => {
    alert("Materias guardadas correctamente")
  }

  const handleEnroll = () => {
    alert("Inscripción realizada correctamente")
  }

  if (isMobile) {
    return (
      <MobileSubjectSelectionPage
        searchTerm={searchTerm}
        selectedPeriod={selectedPeriod}
        availableSubjects={availableSubjects}
        selectedSubjects={selectedSubjects}
        handleSearch={handleSearch}
        handlePeriodChange={handlePeriodChange}
        handleSelectSubject={handleSelectSubject}
        handleSave={handleSave}
        handleEnroll={handleEnroll}
      />
    )
  }

  return (
    <main className="flex flex-col p-6 md:p-8 animate-fade-in">
      <SlideIn direction="right">
        <h1 className="text-3xl font-bold text-[#0045aa] mb-6">Selección de materias</h1>
      </SlideIn>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <div>
          <Select defaultValue={selectedPeriod} onValueChange={handlePeriodChange}>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Selección de período" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="actual">Período actual</SelectItem>
              <SelectItem value="siguiente">Siguiente período</SelectItem>
              <SelectItem value="verano">Período de verano</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="md:col-span-2">
          <Input placeholder="Búsqueda materia" value={searchTerm} onChange={handleSearch} className="w-full" />
        </div>
      </div>

      <div className="flex justify-end mb-6">
        <Button onClick={handleSave} className="bg-[#673ab7] hover:bg-[#5e35b1] text-white transition-all duration-300">
          Guardar
        </Button>
      </div>

      <FadeIn delay={0.2}>
        <Card className="hover-glow mb-6">
          <CardHeader>
            <CardTitle className="text-2xl font-bold text-[#0045aa]">Materias seleccionadas</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="border rounded-md overflow-hidden">
              <Table>
                <TableHeader>
                  <TableRow className="bg-[#f5f5f5]">
                    <TableHead className="font-bold text-[#0045aa]">Clave de materia</TableHead>
                    <TableHead className="font-bold text-[#0045aa]">Materia</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {selectedSubjects.map((subject, index) => (
                    <TableRow key={index} className="hover:bg-[#f0f7ff] transition-colors duration-200 border-b">
                      <TableCell>{subject.key}</TableCell>
                      <TableCell>{subject.name}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>
      </FadeIn>

      <div className="flex justify-center">
        <Button
          onClick={handleEnroll}
          className="bg-[#8bc34a] hover:bg-[#7cb342] text-white transition-all duration-300"
        >
          Inscribir
        </Button>
      </div>
    </main>
  )
}
