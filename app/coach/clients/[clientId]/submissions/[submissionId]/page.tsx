import { notFound } from "next/navigation"
import { SubmissionViewer } from "@/components/submissions/submission-viewer"
import { type Submission } from "@/types/submission"
import { type PhotoSubmission, type Pose } from "@/types/photo-submission"

// This would come from your database
async function getSubmission(clientId: string, submissionId: string): Promise<Submission | null> {
  const submission: Submission = {
    id: submissionId,
    clientId,
    clientName: "John Smith",
    formId: "form123",
    formName: "Weekly Check-In",
    date: "2024-01-14",
    status: "pending",
    sections: [
      {
        id: "section1",
        title: "Daily Habits",
        questions: [
          {
            id: "q1",
            questionId: "orig1",
            question: "How many hours did you sleep?",
            type: "number",
            response: 7
          }
        ]
      }
    ]
  }
  return submission
}

// This would come from your database
const getMockPhotoSubmission = async (clientId: string, date: string): Promise<PhotoSubmission | null> => {
  const submission: PhotoSubmission = {
    id: "photo-submission-1",
    clientId,
    date,
    photoCount: 6,
    photos: [
      { id: "p1", url: "/placeholder.svg", poseId: "pose1" },
      { id: "p2", url: "/placeholder.svg", poseId: "pose2" },
      { id: "p3", url: "/placeholder.svg", poseId: "pose3" },
      { id: "p4", url: "/placeholder.svg", poseId: "pose4" },
      { id: "p5", url: "/placeholder.svg", poseId: "pose5" },
      { id: "p6", url: "/placeholder.svg", poseId: "pose6" },
    ]
  }
  return submission
}

// This would come from your database
const getMockPoses = async (): Promise<Pose[]> => {
  return [
    { id: "pose1", name: "Front", type: "front", illustration: "/placeholder.svg" },
    { id: "pose2", name: "Back", type: "back", illustration: "/placeholder.svg" },
    { id: "pose3", name: "Left", type: "left", illustration: "/placeholder.svg" },
    { id: "pose4", name: "Right", type: "right", illustration: "/placeholder.svg" },
    { id: "pose5", name: "Front Double Bicep", type: "front-double-bicep", illustration: "/placeholder.svg" },
    { id: "pose6", name: "Back Double Bicep", type: "back-double-bicep", illustration: "/placeholder.svg" },
  ]
}

export default async function SubmissionPage({ 
  params 
}: { 
  params: { clientId: string; submissionId: string } 
}) {
  const submission = await getSubmission(params.clientId, params.submissionId)

  if (!submission) {
    notFound()
  }

  // Get photo submission for the same date
  const [photoSubmission, poses] = await Promise.all([
    getMockPhotoSubmission(params.clientId, submission.date),
    getMockPoses()
  ])

  return (
    <SubmissionViewer 
      submission={submission} 
      photoSubmission={photoSubmission}
      poses={poses}
    />
  )
}

