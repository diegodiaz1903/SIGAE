"use client"

import type React from "react"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useState } from "react"

interface Subject {
  key: string
  name: string
  selected: boolean
}

interface MobileSubjectSelectionPageProps {
  searchTerm: string
  selectedPeriod: string
  availableSubjects: Subject[]
  selectedSubjects: Subject[]
  handleSearch: (e: React.ChangeEvent<HTMLInputElement>) => void
  handlePeriodChange: (value: string) => void
  handleSelectSubject: (subject: Subject) => void
  handleSave: () => void
  handleEnroll: () => void
}

export function MobileSubjectSelectionPage({
  searchTerm,
  selectedPeriod,
  availableSubjects,
  selectedSubjects,
  handleSearch,
  handlePeriodChange,
  handleSelectSubject,
  handleSave,
  handleEnroll,
}: MobileSubjectSelectionPageProps) {
  const [activeTab, setActiveTab] = useState("selected")

  return (
    <main className="flex flex-col p-4 animate-fade-in">
      <h1 className="text-2xl font-bold text-[#0045aa] mb-4">Selección de materias</h1>

      <div className="space-y-3 mb-4">
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

        <Input placeholder="Búsqueda materia" value={searchTerm} onChange={handleSearch} className="w-full" />

        <Button
          onClick={handleSave}
          className="w-full bg-[#673ab7] hover:bg-[#5e35b1] text-white transition-all duration-300"
        >
          Guardar
        </Button>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid grid-cols-2 mb-4">
          <TabsTrigger value="selected" className="text-[#0045aa]">
            Seleccionadas
          </TabsTrigger>
          <TabsTrigger value="available" className="text-[#0045aa]">
            Disponibles
          </TabsTrigger>
        </TabsList>

        {/* Materias seleccionadas */}
        <TabsContent value="selected" className="space-y-4">
          <Card className="hover-glow">
            <CardHeader className="pb-2">
              <CardTitle className="text-lg text-[#0045aa]">Materias seleccionadas</CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow className="bg-[#f5f5f5]">
                      <TableHead className="font-bold text-[#0045aa] text-xs">Clave</TableHead>
                      <TableHead className="font-bold text-[#0045aa] text-xs">Materia</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {selectedSubjects.map((subject, index) => (
                      <TableRow key={index} className="hover:bg-[#f0f7ff] transition-colors duration-200 border-b">
                        <TableCell className="text-xs p-2">{subject.key}</TableCell>
                        <TableCell className="text-xs p-2">{subject.name}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>

          <div className="flex justify-center">
            <Button
              onClick={handleEnroll}
              className="bg-[#8bc34a] hover:bg-[#7cb342] text-white transition-all duration-300"
            >
              Inscribir
            </Button>
          </div>
        </TabsContent>

        {/* Materias disponibles */}
        <TabsContent value="available" className="space-y-4">
          <Card className="hover-glow">
            <CardHeader className="pb-2">
              <CardTitle className="text-lg text-[#0045aa]">Materias disponibles</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                {availableSubjects
                  .filter(
                    (subject) => !subject.selected && subject.name.toLowerCase().includes(searchTerm.toLowerCase()),
                  )
                  .map((subject, index) => (
                    <div
                      key={index}
                      className="p-2 border rounded-md flex justify-between items-center hover:bg-[#f0f7ff]"
                    >
                      <div>
                        <p className="font-medium text-[#0045aa]">{subject.name}</p>
                        <p className="text-xs text-[#70aad8]">{subject.key}</p>
                      </div>
                      <Button
                        size="sm"
                        onClick={() => handleSelectSubject(subject)}
                        className="bg-[#0045aa] hover:bg-[#0f6fbd] text-white h-8 w-8 p-0 rounded"
                      >
                        +
                      </Button>
                    </div>
                  ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </main>
  )
}
