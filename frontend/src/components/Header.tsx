import { Link } from "react-router-dom"
import { useTranslation } from 'react-i18next';
import { useState, useRef, useEffect } from "react"

function Header() {
  const { t, i18n } = useTranslation();
  const [mostrarMenu, setMostrarMenu] = useState(false)
  const contenedorRef = useRef<HTMLDivElement>(null)
  co


  
  const toggleMenu = () => {
    setMostrarMenu(!mostrarMenu)
  }
  const changeLanguage = (language: string, event: React.MouseEvent<HTMLAnchorElement>) => {
    event.preventDefault();
    i18n.changeLanguage(language); // Cambia el idioma
    localStorage.setItem('language', language);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        contenedorRef.current &&
        !contenedorRef.current.contains(event.target as Node)
      ) {
        setMostrarMenu(false)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)

    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [])

  return (
    <header className="header">
      <div className="Column-Header">
        <div className="logo-header">
          <Link id="UN" to="/">
            {" "}
            Un
          </Link>
        </div>
        <div className="idiom-header">
          <div
            className={`idiom-button ${mostrarMenu ? "open" : ""}`}
            ref={contenedorRef}
          >
            <button id="idiom-button" onClick={toggleMenu}>
              {t("Idioma")}
            </button>
            {mostrarMenu && (
              <ul className="menu">
                <li>
                  <a href="/" onClick={(e) => changeLanguage('en',e)}>{t("Inglés")}</a>
                </li>
                <li>
                  <a href="/" onClick={(e) => changeLanguage('fr',e)}>{t("Francés")}</a>
                </li>
                <li>
                  <a href="/" onClick={(e) => changeLanguage('es',e)}>{t("Español")}</a>
                </li>
                <li>
                  <a href="/" onClick={(e) => changeLanguage('pt',e)}>{t("Portugués")}</a>
                </li>
              </ul>
            )}
          </div>
        </div>
      </div>
    </header>
  )
}

export default Header
