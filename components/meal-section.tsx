"use client"

import * as React from "react"
import { Droppable } from "@hello-pangea/dnd"
import { MoreHorizontal, Trash, ChefHat, Shuffle, Clock, X } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { FoodItem } from "./food-item"
import { type Meal } from "@/types/nutrition"
import { type Food } from "@/types/nutrition"
import { CookingInstructionsDialog } from "./cooking-instructions-dialog"

interface MealSectionProps {
  meal: Meal
  onUpdate: (meal: Meal) => void
  onDelete: () => void
}

export function MealSection({ meal, onUpdate, onDelete }: MealSectionProps) {
  const [showCookingInstructions, setShowCookingInstructions] = React.useState(false)

  const handleRemoveFood = (foodId: string) => {
    onUpdate({
      ...meal,
      foods: meal.foods.filter(food => food.id !== foodId)
    })
  }

  const handleFoodUpdate = (foodId: string, updatedFood: Food) => {
    onUpdate({
      ...meal,
      foods: meal.foods.map(food =>
        food.id === foodId ? updatedFood : food
      )
    })
  }

  const handleCookingInstructions = (instructions: string) => {
    onUpdate({
      ...meal,
      cookingInstructions: instructions
    })
  }

  const handleRemoveTiming = () => {
    onUpdate({
      ...meal,
      time: undefined
    })
  }

  const totalMacros = meal.foods.reduce((acc, food) => ({
    calories: acc.calories + food.calories,
    protein: acc.protein + food.protein,
    carbs: acc.carbs + food.carbs,
    fat: acc.fat + food.fat
  }), {
    calories: 0,
    protein: 0,
    carbs: 0,
    fat: 0
  })

  return (
    <Card>
      <CardHeader className="flex flex-row items-center space-y-0 pb-2">
        <CardTitle className="flex-1">
          <Input
            value={meal.name}
            onChange={(e) => onUpdate({ ...meal, name: e.target.value })}
            className="max-w-[200px] font-medium"
          />
        </CardTitle>
        <div className="flex items-center gap-2">
          {meal.time ? (
            <div className="flex items-center gap-2">
              <Input
                type="time"
                value={meal.time}
                onChange={(e) => onUpdate({ ...meal, time: e.target.value })}
                className="w-[120px]"
              />
              <Button
                variant="ghost"
                size="icon"
                onClick={handleRemoveTiming}
                title="Remove timing"
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
          ) : (
            <Button
              variant="outline"
              size="sm"
              onClick={() => onUpdate({ ...meal, time: "12:00" })}
            >
              <Clock className="mr-2 h-4 w-4" />
              Add Time
            </Button>
          )}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon">
                <MoreHorizontal className="h-4 w-4" />
                <span className="sr-only">More options</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={() => setShowCookingInstructions(true)}>
                <ChefHat className="mr-2 h-4 w-4" />
                Cooking Instructions
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => {/* TODO: Implement alternative meal */}}>
                <Shuffle className="mr-2 h-4 w-4" />
                Alternative Meal
              </DropdownMenuItem>
              <DropdownMenuItem className="text-destructive" onClick={onDelete}>
                <Trash className="mr-2 h-4 w-4" />
                Delete Meal
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </CardHeader>
      <CardContent>
        <Droppable droppableId={meal.id}>
          {(provided) => (
            <div
              ref={provided.innerRef}
              {...provided.droppableProps}
              className="space-y-2"
            >
              {meal.foods.map((food, index) => (
                <FoodItem
                  key={food.id}
                  food={food}
                  index={index}
                  onRemove={() => handleRemoveFood(food.id)}
                  onUpdate={(updatedFood) => handleFoodUpdate(food.id, updatedFood)}
                />
              ))}
              {provided.placeholder}
              {meal.foods.length === 0 && (
                <div className="rounded-lg border border-dashed p-4 text-center text-sm text-muted-foreground">
                  Drag and drop foods here
                </div>
              )}
            </div>
          )}
        </Droppable>
        {meal.foods.length > 0 && (
          <div className="mt-4 flex items-center justify-between border-t pt-4 text-sm">
            <div>Total</div>
            <div className="flex gap-4">
              <div>{totalMacros.calories} cal</div>
              <div>{totalMacros.protein}g protein</div>
              <div>{totalMacros.carbs}g carbs</div>
              <div>{totalMacros.fat}g fat</div>
            </div>
          </div>
        )}
      </CardContent>
      <CookingInstructionsDialog
        open={showCookingInstructions}
        onOpenChange={setShowCookingInstructions}
        instructions={meal.cookingInstructions || ""}
        onSave={handleCookingInstructions}
      />
    </Card>
  )
}

