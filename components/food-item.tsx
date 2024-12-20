"use client"

import { Draggable } from "@hello-pangea/dnd"
import { X } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { type Food } from "@/types/nutrition"

interface FoodItemProps {
  food: Food
  index: number
  onRemove: () => void
  onUpdate: (updatedFood: Food) => void
}

export function FoodItem({ food, index, onRemove, onUpdate }: FoodItemProps) {
  return (
    <Draggable draggableId={food.id} index={index}>
      {(provided) => (
        <div
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          className="flex items-center gap-2 rounded-lg border bg-card p-2"
        >
          <div className="grid flex-1 gap-2 md:grid-cols-[2fr_1fr_repeat(4,_auto)]">
            <Input
              value={food.name}
              className="h-8"
              readOnly
            />
            <div className="flex gap-2">
              <Input
                type="number"
                value={food.amount}
                onChange={(e) => onUpdate({ ...food, amount: Number(e.target.value) })}
                className="h-8"
              />
              <Select defaultValue={food.unit}>
                <SelectTrigger className="h-8 w-[80px]">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="g">g</SelectItem>
                  <SelectItem value="ml">ml</SelectItem>
                  <SelectItem value="oz">oz</SelectItem>
                  <SelectItem value="serving">serving</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="flex h-8 items-center justify-end">
              <span className="text-muted-foreground mr-1">Cal:</span> {food.calories}
            </div>
            <div className="flex h-8 items-center justify-end">
              <span className="text-muted-foreground mr-1">P:</span> {food.protein}g
            </div>
            <div className="flex h-8 items-center justify-end">
              <span className="text-muted-foreground mr-1">C:</span> {food.carbs}g
            </div>
            <div className="flex h-8 items-center justify-end">
              <span className="text-muted-foreground mr-1">F:</span> {food.fat}g
            </div>
          </div>
          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8"
            onClick={onRemove}
          >
            <X className="h-4 w-4" />
            <span className="sr-only">Remove</span>
          </Button>
        </div>
      )}
    </Draggable>
  )
}

