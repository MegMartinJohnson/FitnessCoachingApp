"use client"

import * as React from "react"
import { nanoid } from 'nanoid'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { FormSection } from "./form-section"
import { AddQuestionDialog } from "./add-question-dialog"
import { type CheckInForm, type FormSection as FormSectionType, type Question } from "@/types/form-builder"

interface FormBuilderProps {
  onClose?: () => void
}

export function FormBuilder({ onClose }: FormBuilderProps) {
  const [form, setForm] = React.useState<CheckInForm>({
    id: "new",
    name: "",
    description: "",
    sections: [],
  })

  const addSection = () => {
    const newSection: FormSectionType = {
      id: nanoid(),
      title: 'New Section',
      description: '',
      questions: [],
    }
    setForm(prev => ({
      ...prev,
      sections: [...prev.sections, newSection],
    }))
  }

  const updateSection = (updatedSection: FormSectionType) => {
    setForm(prev => ({
      ...prev,
      sections: prev.sections.map(section =>
        section.id === updatedSection.id ? updatedSection : section
      ),
    }))
  }

  const deleteSection = (sectionId: string) => {
    setForm(prev => ({
      ...prev,
      sections: prev.sections.filter(section => section.id !== sectionId),
    }))
  }

  const addQuestion = (sectionId: string, question: Question) => {
    setForm(prev => ({
      ...prev,
      sections: prev.sections.map(section =>
        section.id === sectionId
          ? { ...section, questions: [...section.questions, question] }
          : section
      ),
    }))
  }

  const handleSave = async () => {
    console.log("Saving form:", form)
    onClose?.()
  }

  return (
    <div className="flex flex-col h-full">
      <div className="flex-1 p-4 space-y-4">
        <div className="space-y-4">
          <Input
            placeholder="Form Name"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
          />
          <Textarea
            placeholder="Description"
            value={form.description}
            onChange={(e) => setForm({ ...form, description: e.target.value })}
          />
        </div>
        <div className="space-y-4">
          {form.sections.map((section) => (
            <FormSection
              key={section.id}
              section={section}
              onUpdate={updateSection}
              onDelete={() => deleteSection(section.id)}
              onAddQuestion={(question) => addQuestion(section.id, question)}
            />
          ))}
        </div>
        <Button onClick={addSection}>Add Section</Button>
      </div>
      <div className="border-t p-4 flex justify-end gap-2">
        <Button variant="outline" onClick={onClose}>
          Cancel
        </Button>
        <Button onClick={handleSave}>
          Save Form
        </Button>
      </div>
    </div>
  )
}

