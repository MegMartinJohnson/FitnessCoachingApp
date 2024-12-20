"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"

const tabs = [
  {
    name: "Programs",
    href: "",
  },
  {
    name: "Logs",
    href: "/logs",
  },
  {
    name: "Progress",
    href: "/progress",
  },
]

interface TrainingTabsProps {
  clientId: string
}

export default function TrainingTabs({ clientId }: TrainingTabsProps) {
  const pathname = usePathname()
  const baseUrl = `/coach/clients/${clientId}/training`

  return (
    <div className="border-b">
      <nav className="-mb-px flex gap-4" aria-label="Tabs">
        {tabs.map((tab) => {
          const href = `${baseUrl}${tab.href}`
          const isActive = pathname === href
          
          return (
            <Link
              key={tab.name}
              href={href}
              className={cn(
                "px-3 py-2 text-sm font-medium transition-colors hover:text-foreground/80",
                isActive
                  ? "border-b-2 border-primary text-foreground"
                  : "text-muted-foreground"
              )}
            >
              {tab.name}
            </Link>
          )
        })}
      </nav>
    </div>
  )
}
