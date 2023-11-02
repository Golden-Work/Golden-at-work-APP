import { useState, useRef, useMemo } from "react"
import { Box, IconButton } from "@mui/material"
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft"
import ChevronRightIcon from "@mui/icons-material/ChevronRight"
import ItemCard from "./ItemCard"
import { useQuery } from "@tanstack/react-query"
import getReservations from "@/api/getReservations"
import { Implement } from "@/interfaces/implement.interface"

const ItemList = () => {
  const containerRef = useRef<HTMLElement | null>(null)
  const [scrollLeft, setScrollLeft] = useState(0)

  const { data: reservations = [] } = useQuery({
    queryKey: ["reservations"],
    queryFn: getReservations,
  })

  const items = useMemo(() => {
    // We want to group by item id and sum the quantity
    const grouped = reservations.reduce((acc, reservation) => {
      const { implement } = reservation
      const existing = acc.find((r) => r.id === implement.id)
      if (existing) {
        existing.quantity += 1
      } else {
        acc.push({ ...implement, quantity: 1 })
      }
      return acc
    }, [] as (Implement & { quantity: number })[])

    return grouped
  }, [reservations])

  const handleLeftIconClick = () => {
    if (containerRef.current) {
      setScrollLeft(Math.max(scrollLeft - 300, 0))
    }
  }

  const handleRightIconClick = () => {
    if (containerRef.current) {
      const containerWidth = containerRef.current.clientWidth
      const scrollWidth = containerRef.current.scrollWidth
      setScrollLeft(Math.min(scrollLeft + 300, scrollWidth - containerWidth))
    }
  }
  const iconButtonStyles = {
    position: "absolute",
    top: "50%",
    transform: "translateY(-50%)",

    "&:active": {
      color: "purple",
    },
  }
  return (
    <Box
      className="item-list-container"
      sx={{
        position: "relative",
        width: "100%",
        overflowX: "hidden",
      }}
    >
      <Box
        className="item-list"
        sx={{
          display: "flex",
          alignItems: "center",
          padding: 1,
          gap: 2,

          transform: `translateX(${-scrollLeft}px)`,
          transition: "transform 0.3s ease-in-out",
        }}
        ref={containerRef}
      >
        {items.map((item) => (
          <ItemCard
            key={item.id}
            name={item.name}
            img={item.image}
            description={item.description}
          />
        ))}
      </Box>
      <IconButton
        sx={{
          ...iconButtonStyles,
          left: 0,
        }}
        onClick={handleLeftIconClick}
      >
        <ChevronLeftIcon sx={{ fontSize: 40 }} />
      </IconButton>

      <IconButton
        sx={{
          ...iconButtonStyles,
          right: 0,
        }}
        onClick={handleRightIconClick}
      >
        <ChevronRightIcon sx={{ fontSize: 40 }} />
      </IconButton>
    </Box>
  )
}

export default ItemList
