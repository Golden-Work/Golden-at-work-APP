import logo from "@/assets/Imagenes/Logo-placejolder.png"
import SearchBar from "../../components/SearchBar/SearchBar"
import ItemCard from "../../components/ItemCard/ItemCard"
import classes from "./Home.module.css"
import Table from "@/components/Table/Table"
import Cards from "@/components/Cards/Cards"
import { useEffect } from "react"
import { useNavigate } from "react-router"
import img1 from "@/assets/Imagenes/Scroll/Scroll-1.png"
import img2 from "@/assets/Imagenes/Scroll/Scroll-2.png"
import img3 from "@/assets/Imagenes/Scroll/Scroll-3.png"
import img4 from "@/assets/Imagenes/Scroll/Scroll-4.png"
import img5 from "@/assets/Imagenes/Scroll/Scroll-5.png"
import img6 from "@/assets/Imagenes/Scroll/Scroll-6.png"

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
          <ItemCard
            name="mesa"
            img={img1}
            description="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore"
          />

          <ItemCard
            name="Raqueta"
            img={img2}
            description="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore"
          />

          <ItemCard
            name="Ajedrez"
            img={img3}
            description="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore"
          />

          <ItemCard
            name="futbolito"
            img={img4}
            description="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore"
          />

          <ItemCard
            name="Parques"
            img={img5}
            description="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore"
          />

          <ItemCard
            name="Pelota"
            img={img6}
            description="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore"
          />
        </div>
        <div className={classes.contenedorDeParteBaja}>
          <div className={classes.contenedorTabla}>
            <Table datos={datos} palabraClave="Libre" />
          </div>

          <div className={classes.news}>
            <Cards />
          </div>
        </div>
      </main>
    </>
  )
}

export default Home
