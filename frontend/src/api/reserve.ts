import api from "."

const reserve = async (reservationId: number) => {
  try {
    const response = await api.put("/reserve", {
      reservation_id: reservationId,
    })
    return response.data
  } catch (error) {
    console.log(error)
  }
}

export default reserve
