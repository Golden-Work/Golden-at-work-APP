import Header from "../components/Header"
import { Link } from "react-router-dom"
import "../styles/styleReset.css"

function ResetPassword() {
  return (
    <div className="contenerdor-reset">
      <Header />
      <div className="form-box_rt form-box-rt2">
        <h2 id="title">Un</h2>
        <p>Introduce tu dirección de correo electrónico de recuperación.</p>
        <div className="inputbox_rt">
          <label htmlFor="password">Correo</label>
          <input type="password" id="password" name="password" />
        </div>
        <Link to="/ResetPassword2">
          <button>Siguiente</button>
        </Link>
      </div>
    </div>
  )
}

export default ResetPassword
