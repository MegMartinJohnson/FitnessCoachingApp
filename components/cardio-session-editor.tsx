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
import { type CardioSession, type CardioExercise, type CardioSet } from "@/types/cardio"
import React from 'react'
import { nanoid } from 'nanoid'
import { CircuitDialog } from "./circuit-dialog"
import { cn } from "@/lib/utils"

const DEFAULT_FIELDS = ['duration', 'speed', 'incline']
const AVAILABLE_FIELDS = [
  { id: 'type', label: 'Set Type' },
  { id: 'duration', label: 'Duration' },
  { id: 'speed', label: 'Speed' },
  { id: 'incline', label: 'Incline' },
  { id: 'distance', label: 'Distance' },
  { id: 'intensity', label: 'Intensity' },
  { id: 'heartRate', label: 'Heart Rate' },
]

interface CardioSessionEditorProps {
  session: CardioSession
  onUpdate: (session: CardioSession) => void
}

export default function CardioSessionEditor({ session, onUpdate }: CardioSessionEditorProps) {
  const [circuitDialogOpen, setCircuitDialogOpen] = React.useState(false)
  const [selectedExerciseId, setSelectedExerciseId] = React.useState<string | null>(null)

  const handleExerciseUpdate = (exerciseIndex: number, updatedExercise: CardioExercise) => {
    const updatedExercises = [...session.exercises]
    updatedExercises[exerciseIndex] = updatedExercise
    onUpdate({
      ...session,
      exercises: updatedExercises
    })
  }

  const handleAddSet = (exerciseIndex: number) => {
    const exercise = session.exercises[exerciseIndex]
    const newSet: CardioSet = {
      type: "Normal",
      duration: 300,
      speed: 3.0,
      incline: 1
    }
    handleExerciseUpdate(exerciseIndex, {
      ...exercise,
      sets: [...exercise.sets, newSet]
    })
  }

  const handleSetUpdate = (exerciseIndex: number, setIndex: number, field: keyof CardioSet, value: any) => {
    const exercise = session.exercises[exerciseIndex]
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
    const exercise = session.exercises[exerciseIndex]
    handleExerciseUpdate(exerciseIndex, {
      ...exercise,
      notes: note.split('\n').filter(n => n.trim())
    })
  }

  const handleUpdateFields = (exerciseIndex: number, fields: string[]) => {
    const exercise = session.exercises[exerciseIndex]
    handleExerciseUpdate(exerciseIndex, {
      ...exercise,
      fields
    })
  }

  const handleCircuit = (exerciseIndex: number) => {
    setSelectedExerciseId(session.exercises[exerciseIndex].id)
    setCircuitDialogOpen(true)
  }

  const handleCircuitConfirm = (exerciseIds: string[]) => {
    if (exerciseIds.length < 2) return

    const circuitGroupId = nanoid()
    const updatedExercises = session.exercises.map(exercise => {
      if (exerciseIds.includes(exercise.id)) {
        return {
          ...exercise,
          circuitGroup: circuitGroupId
        }
      }
      return exercise
    })

    onUpdate({
      ...session,
      exercises: updatedExercises
    })
  }

  const handleRemoveCircuit = (exerciseId: string) => {
    const exercise = session.exercises.find(e => e.id === exerciseId)
    if (!exercise?.circuitGroup) return

    const updatedExercises = session.exercises.map(e => {
      if (e.circuitGroup === exercise.circuitGroup) {
        const { circuitGroup, ...rest } = e
        return rest
      }
      return e
    })

    onUpdate({
      ...session,
      exercises: updatedExercises
    })
  }

  const handleRemoveExercise = (exerciseIndex: number) => {
    const updatedExercises = session.exercises.filter((_, i) => i !== exerciseIndex)
    onUpdate({
      ...session,
      exercises: updatedExercises
    })
  }

  // Group exercises by circuit
  const groupedExercises = React.useMemo(() => {
    const groups: { [key: string]: CardioExercise[] } = {}
    let standalone: CardioExercise[] = []

    session.exercises.forEach(exercise => {
      if (exercise.circuitGroup) {
        if (!groups[exercise.circuitGroup]) {
          groups[exercise.circuitGroup] = []
        }
        groups[exercise.circuitGroup].push(exercise)
      } else {
        standalone.push(exercise)
      }
    })

    return { groups, standalone }
  }, [session.exercises])

  const renderExercise = (exercise: CardioExercise, exerciseIndex: number, isCircuitMember: boolean = false) => (
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
            isCircuitMember && "border-primary/20"
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
                        const exercise = session.exercises[exerciseIndex]
                        if (exercise.circuitGroup) {
                          handleRemoveCircuit(exercise.id)
                        } else {
                          handleCircuit(exerciseIndex)
                        }
                      }}
                    >
                      {session.exercises[exerciseIndex].circuitGroup ? "Remove Circuit" : "Circuit"}
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
                            type={['duration', 'speed', 'incline', 'distance', 'heartRate'].includes(field) ? 'number' : 'text'}
                            value={set[field as keyof CardioSet] || ''}
                            onChange={(e) => {
                              const value = e.target.type === 'number' ? 
                                parseFloat(e.target.value) : 
                                e.target.value
                              handleSetUpdate(exerciseIndex, setIndex, field as keyof CardioSet, value)
                            }}
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
          value={session.name}
          onChange={(e) => onUpdate({ ...session, name: e.target.value })}
          className="text-lg font-medium"
        />
        <Input
          value={session.description || ""}
          onChange={(e) => onUpdate({ ...session, description: e.target.value })}
          placeholder="Add a description..."
        />
      </div>

      <Droppable droppableId={session.id}>
        {(provided) => (
          <div
            {...provided.droppableProps}
            ref={provided.innerRef}
            className="space-y-4"
          >
            {/* Render circuit groups */}
            {Object.entries(groupedExercises.groups).map(([groupId, exercises]) => (
              <div
                key={groupId}
                className="rounded-xl border-2 border-primary/20 bg-primary/5 p-4 space-y-2"
              >
                <div className="flex items-center gap-2 text-sm font-medium text-primary">
                  <Link2 className="h-4 w-4" />
                  Circuit
                </div>
                {exercises.map((exercise, index) => (
                  <React.Fragment key={exercise.id}>
                    {renderExercise(
                      exercise,
                      session.exercises.findIndex(e => e.id === exercise.id),
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
                session.exercises.findIndex(e => e.id === exercise.id)
              )
            )}

            {provided.placeholder}
            {session.exercises.length === 0 && (
              <div className="rounded-lg border border-dashed p-8 text-center text-muted-foreground">
                Drag and drop exercises here
              </div>
            )}
          </div>
        )}
      </Droppable>

      <CircuitDialog
        open={circuitDialogOpen}
        onOpenChange={setCircuitDialogOpen}
        exercises={session.exercises}
        currentExerciseId={selectedExerciseId || ''}
        onConfirm={handleCircuitConfirm}
      />
    </div>
  )
}

