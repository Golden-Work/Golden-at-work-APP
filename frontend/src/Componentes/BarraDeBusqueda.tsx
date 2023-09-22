import React, { useState } from 'react';
import '../Estilos/BarraDeBusqueda.css'

interface BarraDeBusquedaProps {
  textoDefault: string;
}

function BarraDeBusqueda ({ textoDefault }: BarraDeBusquedaProps){
  const [texto, setTexto] = useState(textoDefault);

  const manejarCambio = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTexto(event.target.value);
  };

  const manejarEnvio = (event: React.FormEvent) => {
    event.preventDefault();
    console.log(texto);
  };

  return(
    <div className='buscador'>
      <form onSubmit={manejarEnvio}>
        <input 
          type="search" 
          value={texto} 
          onChange={manejarCambio} 
        />
        <button type="submit">Buscar</button>
      </form>
    </div>
  );
}

export default BarraDeBusqueda;
