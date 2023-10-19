import { useNavigate } from "react-router"
import api from "@/api"

function useDeleteUser() {
  const navigate = useNavigate()
  const deleteUser = async () => {
    const response = await api.delete(`auth/delete`)
    if (response.status === 200) {
      navigate("/login")
      localStorage.clear()
    }
  }
  return {
    deleteUser,
  }
}

export default useDeleteUser
