import { Metadata } from "next"
import { Button } from "@/components/ui/button"
import NutritionTabs from "@/components/nutrition/nutrition-tabs"
import NutritionPlansTable from "@/components/nutrition/nutrition-plans-table"
import { type NutritionPlan } from "@/types/nutrition"

export const metadata: Metadata = {
  title: "Client Nutrition",
  description: "Manage client nutrition plans and track progress",
}

// This would come from your database
const getMockNutritionPlans = (clientId: string): NutritionPlan[] => {
  return [
    {
      id: "plan1",
      name: "Training Day Diet",
      startDate: "2024-08-15",
      planType: "meal-plan",
      description: "Consume all meals from this plan on training days.",
      status: "active"
    },
    {
      id: "plan2",
      name: "Rest Day Diet",
      startDate: "2024-08-15",
      planType: "macro-plan",
      description: "Follow these macros on rest days.",
      status: "active"
    }
  ]
}

interface NutritionPageProps {
  params: {
    clientId: string
  }
}

export default function NutritionPage({ params }: NutritionPageProps) {
  const plans = getMockNutritionPlans(params.clientId)

  return (
    <div className="space-y-6">
      <NutritionTabs clientId={params.clientId} />
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-lg font-medium">Nutrition Plans</h2>
          <p className="text-sm text-muted-foreground">
            Select a plan to view or edit.
          </p>
        </div>
        <Button>New Plan</Button>
      </div>
      <NutritionPlansTable plans={plans} clientId={params.clientId} />
    </div>
  )
}

