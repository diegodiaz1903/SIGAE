"use client"

import { useState, useEffect } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { FadeIn, SlideIn } from "@/components/transition-wrapper"
import { useIsMobile } from "@/hooks/use-mobile"
import { MobileTeacherReportsPage } from "@/components/mobile-teacher-reports-page"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Bar } from "react-chartjs-2"
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from "chart.js"

// Registrar los componentes necesarios para Chart.js
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend)

export default function TeacherReportsPage() {
  const isMobile = useIsMobile()
  const [mounted, setMounted] = useState(false)
  const [filter, setFilter] = useState("todos")

  // Datos para la gráfica
  const chartData = {
    labels: ["Categoría 1", "Categoría 2", "Categoría 3", "Categoría 4", "Categoría 5", "Categoría 6"],
    datasets: [
      {
        label: "Resultados",
        data: [65, 59, 80, 81, 56, 90],
        backgroundColor: "rgba(75, 75, 75, 0.6)",
      },
    ],
  }

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: "top" as const,
      },
      title: {
        display: true,
        text: "Gráfica de resultados global y personalizada",
      },
    },
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  }

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return null

  const handleFilterChange = (value: string) => {
    setFilter(value)
    // Aquí se actualizarían los datos de la gráfica según el filtro seleccionado
  }

  const handleYearFilter = () => {
    // Filtrar por año
    alert("Filtrando por año")
  }

  const handleMonthFilter = () => {
    // Filtrar por mes
    alert("Filtrando por mes")
  }

  const handleDayFilter = () => {
    // Filtrar por día
    alert("Filtrando por día")
  }

  const handleExportExcel = () => {
    alert("Generando reporte en Excel...")
  }

  if (isMobile) {
    return (
      <MobileTeacherReportsPage
        filter={filter}
        handleFilterChange={handleFilterChange}
        handleYearFilter={handleYearFilter}
        handleMonthFilter={handleMonthFilter}
        handleDayFilter={handleDayFilter}
        handleExportExcel={handleExportExcel}
        chartData={chartData}
        chartOptions={chartOptions}
      />
    )
  }

  return (
    <main className="flex flex-col p-6 md:p-8 animate-fade-in">
      <SlideIn direction="right">
        <h1 className="text-3xl font-bold text-[#0045aa] mb-6">Ver reporte de calificaciones de AE</h1>
      </SlideIn>

      <div className="flex flex-wrap justify-between items-center mb-6">
        <div className="flex gap-2 mb-4 md:mb-0">
          <Button
            onClick={handleYearFilter}
            className="bg-[#0045aa] hover:bg-[#0f6fbd] text-white transition-all duration-300"
          >
            Año
          </Button>
          <Button
            onClick={handleMonthFilter}
            className="bg-[#0045aa] hover:bg-[#0f6fbd] text-white transition-all duration-300"
          >
            Mes
          </Button>
          <Button
            onClick={handleDayFilter}
            className="bg-[#0045aa] hover:bg-[#0f6fbd] text-white transition-all duration-300"
          >
            Día
          </Button>
        </div>

        <div className="w-full md:w-auto">
          <Select defaultValue={filter} onValueChange={handleFilterChange}>
            <SelectTrigger className="w-full md:w-[200px]">
              <SelectValue placeholder="Selección de filtros" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="todos">Todos</SelectItem>
              <SelectItem value="aprobados">Aprobados</SelectItem>
              <SelectItem value="reprobados">Reprobados</SelectItem>
              <SelectItem value="pendientes">Pendientes</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <FadeIn delay={0.2}>
        <Card className="hover-glow mb-6">
          <CardContent className="p-6">
            <div className="h-[400px] w-full">
              <Bar data={chartData} options={chartOptions} />
            </div>
          </CardContent>
        </Card>
      </FadeIn>

      <div className="flex justify-center">
        <Button
          onClick={handleExportExcel}
          className="bg-[#8bc34a] hover:bg-[#7cb342] text-white transition-all duration-300"
        >
          Generar reporte en Excel
        </Button>
      </div>
    </main>
  )
}
