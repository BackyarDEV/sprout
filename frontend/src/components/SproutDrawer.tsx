import {Drawer, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Box, Typography} from "@mui/material";
import { alpha } from '@mui/material/styles';
import PeopleAltIcon from '@mui/icons-material/PeopleAlt';
import Diversity3Icon from '@mui/icons-material/Diversity3';
import BadgeIcon from '@mui/icons-material/Badge';

type SproutDrawerProps = {
  drawerWidth: number;
  open: boolean;
  itemList: string[];
  onItemClick: (itemName: string) => void;
  onClose: () => void;
  isLoggedIn: boolean;
};


export default function SproutDrawer({ drawerWidth, open, itemList, onItemClick, onClose, isLoggedIn }: SproutDrawerProps) {
  return (
    <Drawer
      variant="persistent"
      anchor="left"
      open={open}
      sx={{
        '& .MuiDrawer-paper': {
          width: { xs: '100%', sm: `${drawerWidth}px` },
          boxShadow: (theme) => theme.shadows[12],
        },
        // make the paper full-bleed on very small devices
        '@media (max-width:600px)': {
          '& .MuiDrawer-paper': {
            width: '100% !important',
            left: 0,
          }
        }
      }}
    >
      <Box sx={{ position: 'relative', height: '100%' }}>
        {/* Always render the list so overlay sits on top when shown */}
        <List sx={{ mt: 12, mb: 5 }}>
          {itemList.map((text, index) => (
            <ListItem key={text} disablePadding sx={{ display: 'block' }}>
              <ListItemButton
                onClick={() => { onClose(); onItemClick(text); }}
                sx={[
                  {
                    minHeight: 64,
                    px: 2.5,
                  },
                  open
                    ? {
                      justifyContent: 'initial',
                    }
                    : {
                      justifyContent: 'center',
                    },
                ]}
              >
                <ListItemIcon
                  sx={[
                    {
                      minWidth: 0,
                      justifyContent: 'center',
                    },
                    open
                      ? {
                        mr: 3,
                      }
                      : {
                        mr: 'auto',
                      },
                  ]}
                >
                  {index === 0 ? <PeopleAltIcon /> : index === 1 ? <Diversity3Icon /> : <BadgeIcon />}
                </ListItemIcon>
                <ListItemText
                  primary={text}
                  sx={[
                    open
                      ? {
                        opacity: 1,
                      }
                      : {
                        opacity: 0,
                      },
                  ]}
                />
              </ListItemButton>
            </ListItem>
          ))}
        </List>

        {/* Overlay on top of the list when user is not logged in */}
        {!isLoggedIn && (
          <Box
            sx={(theme) => ({
              position: 'absolute',
              inset: 0,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              bgcolor: alpha(theme.palette.primary.main, 0.6),
              backdropFilter: 'blur(3px)',
              WebkitBackdropFilter: 'blur(3px)',
              px: 2,
              zIndex: 10,
            })}
          >
            <Typography
              variant="h5"
              sx={{
                fontWeight: 700,
                textAlign: 'center',
                fontSize: { xs: 18, sm: 22 },
                color: (theme) => theme.palette.primary.contrastText,
              }}
            >
              Please log in to access this section
            </Typography>
          </Box>
        )}
      </Box>
    </Drawer>
  );
}
