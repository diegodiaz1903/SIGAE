"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Card, CardContent } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { BookOpen, Calendar, Clock, FileText, GraduationCap, Star } from "lucide-react"
import { FadeIn, SlideIn, StaggerChildren, StaggerItem, HoverScale } from "@/components/transition-wrapper"
import { useIsMobile } from "@/hooks/use-mobile"
import { MobileStudentDashboard } from "@/components/mobile-student-dashboard"

// Datos de ejemplo para el dashboard de alumnos
const coursesMock = [
  { id: 1, name: "Matemáticas Avanzadas", teacher: "Dr. Juan Pérez", progress: 65, grade: 85, nextClass: "Lunes 8:00" },
  { id: 2, name: "Física Cuántica", teacher: "Dra. María López", progress: 42, grade: 78, nextClass: "Martes 10:00" },
  { id: 3, name: "Programación", teacher: "Ing. Roberto Gómez", progress: 78, grade: 92, nextClass: "Miércoles 12:00" },
  { id: 4, name: "Estadística", teacher: "Mtro. Carlos Ruiz", progress: 25, grade: 70, nextClass: "Jueves 15:00" },
]

const assignmentsMock = [
  { id: 1, title: "Proyecto Final", course: "Programación", dueDate: "En 5 días", status: "Pendiente" },
  { id: 2, title: "Examen Parcial", course: "Matemáticas Avanzadas", dueDate: "Mañana", status: "Pendiente" },
  { id: 3, title: "Informe de Laboratorio", course: "Física Cuántica", dueDate: "Hoy", status: "Pendiente" },
]

