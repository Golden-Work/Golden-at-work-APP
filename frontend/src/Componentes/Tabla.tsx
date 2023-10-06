import "../Hojas-de-estilo/Tabla.css";

interface TablaProps{
  datos: string [][],
  palabraClave: string
}

import "../Hojas-de-estilo/Tabla.css";

function Tabla({ datos, palabraClave }: TablaProps) {
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
