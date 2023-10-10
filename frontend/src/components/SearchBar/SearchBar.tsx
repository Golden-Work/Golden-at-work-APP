import React, { useState } from "react"
import classes from "./SearchBar.module.css"

interface SearchBarProps {
  textoDefault: string
}

function SearchBar({ textoDefault }: SearchBarProps) {
  const [texto, setTexto] = useState(textoDefault)

  const manejarCambio = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTexto(event.target.value)
  }

  const manejarEnvio = (event: React.FormEvent) => {
    event.preventDefault()
    console.log(texto)
  }

  return (
    <div className={classes.buscador}>
      <form onSubmit={manejarEnvio}>
        <input
          className={classes.input}
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
  )
}

export default SearchBar
