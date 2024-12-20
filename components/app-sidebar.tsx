"use client"

import * as React from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"

import { cn } from "@/lib/utils"
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
} from "@/components/ui/sidebar"
import { clientSections, coachSections, type SidebarSection } from "./sidebar-data"

interface AppSidebarProps extends React.ComponentProps<typeof Sidebar> {
  userType: "coach" | "client"
}

export function AppSidebar({ userType, className, ...props }: AppSidebarProps) {
  const pathname = usePathname()
  const sections = userType === "coach" ? coachSections : clientSections

  return (
    <Sidebar
      className={cn("border-r bg-background", className)}
      {...props}
    >
      <SidebarHeader className="border-b p-4">
        <Link
          href={`/${userType}`}
          className="flex items-center gap-2 font-semibold"
        >
          {userType === "coach" ? "Coach Portal" : "Client Portal"}
        </Link>
      </SidebarHeader>
      <SidebarContent>
        {sections.map((section: SidebarSection) => (
          <SidebarGroup key={section.title}>
            <SidebarGroupLabel>{section.title}</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {section.items.map((item) => (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton
                      asChild
                      isActive={pathname === item.href}
                    >
                      <Link href={item.href}>
                        <item.icon className="h-4 w-4" />
                        <span>{item.title}</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        ))}
      </SidebarContent>
      <SidebarRail />
    </Sidebar>
  )
}

