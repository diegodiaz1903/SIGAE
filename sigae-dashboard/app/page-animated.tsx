"use client"

import { AnimatedLogo } from "@/components/animated-logo"
import {
  TransitionWrapper,
  FadeIn,
  SlideIn,
  StaggerChildren,
  StaggerItem,
  HoverScale,
} from "@/components/transition-wrapper"

export default function HomeAnimated() {
  return (
    <TransitionWrapper>
      <main className="flex min-h-screen flex-col items-center p-8">
        <div className="flex flex-col md:flex-row items-center justify-center gap-8 w-full max-w-5xl mx-auto">
          <AnimatedLogo size={256} />

          <div className="text-center md:text-left">
            <SlideIn direction="right">
              <h1 className="text-4xl md:text-6xl font-bold text-[#0045aa]">Bienvenido usuario</h1>
            </SlideIn>

            <SlideIn direction="right" delay={0.2}>
              <p className="mt-4 text-xl text-[#0f6fbd]">Sistema de Gestión Académica Educativa</p>
            </SlideIn>

            <SlideIn direction="right" delay={0.4}>
              <div className="mt-8 flex flex-wrap gap-4 justify-center md:justify-start">
                <HoverScale>
                  <button className="px-6 py-3 bg-[#0045aa] text-white rounded-lg transition-all duration-300 hover:shadow-lg">
                    Comenzar
                  </button>
                </HoverScale>

                <HoverScale>
                  <button className="px-6 py-3 border-2 border-[#70aad8] text-[#0045aa] rounded-lg transition-all duration-300 hover:shadow-lg">
                    Más información
                  </button>
                </HoverScale>
              </div>
            </SlideIn>
          </div>
        </div>

        <FadeIn delay={0.6}>
          <StaggerChildren className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full max-w-5xl mx-auto mt-16">
            {[
              {
                title: "Gestión de Maestros",
                description: "Administra la información de los docentes de forma eficiente.",
              },
              { title: "Asignaciones", description: "Gestiona las asignaciones de cursos y horarios fácilmente." },
              { title: "Reportes", description: "Genera informes detallados para tomar mejores decisiones." },
            ].map((item, index) => (
              <StaggerItem key={index}>
                <HoverScale>
                  <div className="bg-white p-6 rounded-lg shadow-md">
                    <h3 className="text-xl font-semibold text-[#0045aa] mb-2">{item.title}</h3>
                    <p className="text-[#0f6fbd]">{item.description}</p>
                  </div>
                </HoverScale>
              </StaggerItem>
            ))}
          </StaggerChildren>
        </FadeIn>
      </main>
    </TransitionWrapper>
  )
}
