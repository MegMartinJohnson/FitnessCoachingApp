"use client"

import { Trash2 } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { type Question } from "@/types/form-builder"

interface FormQuestionProps {
  question: Question
  onUpdate: (question: Question) => void
  onDelete: () => void
}

export function FormQuestion({ question, onUpdate, onDelete }: FormQuestionProps) {
  return (
    <Card className="mb-4">
      <CardHeader className="flex flex-row items-start gap-4 space-y-0">
        <div className="flex-1">
          <Input
            value={question.question}
            onChange={(e) => onUpdate({ ...question, question: e.target.value })}
            placeholder="Question text"
          />
        </div>
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <Switch
              id={`required-${question.id}`}
              checked={question.required}
              onCheckedChange={(checked) => 
                onUpdate({ ...question, required: checked })
              }
            />
            <Label htmlFor={`required-${question.id}`}>Required</Label>
          </div>
          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8"
            onClick={onDelete}
          >
            <Trash2 className="h-4 w-4" />
            <span className="sr-only">Delete question</span>
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        {/* Additional fields based on question type */}
        {question.type === 'number' && (
          <div className="flex gap-4">
            <div className="flex-1">
              <Label>Minimum</Label>
              <Input
                type="number"
                value={(question as any).min ?? ''}
                onChange={(e) => 
                  onUpdate({ 
                    ...question, 
                    min: e.target.value ? Number(e.target.value) : undefined 
                  } as any)
                }
                placeholder="Min value"
              />
            </div>
            <div className="flex-1">
              <Label>Maximum</Label>
              <Input
                type="number"
                value={(question as any).max ?? ''}
                onChange={(e) => 
                  onUpdate({ 
                    ...question, 
                    max: e.target.value ? Number(e.target.value) : undefined 
                  } as any)
                }
                placeholder="Max value"
              />
            </div>
          </div>
        )}
        {question.type === 'rating' && (
          <div className="w-1/2">
            <Label>Maximum Rating</Label>
            <Input
              type="number"
              min={1}
              value={(question as any).maxRating ?? 5}
              onChange={(e) => 
                onUpdate({ 
                  ...question, 
                  maxRating: Number(e.target.value) 
                } as any)
              }
              placeholder="Max rating"
            />
          </div>
        )}
        {question.type === 'multiple' && (
          <div className="space-y-2">
            <Label>Options</Label>
            {(question as any).options?.map((option: string, index: number) => (
              <div key={index} className="flex gap-2">
                <Input
                  value={option}
                  onChange={(e) => {
                    const newOptions = [...(question as any).options]
                    newOptions[index] = e.target.value
                    onUpdate({ ...question, options: newOptions } as any)
                  }}
                  placeholder={`Option ${index + 1}`}
                />
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => {
                    const newOptions = (question as any).options.filter((_: string, i: number) => i !== index)
                    onUpdate({ ...question, options: newOptions } as any)
                  }}
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            ))}
            <Button
              variant="outline"
              onClick={() => {
                onUpdate({
                  ...question,
                  options: [...((question as any).options || []), '']
                } as any)
              }}
            >
              Add Option
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  )
}

