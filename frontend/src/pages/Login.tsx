import Header from './Header';
import '../styles/styleLogin.css'; 
import { useNavigate, Link} from 'react-router-dom';

function Login() {
  const navigate=useNavigate();
  const handleLogin=()=>{
    const authSuccessful= true;
    if(authSuccessful){
      navigate('/Home');
    }else{

    }
  }
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
            <button onClick={handleLogin}>Ingresar</button>
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