import * as React from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import MenuIcon from '@mui/icons-material/Menu';
import { List, ListItem, ListItemButton, ListItemText } from '@mui/material';

export default function TemporaryDrawer({setPhoneBookOpen}) {
  const [open, setOpen] = React.useState(false);

  const toggleDrawer = (newOpen: boolean) => () => {
    setOpen(newOpen);
  };


  const DrawerList = (
    <Box sx={{ width: 250 }} role="presentation" onClick={toggleDrawer(false)}>
        <List>
          <ListItem key={"PhoneBook"} disablePadding>
            <ListItemButton onClick={()=>setPhoneBookOpen(true)}>
              <ListItemText primary={"PhoneBook"} />
            </ListItemButton>
          </ListItem>
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