import classes from "./PopupErrorLogin.module.css"

interface propsProps {
  visible: boolean
  onClose: () => void
}

function PopupErrorLogin({ visible, onClose }: propsProps) {
  const handleOnClose = () => {
    onClose()
  }
  if (!visible) return null
  return (
    <div onClick={handleOnClose} className={classes.popup}>
      <div className={classes.window}>
        <div className={classes.windowForm}>
          <p className={classes.textError}>
            {"Usuario y/o contraseña incorrecto por favor intente nuevamente."}
          </p>
          <button className={classes.button} onClick={onClose}>
            Aceptar
          </button>
        </div>
      </div>
    </div>
  )
}

export default PopupErrorLogin
