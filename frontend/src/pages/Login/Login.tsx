import classes from "./Login.module.css"
import { Link } from "react-router-dom"
import PopupErrorLogin from "@/components/PopupErrorLogin/PopupErrorLogin"
import TextField from "@mui/material/TextField"
import { Paper, Typography } from "@mui/material"
import LoadingButton from "@mui/lab/LoadingButton"
import useLogin from "@/hooks/useLogin"

function Login() {
  const {
    handleLogin,
    handleOnClose,
    showMyModal,
    email,
    setEmail,
    password,
    setPassword,
    isLoading,
  } = useLogin()
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
