import { useState } from 'react';
import {Paper, TextField, Typography } from "@mui/material"
import LoadingButton from "@mui/lab/LoadingButton"
import * as React from 'react';
import classes from "./Admin.module.css"

function AdminAdd(){
    const[implemento,setImplemento]=useState({
        nombre:"",
        estado:"",
        descripcion:"",        
    })

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target
        setImplemento({
          ...implemento,
          [name]: value,
        })
    }

    const handleAdd= async() =>{

    }

    return(
        <div className={classes.container}>
            <Paper sx={{ p: 6 }}>
                <Typography variant="h4" fontWeight={600} textAlign="center" mb={2}>
                    Añadir implemento
                </Typography>
                <div>
                    <TextField
                    label="Nombre"
                    type="text"
                    name="nombre"
                    value={implemento.nombre}
                    variant="standard"
                    onChange={handleInputChange}
                    fullWidth
                    sx={{ mb: 1 }}
                    />
                    <TextField
                    label="Estado"
                    type="text"
                    name="estado"
                    variant="standard"
                    onChange={handleInputChange}
                    fullWidth
                    sx={{ mb: 1 }}
                    />
                    <TextField
                    label="Descripcion"
                    type="text"
                    name="descripcion"
                    value={implemento.descripcion}
                    variant="standard"
                    onChange={handleInputChange}
                    fullWidth
                    sx={{ mb: 1 }}
                    />
                    <LoadingButton
                    onClick={handleAdd}
                    variant="contained">
                        Añadir
                    </LoadingButton>
                </div>
            </Paper>
        </div>      
    );
}

export default AdminAdd