import { useState, useRef, useEffect } from 'react';
import '../styles/styleRegister.css'; 
import Header from './Header';

/*import { Link} from 'react-router-dom';*/

function FormBox() {
    const [mostrarMenu, setMostrarMenu] = useState(false);
    const contenedorRef = useRef<HTMLDivElement>(null);
  
    const consoleLog = () => {
      console.log("Adiós");
    };
  
    const toggleMenu = () => {
      setMostrarMenu(!mostrarMenu);
    };
  
    const handleClickOutside = (event: MouseEvent) => {
      if (contenedorRef.current && !contenedorRef.current.contains(event.target as Node)) {
        setMostrarMenu(false);
      }
    };
  
    useEffect(() => {
      document.addEventListener('mousedown', handleClickOutside);
  
      return () => {
        document.removeEventListener('mousedown', handleClickOutside);
      };
    }, []);  

  return (
<section>
    <div className="form-box_r">
        <div className="form-value_r">            
                <h2>Registro</h2>
                <div className="column-container_r">
                    <div className="column_r">
                        <div className="inputbox_r">                             
                            <label>Usuario</label>
                            <input
                                type="email"                                
                                name="email"
                                />
                            </div>
                        <div className="inputbox_r">
                            <label>Contraseña</label>                              
                            <input
                              type="password"                              
                              name="password"
                            />                            
                        </div>
                        <div className="inputbox_r">
                        <label>Confirme sú contraseña</label>                            
                            <input
                              type="password"                              
                              name="password"
                            /> 
                        </div>
                    </div>
                    <div className="column_r">
                        <div className="inputbox_r">                            
                            <label htmlFor="">Nombres</label>
                            <input
                              type="string"                        
                            />   
                        </div>
                        <div className="inputbox_r">                            
                            <label htmlFor="">Apellidos</label>
                            <input
                              type="string"                        
                            />                              
                        </div>
                        <div className="inputbox_r">                            
                            <label htmlFor="">Documento</label>
                            
                            <input
                              type="string"                        
                            />  
                        </div>
                    </div> 
                </div>
                <div className={`program_button ${mostrarMenu ? 'open' : ''}`} ref={contenedorRef}>
            <button id="program_button" onClick={toggleMenu}>
              Programa Curricular
            </button>
            {mostrarMenu && (
              <ul className="menu">
                <li><a onClick={consoleLog}>Ingeniería 0</a></li>
                <li><a href="#">Ingeniería 2</a></li>
                <li><a href="#">Ingeniería 3</a></li>
                <li><a href="#">Ingeniería 4</a></li>
              </ul>
            )}
          </div>
          <button id="registrar" onClick={consoleLog}>Registrar</button>
        </div>
    </div>
</section>


  );
}
function Register() {
  return (
    <div id="app-container">
        <Header/> 
        <FormBox/>      
    </div>
  );
}
export default Register