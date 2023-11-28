import { AccountCircle, IosShare, Logout } from "@mui/icons-material"
import {
  Avatar,
  Box,
  IconButton,
  ListItemIcon,
  Menu,
  MenuItem,
  Tooltip,
} from "@mui/material"
import React from "react"
import { useNavigate } from "react-router-dom"

//Export module
import ExcelJS from "exceljs"
import saveAs from "file-saver"
import { ElementProps } from "@/components/Table/Table"
import { useQuery } from "@tanstack/react-query"
import getReservations from "@/api/getReservations"
import DarkModeSwitch from "../../components/Switch/DarkModeSwitch";
import { useTranslation } from 'react-i18next';

const ProfileAvatar = () => {
  const { t } = useTranslation();
  const { data: dataReservations = [] } = useQuery({
    queryKey: ["reservations"],
    queryFn: getReservations,
  })

  const dataTable: ElementProps[] = dataReservations
    .filter((a) => a.implement && a.status)
    .map((a) => {
      return {
        id: a.implement?.id,
        name: a.implement?.name,
        status: a.status as "free" | "not-available" | "reserved",
        image: a.implement?.image,
        description: a.implement?.description,
      }
    })
  const navigate = useNavigate()
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null)
  const open = Boolean(anchorEl)
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget)
  }

  const handleClose = () => {
    localStorage.clear()
    window.location.reload()
    closeMenu()
  }

  const exportToExcel = async (data: ElementProps[], fileName: string) => {
    const workbook = new ExcelJS.Workbook()
    const worksheet = workbook.addWorksheet("MainImplement")

    // Definir las columnas de la hoja de trabajo
    worksheet.columns = [
      { header: "Id", key: "id", width: 10 },
      { header: "Name", key: "name", width: 32 },
      { header: "Description", key: "description", width: 30 },
    ]

    data.forEach((item) => {
      worksheet.addRow(item)
    })

    const buffer = await workbook.xlsx.writeBuffer()
    saveAs(new Blob([buffer]), `${fileName}.xlsx`)
  }

  const closeMenu = () => {
    setAnchorEl(null)
  }
  return (
    <>
      <Box sx={{ position: "absolute", right: "10%" }}>
        <Tooltip title={t("Configuración de sesión")}>
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
        <MenuItem onClick={() => exportToExcel(dataTable, "Implementos")}>
          <ListItemIcon>
            <IosShare fontSize="small" />
          </ListItemIcon>
          {t("Exportar a Excel")}
        </MenuItem>
        <MenuItem onClick={handleClose}>
          <ListItemIcon>
            <Logout fontSize="small" />
          </ListItemIcon>
          {t("Cerrar sesión")}
        </MenuItem>
      </Menu>
    </>
  )
}

export default ProfileAvatar
