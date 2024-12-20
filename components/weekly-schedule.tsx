"use client"

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Dumbbell, Heart, PillIcon, Utensils } from 'lucide-react'
import { ScheduleCell } from "./schedule-cell"
import { WorkoutProgram, CardioProgram, NutritionProgram, SupplementProgram } from "@/types/programs"

const days = ["Day 1", "Day 2", "Day 3", "Day 4", "Day 5", "Day 6", "Day 7"]

// This would come from your API/database
const mockPrograms = {
  training: [
    {
      id: "program1",
      name: "3-Day Split",
      workouts: [
        { id: "w1", name: "Push" },
        { id: "w2", name: "Pull" },
        { id: "w3", name: "Legs" },
      ],
    },
    {
      id: "program2",
      name: "Home Gym",
      workouts: [
        { id: "w4", name: "Home Gym Upper" },
        { id: "w5", name: "Home Gym Lower" },
      ],
    },
  ] as WorkoutProgram[],
  cardio: [
    {
      id: "cardio1",
      name: "HIIT Program",
      sessions: [
        { id: "c1", name: "HIIT Session 1" },
        { id: "c2", name: "HIIT Session 2" },
      ],
    },
  ] as CardioProgram[],
  nutrition: [
    {
      id: "nutrition1",
      name: "Cutting Plan",
      plans: [
        { id: "n1", name: "Training Day Diet" },
        { id: "n2", name: "Rest Day Diet" },
      ],
    },
  ] as NutritionProgram[],
  supplements: [
    {
      id: "supp1",
      name: "Basic Stack",
      protocols: [
        { id: "s1", name: "Base Supplements" },
        { id: "s2", name: "Pre-Workout Stack" },
      ],
    },
  ] as SupplementProgram[],
}

// Convert programs to schedule items
const getAllWorkouts = () => {
  return mockPrograms.training.flatMap(program => 
    program.workouts.map(workout => ({
      id: workout.id,
      name: `${program.name} - ${workout.name}`,
    }))
  )
}

const getAllCardioSessions = () => {
  return mockPrograms.cardio.flatMap(program => 
    program.sessions.map(session => ({
      id: session.id,
      name: `${program.name} - ${session.name}`,
    }))
  )
}

const getAllNutritionPlans = () => {
  return mockPrograms.nutrition.flatMap(program => 
    program.plans.map(plan => ({
      id: plan.id,
      name: `${program.name} - ${plan.name}`,
    }))
  )
}

const getAllSupplementProtocols = () => {
  return mockPrograms.supplements.flatMap(program => 
    program.protocols.map(protocol => ({
      id: protocol.id,
      name: `${program.name} - ${protocol.name}`,
    }))
  )
}

const scheduleItems = [
  {
    type: "Training",
    icon: Dumbbell,
    items: getAllWorkouts(),
  },
  {
    type: "Cardio",
    icon: Heart,
    items: getAllCardioSessions(),
  },
  {
    type: "Nutrition",
    icon: Utensils,
    items: getAllNutritionPlans(),
  },
  {
    type: "Supplements",
    icon: PillIcon,
    items: getAllSupplementProtocols(),
  },
]

export function WeeklySchedule() {
  return (
    <div className="space-y-4">
      <h3 className="text-lg font-medium">Schedule</h3>
      <p className="text-sm text-muted-foreground">
        Organize your client&apos;s plans throughout the week.
      </p>
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[120px]">Type</TableHead>
              {days.map((day) => (
                <TableHead key={day}>{day}</TableHead>
              ))}
            </TableRow>
          </TableHeader>
          <TableBody>
            {scheduleItems.map((item) => (
              <TableRow key={item.type}>
                <TableCell className="font-medium">
                  <div className="flex items-center gap-2">
                    <item.icon className="h-4 w-4" />
                    {item.type}
                  </div>
                </TableCell>
                {days.map((day, index) => (
                  <TableCell key={`${item.type}-${day}`} className="p-2">
                    <ScheduleCell
                      items={item.items}
                      onChange={(value) => {
                        console.log(`Selected ${value} for ${item.type} on ${day}`)
                      }}
                    />
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}

