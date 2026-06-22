import { useEffect, useMemo, useState } from "react";
import type { ReactNode } from "react";
import {Box, CssBaseline, ThemeProvider} from "@mui/material";
import { BrowserRouter, Routes, Route, Navigate, useNavigate } from "react-router-dom";

import {getTheme, type ThemeMode} from "./theme/theme";
import EmployeesPage from "./pages/EmployeesPage";
import SproutAppBar from "./components/SproutAppBar.tsx";
import SproutDrawer from "./components/SproutDrawer.tsx";
import SproutFooter from "./components/SproutFooter.tsx";
import RolesPage from "./pages/RolesPage.tsx";
import TeamsPage from "./pages/TeamsPage.tsx";
import AuthPage from "./pages/AuthPage.tsx";
import UnknownPage from "./pages/UnknownPage.tsx";
import { AuthProvider, useAuth } from "./context/AuthContext";

function AppContent() {
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

  const navigate = useNavigate();
  const handleNavigate = (page: string, tab?: 0 | 1) => {
    // support callers that pass explicit login/register
    if (page.toLowerCase() === "login") {
      navigate("/login", { state: { tab } });
      return;
    }
    if (page.toLowerCase() === "register") {
      navigate("/register", { state: { tab } });
      return;
    }
    const map: Record<string, string> = { Employees: "/employees", Roles: "/roles", Teams: "/teams" };
    const to = map[page] ?? "/";
    navigate(to);
  };

  const { user } = useAuth();

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline enableColorScheme />
      <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
        <SproutAppBar mode={mode} onToggleTheme={toggleTheme} onMenuClick={() => setDrawerOpen(prev => !prev)} onProfileMenuClick={handleNavigate} />
        <SproutDrawer drawerWidth={DRAWER_WIDTH} open={drawerOpen} itemList={["Employees","Roles","Teams"]} onItemClick={handleNavigate} onClose={() => setDrawerOpen(false)} isLoggedIn={!!user} />

        <Box sx={(theme) => ({ ...theme.mixins.toolbar })} />

        {/*page main context*/}
        <Box component="main" sx={{
          flex: 1,
          my: 6,
          position: 'relative',
          // ensure a stable stacking context and height for absolutely positioned pages
          minHeight: 0,
        }}>

          <Routes>
            <Route path="/login" element={user ? <Navigate to="/" /> : <AuthPage defaultTab={0} />} />
            <Route path="/register" element={user ? <Navigate to="/" /> : <AuthPage defaultTab={1} />} />
            <Route path="/employees" element={<RequireAuth><EmployeesPage /></RequireAuth>} />
            <Route path="/roles" element={<RequireAuth><RolesPage /></RequireAuth>} />
            <Route path="/teams" element={<RequireAuth><TeamsPage /></RequireAuth>} />
            <Route path="/" element={user ? <Navigate to="/employees" /> : <Navigate to="/login" />} />
            <Route path="*" element={<UnknownPage />} />
          </Routes>

        </Box>
        <SproutFooter />

      </Box>
    </ThemeProvider>
  );
}

function RequireAuth({ children }: { children: ReactNode }) {
  const { user, loading } = useAuth();
  if (loading) return null;
  return user ? (children as never) : <Navigate to="/login" replace />;
}

export default function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <AppContent />
      </AuthProvider>
    </BrowserRouter>
  );
}
