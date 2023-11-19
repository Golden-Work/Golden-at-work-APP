// React and Components
import { useNavigate } from "react-router"
import { styled } from "@mui/material/styles"

// Material-UI Components
import Button from "@mui/material/Button"

import getReservations from "@/api/getReservations"
import { useQuery } from "@tanstack/react-query"
import ProfileAvatar from "./ProfileAvatar"
import classes from "./AdminHome.module.css"
import { DataGrid, GridColDef } from "@mui/x-data-grid"

const CustomButton = styled(Button)({
  height: "45px",
  borderRadius: "10px",
  fontSize: "15px",
  border: "none",
  outline: "none",
  cursor: "pointer",
  padding: "0 17px",
  textAlign: "center",
  backgroundColor: "#bb86fc",
  color: "white",
  marginRight: "10px",
  marginLeft: "10px",
  transition: "background-color 0.3s, box-shadow 0.3s, color 0.3s",
  "&:hover": {
    backgroundColor: "#da44ff",
    boxShadow: "0 0 5px rgba(148, 0, 255, 0.5)",
    color: "#240046",
    cursor: "pointer",
  },
})

function AdminHome() {
  const navigate = useNavigate()

  const { data: dataReservations = [] } = useQuery({
    queryKey: ["reservations"],
    queryFn: getReservations,
  })

  const columns: GridColDef[] = [
    { field: "id", headerName: "ID", width: 70 },
    { field: "name", headerName: "Nombre", width: 130 },
    { field: "description", headerName: "Descripción", width: 130 },
    { field: "status", headerName: "Estado", width: 130 },
  ]

  const dataTable = dataReservations
    .filter((a) => a.status === "RESERVED")
    .map((a, index) => {
      return {
        id: index + 1,
        name: a.implement?.name,
        status: a.status as "free" | "not-available" | "reserved",
        image: a.implement?.image,
        description: a.implement?.description,
      }
    })

  const handleAdd = () => {
    navigate("/add")
  }
  const handleEliminate = () => {}

  return (
    <>
      <header className={classes.header}>
        <div className={classes.encabezadoSuperior}>
          <CustomButton onClick={handleEliminate}>Historial</CustomButton>
          <CustomButton onClick={handleAdd}>Añadir implemento</CustomButton>
          <ProfileAvatar />
        </div>
      </header>
      <main>
        <DataGrid rows={dataTable} columns={columns} />
      </main>
    </>
  )
}

export default AdminHome
