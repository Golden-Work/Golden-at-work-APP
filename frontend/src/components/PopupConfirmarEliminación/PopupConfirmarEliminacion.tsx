import React from "react";
import { Dialog, DialogTitle, DialogActions, Button } from "@mui/material";
import useDeleteUser from "@/hooks/useDeleteUser";

interface MyModalProps {
  visible: boolean;
  onClose: () => void;
}

const PopupConfirmarEliminacion: React.FC<MyModalProps> = ({ visible, onClose }) => {
  const { deleteUser } = useDeleteUser();

  const handleDeleteUser = () => {
    deleteUser();
    onClose();
  };

  return (
    <Dialog open={visible} onClose={onClose} sx={{ textAlign: "center" }}>
      <DialogTitle>{"¿Está seguro que desea eliminar su cuenta?"}</DialogTitle>
      <DialogActions sx={{ padding: 3 }}>
        <Button onClick={onClose} variant="outlined" sx={{  marginInlineEnd: 2 }}>
          Cancelar
        </Button>
        <Button onClick={handleDeleteUser} color="primary" variant="contained">
          Confirmar
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default PopupConfirmarEliminacion;
