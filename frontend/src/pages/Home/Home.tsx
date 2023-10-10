import logo from "@/assets/Imagenes/Logo-placejolder.png"
import SearchBar from "../../components/SearchBar/SearchBar"
import ImagenDeScroll from "../../components/ImagenDeScroll"
import classes from "./Home.module.css"
import Tabla from "../../components/Tabla"
import Cards from "../../components/Cards"
import { useEffect } from "react"
import { useNavigate } from "react-router"

function Home() {
  const datos = [
    [
      "Pelota",
      "Ocupada",
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore",
    ],
    [
      "freesbie",
      "Libre",
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore",
    ],
    [
      "Pelota",
      "Ocupada",
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore",
    ],
    [
      "Ajedrez",
      "Libre",
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore",
    ],
    [
      "uno",
      "Libre",
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore",
    ],
    [
      "4 en raya",
      "Ocupada",
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore",
    ],
  ]

  const navigate = useNavigate()

  useEffect(() => {
    document.title = "Home"
    // if there is no user logged in, redirect to login page
    if (!localStorage.getItem("token")) {
      navigate("/login")
    }
  }, [])
  return (
    <>
      <header className={classes.header}>
        <div className={classes.logoContainer}>
          <img src={logo} alt="Logo" />
        </div>
        <nav className={classes.nav}>
          <div className={classes.encabezadoSuperior}>
            <div className={classes.contenedorBusqueda}>
              <SearchBar textoDefault="" />
            </div>

            <div className={classes.contenedorBotones}></div>
          </div>
          <div className={classes.encabezadoInferior}>
            <div className={classes.contenedorDeFiltros}></div>
          </div>
        </nav>
      </header>

      <main>
        <div className={classes.itemsContainer}>
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
            <Tabla datos={datos} palabraClave="Libre" />
          </div>

          <div className="news">
            <Cards />
          </div>
        </div>
      </main>
    </>
  )
}

export default Home
