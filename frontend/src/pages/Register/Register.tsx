import { useState } from "react"
import classes from "./Register.module.css"
import { Box, Paper, TextField, Typography } from "@mui/material"
import GwMajorSelect from "@/components/GwMajorSelect/GwMajorSelect"
import verifyPassword from "@/utils/verifyPassword"
import useSignup from "@/hooks/useSignup"
import { SignupBody } from "@/interfaces"
import { toast } from "react-toastify"
import LoadingButton from "@mui/lab/LoadingButton"
import * as React from "react"
import axios from "axios"
import Switch from "@mui/material/Switch"
import { useTranslation } from "react-i18next"

function Register() {
  const { t } = useTranslation()
  const [formData, setFormData] = useState<SignupBody>({
    email: "",
    password: "",
    confirm_password: "",
    first_name: "",
    last_name: "",
    document: "",
    major: "",
  })

  const handleWelcomeEmail = async () => {
    const eemail = formData.email
    try {
      await axios.post(
        `${import.meta.env.VITE_APP_BASE_URL}auth/welcome_email`,
        { eemail }
      )
    } catch (error) {
      console.error("Error al enviar el correo de bienvenida", error)
      throw error
    }
  }

  const { signup, isLoading } = useSignup()

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }))
  }
  const [isSwitchChecked, setIsSwitchChecked] = useState(false)

  const handleRegister = async () => {
    const errors = []
    if (formData.major === -1) {
      errors.push("Por favor seleccione un programa académico")
    }
    if (!formData.first_name) {
      errors.push("Por favor ingrese su nombre")
    }
    if (!formData.last_name) {
      errors.push("Por favor ingrese su apellido")
    }
    if (!formData.document) {
      errors.push("Por favor ingrese su documento")
    }
    if (!formData.email) {
      errors.push("Por favor ingrese su correo electrónico")
    }
    if (formData.password != formData.confirm_password) {
      errors.push("Las contraseñas no coinciden.")
    }

    if (!formData.email.endsWith("@unal.edu.co")) {
      errors.push("Por favor ingrese un correo electrónico de la UNAL")
    }
    if (!isSwitchChecked) {
      errors.push(
        "Debe autorizar el uso y la recopilación de datos para continuar."
      )
    }
    if (errors.length) {
      return errors.forEach((error) => toast.error(error))
    }

    if (verifyPassword(formData.password, formData.confirm_password)) {
      signup(formData)
      handleWelcomeEmail()
    }
  }
  const label = { inputProps: { "aria-label": "Size switch demo" } }

  return (
    <section className={classes.container}>
      <Paper sx={{ p: 6 }}>
        <Typography variant="h4" fontWeight={600} textAlign="center" mb={2}>
          {t("Registro")}
        </Typography>
        <div className={classes.columnContainer}>
          <div className={classes.column}>
            <TextField
              label={t("Nombre")}
              type="text"
              name="first_name"
              value={formData.first_name}
              variant="standard"
              onChange={handleInputChange}
              fullWidth
              sx={{ mb: 1 }}
            />
            <TextField
              label={t("Email")}
              placeholder="johndoe@unal.edu.co"
              type="email"
              variant="standard"
              name="email"
              value={formData.email}
              fullWidth
              onChange={handleInputChange}
              sx={{ mb: 1 }}
            />
            <TextField
              label={t("Contraseña")}
              type="password"
              name="password"
              variant="standard"
              value={formData.password}
              fullWidth
              onChange={handleInputChange}
            />
          </div>
          <div className={classes.column}>
            <TextField
              label={t("Apellido")}
              type="text"
              name="last_name"
              value={formData.last_name}
              variant="standard"
              onChange={handleInputChange}
              fullWidth
              sx={{ mb: 1 }}
            />
            <TextField
              label={t("Documento")}
              type="text"
              name="document"
              value={formData.document}
              variant="standard"
              onChange={handleInputChange}
              fullWidth
              sx={{ mb: 1 }}
            />
            <TextField
              label={t("Confirmar contraseña")}
              type="password"
              name="confirm_password"
              variant="standard"
              value={formData.confirm_password}
              fullWidth
              onChange={handleInputChange}
            />
          </div>
        </div>

        <GwMajorSelect
          value={formData.major}
          onChange={(e) =>
            setFormData((prevState) => ({
              ...prevState,
              major: e.target.value as number,
            }))
          }
        />
        <Box mt={3}>
          <Typography sx={{ padding: "10px 0" }}>
            {t(
              "Al crear su cuenta, autoriza el uso y la recopilación de sus datos personales para esta aplicación."
            )}
            <Switch
              {...label}
              checked={isSwitchChecked}
              onChange={(event) => setIsSwitchChecked(event.target.checked)}
            />
          </Typography>
          <LoadingButton
            onClick={handleRegister}
            fullWidth
            loading={isLoading}
            variant="contained"
          >
            {t("Registrarse")}
          </LoadingButton>
        </Box>
      </Paper>
    </section>
  )
}

export default Register
