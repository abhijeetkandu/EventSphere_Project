import { useState } from 'react';
import { Link } from 'react-router-dom';
import Box from '@mui/material/Box';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import IconButton from '@mui/material/IconButton';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import Divider from '@mui/material/Divider';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';
import { Menu, X } from 'lucide-react';
import { Logo } from './Logo';
import { ThemeToggle } from './ThemeToggle';
import { ROUTES } from '../../utils/constants';
import { useAuth } from '../../context/AuthContext';

const navLinks = [{ label: 'Events', to: ROUTES.EVENTS }];

export const Navbar = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const { isAuthenticated, isAdmin } = useAuth();

  const closeMobile = () => setMobileOpen(false);

  const authButtons = isAuthenticated ? (
    <Button
      component={Link}
      to={isAdmin ? ROUTES.ADMIN : ROUTES.DASHBOARD}
      variant="contained"
      size="small"
      onClick={closeMobile}
      sx={{ px: 2.5 }}
    >
      Dashboard
    </Button>
  ) : (
    <>
      <Button
        component={Link}
        to={ROUTES.LOGIN}
        color="inherit"
        size="small"
        onClick={closeMobile}
        sx={{ fontWeight: 500, color: 'text.secondary' }}
      >
        Sign In
      </Button>
      <Button
        component={Link}
        to={ROUTES.REGISTER}
        variant="contained"
        size="small"
        onClick={closeMobile}
        sx={{ px: 2.5 }}
      >
        Get Started
      </Button>
    </>
  );

  const mobileDrawer = (
    <Box sx={{ width: 280, height: '100%', display: 'flex', flexDirection: 'column' }}>
      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', p: 2.5 }}>
        <Logo size="small" />
        <IconButton onClick={closeMobile} aria-label="Close menu">
          <X size={20} />
        </IconButton>
      </Box>
      <Divider />
      <List sx={{ px: 1.5, py: 2, flex: 1 }}>
        {navLinks.map(({ label, to }) => (
          <ListItemButton
            key={to}
            component={Link}
            to={to}
            onClick={closeMobile}
            sx={{ borderRadius: 2, mb: 0.5 }}
          >
            <ListItemText primary={label} primaryTypographyProps={{ fontWeight: 500 }} />
          </ListItemButton>
        ))}
      </List>
      <Divider />
      <Box sx={{ p: 2.5, display: 'flex', flexDirection: 'column', gap: 1.5 }}>
        <Box sx={{ display: 'flex', justifyContent: 'center' }}>
          <ThemeToggle />
        </Box>
        {authButtons}
      </Box>
    </Box>
  );

  return (
    <>
      <AppBar
        position="sticky"
        elevation={0}
        sx={{
          bgcolor: (t) =>
            t.palette.mode === 'light' ? 'rgba(255, 255, 255, 0.85)' : 'rgba(19, 20, 26, 0.85)',
          backdropFilter: 'blur(16px) saturate(180%)',
          borderBottom: 1,
          borderColor: 'divider',
        }}
      >
        <Container maxWidth="xl">
          <Toolbar disableGutters sx={{ minHeight: { xs: 60, md: 64 }, gap: 1 }}>
            {isMobile && (
              <IconButton edge="start" onClick={() => setMobileOpen(true)} aria-label="Open menu">
                <Menu size={22} />
              </IconButton>
            )}

            <Logo />

            <Box sx={{ flexGrow: 1 }} />

            {!isMobile && (
              <>
                {navLinks.map(({ label, to }) => (
                  <Button
                    key={to}
                    component={Link}
                    to={to}
                    color="inherit"
                    sx={{ fontWeight: 500, color: 'text.secondary', mx: 0.5 }}
                  >
                    {label}
                  </Button>
                ))}
                <ThemeToggle />
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, ml: 1.5 }}>
                  {authButtons}
                </Box>
              </>
            )}
          </Toolbar>
        </Container>
      </AppBar>

      <Drawer
        anchor="left"
        open={mobileOpen}
        onClose={closeMobile}
        ModalProps={{ keepMounted: true }}
        sx={{ display: { md: 'none' } }}
      >
        {mobileDrawer}
      </Drawer>
    </>
  );
};
