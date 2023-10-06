//import { Link } from "react-router-dom";
import logo from "../assets/Imagenes/Logo-placejolder.png";
import Boton from "../Componentes/Boton";
import BarraDeBusqueda from "../Componentes/BarraDeBusqueda";
import ImagenDeScroll from "../Componentes/ImagenDeScroll";
import "../Hojas-de-estilo/Home.css";
import Tabla from "../Componentes/Tabla";

// div>p.parrafo-*7>div*4

function Home() {
  //const [count, setCount] = useState(0)

  const datos = [
    ['Pelota', 'Ocupada', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore'],
    ['freesbie', 'Libre', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore'],
    ['Pelota', 'Ocupada', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore'],
    ['Ajedrez', 'Libre', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore'],
    ['uno', 'Libre', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore'],
    ['4 en raya', 'Ocupada', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore'],
  ];

  const redireccionar = () => {
    console.log("Redireccionar");
  };
  const filtro = () => {
    console.log("Filtro");
  };

  return (
    <>
      <header className="encabezado">
        <div className="contendedor-logo">
          <img
            className="logo-encabezado"
            src={logo}
            alt="Logo (descripcion del logo)"
          />
        </div>
        <nav className="navegacion">
          <div className="encabezado-superior">
            <div className="contenedor-busqueda">
              <BarraDeBusqueda textoDefault="" />
            </div>

            <div className="contenedor-botones">
              <Boton
                texto="Pedir"
                esDeRedireccionamiento={true}
                manejarClick={redireccionar}
              />

              <Boton
                texto="Traducir"
                esDeRedireccionamiento={true}
                manejarClick={redireccionar}
              />

              <Boton
                texto="Ingresar"
                esDeRedireccionamiento={true}
                manejarClick={redireccionar}
              />
            </div>
          </div>
          <div className="encabezado-inferior">
            <div className="contenedor-de-filtros">
              <Boton
                texto="Filtro 1"
                esDeRedireccionamiento={false}
                manejarClick={filtro}
              />

              <Boton
                texto="Filtro 2"
                esDeRedireccionamiento={false}
                manejarClick={filtro}
              />

              <Boton
                texto="Filtro 3"
                esDeRedireccionamiento={false}
                manejarClick={filtro}
              />

              <Boton
                texto="Filtro 4"
                esDeRedireccionamiento={false}
                manejarClick={filtro}
              />
            </div>
          </div>
        </nav>
      </header>
      
      <div className="contenedor-principal">
        <div className="Contenedor-de-scrol-de-imagenes">
          <ImagenDeScroll
            nombreDelObjeto="mesa"
            imagen={1}
            texto="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore"
          />

          <ImagenDeScroll
            nombreDelObjeto="Raqueta"
            imagen={2}
            texto="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore"
          />

          <ImagenDeScroll
            nombreDelObjeto="Ajedrez"
            imagen={3}
            texto="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore"
          />

          <ImagenDeScroll
            nombreDelObjeto="futbolito"
            imagen={4}
            texto="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore"
          />

          <ImagenDeScroll
            nombreDelObjeto="Parques"
            imagen={5}
            texto="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore"
          />

          <ImagenDeScroll
            nombreDelObjeto="Pelota"
            imagen={6}
            texto="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore"
          />
        </div>
        <div className="contenedor-de-parte-baja">
          <div className="contenedor-tabla">
            <Tabla
            datos={datos}
            palabraClave="Libre"
            />
          </div>
          <div className="seccion-de-noticias">
            <p className="encabezado-noticias"></p>
          </div>
        </div>
      </div>
    </>
  );
}

export default Home;
