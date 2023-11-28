import { useEffect, useMemo, useState } from "react"
import api from "@/api"
import { User } from "@/interfaces/user.interface"
import useMajors from "@/hooks/useMajors"

const getUsers = () => {
  const [user, setUser] = useState<User>()
  const [isFetching, setIsFetching] = useState(false)
  const { majorOptions } = useMajors()

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
