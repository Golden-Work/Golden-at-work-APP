import '../Hojas-de-estilo/ImagenDeScroll.css'

interface ImagenDeScrollProps {
  nombreDelObjeto: string;
  texto: string;
  imagen: number;
}

function ImagenDeScroll ({ imagen, texto, nombreDelObjeto }:ImagenDeScrollProps){
  return(
    <div>
      <img 
        className='imagen-del-scroll'
        src={`../assets/Imagenes/test-${imagen}.jpg`}
        alt="imagen" />
      <div>
        <p className='nombre-objeto-scroll'>{nombreDelObjeto}</p>
        <p className='leyenda-scroll'>{texto}</p>
      </div>
    </div>
  );
}


export default ImagenDeScroll;