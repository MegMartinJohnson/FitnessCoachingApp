export type PoseType = 'front' | 'back' | 'left' | 'right' | 'front-double-bicep' | 'back-double-bicep'

export interface Pose {
  id: string
  name: string
  type: PoseType
  illustration?: string
}

export interface SubmittedPhoto {
  id: string
  url: string
  poseId: string
}

export interface PhotoSubmission {
  id: string
  clientId: string
  date: string
  photoCount: number
  photos: SubmittedPhoto[]
}

