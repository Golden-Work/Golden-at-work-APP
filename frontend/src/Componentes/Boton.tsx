import { useState } from 'react';
import '../Hojas-de-estilo/Boton.css';

interface BotonProps {
  texto: string;
  esDeRedireccionamiento: boolean;
}

function Boton ({ texto, esDeRedireccionamiento }: BotonProps){
  const [activo, setActivo] = useState(false);

  const manejarClick = () => {
    setActivo(!activo);
  };

  return(
    <button
      className={`${esDeRedireccionamiento ? 'boton-rediereccionamiento' : 'boton-filtro'} ${activo ? 'activo' : ''}`}
      onClick={manejarClick}>
      {texto}
    </button>
  );
}

export default Boton;
