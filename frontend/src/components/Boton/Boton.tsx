import classes from "./Boton.module.css"

interface BotonProps {
  texto: string
  esDeRedireccionamiento: boolean
  manejarClick: () => void
}

function Boton({ texto, esDeRedireccionamiento, manejarClick }: BotonProps) {
  const classesBoton = esDeRedireccionamiento
    ? classes.botonRedireccionamiento
    : classes.botonFiltro

  return (
    <button className={classesBoton} onClick={manejarClick}>
      {texto}
    </button>
  )
}

export default Boton
