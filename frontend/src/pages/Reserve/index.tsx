import getReservations from "@/api/getReservations"
import getImplements from "@/api/getImplements"
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { useParams } from "react-router-dom"
import { useMemo, useState } from "react"
import { DateCalendar } from "@mui/x-date-pickers"
import dayjs from "dayjs"
import {
  Box,
  BoxProps,
  Button,
  CircularProgress,
  Grid,
  Typography,
  styled,
} from "@mui/material"
import { AccessTime, Event } from "@mui/icons-material"
import reserve from "@/api/reserve"
import { LoadingButton } from "@mui/lab"

interface StyledHourItemProps extends BoxProps {
  selected?: boolean
}

const StyledHourItem = styled(Box)<StyledHourItemProps>`
  background-color: ${({ selected }) =>
    selected ? "rgba(151, 6, 255, 0.1)" : "#fff"};
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  border: 1px solid rgba(151, 6, 255, 0.1);
`

const Reserve = () => {
  const queryClient = useQueryClient()

  const { data: reservations = [], isFetching: isFetchingReservations } =
    useQuery({
      queryKey: ["reservations"],
      queryFn: getReservations,
    })

  const { data: items = [], isFetching: isFetchingImplements } = useQuery({
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
      (reservation) =>
        reservation.implement.id === selectedItem.id &&
        reservation.status === "AVAILABLE"
    )
  }, [selectedItem, reservations])

  const minDate = dayjs()

  const maxDate = reservationsOfSelectedItem.reduce((acc, reservation) => {
    const endDate = dayjs(reservation.end_date)
    if (endDate.isAfter(acc)) {
      return endDate
    }
    return acc
  }, dayjs())

  const [selectedDate, setSelectedDate] = useState(dayjs())

  const reservationsOfSelectedDate = useMemo(() => {
    // Filter reservations by selected date (same day, not necessarily same hour)
    return reservationsOfSelectedItem.filter((reservation) => {
      const startDate = dayjs(reservation.start_date)
      return startDate.isSame(selectedDate, "day")
    })
  }, [selectedDate, reservationsOfSelectedItem])

  const mutation = useMutation({
    mutationFn: reserve,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["reservations"] })
    },
  })

  const [selectedReservation, setSelectedReservation] = useState(-1)

  if (isFetchingReservations || isFetchingImplements) {
    return (
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
        }}
      >
        <CircularProgress size={100} />
      </Box>
    )
  }

  return (
    <Box pt={5}>
      <Typography
        variant="h4"
        sx={{ mb: 2 }}
        textAlign="center"
        fontWeight={600}
      >
        Reservar {selectedItem?.name}
      </Typography>
      <Box
        sx={{
          margin: "auto",
          display: "flex",
          justifyContent: "center",
          maxWidth: 300,
        }}
      >
        <img
          src={selectedItem?.image}
          alt={selectedItem?.name}
          style={{ width: "100%" }}
        />
      </Box>
      <Grid container px={10}>
        <Grid item xs={12} md={6}>
          <Box>
            <Box
              display="flex"
              justifyContent="center"
              alignItems="center"
              gap={1}
            >
              <Event />
              <Typography variant="h5" fontWeight={600} textAlign="center">
                FECHA
              </Typography>
            </Box>
            <DateCalendar
              minDate={minDate}
              maxDate={maxDate}
              value={selectedDate}
              onChange={(date) => setSelectedDate(date as dayjs.Dayjs)}
            />
          </Box>
        </Grid>
        <Grid item xs={12} md={6}>
          <Box
            display="flex"
            justifyContent="center"
            alignItems="center"
            gap={1}
          >
            <AccessTime />
            <Typography variant="h5" fontWeight={600} textAlign="center">
              HORA
            </Typography>
          </Box>

          <Grid container spacing={1} mt={2}>
            {reservationsOfSelectedDate.map((reservation) => (
              <Grid item xs={4}>
                <StyledHourItem
                  selected={selectedReservation === reservation.id}
                >
                  <Button
                    sx={{ width: "100%", p: 1.5 }}
                    onClick={() => setSelectedReservation(reservation.id)}
                  >
                    <Typography key={reservation.id} pb={0} textAlign="center">
                      {dayjs(reservation.start_date).format("HH:mm")} -{" "}
                      {dayjs(reservation.end_date).format("HH:mm")}
                    </Typography>
                  </Button>
                </StyledHourItem>
              </Grid>
            ))}
          </Grid>
        </Grid>
      </Grid>

      <Box display="flex" justifyContent="center">
        <LoadingButton
          loading={mutation.isPending}
          variant="contained"
          size="large"
          onClick={() => {
            mutation.mutate(selectedReservation)
          }}
        >
          Reservar
        </LoadingButton>
      </Box>
    </Box>
  )
}

export default Reserve
