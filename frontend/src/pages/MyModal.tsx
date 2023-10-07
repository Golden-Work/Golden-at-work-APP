import React from "react";
import '../styles/styleModal.css'

function MyModal({visible, onClose}){
    const handleOnClose = () =>{
        onClose()
    }
    if(!visible) return null
    return(
        <div onClick={handleOnClose} className="absolute top-1/2 inset-5  bg.black bg-opacity-50
        backdrop-blur-sm flex justify-center items-center">
            <div className="bg-white p-2 rounded">
                <p>Usuario y/o contraseña incorrectos </p>
                <p>por favor intente nuevamente.</p>
                <button onClick={onClose}>Aceptar</button>
            </div>
        </div>
    )
}

export default MyModal