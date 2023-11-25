// Assets
// React and Components
import React, { useState } from "react"
import ItemList from "../../components/ItemCard/ItemList"
import PopupConfirmarEliminacion from "@/components/PopupConfirmarEliminación/PopupConfirmarEliminacion"
import { useNavigate } from "react-router"

// Material-UI Components
import Box from "@mui/material/Box"
import Avatar from "@mui/material/Avatar"
import Menu from "@mui/material/Menu"
import MenuItem from "@mui/material/MenuItem"
import ListItemIcon from "@mui/material/ListItemIcon"
import IconButton from "@mui/material/IconButton"
import Tooltip from "@mui/material/Tooltip"
import TextField from "@mui/material/TextField";


// Material-UI Icons
import PersonRemoveIcon from "@mui/icons-material/PersonRemove"
import AccountCircleIcon from "@mui/icons-material/AccountCircle"

// CSS Module
import classes from "./Home.module.css"
import { Logout, Search } from "@mui/icons-material"
import FilterButtons from "@/components/FilterButtons"
import DarkModeSwitch from "@/components/Switch/DarkModeSwitch"

function Home() {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null)
  const [filtros, setFiltros] = useState<string[]>([])
  const open = Boolean(anchorEl)
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget)
  }

  const navigate = useNavigate();

  const closeMenu = () => {
    setAnchorEl(null)
  }
  const handleClose = () => {
    localStorage.clear()
    window.location.reload()
    closeMenu()
  }
  const toggleModal = () => {
    setShowMyModal(true)
    closeMenu()
  }

  const handleFilterAdd = (filtro: string) => {
    setFiltros((prevFiltros) => [...prevFiltros, filtro]);
    // Puedes agregar lógica adicional aquí para filtrar la lista de implementos según los nuevos filtros
  };

  const handleFilterRemove = (filtro: string) => {
    setFiltros((prevFiltros) => prevFiltros.filter((f) => f !== filtro));
    // Puedes agregar lógica adicional aquí para actualizar la lista de implementos después de eliminar el filtro
  };

  const [showMyModal, setShowMyModal] = useState(false)
  const handleOnClose = () => setShowMyModal(false)

  return (
    <>
      <PopupConfirmarEliminacion
        onClose={handleOnClose}
        visible={showMyModal}
      />
      <Box 
        sx={{
          gap: "10px",
          width: "100%",
         
          padding: "20px",
        }}
        >
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "auto",
          position: "relative",
        }}
        >
          <Box
          sx={{
            display: "flex",
            alignItems: "center",
            width: "100%",
            borderRadius: "20px",
            padding: "0 20px",
       
            maxWidth: "500px",
          }}
          >
          <Search fontSize="small" sx={{ color: "#c4c4ce" }} />
          <TextField
            sx={{
              "& .MuiOutlinedInput-root": {
                "& fieldset": {
                  border: "none",
                  borderBottom: "1px", 
                },
              },
              
              width: "100%",
              height: "100%",
              fontSize: "17px",
              
            }}
            variant="outlined"
            placeholder="Buscar..."
            size="small"
            fullWidth
          />
          </Box>


          <Box sx={{ position: "absolute", right: "10%" }}>
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
            <DarkModeSwitch />
          </Box>
          <Menu
            anchorEl={anchorEl}
            onClose={closeMenu}
            id="account-menu"
            open={open}
            transformOrigin={{ horizontal: "right", vertical: "top" }}
            anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
          >
            <MenuItem onClick={toggleModal}>
              <ListItemIcon>
                <PersonRemoveIcon fontSize="small" />
              </ListItemIcon>
              Eliminar cuenta
            </MenuItem>
            <MenuItem onClick={() => navigate('/edit')}>
              <ListItemIcon>
                {/* Puedes reemplazar este icono con el que prefieras */}
                <AccountCircleIcon fontSize="small" />
              </ListItemIcon>
              Mi cuenta
            </MenuItem>
            <MenuItem onClick={handleClose}>
              <ListItemIcon>
                <Logout fontSize="small" />
              </ListItemIcon>
              Cerrar sesión
            </MenuItem>
          </Menu>
        </Box>
        <div className={classes.encabezadoInferior}>
          <FilterButtons
          onFilterAdd={handleFilterAdd}
          onFilterRemove={handleFilterRemove}
          />
        </div>
      </Box>

      <main>
        <Box >
          <ItemList />
        </Box>
      </main>
    </>
  )
}

export default Home
