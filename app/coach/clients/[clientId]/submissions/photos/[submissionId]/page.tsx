import { notFound } from "next/navigation"
import { PhotoViewer } from "@/components/submissions/photo-viewer"
import { type PhotoSubmission, type Pose } from "@/types/photo-submission"

// This would come from your database
const getMockPhotoSubmission = async (clientId: string, submissionId: string): Promise<PhotoSubmission | null> => {
  // Mock submissions data - in a real app, this would fetch from your database
  const submissions: Record<string, PhotoSubmission> = {
    "photo-submission-1": {
      id: "photo-submission-1",
      clientId,
      date: "2024-01-14",
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
  }
  
  return submissions[submissionId] || null
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

interface PhotoSubmissionPageProps {
  params: {
    clientId: string
    submissionId: string
  }
}

export default async function PhotoSubmissionPage({ params }: PhotoSubmissionPageProps) {
  const [submission, poses] = await Promise.all([
    getMockPhotoSubmission(params.clientId, params.submissionId),
    getMockPoses()
  ])

  if (!submission) {
    notFound()
  }

  return (
    <div className="h-[calc(100vh-65px)]">
      <PhotoViewer submission={submission} poses={poses} />
    </div>
  )
}

