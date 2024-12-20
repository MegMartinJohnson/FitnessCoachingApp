export interface CardioProgram {
  id: string
  name: string
  startDate: string
  endDate?: string
  description: string
  status: 'active' | 'ended'
  tags?: string[]
  sessions: CardioSession[]
}

export interface CardioSession {
  id: string
  name: string
  description?: string
  exercises: CardioExercise[]
}

export interface CardioExercise {
  id: string
  name: string
  type: 'steady-state' | 'interval' | 'fartlek'
  duration: number
  intensity: 'low' | 'moderate' | 'high'
  equipment?: string
  category?: string
  sets: CardioSet[]
  notes?: string[]
  fields?: string[]
  circuitGroup?: string
}

export interface CardioSet {
  type: string
  duration: number
  speed: number
  incline: number
  distance?: number
  intensity?: 'low' | 'moderate' | 'high'
  heartRate?: number
}

