import { Implement } from "./implement.interface"

export interface Reservation {
  id: number
  end_date: string 
  return_state_description: string
  return_label: string
  created_at: string
  status: string
  borrowed_by: number
  implement: Implement
  start_date: string 
 
}
