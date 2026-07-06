import { useState } from 'react';
import { Outlet, Link, useLocation, useNavigate } from 'react-router-dom';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Avatar from '@mui/material/Avatar';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';
import {
  LayoutDashboard,
  Ticket,
  CalendarCheck,
  User,
  Settings,
  Menu,
  LogOut,
  ChevronRight,
} from 'lucide-react';
import { Logo } from '../components/common/Logo';
import { ThemeToggle } from '../components/common/ThemeToggle';
import { PageTransition } from '../components/common/PageTransition';
import { ROUTES } from '../utils/constants';
import { useAuth } from '../context/AuthContext';

const DRAWER_WIDTH = 260;

const navItems = [
  { label: 'Overview', path: ROUTES.DASHBOARD, icon: LayoutDashboard },
  { label: 'My Tickets', path: ROUTES.MY_TICKETS, icon: Ticket },
  { label: 'My Bookings', path: ROUTES.MY_BOOKINGS, icon: CalendarCheck },
  { label: 'Profile', path: ROUTES.PROFILE, icon: User },
  { label: 'Settings', path: ROUTES.SETTINGS, icon: Settings },
];

export const DashboardLayout = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const location = useLocation();
  const navigate = useNavigate();
  const { user, logout } = useAuth();

  const handleLogout = () => {
    logout();
    navigate(ROUTES.LOGIN);
  };

  const drawerContent = (
    <Box sx={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
      <Box sx={{ p: 2.5, pb: 1 }}>
        <Logo size="small" />
      </Box>

      <List sx={{ px: 1.5, flex: 1, pt: 2 }}>
        {navItems.map(({ label, path, icon: Icon }) => {
          const isActive = location.pathname === path
            || (path !== ROUTES.DASHBOARD && location.pathname.startsWith(path));
          return (
            <ListItemButton
              key={path}
              component={Link}
              to={path}
              onClick={() => setMobileOpen(false)}
              sx={{
                borderRadius: 2,
                mb: 0.5,
                py: 1.25,
                bgcolor: isActive ? 'primary.main' : 'transparent',
                color: isActive ? 'primary.contrastText' : 'text.primary',
                '&:hover': {
                  bgcolor: isActive ? 'primary.dark' : 'action.hover',
                },
                transition: 'all 0.2s ease',
              }}
            >
              <ListItemIcon sx={{ minWidth: 40, color: 'inherit' }}>
                <Icon size={20} />
              </ListItemIcon>
              <ListItemText
                primary={label}
                primaryTypographyProps={{ fontWeight: isActive ? 600 : 500, fontSize: '0.9rem' }}
              />
              {isActive && <ChevronRight size={16} />}
            </ListItemButton>
          );
        })}
      </List>

      <Box sx={{ p: 2, borderTop: 1, borderColor: 'divider' }}>
        <ListItemButton
          onClick={handleLogout}
          sx={{ borderRadius: 2, color: 'error.main' }}
        >
          <ListItemIcon sx={{ minWidth: 40, color: 'inherit' }}>
            <LogOut size={20} />
          </ListItemIcon>
          <ListItemText primary="Sign Out" />
        </ListItemButton>
      </Box>
    </Box>
  );

  return (
    <Box sx={{ display: 'flex', minHeight: '100vh' }}>
      <AppBar
        position="fixed"
        elevation={0}
        sx={{
          width: { md: `calc(100% - ${DRAWER_WIDTH}px)` },
          ml: { md: `${DRAWER_WIDTH}px` },
          bgcolor: (t) =>
            t.palette.mode === 'light' ? 'rgba(255,255,255,0.8)' : 'rgba(17,24,39,0.8)',
          backdropFilter: 'blur(20px)',
          borderBottom: 1,
          borderColor: 'divider',
        }}
      >
        <Toolbar>
          {isMobile && (
            <IconButton edge="start" onClick={() => setMobileOpen(true)} sx={{ mr: 1 }}>
              <Menu size={22} />
            </IconButton>
          )}
          <Box sx={{ flexGrow: 1 }} />
          <ThemeToggle size="small" />
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, ml: 2 }}>
            <Box sx={{ textAlign: 'right', display: { xs: 'none', sm: 'block' } }}>
              <Typography variant="body2" fontWeight={600}>
                {user?.name || 'User'}
              </Typography>
              <Typography variant="caption" color="text.secondary">
                {user?.email}
              </Typography>
            </Box>
            <Avatar
              sx={{
                width: 36,
                height: 36,
                background: (t) =>
                  `linear-gradient(135deg, ${t.palette.primary.main}, ${t.palette.secondary.main})`,
                fontSize: '0.875rem',
                fontWeight: 600,
              }}
            >
              {user?.name?.charAt(0)?.toUpperCase() || 'U'}
            </Avatar>
          </Box>
        </Toolbar>
      </AppBar>

      <Box component="nav" sx={{ width: { md: DRAWER_WIDTH }, flexShrink: { md: 0 } }}>
        <Drawer
          variant={isMobile ? 'temporary' : 'permanent'}
          open={isMobile ? mobileOpen : true}
          onClose={() => setMobileOpen(false)}
          ModalProps={{ keepMounted: true }}
          sx={{
            '& .MuiDrawer-paper': {
              width: DRAWER_WIDTH,
              boxSizing: 'border-box',
              borderRight: 1,
              borderColor: 'divider',
              bgcolor: 'background.paper',
            },
          }}
        >
          {drawerContent}
        </Drawer>
      </Box>

      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: { xs: 2, sm: 3 },
          mt: '64px',
          width: { md: `calc(100% - ${DRAWER_WIDTH}px)` },
        }}
      >
        <PageTransition>
          <Outlet />
        </PageTransition>
      </Box>
    </Box>
  );
};
