"use client"

import * as React from "react"
import { Droppable, Draggable } from "@hello-pangea/dnd"
import { Search } from 'lucide-react'
import { Input } from "@/components/ui/input"
import { ScrollArea } from "@/components/ui/scroll-area"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

// Mock food database
const mockFoods = [
  {
    id: "food1",
    name: "Chicken Breast",
    brand: "Generic",
    amount: 100,
    unit: "g",
    calories: 165,
    protein: 31,
    carbs: 0,
    fat: 3.6,
    category: "protein"
  },
  {
    id: "food2",
    name: "Brown Rice",
    brand: "Generic",
    amount: 100,
    unit: "g",
    calories: 111,
    protein: 2.6,
    carbs: 23,
    fat: 0.9,
    category: "carbs"
  },
  // Add more mock foods...
]

export function FoodList() {
  const [searchQuery, setSearchQuery] = React.useState("")
  const [category, setCategory] = React.useState("all")

  const filteredFoods = mockFoods.filter(food => {
    const matchesSearch = food.name.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesCategory = category === "all" || food.category === category
    return matchesSearch && matchesCategory
  })

  return (
    <div className="space-y-4">
      <Select value={category} onValueChange={setCategory}>
        <SelectTrigger>
          <SelectValue placeholder="All Categories" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">All Categories</SelectItem>
          <SelectItem value="protein">Protein</SelectItem>
          <SelectItem value="carbs">Carbs</SelectItem>
          <SelectItem value="fats">Fats</SelectItem>
          <SelectItem value="vegetables">Vegetables</SelectItem>
          <SelectItem value="fruits">Fruits</SelectItem>
          <SelectItem value="drinks">Drinks</SelectItem>
        </SelectContent>
      </Select>

      <div className="relative">
        <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="Search foods..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="pl-8"
        />
      </div>

      <ScrollArea className="h-[calc(100vh-16rem)]">
        <Droppable droppableId="foods" isDropDisabled>
          {(provided) => (
            <div
              ref={provided.innerRef}
              {...provided.droppableProps}
              className="space-y-2"
            >
              {filteredFoods.map((food, index) => (
                <Draggable
                  key={food.id}
                  draggableId={JSON.stringify(food)}
                  index={index}
                >
                  {(provided) => (
                    <div
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                      className="rounded-lg border bg-card p-3"
                    >
                      <div className="space-y-2">
                        <div className="font-medium">{food.name}</div>
                        <div className="text-sm text-muted-foreground">
                          {food.amount}{food.unit} • {food.calories} cal
                        </div>
                        <div className="flex gap-3 text-xs text-muted-foreground">
                          <div>P: {food.protein}g</div>
                          <div>C: {food.carbs}g</div>
                          <div>F: {food.fat}g</div>
                        </div>
                      </div>
                    </div>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </ScrollArea>
    </div>
  )
}

