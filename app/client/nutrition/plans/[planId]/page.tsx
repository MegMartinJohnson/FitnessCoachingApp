import { notFound } from "next/navigation"
import { ClientNutritionPlanView } from "@/components/nutrition/client-nutrition-plan-view"
import { type NutritionPlan } from "@/types/nutrition"

// This would come from your database
const getMockPlan = async (planId: string): Promise<NutritionPlan | null> => {
  // Implement your database query here
  // For now, we'll return a mock plan
  const plan: NutritionPlan = {
    id: planId,
    clientId: "client123",
    name: "Training Day Diet",
    startDate: "2024-08-15",
    planType: "meal-plan",
    description: "Consume all meals from this plan on training days.",
    status: "active",
    meals: [
      {
        id: "meal1",
        name: "Breakfast",
        time: "08:00",
        foods: [
          {
            id: "food1",
            name: "Oatmeal",
            amount: 100,
            unit: "g",
            calories: 389,
            protein: 13,
            carbs: 66,
            fat: 7
          },
          {
            id: "food2",
            name: "Banana",
            amount: 1,
            unit: "medium",
            calories: 105,
            protein: 1,
            carbs: 27,
            fat: 0
          }
        ],
        cookingInstructions: "Cook oatmeal with water, add sliced banana on top."
      }
      // Add more meals as needed
    ]
  }
  return plan
}

interface PlanPageProps {
  params: {
    planId: string
  }
}

export default async function ClientNutritionPlanPage({ params }: PlanPageProps) {
  const plan = await getMockPlan(params.planId)

  if (!plan) {
    notFound()
  }

  return <ClientNutritionPlanView plan={plan} />
}

