"use client"

import * as React from "react"
import { X } from 'lucide-react'

import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { FormBuilder } from "./form-builder"

export function NewFormDialog() {
  const [open, setOpen] = React.useState(false)

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>New Form</Button>
      </DialogTrigger>
      <DialogContent className="max-w-[90vw] w-[1200px] h-[85vh]">
        <DialogHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <DialogTitle>New Form</DialogTitle>
        </DialogHeader>
        <div className="flex-1 overflow-auto">
          <FormBuilder onClose={() => setOpen(false)} />
        </div>
      </DialogContent>
    </Dialog>
  )
}

