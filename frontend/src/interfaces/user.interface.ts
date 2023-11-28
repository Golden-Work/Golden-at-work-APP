import { Major } from './index'

export interface User {
  id: number
  email: string
  is_staff: boolean
  first_name: string
  last_name: string
  password: string
  major: Major
  document: string
}