import "../Hojas-de-estilo/Tabla.css";

interface TablaProps{
  datos: string [][],
  palabraClave: string,
  tipo: number
}

import "../Hojas-de-estilo/Tabla.css";

function Tabla({ datos, palabraClave, tipo }: TablaProps) {
  switch(tipo){
    case 0:
      break;
    default:
      return (
        <table className="tabla">
          {datos.map((fila, i) => (
            <tr key={i} className={fila[1]==`${palabraClave}`? 'libre':'ocupado'}>
              {fila.map((celda, j) => (
                <td key={j}>{celda}</td>
              ))}
            </tr>
          ))}
        </table>
      );
      break;       
  }
    return (
      <table className="tabla">
        {datos.map((fila, i) => (
          <tr key={i} className={fila[1]==`${palabraClave}`? 'libre':'ocupado'}>
            {fila.map((celda, j) => (
              <td key={j}>{celda}</td>
            ))}
          </tr>
        ))}
      </table>
    );
}


export default Tabla;
