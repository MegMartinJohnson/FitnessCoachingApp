import * as React from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { ScrollArea } from "@/components/ui/scroll-area"
import { type WorkoutExercise } from "@/types/training"

interface SupersetDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  exercises: WorkoutExercise[]
  currentExerciseId: string
  onConfirm: (exerciseIds: string[]) => void
}

export function SupersetDialog({
  open,
  onOpenChange,
  exercises,
  currentExerciseId,
  onConfirm,
}: SupersetDialogProps) {
  const [selectedExercises, setSelectedExercises] = React.useState<string[]>([])

  React.useEffect(() => {
    if (open) {
      // Find exercises in the same superset group
      const currentExercise = exercises.find(e => e.id === currentExerciseId)
      if (currentExercise?.supersetGroup) {
        setSelectedExercises(
          exercises
            .filter(e => e.supersetGroup === currentExercise.supersetGroup)
            .map(e => e.id)
        )
      } else {
        setSelectedExercises([currentExerciseId])
      }
    }
  }, [open, exercises, currentExerciseId])

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Superset</DialogTitle>
          <DialogDescription>
            Select the exercises to include in the superset.
          </DialogDescription>
        </DialogHeader>
        <ScrollArea className="h-[300px] pr-4">
          <div className="space-y-4">
            {exercises.map((exercise) => (
              <div key={exercise.id} className="flex items-center space-x-2">
                <Checkbox
                  id={exercise.id}
                  checked={selectedExercises.includes(exercise.id)}
                  onCheckedChange={(checked) => {
                    setSelectedExercises(prev =>
                      checked
                        ? [...prev, exercise.id]
                        : prev.filter(id => id !== exercise.id)
                    )
                  }}
                />
                <Label htmlFor={exercise.id}>{exercise.name}</Label>
              </div>
            ))}
          </div>
        </ScrollArea>
        <div className="flex justify-end gap-2">
          <Button
            variant="outline"
            onClick={() => onOpenChange(false)}
          >
            Cancel
          </Button>
          <Button
            onClick={() => {
              onConfirm(selectedExercises)
              onOpenChange(false)
            }}
            disabled={selectedExercises.length < 2}
          >
            OK
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}

