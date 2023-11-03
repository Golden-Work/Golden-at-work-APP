import { Box, IconButton, Tooltip, Avatar, Menu, MenuItem, ListItemIcon } from "@mui/material"
import React, { useState } from 'react';
import { Search, Logout, PersonRemove as PersonRemoveIcon } from "@mui/icons-material"
import PopupConfirmarEliminacion from "@/components/PopupConfirmarEliminación/PopupConfirmarEliminacion"
import classes from "./Reservas.module.css"
import FilterButtons from "@/components/FilterButtons"

// Importa tus imágenes aquí
import img1 from "@/assets/Imagenes/Scroll/Scroll-1.png"
import img2 from "@/assets/Imagenes/Scroll/Scroll-2.png"
import img3 from "@/assets/Imagenes/Scroll/Scroll-3.png"
import img4 from "@/assets/Imagenes/Scroll/Scroll-4.png"
import img5 from "@/assets/Imagenes/Scroll/Scroll-5.png"
import img6 from "@/assets/Imagenes/Scroll/Scroll-6.png"
import img7 from "@/assets/Imagenes/Scroll/Scroll-7.png"
import img8 from "@/assets/Imagenes/Scroll/Scroll-8.png"

// ...

function Reservas() {
  // Tu estado y funciones aquí
  const [showMyModal, setShowMyModal] = useState(false)
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null)
  const open = Boolean(anchorEl)
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget)
  }
  const handleOnClose = () => setShowMyModal(false)
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

  const data = [
    // Tus datos aquí
    {
      id: 1,
      name: "Elemento 1",
      status: "reserved",
      img: img1,
      description: "Descripción del elemento 1",
    },
    // ...
  ]

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
        {/* Más de tu código aquí */}
      </header>
      {/* Más de tu código aquí */}
    </>
  )
}

export default Reservas
