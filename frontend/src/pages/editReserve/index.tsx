import {
  Box,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,TableRow,
  Paper,
  CircularProgress,
  TablePagination,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  DialogProps,
} from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import getImplements from "@/api/getImplements";
import { useState } from "react";
import { Implement } from "@/interfaces/implement.interface";
// import editImplement from "@/api/editImplement"
// import { ChangeEvent } from "react"; 
// import { useQueryClient } from '@tanstack/react-query';
import React from "react"; 
import deleteImplement from "@/api/deleteImplement"
import { useNavigate } from "react-router-dom"


function EditReserve() {
  const { data: items = [], isFetching } = useQuery({
    queryKey: ["implements"],
    queryFn: getImplements,
  });

  const navigate = useNavigate();
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [selectedItem, setSelectedItem] = useState<Implement | null>(null);
  const [openDialog, setOpenDialog] = useState(false);

  
  const handleRowClick = (item: Implement) => {
    setSelectedItem(item);
    setOpenDialog(true);
  };
  

  const handleChangePage = (_event: React.MouseEvent<HTMLButtonElement> | null, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };


  /*const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    
    if (selectedItem) {
      switch (name) {
        case 'name':
          setSelectedItem({ ...selectedItem, name: value });
          break;
        case 'description':
          setSelectedItem({ ...selectedItem, description: value });
          break;
        case 'image':
          setSelectedItem({ ...selectedItem, image: value });
          break;
        default:
          break;
      }
    }
  };*/
  
  /*const queryClient = useQueryClient(); 
  const saveChanges = async () => {
    try {
      if (selectedItem) {
        const implementData: Implement = {
          id: Number(selectedItem.id) || 0, 
          name: selectedItem.name || "",
          description: selectedItem.description || "",
          image: selectedItem.image || "",
          created_at: "", 
        };
        
        const implementsDataSend = await editImplement(implementData);
        queryClient.invalidateQueries({ predicate: (query) => query.queryKey[0] === "implements" });
        console.log(implementsDataSend);
      }
    } catch (error) {
      console.error("Error al obtener datos:", error);
    }
  };*/
  
  

    const deleteItemSelected = async () => {
      try {
        const itemId = selectedItem?.id;
    
        if (itemId) {
          await deleteImplement(itemId);
          navigate("/admin");
        } else {
          console.error("No se pudo obtener el ID del elemento seleccionado");
        }
      } catch (error) {
        console.error("ERROR DELETE", error);
      }
    };
    

  const [fullWidth] = React.useState(true);
  const [maxWidth] = React.useState<DialogProps['maxWidth']>('md');

  return (
    <Box sx={{ pt: 10 }}>
      <Typography variant="h5" sx={{ mb: 1 }} textAlign="center" fontWeight={600}>
        Eliminar Items
      </Typography>
      {isFetching ? (
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
          }}
        >
          <CircularProgress size={100} />
        </Box>
      ) : (
        <Box
          sx={{
            margin: "auto",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            maxWidth: 800,
          }}
        >
          <TableContainer component={Paper}>
            <Table sx={{ border: '2px solid grey' }}>
              <TableHead>
                <TableRow>
                  <TableCell>Nombre</TableCell>
                  <TableCell>Descripción</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {items.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((item) => (
                  <TableRow key={String(item.id)} onClick={() => handleRowClick(item)}>
                    <TableCell>{item.name}</TableCell>
                    <TableCell>{item.description}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
          <TablePagination
            rowsPerPageOptions={[10, 25, 50, { value: -1, label: 'Todos' }]}
            component="div"
            count={items.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
            labelRowsPerPage="Filas por página:"
          />
          <Dialog open={openDialog} onClose={handleCloseDialog} fullWidth={fullWidth} maxWidth={maxWidth} >
          <DialogTitle>{selectedItem && selectedItem.name}</DialogTitle>
            <DialogContent>
              <Box
                sx={{
                  margin: "auto",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  maxWidth: 900,
                }}
              >
                <img src={selectedItem?.image || ""} alt={selectedItem?.name || ""} style={{ width: "20%" }} />
                <TextField
                  label="Nombre"
                  variant="outlined"
                  fullWidth
                  margin="normal"
                  multiline
                  name="name"
                  value={selectedItem && selectedItem.name}
                  //onChange={handleInputChange}
                />
                <TextField
                  label="Descripción"
                  variant="outlined"
                  fullWidth
                  margin="normal"
                  multiline
                  name="description"
                  value={selectedItem && selectedItem.description}
                  //onChange={handleInputChange}
                />
                <TextField
                  label="Imagen"
                  variant="outlined"
                  fullWidth
                  margin="normal"
                  multiline
                  name="image"
                  value={selectedItem && selectedItem.image}
                  //onChange={handleInputChange}
                />
              </Box>
            </DialogContent>
            <DialogActions sx={{paddingInline: 2}}>
              <Button variant="contained"  onClick={deleteItemSelected}>Eliminar item</Button>
               {/*<Button variant="contained" color="primary"  onClick={saveChanges}>
                Guardar Cambios
              </Button>*/}
            </DialogActions>
          </Dialog>
        </Box>
      )}
    </Box>
  );
}

export default EditReserve;
