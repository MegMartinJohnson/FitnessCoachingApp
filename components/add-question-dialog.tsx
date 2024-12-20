"use client"

import * as React from "react"
import { nanoid } from 'nanoid'
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { type Question, type QuestionType } from "@/types/form-builder"

interface AddQuestionDialogProps {
  onAddQuestion: (question: Question) => void
}

export function AddQuestionDialog({ onAddQuestion }: AddQuestionDialogProps) {
  const [open, setOpen] = React.useState(false)
  const [questionType, setQuestionType] = React.useState<QuestionType>("text")
  const [questionText, setQuestionText] = React.useState("")

  const handleAddQuestion = () => {
    const newQuestion: Question = {
      id: nanoid(),
      type: questionType,
      question: questionText,
      required: false,
    }
    onAddQuestion(newQuestion)
    setOpen(false)
    setQuestionType("text")
    setQuestionText("")
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" className="w-full">Add Question</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Add New Question</DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="question-type" className="text-right">
              Type
            </Label>
            <Select
              value={questionType}
              onValueChange={(value: QuestionType) => setQuestionType(value)}
            >
              <SelectTrigger className="col-span-3">
                <SelectValue placeholder="Select question type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="text">Text</SelectItem>
                <SelectItem value="number">Number</SelectItem>
                <SelectItem value="rating">Rating</SelectItem>
                <SelectItem value="multiple">Multiple Choice</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="question-text" className="text-right">
              Question
            </Label>
            <Input
              id="question-text"
              value={questionText}
              onChange={(e) => setQuestionText(e.target.value)}
              className="col-span-3"
            />
          </div>
        </div>
        <Button onClick={handleAddQuestion} disabled={!questionText.trim()}>
          Add Question
        </Button>
      </DialogContent>
    </Dialog>
  )
}

