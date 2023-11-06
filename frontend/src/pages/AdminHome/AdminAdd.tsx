import { useState } from 'react';
import {Paper, TextField, Typography } from "@mui/material"
import LoadingButton from "@mui/lab/LoadingButton"
import * as React from 'react';
import { toast } from "react-toastify"
import classes from "./Admin.module.css"
import useAdd from "@/hooks/useAdd"
import {Implement} from "@/interfaces/implement.interface"


function AdminAdd(){
    const[implemento,setImplemento]=useState<Implement>({
        name:"",
        description:"",
        image:"",
        created_at:"",              
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
        if(!implemento.name){
            errors.push("Por favor ingrese el nombre del implemento")
        }
        if(!implemento.description){
            errors.push("Por favor ingrese una descripción del implemento")
        }
        if(!implemento.created_at){
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
                    label="Nombre"
                    type="text"
                    name="name"
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
                    value={implemento.description}
                    variant="standard"
                    onChange={handleInputChange}
                    fullWidth
                    sx={{ mb: 1 }}
                    />
                    <TextField
                    label="Fecha de creación"
                    type="date"
                    name="created_at"
                    value={implemento.created_at}
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