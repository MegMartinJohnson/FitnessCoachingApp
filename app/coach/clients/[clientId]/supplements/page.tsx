import { Metadata } from "next"
import { Button } from "@/components/ui/button"
import SupplementTabs from "@/components/supplements/supplement-tabs"
import SupplementsTable from "@/components/supplements/supplements-table"
import { type SupplementPlan } from "@/types/supplement"

export const metadata: Metadata = {
  title: "Client Supplements",
  description: "Manage client supplement plans and track compliance",
}

// This would come from your database
const getMockSupplementPlans = (clientId: string): SupplementPlan[] => {
  return [
    {
      id: "plan1",
      name: "Base Supplement Plan",
      startDate: "2024-08-15",
      description: "Daily supplements",
      status: "active",
      protocols: [
        {
          id: "prot1",
          name: "Morning Stack",
          time: "08:00",
          supplements: [
            {
              id: "supp1",
              name: "Multivitamin",
              form: "capsule",
              dosage: 1,
              unit: "capsule",
              frequency: "daily",
              timing: "morning"
            }
          ]
        }
      ]
    },
    {
      id: "plan2",
      name: "High Performance Plan",
      startDate: "2024-08-15",
      endDate: "2024-10-15",
      description: "Extra supplements for higher volume workouts",
      status: "ended",
      protocols: []
    }
  ]
}

interface SupplementsPageProps {
  params: {
    clientId: string
  }
}

export default function SupplementsPage({ params }: SupplementsPageProps) {
  const plans = getMockSupplementPlans(params.clientId)

  return (
    <div className="space-y-6">
      <SupplementTabs clientId={params.clientId} />
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-lg font-medium">Supplement Plans</h2>
          <p className="text-sm text-muted-foreground">
            Select a plan to view or edit.
          </p>
        </div>
        <Button>New Plan</Button>
      </div>
      <SupplementsTable plans={plans} clientId={params.clientId} />
    </div>
  )
}

