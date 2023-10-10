import classes from "./Cards.module.css"

const datosNoticias = [
  {
    titulo: "Noticia 1",
    texto:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur elit ligula, euismod eget ante in.",
    imagen: "https://picsum.photos/500/300/?image=10",
  },
  {
    titulo: "Noticia 2",
    texto:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum nec enim et justo interdum finibus.",
    imagen: "https://picsum.photos/500/300/?image=5",
  },
]

interface CardsItemProps {
  titulo: string
  texto: string
  imagen: string
}

function CardItem({ titulo, texto, imagen }: CardsItemProps) {
  return (
    <li>
      <div className={classes.card}>
        <div className={classes.cardImage}>
          <img src={imagen} />
        </div>
        <div className={classes.cardContent}>
          <h2 className={classes.cardTitle}>{titulo}</h2>
          <p className={classes.cardText}>{texto}</p>
          <button className={classes.cardBtn}>Saber más</button>
        </div>
      </div>
    </li>
  )
}

function Cards() {
  const listNews = datosNoticias.map((noticia) => (
    <CardItem
      titulo={noticia.titulo}
      texto={noticia.texto}
      imagen={noticia.imagen}
    />
  ))

  return <ul className={classes.cards}>{listNews}</ul>
}

export default Cards
