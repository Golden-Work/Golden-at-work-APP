// React and Components
import { useNavigate } from "react-router"

// Material-UI Components
import Button from "@mui/material/Button"
import AppBar from "@mui/material/AppBar"

import getReservations from "@/api/getReservations"
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import ProfileAvatar from "./ProfileAvatar"
import { DataGrid, GridColDef } from "@mui/x-data-grid"
import { Box, Tooltip } from "@mui/material"
import dayjs from "dayjs"
import updateReservation from "@/api/updateReservation"
import { LoadingButton } from "@mui/lab"
import { User } from "@/interfaces/user.interface"
import { useTranslation } from "react-i18next"

function AdminHome() {
  const navigate = useNavigate()
  const { t } = useTranslation()

  const { data: dataReservations = [], isFetching } = useQuery({
    queryKey: ["reservations"],
    queryFn: getReservations,
  })

  const queryClient = useQueryClient()

  const mutation = useMutation({
    mutationFn: updateReservation,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["reservations"] })
    },
  })

  const handleClickOnAction = (status: string, reservationId: number) => {
    if (status === "RESERVED") {
      mutation.mutate({
        id: reservationId,
        status: "BORROWED",
      })
    } else if (status === "BORROWED") {
      mutation.mutate({
        id: reservationId,
        status: "RETURNED",
      })
    }
  }

  const columns: GridColDef[] = [
    { field: "id", headerName: t("ID"), width: 100 },
    { field: "name", headerName: t("Implemento"), width: 150 },
    { field: "date", headerName: t("Día"), width: 100 },
    { field: "start_hour", headerName: t("Hora de inicio"), width: 100 },
    { field: "end_hour", headerName: t("Hora de fin"), width: 100 },
    { field: "user", headerName: t("Usuario"), width: 250 },
    {
      field: "actions",
      headerName: t("Acciones"),
      width: 130,
      sortable: false,
      filterable: false,
      renderCell: (row) => {
        const isButtonDisabled =
          row.row.status === "RETURNED" ||
          // allow only 15 minutes before the start date to borrow
          // or 10 minutes after the start date to borrow
          !(
            dayjs(row.row.completeDate).isBefore(
              dayjs().subtract(15, "minute")
            ) && row.row.status === "RESERVED"
          ) ||
          !(
            dayjs(row.row.completeDate).isBefore(dayjs().add(10, "minute")) &&
            row.row.status === "RESERVED"
          )
        return (
          <>
            <Tooltip
              placement="left"
              title={
                isButtonDisabled && row.row.status === "RESERVED"
                  ? "Solo se puede prestar 15 minutos antes de la hora de inicio y 10 minutos después de la hora de inicio"
                  : ""
              }
            >
              <span>
                <LoadingButton
                  size="small"
                  variant="contained"
                  color="primary"
                  disabled={isButtonDisabled || mutation.isPending}
                  onClick={() =>
                    handleClickOnAction(row.row.status, row.row.id)
                  }
                  loading={mutation.isPending || isFetching}
                >
                  {row.row.status === "RESERVED"
                    ? "Prestar"
                    : row.row.status === "BORROWED"
                    ? "Devolver"
                    : "Devuelto"}
                </LoadingButton>
              </span>
            </Tooltip>
          </>
        )
      },
    },
  ]
  const dataTable = dataReservations
    .filter(
      (a) =>
        a.status === "RESERVED" ||
        a.status === "BORROWED" ||
        a.status === "RETURNED"
    )
    .map((a) => {
      return {
        id: a.id,
        name: a.implement?.name,
        status: a.status,
        date: dayjs(a.start_date).format("dddd"),
        completeDate: a.start_date,
        start_hour: dayjs(a.start_date).format("HH:mm"),
        end_hour: dayjs(a.end_date).format("HH:mm"),
        user: (a.borrowed_by as User)?.email,
      }
    })

  const handleAdd = () => {
    navigate("/add")
  }
  const handleDelete = () => {
    navigate("/editReserve")
  }
  const handleEliminate = () => {}

  return (
    <>
      <AppBar position="static" sx={{ padding: 4, color: "primary" }}>
        <Box
          sx={{
            display: "flex",
            justifyContent: "left",
            paddingInline: 5,
          }}
        >
          <Button
            color="inherit"
            size="large"
            onClick={handleEliminate}
            sx={{ marginRight: 15 }}
          >
            {t("Historial")}
          </Button>
          <Button
            color="inherit"
            size="large"
            onClick={handleAdd}
            sx={{ marginRight: 15 }}
          >
            {t("Añadir implemento")}
          </Button>
          <Button
            color="inherit"
            size="large"
            onClick={handleDelete}
            sx={{ marginRight: 15 }}
          >
            {t("Eliminar implemento")}
          </Button>
          <ProfileAvatar />
        </Box>
      </AppBar>
      <main>
        <Box maxWidth={1000} margin="auto" sx={{ paddingTop: 5 }}>
          <DataGrid
            rows={dataTable}
            columns={columns}
            checkboxSelection
            disableRowSelectionOnClick
          />
        </Box>
      </main>
    </>
  )
}

export default AdminHome
