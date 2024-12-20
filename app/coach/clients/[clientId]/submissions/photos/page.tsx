import { Metadata } from "next"
import { SubmissionTabs } from "@/components/submissions/submission-tabs"
import { PhotosTable } from "@/components/submissions/photos-table"
import { type PhotoSubmission } from "@/types/photo-submission"

export const metadata: Metadata = {
  title: "Client Photos",
  description: "View client progress photos",
}

// This would come from your database
const getMockPhotoSubmissions = (clientId: string): PhotoSubmission[] => {
  return [
    {
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
  ]
}

export default function PhotosPage({ params }: { params: { clientId: string } }) {
  const submissions = getMockPhotoSubmissions(params.clientId)

  return (
    <div className="space-y-6">
      <SubmissionTabs clientId={params.clientId} />
      <PhotosTable submissions={submissions} clientId={params.clientId} />
    </div>
  )
}

