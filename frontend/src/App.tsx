//import { useState } from 'react'
import './App.css'
import logo from './Imagenes/test-1.jpg'
import Boton from './Componentes/Boton'
import BarraDeBusqueda from './Componentes/BarraDeBusqueda'
import ImagenDeScroll from './Componentes/ImagenDeScroll'


function App() {

  //const [count, setCount] = useState(0)

  const redireccionar =()=>{
    console.log('Redireccionar')
  }
  const filtro =()=>{
    console.log('Redireccionar')
  }

  return (
    <>
    <div className='contenedor-encabezado'>

      <header className='encabezado'>

        <img 
          className='Logo-encabezado' 
          src={logo}
          alt='Logo (descripcion del logo)'/>

        <nav className='barra-de-navegacion'>

          <BarraDeBusqueda 
          default='' />

          <Boton 
              texto = ''
              esDeRedireccionamiento ={'#'}
              manejarclick={redireccionar} />

            <Boton 
              texto = ''
              esDeRedireccionamiento ={'#'}
              manejarclick={redireccionar} />

            <Boton 
              texto = ''
              esDeRedireccionamiento ={'#'}
              manejarclick={redireccionar} />  

        </nav>

      </header>

      <div className='contenedor-de-filtros'>

        <Boton 
          texto = ''
          esDeRedireccionamiento ={'#'}
          manejarclick={filtro} />

        <Boton 
          texto = ''
          esDeRedireccionamiento ={'#'}
          manejarclick={filtro} />

        <Boton 
          texto = ''
          esDeRedireccionamiento ={'#'}
          manejarclick={filtro} />

      </div>

    </div>

    <div className='contenedor-principal'>

      <div className='Contenedor-de-scrol-de.imagenes'>

        <ImagenDeScroll 
          imagen =''
          texto ='' />
        
        <ImagenDeScroll 
          imagen =''
          texto ='' />
        
        <ImagenDeScroll 
          imagen =''
          texto ='' />
        
        <ImagenDeScroll 
          imagen =''
          texto ='' />
        
      </div>
      <div className='contenedor-de-parte-baja'>
        <div className='tabla'>

        </div>
        <div className='seccion-de-noticias'>
          <p className='encabezado-noticias'></p>

        </div>
      </div>
    </div>
    </>
  )
}

export default App
