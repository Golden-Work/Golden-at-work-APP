// Assets
import img1 from "@/assets/Imagenes/Scroll/Scroll-1.png"
import img2 from "@/assets/Imagenes/Scroll/Scroll-2.png"
import img3 from "@/assets/Imagenes/Scroll/Scroll-3.png"
import img4 from "@/assets/Imagenes/Scroll/Scroll-4.png"
import img5 from "@/assets/Imagenes/Scroll/Scroll-5.png"
import img6 from "@/assets/Imagenes/Scroll/Scroll-6.png"
import img11 from "@/assets/Imagenes/Scroll/Scroll-11.png"
import img12 from "@/assets/Imagenes/Scroll/Scroll-12.png"
// React and Components
import React, { useState } from "react"
import ItemList from "../../components/ItemCard/ItemList"
import Table, { ElementProps } from "@/components/Table/Table"
import Cards from "@/components/Cards/Cards"
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

  const data: ElementProps[] = [
    {
      id: 1,
      name: "Pelota",
      status: "reserved",
      img: img11,
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore",
    },
    {
      id: 2,
      name: "Freesbie",
      status: "free",
      img: img12,
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore",
    },
    {
      id: 3,
      name: "Pelota 2",
      img: img11,
      status: "reserved",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore",
    },
    {
      id: 4,
      name: "Ajedrez",
      img: img6,
      status: "reserved",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore",
    },
    {
      id: 5,
      name: "UNO",
      img: img5,
      status: "free",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore",
    },
    {
      id: 6,
      name: "Parques",
      img: img3,
      status: "free",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore",
    },
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
      </header>

      <main>
        <div className={classes.itemsContainer} style={{margin:50 }}>
          <Box
            sx={{
              display: "flex",
              padding: 2,
              width: "100%",
            }}
          >
            <ItemList items={data} />
          </Box>
        </div>
        <div className={classes.contenedorDeParteBaja}>
          <div className={classes.contenedorTabla}>
            <Table data={data} />
          </div>

          <div className={classes.news}>
            <Cards />
          </div>
        </div>
      </main>
    </>
  )
}

export default Home
