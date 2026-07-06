import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Home, Search } from 'lucide-react';
import { usePageTitle } from '../../hooks/usePageTitle';
import { ROUTES } from '../../utils/constants';

const NotFoundPage = () => {
  usePageTitle('Page Not Found');

  return (
    <Box
      sx={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        p: 3,
      }}
    >
      <Box sx={{ textAlign: 'center', maxWidth: 480 }}>
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
        >
          <Typography
            variant="h1"
            sx={{
              fontSize: { xs: '6rem', md: '8rem' },
              fontWeight: 800,
              lineHeight: 1,
              mb: 2,
              background: (theme) =>
                `linear-gradient(135deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
            }}
          >
            404
          </Typography>
        </motion.div>

        <Typography variant="h5" sx={{ fontWeight: 700, mb: 1 }}>
          Page not found
        </Typography>
        <Typography variant="body1" color="text.secondary" sx={{ mb: 4 }}>
          The page you're looking for doesn't exist or has been moved.
        </Typography>

        <Box sx={{ display: 'flex', gap: 2, justifyContent: 'center', flexWrap: 'wrap' }}>
          <Button component={Link} to={ROUTES.HOME} variant="contained" startIcon={<Home size={18} />}>
            Go Home
          </Button>
          <Button component={Link} to={ROUTES.EVENTS} variant="outlined" startIcon={<Search size={18} />}>
            Browse Events
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

export default NotFoundPage;
