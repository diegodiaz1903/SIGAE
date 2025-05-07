"use client"

import type * as React from "react"
import { Home, GraduationCap, BookOpen, FileText, User, LogOut } from "lucide-react"
import Image from "next/image"
import { useEffect, useState } from "react"
import { usePathname, useRouter } from "next/navigation"

import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
} from "@/components/ui/sidebar"
import { useSidebar } from "@/components/ui/sidebar"
import { Button } from "@/components/ui/button"
import { PanelRightClose } from "lucide-react"
import { useIsMobile } from "@/hooks/use-mobile"

// Elementos del menú para alumnos
const menuItems = [
  {
    title: "Inicio",
    icon: Home,
    url: "/alumnos",
  },
  {
    title: "Calificaciones",
    icon: GraduationCap,
    url: "/alumnos/calificaciones",
  },
  {
    title: "Selección de materias",
    icon: BookOpen,
    url: "/alumnos/materias",
  },
  {
    title: "Informes",
    icon: FileText,
    url: "/alumnos/reportes",
  },
  {
    title: "Cuenta",
    icon: User,
    url: "/alumnos/cuenta",
  },
  {
    title: "Cierre de sesión",
    icon: LogOut,
    url: "#",
    action: true,
  },
]

export function AppSidebarStudent({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const { toggleSidebar } = useSidebar()
  const isMobile = useIsMobile()
  const [mounted, setMounted] = useState(false)
  const pathname = usePathname()
  const router = useRouter()
  const [studentName, setStudentName] = useState("")

  useEffect(() => {
    setMounted(true)
    // Obtener el nombre de usuario del localStorage
    const storedUsername = localStorage.getItem("username") || ""
    setStudentName(storedUsername)
  }, [])

  const handleLogout = () => {
    // Limpiar el localStorage
    localStorage.removeItem("isAuthenticated")
    localStorage.removeItem("username")
    localStorage.removeItem("userRole")
    // Redirigir a la página de login
    router.push("/login")
  }

  if (!mounted) return null

  return (
    <Sidebar
      {...props}
      collapsible="offcanvas"
      className="border-r border-[#70aad8] transition-all duration-300 ease-in-out"
    >
      <SidebarHeader className="border-b border-[#70aad8]">
        <div className="flex items-center justify-between p-3">
          <div className="flex items-center gap-2">
            <div className="relative w-10 h-10 animate-pulse-slow">
              <Image src="/images/logo.png" alt="SIGAE Logo" fill className="object-contain" />
            </div>
            <div>
              <h1 className="font-bold text-[#0045aa] text-lg">SIGAE</h1>
              <p className="text-xs text-[#0f6fbd]">Softedu</p>
            </div>
          </div>
          <Button
            variant="ghost"
            size="icon"
            onClick={toggleSidebar}
            className="text-[#0045aa] hover:bg-[#70aad8]/20 transition-all duration-300"
            aria-label="Toggle sidebar"
          >
            <PanelRightClose className="h-5 w-5" />
          </Button>
        </div>
      </SidebarHeader>
      <SidebarContent>
        <SidebarMenu className={isMobile ? "" : "stagger-animation"}>
          {menuItems.map((item) => (
            <SidebarMenuItem key={item.title}>
              <SidebarMenuButton
                asChild={!item.action}
                isActive={pathname.startsWith(item.url) && item.url !== "/" ? true : pathname === item.url}
                className="text-[#0045aa] hover:bg-[#70aad8]/20 data-[active=true]:bg-[#70aad8]/30 transition-all duration-200 hover:translate-x-1"
                onClick={item.action ? handleLogout : undefined}
              >
                {item.action ? (
                  <button>
                    <item.icon className="text-[#0f6fbd] transition-transform duration-300 ease-in-out group-hover:scale-110" />
                    <span>{item.title}</span>
                  </button>
                ) : (
                  <a href={item.url}>
                    <item.icon className="text-[#0f6fbd] transition-transform duration-300 ease-in-out group-hover:scale-110" />
                    <span>{item.title}</span>
                  </a>
                )}
              </SidebarMenuButton>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarContent>
      <div className="mt-auto p-4 border-t border-[#70aad8] transition-all duration-300">
        <div className="flex items-center gap-2 hover-scale">
          <div className="w-10 h-10 rounded-full bg-[#0045aa] flex items-center justify-center text-white transition-colors duration-300 hover:bg-[#0f6fbd]">
            <span>
              {studentName
                .split(" ")
                .map((name) => name[0])
                .join("")}
            </span>
          </div>
          <div>
            <p className="text-sm font-medium text-[#0045aa]">{studentName}</p>
          </div>
        </div>
      </div>
      <SidebarRail className="transition-opacity duration-300 hover:opacity-100 opacity-50" />
    </Sidebar>
  )
}
