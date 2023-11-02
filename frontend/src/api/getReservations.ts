import { Reservation } from "@/interfaces/reservation.interface"
import api from "."
import { toast } from "react-toastify"

const getReservations = async () => {
  try {
    const response = await api.get("/reservations")
    const items = response.data
    return items as Reservation[]
  } catch (e) {
    toast.error("Error while fetching reservations")
    console.log(e)
  }
}

export default getReservations
