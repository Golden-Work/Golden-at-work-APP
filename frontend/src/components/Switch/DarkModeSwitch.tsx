// DarkModeSwitch.tsx
import React from "react";
import { ColorModeContext } from "../../contexts/MUIContext";
import IconButton from "@mui/material/IconButton";
import Brightness4Icon from "@mui/icons-material/Brightness4";
import Brightness7Icon from "@mui/icons-material/Brightness7";
import { useTheme } from "@mui/material/styles";
import { Tooltip } from "@mui/material"
function DarkModeSwitch() {
  const { toggleColorMode } = React.useContext(ColorModeContext);
  const theme = useTheme();

  return (
    
        <Tooltip title="Modo">
            <IconButton onClick={toggleColorMode} color="inherit" >
            {theme.palette.mode === "dark" ? <Brightness7Icon /> : <Brightness4Icon />}
            </IconButton>
        </Tooltip>
    
  );
}

export default DarkModeSwitch;
