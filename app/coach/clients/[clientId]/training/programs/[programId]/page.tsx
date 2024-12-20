import { notFound } from "next/navigation"
import ProgramEditor from "@/components/training/program-editor"
import { type TrainingProgram, type Exercise } from "@/types/training"

// This would come from your database
const getMockProgram = async (programId: string): Promise<TrainingProgram | null> => {
  const program: TrainingProgram = {
    id: programId,
    name: "Muscle Growth Phase",
    startDate: "2024-08-15",
    description: "Focus on leg growth, higher volume to add muscle density.",
    status: "active",
    workouts: [
      {
        id: "w1",
        name: "Push Day",
        exercises: [
          {
            id: "e1",
            exerciseId: "ex1",
            name: "Bench Press",
            category: "Compound",
            equipment: "Barbell",
            muscleGroups: ["Chest", "Shoulders", "Triceps"],
            sets: [
              {
                type: "Warm-up",
                sets: 2,
                reps: "12-15",
                rest: 60
              },
              {
                type: "Working",
                sets: 4,
                reps: "8-12",
                rest: 120,
                tempo: "3-1-1-0"
              }
            ],
            notes: ["Focus on chest contraction", "Keep elbows tucked"]
          }
        ]
      },
      {
        id: "w2",
        name: "Pull Day",
        exercises: []
      }
    ]
  }
  return program
}

// This would come from your database
const getMockExercises = async (): Promise<Exercise[]> => {
  return [
    {
      id: "ex1",
      name: "Barbell Bench Press",
      category: "Compound",
      equipment: "Barbell",
      muscleGroups: ["Chest", "Shoulders", "Triceps"],
      instructions: "Lie on bench, lower bar to chest, press up"
    },
    {
      id: "ex2",
      name: "Pull-up",
      category: "Compound",
      equipment: "Body Weight",
      muscleGroups: ["Back", "Biceps"],
      instructions: "Hang from bar, pull up until chin over bar"
    }
  ]
}

interface ProgramPageProps {
  params: {
    clientId: string
    programId: string
  }
}

export default async function ProgramPage({ params }: ProgramPageProps) {
  const [program, exercises] = await Promise.all([
    getMockProgram(params.programId),
    getMockExercises()
  ])

  if (!program) {
    notFound()
  }

  return <ProgramEditor program={program} exercises={exercises} />
}

