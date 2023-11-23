import {
  ThemeOptions,
  ThemeProvider,
  createTheme,
  responsiveFontSizes,
} from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import React, {  useEffect } from "react";
import { useMediaQuery } from "@mui/material";

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
  const savedMode = localStorage.getItem("colorMode");
  const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)');
  const initialMode: string | null = savedMode || (prefersDarkMode ? "dark" : "light");
  const [mode, setMode] = React.useState<"light" | "dark" | null>(initialMode === "light" || initialMode === "dark" ? initialMode : null);
  const toggleColorMode = () => {
    setMode((prevMode) => (prevMode === "light" ? "dark" : "light"));
  };

  useEffect(() => {
    if (initialMode !== null) {
      localStorage.setItem("colorMode", initialMode);
    }
  }, [initialMode]);

  const theme = React.useMemo(() => {
    let tempTheme = createTheme(getDesignTokens(mode || "light"));
    tempTheme = responsiveFontSizes(tempTheme);
    return tempTheme;
  }, [mode]);

  return (
    <ColorModeContext.Provider value={{ toggleColorMode, mode: mode || "light" }}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        {children}
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
}
