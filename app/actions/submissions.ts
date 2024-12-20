'use server'

import { revalidatePath } from 'next/cache'
import { type SubmissionReview } from "@/types/submission"

export async function submitReview(
  submissionId: string, 
  clientId: string,
  review: Omit<SubmissionReview, 'reviewedAt' | 'reviewedBy'>
) {
  try {
    // In a real app, you would:
    // 1. Validate the input
    // 2. Save to database
    // 3. Update submission status to 'reviewed'
    console.log('Saving review:', { submissionId, clientId, review })

    // Revalidate the submissions list and detail pages
    revalidatePath(`/coach/clients/${clientId}/submissions`)
    revalidatePath(`/coach/clients/${clientId}/submissions/${submissionId}`)

    return { success: true }
  } catch (error) {
    return { success: false, error: 'Failed to submit review' }
  }
}

