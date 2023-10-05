import "../Hojas-de-estilo/Tabla.css";

interface TablaProps{
  datos: string [][]
}

import "../Hojas-de-estilo/Tabla.css";

function Tabla({ datos }: TablaProps) {
  return (
    <table>
      {datos.map((fila, i) => (
        <tr key={i}>
          {fila.map((celda, j) => (
            <td key={j}>{celda}</td>
          ))}
        </tr>
      ))}
    </table>
  );
}


export default Tabla;
