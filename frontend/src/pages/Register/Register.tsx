import { useState } from "react"
import classes from "./Register.module.css"
import { Box, Button, Paper, TextField, Typography } from "@mui/material"
import GwMajorSelect from "@/components/GwMajorSelect/GwMajorSelect"
import verifyPassword from "@/utils/verifyPassword"
import useSignup from "@/hooks/useSignup"
import { SignupBody } from "@/interfaces"
import { toast } from "react-toastify"

function Register() {
  const [formData, setFormData] = useState<SignupBody>({
    email: "",
    password: "",
    confirm_password: "",
    first_name: "",
    last_name: "",
    document: "",
    major: -1,
  })

  const { signup } = useSignup()

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
    if (errors.length) {
      return errors.forEach((error) => toast.error(error))
    }

    if (!verifyPassword(formData.password, formData.confirm_password)) return
    signup(formData)
  }

  return (
    <section className={classes.container}>
      <Paper sx={{ p: 6 }}>
        <Typography variant="h4" fontWeight={600} textAlign="center" mb={2}>
          Registro
        </Typography>
        <div className={classes.columnContainer}>
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
        <Box mt={3}>
          <Button onClick={handleRegister} variant="contained" fullWidth>
            Registrarse
          </Button>
        </Box>
      </Paper>
    </section>
  )
}

export default Register
