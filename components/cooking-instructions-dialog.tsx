"use client"

import * as React from "react"
import { X } from 'lucide-react'
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Textarea } from "@/components/ui/textarea"

interface CookingInstructionsDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  instructions: string
  onSave: (instructions: string) => void
}

export function CookingInstructionsDialog({
  open,
  onOpenChange,
  instructions,
  onSave,
}: CookingInstructionsDialogProps) {
  const [value, setValue] = React.useState(instructions)

  React.useEffect(() => {
    setValue(instructions)
  }, [instructions])

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>Cooking Instructions</DialogTitle>
          <Button
            variant="ghost"
            size="icon"
            className="absolute right-4 top-4"
            onClick={() => onOpenChange(false)}
          >
            <X className="h-4 w-4" />
            <span className="sr-only">Close</span>
          </Button>
        </DialogHeader>
        <p className="text-sm text-muted-foreground">
          Enter any specific notes about the preparation of this meal.
        </p>
        <div className="space-y-2">
          <div className="font-medium">Instructions:</div>
          <Textarea
            placeholder="Notes"
            value={value}
            onChange={(e) => setValue(e.target.value)}
            className="min-h-[150px]"
          />
        </div>
        <div className="flex justify-end">
          <Button
            className="w-full"
            onClick={() => {
              onSave(value)
              onOpenChange(false)
            }}
          >
            Save
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}

