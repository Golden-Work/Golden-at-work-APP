import verifyPassword from "@/utils/verifyPassword"
import { useState } from "react"
import { useNavigate } from "react-router"
import axios from "axios"
import { toast } from "react-toastify"

function useResetPassword(token: string | null) {
  const [email, setEmail] = useState(
    localStorage.getItem("resetPasswordEmail") || ""
  ) 
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const navigate = useNavigate()

  const handleResetPassword = async () => {
    setIsLoading(true)
    try {
      if (token) {
        if (!verifyPassword(password, confirmPassword)) return
        if (!email.endsWith("@unal.edu.co")) {
          toast.error("Por favor ingrese un correo electrónico de la UNAL")
        }
        const response = await axios.post(
          `${import.meta.env.VITE_APP_BASE_URL}auth/reset-password/${token}`,
          {
            email,
            password,
          }
        )

        if (response.status === 200) {
          toast.success("Se ha restablecido la contraseña")
          localStorage.removeItem("resetPasswordEmail")
          navigate("/login")
        }
      } else {
        const response = await axios.post(
          `${import.meta.env.VITE_APP_BASE_URL}auth/reset-password`,
          {
            email,
          }
        )

        if (response.status === 200) {
          localStorage.setItem("resetPasswordEmail", email)
          toast.success(
            "Se ha enviado un correo para restablecer la contraseña"
          )
          setEmail("")
        }
      }
    } catch (error: any) {
      if (error.response?.data?.message) {
        toast.error(error.response?.data?.message)
      } else {
        toast.error("Ha ocurrido un error")
      }
    }
    setIsLoading(false)
  }

  return {
    email,
    setEmail,
    password,
    setPassword,
    confirmPassword,
    setConfirmPassword,
    handleResetPassword,
    isLoading,
  }
}

export default useResetPassword
