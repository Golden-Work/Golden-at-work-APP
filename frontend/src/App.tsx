//import { useState } from 'react'
import './App.css'
import logo from './assets/Imagenes/Logo-placejolder.png'
import Boton from './Componentes/Boton'
import BarraDeBusqueda from './Componentes/BarraDeBusqueda'
import ImagenDeScroll from './Componentes/ImagenDeScroll'


function App() {

  //const [count, setCount] = useState(0)

  const redireccionar =()=>{
    console.log('Redireccionar')
  }
  const filtro =()=>{
    console.log('Filtro')
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

          <div className='contenedor-busqueda'>

            <BarraDeBusqueda 
            textoDefault='' />

          </div>

          <div className='contenedor-botones'>
            <Boton 
                texto = 'Boton 1'
                esDeRedireccionamiento ={true}
                manejarClick={redireccionar} />

            <Boton 
              texto = 'Boton 2'
              esDeRedireccionamiento ={true}
              manejarClick={redireccionar} />

            <Boton 
              texto = 'Ingresar'
              esDeRedireccionamiento ={true}
              manejarClick={redireccionar} />  
          </div>  

        </nav>

      </header>

      <div className='contenedor-de-filtros'>

        <Boton 
          texto = 'Filtro 1'
          esDeRedireccionamiento ={false}
          manejarClick={filtro} />

        <Boton 
          texto = 'Filtro 2'
          esDeRedireccionamiento ={false}
          manejarClick={filtro} />

        <Boton 
          texto = 'Filtro 3'
          esDeRedireccionamiento ={false}
          manejarClick={filtro} />

      </div>

    </div>

    <div className='contenedor-principal'>

      <div className='Contenedor-de-scrol-de-imagenes'>

        <ImagenDeScroll
          nombreDelObjeto='' 
          imagen ={1}
          texto ='' />
        
        <ImagenDeScroll
          nombreDelObjeto='' 
          imagen ={2}
          texto ='' />
        
        <ImagenDeScroll
          nombreDelObjeto='' 
          imagen ={3}
          texto ='' />
        
        <ImagenDeScroll
          nombreDelObjeto='' 
          imagen ={4}
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
