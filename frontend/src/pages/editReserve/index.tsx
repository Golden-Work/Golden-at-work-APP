import { Box, Typography, TextField, Button,   CircularProgress } from "@mui/material";
import { useParams } from "react-router-dom";
import  { useState, useEffect, ChangeEvent  } from "react";
import getImplements from "@/api/getImplements";
import { useQuery} from "@tanstack/react-query"
import editImplement from "@/api/editImplement"
import { Implement } from "@/interfaces/implement.interface"

function EditReserve() {
  const { id } = useParams();
  const itemId = Number(id);
  const { data: items = [], isFetching } = useQuery({
    queryKey: ["implements"],
    queryFn: getImplements,
  });

  const [formData, setFormData] = useState({
    name: "",
    description: "",
    image: "",
  });
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (isFetching || items.length === 0) {
      return;
    }

    const selectedItem = items.find((item) => item.id === itemId);

    if (selectedItem) {
      setFormData({
        name: selectedItem.name || "",
        description: selectedItem.description || "",
        image: selectedItem.image || "",
      });
    }

    setIsLoading(false);
  }, [itemId, items, isFetching]);

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };
  const saveChanges = async () => {
    try {
      const implementData: Implement = {
        id: itemId,
        name: formData.name,
        description: formData.description,
        image: formData.image,
        created_at: "",
      };

      const implementsDataSend = await editImplement(implementData);
      console.log(implementsDataSend);
    } catch (error) {
      console.error("Error al obtener datos:", error);
    }
  };

  if (isLoading || isFetching) {
    return (
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
    );
  }

  if (!formData.name) {
    return <Typography variant="h4">Implemento no encontrado</Typography>;
  }

  return (
    <Box pt={5}>
      <Typography variant="h4" sx={{ mb: 2 }} textAlign="center" fontWeight={600}>
        Editar Reserva: {formData.name}
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
        <img src={formData.image} alt={formData.name} style={{ width: "60%" }} />

        <TextField
          label="Nombre"
          variant="outlined"
          fullWidth
          margin="normal"
          multiline
          name="name"
          value={formData.name}
          onChange={handleInputChange}
        />
        <TextField
          label="Descripción"
          variant="outlined"
          fullWidth
          margin="normal"
          multiline
          name="description"
          value={formData.description}
          onChange={handleInputChange}
        />
        <TextField
          label="Imagen"
          variant="outlined"
          fullWidth
          margin="normal"
          multiline
          name="image"
          value={formData.image}
          onChange={handleInputChange}
        />
        <Button variant="contained" color="primary" sx={{ mt: 2 }} onClick={saveChanges}>
          Guardar Cambios
        </Button>
      </Box>
    </Box>
  );
}

export default EditReserve;
