import { useEffect, useState } from "react"
import { useParams, useSearchParams } from "react-router-dom"
import api from "@/api"
import { Box, CircularProgress } from "@mui/material"
import { CheckCircle } from "@mui/icons-material"

const CancelReservation = () => {
  const params = useParams<{ id: string }>()
  const [searchParams] = useSearchParams()
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")

  useEffect(() => {
    const id = params.id
    const token = searchParams.get("token")

    if (!id || !token) {
      return
    }

    api
      .put(`cancel/${id}`, { token })
      .then(() => {
        setLoading(false)
      })
      .catch((e) => {
        setLoading(false)
        setError(e.response?.data?.message || e.message)
      })
  }, [])

  return (
    <Box
      sx={{
        position: "absolute",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
      }}
    >
      {loading && <CircularProgress size={100} />}
      {error && <div>{error}</div>}
      {!loading && !error && (
        <Box display="flex" alignItems="center" gap={1}>
          <div>Reserva cancelada</div>
          <CheckCircle />
        </Box>
      )}
    </Box>
  )
}

export default CancelReservation
