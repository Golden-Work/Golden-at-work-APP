import { useState } from 'react';
import {Paper, TextField, Typography } from "@mui/material"
import LoadingButton from "@mui/lab/LoadingButton"
import * as React from 'react';
import { toast } from "react-toastify"
import classes from "./Admin.module.css"
import useAdd from "@/hooks/useAdd"


function AdminAdd(){
    const[implemento,setImplemento]=useState({
        id:"",
        nombre:"",
        descripcion:"",
        creacion:"",
        imagen:"",      
    })

    const{addImplemento,isLoading}=useAdd()

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target
        setImplemento((prevState)=>({
          ...prevState,
          [name]: value,
        }))
    }

    const handleAdd= async() =>{
        const errors=[]
        if(!implemento.id){
            errors.push("Por favor inserte el ID del implemento")
        }
        if(implemento.id<0){
            errors.push("El ID del implemento debe ser positivo")
        }
        if(!implemento.nombre){
            errors.push("Por favor ingrese el nombre del implemento")
        }
        if(!implemento.descripcion){
            errors.push("Por favor ingrese una descripción del implemento")
        }
        if(!implemento.creacion){
            errors.push("Por favor ingrese la fecha de creación del implemento")
        }
        if (errors.length) {
            return errors.forEach((error) => toast.error(error))
        }
        return addImplemento(implemento)
    }

    return(
        <div className={classes.container}>
            <Paper sx={{ p: 6 }}>
                <Typography variant="h4" fontWeight={600} textAlign="center" mb={2}>
                    Añadir implemento
                </Typography>
                <div>
                    <TextField
                    label="ID"
                    type="number"
                    name="id"
                    value={implemento.id}
                    variant="standard"
                    onChange={handleInputChange}
                    fullWidth
                    sx={{ mb: 1 }}
                    />
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
                    label="Descripcion"
                    type="text"
                    name="descripcion"
                    value={implemento.descripcion}
                    variant="standard"
                    onChange={handleInputChange}
                    fullWidth
                    sx={{ mb: 1 }}
                    />
                    <TextField
                    label="Fecha de creación"
                    type="date"
                    name="creacion"
                    value={implemento.creacion}
                    variant="standard"
                    onChange={handleInputChange}
                    fullWidth
                    sx={{ mb: 1 }}
                    />
                    <LoadingButton
                    onClick={handleAdd}
                    variant="contained"
                    loading={isLoading}>
                        Añadir
                    </LoadingButton>
                </div>
            </Paper>
        </div>      
    );
}

export default AdminAdd