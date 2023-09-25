import React, { useState, useEffect } from 'react';
import '../Hojas-de-estilo/ImagenDeScroll.css'

interface ImagenDeScrollProps {
  nombreDelObjeto: string;
  texto: string;
  imagen: number;
}

function ImagenDeScroll ({ imagen, texto, nombreDelObjeto }:ImagenDeScrollProps){
  const [ImgSrc, setImgSrc] = useState<string | null>(null);

  useEffect(() => {
    import(`../assets/Imagenes/test-${imagen}.jpg`)
      .then((image) => {
        setImgSrc(image.default);
      })
      .catch((error) => {
        console.error(`Hubo un error al cargar la imagen: ${error}`);
      });
  }, [imagen]);

  return(
    <div>
      {ImgSrc && <img 
        className='imagen-del-scroll'
        src={ImgSrc}
        alt="imagen" />}
      <div>
        <p className='nombre-objeto-scroll'>{nombreDelObjeto}</p>
        <p className='leyenda-scroll'>{texto}</p>
      </div>
    </div>
  );
}

export default ImagenDeScroll;
