"use client"

import { AlignLeft, Hash, List, Star } from 'lucide-react'
import { useDraggable } from "@dnd-kit/core"
import { CSS } from "@dnd-kit/utilities"

interface DraggableElementProps {
  id: string
  label: string
  icon: React.ElementType
}

function DraggableElement({ id, label, icon: Icon }: DraggableElementProps) {
  const { attributes, listeners, setNodeRef, transform, isDragging } = useDraggable({
    id: id,
  })

  const style = transform ? {
    transform: CSS.Transform.toString(transform),
  } : undefined

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...listeners}
      {...attributes}
      className={`flex items-center gap-2 rounded-md border bg-background p-3 cursor-move hover:bg-accent ${
        isDragging ? 'opacity-50' : ''
      }`}
    >
      <Icon className="h-4 w-4" />
      <span>{label}</span>
    </div>
  )
}

const elements = [
  {
    type: "section",
    label: "Section",
    icon: List,
  },
  {
    type: "text",
    label: "Text Question",
    icon: AlignLeft,
  },
  {
    type: "number",
    label: "Number Question",
    icon: Hash,
  },
  {
    type: "rating",
    label: "Rating Question",
    icon: Star,
  },
  {
    type: "multiple",
    label: "Multiple Choice Question",
    icon: List,
  },
]

export function AddFormElements() {
  return (
    <div className="space-y-4">
      <h2 className="text-lg font-medium">Add to Form</h2>
      <p className="text-sm text-muted-foreground">
        Drag and drop the elements you&apos;d like to add into the form.
      </p>
      <div className="space-y-2">
        {elements.map((element) => (
          <DraggableElement
            key={element.type}
            id={`new-${element.type}`}
            label={element.label}
            icon={element.icon}
          />
        ))}
      </div>
    </div>
  )
}

