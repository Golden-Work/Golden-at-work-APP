import { Implement } from "./implement.interface"

export interface Reservation {
  id: number
  start_date: string
  end_date: string
  implement: Implement
  status: string
  return_label: string
  return_state_description: string
}
