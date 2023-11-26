import React, { useEffect } from "react";
import { ThemeOptions, ThemeProvider, createTheme, responsiveFontSizes } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import { useMediaQuery } from "@mui/material";
import Cookies from 'js-cookie';

export const ColorModeContext = React.createContext<{
  toggleColorMode: () => void;
  mode: "light" | "dark";
}>({
  toggleColorMode: () => {},
  mode: "light",
});

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
  };
  return themeOptions;
};

interface ThemeContextProviderProps {
  children: React.ReactNode;
}

export default function ThemeContextProvider({
  children,
}: ThemeContextProviderProps) {
  const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)');
  const savedMode = Cookies.get('colorMode');
  const initialMode: "light" | "dark" = (savedMode as "light" | "dark") || (prefersDarkMode ? "dark" : "light");
  const [mode, setMode] = React.useState<"light" | "dark">(initialMode);

  const toggleColorMode = () => {
    setMode((prevMode) => (prevMode === "light" ? "dark" : "light"));
  };

  useEffect(() => {
    Cookies.set('colorMode', mode, { expires: 365 });
  }, [mode]);

  const theme = React.useMemo(() => {
    let tempTheme = createTheme(getDesignTokens(mode));
    tempTheme = responsiveFontSizes(tempTheme);
    return tempTheme;
  }, [mode]);

  return (
    <ColorModeContext.Provider value={{ toggleColorMode, mode }}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        {children}
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
}
