import classes from "./Table.module.css"

interface TablaProps {
  datos: string[][]
  palabraClave: string
  tipo?: number
}

function Tabla({ datos, palabraClave, tipo }: TablaProps) {
  switch (tipo) {
    case 0:
      break
    default:
      return (
        <table className={classes.table}>
          {datos.map((fila, i) => (
            <tr
              key={i}
              className={
                fila[1] == `${palabraClave}` ? classes.free : classes.busy
              }
            >
              {fila.map((celda, j) => (
                <td key={j}>{celda}</td>
              ))}
            </tr>
          ))}
        </table>
      )
      break
  }
  return (
    <table className={classes.table}>
      {datos.map((fila, i) => (
        <tr
          key={i}
          className={fila[1] == `${palabraClave}` ? classes.free : classes.busy}
        >
          {fila.map((celda, j) => (
            <td key={j}>{celda}</td>
          ))}
        </tr>
      ))}
    </table>
  )
}

export default Tabla
