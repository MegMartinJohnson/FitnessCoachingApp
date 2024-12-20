export interface WorkoutProgram {
  id: string
  name: string
  workouts: {
    id: string
    name: string
  }[]
}

export interface CardioProgram {
  id: string
  name: string
  sessions: {
    id: string
    name: string
  }[]
}

export interface NutritionProgram {
  id: string
  name: string
  plans: {
    id: string
    name: string
  }[]
}

export interface SupplementProgram {
  id: string
  name: string
  protocols: {
    id: string
    name: string
  }[]
}

export interface ScheduleItem {
  id: string
  name: string
}

export type ProgramType = 'training' | 'cardio' | 'nutrition' | 'supplements'

