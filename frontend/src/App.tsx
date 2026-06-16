import { useMemo, useState, useEffect } from "react";
import {Box, CssBaseline, ThemeProvider, Fade} from "@mui/material";

import { getTheme, type ThemeMode } from "./theme/theme";
import EmployeesPage from "./pages/EmployeesPage";
import SproutAppBar from "./components/SproutAppBar.tsx";
import SproutDrawer from "./components/SproutDrawer.tsx";
import SproutFooter from "./components/SproutFooter.tsx";
import RolesPage from "./pages/RolesPage.tsx";
import TeamsPage from "./pages/TeamsPage.tsx";
import AuthPage from "./pages/AuthPage.tsx";

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

  // Drawer Navigation
  const DRAWER_WIDTH = 320;
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [selectedPage, setSelectedPage] = useState("Auth");
  const drawerItems = ["Employees", "Roles", "Teams"];

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline enableColorScheme />
      <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
        <SproutAppBar mode={mode} onToggleTheme={toggleTheme} onMenuClick={() => setDrawerOpen(prev => !prev)} onProfileMenuClick={setSelectedPage} />
        <SproutDrawer drawerWidth={DRAWER_WIDTH} open={drawerOpen} itemList={drawerItems} onItemClick={setSelectedPage} />

        <Box sx={(theme) => ({ ...theme.mixins.toolbar })} />

        {/*page main context*/}
        <Box component="main" sx={{
          flex: 1,
          my: 6,
          ml: drawerOpen ? DRAWER_WIDTH+'px' : 0,
          transition: theme => theme.transitions.create(['margin'], { easing: theme.transitions.easing.sharp, duration: theme.transitions.duration.enteringScreen }),
          position: 'relative',
        }}>
          <Fade in={selectedPage === "Employees"} timeout={300} unmountOnExit>
            <Box>
              <EmployeesPage />
            </Box>
          </Fade>

          <Fade in={selectedPage === "Roles"} timeout={300} unmountOnExit>
            <Box>
              <RolesPage />
            </Box>
          </Fade>

          <Fade in={selectedPage === "Teams"} timeout={300} unmountOnExit>
            <Box>
              <TeamsPage />
            </Box>
          </Fade>

          <Fade in={selectedPage === "Auth"} timeout={300} unmountOnExit>
            <Box>
              <AuthPage />
            </Box>
          </Fade>
        </Box>
        <Box sx={{
          ml: drawerOpen ? DRAWER_WIDTH+'px' : 0,
          transition: theme => theme.transitions.create(['margin'], { easing: theme.transitions.easing.sharp, duration: theme.transitions.duration.leavingScreen }),
        }}>
          <SproutFooter />
        </Box>

      </Box>
    </ThemeProvider>
  );
}

export default App;
