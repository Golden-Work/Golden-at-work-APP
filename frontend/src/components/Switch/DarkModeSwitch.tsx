// DarkModeSwitch.tsx
import React from "react"
import { ColorModeContext } from "../../contexts/MUIContext"
import IconButton from "@mui/material/IconButton"
import Brightness4Icon from "@mui/icons-material/Brightness4"
import Brightness7Icon from "@mui/icons-material/Brightness7"
import { Tooltip } from "@mui/material"
import Cookies from "js-cookie"

function DarkModeSwitch() {
  const { toggleColorMode, mode } = React.useContext(ColorModeContext)

  const handleToggle = () => {
    toggleColorMode()
    Cookies.set("colorMode", mode)
  }

  return (
    <Tooltip title="Modo">
      <IconButton onClick={handleToggle} color="inherit">
        {mode === "dark" ? <Brightness7Icon /> : <Brightness4Icon />}
      </IconButton>
    </Tooltip>
  )
}

export default DarkModeSwitch
