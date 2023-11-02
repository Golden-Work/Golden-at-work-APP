import React, { useEffect, useState } from "react"
import axios from "axios"
import classes from "./SearchBar.module.css"

interface SearchBarProps {
  textoDefault: string
}

function SearchBar({ textoDefault }: SearchBarProps) {
  const [texto, setTexto] = useState(textoDefault)
  const [implementNames, setImplementNames] = useState<string[]>([])

  useEffect (() =>{
    axios.get('/implement-names/')
      .then( responce =>{
        setImplementNames(responce.data)
      })
  }, [])

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
      <div>
        {implementNames.filter(name => name.includes(texto)).map((name, index) => (
          <p key={index}>{name}</p>
        ))}
      </div>
    </div>
  )
}

export default SearchBar
