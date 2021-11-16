 
import { useState } from 'react';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';
import {
  AppBar,
  Badge,
  Box,
  Hidden,
  IconButton,
  Toolbar
} from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
import NotificationsIcon from '@material-ui/icons/NotificationsOutlined';
import InputIcon from '@material-ui/icons/Input'; 
 
interface DashboardNavbarProps {
  onMobileNavOpen:()=>void;
}

function DashboardNavbar({ onMobileNavOpen }: DashboardNavbarProps) { 
  const navigate = useNavigate();
  const [notifications,setnotifications] = useState([]);
  const removeAuth=()=>{
   // removeAuthData();
    navigate('/auth/login', { replace: true });
  }
  return (
   <>
    <AppBar
      elevation={0}
       
    >
      <Toolbar>
        <RouterLink to="/">
       
        </RouterLink>
        <Box sx={{ flexGrow: 1 }} />
        <Hidden lgDown>
          <IconButton color="inherit">
            <Badge
              badgeContent={notifications.length}
              color="primary"
              variant="dot"
            >
              <NotificationsIcon />
            </Badge>
          </IconButton>
          <IconButton color="inherit">
            <InputIcon  onClick={removeAuth}/>
             
          </IconButton>
        </Hidden>

        <Hidden lgUp>
          <IconButton
            color="inherit"
            onClick={onMobileNavOpen}
          >
            <MenuIcon />
          </IconButton>
        </Hidden>
      </Toolbar>
    </AppBar>
    </>
  );
}

export default DashboardNavbar;
