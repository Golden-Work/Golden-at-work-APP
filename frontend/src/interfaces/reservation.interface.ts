import { Implement } from "./implement.interface"
import { User } from "./user.interface"

export interface Reservation {
  id: number
  end_date: string
  return_state_description: string
  return_label: string
  created_at: string
  status: string
  borrowed_by: number | User
  implement: Implement
  start_date: string
}
