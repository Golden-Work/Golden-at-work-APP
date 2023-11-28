import { useEffect, useState } from "react"
import api from "@/api"
import { User } from "@/interfaces/user.interface"

const getUsers = () => {
  const [user, setUser] = useState<User>()
  const [isFetching, setIsFetching] = useState(false)

  useEffect(() => {
    const getUser = async () => {
      setIsFetching(true)
      const response = await api.get(`/auth/self`)
      setUser(response.data)
      setIsFetching(false)
    }
    getUser()
  }, [])

  return {
    user,
    isFetching,
  }
}

export default getUsers
