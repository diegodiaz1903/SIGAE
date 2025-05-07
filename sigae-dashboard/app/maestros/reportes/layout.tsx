import type React from "react"
import { SidebarProvider } from "@/components/ui/sidebar"
import { AppSidebarTeacher } from "@/components/app-sidebar-teacher"
import { SidebarInset } from "@/components/ui/sidebar"
import { FloatingSidebarButton } from "@/components/floating-sidebar-button"
import { MobileDetector } from "@/components/mobile-detector"

export default function TeacherReportsLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <>
      <MobileDetector />
      <SidebarProvider defaultOpen={false}>
        <AppSidebarTeacher />
        <FloatingSidebarButton />
        <SidebarInset className="bg-[#a6a6a6] transition-all duration-300">{children}</SidebarInset>
      </SidebarProvider>
    </>
  )
}
