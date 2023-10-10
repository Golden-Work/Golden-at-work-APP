import { SignupBody } from "@/interfaces"
import showErrors from "@/utils/showErrors"
import axios from "axios"
import { useState } from "react"
import { useNavigate } from "react-router"
import { toast } from "react-toastify"

const useSignup = () => {
  const navigate = useNavigate()
  const [isLoading, setIsLoading] = useState(false)

  const signup = async (data: SignupBody) => {
    setIsLoading(true)
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_APP_BASE_URL}auth/signup`,
        data
      )

      if (response.status === 201) {
        toast.success("Usuario registrado")
        navigate("/login")
      } else {
        toast.error("An error occurred, please try again later")
      }
    } catch (error: any) {
      showErrors(error)
    }
    setIsLoading(false)
  }

  return {
    signup,
    isLoading,
  }
}

export default useSignup
