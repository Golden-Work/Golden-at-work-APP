import logo from "@/assets/Imagenes/Logo-placejolder.png"
import SearchBar from "../../components/SearchBar/SearchBar"
import ItemCard from "../../components/ItemCard/ItemCard"
import classes from "./Home.module.css"
import Table, { ElementProps } from "@/components/Table/Table"
import Cards from "@/components/Cards/Cards"
import img1 from "@/assets/Imagenes/Scroll/Scroll-1.png"
import img2 from "@/assets/Imagenes/Scroll/Scroll-2.png"
import img3 from "@/assets/Imagenes/Scroll/Scroll-3.png"
import img4 from "@/assets/Imagenes/Scroll/Scroll-4.png"
import img5 from "@/assets/Imagenes/Scroll/Scroll-5.png"
import img6 from "@/assets/Imagenes/Scroll/Scroll-6.png"
import Boton from "@/components/Boton/Boton"
import { Button } from "@mui/material"
import PopupConfirmarEliminacion from "@/components/PopupConfirmarEliminación/PopupConfirmarEliminacion"
import { useState } from "react"

import * as React from 'react';
import Box from '@mui/material/Box';
import Avatar from '@mui/material/Avatar';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';

import IconButton from '@mui/material/IconButton';

import Tooltip from '@mui/material/Tooltip';


function Home() {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null); /*Borrar el token y refrescar página*/
  };
  const [showMyModal, setShowMyModal] = useState(false)
  const handleOnClose = () => setShowMyModal(false)
  const toggleModal = () => setShowMyModal(true)
  const data: ElementProps[] = [
    {
      id: 1,
      name: "Pelota",
      status: "reserved",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore",
    },
    {
      id: 2,
      name: "Freesbie",
      status: "free",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore",
    },
    {
      id: 3,
      name: "Pelota",
      status: "reserved",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore",
    },
    {
      id: 4,
      name: "Ajedrez",
      status: "reserved",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore",
    },
    {
      id: 5,
      name: "UNO",
      status: "free",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore",
    },
  ]

  const redireccionar = () => {}

  const filtro = () => {}

  return (
    <>
    <PopupConfirmarEliminacion onClose={handleOnClose} visible={showMyModal} />
      <header className={classes.header}>
        <div className={classes.logoContainer}>
          <img src={logo} alt="Logo" />
        </div>
        <nav className={classes.nav}>
          <div className={classes.encabezadoSuperior}>
            <div className={classes.contenedorBusqueda}>
              <SearchBar textoDefault="" />
            </div>

            <div className={classes.contenedorBotones}>
              <Boton
                texto="Pedir"
                esDeRedireccionamiento={true}
                manejarClick={redireccionar}
              />

              <Boton
                texto="Idioma"
                esDeRedireccionamiento={true}
                manejarClick={redireccionar}
              />
              
              <React.Fragment>
                <Box sx={{ display: 'flex'}}>

                  <Tooltip title="Account settings">
                    <IconButton
                      onClick={handleClick}
                      size="small"
                      sx={{ ml: 2 }}
                      aria-controls={open ? 'account-menu' : undefined}
                      aria-haspopup="true"
                      aria-expanded={open ? 'true' : undefined}
                    >
                      <Avatar sx={{ width: 32, height: 32 }}>M</Avatar>
                    </IconButton>
                  </Tooltip>
                </Box>
                <Menu
                  anchorEl={anchorEl}
                  id="account-menu"
                  open={open}
                  onClose={handleClose}
                  onClick={handleClose}

                  transformOrigin={{ horizontal: 'right', vertical: 'top' }}
                  anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
                >
                  <MenuItem onClick={toggleModal}  >
                    Delete Account
                  </MenuItem>
                  <MenuItem onClick={handleClose}>
                    Logout
                  </MenuItem>
                </Menu>
              </React.Fragment>

           </div>

          </div>
          <div className={classes.encabezadoInferior}>
            <div className={classes.contenedorDeFiltros}>
              <Boton
                texto="Filtro 1"
                esDeRedireccionamiento={false}
                manejarClick={filtro}
              />

              <Boton
                texto="Filtro 2"
                esDeRedireccionamiento={false}
                manejarClick={filtro}
              />

              <Boton
                texto="Filtro 3"
                esDeRedireccionamiento={false}
                manejarClick={filtro}
              />

              <Boton
                texto="Filtro 4"
                esDeRedireccionamiento={false}
                manejarClick={filtro}
              />
            </div>
          </div>
        </nav>
      </header>

      <main>
        <div className={classes.itemsContainer}>
          <ItemCard
            name="mesa"
            img={img1}
            description="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore"
          />

          <ItemCard
            name="Raqueta"
            img={img2}
            description="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore"
          />

          <ItemCard
            name="Ajedrez"
            img={img3}
            description="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore"
          />

          <ItemCard
            name="futbolito"
            img={img4}
            description="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore"
          />

          <ItemCard
            name="Parques"
            img={img5}
            description="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore"
          />

          <ItemCard
            name="Pelota"
            img={img6}
            description="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore"
          />
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
