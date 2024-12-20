"use client"

import * as React from "react"
import { format } from "date-fns"
import { Camera } from 'lucide-react'
import { toast } from "sonner"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Textarea } from "@/components/ui/textarea"
import { QuestionResponse } from "./question-response"
import { PhotoOverlay } from "./photo-overlay"
import { submitReview } from "@/app/actions/submissions"
import { type Submission } from "@/types/submission"
import { type PhotoSubmission, type Pose } from "@/types/photo-submission"

interface SubmissionViewerProps {
  submission: Submission
  photoSubmission?: PhotoSubmission
  poses?: Pose[]
}

export function SubmissionViewer({ submission, photoSubmission, poses }: SubmissionViewerProps) {
  const [isSubmitting, setIsSubmitting] = React.useState(false)
  const [showPhotos, setShowPhotos] = React.useState(false)
  const [feedback, setFeedback] = React.useState(submission.review?.feedback || "")
  const [adjustments, setAdjustments] = React.useState(
    submission.review?.programAdjustments || ""
  )
  const [questionFeedback, setQuestionFeedback] = React.useState<Record<string, string>>(() => {
    if (submission.review?.questionFeedback) {
      return submission.review.questionFeedback
    }
    return {}
  })

  const handleSubmitReview = async () => {
    try {
      setIsSubmitting(true)
      const result = await submitReview(submission.id, submission.clientId, {
        feedback,
        programAdjustments: adjustments,
        questionFeedback
      })

      if (result.success) {
        toast.success("Review submitted successfully")
      } else {
        throw new Error(result.error)
      }
    } catch (error) {
      toast.error("Failed to submit review")
      console.error("Error submitting review:", error)
    } finally {
      setIsSubmitting(false)
    }
  }

  const isReviewed = submission.status === 'reviewed'

  return (
    <div className="container max-w-4xl py-6 space-y-6">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0">
          <div className="space-y-1.5">
            <div className="flex items-center gap-2">
              <CardTitle>Check-In Feedback</CardTitle>
              <Badge variant={isReviewed ? "success" : "warning"}>
                {isReviewed ? "Reviewed" : "Pending Review"}
              </Badge>
            </div>
            <div className="grid grid-cols-3 gap-4">
              <Input 
                value={submission.clientName}
                readOnly
                className="bg-muted"
              />
              <Input 
                value={submission.formName}
                readOnly
                className="bg-muted"
              />
              <Input 
                value={format(new Date(submission.date), "MM/dd/yyyy")}
                readOnly
                className="bg-muted"
              />
            </div>
          </div>
          {photoSubmission && poses && (
            <Button 
              variant="outline" 
              className="gap-2"
              onClick={() => setShowPhotos(true)}
            >
              <Camera className="h-4 w-4" />
              View Photos
            </Button>
          )}
        </CardHeader>
        <CardContent className="space-y-6">
          {submission.sections.map((section) => (
            <Card key={section.id}>
              <CardHeader>
                <CardTitle>{section.title}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {section.questions.map((question) => (
                  <QuestionResponse
                    key={question.id}
                    question={question}
                    feedback={questionFeedback[question.id] || ''}
                    onFeedbackChange={(newFeedback) => {
                      setQuestionFeedback(prev => ({
                        ...prev,
                        [question.id]: newFeedback
                      }))
                    }}
                    isReviewed={isReviewed}
                  />
                ))}
              </CardContent>
            </Card>
          ))}

          <Card className="bg-muted/50">
            <CardHeader>
              <CardTitle>Feedback</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex gap-4">
                <Avatar>
                  <AvatarImage src="/placeholder.svg" />
                  <AvatarFallback>CN</AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  <Textarea
                    value={feedback}
                    onChange={(e) => setFeedback(e.target.value)}
                    placeholder="Enter your feedback..."
                    className="mb-2"
                    readOnly={isReviewed}
                  />
                  {isReviewed && submission.review?.reviewedAt && (
                    <p className="text-sm text-muted-foreground">
                      Reviewed on {format(new Date(submission.review.reviewedAt), "MMM d, yyyy")}
                    </p>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-muted/50">
            <CardHeader>
              <CardTitle>Program Adjustments</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex gap-4">
                <Avatar>
                  <AvatarImage src="/placeholder.svg" />
                  <AvatarFallback>CN</AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  <Textarea
                    value={adjustments}
                    onChange={(e) => setAdjustments(e.target.value)}
                    placeholder="Enter program adjustments..."
                    className="mb-2"
                    readOnly={isReviewed}
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          {!isReviewed && (
            <div className="flex justify-end pt-4">
              <Button 
                onClick={handleSubmitReview}
                disabled={isSubmitting}
              >
                {isSubmitting ? "Submitting..." : "Submit Review"}
              </Button>
            </div>
          )}
        </CardContent>
      </Card>

      {photoSubmission && poses && (
        <PhotoOverlay
          open={showPhotos}
          onOpenChange={setShowPhotos}
          submission={photoSubmission}
          poses={poses}
        />
      )}
    </div>
  )
}

