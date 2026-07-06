import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ShieldOff, Home } from 'lucide-react';
import { usePageTitle } from '../../hooks/usePageTitle';
import { ROUTES } from '../../utils/constants';

const AccessDeniedPage = () => {
  usePageTitle('Access Denied');

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
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Box
            sx={{
              width: 80,
              height: 80,
              borderRadius: 3,
              mx: 'auto',
              mb: 3,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              bgcolor: 'error.main',
              color: 'white',
              opacity: 0.9,
            }}
          >
            <ShieldOff size={36} />
          </Box>
        </motion.div>

        <Typography variant="h4" sx={{ fontWeight: 700, mb: 1 }}>
          Access Denied
        </Typography>
        <Typography variant="body1" color="text.secondary" sx={{ mb: 4 }}>
          You don't have permission to access this page. Contact an administrator if you believe this is an error.
        </Typography>

        <Button component={Link} to={ROUTES.HOME} variant="contained" startIcon={<Home size={18} />}>
          Return Home
        </Button>
      </Box>
    </Box>
  );
};

export default AccessDeniedPage;
