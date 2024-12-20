import { Metadata } from "next"
import { SubmissionTabs } from "@/components/submissions/submission-tabs"
import { SubmissionsTable } from "@/components/submissions/submissions-table"
import { type Submission } from "@/types/submission"

export const metadata: Metadata = {
  title: "Client Submissions",
  description: "View and manage client check-ins and photos",
}

// This would come from your database
const getMockSubmissions = (clientId: string): Submission[] => {
  return [
    {
      id: "submission-1",
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
    },
    {
      id: "submission-2",
      clientId,
      clientName: "John Smith",
      formId: "form123",
      formName: "Weekly Check-In",
      date: "2024-01-07",
      status: "reviewed",
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
              response: 6
            }
          ]
        }
      ],
      review: {
        feedback: "Great progress this week!",
        programAdjustments: "Increasing protein intake",
        questionFeedback: {
          "q1": "Let's work on improving your sleep schedule"
        },
        reviewedAt: "2024-01-08T10:00:00Z",
        reviewedBy: "coach123"
      }
    }
  ]
}

export default function SubmissionsPage({ params }: { params: { clientId: string } }) {
  const submissions = getMockSubmissions(params.clientId)

  return (
    <div className="space-y-6">
      <SubmissionTabs clientId={params.clientId} />
      <SubmissionsTable submissions={submissions} clientId={params.clientId} />
    </div>
  )
}

