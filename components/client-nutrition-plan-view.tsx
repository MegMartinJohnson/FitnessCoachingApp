"use client"

import * as React from "react"
import { format } from "date-fns"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { MacroChart } from "./macro-chart"
import { type NutritionPlan, type Meal, type MacroTarget } from "@/types/nutrition"

interface ClientNutritionPlanViewProps {
  plan: NutritionPlan
}

export function ClientNutritionPlanView({ plan }: ClientNutritionPlanViewProps) {
  const totalMacros: MacroTarget = React.useMemo(() => {
    return plan.meals.reduce((acc, meal) => {
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
  }, [plan.meals])

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">{plan.name}</h1>
        <div className="text-sm text-muted-foreground">
          {format(new Date(plan.startDate), "MMMM d, yyyy")} - 
          {plan.endDate ? format(new Date(plan.endDate), "MMMM d, yyyy") : "Ongoing"}
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Daily Targets</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between">
            <MacroChart macros={totalMacros} />
            <div className="grid grid-cols-2 gap-4">
              <div>
                <div className="text-sm font-medium text-muted-foreground">Calories</div>
                <div className="text-2xl font-bold">{totalMacros.calories}</div>
              </div>
              <div>
                <div className="text-sm font-medium text-muted-foreground">Protein</div>
                <div className="text-2xl font-bold">{totalMacros.protein}g</div>
              </div>
              <div>
                <div className="text-sm font-medium text-muted-foreground">Carbs</div>
                <div className="text-2xl font-bold">{totalMacros.carbs}g</div>
              </div>
              <div>
                <div className="text-sm font-medium text-muted-foreground">Fat</div>
                <div className="text-2xl font-bold">{totalMacros.fat}g</div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="space-y-6">
        {plan.meals.map((meal) => (
          <Card key={meal.id}>
            <CardHeader>
              <CardTitle className="flex justify-between">
                <span>{meal.name}</span>
                <span className="text-muted-foreground">{meal.time}</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <table className="w-full">
                <thead>
                  <tr className="text-left text-muted-foreground">
                    <th>Food</th>
                    <th>Amount</th>
                    <th>Calories</th>
                    <th>Protein</th>
                    <th>Carbs</th>
                    <th>Fat</th>
                  </tr>
                </thead>
                <tbody>
                  {meal.foods.map((food) => (
                    <tr key={food.id}>
                      <td>{food.name}</td>
                      <td>{food.amount} {food.unit}</td>
                      <td>{food.calories}</td>
                      <td>{food.protein}g</td>
                      <td>{food.carbs}g</td>
                      <td>{food.fat}g</td>
                    </tr>
                  ))}
                </tbody>
              </table>
              {meal.cookingInstructions && (
                <div className="mt-4">
                  <h4 className="font-medium mb-2">Cooking Instructions:</h4>
                  <p className="text-sm text-muted-foreground">{meal.cookingInstructions}</p>
                </div>
              )}
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}