export default function StudentDashboard() {
  const isMobile = useIsMobile()
  const router = useRouter()
  const [greeting, setGreeting] = useState("Bienvenido")
  const [studentName, setStudentName] = useState("")
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Determinar el saludo según la hora del día
    const hour = new Date().getHours()
    if (hour < 12) setGreeting("Buenos días")
    else if (hour < 18) setGreeting("Buenas tardes")
    else setGreeting("Buenas noches")

    // Verificar autenticación
    const checkAuth = () => {
      const authStatus = localStorage.getItem("isAuthenticated") === "true"
      const userRole = localStorage.getItem("userRole")
      const storedUsername = localStorage.getItem("username") || ""

      if (authStatus && userRole === "student") {
        setIsAuthenticated(true)
        setStudentName(storedUsername)
      } else {
        setIsAuthenticated(false)
      }
      setIsLoading(false)
    }

    checkAuth()
  }, [])

  // Si no está autenticado, redirigir a login
  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      router.push("/login")
    }
  }, [isAuthenticated, isLoading, router])

  if (isLoading || !isAuthenticated) {
    return null // No mostrar nada mientras se verifica la autenticación
  }

  // Calcular promedio general
  const averageGrade = coursesMock.reduce((sum, course) => sum + course.grade, 0) / coursesMock.length

  // Formatear la fecha actual
  const currentDate = new Date()
  const formattedDate = currentDate.toLocaleDateString("es-MX", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  })

  if (isMobile) {
    return (
      <MobileStudentDashboard
        greeting={greeting}
        studentName={studentName}
        courses={coursesMock}
        assignments={assignmentsMock}
      />
    )
  }

  return (
    <main className="flex flex-col p-6 md:p-8 animate-fade-in">
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-8">
        <SlideIn direction="right">
          <div>
            <h1 className="text-3xl md:text-4xl font-bold text-[#0045aa]">
              {greeting}, <span className="text-[#0f6fbd]">{studentName}</span>
            </h1>
            <p className="mt-2 text-[#70aad8]">Panel de control del alumno | {formattedDate}</p>
          </div>
        </SlideIn>

        <SlideIn direction="left" delay={0.3}>
          <div className="mt-4 md:mt-0 flex items-center gap-3 bg-white p-3 rounded-lg shadow-sm">
            <div className="relative w-12 h-12">
              <div className="w-12 h-12 rounded-full bg-[#0045aa] flex items-center justify-center text-white text-lg font-semibold">
                {studentName
                  .split(" ")
                  .map((name) => name[0])
                  .join("")}
              </div>
            </div>
            <div>
              <p className="font-medium text-[#0045aa]">{studentName}</p>
              <p className="text-sm text-[#70aad8]">Exalumno</p>
            </div>
          </div>
        </SlideIn>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <FadeIn delay={0.2}>
          <Card className="hover-glow">
            <CardContent className="p-6">
              <div className="flex items-center gap-2 mb-2">
                <Star className="h-5 w-5 text-[#0f6fbd]" />
                <h2 className="text-[#0045aa] font-semibold">Promedio General</h2>
              </div>
              <div className="text-3xl font-bold text-[#0045aa]">{averageGrade.toFixed(1)}</div>
              <p className="text-sm text-[#70aad8]">Calificación actual</p>
            </CardContent>
          </Card>
        </FadeIn>

        <FadeIn delay={0.3}>
          <Card className="hover-glow">
            <CardContent className="p-6">
              <div className="flex items-center gap-2 mb-2">
                <BookOpen className="h-5 w-5 text-[#0f6fbd]" />
                <h2 className="text-[#0045aa] font-semibold">Materias</h2>
              </div>
              <div className="text-3xl font-bold text-[#0045aa]">{coursesMock.length}</div>
              <p className="text-sm text-[#70aad8]">Cursos inscritos</p>
            </CardContent>
          </Card>
        </FadeIn>

        <FadeIn delay={0.4}>
          <Card className="hover-glow">
            <CardContent className="p-6">
              <div className="flex items-center gap-2 mb-2">
                <Calendar className="h-5 w-5 text-[#0f6fbd]" />
                <h2 className="text-[#0045aa] font-semibold">Pendientes</h2>
              </div>
              <div className="text-3xl font-bold text-[#0045aa]">{assignmentsMock.length}</div>
              <p className="text-sm text-[#70aad8]">Tareas de entrega</p>
            </CardContent>
          </Card>
        </FadeIn>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-2">
          <SlideIn direction="up">
            <Card className="hover-glow">
              <CardContent className="p-6">
                <div className="flex items-center gap-2 mb-4">
                  <BookOpen className="h-5 w-5 text-[#0f6fbd]" />
                  <h2 className="text-xl font-semibold text-[#0045aa]">Mis Materias</h2>
                  <span className="text-sm text-[#70aad8]">Semestre actual</span>
                </div>
                <StaggerChildren className="space-y-4">
                  {coursesMock.map((course) => (
                    <StaggerItem key={course.id}>
                      <HoverScale>
                        <div className="bg-white p-4 rounded-lg border border-[#70aad8]/30">
                          <div className="flex justify-between items-center mb-2">
                            <h3 className="font-semibold text-[#0045aa]">{course.name}</h3>
                            <span className="text-sm bg-[#0045aa]/10 text-[#0045aa] px-2 py-1 rounded">
                              {course.grade}/100
                            </span>
                          </div>
                          <div className="flex items-center gap-2 text-sm text-[#70aad8] mb-2">
                            <GraduationCap className="h-4 w-4" />
                            <span>{course.teacher}</span>
                            <Clock className="h-4 w-4 ml-2" />
                            <span>Próxima clase: {course.nextClass}</span>
                          </div>
                          <div className="mt-2">
                            <div className="flex justify-between text-xs mb-1">
                              <span>Avance del curso</span>
                              <span>{course.progress}%</span>
                            </div>
                            <Progress value={course.progress} className="h-2" />
                          </div>
                        </div>
                      </HoverScale>
                    </StaggerItem>
                  ))}
                </StaggerChildren>
              </CardContent>
            </Card>
          </SlideIn>
        </div>

        <div>
          <SlideIn direction="up" delay={0.2}>
            <Card className="hover-glow">
              <CardContent className="p-6">
                <div className="flex items-center gap-2 mb-4">
                  <FileText className="h-5 w-5 text-[#0f6fbd]" />
                  <h2 className="text-xl font-semibold text-[#0045aa]">Tareas Pendientes</h2>
                  <span className="text-sm text-[#70aad8]">Próximas entregas</span>
                </div>
                <StaggerChildren className="space-y-3">
                  {assignmentsMock.map((assignment) => (
                    <StaggerItem key={assignment.id}>
                      <HoverScale>
                        <div className="bg-white p-3 rounded-lg border border-[#70aad8]/30">
                          <h4 className="font-medium text-[#0045aa]">{assignment.title}</h4>
                          <div className="flex justify-between items-center mt-1 text-sm">
                            <span className="text-[#70aad8]">{assignment.course}</span>
                            <span
                              className={`px-2 py-0.5 rounded text-xs ${
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
                        </div>
                      </HoverScale>
                    </StaggerItem>
                  ))}
                </StaggerChildren>
              </CardContent>
            </Card>
          </SlideIn>
        </div>
      </div>
    </main>
  )
}
