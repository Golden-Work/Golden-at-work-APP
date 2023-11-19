import { Reservation } from "@/interfaces/reservation.interface"
import api from "."

const updateReservation = async (reservation: Partial<Reservation>) => {
  try {
    const response = await api.put(
      `/reservations/${reservation.id}`,
      reservation
    )
    return response.data
  } catch (error) {
    console.log(error)
  }
}

export default updateReservation
