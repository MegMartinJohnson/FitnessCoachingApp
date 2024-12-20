"use client"

import * as React from "react"
import { DragDropContext } from "@hello-pangea/dnd"
import { nanoid } from 'nanoid'
import { Plus } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import CardioSessionEditor from "./cardio-session-editor"
import CardioExerciseList from "./cardio-exercise-list"
import { type CardioProgram, type CardioExercise, type CardioSession } from "@/types/cardio"

interface CardioEditorProps {
  program: CardioProgram
  exercises: CardioExercise[]
}

export default function CardioEditor({ program: initialProgram, exercises }: CardioEditorProps) {
  const [program, setProgram] = React.useState(initialProgram)
  const [activeTab, setActiveTab] = React.useState(program.sessions[0]?.id)

  const handleAddSession = () => {
    const newSession: CardioSession = {
      id: nanoid(),
      name: "New Session",
      exercises: []
    }
    setProgram(prev => ({
      ...prev,
      sessions: [...prev.sessions, newSession]
    }))
    setActiveTab(newSession.id)
  }

  const handleDragEnd = (result: any) => {
    if (!result.destination) return

    const { source, destination } = result

    // If dropping into a session
    if (destination.droppableId !== "exercises") {
      const exercise = exercises.find(ex => ex.id === result.draggableId)
      if (!exercise) return

      // Create a new cardio exercise with initialized sets array
      const cardioExercise = {
        id: nanoid(),
        exerciseId: exercise.id,
        name: exercise.name,
        type: exercise.type,
        duration: exercise.duration,
        intensity: exercise.intensity,
        equipment: exercise.equipment,
        category: exercise.category,
        sets: [{
          type: "Normal",
          duration: 300,
          speed: 3.0,
          incline: 1
        }],
        notes: []
      }

      setProgram(prev => ({
        ...prev,
        sessions: prev.sessions.map(session => {
          if (session.id === destination.droppableId) {
            const updatedExercises = [...session.exercises]
            updatedExercises.splice(destination.index, 0, cardioExercise)
            return {
              ...session,
              exercises: updatedExercises
            }
          }
          return session
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
                {program.sessions.map((session) => (
                  <TabsTrigger key={session.id} value={session.id}>
                    {session.name}
                  </TabsTrigger>
                ))}
              </TabsList>
              <Button onClick={handleAddSession} size="sm">
                <Plus className="h-4 w-4 mr-2" />
                Add Session
              </Button>
            </div>

            {program.sessions.map((session) => (
              <TabsContent key={session.id} value={session.id} className="mt-6">
                <CardioSessionEditor
                  session={session}
                  onUpdate={(updated) => {
                    setProgram(prev => ({
                      ...prev,
                      sessions: prev.sessions.map(s =>
                        s.id === updated.id ? updated : s
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
            <h2 className="font-semibold mb-2">Add an Exercise</h2>
            <p className="text-sm text-muted-foreground mb-4">Drag and drop an exercise into the workout.</p>
            <CardioExerciseList exercises={exercises} />
          </div>
        </div>
      </div>
    </DragDropContext>
  )
}

