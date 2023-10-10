import { useState, useRef, useEffect } from "react"
import "../styles/styleRegister.css"
import Header from "../components/Header"
import axios from "axios"
import { toast } from "react-toastify"

type FormDataType = {
  email: string
  password: string
  confirm_password?: string
  first_name: string
  last_name: string
  document: string
  career: string
}

function FormBox() {
  const [mostrarMenu, setMostrarMenu] = useState(false)
  const contenedorRef = useRef<HTMLDivElement | null>(null)

  const [formData, setFormData] = useState<FormDataType>({
    email: "",
    password: "",
    confirm_password: "",
    first_name: "",
    last_name: "",
    document: "",
    career: "",
  })

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }))
  }

  const handleRegister = async () => {
    if (formData.password !== formData.confirm_password) {
      toast.error("Las contraseñas no coinciden")
      return
    }
    delete formData.confirm_password
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_APP_BASE_URL}auth/signup`,
        formData
      )

      if (response.status === 201) {
        toast.success("Usuario registrado")
      } else {
        toast.error("An error occurred, please try again later")
      }
    } catch (error: any) {
      if (error?.response?.data) {
        Object.keys(error.response.data).forEach((key) => {
          toast.error(`${key}: ${error.response.data[key]}`)
        })
      }
    }
  }

  const handleCareerChoice = (career: string) => {
    setFormData((prevState) => ({
      ...prevState,
      career,
    }))
    toggleMenu()
  }

  const toggleMenu = () => {
    setMostrarMenu(!mostrarMenu)
  }

  const handleClickOutside = (event: MouseEvent) => {
    if (
      contenedorRef.current &&
      !contenedorRef.current.contains(event.target as Node)
    ) {
      setMostrarMenu(false)
    }
  }

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside)
    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [])

  return (
    <section>
      <div className="form-box_r">
        <div className="form-value_r">
          <h2>Registro</h2>
          <div className="column-container_r">
            <div className="column_r">
              <div className="inputbox_r">
                <label>Usuario</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                />
              </div>
              <div className="inputbox_r">
                <label>Contraseña</label>
                <input
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleInputChange}
                />
              </div>
              <div className="inputbox_r">
                <label>Confirme sú contraseña</label>
                <input
                  type="password"
                  name="confirm_password"
                  value={formData.confirm_password}
                  onChange={handleInputChange}
                />
              </div>
            </div>
            <div className="column_r">
              <div className="inputbox_r">
                <label>Nombres</label>
                <input
                  type="text"
                  name="first_name"
                  value={formData.first_name}
                  onChange={handleInputChange}
                />
              </div>
              <div className="inputbox_r">
                <label>Apellidos</label>
                <input
                  type="text"
                  name="last_name"
                  value={formData.last_name}
                  onChange={handleInputChange}
                />
              </div>
              <div className="inputbox_r">
                <label>Documento</label>
                <input
                  type="text"
                  name="document"
                  value={formData.document}
                  onChange={handleInputChange}
                />
              </div>
            </div>
          </div>
          <div
            className={`program_button ${mostrarMenu ? "open" : ""}`}
            ref={contenedorRef}
          >
            <button id="program_button" onClick={toggleMenu}>
              Programa Curricular
            </button>
            {mostrarMenu && (
              <ul className="menu">
                <li>
                  <a onClick={() => handleCareerChoice("Ingeniería 0")}>
                    Ingeniería 0
                  </a>
                </li>
                <li>
                  <a onClick={() => handleCareerChoice("Ingeniería 2")}>
                    Ingeniería 2
                  </a>
                </li>
                <li>
                  <a onClick={() => handleCareerChoice("Ingeniería 3")}>
                    Ingeniería 3
                  </a>
                </li>
                <li>
                  <a onClick={() => handleCareerChoice("Ingeniería 4")}>
                    Ingeniería 4
                  </a>
                </li>
              </ul>
            )}
          </div>
          <button id="registrar" onClick={handleRegister}>
            Registrar
          </button>
        </div>
      </div>
    </section>
  )
}

function Register() {
  return (
    <div id="app-container">
      <Header />
      <FormBox />
    </div>
  )
}

export default Register
