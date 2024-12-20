"use client"

import * as React from "react"
import { MessageSquare } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Textarea } from "@/components/ui/textarea"
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible"
import { type QuestionResponse as QuestionResponseType } from "@/types/submission"

interface QuestionResponseProps {
  question: QuestionResponseType
  feedback: string
  onFeedbackChange: (feedback: string) => void
  isReviewed?: boolean
}

export function QuestionResponse({ 
  question, 
  feedback,
  onFeedbackChange,
  isReviewed 
}: QuestionResponseProps) {
  const [isOpen, setIsOpen] = React.useState(false)

  const handleFeedbackChange = (value: string) => {
    if (!isReviewed) {
      onFeedbackChange(value)
    }
  }

  return (
    <Collapsible 
      open={isOpen || (isReviewed && feedback)} 
      onOpenChange={setIsOpen}
    >
      <div className="space-y-2">
        <div className="flex items-start justify-between gap-4">
          <div className="flex-1 space-y-1">
            <Label>{question.question}</Label>
            {question.type === "text" && (
              <Textarea
                value={question.response as string}
                className="bg-muted"
                readOnly
              />
            )}
            {question.type === "number" && (
              <Input
                type="number"
                value={question.response as number}
                className="bg-muted max-w-[200px]"
                readOnly
              />
            )}
            {question.type === "rating" && (
              <Input
                type="number"
                value={question.response as number}
                className="bg-muted max-w-[200px]"
                readOnly
              />
            )}
            {question.type === "multiple" && (
              <RadioGroup value={question.response as string}>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value={question.response as string} checked readOnly />
                  <Label>{question.response}</Label>
                </div>
              </RadioGroup>
            )}
          </div>
          <CollapsibleTrigger asChild>
            <Button
              variant="ghost"
              size="icon"
              className={isOpen || (isReviewed && feedback) ? "bg-accent" : ""}
              disabled={isReviewed && !feedback}
            >
              <MessageSquare className="h-4 w-4" />
            </Button>
          </CollapsibleTrigger>
        </div>
      </div>
      <CollapsibleContent className="mt-2">
        <div className="rounded-md border bg-muted/50 p-4">
          <Textarea
            value={feedback}
            onChange={(e) => handleFeedbackChange(e.target.value)}
            placeholder="Add a comment..."
            className="mb-2"
            readOnly={isReviewed}
          />
        </div>
      </CollapsibleContent>
    </Collapsible>
  )
}

