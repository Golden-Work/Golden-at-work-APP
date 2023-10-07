import '../styles/styleModal.css'

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
        <div onClick={handleOnClose} className="popup">
            <div className="bg-white p-2 rounded">
                <p>Usuario y/o contraseña incorrectos </p>
                <p>por favor intente nuevamente.</p>
                <button onClick={onClose}>Aceptar</button>
            </div>
        </div>
    )
}

export default MyModal
