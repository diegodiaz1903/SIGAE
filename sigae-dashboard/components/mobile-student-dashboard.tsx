"use client"

import { Card, CardContent, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { BookOpen, Calendar, Clock, FileText, GraduationCap, Star } from "lucide-react"

interface Course {
  id: number
  name: string
  teacher: string
  progress: number
  grade: number
  nextClass: string
}

interface Assignment {
  id: number
  title: string
  course: string
  dueDate: string
  status: string
}

interface MobileStudentDashboardProps {
  greeting: string
  studentName: string
  courses: Course[]
  assignments: Assignment[]
}

export function MobileStudentDashboard({ greeting, studentName, courses, assignments }: MobileStudentDashboardProps) {
  // Calcular promedio general
  const averageGrade = courses.reduce((sum, course) => sum + course.grade, 0) / courses.length

  return (
    <main className="flex flex-col p-4 animate-fade-in">
      {/* Cabecera con saludo */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-[#0045aa]">{greeting}</h1>
          <p className="text-[#0f6fbd] font-medium">{studentName}</p>
        </div>
        <div className="w-12 h-12 rounded-full bg-[#0045aa] flex items-center justify-center text-white text-lg font-semibold">
          {studentName
            .split(" ")
            .map((name) => name[0])
            .join("")}
        </div>
      </div>

      {/* Tarjetas de estadísticas */}
      <div className="grid grid-cols-2 gap-3 mb-6">
        <Card className="hover-glow">
          <CardContent className="p-4">
            <div className="flex items-center gap-2 mb-1">
              <Star className="h-4 w-4 text-[#0f6fbd]" />
              <CardTitle className="text-sm text-[#0045aa]">Promedio</CardTitle>
            </div>
            <div className="text-2xl font-bold text-[#0045aa]">{averageGrade.toFixed(1)}</div>
          </CardContent>
        </Card>

        <Card className="hover-glow">
          <CardContent className="p-4">
            <div className="flex items-center gap-2 mb-1">
              <Calendar className="h-4 w-4 text-[#0f6fbd]" />
              <CardTitle className="text-sm text-[#0045aa]">Pendientes</CardTitle>
            </div>
            <div className="text-2xl font-bold text-[#0045aa]">{assignments.length}</div>
          </CardContent>
        </Card>
      </div>

      {/* Materias */}
      <div className="mb-6">
        <div className="flex items-center gap-2 mb-3">
          <BookOpen className="h-5 w-5 text-[#0f6fbd]" />
          <h2 className="text-lg font-semibold text-[#0045aa]">Mis Materias</h2>
        </div>

        <div className="space-y-3">
          {courses.slice(0, 2).map((course) => (
            <Card key={course.id} className="hover-glow">
              <CardContent className="p-4">
                <div className="flex justify-between items-center mb-1">
                  <h3 className="font-medium text-[#0045aa]">{course.name}</h3>
                  <span className="text-xs bg-[#0045aa]/10 text-[#0045aa] px-2 py-0.5 rounded">{course.grade}/100</span>
                </div>
                <div className="flex items-center gap-2 text-xs text-[#70aad8] mb-2">
                  <GraduationCap className="h-3 w-3" />
                  <span>{course.teacher}</span>
                </div>
                <div className="flex items-center gap-2 text-xs text-[#70aad8] mb-2">
                  <Clock className="h-3 w-3" />
                  <span>{course.nextClass}</span>
                </div>
                <div className="mt-2">
                  <div className="flex justify-between text-xs mb-1">
                    <span>Avance</span>
                    <span>{course.progress}%</span>
                  </div>
                  <Progress value={course.progress} className="h-1.5" />
                </div>
              </CardContent>
            </Card>
          ))}

          {courses.length > 2 && (
            <button className="w-full text-center text-sm text-[#0f6fbd] py-2">
              Ver todas las materias ({courses.length})
            </button>
          )}
        </div>
      </div>

      {/* Tareas pendientes */}
      <div>
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <FileText className="h-5 w-5 text-[#0f6fbd]" />
            <h2 className="text-lg font-semibold text-[#0045aa]">Tareas</h2>
          </div>
          <span className="bg-[#0045aa] text-white text-xs px-2 py-1 rounded-full">{assignments.length}</span>
        </div>

        <div className="space-y-3">
          {assignments.map((assignment) => (
            <Card key={assignment.id} className="hover-glow">
              <CardContent className="p-4">
                <h4 className="font-medium text-[#0045aa]">{assignment.title}</h4>
                <div className="flex justify-between items-center mt-1 text-xs">
                  <span className="text-[#70aad8]">{assignment.course}</span>
                  <span
                    className={`px-2 py-0.5 rounded ${
                      assignment.dueDate === "Hoy"
                        ? "bg-red-100 text-red-600"
                        : assignment.dueDate === "Mañana"
                          ? "bg-orange-100 text-orange-600"
                          : "bg-blue-100 text-blue-600"
                    }`}
                  >
                    {assignment.dueDate}
                  </span>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </main>
  )
}
