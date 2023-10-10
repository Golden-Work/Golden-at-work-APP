import '../Hojas-de-estilo/Boton.css'

interface BotonProps {
  texto: string;
  esDeRedireccionamiento: boolean;
  manejarClick: () => void;
}
  

function Boton ({ texto, esDeRedireccionamiento, manejarClick }: BotonProps){
  return(
    <button
      className={esDeRedireccionamiento? 'boton-rediereccionamiento':'boton-filtro'}
      onClick={manejarClick}>
      {texto}
    </button>
  );
}


export default Boton;