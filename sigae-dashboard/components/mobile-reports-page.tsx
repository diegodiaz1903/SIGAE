"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Bar } from "react-chartjs-2"
import type { ChartData, ChartOptions } from "chart.js"

interface MobileReportsPageProps {
  reportType: string
  period: string
  handleReportTypeChange: (value: string) => void
  handlePeriodChange: (value: string) => void
  chartData: ChartData<"bar">
  chartOptions: ChartOptions<"bar">
}

export function MobileReportsPage({
  reportType,
  period,
  handleReportTypeChange,
  handlePeriodChange,
  chartData,
  chartOptions,
}: MobileReportsPageProps) {
  return (
    <main className="flex flex-col p-4 animate-fade-in">
      <h1 className="text-2xl font-bold text-[#0045aa] mb-4">Reportes</h1>

      <div className="space-y-3 mb-4">
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

        <div>
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

      <Card className="hover-glow">
        <CardHeader>
          <CardTitle className="text-xl text-[#0045aa]">Resultados</CardTitle>
        </CardHeader>
        <CardContent>
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
    </main>
  )
}
