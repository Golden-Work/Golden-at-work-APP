import { useState } from "react"
import { Box, Paper, TextField, Typography } from "@mui/material"
import LoadingButton from "@mui/lab/LoadingButton"
import * as React from "react"
import { toast } from "react-toastify"
import classes from "./Admin.module.css"
import useAdd from "@/hooks/useAdd"

import { styled } from '@mui/material/styles';
import Button from '@mui/material/Button';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';

 interface Implement {
  id: number
  name: string
  description: string
  image: File | null
  created_at?: string
}

function AdminAdd() {
  const [implemento, setImplemento] = useState<Partial<Implement>>({
    name: "",
    description: "",
    image: null,
  });



  const { addImplemento, isLoading } = useAdd()

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target
    setImplemento((prevState) => ({
      ...prevState,
      [name]: value,
    }))
  }
  const handleFileInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files?.[0];
    if (selectedFile) {
      setImplemento((prevState) => ({
        ...prevState,
        image: selectedFile,
      }));
    }
  };
  
  
  const handleAdd = async () => {
    const errors = []
    if (!implemento.name) {
      errors.push("Por favor ingrese el nombre del implemento")
    }
    if (!implemento.description) {
      errors.push("Por favor ingrese una descripción del implemento")
    }
    if (implemento.image === null) {
      errors.push("Por favor ingrese una imagen del implemento");
    }
    
    if (errors.length) {
      return errors.forEach((error) => toast.error(error))
    }
    return addImplemento(implemento as Implement)
  }

  const VisuallyHiddenInput = styled('input')({
  clip: 'rect(0 0 0 0)',
  clipPath: 'inset(50%)',
  height: 1,
  overflow: 'hidden',
  position: 'absolute',
  bottom: 0,
  left: 0,
  whiteSpace: 'nowrap',
  width: 1,
});
  return (
    <div className={classes.container}>
      <Paper sx={{ p: 6 }}>
        <Typography variant="h4" fontWeight={600} textAlign="center" mb={2}>
          Añadir implemento
        </Typography>
        <div>
          <TextField
            label="Nombre"
            type="text"
            name="name"
            multiline
            value={implemento.name}
            variant="standard"
            onChange={handleInputChange}
            fullWidth
            sx={{ mb: 1 }}
          />
          <TextField
            label="Descripcion"
            type="text"
            name="description"
            multiline
            value={implemento.description}
            variant="standard"
            onChange={handleInputChange}
            fullWidth
            sx={{ mb: 1 }}
          />
          <Box sx={{ '& > button': { m: 3 } }}>
            <Button component="label"variant="outlined" sx={{position: "sticky"}} startIcon={<CloudUploadIcon />}>
              Subir imagen
              <VisuallyHiddenInput type="file" accept="image/*" onChange={handleFileInputChange} />
            </Button>
            {implemento.image && (
              <div>
                <img
                  src={URL.createObjectURL(implemento.image)}
                  alt="Vista previa"
                  className="preview-image"
                  style={{ maxWidth: '220px', maxHeight: '280px', marginBlockStart: '10px', }}
                />
              </div>
            )}
                <LoadingButton
                  
                  onClick={handleAdd}
                  variant="contained"
                  
                  loading={isLoading}
                >
                  Añadir
                </LoadingButton>
            </Box>
        </div>
      </Paper>
    </div>
  )
}

export default AdminAdd
