import { useMemo, useState } from "react";
import { Box, CssBaseline, ThemeProvider } from "@mui/material";

import { getTheme, type ThemeMode } from "./theme/theme";
import EmployeesPage from "./pages/EmployeesPage";
import SproutAppBar from "./components/SproutAppBar.tsx";

function App() {
  const [mode, setMode] = useState<ThemeMode>("dark");
  const theme = useMemo(() => getTheme(mode), [mode]);

  const toggleTheme = () => {
    setMode((currentMode) => (currentMode === "dark" ? "light" : "dark"));
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline enableColorScheme />
      <SproutAppBar mode={mode} onToggleTheme={toggleTheme} />
      <Box sx={(theme) => ({ ...theme.mixins.toolbar, mb: 6 })} />
      <Box
        component="main"
        sx={{
          transition: 'background-color 250ms ease, color 250ms ease',
        }}
      >
        <EmployeesPage />
      </Box>

    </ThemeProvider>
  );
}

export default App;
