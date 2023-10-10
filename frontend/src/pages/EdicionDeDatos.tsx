import Header from "../components/Header"
//import { Link } from 'react-router-dom';
import "../styles/styleEdicionDeDatos.css"
import imagen from "../assets/Imagenes/UseriImage.png"

function EdicionDeDatos() {
  return (
    <div className="contenerdor-Edicion-de-datos">
      <Header />
      <div className="contenerdor-Edicion-de-datos-contenido">
        <div className="columna-izquierda">
          <img
            src={imagen}
            alt="imgen del usuario"
            className="imgen-de-usuario"
          />
          <div className="contenedor-historial">
            <h1 className="titulo-historial-usuaro">Historial</h1>
            <p className="prestamos-usuario 1">asdljkalskdjasdasdasd 10:20</p>
            <p className="prestamos-usuario 2">
              alskdjlaskjdlaksjdlkajsdlkj 1:50
            </p>
            <p className="prestamos-usuario 3">asdljkalskdjasdasdasd 10:20</p>
            <p className="prestamos-usuario 4">
              alskdjlaskjdlaksjdlkajsdlkj 1:50
            </p>
            <p className="prestamos-usuario 5">asdljkalskdjasdasdasd 10:20</p>
            <p className="prestamos-usuario 6">
              alskdjlaskjdlaksjdlkajsdlkj 1:50
            </p>
            <p className="prestamos-usuario 7">asdljkalskdjasdasdasd 10:20</p>
            <p className="prestamos-usuario 8">
              alskdjlaskjdlaksjdlkajsdlkj 1:50
            </p>
          </div>
        </div>
        <div className="columa-derecha">
          <div>
            <p className="titulo-camio-informacion">cambiar tu ...</p>
            <input />
          </div>
          <div>
            <p className="titulo-camio-informacion">cambiar tu ...</p>
            <input />
          </div>
          <div>
            <p className="titulo-camio-informacion">cambiar tu ...</p>
            <input />
          </div>
          <div>
            <p className="titulo-camio-informacion">cambiar tu ...</p>
            <input />
          </div>
          <div>
            <p className="titulo-camio-informacion">cambiar tu ...</p>
            <input />
          </div>
        </div>
      </div>
    </div>
  )
}

export default EdicionDeDatos
