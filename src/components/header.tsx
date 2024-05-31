import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import TemporaryDrawer from './side_menu';
import { MenuItemList } from '../App';

interface HeaderProps {
    menuItemList: MenuItemList,
}

export default function Header({menuItemList}: HeaderProps) {

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="fixed">
        <Toolbar>
            <TemporaryDrawer menuItemList={menuItemList}/>
        </Toolbar>
      </AppBar>
    </Box>
  );
}