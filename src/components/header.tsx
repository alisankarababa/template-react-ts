import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import TemporaryDrawer from './side_menu';


export default function Header() {



  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="fixed">
        <Toolbar>
            <TemporaryDrawer />
        </Toolbar>
      </AppBar>
    </Box>
  );
}