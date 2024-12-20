"use client"

import * as React from "react"
import { Droppable, Draggable } from "@hello-pangea/dnd"
import { Search } from 'lucide-react'
import { Input } from "@/components/ui/input"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Badge } from "@/components/ui/badge"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { type CardioExercise } from "@/types/cardio"

interface CardioExerciseListProps {
  exercises: CardioExercise[]
}

const EQUIPMENT_OPTIONS = [
  { label: "Treadmill", value: "treadmill" },
  { label: "Bike", value: "bike" },
  { label: "Elliptical", value: "elliptical" },
  { label: "Rower", value: "rower" },
  { label: "Stair Master", value: "stairmaster" },
  { label: "Jump Rope", value: "jumprope" },
  { label: "None", value: "none" },
]

const EXERCISE_TYPE_OPTIONS = [
  { label: "Steady State", value: "steady-state" },
  { label: "Interval", value: "interval" },
  { label: "Fartlek", value: "fartlek" },
  { label: "HIIT", value: "hiit" },
  { label: "Tabata", value: "tabata" },
]

const TARGET_OPTIONS = [
  { label: "Low Impact", value: "low-impact" },
  { label: "High Impact", value: "high-impact" },
  { label: "Upper Body", value: "upper-body" },
  { label: "Lower Body", value: "lower-body" },
  { label: "Full Body", value: "full-body" },
]

export default function CardioExerciseList({ exercises }: CardioExerciseListProps) {
  const [filter, setFilter] = React.useState("all")
  const [searchQuery, setSearchQuery] = React.useState("")
  const [selectedEquipment, setSelectedEquipment] = React.useState<string[]>([])
  const [selectedTypes, setSelectedTypes] = React.useState<string[]>([])
  const [selectedTargets, setSelectedTargets] = React.useState<string[]>([])

  const filteredExercises = exercises.filter(exercise => {
    const matchesSearch = searchQuery
      ? exercise.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        exercise.equipment?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        exercise.type.toLowerCase().includes(searchQuery.toLowerCase())
      : true

    const matchesEquipment = selectedEquipment.length === 0 || 
      (exercise.equipment && selectedEquipment.includes(exercise.equipment.toLowerCase()))

    const matchesType = selectedTypes.length === 0 ||
      selectedTypes.includes(exercise.type.toLowerCase())

    const matchesTarget = selectedTargets.length === 0 ||
      (exercise.category && selectedTargets.includes(exercise.category.toLowerCase()))

    return matchesSearch && matchesEquipment && matchesType && matchesTarget
  })

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-2 gap-2">
        <Select value={filter} onValueChange={setFilter}>
          <SelectTrigger>
            <SelectValue placeholder="All Exercises" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Exercises</SelectItem>
            <SelectItem value="custom">Custom Exercises</SelectItem>
            <SelectItem value="favorites">Favorites</SelectItem>
          </SelectContent>
        </Select>
        <Select>
          <SelectTrigger>
            <SelectValue placeholder="Type" />
          </SelectTrigger>
          <SelectContent>
            {EXERCISE_TYPE_OPTIONS.map(option => (
              <SelectItem key={option.value} value={option.value}>
                {option.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <Select>
          <SelectTrigger>
            <SelectValue placeholder="Equipment" />
          </SelectTrigger>
          <SelectContent>
            {EQUIPMENT_OPTIONS.map(option => (
              <SelectItem key={option.value} value={option.value}>
                {option.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <Select>
          <SelectTrigger>
            <SelectValue placeholder="Target" />
          </SelectTrigger>
          <SelectContent>
            {TARGET_OPTIONS.map(option => (
              <SelectItem key={option.value} value={option.value}>
                {option.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="relative">
        <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
        <Input 
          placeholder="Search exercises..." 
          className="pl-8"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

      <ScrollArea className="h-[calc(100vh-16rem)]">
        <Droppable droppableId="exercises" isDropDisabled>
          {(provided) => (
            <div
              {...provided.droppableProps}
              ref={provided.innerRef}
              className="space-y-2"
            >
              {filteredExercises.map((exercise, index) => (
                <Draggable
                  key={exercise.id}
                  draggableId={exercise.id}
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
                        <div className="flex items-start gap-3">
                          <div className="h-10 w-10 rounded-lg bg-muted flex-shrink-0" />
                          <div className="space-y-1 flex-1">
                            <div className="font-medium">{exercise.name}</div>
                            <div className="text-sm text-muted-foreground">
                              {exercise.equipment}
                            </div>
                          </div>
                        </div>
                        <div className="flex flex-wrap gap-1">
                          <Badge variant="secondary" className="capitalize">
                            {exercise.type}
                          </Badge>
                          <Badge variant="secondary" className="capitalize">
                            {exercise.intensity}
                          </Badge>
                          {exercise.category && (
                            <Badge variant="secondary">
                              {exercise.category}
                            </Badge>
                          )}
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

