"use client"

import * as React from "react"
import { DragDropContext, Droppable } from "@hello-pangea/dnd"
import { format } from "date-fns"
import { Plus, Info, Save } from 'lucide-react'
import { nanoid } from "nanoid"
import { useRouter } from "next/navigation"
import { toast } from "sonner"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { MacroChart } from "./macro-chart"
import { MealSection } from "./meal-section"
import { FoodList } from "./food-list"
import { type NutritionPlan, type Meal, type Food, type MacroTarget } from "@/types/nutrition"
import { savePlan } from "@/app/actions/nutrition"

interface NutritionPlanEditorProps {
  plan: NutritionPlan
  onSave?: (plan: NutritionPlan) => void
}

export function NutritionPlanEditor({ plan: initialPlan, onSave }: NutritionPlanEditorProps) {
  const [plan, setPlan] = React.useState(initialPlan)
  const [meals, setMeals] = React.useState<Meal[]>(initialPlan.meals || [])
  const [isSaving, setIsSaving] = React.useState(false)
  const router = useRouter()

  const totalMacros: MacroTarget = React.useMemo(() => {
    return meals.reduce((acc, meal) => {
      const mealMacros = meal.foods.reduce((mAcc, food) => ({
        calories: mAcc.calories + food.calories,
        protein: mAcc.protein + food.protein,
        carbs: mAcc.carbs + food.carbs,
        fat: mAcc.fat + food.fat
      }), {
        calories: 0,
        protein: 0,
        carbs: 0,
        fat: 0
      })
      return {
        calories: acc.calories + mealMacros.calories,
        protein: acc.protein + mealMacros.protein,
        carbs: acc.carbs + mealMacros.carbs,
        fat: acc.fat + mealMacros.fat
      }
    }, {
      calories: 0,
      protein: 0,
      carbs: 0,
      fat: 0
    })
  }, [meals])

  const handleAddMeal = () => {
    const newMeal: Meal = {
      id: nanoid(),
      name: `Meal ${meals.length + 1}`,
      time: "12:00",
      foods: []
    }
    setMeals([...meals, newMeal])
  }

  const handleUpdateMeal = (mealId: string, updatedMeal: Meal) => {
    setMeals(meals.map(meal =>
      meal.id === mealId ? updatedMeal : meal
    ))
  }

  const handleDeleteMeal = (mealId: string) => {
    setMeals(meals.filter(meal => meal.id !== mealId))
  }

  const handleDragEnd = (result: any) => {
    if (!result.destination) return

    const { source, destination } = result

    // If dropping into a meal
    if (destination.droppableId !== "foods") {
      const sourceFood = JSON.parse(result.draggableId) as Food
      const targetMealId = destination.droppableId

      setMeals(prevMeals =>
        prevMeals.map(meal => {
          if (meal.id === targetMealId) {
            const updatedFoods = [...meal.foods]
            updatedFoods.splice(destination.index, 0, {
              ...sourceFood,
              id: nanoid()
            })
            return {
              ...meal,
              foods: updatedFoods
            }
          }
          return meal
        })
      )
    }
  }

  const handleSave = async () => {
    setIsSaving(true)
    try {
      const updatedPlan = {
        ...plan,
        meals
      }
      await savePlan(updatedPlan)
      toast.success("Plan saved successfully")
      router.push(`/coach/clients/${plan.clientId}/nutrition`)
    } catch (error) {
      console.error("Error saving plan:", error)
      toast.error("Failed to save plan")
    } finally {
      setIsSaving(false)
    }
  }


  return (
    <DragDropContext onDragEnd={handleDragEnd}>
      <div className="flex h-[calc(100vh-10rem)] gap-6">
        <div className="flex-1 space-y-6 overflow-auto">
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name">Plan Name</Label>
              <Input
                id="name"
                value={plan.name}
                onChange={(e) => setPlan({ ...plan, name: e.target.value })}
                className="text-lg font-medium"
              />
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="startDate">Start Date</Label>
                <Input
                  id="startDate"
                  type="date"
                  value={format(new Date(plan.startDate), "yyyy-MM-dd")}
                  onChange={(e) => setPlan({ ...plan, startDate: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="endDate">End Date</Label>
                <Input
                  id="endDate"
                  type="date"
                  value={plan.endDate ? format(new Date(plan.endDate), "yyyy-MM-dd") : ""}
                  onChange={(e) => setPlan({ ...plan, endDate: e.target.value })}
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                value={plan.description}
                onChange={(e) => setPlan({ ...plan, description: e.target.value })}
                className="min-h-[100px]"
              />
            </div>

            <div className="rounded-lg border bg-card p-6">
              <h3 className="text-lg font-medium mb-4">Daily Targets</h3>
              <div className="grid gap-6 md:grid-cols-[200px_1fr]">
                <MacroChart macros={totalMacros} />
                <div className="grid gap-4 md:grid-cols-4">
                  <div>
                    <Label>Calories</Label>
                    <div className="text-2xl font-bold">{totalMacros.calories}</div>
                  </div>
                  <div>
                    <Label>Protein</Label>
                    <div className="text-2xl font-bold">{totalMacros.protein}g</div>
                  </div>
                  <div>
                    <Label>Carbs</Label>
                    <div className="text-2xl font-bold">{totalMacros.carbs}g</div>
                  </div>
                  <div>
                    <Label>Fat</Label>
                    <div className="text-2xl font-bold">{totalMacros.fat}g</div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-medium">Meals</h3>
              <Button onClick={handleAddMeal} size="sm">
                <Plus className="mr-2 h-4 w-4" />
                Add Meal
              </Button>
            </div>
            <div className="space-y-4">
              {meals.map((meal) => (
                <MealSection
                  key={meal.id}
                  meal={meal}
                  onUpdate={(updatedMeal) => handleUpdateMeal(meal.id, updatedMeal)}
                  onDelete={() => handleDeleteMeal(meal.id)}
                />
              ))}
            </div>
          </div>
        </div>

        <div className="w-[350px] border-l pl-6">
          <div className="sticky top-0">
            <h2 className="font-semibold mb-2">Add Food</h2>
            <p className="text-sm text-muted-foreground mb-4">
              Drag and drop the blocks below into the plan.
            </p>
            <FoodList />
          </div>
        </div>
      </div>

      <div className="fixed bottom-0 right-0 w-[calc(100%-250px)] border-t bg-background p-4">
        <div className="flex justify-end gap-4">
          <Button variant="outline" onClick={() => router.back()}>Cancel</Button>
          <Button onClick={handleSave} disabled={isSaving}>
            {isSaving ? (
              <>Saving...</>
            ) : (
              <>
                <Save className="mr-2 h-4 w-4" />
                Save Plan
              </>
            )}
          </Button>
        </div>
      </div>
    </DragDropContext>
  )
}

