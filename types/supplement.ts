export interface SupplementPlan {
  id: string
  name: string
  startDate: string
  endDate?: string
  description: string
  status: 'active' | 'ended'
  tags?: string[]
  protocols: Protocol[]
}

export interface Protocol {
  id: string
  name: string
  time?: string
  supplements: Supplement[]
  notes?: string[]
}

export interface Supplement {
  id: string
  name: string
  brand?: string
  form: 'capsule' | 'tablet' | 'powder' | 'liquid' | 'other'
  dosage: number
  unit: string
  frequency: string
  withFood?: boolean
  timing?: 'morning' | 'pre-workout' | 'post-workout' | 'evening' | 'anytime'
  notes?: string[]
}

