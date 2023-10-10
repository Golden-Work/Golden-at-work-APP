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
          placeholder="datos"
          type="text"
          value={texto}
          onChange={manejarCambio}
        />
      </form>
    </div>
  );
}

export default BarraDeBusqueda;
