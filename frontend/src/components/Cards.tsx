import "../Hojas-de-estilo/Cards.css"

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
];

interface CardsItemProps {
  titulo: string;
  texto: string;
  imagen: string;
}

function CardsItem({titulo, texto, imagen }: CardsItemProps) {
  return (
    <li className="cards_item">
      <div className="card">
        <div className="card_image">
          <img src={imagen} />
        </div>
        <div className="card_content">
          <h2 className="card_title">{titulo}</h2>
          <p className="card_text">{texto}</p>
          <button className="card_btn">Saber más</button>
        </div>
      </div>
    </li>
  );
}

function Cards() {
    const listNews = datosNoticias.map(
        noticia => <CardsItem titulo={noticia.titulo} texto={noticia.texto} imagen={noticia.imagen} />
    );

  return (
    <ul className="cards">
      {listNews}
    </ul>
  );
}

export default Cards;
