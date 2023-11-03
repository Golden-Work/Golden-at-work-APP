import getReservations from "@/api/getReservations"
import getImplements from "@/api/getImplements"
import { useQuery } from "@tanstack/react-query"
import { useParams } from "react-router-dom"
import { useMemo } from "react"

// export interface Reservation {
//   id: number
//   start_date: string
//   end_date: string
//   implement: Implement
//   status: string
//   return_label: string
//   return_state_description: string
// }

const Reserve = () => {
  const { data: reservations = [] } = useQuery({
    queryKey: ["reservations"],
    queryFn: getReservations,
  })

  const { data: items = [] } = useQuery({
    queryKey: ["implements"],
    queryFn: getImplements,
  })

  const params = useParams()
  const selectedItem = useMemo(() => {
    const { id } = params
    if (!id) {
      return null
    }
    // check if params.id is a number
    if (isNaN(Number(id))) {
      return null
    }
    return items.find((item) => item.id === Number(id)) || null
  }, [params.id, items])

  const reservationsOfSelectedItem = useMemo(() => {
    if (!selectedItem) {
      return []
    }
    return reservations.filter(
      (reservation) => reservation.implement.id === selectedItem.id
    )
  }, [selectedItem, reservations])

  console.log(reservationsOfSelectedItem)

  return <div></div>
}

export default Reserve
