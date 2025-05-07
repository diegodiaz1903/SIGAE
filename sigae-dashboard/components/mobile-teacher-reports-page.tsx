"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Bar } from "react-chartjs-2"
import type { ChartData, ChartOptions } from "chart.js"

interface MobileTeacherReportsPageProps {
  filter: string
  handleFilterChange: (value: string) => void
  handleYearFilter: () => void
  handleMonthFilter: () => void
  handleDayFilter: () => void
  handleExportExcel: () => void
  chartData: ChartData<"bar">
  chartOptions: ChartOptions<"bar">
}

export function MobileTeacherReportsPage({
  filter,
  handleFilterChange,
  handleYearFilter,
  handleMonthFilter,
  handleDayFilter,
  handleExportExcel,
  chartData,
  chartOptions,
}: MobileTeacherReportsPageProps) {
  return (
    <main className="flex flex-col p-4 animate-fade-in">
      <h1 className="text-2xl font-bold text-[#0045aa] mb-4">Reportes de calificaciones</h1>

      <div className="space-y-4 mb-4">
        <div className="flex gap-2">
          <Button
            onClick={handleYearFilter}
            size="sm"
            className="flex-1 bg-[#0045aa] hover:bg-[#0f6fbd] text-white transition-all duration-300"
          >
            Año
          </Button>
          <Button
            onClick={handleMonthFilter}
            size="sm"
            className="flex-1 bg-[#0045aa] hover:bg-[#0f6fbd] text-white transition-all duration-300"
          >
            Mes
          </Button>
          <Button
            onClick={handleDayFilter}
            size="sm"
            className="flex-1 bg-[#0045aa] hover:bg-[#0f6fbd] text-white transition-all duration-300"
          >
            Día
          </Button>
        </div>

        <Select defaultValue={filter} onValueChange={handleFilterChange}>
          <SelectTrigger className="w-full">
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

      <Card className="hover-glow mb-4">
        <CardContent className="p-4">
          <div className="h-[300px] w-full">
            <Bar
              data={chartData}
              options={{
                ...chartOptions,
                plugins: {
                  ...chartOptions.plugins,
                  legend: {
                    ...chartOptions.plugins?.legend,
                    labels: {
                      boxWidth: 10,
                      font: {
                        size: 10,
                      },
                    },
                  },
                  title: {
                    ...chartOptions.plugins?.title,
                    font: {
                      size: 12,
                    },
                  },
                },
              }}
            />
          </div>
        </CardContent>
      </Card>

      <Button
        onClick={handleExportExcel}
        className="w-full bg-[#8bc34a] hover:bg-[#7cb342] text-white transition-all duration-300"
      >
        Generar reporte en Excel
      </Button>
    </main>
  )
}
