"use client"

import * as React from "react"
import { type MacroTarget } from "@/types/nutrition"

interface MacroChartProps {
  macros: MacroTarget
}

export function MacroChart({ macros }: MacroChartProps) {
  const proteinCalories = macros.protein * 4
  const carbsCalories = macros.carbs * 4
  const fatCalories = macros.fat * 9
  const totalCalories = proteinCalories + carbsCalories + fatCalories

  const proteinPercentage = (proteinCalories / totalCalories) * 100 || 0
  const carbsPercentage = (carbsCalories / totalCalories) * 100 || 0
  const fatPercentage = (fatCalories / totalCalories) * 100 || 0

  return (
    <div className="relative h-[200px] w-[200px]">
      <svg viewBox="0 0 100 100" className="h-full w-full -rotate-90">
        <circle
          cx="50"
          cy="50"
          r="45"
          fill="none"
          stroke="currentColor"
          strokeWidth="10"
          className="text-muted-foreground/20"
        />
        {/* Fat */}
        <circle
          cx="50"
          cy="50"
          r="45"
          fill="none"
          stroke="hsl(var(--accent))"
          strokeWidth="10"
          strokeDasharray={`${fatPercentage} ${100}`}
          strokeLinecap="round"
        />
        {/* Carbs */}
        <circle
          cx="50"
          cy="50"
          r="45"
          fill="none"
          stroke="hsl(var(--secondary))"
          strokeWidth="10"
          strokeDasharray={`${carbsPercentage} ${100}`}
          strokeDashoffset={-fatPercentage}
          strokeLinecap="round"
        />
        {/* Protein */}
        <circle
          cx="50"
          cy="50"
          r="45"
          fill="none"
          stroke="hsl(var(--primary))"
          strokeWidth="10"
          strokeDasharray={`${proteinPercentage} ${100}`}
          strokeDashoffset={-(fatPercentage + carbsPercentage)}
          strokeLinecap="round"
        />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <div className="text-center">
          <div className="text-3xl font-bold">{macros.calories}</div>
          <div className="text-xs text-muted-foreground">calories</div>
        </div>
        <div className="mt-2 flex gap-2 text-xs">
          <div className="flex items-center">
            <div className="h-2 w-2 rounded-full bg-primary mr-1"></div>
            Protein
          </div>
          <div className="flex items-center">
            <div className="h-2 w-2 rounded-full bg-secondary mr-1"></div>
            Carbs
          </div>
          <div className="flex items-center">
            <div className="h-2 w-2 rounded-full bg-accent mr-1"></div>
            Fat
          </div>
        </div>
      </div>
    </div>
  )
}

