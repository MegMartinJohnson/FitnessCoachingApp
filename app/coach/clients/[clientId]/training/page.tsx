import { Metadata } from "next"
import { Button } from "@/components/ui/button"
import TrainingTabs from "@/components/training/training-tabs"
import TrainingProgramsTable from "@/components/training/training-programs-table"
import { type TrainingProgram } from "@/types/training"

export const metadata: Metadata = {
  title: "Client Training",
  description: "Manage client training programs",
}

// This would come from your database
const getMockPrograms = (clientId: string): TrainingProgram[] => {
  return [
    {
      id: "prog1",
      name: "Muscle Growth Phase",
      startDate: "2024-08-15",
      description: "Focus on leg growth, higher volume to add muscle density.",
      status: "active"
    },
    {
      id: "prog2",
      name: "Home Gym",
      startDate: "2024-04-01",
      endDate: "2024-08-15",
      description: "Only home gym available",
      status: "ended"
    }
  ]
}

interface TrainingPageProps {
  params: {
    clientId: string
  }
}

export default function TrainingPage({ params }: TrainingPageProps) {
  const programs = getMockPrograms(params.clientId)

  return (
    <div className="space-y-6">
      <TrainingTabs clientId={params.clientId} />
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-lg font-medium">Training Programs</h2>
          <p className="text-sm text-muted-foreground">
            Select a program to view or edit.
          </p>
        </div>
        <Button>New Program</Button>
      </div>
      <TrainingProgramsTable programs={programs} clientId={params.clientId} />
    </div>
  )
}

