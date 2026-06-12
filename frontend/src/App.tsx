import { useMemo, useState, useEffect } from "react";
import { Box, CssBaseline, ThemeProvider } from "@mui/material";

import { getTheme, type ThemeMode } from "./theme/theme";
import EmployeesPage from "./pages/EmployeesPage";
import SproutAppBar from "./components/SproutAppBar.tsx";
import SproutFooter from "./components/SproutFooter.tsx";

function App() {
  const [mode, setMode] = useState<ThemeMode>(() =>
    typeof window !== "undefined" && window.matchMedia?.("(prefers-color-scheme: dark)").matches
      ? "dark"
      : "light"
  );

  // keep theme memoized
  const theme = useMemo(() => getTheme(mode), [mode]);

  const toggleTheme = () => {
    setMode((currentMode) => (currentMode === "dark" ? "light" : "dark"));
  };

  // Follow OS/browser preference changes
  useEffect(() => {
    if (typeof window === "undefined" || !window.matchMedia) return;

    const mq = window.matchMedia("(prefers-color-scheme: dark)");
    const onChange = (e: MediaQueryListEvent) => setMode(e.matches ? "dark" : "light");

    mq.addEventListener("change", onChange);

    return () => {
      mq.removeEventListener("change", onChange);
    };
  }, []);

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

      <SproutFooter />
    </ThemeProvider>
  );
}

export default App;
