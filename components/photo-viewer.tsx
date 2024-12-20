"use client"

import * as React from "react"
import { format } from "date-fns"
import { ChevronLeft, ChevronRight, Download, Copy, RotateCcw, ZoomIn, ZoomOut, X } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ScrollArea } from "@/components/ui/scroll-area"
import { cn } from "@/lib/utils"
import { type PhotoSubmission, type Pose } from "@/types/photo-submission"

interface PhotoViewerProps {
  submission: PhotoSubmission
  poses: Pose[]
}

export function PhotoViewer({ submission, poses }: PhotoViewerProps) {
  const [currentPoseIndex, setCurrentPoseIndex] = React.useState(0)
  const [isZoomed, setIsZoomed] = React.useState(false)
  const [zoom, setZoom] = React.useState(1)
  const [rotation, setRotation] = React.useState(0)

  const currentPose = poses[currentPoseIndex]
  const totalPoses = poses.length

  const navigatePose = (direction: 'prev' | 'next') => {
    if (direction === 'prev') {
      setCurrentPoseIndex(current => 
        current === 0 ? totalPoses - 1 : current - 1
      )
    } else {
      setCurrentPoseIndex(current => 
        current === totalPoses - 1 ? 0 : current + 1
      )
    }
  }

  const handleZoom = (type: 'in' | 'out') => {
    setZoom(current => {
      if (type === 'in' && current < 3) return current + 0.5
      if (type === 'out' && current > 0.5) return current - 0.5
      return current
    })
  }

  const handleRotate = () => {
    setRotation(current => (current + 90) % 360)
  }

  const toggleZoom = () => {
    if (isZoomed) {
      setZoom(1)
      setRotation(0)
    }
    setIsZoomed(!isZoomed)
  }

  const currentPhoto = submission.photos.find(
    photo => photo.poseId === currentPose.id
  )

  return (
    <div className="flex h-full flex-col">
      <div className="flex items-center justify-between border-b p-4">
        <Input
          type="date"
          value={format(new Date(submission.date), "yyyy-MM-dd")}
          readOnly
          className="w-[200px]"
        />
      </div>

      <div className="flex flex-1 gap-4 p-4">
        <div className="w-[240px] border-r pr-4">
          <div className="mb-4">
            <h2 className="text-lg font-medium mb-2">Pose</h2>
            <div className="flex items-center gap-2 mb-4">
              <Button
                variant="outline"
                size="icon"
                onClick={() => navigatePose('prev')}
              >
                <ChevronLeft className="h-4 w-4" />
              </Button>
              <div className="flex-1 text-center">
                {currentPoseIndex + 1} / {totalPoses}
              </div>
              <Button
                variant="outline"
                size="icon"
                onClick={() => navigatePose('next')}
              >
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>
          </div>

          <ScrollArea className="h-[calc(85vh-200px)]">
            {poses.map((pose, index) => (
              <Button
                key={pose.id}
                variant="ghost"
                className={cn(
                  "w-full justify-start",
                  index === currentPoseIndex && "bg-accent"
                )}
                onClick={() => setCurrentPoseIndex(index)}
              >
                {pose.name}
              </Button>
            ))}
          </ScrollArea>
        </div>

        <div className="flex-1 flex flex-col">
          <div className="relative aspect-square w-full max-w-xl mx-auto rounded-lg border h-[calc(85vh-200px)]">
            {currentPhoto ? (
              <>
                <div 
                  role="button"
                  tabIndex={0}
                  className={cn(
                    "relative w-full h-full cursor-zoom-in",
                    isZoomed && "cursor-zoom-out fixed inset-0 z-50 bg-background/80 backdrop-blur-sm"
                  )}
                  onClick={toggleZoom}
                  onKeyDown={(e) => e.key === 'Enter' && toggleZoom()}
                >
                  <img
                    src={currentPhoto.url}
                    alt={currentPose.name}
                    className={cn(
                      "h-full w-full object-contain",
                      isZoomed && "fixed inset-0 z-50 m-auto max-h-screen max-w-screen p-6"
                    )}
                    style={{
                      transform: `scale(${zoom}) rotate(${rotation}deg)`,
                      transition: 'transform 0.2s ease-in-out'
                    }}
                  />
                  {isZoomed && (
                    <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 flex gap-2 bg-background/80 backdrop-blur-sm p-2 rounded-lg">
                      <Button variant="outline" size="icon">
                        <Download className="h-4 w-4" />
                      </Button>
                      <Button variant="outline" size="icon">
                        <Copy className="h-4 w-4" />
                      </Button>
                      <Button variant="outline" size="icon" onClick={(e) => { e.stopPropagation(); handleRotate(); }}>
                        <RotateCcw className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="outline"
                        size="icon"
                        onClick={(e) => { e.stopPropagation(); handleZoom('in'); }}
                        disabled={zoom >= 3}
                      >
                        <ZoomIn className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="outline"
                        size="icon"
                        onClick={(e) => { e.stopPropagation(); handleZoom('out'); }}
                        disabled={zoom <= 0.5}
                      >
                        <ZoomOut className="h-4 w-4" />
                      </Button>
                    </div>
                  )}
                </div>
              </>
            ) : currentPose.illustration ? (
              <img
                src={currentPose.illustration}
                alt={`${currentPose.name} illustration`}
                className="h-full w-full object-contain opacity-50"
              />
            ) : (
              <div className="flex h-full items-center justify-center text-muted-foreground">
                No photo submitted for this pose
              </div>
            )}
          </div>
          <div className="flex justify-end mt-4">
            <Button>Comment</Button>
          </div>
        </div>
      </div>
    </div>
  )
}

