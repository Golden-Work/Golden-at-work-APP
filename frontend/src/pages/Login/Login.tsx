import classes from "./Login.module.css"
import { useNavigate, Link } from "react-router-dom"
import { useState } from "react"
import PopupErrorLogin from "@/components/PopupErrorLogin/PopupErrorLogin"
import axios from "axios"
import TextField from "@mui/material/TextField"
import { Paper, Typography } from "@mui/material"
import LoadingButton from "@mui/lab/LoadingButton"

function Login() {
  const navigate = useNavigate()
  const [showMyModal, setShowMyModal] = useState(false)
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const handleOnClose = () => setShowMyModal(false)
  const [isLoading, setIsLoading] = useState(false)

  const handleLogin = async () => {
    setIsLoading(true)
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_APP_BASE_URL}auth/login`,
        {
          email,
          password,
        }
      )
      if (response.status === 200) {
        localStorage.setItem("access", response.data.access)
        localStorage.setItem("refresh", response.data.refresh)
        navigate("/")
      }
    } catch (error) {
      setShowMyModal(true)
    }
    setIsLoading(false)
  }

  return (
    <section className={classes.container}>
      <PopupErrorLogin onClose={handleOnClose} visible={showMyModal} />
      <Paper sx={{ p: 6 }}>
        <Typography variant="h4" fontWeight={600} textAlign="center" mb={2}>
          Login
        </Typography>
        <TextField
          label="Email"
          placeholder="johndoe@unal.edu.co"
          type="email"
          variant="standard"
          fullWidth
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          sx={{ mb: 1 }}
        />
        <TextField
          label="Contraseña"
          type="password"
          variant="standard"
          fullWidth
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <div className={classes.forget}>
          <Link to="/reset-password">¿Olvidaste tú contraseña?</Link>
        </div>
        <LoadingButton
          onClick={handleLogin}
          fullWidth
          loading={isLoading}
          variant="contained"
        >
          Ingresar
        </LoadingButton>
        <div className={classes.register}>
          <p>
            ¿No tienes una cuenta? <Link to="/signup">Regístrate</Link>
          </p>
        </div>
      </Paper>
    </section>
  )
}

export default Login
