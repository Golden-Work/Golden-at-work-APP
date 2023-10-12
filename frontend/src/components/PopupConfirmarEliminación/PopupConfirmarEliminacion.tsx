import classes from "./PopupConfirmarEliminacion.module.css"
import useDeleteUser from "@/hooks/useDeleteUser"
import * as React from "react"

interface propsProps{
    visible: boolean,
    onClose: () => void
}


function MyModal({visible, onClose}: propsProps){
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null)
    const {
        deleteUser
    } = useDeleteUser()
    const cancelarOnclose = () =>{
        setAnchorEl(null);
    }

    if(!visible) return null
    return(
        <div onClick={onClose} className={classes.popup}>
            <div className={classes.ventana}>
                <div className={classes.formventana}>
                    <p>{'¿Está seguro que desea eliminar su cuenta?'}</p>
                    <div className={classes.botones}>
                        <button className={classes.confirmar} onClick={deleteUser}>Confirmar</button>
                        <button className={classes.cancelar} onClick={cancelarOnclose}>Cancelar</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default MyModal