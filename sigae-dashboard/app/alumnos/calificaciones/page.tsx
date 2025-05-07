"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { FadeIn, SlideIn } from "@/components/transition-wrapper"
import { useIsMobile } from "@/hooks/use-mobile"
import { MobileGradesPage } from "@/components/mobile-grades-page"

interface Activity {
  key: string
  subject: string
  total: string
  activity1: string
  activity2: string
}

interface GlobalGrade {
  key: string
  subject: string
  grade: string
}

export default function GradesPage() {
  const isMobile = useIsMobile()
  const [mounted, setMounted] = useState(false)

  // Datos de ejemplo para las actividades
  const [activities, setActivities] = useState<Activity[]>([
    { key: "Data", subject: "Data", total: "Data", activity1: "Data", activity2: "Data" },
    { key: "Data", subject: "Data", total: "Data", activity1: "Data", activity2: "Data" },
    { key: "Data", subject: "Data", total: "Data", activity1: "Data", activity2: "Data" },
    { key: "Data", subject: "Data", total: "Data", activity1: "Data", activity2: "Data" },
    { key: "Data", subject: "Data", total: "Data", activity1: "Data", activity2: "Data" },
  ])

  // Datos de ejemplo para calificaciones globales
  const [globalGrades, setGlobalGrades] = useState<GlobalGrade[]>([
    { key: "Data", subject: "Data", grade: "Data" },
    { key: "Data", subject: "Data", grade: "Data" },
    { key: "Data", subject: "Data", grade: "Data" },
    { key: "Data", subject: "Data", grade: "Data" },
    { key: "Data", subject: "Data", grade: "Data" },
  ])

  // Información del período
  const [periodInfo, setPeriodInfo] = useState({
    currentPeriod: "Periodo actual",
    lastVisitDate: "Fecha última de visita",
    lastUpdateDate: "Fecha última de actualización",
  })

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return null

  if (isMobile) {
    return <MobileGradesPage activities={activities} globalGrades={globalGrades} periodInfo={periodInfo} />
  }

  return (
    <main className="flex flex-col p-6 md:p-8 animate-fade-in">
      <SlideIn direction="right">
        <h1 className="text-3xl font-bold text-[#0045aa] mb-6">Calificaciones de actividades</h1>
      </SlideIn>

      <div className="mb-4">
        <div className="text-sm text-[#0f6fbd]">
          <p>{periodInfo.currentPeriod}</p>
          <p>{periodInfo.lastVisitDate}</p>
          <p>{periodInfo.lastUpdateDate}</p>
        </div>
      </div>

      {/* Tabla de calificaciones de actividades */}
      <FadeIn delay={0.2}>
        <Card className="hover-glow mb-8">
          <CardHeader>
            <CardTitle className="text-2xl font-bold text-[#0045aa]">Calificaciones de actividades</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="border rounded-md overflow-hidden">
              <Table>
                <TableHeader>
                  <TableRow className="bg-[#f5f5f5]">
                    <TableHead className="font-bold text-[#0045aa]">Clave</TableHead>
                    <TableHead className="font-bold text-[#0045aa]">Materia</TableHead>
                    <TableHead className="font-bold text-[#0045aa]">Total acumulado</TableHead>
                    <TableHead className="font-bold text-[#0045aa]">Actividad 1</TableHead>
                    <TableHead className="font-bold text-[#0045aa]">Actividad 2</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {activities.map((activity, index) => (
                    <TableRow key={index} className="hover:bg-[#f0f7ff] transition-colors duration-200 border-b">
                      <TableCell>{activity.key}</TableCell>
                      <TableCell>{activity.subject}</TableCell>
                      <TableCell>{activity.total}</TableCell>
                      <TableCell>{activity.activity1}</TableCell>
                      <TableCell>{activity.activity2}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>
      </FadeIn>

      {/* Tabla de calificaciones globales */}
      <FadeIn delay={0.4}>
        <Card className="hover-glow">
          <CardHeader>
            <CardTitle className="text-2xl font-bold text-[#0045aa]">Calificaciones globales de AE</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="border rounded-md overflow-hidden">
              <Table>
                <TableHeader>
                  <TableRow className="bg-[#f5f5f5]">
                    <TableHead className="font-bold text-[#0045aa]">Clave</TableHead>
                    <TableHead className="font-bold text-[#0045aa]">Materia</TableHead>
                    <TableHead className="font-bold text-[#0045aa]">Calificaciones</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {globalGrades.map((grade, index) => (
                    <TableRow key={index} className="hover:bg-[#f0f7ff] transition-colors duration-200 border-b">
                      <TableCell>{grade.key}</TableCell>
                      <TableCell>{grade.subject}</TableCell>
                      <TableCell>{grade.grade}</TableCell>
                    </TableRow>
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
