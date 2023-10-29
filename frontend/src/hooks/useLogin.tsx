import { useState } from "react"
import api from "@/api"
import { useNavigate } from "react-router-dom"

const useLogin = () => {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const navigate = useNavigate()
  const [showMyModal, setShowMyModal] = useState(false)
  const handleOnClose = () => setShowMyModal(false)

  const handleLogin = async () => {
    setIsLoading(true)
    try {
      const response = await api.post(`auth/login`, {
        email,
        password,
      })
      if (response.status === 200) {
        localStorage.setItem("access", response.data.access)
        localStorage.setItem("refresh", response.data.refresh)
        api.defaults.headers.common["Authorization"] =
          "Bearer " + response.data.access
        navigate("/")
      }
    } catch (error) {
      setShowMyModal(true)
    }
    setIsLoading(false)
  }

  return {
    email,
    setEmail,
    password,
    setPassword,
    isLoading,
    handleLogin,
    showMyModal,
    handleOnClose,
  }
}

export default useLogin
