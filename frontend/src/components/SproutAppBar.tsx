import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import {Button, Card, CardActions, CardContent, Divider, Menu, Typography,} from "@mui/material";
import {alpha} from '@mui/material/styles';
import MenuIcon from '@mui/icons-material/Menu';
import AccountCircle from '@mui/icons-material/AccountCircle';
import GitHubIcon from '@mui/icons-material/GitHub';
import type {ThemeMode} from "../theme/theme.ts";
import Tooltip from "@mui/material/Tooltip";
import SunnyIcon from '@mui/icons-material/Sunny';
import NightsStayIcon from '@mui/icons-material/NightsStay';


type SproutAppBarProps = {
  mode: ThemeMode;
  onToggleTheme: () => void;
  onMenuClick: () => void;
  // (page, optionalTab)
  onProfileMenuClick: (page: string, tab?: 0 | 1) => void;
};

import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

export default function SproutAppBar({mode, onToggleTheme, onMenuClick, onProfileMenuClick}: SproutAppBarProps) {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const isMenuOpen = Boolean(anchorEl);
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleProfileMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const menuId = 'sprout-profile-menu';

  const notLoggedMenu = (
    <Menu sx={{ mt: "45px" }} anchorEl={anchorEl} open={isMenuOpen} onClose={handleMenuClose} id={menuId} keepMounted
          anchorOrigin={{ vertical: "top", horizontal: "right" }}
          transformOrigin={{ vertical: "top", horizontal: "right" }}
          slotProps={{ paper: { elevation: 0, sx: { bgcolor: "transparent", boxShadow: "none", overflow: "visible" } } }}>
      <Card sx={{ width: 320 }}>
        <CardContent>
          <Typography variant="h6" gutterBottom>
            Welcome
          </Typography>

          <Typography variant="body2" color="text.secondary">
            Sign in to access your account, saved preferences, and personalized content.
          </Typography>
        </CardContent>

        <Divider />

        <CardActions sx={{ p: 2 }}>
          <Button variant="contained" fullWidth onClick={() => { handleMenuClose(); onProfileMenuClick("login", 0); }}>
            Login
          </Button>

          <Button variant="outlined" color="secondary" fullWidth onClick={() => { handleMenuClose(); onProfileMenuClick("register", 1); }}>
            Register
          </Button>
        </CardActions>
      </Card>
    </Menu>
  );

  const loggedMenu = (
    <Menu sx={{ mt: "45px" }} anchorEl={anchorEl} open={isMenuOpen} onClose={handleMenuClose} id={menuId} keepMounted
          anchorOrigin={{ vertical: "top", horizontal: "right" }}
          transformOrigin={{ vertical: "top", horizontal: "right" }}
    >
      <Box sx={{ p: 2, minWidth: 240 }}>
        <Typography variant="subtitle1">Signed in as</Typography>
        <Typography variant="h6">{user?.username}</Typography>
      </Box>
      <Divider />
      <Box sx={{ p: 1, display: 'flex', gap: 1 }}>
        <Button fullWidth variant="outlined" color="secondary" onClick={() => { handleMenuClose(); navigate('/employees'); }}>
          Account
        </Button>
        <Button fullWidth variant="contained" onClick={() => { handleMenuClose(); logout(); navigate('/login'); }}>
          Logout
        </Button>
      </Box>
    </Menu>
  );


  function redirectToGitHub() {
    window.open("https://github.com/BackyarDev/sprout", "_blank");
  }

  return (
    <Box>
      <AppBar position="fixed" elevation={12} sx={(theme) => ({
        backgroundImage: 'none',
        backgroundColor: alpha(theme.palette.background.default, 0.1),
        color: theme.palette.text.primary,
        backdropFilter: 'blur(10px)',
        WebkitBackdropFilter: 'blur(10px)',
        borderBottom: `1px solid ${
          theme.palette.mode === 'dark'
            ? alpha(theme.palette.common.white, 0.08)
            : alpha(theme.palette.common.black, 0.08)
        }`,
        zIndex: theme.zIndex.drawer + 1,
      })}>
        <Toolbar sx={{position: 'relative'}}>

          {/* drawer icon - always visible on the left */}
          <IconButton size="large" edge="start" color="inherit" aria-label="open drawer" onClick={onMenuClick} sx={{ mr: { xs: 1, sm: 2 }, zIndex: 2 }}>
            <MenuIcon />
          </IconButton>

          {/* Logo: centered on md+ using absolute positioning; inline on xs/sm next to menu */}
          <Typography
            variant="h6"
            noWrap
            component="a"
            href="/"
            sx={{
              ml: { xs: 1, sm: 2 },
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.3rem',
              color: 'inherit',
              textDecoration: 'none',
              position: { xs: 'static', md: 'absolute' },
              left: { md: '50%' },
              transform: { md: 'translateX(-50%)' },
              textAlign: 'center',
              zIndex: 1,
            }}
          >
            Sprout
          </Typography>

          {/* right-side controls - aligned to the end */}
          <Box sx={{ ml: 'auto', display: 'flex', alignItems: 'center', zIndex: 2 }}>
            <Tooltip title={`Switch to ${mode === 'dark' ? 'light' : 'dark'} mode`}>
              <Box
                onClick={onToggleTheme}
                sx={{
                  mr: 1,
                  width: 52,
                  height: 28,
                  borderRadius: 14,
                  bgcolor: mode === 'dark' ? 'grey.800' : 'grey.300',
                  cursor: 'pointer',
                  position: 'relative',
                  transition: 'all 0.3s ease',
                }}
              >
                <Box
                  sx={{
                    position: 'absolute',
                    top: 2,
                    left: mode === 'dark' ? 26 : 2,
                    width: 24,
                    height: 24,
                    borderRadius: '50%',
                    bgcolor: 'background.paper',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    boxShadow: 1,
                    transition: 'all 0.3s ease',
                  }}
                >
                  {mode === 'dark' ? <NightsStayIcon sx={{ fontSize: 16 }} /> : <SunnyIcon sx={{ fontSize: 16 }} />}
                </Box>
              </Box>
            </Tooltip>

            <IconButton size="large" edge="start" aria-label="github repository" onClick={redirectToGitHub} color="inherit" sx={{ ml: 1 }}>
              <GitHubIcon fontSize="medium" />
            </IconButton>

            {user ? (
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <Typography variant="body2">Hi, {user.username}</Typography>
                <IconButton size="large" edge="end" aria-label="account of current user" aria-controls={menuId} aria-haspopup="true" onClick={handleProfileMenuOpen} color="inherit">
                  <AccountCircle fontSize="medium" />
                </IconButton>
              </Box>
            ) : (
              <IconButton size="large" edge="end" aria-label="account of current user" aria-controls={menuId} aria-haspopup="true" onClick={handleProfileMenuOpen} color="inherit">
                <AccountCircle fontSize="medium" />
              </IconButton>
            )}
          </Box>

        </Toolbar>
      </AppBar>
      {user ? loggedMenu : notLoggedMenu}
    </Box>
  );
}
