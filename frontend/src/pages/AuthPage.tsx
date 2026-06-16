import { useState } from "react";
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

export default function AuthPage() {
  const [tab, setTab] = useState<0 | 1>(0);
  const theme = useTheme();
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
          <Tabs value={tab} onChange={(_, v) => setTab(v as 0 | 1)} variant="fullWidth" textColor="inherit" indicatorColor="secondary">
            <Tab label="Login" />
            <Tab label="Register" />
          </Tabs>
        </Box>

        <Box>{tab === 0 ? <LoginForm /> : <RegisterForm />}</Box>
      </Paper>
    </Container>
  );
}
