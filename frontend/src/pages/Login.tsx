import Header from './Header';
import '../styles/styleLogin.css'; 
import { Link} from 'react-router-dom';

function Login() {
    return (
      <>
      <Header />
      <section>
        <div className="form-box">
          <div className="form-value">
            <h2>Un</h2>
            <div className="inputbox">
              <label htmlFor="email">Usuario</label>
              <input
                type="email"
                id="email"
                name="email"
              />
            </div>
            <div className="inputbox">
              <label htmlFor="password">Contraseña</label>
              <input
                type="password"
                id="password"
                name="password"
              />
            </div>
            <div className="forget">
                <Link to="/ResetPassword">¿Olvidaste tú contraseña?</Link>
            </div>
            <button>Ingresar</button>
            <div className="register">
                <p>¿No tienes una cuenta? <Link to="/Register">Registrar</Link></p>
            </div>
          </div>

        </div>
      </section>
      </>
    );
  }
  

export default Login;