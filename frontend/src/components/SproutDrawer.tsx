import {Drawer, List, ListItem, ListItemButton, ListItemIcon, ListItemText} from "@mui/material";
import PeopleAltIcon from '@mui/icons-material/PeopleAlt';
import Diversity3Icon from '@mui/icons-material/Diversity3';
import BadgeIcon from '@mui/icons-material/Badge';

const APPBAR_HEIGHT = 64;

type SproutDrawerProps = {
  drawerWidth: number;
  open: boolean;
  itemList: string[];
  onItemClick: (itemName: string) => void;
};


export default function SproutDrawer({ drawerWidth, open, itemList, onItemClick }: SproutDrawerProps) {
  return (
    <Drawer
      variant="persistent"
      anchor="left"
      open={open}
      sx={(theme) => ({
        '& .MuiDrawer-paper': {
          top: APPBAR_HEIGHT,
          height: `calc(100% - ${APPBAR_HEIGHT}px)`,
          width: drawerWidth,
          zIndex: theme.zIndex.appBar - 1,
        },
      })}
    >
      <List sx={{ mt: 2}}>
        {itemList.map((text, index) => (
          <ListItem key={text} disablePadding sx={{ display: 'block' }}>
            <ListItemButton
              onClick={() => onItemClick(text)}
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
    </Drawer>
  );
}
