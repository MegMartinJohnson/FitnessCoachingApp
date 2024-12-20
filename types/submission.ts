export type SubmissionStatus = 'pending' | 'reviewed'

export interface QuestionResponse {
  id: string
  questionId: string
  question: string
  type: 'text' | 'number' | 'rating' | 'multiple'
  response: string | number
  feedback?: string
}

export interface SubmissionSection {
  id: string
  title: string
  questions: QuestionResponse[]
}

export interface SubmissionReview {
  feedback: string
  programAdjustments: string
  questionFeedback: Record<string, string>
  reviewedAt: string
  reviewedBy: string
}

export interface Submission {
  id: string
  clientId: string
  clientName: string
  formId: string
  formName: string
  date: string
  status: SubmissionStatus
  sections: SubmissionSection[]
  review?: SubmissionReview
}

