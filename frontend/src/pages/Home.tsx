import { Link } from "react-router-dom";
import logo from "../assets/Imagenes/Logo-placejolder.png";
import Boton from "../Componentes/Boton";
import BarraDeBusqueda from "../Componentes/BarraDeBusqueda";
import ImagenDeScroll from "../Componentes/ImagenDeScroll";
import "../Hojas-de-estilo/Home.css";

// div>p.parrafo-*7>div*4

function Home() {
  //const [count, setCount] = useState(0)

  const redireccionar = () => {
    console.log("Redireccionar");
  };
  const filtro = () => {
    console.log("Filtro");
  };

  return (
    <>
      <div className="contenedor-encabezado">
        <header className="encabezado">
          <img
            className="Logo-encabezado"
            src={logo}
            alt="Logo (descripcion del logo)"
          />

          <nav className="barra-de-navegacion">
            <div className="contenedor-busqueda">
              <BarraDeBusqueda textoDefault="" />
            </div>

            <div className="contenedor-botones">
              <Boton
                texto="Boton 1"
                esDeRedireccionamiento={true}
                manejarClick={redireccionar}
              />

              <Boton
                texto="Boton 2"
                esDeRedireccionamiento={true}
                manejarClick={redireccionar}
              />

              <Link to="/Login">
                <Boton
                  texto="Ingresar"
                  esDeRedireccionamiento={true}
                  manejarClick={redireccionar}
                />
              </Link>
            </div>
          </nav>
        </header>

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
        </div>
      </div>

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
          <div className="tabla"></div>
          <div className="seccion-de-noticias">
            <p className="encabezado-noticias"></p>
          </div>
        </div>
      </div>
    </>
  );
}

export default Home;
