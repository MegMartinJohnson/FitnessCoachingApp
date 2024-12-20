export type QuestionType = 'text' | 'number' | 'rating' | 'multiple'

export interface BaseQuestion {
  id: string
  type: QuestionType
  question: string
  required: boolean
}

export interface TextQuestion extends BaseQuestion {
  type: 'text'
}

export interface NumberQuestion extends BaseQuestion {
  type: 'number'
  min?: number
  max?: number
}

export interface RatingQuestion extends BaseQuestion {
  type: 'rating'
  maxRating: number
}

export interface MultipleChoiceQuestion extends BaseQuestion {
  type: 'multiple'
  options: string[]
}

export type Question = 
  | TextQuestion 
  | NumberQuestion 
  | RatingQuestion 
  | MultipleChoiceQuestion

export interface FormSection {
  id: string
  title: string
  description: string
  questions: Question[]
}

export interface CheckInForm {
  id: string
  name: string
  description: string
  sections: FormSection[]
}

