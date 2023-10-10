import React, { useState } from "react";
import "../Hojas-de-estilo/BarraDeBusqueda.css";

interface BarraDeBusquedaProps {
  textoDefault: string;
}

function BarraDeBusqueda({ textoDefault }: BarraDeBusquedaProps) {
  const [texto, setTexto] = useState(textoDefault);

  const manejarCambio = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTexto(event.target.value);
  };

  const manejarEnvio = (event: React.FormEvent) => {
    event.preventDefault();
    console.log(texto);
  };

  return (
    <div className="buscador">
      <form onSubmit={manejarEnvio}>
        <input
          className="busqueda-input"
          placeholder="Buscar..."
          type="text"
          value={texto}
          onChange={manejarCambio}
        />
        <button type="submit">
          {/* Uso las clases de font awesome para mostrar la lupa */}
          <i className="fa fa-search" aria-hidden="true"></i>
        </button>
      </form>
    </div>
  );
}

export default BarraDeBusqueda;
