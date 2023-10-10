import classes from "./PopupConfirmarEliminacion.module.css"

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
        <div onClick={handleOnClose} className={classes.popup}>
            <div className={classes.ventana}>
                <div className={classes.formventana}>
                    <p>{'¿Está seguro que desea eliminar su cuenta?'}</p>
                    <div className={classes.botones}>
                        <button className={classes.confirmar} onClick={onClose}>Confirmar</button>
                        <button className={classes.cancelar} onClick={onClose}>Cancelar</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default MyModal