"use client"

import { Dialog, DialogContent } from "@/components/ui/dialog"
import { PhotoViewer } from "@/components/submissions/photo-viewer"
import { type PhotoSubmission, type Pose } from "@/types/photo-submission"

interface PhotoOverlayProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  submission: PhotoSubmission
  poses: Pose[]
}

export function PhotoOverlay({ open, onOpenChange, submission, poses }: PhotoOverlayProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-[90vw] w-[1200px] h-[85vh] p-0">
        <PhotoViewer 
          submission={submission} 
          poses={poses} 
          onClose={() => onOpenChange(false)} 
        />
      </DialogContent>
    </Dialog>
  )
}

