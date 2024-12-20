import { notFound } from "next/navigation"
import CardioEditor from "@/components/cardio/cardio-editor"
import { type CardioProgram, type CardioExercise } from "@/types/cardio"

// This would come from your database
const getMockProgram = async (programId: string): Promise<CardioProgram | null> => {
  const program: CardioProgram = {
    id: programId,
    name: "Fat Loss HIIT",
    startDate: "2024-08-15",
    description: "High-intensity interval training for maximum fat burn.",
    status: "active",
    sessions: [
      {
        id: "s1",
        name: "HIIT Session",
        exercises: [
          {
            id: "e1",
            name: "Treadmill Intervals",
            type: "interval",
            duration: 30,
            intensity: "high",
            sets: [
              {
                type: "Warm-up",
                duration: 300,
                speed: 3.5,
                incline: 1
              },
              {
                type: "Working",
                duration: 60,
                speed: 8.0,
                incline: 2
              }
            ],
            notes: ["Start slow and gradually increase speed", "Focus on form"]
          }
        ]
      }
    ]
  }
  return program
}

// This would come from your database
const getMockExercises = async (): Promise<CardioExercise[]> => {
  return [
    {
      id: "ex1",
      name: "Treadmill Run",
      type: "steady-state",
      duration: 30,
      intensity: "moderate",
      equipment: "Treadmill",
      category: "Running"
    },
    {
      id: "ex2",
      name: "Bike Intervals",
      type: "interval",
      duration: 20,
      intensity: "high",
      equipment: "Stationary Bike",
      category: "Cycling"
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

  return <CardioEditor program={program} exercises={exercises} />
}

