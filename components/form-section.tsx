"use client"

import { Trash2 } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { FormQuestion } from "./form-question"
import { AddQuestionDialog } from "./add-question-dialog"
import { type FormSection as FormSectionType, type Question } from "@/types/form-builder"

interface FormSectionProps {
  section: FormSectionType
  onUpdate: (section: FormSectionType) => void
  onDelete: () => void
  onAddQuestion: (question: Question) => void
}

export function FormSection({ section, onUpdate, onDelete, onAddQuestion }: FormSectionProps) {
  return (
    <Card className="mb-4">
      <CardHeader className="flex flex-row items-start gap-4 space-y-0">
        <div className="flex-1 space-y-2">
          <Input
            value={section.title}
            onChange={(e) => onUpdate({ ...section, title: e.target.value })}
            placeholder="Section Title"
            className="text-lg font-medium"
          />
          <Textarea
            value={section.description}
            onChange={(e) => onUpdate({ ...section, description: e.target.value })}
            placeholder="Section Description"
            className="resize-none"
          />
        </div>
        <Button
          variant="ghost"
          size="icon"
          className="h-8 w-8"
          onClick={onDelete}
        >
          <Trash2 className="h-4 w-4" />
          <span className="sr-only">Delete section</span>
        </Button>
      </CardHeader>
      <CardContent>
        {section.questions.map((question, index) => (
          <FormQuestion
            key={question.id}
            question={question}
            onUpdate={(updatedQuestion) => {
              const newQuestions = [...section.questions]
              newQuestions[index] = updatedQuestion
              onUpdate({ ...section, questions: newQuestions })
            }}
            onDelete={() => {
              const newQuestions = section.questions.filter((_, i) => i !== index)
              onUpdate({ ...section, questions: newQuestions })
            }}
          />
        ))}
        {section.questions.length === 0 && (
          <div className="text-center text-sm text-muted-foreground py-4">
            No questions added yet.
          </div>
        )}
        <AddQuestionDialog onAddQuestion={onAddQuestion} />
      </CardContent>
    </Card>
  )
}

