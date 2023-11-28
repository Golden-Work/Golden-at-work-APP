import React, { useState } from 'react';
import { Link } from "react-router-dom";
import PopupErrorLogin from "@/components/PopupErrorLogin/PopupErrorLogin";
import TextField from "@mui/material/TextField";
import { Paper, Typography, Button, Menu, MenuItem } from "@mui/material";
import LoadingButton from "@mui/lab/LoadingButton";
import useLogin from "@/hooks/useLogin";
import { useTranslation } from "react-i18next"
import classes from "./Login.module.css";

function Login() {
  const { t } = useTranslation()
  const {
    handleLogin,
    handleOnClose,
    showMyModal,
    email,
    setEmail,
    password,
    setPassword,
    isLoading,
  } = useLogin();

  const [anchorEl, setAnchorEl] = useState(null);

  const toggleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const closeMenu = () => {
    setAnchorEl(null);
  };

  const changeLanguage = (language, event) => {
    event.preventDefault();
    i18n.changeLanguage(language);
    localStorage.setItem('language', language);
    closeMenu();
  };

  return (
    <section className={classes.container}>
      {/* Botón y Menú para cambiar el idioma */}
      <Button
        id="idiom-button"
        onClick={toggleMenu}
        sx={{ position: 'absolute', top: 16, left: 16 }}
      >
        {t("Idioma")}
      </Button>
      <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={closeMenu}>
        <MenuItem onClick={(e) => changeLanguage('en', e)}>{t("Inglés")}</MenuItem>
        <MenuItem onClick={(e) => changeLanguage('fr', e)}>{t("Francés")}</MenuItem>
        <MenuItem onClick={(e) => changeLanguage('es', e)}>{t("Español")}</MenuItem>
        <MenuItem onClick={(e) => changeLanguage('pt', e)}>{t("Portugués")}</MenuItem>
      </Menu>

      <PopupErrorLogin onClose={handleOnClose} visible={showMyModal} />
      <Paper sx={{ p: 6 }}>
        <Typography variant="h4" fontWeight={600} textAlign="center" mb={2}>
          {t("Login")}
        </Typography>
        <TextField
          label={t("Email")}
          placeholder="johndoe@unal.edu.co"
          type="email"
          variant="standard"
          fullWidth
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          sx={{ mb: 1 }}
        />
        <TextField
          label={t("Contraseña")}
          type="password"
          variant="standard"
          fullWidth
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <div className={classes.forget}>
          <Link to="/reset-password">{t("¿Olvidaste tú contraseña?")}</Link>
        </div>
        <LoadingButton
          onClick={handleLogin}
          fullWidth
          loading={isLoading}
          variant="contained"
        >
          {t("Ingresar")}
        </LoadingButton>
        <div className={classes.register}>
          <p>
            {t("¿No tienes una cuenta?")}{" "}
            <Link to="/signup">{t("Regístrate")}</Link>
          </p>
        </div>
      </Paper>
    </section>
  );
}

export default Login;

