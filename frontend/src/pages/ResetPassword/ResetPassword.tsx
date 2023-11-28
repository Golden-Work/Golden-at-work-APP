import classes from "./ResetPassword.module.css"
import { Box, Paper, TextField, Typography } from "@mui/material"
import { useSearchParams } from "react-router-dom"
import useResetPassword from "@/hooks/useResetPassword"
import LoadingButton from "@mui/lab/LoadingButton"
import { useTranslation } from 'react-i18next';
function ResetPassword() {
  const [searchParams, _] = useSearchParams()
  const token = searchParams.get("token")

  const {
    email,
    setEmail,
    password,
    setPassword,
    confirmPassword,
    setConfirmPassword,
    handleResetPassword,
    isLoading,
  } = useResetPassword(token)
  const{t, i18n}=useTranslation();
  return (
    <section className={classes.container}>
      <Paper sx={{ p: 6 }}>
        <Typography variant="h4" fontWeight={600} textAlign="center" mb={2}>
          {t('Recuperar contraseña')}
        </Typography>
        {!token && (
          <Typography variant="body1" textAlign="center" mb={2}>
            {t('Ingrese su correo electrónico para recuperar su contraseña')}
          </Typography>
        )}

        <TextField
          label={t("Email")}
          placeholder="johndoe@unal.edu.co"
          type="email"
          variant="standard"
          value={email}
          fullWidth
          onChange={(e) => setEmail(e.target.value)}
        />
        {token && (
          <>
            <TextField
              label={t("Nueva contraseña")}
              type="password"
              variant="standard"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              fullWidth
              sx={{ mt: 2 }}
            />
            <TextField
              label={t("Confirmar contraseña")}
              type="password"
              variant="standard"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              fullWidth
              sx={{ mt: 2 }}
            />
          </>
        )}
        <Box mt={2}>
          <LoadingButton
            fullWidth
            onClick={handleResetPassword}
            loading={isLoading}
            variant="contained"
          >
            {t("Enviar")}
          </LoadingButton>
        </Box>
      </Paper>
    </section>
  )
}

export default ResetPassword
