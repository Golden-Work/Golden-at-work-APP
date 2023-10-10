import {
  ThemeOptions,
  ThemeProvider,
  createTheme,
  responsiveFontSizes,
} from "@mui/material/styles"
import CssBaseline from "@mui/material/CssBaseline"
import React from "react"

export const ColorModeContext = React.createContext({
  toggleColorMode: () => {},
})

// This function is used to generate the theme based on the mode and location
// The mode is not being used, but it is there for future use
const getDesignTokens = (mode: "light" | "dark") => {
  const themeOptions: ThemeOptions = {
    palette: {
      mode,
      primary: {
        main: "#9706ff",
      },
      secondary: {
        main: "#27005d",
      },
    },
  }
  return themeOptions
}

interface ThemeContextProviderProps {
  children: React.ReactNode
}

export default function ThemeContextProvider({
  children,
}: ThemeContextProviderProps) {
  const [mode, setMode] = React.useState<"light" | "dark">("light")
  const colorMode = React.useMemo(
    () => ({
      toggleColorMode: () => {
        setMode((prevMode) => (prevMode === "light" ? "dark" : "light"))
      },
    }),
    []
  )
  const theme = React.useMemo(() => {
    let tempTheme = createTheme(getDesignTokens(mode))
    tempTheme = responsiveFontSizes(tempTheme)
    return tempTheme
  }, [mode, location])

  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <CssBaseline>{children}</CssBaseline>
      </ThemeProvider>
    </ColorModeContext.Provider>
  )
}
