import api from "."
import { Implement } from "@/interfaces/implement.interface"
import { toast } from "react-toastify"

const getImplements = async () => {
  try {
    const response = await api.get("/implements")
    const items = response.data
    return items as Implement[]
  } catch (e) {
    toast.error("Error while fetching implements")
    console.log(e)
  }
}

export default getImplements
