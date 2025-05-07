"use client"

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

interface MobileTeacherDashboardProps {
  greeting: string
  teacherName: string
  classes: Class[]
  pendingTasks: Task[]
}

export function MobileTeacherDashboard({ greeting, teacherName, classes, pendingTasks }: MobileTeacherDashboardProps) {
  return (
    <main className="flex flex-col p-4 animate-fade-in">
      {/* Cabecera con saludo */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-[#0045aa]">{greeting}</h1>
          <p className="text-[#0f6fbd] font-medium">{teacherName}</p>
        </div>
        <div className="w-12 h-12 rounded-full bg-[#0045aa] flex items-center justify-center text-white text-lg font-semibold">
          {teacherName
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
              <Users className="h-4 w-4 text-[#0f6fbd]" />
              <CardTitle className="text-sm text-[#0045aa]">Alumnos</CardTitle>
            </div>
            <div className="text-2xl font-bold text-[#0045aa]">125</div>
          </CardContent>
        </Card>

        <Card className="hover-glow">
          <CardContent className="p-4">
            <div className="flex items-center gap-2 mb-1">
              <BookOpen className="h-4 w-4 text-[#0f6fbd]" />
              <CardTitle className="text-sm text-[#0045aa]">Materias</CardTitle>
            </div>
            <div className="text-2xl font-bold text-[#0045aa]">{classes.length}</div>
          </CardContent>
        </Card>
      </div>

      {/* Clases del día */}
      <div className="mb-6">
        <div className="flex items-center gap-2 mb-3">
          <Calendar className="h-5 w-5 text-[#0f6fbd]" />
          <h2 className="text-lg font-semibold text-[#0045aa]">Clases de Hoy</h2>
        </div>

        <div className="space-y-3">
          {classes.slice(0, 2).map((classItem) => (
            <Card key={classItem.id} className="hover-glow">
              <CardContent className="p-4">
                <div className="flex justify-between items-center mb-1">
                  <h3 className="font-medium text-[#0045aa]">{classItem.name}</h3>
                  <span className="text-xs bg-[#0045aa]/10 text-[#0045aa] px-2 py-0.5 rounded">
                    Grupo {classItem.group}
                  </span>
                </div>
                <div className="flex items-center gap-2 text-xs text-[#70aad8] mb-2">
                  <Clock className="h-3 w-3" />
                  <span>{classItem.time}</span>
                  <Users className="h-3 w-3 ml-1" />
                  <span>{classItem.students}</span>
                </div>
                <div className="mt-2">
                  <div className="flex justify-between text-xs mb-1">
                    <span>Avance</span>
                    <span>{classItem.progress}%</span>
                  </div>
                  <Progress value={classItem.progress} className="h-1.5" />
                </div>
              </CardContent>
            </Card>
          ))}

          {classes.length > 2 && (
            <button className="w-full text-center text-sm text-[#0f6fbd] py-2">
              Ver todas las clases ({classes.length})
            </button>
          )}
        </div>
      </div>

      {/* Pendientes */}
      <div>
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <CheckSquare className="h-5 w-5 text-[#0f6fbd]" />
            <h2 className="text-lg font-semibold text-[#0045aa]">Pendientes</h2>
          </div>
          <span className="bg-[#0045aa] text-white text-xs px-2 py-1 rounded-full">{pendingTasks.length}</span>
        </div>

        <div className="space-y-3">
          {pendingTasks.map((task) => (
            <Card key={task.id} className="hover-glow">
              <CardContent className="p-4">
                <h4 className="font-medium text-[#0045aa]">{task.title}</h4>
                <div className="flex justify-between items-center mt-1 text-xs">
                  <span className="text-[#70aad8]">{task.course}</span>
                  <span
                    className={`px-2 py-0.5 rounded ${
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
      </div>
    </main>
  )
}
