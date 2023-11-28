import classes from "./Register.module.css";

import { Box, Paper, TextField } from "@mui/material";

import LoadingButton from "@mui/lab/LoadingButton";

import useUpdateProfile from "@/hooks/useUpdateProfile";

function EditProfile({ user }) {

  const userData = {
    last_name: user.last_name,
    document: user.document, 
    major: user.major  
  };
  
  const { updateProfile, isLoading } = useUpdateProfile();

  const handleSave = async () => {
    await updateProfile(userData);
  };

  return (
    <section className={classes.container}>
      <Paper sx={{ p: 6 }}>

        <TextField
          label="Apellido"
          value={userData.last_name}
          disabled
        />

        <TextField
          label="Documento"
          value={userData.document}
          disabled  
        />

        <TextField
          label="Programa Académico" 
          value={userData.major}
          disabled
        />

        <Box mt={3}>
          <LoadingButton
            onClick={handleSave}
            loading={isLoading} 
            variant="contained"
          >
            Guardar Cambios
          </LoadingButton>
        </Box>

      </Paper>
    </section>
  );
}

export default EditProfile;