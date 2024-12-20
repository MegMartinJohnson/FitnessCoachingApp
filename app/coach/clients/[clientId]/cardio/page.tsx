import { Metadata } from "next"
import { Button } from "@/components/ui/button"
import CardioTabs from "@/components/cardio/cardio-tabs"
import CardioTable from "@/components/cardio/cardio-table"
import { type CardioProgram } from "@/types/cardio"

export const metadata: Metadata = {
  title: "Client Cardio",
  description: "Manage client cardio programs",
}

// This would come from your database
const getMockCardioPrograms = (clientId: string): CardioProgram[] => {
  return [
    {
      id: "cardio1",
      name: "Fat Loss HIIT",
      startDate: "2024-08-15",
      description: "High-intensity interval training for maximum fat burn.",
      status: "active"
    },
    {
      id: "cardio2",
      name: "Endurance Builder",
      startDate: "2024-04-01",
      endDate: "2024-08-15",
      description: "Long, steady-state cardio to improve overall endurance.",
      status: "ended"
    }
  ]
}

interface CardioPageProps {
  params: {
    clientId: string
  }
}

export default function CardioPage({ params }: CardioPageProps) {
  const programs = getMockCardioPrograms(params.clientId)

  return (
    <div className="space-y-6">
      <CardioTabs clientId={params.clientId} />
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-lg font-medium">Cardio Programs</h2>
          <p className="text-sm text-muted-foreground">
            Select a program to view or edit.
          </p>
        </div>
        <Button>New Program</Button>
      </div>
      <CardioTable programs={programs} clientId={params.clientId} />
    </div>
  )
}

