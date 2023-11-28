import { useState } from "react"
import classes from "./EditProfile.module.css"
import { Avatar, Box, Paper, TextField, Typography } from "@mui/material"
import GwMajorSelect from "@/components/GwMajorSelect/GwMajorSelect"
import useSignup from "@/hooks/useSignup"
import { SignupBody } from "@/interfaces"
import { toast } from "react-toastify"
import LoadingButton from "@mui/lab/LoadingButton"
import * as React from "react"
// import axios from "axios"
import { useNavigate } from "react-router-dom"

function EditProfile() {
  const navigate = useNavigate()

  const [formData, setFormData] = useState<SignupBody>({
    first_name: "",
    last_name: "",
    email: "",
    document: "",
    password: "",
    confirm_password: "",
    major: "",
  })

  const { signup, isLoading } = useSignup()
  console.log(signup)

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }))
  }

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
    if (errors.length) {
      return errors.forEach((error) => toast.error(error))
    }
  }

  return (
    <section className={classes.columnContainer}>
      <div className={classes.column}>
        <Paper sx={{ p: 6 }}>
          <Typography variant="h4" fontWeight={600} textAlign="center" mb={2}>
            Imagen de Perfil
          </Typography>
          <Avatar
            sx={{
              width: 120,
              height: 120,
              bgcolor: "#b1a4ed",
              margin: "auto",
            }}
          >
            M
          </Avatar>
          <Typography sx={{ padding: "10px 0" }}>
            La imagen debe ser JPG o PNG no más grande de 5 MB
          </Typography>
          <LoadingButton fullWidth loading={isLoading} variant="contained">
            Subir imagen
          </LoadingButton>
        </Paper>
      </div>

      <div className={classes.column}>
        <Paper sx={{ p: 6 }}>
          <Typography variant="h4" fontWeight={600} textAlign="center" mb={2}>
            Edicion de datos
          </Typography>
          <div
            className={classes.columnContainer}
            style={{ padding: "0 10px 10px 10px" }}
          >
            <div className={classes.column}>
              <TextField
                label="Nombre"
                type="text"
                name="first_name"
                value={formData.first_name}
                variant="standard"
                onChange={handleInputChange}
                fullWidth
                sx={{ mb: 1 }}
              />
              <TextField
                label="Email"
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
                label="Contraseña"
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
                label="Apellido"
                type="text"
                name="last_name"
                value={formData.last_name}
                variant="standard"
                onChange={handleInputChange}
                fullWidth
                sx={{ mb: 1 }}
              />
              <TextField
                label="Documento"
                type="text"
                name="document"
                value={formData.document}
                variant="standard"
                onChange={handleInputChange}
                fullWidth
                sx={{ mb: 1 }}
              />
              <TextField
                label="Confirmar contraseña"
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
          <Box mt={3} sx={{ display: "flex", justifyContent: "space-around" }}>
            <LoadingButton
              variant="outlined"
              color="error"
              onClick={() => navigate("/")}
            >
              Cancelar
            </LoadingButton>
            <LoadingButton
              onClick={handleRegister}
              loading={isLoading}
              variant="contained"
            >
              Actualizar
            </LoadingButton>
          </Box>
        </Paper>
      </div>
    </section>
  )
}

export default EditProfile
