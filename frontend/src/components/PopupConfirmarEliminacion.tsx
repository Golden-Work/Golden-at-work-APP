import '../styles/stylePopupConfirmarEliminacion.css'

interface propsProps{
    visible: boolean,
    onClose: () => void
}


function MyModal({visible, onClose}: propsProps){
    const handleOnClose = () =>{
        onClose()
    }
    if(!visible) return null
    return(
        <div onClick={handleOnClose} className="Popup">
            <div className="Ventana">
                <div className='Form-ventana'>
                    <p>{'¿Está seguro que desea eliminar su cuenta?'}</p>
                    <div className="Botones">
                        <button className='Confirmar' onClick={onClose}>Confirmar</button>
                        <button className='Cancelar' onClick={onClose}>Cancelar</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default MyModal