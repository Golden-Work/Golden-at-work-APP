import img1 from "@/assets/Imagenes/Scroll/Scroll-1.png"
// React and Components
import React from "react"
import Table, { ElementProps } from "@/components/Table/Table"
import { useNavigate } from "react-router"

// Material-UI Components
import Box from "@mui/material/Box"
import Avatar from "@mui/material/Avatar"
import Menu from "@mui/material/Menu"
import MenuItem from "@mui/material/MenuItem"
import ListItemIcon from "@mui/material/ListItemIcon"
import IconButton from "@mui/material/IconButton"
import Tooltip from "@mui/material/Tooltip"

// CSS Module
import classes from "./Admin.module.css"
import { Logout, Search } from "@mui/icons-material"
import FilterButtons from "@/components/FilterButtons"
import Boton from "@/components/Boton/Boton"

function AdminHome() {
  const navigate = useNavigate()
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null)
  const open = Boolean(anchorEl)
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget)
  }
  const handleHistory = () => {

  };
  const handleAdd= () => {
    navigate("/adminAdd")
  };
  const handleEliminate = () => {

  };

  const closeMenu = () => {
    setAnchorEl(null)
  }
  const handleClose = () => {
    localStorage.clear()
    window.location.reload()
    closeMenu()
  }
 
  const data: ElementProps[] = [
    {
      id: 1,
      name: "Pelota",
      status: "reserved",
      img: img1,
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore",
    },
    {
      id: 2,
      name: "Freesbie",
      status: "free",
      img: img1,
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore",
    },
    {
      id: 3,
      name: "Pelota 2",
      img: img1,
      status: "reserved",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore",
    },
    {
      id: 4,
      name: "Ajedrez",
      img: img1,
      status: "reserved",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore",
    },
    {
      id: 5,
      name: "UNO",
      img: img1,
      status: "free",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore",
    },
    {
      id: 6,
      name: "Parques",
      img: img1,
      status: "free",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore",
    },
  ]

  

  return (
    <>
    
      <header className={classes.header}>
        <div className={classes.encabezadoSuperior}>
          <div className={classes.inputContainer}>
            <Search fontSize="small" sx={{ color: "#c4c4ce" }} />
            <input className={classes.input} type="text" placeholder="Buscar" />
          </div>

          <Boton
          texto="Historial"
          esDeRedireccionamiento={true}
          manejarClick={handleHistory}
          />
          <Boton
          texto="Añadir"
          esDeRedireccionamiento={true}
          manejarClick={handleAdd}
          />
          <Boton
          texto="Eliminar"
          esDeRedireccionamiento={true}
          manejarClick={handleEliminate}
          />

          <Box sx={{ position: "absolute", right: 0 }}>
            <Tooltip title="Configuración de sesión">
              <IconButton
                onClick={handleClick}
                size="small"
                sx={{ ml: 2 }}
                aria-controls={open ? "account-menu" : undefined}
                aria-haspopup="true"
                aria-expanded={open ? "true" : undefined}
              >
                <Avatar
                  sx={{
                    width: 40,
                    height: 40,
                    bgcolor: "#b1a4ed",
                  }}
                >
                  M
                </Avatar>
              </IconButton>
            </Tooltip>
          </Box>
          <Menu
            anchorEl={anchorEl}
            onClose={closeMenu}
            id="account-menu"
            open={open}
            transformOrigin={{ horizontal: "right", vertical: "top" }}
            anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
          >
            
            <MenuItem onClick={handleClose}>
              <ListItemIcon>
                <Logout fontSize="small" />
              </ListItemIcon>
              Cerrar sesión
            </MenuItem>
          </Menu>
        </div>
        <div className={classes.encabezadoInferior}>
          <FilterButtons />
        </div>
      </header>

      <main>
        
        <div className={classes.contenedorDeParteBaja}>
          <div className={classes.contenedorTabla}>
            <Table data={data} />
          </div>          
        </div>
      </main>
    </>
  )
}

export default AdminHome
