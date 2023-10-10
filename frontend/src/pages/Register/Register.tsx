import { useEffect, useMemo, useState } from "react"
import classes from "./Register.module.css"
import axios from "axios"
import { toast } from "react-toastify"
import {
  Box,
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  TextField,
  Typography,
} from "@mui/material"
import { Major } from "@/interfaces"
import { useNavigate } from "react-router"

type FormDataType = {
  email: string
  password: string
  confirm_password?: string
  first_name: string
  last_name: string
  document: string
  major: number
}

function Register() {
  const navigate = useNavigate()
  const [formData, setFormData] = useState<FormDataType>({
    email: "",
    password: "",
    confirm_password: "",
    first_name: "",
    last_name: "",
    document: "",
    major: 1,
  })
  const [majors, setMajors] = useState<Major[]>([])

  useEffect(() => {
    document.title = "Registro"

    // if there is a user logged in, redirect to home page
    if (localStorage.getItem("token")) {
      navigate("/")
    }

    const getMajors = async () => {
      const response = await axios.get(
        `${import.meta.env.VITE_APP_BASE_URL}majors`
      )
      setMajors(response.data)
    }

    getMajors()
  }, [])

  const majorOptions = useMemo(() => {
    return majors.map((major) => ({
      value: major.id,
      label: major.name,
    }))
  }, [majors])

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }))
  }

  const handleRegister = async () => {
    if (formData.password !== formData.confirm_password) {
      toast.error("Las contraseñas no coinciden")
      return
    }

    if (formData.password.length < 8) {
      toast.error("La contraseña debe tener al menos 8 caracteres")
      return
    }

    // at least one number, one lowercase and one uppercase letter
    if (!/[a-z]/.test(formData.password)) {
      toast.error("La contraseña debe tener al menos una letra minúscula")
      return
    }

    if (!/[A-Z]/.test(formData.password)) {
      toast.error("La contraseña debe tener al menos una letra mayúscula")
      return
    }

    if (!/[0-9]/.test(formData.password)) {
      toast.error("La contraseña debe tener al menos un número")
      return
    }

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_APP_BASE_URL}auth/signup`,
        formData
      )

      if (response.status === 201) {
        toast.success("Usuario registrado")
        navigate("/login")
      } else {
        toast.error("An error occurred, please try again later")
      }
    } catch (error: any) {
      if (error?.response?.data) {
        Object.keys(error.response.data).forEach((key) => {
          toast.error(`${key}: ${error.response.data[key]}`)
        })
      }
    }
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
        <FormControl fullWidth size="small">
          <InputLabel id="major">Carrera</InputLabel>
          <Select
            labelId="major"
            value={formData.major}
            label="Carrera"
            name="career"
            onChange={(e) =>
              setFormData((prevState) => ({
                ...prevState,
                major: e.target.value as number,
              }))
            }
          >
            {majorOptions.map((major) => (
              <MenuItem value={major.value} key={major.value}>
                {major.label}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
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
