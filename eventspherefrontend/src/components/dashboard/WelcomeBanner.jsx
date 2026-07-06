import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Sparkles, ArrowRight } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { ROUTES } from '../../utils/constants';

export const WelcomeBanner = () => {
  const { user } = useAuth();
  const firstName = user?.name?.split(' ')[0] || 'there';

  return (
    <Box
      component={motion.div}
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      sx={{
        p: { xs: 3, md: 4 },
        borderRadius: 4,
        mb: 4,
        position: 'relative',
        overflow: 'hidden',
        background: (theme) =>
          `linear-gradient(135deg, ${theme.palette.primary.main} 0%, ${theme.palette.secondary.main} 100%)`,
        color: 'white',
      }}
    >
      <Box
        sx={{
          position: 'absolute',
          top: -30,
          right: -30,
          width: 150,
          height: 150,
          borderRadius: '50%',
          bgcolor: 'rgba(255,255,255,0.1)',
        }}
      />

      <Box sx={{ position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 2 }}>
        <Box>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
            <Sparkles size={20} />
            <Typography variant="overline" sx={{ fontWeight: 700, letterSpacing: 1.5, opacity: 0.9 }}>
              Your Dashboard
            </Typography>
          </Box>
          <Typography variant="h4" sx={{ fontWeight: 800, letterSpacing: '-0.03em', mb: 0.5 }}>
            Welcome back, {firstName}!
          </Typography>
          <Typography variant="body1" sx={{ opacity: 0.9, maxWidth: 400 }}>
            Here&apos;s an overview of your upcoming events and bookings.
          </Typography>
        </Box>

        <Button
          component={Link}
          to={ROUTES.EVENTS}
          variant="contained"
          endIcon={<ArrowRight size={18} />}
          sx={{
            bgcolor: 'white',
            color: 'primary.main',
            px: 3,
            '&:hover': { bgcolor: 'rgba(255,255,255,0.92)' },
          }}
        >
          Find Events
        </Button>
      </Box>
    </Box>
  );
};
