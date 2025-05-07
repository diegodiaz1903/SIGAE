"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { MobileTeacherDashboard } from "@/components/mobile-teacher-dashboard"
import { useIsMobile } from "@/hooks/use-mobile"
import { Card, CardContent, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { BookOpen, Calendar, CheckSquare, Clock, Users } from "lucide-react"

interface Class {
  id: number
  name: string
  group: string
  students: number
  progress: number
  time: string
}

interface Task {
  id: number
  title: string
  course: string
  dueDate: string
}

export default function TeacherDashboard() {
  const router = useRouter()
  const isMobile = useIsMobile()
  const [mounted, setMounted] = useState(false)
  const [teacherName, setTeacherName] = useState("Dr. Juan Pérez")

  // Verificar autenticación
  useEffect(() => {
    const isAuthenticated = localStorage.getItem("isAuthenticated") === "true"
    const userRole = localStorage.getItem("userRole")

    if (!isAuthenticated || userRole !== "teacher") {
      router.push("/login")
      return
    }

    // Obtener nombre del maestro del localStorage
    const storedName = localStorage.getItem("username")
    if (storedName) {
      setTeacherName(storedName)
    }

    setMounted(true)
  }, [router])

  if (!mounted) return null

  // Datos de ejemplo para las clases
  const classes: Class[] = [
    {
      id: 1,
      name: "Matemáticas Avanzadas",
      group: "A",
      students: 32,
      progress: 65,
      time: "8:00 - 9:30",
    },
    {
      id: 2,
      name: "Física Cuántica",
      group: "B",
      students: 28,
      progress: 42,
      time: "10:00 - 11:30",
    },
  ]

  // Datos de ejemplo para las tareas pendientes
  const pendingTasks: Task[] = [
    {
      id: 1,
      title: "Calificar exámenes parciales",
      course: "Matemáticas Avanzadas",
      dueDate: "Hoy",
    },
    {
      id: 2,
      title: "Revisar proyectos finales",
      course: "Programación",
      dueDate: "Mañana",
    },
    {
      id: 3,
      title: "Actualizar plan de estudios",
      course: "Física Cuántica",
      dueDate: "En 3 días",
    },
  ]

  // Obtener saludo según la hora del día
  const getGreeting = () => {
    const hour = new Date().getHours()
    if (hour < 12) return "Buenos días"
    if (hour < 18) return "Buenas tardes"
    return "Buenas noches"
  }

  // Versión móvil
  if (isMobile) {
    return (
      <MobileTeacherDashboard
        greeting={getGreeting()}
        teacherName={teacherName}
        classes={classes}
        pendingTasks={pendingTasks}
      />
    )
  }

  // Versión de escritorio
  return (
    <main className="flex flex-col p-6 animate-fade-in">
      {/* Cabecera con saludo */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-[#0045aa]">Bienvenido, {teacherName}</h1>
          <p className="text-[#0f6fbd] font-medium">
            Panel de Maestro -{" "}
            {new Date().toLocaleDateString("es-ES", {
              weekday: "long",
              day: "numeric",
              month: "long",
              year: "numeric",
            })}
          </p>
        </div>
        <div className="flex items-center gap-4">
          <div className="w-14 h-14 rounded-full bg-[#0045aa] flex items-center justify-center text-white text-xl font-semibold">
            {teacherName
              .split(" ")
              .map((name) => name[0])
              .join("")}
          </div>
          <div>
            <p className="font-bold text-[#0045aa]">{teacherName}</p>
            <p className="text-sm text-[#70aad8]">Maestro</p>
          </div>
        </div>
      </div>

      {/* Tarjetas de estadísticas */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <Card className="hover-glow">
          <CardContent className="p-6">
            <div className="flex items-center gap-3 mb-2">
              <Users className="h-6 w-6 text-[#0f6fbd]" />
              <CardTitle className="text-xl text-[#0045aa]">Alumnos Activos</CardTitle>
            </div>
            <div className="text-4xl font-bold text-[#0045aa]">125</div>
            <div className="text-sm text-[#70aad8] mt-1">En 4 grupos diferentes</div>
          </CardContent>
        </Card>

        <Card className="hover-glow">
          <CardContent className="p-6">
            <div className="flex items-center gap-3 mb-2">
              <CheckSquare className="h-6 w-6 text-[#0f6fbd]" />
              <CardTitle className="text-xl text-[#0045aa]">Pendientes</CardTitle>
            </div>
            <div className="text-4xl font-bold text-[#0045aa]">{pendingTasks.length}</div>
            <div className="text-sm text-[#70aad8] mt-1">Tareas por completar</div>
          </CardContent>
        </Card>

        <Card className="hover-glow">
          <CardContent className="p-6">
            <div className="flex items-center gap-3 mb-2">
              <BookOpen className="h-6 w-6 text-[#0f6fbd]" />
              <CardTitle className="text-xl text-[#0045aa]">Materias</CardTitle>
            </div>
            <div className="text-4xl font-bold text-[#0045aa]">{classes.length}</div>
            <div className="text-sm text-[#70aad8] mt-1">Asignaciones activas</div>
          </CardContent>
        </Card>
      </div>

      {/* Contenido principal en dos columnas */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Clases del día */}
        <div className="lg:col-span-2">
          <Card className="hover-glow">
            <CardContent className="p-6">
              <div className="flex items-center gap-3 mb-4">
                <Calendar className="h-6 w-6 text-[#0f6fbd]" />
                <CardTitle className="text-xl text-[#0045aa]">Clases del día</CardTitle>
              </div>
              <p className="text-sm text-[#70aad8] mb-4">
                {new Date().toLocaleDateString("es-ES", { weekday: "long", day: "numeric", month: "long" })}
              </p>

              <div className="space-y-6">
                {classes.map((classItem) => (
                  <div key={classItem.id} className="border-b pb-4 last:border-0 last:pb-0">
                    <div className="flex justify-between items-center mb-2">
                      <h3 className="font-semibold text-lg text-[#0045aa]">{classItem.name}</h3>
                      <span className="text-sm bg-[#0045aa]/10 text-[#0045aa] px-3 py-1 rounded-full">
                        Grupo {classItem.group}
                      </span>
                    </div>
                    <div className="flex items-center gap-4 text-sm text-[#70aad8] mb-3">
                      <div className="flex items-center gap-1">
                        <Clock className="h-4 w-4" />
                        <span>{classItem.time}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Users className="h-4 w-4" />
                        <span>{classItem.students} alumnos</span>
                      </div>
                    </div>
                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span>Avance del curso</span>
                        <span>{classItem.progress}%</span>
                      </div>
                      <Progress value={classItem.progress} className="h-2" />
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Pendientes */}
        <div>
          <Card className="hover-glow">
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  <CheckSquare className="h-6 w-6 text-[#0f6fbd]" />
                  <CardTitle className="text-xl text-[#0045aa]">Pendientes</CardTitle>
                </div>
                <span className="bg-[#0045aa] text-white text-sm px-2 py-1 rounded-full">{pendingTasks.length}</span>
              </div>
              <p className="text-sm text-[#70aad8] mb-4">Tareas por completar</p>

              <div className="space-y-4">
                {pendingTasks.map((task) => (
                  <Card key={task.id} className="hover-glow">
                    <CardContent className="p-4">
                      <h4 className="font-medium text-[#0045aa] mb-1">{task.title}</h4>
                      <div className="flex justify-between items-center mt-2 text-sm">
                        <span className="text-[#70aad8]">{task.course}</span>
                        <span
                          className={`px-2 py-0.5 rounded-full ${
                            task.dueDate === "Hoy"
                              ? "bg-red-100 text-red-600"
                              : task.dueDate === "Mañana"
                                ? "bg-orange-100 text-orange-600"
                                : "bg-blue-100 text-blue-600"
                          }`}
                        >
                          {task.dueDate}
                        </span>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </main>
  )
}
