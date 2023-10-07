import '../styles/stylePopupErrorLogin.css'

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
                    <p>{'Usuario y/o contraseña incorrecto por favor intente nuevamente.'}</p>
                    <button className='button-MyModal' onClick={onClose}>Aceptar</button>
                </div>
            </div>
        </div>
    )
}

export default MyModal
