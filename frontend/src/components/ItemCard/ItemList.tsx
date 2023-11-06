import { useMemo } from "react"
import ItemCard from "./ItemCard"
import { useQuery } from "@tanstack/react-query"
import getReservations from "@/api/getReservations"
import { Implement } from "@/interfaces/implement.interface"
import Carousel from "react-material-ui-carousel"

const ItemList = () => {
  const { data: reservations = [] } = useQuery({
    queryKey: ["reservations"],
    queryFn: getReservations,
  })

  const items = useMemo(() => {
    // We want to group by item id and sum the quantity
    const grouped = reservations
      .filter((r) => r.status === "AVAILABLE")
      .reduce((acc, reservation) => {
        const { implement } = reservation
        const existing = acc.find((r) => r.id === implement.id)
        if (existing) {
          existing.quantity += 1
        } else {
          acc.push({ ...implement, quantity: 1 })
        }
        return acc
      }, [] as (Implement & { quantity: number })[])

    // Group by 3
    const groupedBy3 = grouped.reduce((acc, item, index) => {
      const groupIndex = Math.floor(index / 3)
      if (!acc[groupIndex]) {
        acc[groupIndex] = []
      }
      acc[groupIndex].push(item)
      return acc
    }, [] as (Implement & { quantity: number })[][])

    return groupedBy3
  }, [reservations])

  return (
    <Carousel
      autoPlay={false}
      swipe
      animation="slide"
      cycleNavigation
      duration={700}
    >
      {items.map((grouped, index) => (
        <div style={{ display: "flex", justifyContent: "center" }} key={index}>
          {grouped.map((item) => (
            <ItemCard
              key={item.id}
              id={item.id}
              img={item.image}
              description={item.description}
              quantity={item.quantity}
              name={item.name}
            />
          ))}
        </div>
      ))}
    </Carousel>
  )
}

export default ItemList
