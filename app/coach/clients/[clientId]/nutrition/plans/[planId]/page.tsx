import { notFound } from "next/navigation"
import { NutritionPlanEditor } from "@/components/nutrition/nutrition-plan-editor"
import { type NutritionPlan } from "@/types/nutrition"

// This would come from your database
const getMockPlan = async (planId: string): Promise<NutritionPlan | null> => {
  const plan: NutritionPlan = {
    id: planId,
    name: "Training Day Diet",
    startDate: "2024-08-15",
    planType: "meal-plan",
    description: "Consume all meals from this plan on training days.",
    status: "active"
  }
  return plan
}

interface PlanPageProps {
  params: {
    clientId: string
    planId: string
  }
}

export default async function PlanPage({ params }: PlanPageProps) {
  const plan = await getMockPlan(params.planId)

  if (!plan) {
    notFound()
  }

  return <NutritionPlanEditor plan={plan} />
}

