import Header from "./Header"
import "../styles/styleLogin.css"
import { useNavigate, Link } from "react-router-dom"
import { useState } from "react"
import MyModal from "../Componentes/PopupErrorLogin"
import axios from "axios"

function Login() {
  const navigate = useNavigate()
  const [showMyModal, setShowMyModal] = useState(false)
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const handleOnClose = () => setShowMyModal(false)

  const handleLogin = async () => {
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_APP_BASE_URL}auth/login`,
        {
          email,
          password,
        }
      )
      if (response.status === 200) {
        localStorage.setItem("token", response.data.access)
        localStorage.setItem("refresh", response.data.refresh)
        navigate("/Home")
      }
    } catch (error) {
      console.error(error)
      setShowMyModal(true)
    }
  }

  return (
    <>
      <Header />
      <section>
        <MyModal onClose={handleOnClose} visible={showMyModal} />
        <div className="form-box">
          <div className="form-value">
            <h2>Un</h2>
            <div className="inputbox">
              <label htmlFor="email">Usuario</label>
              <input
                type="email"
                id="email"
                name="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="inputbox">
              <label htmlFor="password">Contraseña</label>
              <input
                type="password"
                id="password"
                name="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <div className="forget">
              <Link to="/ResetPassword">¿Olvidaste tú contraseña?</Link>
            </div>
            <button onClick={handleLogin}>Ingresar</button>
            <div className="register">
              <p>
                ¿No tienes una cuenta? <Link to="/Register">Registrar</Link>
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}

export default Login
