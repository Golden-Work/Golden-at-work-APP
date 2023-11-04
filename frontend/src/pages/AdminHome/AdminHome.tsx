import img1 from "@/assets/Imagenes/Scroll/Scroll-1.png"
// React and Components
import React from "react"
import Table, { ElementProps } from "@/components/Table/Table"
import { useNavigate } from "react-router"
import { styled } from "@mui/material/styles";


// Material-UI Components
import Box from "@mui/material/Box"
import Avatar from "@mui/material/Avatar"
import Menu from "@mui/material/Menu"
import MenuItem from "@mui/material/MenuItem"
import ListItemIcon from "@mui/material/ListItemIcon"
import IconButton from "@mui/material/IconButton"
import Tooltip from "@mui/material/Tooltip"
import Button from '@mui/material/Button';

// CSS Module
import classes from "./Admin.module.css"
import { Logout, Search } from "@mui/icons-material"
import FilterButtons from "@/components/FilterButtons"

import getImplements from "@/api/getImplements"

function AdminHome() {
  const navigate = useNavigate()
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null)
  const open = Boolean(anchorEl)
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget)
  }
  const handleHistory = async () => {
    try {
      const implementsData = await getImplements();
      if (implementsData) {
        const takedImplement = implementsData.filter(Implement => Implement.name === "Implement 1");
        console.log(takedImplement);
      } else {
        console.error("Error fetching implements data");
      }
    } catch (error) {
      console.error(error);
    }
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
  const CustomButton = styled(Button)({
    width: '120px',
    height: '45px',
    borderRadius: '10px',
    fontSize: '15px',
    border: 'none',
    outline: 'none',
    cursor: 'pointer',
    padding: '0 17px',
    textAlign: 'center',
    backgroundColor: '#bb86fc',
    color: 'white',
    marginRight: '10px',
    marginLeft: '10px',
    transition: 'background-color 0.3s, box-shadow 0.3s, color 0.3s',
    "&:hover": {
      backgroundColor: '#da44ff',
      boxShadow: '0 0 5px rgba(148, 0, 255, 0.5)',
      color: '#240046',
      cursor: 'pointer',
  },
  });

  const data: ElementProps[] = [
    {
      id: 1,
      name: "Pelota",
      status: "reserved",
      image: img1,
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore",
    },
    {
      id: 2,
      name: "Freesbie",
      status: "free",
      image: img1,
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore",
    },
    {
      id: 3,
      name: "Pelota 2",
      image: img1,
      status: "reserved",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore",
    },
    {
      id: 4,
      name: "Ajedrez",
      image: img1,
      status: "reserved",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore",
    },
    {
      id: 5,
      name: "UNO",
      image: img1,
      status: "free",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore",
    },
    {
      id: 6,
      name: "Parques",
      image: img1,
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

          <CustomButton onClick={handleHistory}>Historial</CustomButton>
          <CustomButton onClick={handleAdd}>Añadir</CustomButton>
          <CustomButton onClick={handleEliminate}>Eliminar</CustomButton>
         

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
            <Box sx={{position: "absolute",   top: 0,  left: 0, }}>
                
                <CustomButton sx ={{position: "flex"}} onClick={handleHistory}>Prestamos</CustomButton>

             
            </Box>
          </div>          
          
              
          
          
          
          
        </div>
      </main>
    </>
  )
}

export default AdminHome
