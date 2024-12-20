"use server"

import { revalidatePath } from "next/cache"
import { type NutritionPlan } from "@/types/nutrition"

export async function savePlan(plan: NutritionPlan) {
  try {
    // In a real application, you would save the plan to your database here
    console.log("Saving plan:", plan)

    // Revalidate the nutrition plans list and detail pages
    revalidatePath(`/coach/clients/${plan.clientId}/nutrition`)
    revalidatePath(`/coach/clients/${plan.clientId}/nutrition/plans/${plan.id}`)

    return { success: true }
  } catch (error) {
    console.error("Error saving plan:", error)
    return { success: false, error: "Failed to save plan" }
  }
}

