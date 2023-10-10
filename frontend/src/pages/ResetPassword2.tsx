import Header from "../components/Header"

function ResetPassword2() {
  return (
    <div className="contenerdor-reset">
      <Header />
      <div className="form-box_rt form-box-rt2">
        <h2 id="title">Un</h2>
        <p>
          Introduce el código de verificación enviado a tu correo electrónico de
          recuperación.
        </p>
        <div className="inputbox_rt">
          <label htmlFor="password">Código</label>
          <input type="string" id="password" name="string" />
        </div>
        <button>Confirmar</button>
      </div>
    </div>
  )
}
export default ResetPassword2
