export interface Client {
  id: string
  name: string
  photo: string
  group: string
  package: string
  startDate: string
  email: string
  status: 'active' | 'inactive' | 'pending'
}

