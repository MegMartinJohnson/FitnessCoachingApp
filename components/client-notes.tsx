"use client"

import * as React from "react"
import { Plus } from 'lucide-react'

import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

const noteCategories = ["Goals", "Injuries", "Allergies", "Lifestyle", "Other"]

export function ClientNotes() {
  const [notes, setNotes] = React.useState<string[]>([])

  const addNote = () => {
    setNotes([...notes, ""])
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-medium">Notes</h3>
        <Button variant="outline" size="sm" onClick={addNote}>
          <Plus className="h-4 w-4 mr-2" />
          Add Note
        </Button>
      </div>
      <Tabs defaultValue="goals">
        <TabsList className="grid w-full grid-cols-5">
          {noteCategories.map((category) => (
            <TabsTrigger key={category} value={category.toLowerCase()}>
              {category}
            </TabsTrigger>
          ))}
        </TabsList>
        {noteCategories.map((category) => (
          <TabsContent key={category} value={category.toLowerCase()}>
            <div className="space-y-4">
              {notes.map((_, index) => (
                <Textarea
                  key={index}
                  placeholder={`Add a note about ${category.toLowerCase()}...`}
                  className="min-h-[100px]"
                />
              ))}
              {notes.length === 0 && (
                <p className="text-sm text-muted-foreground text-center py-4">
                  No notes yet. Click &quot;Add Note&quot; to create one.
                </p>
              )}
            </div>
          </TabsContent>
        ))}
      </Tabs>
    </div>
  )
}

