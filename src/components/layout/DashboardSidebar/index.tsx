import { useEffect, useState } from 'react';
import { Link as RouterLink, useLocation, useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';
import {
  Avatar,
  Box,
  Button,
  Divider,
  Drawer,
  Hidden,
  List,
  Typography
} from '@material-ui/core';
import {
  AlertCircle as AlertCircleIcon,
  BarChart as BarChartIcon,
  Truck as TruckIcon,
  Lock as LockIcon,
  Settings as SettingsIcon,
  Trello as ShoppingBagIcon,
  User as UserIcon,
  UserPlus as UserPlusIcon,
  Users as UsersIcon
} from 'react-feather';
import NavItem from '../../NavItem';
import { getAuthData } from '../../../util/storage';
import { isAuthenticated } from '../../../util/auth';
interface DashboardSidebarProps {
  onMobileClose: () => void
  openMobile: boolean
}

const user = {
  avatar: '/static/images/avatars/avatar_6.png',
  jobTitle: 'Senior Developer',
  name: 'Katarina Smith'
};

const items = [
  {
    href: '/app/usuarios',
    icon: UsersIcon,
    title: 'Usuários'
  },
  {
    href: '/app/setores',
    icon: ShoppingBagIcon,
    title: 'Setores'
  },
  {
    href: '/app/veiculos',
    icon: TruckIcon,
    title: 'Veículos'
  } 
];
function DashboardSidebar({ onMobileClose, openMobile }: DashboardSidebarProps) {
  const location = useLocation();
  const navigate = useNavigate();
  const [usuario, setusuario] = useState({});
  useEffect(() => {
    console.log(getAuthData().access_token);
    
    //verifica a existência e validade do token e redireciona para login
    if (!isAuthenticated()) {
      navigate('/auth/login', { replace: true });
      return;
    }
    setusuario(getAuthData().usuario);
    user.name = getAuthData().usuario.nome;
    user.jobTitle = getAuthData().usuario.email;
    console.log(usuario);

    if (openMobile && onMobileClose) {
      onMobileClose();
    }
  }, [location.pathname]);

  const content = (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        height: '100%'
      }}
    >
      <Box
        sx={{
          alignItems: 'center',
          display: 'flex',
          flexDirection: 'column',
          p: 2
        }}
      >
        <Avatar
          component={RouterLink}
          src={user.avatar}
          sx={{
            cursor: 'pointer',
            width: 64,
            height: 64
          }}
          to="/app/account"
        />
        <Typography
          color="textPrimary"
          variant="h5"
        >
          {user.name}
        </Typography>
        <Typography
          color="textSecondary"
          variant="body2"
        >
          {user.jobTitle}
        </Typography>
      </Box>
      <Divider />
      <Box sx={{ p: 2 }}>
        <List>
          {items.map((item) => (
            <NavItem
              href={item.href}
              key={item.title}
              title={item.title}
              icon={item.icon}
            />
          ))}
        </List>
      </Box>
      <Box sx={{ flexGrow: 1 }} />
      <Box
        sx={{
          backgroundColor: 'background.default',
          m: 2,
          p: 2
        }}
      >
        <Typography
          align="center"
          gutterBottom
          variant="h4"
        >
          
        </Typography>
        <Typography
          align="center"
          variant="body2"
        > 
        </Typography>
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
            pt: 2
          }}
        >
          <Button
            color="primary"
            component="a"
            
            variant="contained"
          > 
          </Button>
        </Box>
      </Box>
    </Box>
  );

  return (
    <>
      <Hidden lgUp>
        <Drawer
          anchor="left"
          onClose={onMobileClose}
          open={openMobile}
          variant="temporary"
          PaperProps={{
            sx: {
              width: 256
            }
          }}
        >
          {content}
        </Drawer>
      </Hidden>
      <Hidden lgDown>
        <Drawer
          anchor="left"
          open
          variant="persistent"
          PaperProps={{
            sx: {
              width: 256,
              top: 64,
              height: 'calc(100% - 64px)'
            }
          }}
        >
          {content}
        </Drawer>
      </Hidden>
    </>
  );
};

export default DashboardSidebar;
