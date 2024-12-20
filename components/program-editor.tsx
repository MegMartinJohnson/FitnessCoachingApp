"use client"

import * as React from "react"
import { DragDropContext } from "@hello-pangea/dnd"
import { nanoid } from 'nanoid'
import { Plus } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import WorkoutEditor from "./workout-editor"
import ExerciseList from "./exercise-list"
import { type TrainingProgram, type Exercise, type WorkoutExercise } from "@/types/training"

interface ProgramEditorProps {
  program: TrainingProgram
  exercises: Exercise[]
}

export default function ProgramEditor({ program: initialProgram, exercises }: ProgramEditorProps) {
  const [program, setProgram] = React.useState(initialProgram)
  const [activeTab, setActiveTab] = React.useState(program.workouts[0]?.id)

  const handleAddWorkout = () => {
    const newWorkout = {
      id: nanoid(),
      name: "New Workout",
      exercises: []
    }
    setProgram(prev => ({
      ...prev,
      workouts: [...prev.workouts, newWorkout]
    }))
    setActiveTab(newWorkout.id)
  }

  const handleDragEnd = (result: any) => {
    if (!result.destination) return

    const { source, destination } = result

    // If dropping into a workout
    if (destination.droppableId !== "exercises") {
      const exercise = exercises.find(ex => ex.id === result.draggableId)
      if (!exercise) return

      // Create a new workout exercise with initialized sets array
      const workoutExercise: WorkoutExercise = {
        id: nanoid(),
        exerciseId: exercise.id,
        name: exercise.name,
        category: exercise.category,
        equipment: exercise.equipment,
        muscleGroups: exercise.muscleGroups,
        sets: [{
          type: "Normal",
          sets: 3,
          reps: "8-12",
          rest: 90
        }],
        notes: []
      }

      setProgram(prev => ({
        ...prev,
        workouts: prev.workouts.map(workout => {
          if (workout.id === destination.droppableId) {
            const updatedExercises = [...workout.exercises]
            updatedExercises.splice(destination.index, 0, workoutExercise)
            return {
              ...workout,
              exercises: updatedExercises
            }
          }
          return workout
        })
      }))
    }
  }

  return (
    <DragDropContext onDragEnd={handleDragEnd}>
      <div className="flex h-[calc(100vh-10rem)] gap-6">
        <div className="flex-1 space-y-6 overflow-auto">
          <div className="space-y-1">
            <Input
              value={program.name}
              onChange={(e) => setProgram(prev => ({ ...prev, name: e.target.value }))}
              className="text-lg font-medium h-auto text-xl px-0 border-0 bg-transparent"
            />
            <Input
              value={program.description || ""}
              onChange={(e) => setProgram(prev => ({ ...prev, description: e.target.value }))}
              className="text-muted-foreground px-0 border-0 bg-transparent"
              placeholder="Add a description..."
            />
          </div>

          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <div className="flex items-center justify-between">
              <TabsList>
                {program.workouts.map((workout) => (
                  <TabsTrigger key={workout.id} value={workout.id}>
                    {workout.name}
                  </TabsTrigger>
                ))}
              </TabsList>
              <Button onClick={handleAddWorkout} size="sm">
                <Plus className="h-4 w-4 mr-2" />
                Add Workout
              </Button>
            </div>

            {program.workouts.map((workout) => (
              <TabsContent key={workout.id} value={workout.id} className="mt-6">
                <WorkoutEditor
                  workout={workout}
                  onUpdate={(updated) => {
                    setProgram(prev => ({
                      ...prev,
                      workouts: prev.workouts.map(w =>
                        w.id === updated.id ? updated : w
                      )
                    }))
                  }}
                />
              </TabsContent>
            ))}
          </Tabs>
        </div>

        <div className="w-[350px] border-l pl-6">
          <div className="sticky top-0">
            <h2 className="font-semibold mb-4">Add Exercise</h2>
            <ExerciseList exercises={exercises} />
          </div>
        </div>
      </div>
    </DragDropContext>
  )
}

