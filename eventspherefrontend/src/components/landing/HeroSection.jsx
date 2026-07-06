import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Chip from '@mui/material/Chip';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, Sparkles } from 'lucide-react';
import { ROUTES, APP_TAGLINE } from '../../utils/constants';

export const HeroSection = () => (
  <Box
    sx={{
      position: 'relative',
      overflow: 'hidden',
      pt: { xs: 8, md: 14 },
      pb: { xs: 10, md: 16 },
    }}
  >
    <Box
      sx={{
        position: 'absolute',
        top: '-20%',
        right: '-10%',
        width: 600,
        height: 600,
        borderRadius: '50%',
        background: (theme) =>
          `radial-gradient(circle, ${theme.palette.primary.main}20 0%, transparent 70%)`,
        pointerEvents: 'none',
      }}
    />
    <Box
      sx={{
        position: 'absolute',
        bottom: '-10%',
        left: '-5%',
        width: 400,
        height: 400,
        borderRadius: '50%',
        background: (theme) =>
          `radial-gradient(circle, ${theme.palette.secondary.main}15 0%, transparent 70%)`,
        pointerEvents: 'none',
      }}
    />

    <Container maxWidth="lg">
      <Box sx={{ textAlign: 'center', position: 'relative' }}>
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
          <Chip
            icon={<Sparkles size={14} />}
            label="Premium Event Discovery Platform"
            sx={{
              mb: 3,
              fontWeight: 600,
              bgcolor: (theme) =>
                theme.palette.mode === 'light' ? 'primary.main' + '12' : 'primary.main' + '25',
              color: 'primary.main',
              border: 1,
              borderColor: 'primary.main',
              borderOpacity: 0.2,
              '& .MuiChip-icon': { color: 'primary.main' },
            }}
          />
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.1 }}>
          <Typography
            variant="h1"
            sx={{
              fontSize: { xs: '2.5rem', sm: '3.5rem', md: '4.5rem' },
              fontWeight: 800,
              letterSpacing: '-0.04em',
              lineHeight: 1.05,
              mb: 3,
              background: (theme) =>
                `linear-gradient(135deg, ${theme.palette.text.primary} 30%, ${theme.palette.primary.main} 100%)`,
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
            }}
          >
            Discover events
            <br />
            worth remembering
          </Typography>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.2 }}>
          <Typography variant="h6" color="text.secondary" sx={{ maxWidth: 560, mx: 'auto', mb: 5, fontWeight: 400, lineHeight: 1.7 }}>
            {APP_TAGLINE} Find concerts, conferences, workshops and more — book in seconds.
          </Typography>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.3 }}>
          <Box sx={{ display: 'flex', gap: 2, justifyContent: 'center', flexWrap: 'wrap' }}>
            <Button component={Link} to={ROUTES.EVENTS} variant="contained" size="large" endIcon={<ArrowRight size={18} />} sx={{ px: 4, py: 1.5 }}>
              Explore Events
            </Button>
            <Button component={Link} to={ROUTES.REGISTER} variant="outlined" size="large" sx={{ px: 4, py: 1.5 }}>
              Create Account
            </Button>
          </Box>
        </motion.div>
      </Box>
    </Container>
  </Box>
);
