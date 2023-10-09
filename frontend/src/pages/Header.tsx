  import { Link} from 'react-router-dom';
  import { useState, useRef, useEffect } from 'react';

 
  
  function Header() {
    const [mostrarMenu, setMostrarMenu] = useState(false);
    const contenedorRef = useRef<HTMLDivElement>(null);
  
    const consoleLog = () => {
      console.log("Adiós");
    };
  
    const toggleMenu = () => {
      setMostrarMenu(!mostrarMenu);
    };
  
    useEffect(() => {
      const handleClickOutside = (event: MouseEvent) => {
        if (contenedorRef.current && !contenedorRef.current.contains(event.target as Node)) {
          setMostrarMenu(false);
        }
      };
  
      document.addEventListener('mousedown', handleClickOutside);
  
      return () => {
        document.removeEventListener('mousedown', handleClickOutside);
      };
    }, []);
  
    return (
      <header className="header">
        <div className="Column-Header">
          <div className="logo-header">
            <Link id="UN" to="/Home"> Un</Link>
          </div>
          <div className="idiom-header">
            <div className={`idiom-button ${mostrarMenu ? 'open' : ''}`} ref={contenedorRef}>
              <button id="idiom-button" onClick={toggleMenu}>
                Idioma
              </button>
              {mostrarMenu && (
                <ul className="menu">
                  <li><a onClick={consoleLog}>Ingles</a></li>
                  <li><a href="#">Frances</a></li>
                  <li><a href="#">Español</a></li>
                  <li><a href="#">Portugues</a></li>
                </ul>
              )}
            </div>
          </div>
        </div>
      </header>
    );
  }
  
  export default Header;
  
