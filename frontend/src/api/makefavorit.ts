import api from "."

const updateFavorits = async (id: number) => {
  try {
    const response = await api.put(
      `/favorits/${id}`,
      
    )
    return response.data
  } catch (error) {
    console.log(error)
  }
}

export default updateFavorits