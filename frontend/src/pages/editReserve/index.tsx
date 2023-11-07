import { Box, Typography, TextField, Button } from "@mui/material";
import { useParams } from "react-router-dom";
import  { useMemo, useState, ChangeEvent  } from "react";
import getImplements from "@/api/getImplements";
import { useQuery} from "@tanstack/react-query"
import editImplement from "@/api/editImplement"
import { Implement } from "@/interfaces/implement.interface"
function editReserve() {
  const { id } = useParams();
  const itemId = Number(id);
  const { data: items = [] } = useQuery({
    queryKey: ["implements"],
    queryFn: getImplements,
  });
  
  const selectedItem = useMemo(() => {
    if (isNaN(itemId)) {
      return null;
    }
    return items.find((item) => item.id === itemId) || null;
  }, [itemId, items]);

  if (!selectedItem) {
    return <Typography variant="h4">Implemento no encontrado</Typography>;
  }
  const [name, setName] = useState(selectedItem?.name || "");
  const [description, setDescription] = useState(selectedItem?.description || "");
  const [image, setImage] = useState(selectedItem?.image || "");

  const implementData: Implement = {
    id: selectedItem?.id,
    name: selectedItem?.name || name,
    description: selectedItem?.description || description,
    image: selectedItem?.image || image,
    created_at: selectedItem?.created_at,
  };
  const saveChanges = async () => {
    try {  
      const implementsData = await editImplement(implementData);
      console.log(implementsData);
    } catch (error) {
      console.error("Error al obtener datos:", error);
    }
    console.log(name, description, image)
  }
  
  
  return (
    <Box pt={5}>
      <Typography variant="h4" sx={{ mb: 2 }} textAlign="center" fontWeight={600}>
        Editar Reserva: {selectedItem.name}
      </Typography>
      <Box
        sx={{
          margin: "auto",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          maxWidth: 500,
        }}
      >
        <img src={selectedItem.image} alt={selectedItem.name} style={{ width: "60%" }} />
       
        <TextField
          label="Nombre"
          variant="outlined"
          fullWidth
          margin="normal"
          multiline 
          value={name} 
          onChange={(e) => setName(e.target.value)}

        />
        <TextField
          label="Descripción"
          variant="outlined"
          fullWidth
          margin="normal"
          multiline 
          value={description}
          onChange={(e) => setDescription(e.target.value)}

        />
         <TextField
          label="Imagen"
          variant="outlined"
          fullWidth
          margin="normal"
          multiline 
          value={image}
          onChange={(e) => setImage(e.target.value)}

        />
        <Button variant="contained" color="primary" sx={{ mt: 2 }} onClick={saveChanges}>
          Guardar Cambios
        </Button>

      </Box>
    </Box>
  );
}

export default editReserve;
