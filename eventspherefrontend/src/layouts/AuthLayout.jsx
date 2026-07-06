import { Outlet } from 'react-router-dom';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import { motion } from 'framer-motion';
import { Logo } from '../components/common/Logo';
import { ThemeToggle } from '../components/common/ThemeToggle';
import { PageTransition } from '../components/common/PageTransition';
import { APP_TAGLINE } from '../utils/constants';
import Typography from '@mui/material/Typography';

export const AuthLayout = () => (
  <Box
    sx={{
      minHeight: '100vh',
      display: 'flex',
      position: 'relative',
      overflow: 'hidden',
    }}
  >
    <Box
      sx={{
        position: 'absolute',
        inset: 0,
        background: (theme) =>
          theme.palette.mode === 'light'
            ? 'radial-gradient(ellipse 80% 60% at 20% 40%, rgba(79, 70, 229, 0.12) 0%, transparent 60%), radial-gradient(ellipse 60% 50% at 80% 60%, rgba(6, 182, 212, 0.1) 0%, transparent 60%)'
            : 'radial-gradient(ellipse 80% 60% at 20% 40%, rgba(79, 70, 229, 0.2) 0%, transparent 60%), radial-gradient(ellipse 60% 50% at 80% 60%, rgba(6, 182, 212, 0.15) 0%, transparent 60%)',
        pointerEvents: 'none',
      }}
    />

    <Box
      sx={{
        display: { xs: 'none', md: 'flex' },
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        p: 6,
        position: 'relative',
      }}
    >
      <motion.div
        initial={{ opacity: 0, x: -30 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6 }}
      >
        <Logo size="large" to={null} />
        <Typography
          variant="h3"
          sx={{
            mt: 4,
            mb: 2,
            fontWeight: 700,
            letterSpacing: '-0.03em',
            maxWidth: 420,
            lineHeight: 1.2,
          }}
        >
          Your gateway to unforgettable experiences
        </Typography>
        <Typography variant="body1" color="text.secondary" sx={{ maxWidth: 380, lineHeight: 1.7 }}>
          {APP_TAGLINE} Join thousands discovering and booking premium events worldwide.
        </Typography>
      </motion.div>
    </Box>

    <Box
      sx={{
        flex: { xs: 1, md: 0.55 },
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        p: { xs: 3, sm: 4 },
        position: 'relative',
      }}
    >
      <Box
        sx={{
          position: 'absolute',
          top: 24,
          left: 24,
          right: 24,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
      >
        <Box sx={{ display: { xs: 'block', md: 'none' } }}>
          <Logo size="small" />
        </Box>
        <Box sx={{ ml: 'auto' }}>
          <ThemeToggle />
        </Box>
      </Box>

      <Container maxWidth="sm" sx={{ mt: { xs: 6, md: 0 } }}>
        <PageTransition>
          <Outlet />
        </PageTransition>
      </Container>
    </Box>
  </Box>
);
