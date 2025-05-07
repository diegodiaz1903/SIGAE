"use client"

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { useState } from "react"

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

interface MobileGradesPageProps {
  activities: Activity[]
  globalGrades: GlobalGrade[]
  periodInfo: {
    currentPeriod: string
    lastVisitDate: string
    lastUpdateDate: string
  }
}

export function MobileGradesPage({ activities, globalGrades, periodInfo }: MobileGradesPageProps) {
  const [activeTab, setActiveTab] = useState("activities")

  return (
    <main className="flex flex-col p-4 animate-fade-in">
      <h1 className="text-2xl font-bold text-[#0045aa] mb-2">Calificaciones</h1>

      <div className="mb-3">
        <div className="text-xs text-[#0f6fbd]">
          <p>{periodInfo.currentPeriod}</p>
          <p>{periodInfo.lastVisitDate}</p>
          <p>{periodInfo.lastUpdateDate}</p>
        </div>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid grid-cols-2 mb-4">
          <TabsTrigger value="activities" className="text-[#0045aa]">
            Actividades
          </TabsTrigger>
          <TabsTrigger value="global" className="text-[#0045aa]">
            Globales
          </TabsTrigger>
        </TabsList>

        {/* Calificaciones de actividades */}
        <TabsContent value="activities" className="space-y-4">
          <Card className="hover-glow">
            <CardHeader className="pb-2">
              <CardTitle className="text-lg text-[#0045aa]">Calificaciones de actividades</CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow className="bg-[#f5f5f5]">
                      <TableHead className="font-bold text-[#0045aa] text-xs">Clave</TableHead>
                      <TableHead className="font-bold text-[#0045aa] text-xs">Materia</TableHead>
                      <TableHead className="font-bold text-[#0045aa] text-xs">Total</TableHead>
                      <TableHead className="font-bold text-[#0045aa] text-xs">Act 1</TableHead>
                      <TableHead className="font-bold text-[#0045aa] text-xs">Act 2</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {activities.map((activity, index) => (
                      <TableRow key={index} className="hover:bg-[#f0f7ff] transition-colors duration-200 border-b">
                        <TableCell className="text-xs p-2">{activity.key}</TableCell>
                        <TableCell className="text-xs p-2">{activity.subject}</TableCell>
                        <TableCell className="text-xs p-2">{activity.total}</TableCell>
                        <TableCell className="text-xs p-2">{activity.activity1}</TableCell>
                        <TableCell className="text-xs p-2">{activity.activity2}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Calificaciones globales */}
        <TabsContent value="global" className="space-y-4">
          <Card className="hover-glow">
            <CardHeader className="pb-2">
              <CardTitle className="text-lg text-[#0045aa]">Calificaciones globales de AE</CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow className="bg-[#f5f5f5]">
                      <TableHead className="font-bold text-[#0045aa] text-xs">Clave</TableHead>
                      <TableHead className="font-bold text-[#0045aa] text-xs">Materia</TableHead>
                      <TableHead className="font-bold text-[#0045aa] text-xs">Calificaciones</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {globalGrades.map((grade, index) => (
                      <TableRow key={index} className="hover:bg-[#f0f7ff] transition-colors duration-200 border-b">
                        <TableCell className="text-xs p-2">{grade.key}</TableCell>
                        <TableCell className="text-xs p-2">{grade.subject}</TableCell>
                        <TableCell className="text-xs p-2">{grade.grade}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </main>
  )
}
