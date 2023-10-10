import classes from "./ResetPassword.module.css"
import { Button, Paper, TextField, Typography } from "@mui/material"
import { useState } from "react"
import axios from "axios"
import { toast } from "react-toastify"
import { useSearchParams } from "react-router-dom"
import { useNavigate } from "react-router-dom"

function ResetPassword() {
  const [email, setEmail] = useState(
    localStorage.getItem("resetPasswordEmail") || ""
  )

  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")

  const [searchParams, _] = useSearchParams()
  const token = searchParams.get("token")

  const navigate = useNavigate()

  const handleResetPassword = () => {
    if (token) {
      if (password !== confirmPassword) {
        return toast.error("Las contraseñas no coinciden")
      }

      axios
        .post(
          `${import.meta.env.VITE_APP_BASE_URL}auth/reset-password/${token}`,
          {
            email,
            password,
          }
        )
        .then((response) => {
          if (response.status === 200) {
            toast.success("Se ha restablecido la contraseña")
            localStorage.removeItem("resetPasswordEmail")
            navigate("/login")
          }
        })
        .catch((error) => {
          if (error.response?.data?.message) {
            return toast.error(error.response?.data?.message)
          }
          toast.error("Ha ocurrido un error al restablecer la contraseña")
        })
      return
    }

    axios
      .post(`${import.meta.env.VITE_APP_BASE_URL}auth/reset-password`, {
        email,
      })
      .then((response) => {
        if (response.status === 200) {
          localStorage.setItem("resetPasswordEmail", email)
          toast.success(
            "Se ha enviado un correo para restablecer la contraseña"
          )
          setEmail("")
        }
      })
      .catch((error) => {
        if (error.response?.data?.message) {
          return toast.error(error.response?.data?.message)
        }
        toast.error("Ha ocurrido un error al enviar el correo")
      })
  }

  return (
    <section className={classes.container}>
      <Paper sx={{ p: 6 }}>
        <Typography variant="h4" fontWeight={600} textAlign="center" mb={2}>
          Recuperar contraseña
        </Typography>
        {!token && (
          <Typography variant="body1" textAlign="center" mb={2}>
            Ingrese su correo electrónico para recuperar su contraseña
          </Typography>
        )}

        <TextField
          label="Email"
          placeholder="johndoe@unal.edu.co"
          type="email"
          variant="standard"
          value={email}
          fullWidth
          onChange={(e) => setEmail(e.target.value)}
        />
        {token && (
          <>
            <TextField
              label="Nueva contraseña"
              type="password"
              variant="standard"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              fullWidth
              sx={{ mt: 2 }}
            />
            <TextField
              label="Confirmar contraseña"
              type="password"
              variant="standard"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              fullWidth
              sx={{ mt: 2 }}
            />
          </>
        )}
        <Button
          variant="contained"
          fullWidth
          sx={{ mt: 2 }}
          onClick={handleResetPassword}
        >
          Enviar
        </Button>
      </Paper>
    </section>
  )
}

export default ResetPassword
