import { useMemo } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import {
  Box,
  Paper,
  Tabs,
  Tab,
  Container,
  Avatar,
  Typography,
  useTheme,
} from "@mui/material";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import LoginForm from "../components/LoginForm";
import RegisterForm from "../components/RegisterForm";

type Props = {
  defaultTab?: 0 | 1;
};

export default function AuthPage({ defaultTab }: Props) {
  const location = useLocation();
  const navigate = useNavigate();
  const theme = useTheme();

  // Derive the active tab from navigation state or pathname so the UI reflects route changes
  const tab = useMemo<0 | 1>(() => {
    const s = (location.state as { tab?: 0 | 1 } | undefined)?.tab;
    if (typeof s === "number") return s;
    if (location.pathname.endsWith("/register")) return 1;
    return defaultTab ?? 0;
  }, [location.pathname, location.state, defaultTab]);
  return (
    <Container maxWidth="sm" sx={{ mt: 8, mb: 8}}>
      {/* set a contrasting text color so children (like Tabs/Tab) can inherit */}
      <Paper elevation={12} sx={{ backgroundImage: 'none', p: 3, borderRadius: 2, bgcolor: theme.palette.primary.main, color: theme.palette.primary.contrastText }}>
        <Avatar sx={{ bgcolor: theme.palette.secondary.main }}>
          <LockOutlinedIcon />
        </Avatar>
        <Box>
          <Typography variant="h6">Welcome</Typography>
          <Typography variant="body2" color="text.secondary">
            Sign in or create an account
          </Typography>
        </Box>

        <Box sx={{ borderBottom: 1, borderColor: "divider", mb: 2 }}>
          {/* use textColor="inherit" so Tab labels inherit the Paper text color (contrastText) */}
          <Tabs value={tab} onChange={(_, v) => { const newTab = v as 0 | 1; navigate(newTab === 1 ? '/register' : '/login', { state: { tab: newTab } }); }} variant="fullWidth" textColor="inherit" indicatorColor="secondary">
            <Tab label="Login" />
            <Tab label="Register" />
          </Tabs>
        </Box>

        <Box>{tab === 0 ? <LoginForm/> : <RegisterForm/>}</Box>
      </Paper>
    </Container>
  );
}
