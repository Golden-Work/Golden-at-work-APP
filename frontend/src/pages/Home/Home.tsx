// Assets
// React and Components
import React, { useState } from "react"
import ItemList from "../../components/ItemCard/ItemList"
import PopupConfirmarEliminacion from "@/components/PopupConfirmarEliminación/PopupConfirmarEliminacion"

// Material-UI Components
import Box from "@mui/material/Box"
import Avatar from "@mui/material/Avatar"
import Menu from "@mui/material/Menu"
import MenuItem from "@mui/material/MenuItem"
import ListItemIcon from "@mui/material/ListItemIcon"
import IconButton from "@mui/material/IconButton"
import Tooltip from "@mui/material/Tooltip"

// Material-UI Icons
import PersonRemoveIcon from "@mui/icons-material/PersonRemove"

// CSS Module
import classes from "./Home.module.css"
import { Logout, Search } from "@mui/icons-material"
import FilterButtons from "@/components/FilterButtons"

function Home() {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null)
  const open = Boolean(anchorEl)
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget)
  }

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

  const [showMyModal, setShowMyModal] = useState(false)
  const handleOnClose = () => setShowMyModal(false)

  return (
    <>
      <PopupConfirmarEliminacion
        onClose={handleOnClose}
        visible={showMyModal}
      />
      <header className={classes.header}>
        <div className={classes.encabezadoSuperior}>
          <div className={classes.inputContainer}>
            <Search fontSize="small" sx={{ color: "#c4c4ce" }} />
            <input className={classes.input} type="text" placeholder="Buscar" />
          </div>

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
            <MenuItem onClick={toggleModal}>
              <ListItemIcon>
                <PersonRemoveIcon fontSize="small" />
              </ListItemIcon>
              Eliminar cuenta
            </MenuItem>
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
        <div style={{ margin: 50 }}>
          <ItemList />
        </div>
      </main>
    </>
  )
}

export default Home
