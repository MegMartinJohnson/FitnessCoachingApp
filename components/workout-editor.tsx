"use client"

import { Droppable, Draggable } from "@hello-pangea/dnd"
import { Info, Plus, MoreHorizontal, Link2 } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from "@/components/ui/dialog"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Textarea } from "@/components/ui/textarea"
import { type Workout, type WorkoutExercise, type ExerciseSet } from "@/types/training"
import React from 'react'
import { nanoid } from 'nanoid'
import { SupersetDialog } from "./superset-dialog"
import { cn } from "@/lib/utils"

const DEFAULT_FIELDS = ['type', 'sets', 'reps', 'rest', 'tempo']
const AVAILABLE_FIELDS = [
  { id: 'type', label: 'Set Type' },
  { id: 'sets', label: 'Sets' },
  { id: 'reps', label: 'Reps' },
  { id: 'rest', label: 'Rest' },
  { id: 'tempo', label: 'Tempo' },
  { id: 'weight', label: 'Weight' },
  { id: 'rpe', label: 'RPE' },
  { id: 'rir', label: 'RIR' },
]

interface WorkoutEditorProps {
  workout: Workout
  onUpdate: (workout: Workout) => void
}

export default function WorkoutEditor({ workout, onUpdate }: WorkoutEditorProps) {
  const [supersetDialogOpen, setSupersetDialogOpen] = React.useState(false)
  const [selectedExerciseId, setSelectedExerciseId] = React.useState<string | null>(null)

  const handleExerciseUpdate = (exerciseIndex: number, updatedExercise: WorkoutExercise) => {
    const updatedExercises = [...workout.exercises]
    updatedExercises[exerciseIndex] = updatedExercise
    onUpdate({
      ...workout,
      exercises: updatedExercises
    })
  }

  const handleAddSet = (exerciseIndex: number) => {
    const exercise = workout.exercises[exerciseIndex]
    const newSet: ExerciseSet = {
      type: "Normal",
      sets: 3,
      reps: "8-12",
      rest: 90
    }
    handleExerciseUpdate(exerciseIndex, {
      ...exercise,
      sets: [...exercise.sets, newSet]
    })
  }

  const handleSetUpdate = (exerciseIndex: number, setIndex: number, field: keyof ExerciseSet, value: any) => {
    const exercise = workout.exercises[exerciseIndex]
    const updatedSets = [...exercise.sets]
    updatedSets[setIndex] = {
      ...updatedSets[setIndex],
      [field]: value
    }
    handleExerciseUpdate(exerciseIndex, {
      ...exercise,
      sets: updatedSets
    })
  }

  const handleAddNote = (exerciseIndex: number, note: string) => {
    const exercise = workout.exercises[exerciseIndex]
    handleExerciseUpdate(exerciseIndex, {
      ...exercise,
      notes: note.split('\n').filter(n => n.trim())
    })
  }

  const handleUpdateFields = (exerciseIndex: number, fields: string[]) => {
    const exercise = workout.exercises[exerciseIndex]
    handleExerciseUpdate(exerciseIndex, {
      ...exercise,
      fields
    })
  }

  const handleSuperset = (exerciseIndex: number) => {
    setSelectedExerciseId(workout.exercises[exerciseIndex].id)
    setSupersetDialogOpen(true)
  }

  const handleSupersetConfirm = (exerciseIds: string[]) => {
    if (exerciseIds.length < 2) return

    const supersetGroupId = nanoid()
    const updatedExercises = workout.exercises.map(exercise => {
      if (exerciseIds.includes(exercise.id)) {
        return {
          ...exercise,
          supersetGroup: supersetGroupId
        }
      }
      return exercise
    })

    onUpdate({
      ...workout,
      exercises: updatedExercises
    })
  }

  const handleRemoveSuperset = (exerciseId: string) => {
    const exercise = workout.exercises.find(e => e.id === exerciseId)
    if (!exercise?.supersetGroup) return

    const updatedExercises = workout.exercises.map(e => {
      if (e.supersetGroup === exercise.supersetGroup) {
        const { supersetGroup, ...rest } = e
        return rest
      }
      return e
    })

    onUpdate({
      ...workout,
      exercises: updatedExercises
    })
  }

  const handleRemoveExercise = (exerciseIndex: number) => {
    const updatedExercises = workout.exercises.filter((_, i) => i !== exerciseIndex)
    onUpdate({
      ...workout,
      exercises: updatedExercises
    })
  }

  // Helper function to get superset label
  const getSupersetLabel = (exerciseId: string) => {
    const exercise = workout.exercises.find(e => e.id === exerciseId)
    if (!exercise?.supersetGroup) return null

    const supersetExercises = workout.exercises.filter(
      e => e.supersetGroup === exercise.supersetGroup
    )
    const index = supersetExercises.findIndex(e => e.id === exerciseId)
    
    if (index === 0) {
      return "G9 Superset"
    }
    return null
  }

  // Group exercises by superset
  const groupedExercises = React.useMemo(() => {
    const groups: { [key: string]: WorkoutExercise[] } = {}
    let standalone: WorkoutExercise[] = []

    workout.exercises.forEach(exercise => {
      if (exercise.supersetGroup) {
        if (!groups[exercise.supersetGroup]) {
          groups[exercise.supersetGroup] = []
        }
        groups[exercise.supersetGroup].push(exercise)
      } else {
        standalone.push(exercise)
      }
    })

    return { groups, standalone }
  }, [workout.exercises])

  const renderExercise = (exercise: WorkoutExercise, exerciseIndex: number, isSupersetMember: boolean = false) => (
    <Draggable
      key={exercise.id}
      draggableId={exercise.id}
      index={exerciseIndex}
    >
      {(provided) => (
        <div
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          className={cn(
            "rounded-lg border bg-card",
            isSupersetMember && "border-primary/20"
          )}
        >
          <div className="border-b p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="h-10 w-10 rounded-lg bg-muted" />
                <div>
                  <div className="font-medium">{exercise.name}</div>
                  <div className="text-sm text-muted-foreground">
                    {exercise.equipment}
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Dialog>
                  <DialogTrigger asChild>
                    <Button variant="ghost" size="icon">
                      <Info className="h-4 w-4" />
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Notes</DialogTitle>
                      <DialogDescription>
                        Enter notes you'd like included in the plan for this exercise.
                      </DialogDescription>
                    </DialogHeader>
                    <form
                      onSubmit={(e) => {
                        e.preventDefault()
                        const form = e.target as HTMLFormElement
                        const note = (form.elements.namedItem('note') as HTMLTextAreaElement).value
                        handleAddNote(exerciseIndex, note)
                        form.reset()
                      }}
                    >
                      <div className="space-y-4 py-4">
                        <div className="space-y-2">
                          <Label htmlFor="note">Notes:</Label>
                          <Textarea
                            id="note"
                            name="note"
                            placeholder="Enter notes..."
                            defaultValue={exercise.notes?.join('\n')}
                            className="min-h-[100px]"
                          />
                        </div>
                      </div>
                      <Button type="submit">Save</Button>
                    </form>
                  </DialogContent>
                </Dialog>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => handleAddSet(exerciseIndex)}
                >
                  <Plus className="h-4 w-4" />
                </Button>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon">
                      <MoreHorizontal className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <Dialog>
                      <DialogTrigger asChild>
                        <DropdownMenuItem onSelect={(e) => e.preventDefault()}>
                          Edit Fields
                        </DropdownMenuItem>
                      </DialogTrigger>
                      <DialogContent>
                        <DialogHeader>
                          <DialogTitle>Fields</DialogTitle>
                          <DialogDescription>
                            Select the fields that you'd like to appear for this exercise.
                          </DialogDescription>
                        </DialogHeader>
                        <ScrollArea className="h-[300px] pr-4">
                          <div className="space-y-4">
                            {AVAILABLE_FIELDS.map((field) => (
                              <div key={field.id} className="flex items-center space-x-2">
                                <Checkbox
                                  id={field.id}
                                  checked={(exercise.fields || DEFAULT_FIELDS).includes(field.id)}
                                  onCheckedChange={(checked) => {
                                    const currentFields = exercise.fields || DEFAULT_FIELDS
                                    const newFields = checked
                                      ? [...currentFields, field.id]
                                      : currentFields.filter(f => f !== field.id)
                                    handleUpdateFields(exerciseIndex, newFields)
                                  }}
                                />
                                <Label htmlFor={field.id}>{field.label}</Label>
                              </div>
                            ))}
                          </div>
                        </ScrollArea>
                        <DialogFooter className="flex justify-between">
                          <Button
                            variant="outline"
                            onClick={() => handleUpdateFields(exerciseIndex, DEFAULT_FIELDS)}
                          >
                            Reset to Default
                          </Button>
                          <Button type="button" onClick={(e) => (e.target as HTMLButtonElement).closest('dialog')?.close()}>
                            Save
                          </Button>
                        </DialogFooter>
                      </DialogContent>
                    </Dialog>
                    <DropdownMenuItem>Edit Exercise</DropdownMenuItem>
                    <DropdownMenuItem
                      onClick={() => {
                        const exercise = workout.exercises[exerciseIndex]
                        if (exercise.supersetGroup) {
                          handleRemoveSuperset(exercise.id)
                        } else {
                          handleSuperset(exerciseIndex)
                        }
                      }}
                    >
                      {workout.exercises[exerciseIndex].supersetGroup ? "Remove Superset" : "Superset"}
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem
                      className="text-destructive"
                      onClick={() => handleRemoveExercise(exerciseIndex)}
                    >
                      Delete
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </div>
          </div>
          <div className="p-4">
            <div className="mb-4">
              <table className="w-full">
                <thead>
                  <tr>
                    {(exercise.fields || DEFAULT_FIELDS).map((field) => (
                      <th key={field} className="text-left">
                        {AVAILABLE_FIELDS.find(f => f.id === field)?.label}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {exercise.sets.map((set, setIndex) => (
                    <tr key={setIndex} className="border-b last:border-0">
                      {(exercise.fields || DEFAULT_FIELDS).map((field) => (
                        <td key={field} className="py-2 pr-4">
                          <Input
                            type={['sets', 'rest', 'weight', 'rpe', 'rir'].includes(field) ? 'number' : 'text'}
                            value={set[field as keyof ExerciseSet] || ''}
                            onChange={(e) => {
                              const value = e.target.type === 'number' ? 
                                parseFloat(e.target.value) : 
                                e.target.value
                              handleSetUpdate(exerciseIndex, setIndex, field as keyof ExerciseSet, value)
                            }}
                            placeholder={field === 'tempo' ? '0-0-0-0' : undefined}
                          />
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            {exercise.notes && exercise.notes.length > 0 && (
              <div className="space-y-2">
                <Label>Notes</Label>
                <div className="space-y-1">
                  {exercise.notes.map((note, index) => (
                    <div key={index} className="text-sm text-muted-foreground">
                      {note}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </Draggable>
  )

  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <Input
          value={workout.name}
          onChange={(e) => onUpdate({ ...workout, name: e.target.value })}
          className="text-lg font-medium"
        />
        <Input
          value={workout.description || ""}
          onChange={(e) => onUpdate({ ...workout, description: e.target.value })}
          placeholder="Add a description..."
        />
      </div>

      <Droppable droppableId={workout.id}>
        {(provided) => (
          <div
            {...provided.droppableProps}
            ref={provided.innerRef}
            className="space-y-4"
          >
            {/* Render superset groups */}
            {Object.entries(groupedExercises.groups).map(([groupId, exercises]) => (
              <div
                key={groupId}
                className="rounded-xl border-2 border-primary/20 bg-primary/5 p-4 space-y-2"
              >
                <div className="flex items-center gap-2 text-sm font-medium text-primary">
                  <Link2 className="h-4 w-4" />
                  Superset
                </div>
                {exercises.map((exercise, index) => (
                  <React.Fragment key={exercise.id}>
                    {renderExercise(
                      exercise,
                      workout.exercises.findIndex(e => e.id === exercise.id),
                      true
                    )}
                    {index < exercises.length - 1 && (
                      <div className="flex items-center gap-2 justify-center">
                        <div className="h-2 w-px bg-border" />
                      </div>
                    )}
                  </React.Fragment>
                ))}
              </div>
            ))}

            {/* Render standalone exercises */}
            {groupedExercises.standalone.map((exercise, index) => 
              renderExercise(
                exercise,
                workout.exercises.findIndex(e => e.id === exercise.id)
              )
            )}

            {provided.placeholder}
            {workout.exercises.length === 0 && (
              <div className="rounded-lg border border-dashed p-8 text-center text-muted-foreground">
                Drag and drop exercises here
              </div>
            )}
          </div>
        )}
      </Droppable>

      <SupersetDialog
        open={supersetDialogOpen}
        onOpenChange={setSupersetDialogOpen}
        exercises={workout.exercises}
        currentExerciseId={selectedExerciseId || ''}
        onConfirm={handleSupersetConfirm}
      />
    </div>
  )
}

