import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
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
  onProfileMenuClick: (item: string) => void;
};

export default function SproutAppBar({mode, onToggleTheme, onMenuClick, onProfileMenuClick}: SproutAppBarProps) {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

  const isMenuOpen = Boolean(anchorEl);

  const handleProfileMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const menuId = 'sprout-profile-menu';
  const renderMenu = (
    <Menu sx={{mt: '45px'}} anchorEl={anchorEl} open={isMenuOpen} onClose={handleMenuClose} id={menuId} keepMounted
      anchorOrigin={{ vertical: 'top', horizontal: 'right',}}
      transformOrigin={{vertical: 'top', horizontal: 'right',}}
    >
      <MenuItem sx={(theme) => ({bgcolor: theme.palette.background.default})} onClick={() => {
        handleMenuClose();
        onProfileMenuClick("Auth");
      }}>
        Login
      </MenuItem>
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
      })}>
        <Toolbar sx={{position: 'relative'}}>

          {/*drawer icon*/}
          <IconButton size="large" edge="start" color="inherit" aria-label="open drawer" sx={{mr: 2}} onClick={onMenuClick}>
            <MenuIcon/>
          </IconButton>

          {/*free space*/}
          <Box sx={{flexGrow: 2}}/>

          {/*logo*/}
          <Typography variant="h6" noWrap component="a" href="/" sx={{
            mr: 2,
            fontFamily: 'monospace',
            fontWeight: 700,
            letterSpacing: '.3rem',
            color: 'inherit',
            textDecoration: 'none',
          }}>
            Sprout
          </Typography>

          {/*free space*/}
          <Box sx={{flexGrow: 2}}/>

          <Box sx={{display: "flex", alignItems: "center"}}>

            {/*theme switch*/}
            <Tooltip
              title={`Switch to ${mode === "dark" ? "light" : "dark"} mode`}
            >
              <Box
                onClick={onToggleTheme}
                sx={{
                  mr: 1,
                  width: 52,
                  height: 28,
                  borderRadius: 14,
                  bgcolor: mode === "dark" ? "grey.800" : "grey.300",
                  cursor: "pointer",
                  position: "relative",
                  transition: "all 0.3s ease",
                }}
              >
                <Box
                  sx={{
                    position: "absolute",
                    top: 2,
                    left: mode === "dark" ? 26 : 2,
                    width: 24,
                    height: 24,
                    borderRadius: "50%",
                    bgcolor: "background.paper",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    boxShadow: 1,
                    transition: "all 0.3s ease",
                  }}
                >
                  {mode === "dark" ? (
                    <NightsStayIcon sx={{fontSize: 16}}/>
                  ) : (
                    <SunnyIcon sx={{fontSize: 16}}/>
                  )}
                </Box>
              </Box>
            </Tooltip>

            {/*profile icon*/}
            <IconButton
              size="large"
              edge="start"
              aria-label="github repository"
              onClick={redirectToGitHub}
              color="inherit"
              sx={{ml: 1}}
            >
              <GitHubIcon fontSize={"medium"}/>
            </IconButton>

            {/*profile icon*/}
            <IconButton
              size="large"
              edge="end"
              aria-label="account of current user"
              aria-controls={menuId}
              aria-haspopup="true"
              onClick={handleProfileMenuOpen}
              color="inherit"
            >
              <AccountCircle fontSize={"medium"}/>
            </IconButton>
          </Box>

        </Toolbar>
      </AppBar>
      {renderMenu}
    </Box>
  );
}
