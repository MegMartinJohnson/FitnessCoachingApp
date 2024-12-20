export interface TrainingProgram {
  id: string
  name: string
  startDate: string
  endDate?: string
  description: string
  status: 'active' | 'ended'
  tags?: string[]
  workouts: Workout[]
}

export interface Workout {
  id: string
  name: string
  description?: string
  exercises: WorkoutExercise[]
}

export interface Exercise {
  id: string
  name: string
  category: string
  equipment?: string
  instructions?: string
  muscleGroups: string[]
}

export interface ExerciseSet {
  type: string
  sets: number
  reps: string
  rest: number
  tempo?: string
  weight?: number
  rpe?: number
  rir?: number
}

export interface WorkoutExercise {
  id: string
  exerciseId: string
  name: string
  category: string
  equipment?: string
  muscleGroups: string[]
  sets: ExerciseSet[]
  notes?: string[]
  fields: string[]
  supersetGroup?: string // ID of the superset group this exercise belongs to
}

export interface SupersetGroup {
  id: string
  exerciseIds: string[]
}

