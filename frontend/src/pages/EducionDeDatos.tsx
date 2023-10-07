import Header from './Header';
//import { Link } from 'react-router-dom';
import '../styles/styleEdicionDeDatos.css';
import CasillaEdicion from '../Componentes/CasillaEdicion'
import imagen from '../assets/Imagenes/UseriImage.png'


function EdicionDeDatos() {


  return (
    <div className='contenerdor-Edicion-de-datos'>
      <Header />
      <div className='contenerdor-Edicion-de-datos-contenido'>
        <div className='columna-izquierda'>
          <img src={imagen} alt="imgen del usuario" />
          <div>
            <h1>Historial</h1>
            <p>asdljkalskdjasdasdasd 10:20</p>
            <p>alskdjlaskjdlaksjdlkajsdlkj 1:50</p>
            <p>asdljkalskdjasdasdasd 10:20</p>
            <p>alskdjlaskjdlaksjdlkajsdlkj 1:50</p>
            <p>asdljkalskdjasdasdasd 10:20</p>
            <p>alskdjlaskjdlaksjdlkajsdlkj 1:50</p>
            <p>asdljkalskdjasdasdasd 10:20</p>
            <p>alskdjlaskjdlaksjdlkajsdlkj 1:50</p>
          </div>
        </div>
        <div className='columa-derecha'>
          <CasillaEdicion textoDefault=""/>
          <CasillaEdicion textoDefault=""/>
          <CasillaEdicion textoDefault=""/>
          <CasillaEdicion textoDefault=""/>
          <CasillaEdicion textoDefault=""/>
          <CasillaEdicion textoDefault=""/>
        </div> 
      </div>
    </div>
  )
} 

export default EdicionDeDatos;

