import React, { useState, useEffect } from 'react';
import { Link as RouterLink, useLocation } from 'react-router-dom';
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Box,
  Container,
  IconButton,
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  useTheme,
  useMediaQuery,
  Slide,
  useScrollTrigger,
  Divider,
} from '@mui/material';
import MeetingRoomIcon from '@mui/icons-material/MeetingRoom';
import MenuIcon from '@mui/icons-material/Menu';
import HomeIcon from '@mui/icons-material/Home';
import EventIcon from '@mui/icons-material/Event';
import CloseIcon from '@mui/icons-material/Close';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import ContactSupportIcon from '@mui/icons-material/ContactSupport';

interface Props {
  window?: () => Window;
}

const Navigation = (props: Props) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();
  const [scrolled, setScrolled] = useState(false);

  const trigger = useScrollTrigger({
    target: props.window ? props.window() : undefined,
  });

  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 20;
      if (isScrolled !== scrolled) {
        setScrolled(isScrolled);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [scrolled]);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const menuItems = [
    { text: 'Salles', icon: <HomeIcon />, path: '/' },
    { text: 'Mes Réservations', icon: <EventIcon />, path: '/my-reservations' },
  ];

  const secondaryMenuItems = [
    { text: 'Profil', icon: <AccountCircleIcon />, path: '/profile' },
    { text: 'Contact', icon: <ContactSupportIcon />, path: '/contact' },
  ];

  const drawer = (
    <Box sx={{ width: 250 }}>
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          p: 2,
          borderBottom: '1px solid rgba(0, 0, 0, 0.12)',
        }}
      >
        <Typography variant="h6" component="div">
          Menu
        </Typography>
        <IconButton onClick={handleDrawerToggle}>
          <CloseIcon />
        </IconButton>
      </Box>
      <List>
        {menuItems.map((item) => (
          <ListItem
            button
            key={item.text}
            component={RouterLink}
            to={item.path}
            onClick={handleDrawerToggle}
            selected={location.pathname === item.path}
            sx={{
              my: 0.5,
              mx: 1,
              borderRadius: 1,
              '&.Mui-selected': {
                bgcolor: 'primary.light',
                color: 'primary.contrastText',
                '& .MuiListItemIcon-root': {
                  color: 'primary.contrastText',
                },
              },
            }}
          >
            <ListItemIcon sx={{ minWidth: 40 }}>{item.icon}</ListItemIcon>
            <ListItemText primary={item.text} />
          </ListItem>
        ))}
      </List>
      <Divider sx={{ my: 2 }} />
      <List>
        {secondaryMenuItems.map((item) => (
          <ListItem
            button
            key={item.text}
            component={RouterLink}
            to={item.path}
            onClick={handleDrawerToggle}
            selected={location.pathname === item.path}
            sx={{
              my: 0.5,
              mx: 1,
              borderRadius: 1,
              '&.Mui-selected': {
                bgcolor: 'primary.light',
                color: 'primary.contrastText',
                '& .MuiListItemIcon-root': {
                  color: 'primary.contrastText',
                },
              },
            }}
          >
            <ListItemIcon sx={{ minWidth: 40 }}>{item.icon}</ListItemIcon>
            <ListItemText primary={item.text} />
          </ListItem>
        ))}
      </List>
    </Box>
  );

  const appBar = (
    <AppBar 
      position="fixed" 
      elevation={scrolled ? 4 : 0}
      sx={{
        bgcolor: theme.palette.primary.main,
        transition: 'all 0.3s ease',
        '&::before': {
          content: '""',
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: 'linear-gradient(90deg, rgba(25,118,210,1) 0%, rgba(30,136,229,1) 100%)',
          zIndex: -1,
        },
      }}
    >
      <Container maxWidth="lg">
        <Toolbar sx={{ px: { xs: 1, sm: 2 } }}>
          <MeetingRoomIcon 
            sx={{ 
              mr: 2,
              color: 'white',
            }} 
          />
          <Typography 
            variant="h6" 
            component="div" 
            sx={{ 
              flexGrow: 1,
              color: 'white',
            }}
          >
            Réservation de Salles
          </Typography>

          {isMobile ? (
            <IconButton
              color="inherit"
              aria-label="open drawer"
              edge="end"
              onClick={handleDrawerToggle}
              sx={{ 
                color: 'white',
              }}
            >
              <MenuIcon />
            </IconButton>
          ) : (
            <Box sx={{ display: 'flex', gap: 2 }}>
              {menuItems.map((item) => (
                <Button
                  key={item.text}
                  color="inherit"
                  component={RouterLink}
                  to={item.path}
                  startIcon={item.icon}
                  className="button-hover"
                  sx={{
                    color: 'white',
                    bgcolor: location.pathname === item.path ? 'rgba(255, 255, 255, 0.1)' : 'transparent',
                    '&:hover': {
                      bgcolor: 'rgba(255, 255, 255, 0.2)',
                    },
                  }}
                >
                  {item.text}
                </Button>
              ))}
              <Divider orientation="vertical" flexItem sx={{ bgcolor: 'rgba(255, 255, 255, 0.2)' }} />
              {secondaryMenuItems.map((item) => (
                <Button
                  key={item.text}
                  color="inherit"
                  component={RouterLink}
                  to={item.path}
                  startIcon={item.icon}
                  className="button-hover"
                  sx={{
                    color: 'white',
                    bgcolor: location.pathname === item.path ? 'rgba(255, 255, 255, 0.1)' : 'transparent',
                    '&:hover': {
                      bgcolor: 'rgba(255, 255, 255, 0.2)',
                    },
                  }}
                >
                  {item.text}
                </Button>
              ))}
            </Box>
          )}
        </Toolbar>
      </Container>
    </AppBar>
  );

  return (
    <>
      <Slide appear={false} direction="down" in={!trigger}>
        {appBar}
      </Slide>
      <Toolbar /> {/* Spacer */}

      <Drawer
        variant="temporary"
        anchor="right"
        open={mobileOpen}
        onClose={handleDrawerToggle}
        ModalProps={{
          keepMounted: true, // Better mobile performance
        }}
        sx={{
          display: { xs: 'block', sm: 'none' },
          '& .MuiDrawer-paper': { 
            boxSizing: 'border-box',
            width: 250,
            bgcolor: 'background.paper',
          },
        }}
      >
        {drawer}
      </Drawer>
    </>
  );
};

export default Navigation; 