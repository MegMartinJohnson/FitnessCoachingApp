"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { Activity, ClipboardList, Dumbbell, FileText, Heart, LineChart, PillIcon, ScrollText, Utensils, HeartPulse } from 'lucide-react'

const tabs = [
  {
    title: "Overview",
    href: "",
    icon: Activity,
  },
  {
    title: "Submissions",
    href: "/submissions",
    icon: ClipboardList,
  },
  {
    title: "Training",
    href: "/training",
    icon: Dumbbell,
  },
  {
    title: "Cardio",
    href: "/cardio",
    icon: HeartPulse,
  },
  {
    title: "Nutrition",
    href: "/nutrition",
    icon: Utensils,
  },
  {
    title: "Supplements",
    href: "/supplements",
    icon: PillIcon,
  },
  {
    title: "Habits",
    href: "/habits",
    icon: ScrollText,
  },
  {
    title: "Metrics",
    href: "/metrics",
    icon: LineChart,
  },
  {
    title: "Resources",
    href: "/resources",
    icon: FileText,
  },
]

interface ClientTabsProps {
  clientId: string
}

export function ClientTabs({ clientId }: ClientTabsProps) {
  const pathname = usePathname()
  const baseUrl = `/coach/clients/${clientId}`

  return (
    <div className="border-b">
      <nav className="-mb-px flex space-x-4 overflow-x-auto" aria-label="Tabs">
        {tabs.map((tab) => {
          const href = `${baseUrl}${tab.href}`
          const isActive = pathname === href
          
          return (
            <Link
              key={tab.href}
              href={href}
              className={cn(
                "flex items-center gap-2 whitespace-nowrap border-b-2 px-3 py-2 text-sm font-medium transition-colors hover:text-foreground/80",
                isActive
                  ? "border-primary text-foreground"
                  : "border-transparent text-muted-foreground"
              )}
            >
              <tab.icon className="h-4 w-4" />
              {tab.title}
            </Link>
          )
        })}
      </nav>
    </div>
  )
}

