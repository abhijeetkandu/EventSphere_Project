import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Skeleton from '@mui/material/Skeleton';
import { motion } from 'framer-motion';

export const StatCard = ({ label, value, icon: Icon, gradient, index = 0, isLoading }) => (
  <Box
    component={motion.div}
    initial={{ opacity: 0, y: 16 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.4, delay: index * 0.08 }}
    sx={{
      p: 2.5,
      borderRadius: 3,
      border: 1,
      borderColor: 'divider',
      bgcolor: 'background.paper',
      height: '100%',
      transition: 'all 0.25s ease',
      '&:hover': { boxShadow: 4, transform: 'translateY(-2px)' },
    }}
  >
    <Box sx={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', mb: 2 }}>
      <Box
        sx={{
          width: 44,
          height: 44,
          borderRadius: 2,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          background: gradient,
          color: 'white',
          boxShadow: '0 4px 14px rgba(79, 70, 229, 0.25)',
        }}
      >
        <Icon size={20} />
      </Box>
    </Box>

    {isLoading ? (
      <>
        <Skeleton width="50%" height={36} />
        <Skeleton width="70%" height={20} sx={{ mt: 0.5 }} />
      </>
    ) : (
      <>
        <Typography variant="h4" sx={{ fontWeight: 800, letterSpacing: '-0.03em' }}>
          {value}
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ mt: 0.5, fontWeight: 500 }}>
          {label}
        </Typography>
      </>
    )}
  </Box>
);
