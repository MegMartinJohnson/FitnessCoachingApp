export interface NutritionPlan {
  id: string
  name: string
  startDate: string
  endDate?: string
  planType: 'meal-plan' | 'macro-plan' | 'portion-plan'
  description: string
  status: 'active' | 'ended'
  tags?: string[]
}

export interface Meal {
  id: string
  name: string
  time: string
  foods: Food[]
  notes?: string
  cookingInstructions?: string
}

export interface Food {
  id: string
  name: string
  amount: number
  unit: string
  calories: number
  protein: number
  carbs: number
  fat: number
}

export interface MacroTarget {
  calories: number
  protein: number
  carbs: number
  fat: number
}

export interface MealPlan {
  id: string
  name: string
  meals: Meal[]
  macros: MacroTarget
}

