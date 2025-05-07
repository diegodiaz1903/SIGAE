"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { FadeIn, SlideIn } from "@/components/transition-wrapper"
import { useIsMobile } from "@/hooks/use-mobile"
import { MobileReportsPage } from "@/components/mobile-reports-page"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Bar } from "react-chartjs-2"
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from "chart.js"

// Registrar los componentes necesarios para Chart.js
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend)

export default function ReportsPage() {
  const isMobile = useIsMobile()
  const [mounted, setMounted] = useState(false)
  const [reportType, setReportType] = useState("tipo1")
  const [period, setPeriod] = useState("semestre1")

  // Datos para la gráfica
  const chartData = {
    labels: ["Categoría 1", "Categoría 2", "Categoría 3", "Categoría 4", "Categoría 5", "Categoría 6"],
    datasets: [
      {
        label: "Global",
        data: [65, 59, 80, 81, 56, 90],
        backgroundColor: "rgba(75, 75, 75, 0.6)",
      },
      {
        label: "Personalizado",
        data: [28, 48, 40, 19, 86, 27],
        backgroundColor: "rgba(150, 150, 150, 0.6)",
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

  const handleReportTypeChange = (value: string) => {
    setReportType(value)
    // Aquí se actualizarían los datos de la gráfica según el tipo seleccionado
  }

  const handlePeriodChange = (value: string) => {
    setPeriod(value)
    // Aquí se actualizarían los datos de la gráfica según el período seleccionado
  }

  if (isMobile) {
    return (
      <MobileReportsPage
        reportType={reportType}
        period={period}
        handleReportTypeChange={handleReportTypeChange}
        handlePeriodChange={handlePeriodChange}
        chartData={chartData}
        chartOptions={chartOptions}
      />
    )
  }

  return (
    <main className="flex flex-col p-6 md:p-8 animate-fade-in">
      <SlideIn direction="right">
        <h1 className="text-3xl font-bold text-[#0045aa] mb-6">Reportes</h1>
      </SlideIn>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <div>
          <Select defaultValue={reportType} onValueChange={handleReportTypeChange}>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Selección de tipo de filtro" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="tipo1">Tipo 1</SelectItem>
              <SelectItem value="tipo2">Tipo 2</SelectItem>
              <SelectItem value="tipo3">Tipo 3</SelectItem>
              <SelectItem value="tipo4">Tipo 4</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="md:col-start-4">
          <Select defaultValue={period} onValueChange={handlePeriodChange}>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Selección de periodo" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="semestre1">Semestre 1</SelectItem>
              <SelectItem value="semestre2">Semestre 2</SelectItem>
              <SelectItem value="anual">Anual</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <FadeIn delay={0.2}>
        <Card className="hover-glow">
          <CardHeader>
            <CardTitle className="text-2xl font-bold text-[#0045aa]">Resultados</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[400px] w-full">
              <Bar data={chartData} options={chartOptions} />
            </div>
          </CardContent>
        </Card>
      </FadeIn>
    </main>
  )
}
