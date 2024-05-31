import * as React from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import MenuIcon from '@mui/icons-material/Menu';
import { List, ListItem, ListItemButton, ListItemText } from '@mui/material';
import { MenuItemList } from '../App';

interface TemporaryDrawerProps {
    menuItemList: MenuItemList,
}


export default function TemporaryDrawer({menuItemList}: TemporaryDrawerProps) {
  const [open, setOpen] = React.useState(false);

  const toggleDrawer = (newOpen: boolean) => () => {
    setOpen(newOpen);
  };


  const DrawerList = (
    <Box sx={{ width: 250 }} role="presentation" onClick={toggleDrawer(false)}>
        <List>
            {
                menuItemList.getMenuItemList.map( menuItem => {
                    return (
                        <ListItem key={menuItem.name} disablePadding>
                            <ListItemButton onClick={() => menuItemList.openMenuItem(menuItem.name)}>
                                <ListItemText primary={menuItem.name}/>
                            </ListItemButton>
                        </ListItem>
                    )
                })
            }
      </List>
    </Box>
  );

  return (
    <div>
        <MenuIcon onClick={toggleDrawer(true)}/>
      
      <Drawer open={open} onClose={toggleDrawer(false)}>
        {DrawerList}
      </Drawer>
    </div>
  );
}