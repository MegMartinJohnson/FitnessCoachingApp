import { Metadata } from "next"

import { columns } from "@/components/clients/columns"
import { DataTable } from "@/components/clients/data-table"
import { InviteClientDialog } from "@/components/clients/invite-client-dialog"

export const metadata: Metadata = {
  title: "Clients",
  description: "Manage your clients and their programs.",
}

// This would come from your database
const clients = [
  {
    id: "728ed52f",
    name: "John Smith",
    email: "john@example.com",
    photo: "/placeholder.svg",
    group: "Weight Loss",
    package: "Premium",
    startDate: "2024-01-01",
    status: "active",
  },
  {
    id: "489e1d42",
    name: "Sarah Johnson",
    email: "sarah@example.com",
    photo: "/placeholder.svg",
    group: "Muscle Gain",
    package: "Basic",
    startDate: "2024-01-15",
    status: "active",
  },
] as const

export default function ClientsPage() {
  return (
    <div className="h-full flex-1 flex-col space-y-8 p-8 md:flex">
      <div className="flex items-center justify-between space-y-2">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Clients</h2>
          <p className="text-muted-foreground">
            Select a client to view or edit their overview and all components of their program.
          </p>
        </div>
        <InviteClientDialog />
      </div>
      <DataTable columns={columns} data={clients} />
    </div>
  )
}

