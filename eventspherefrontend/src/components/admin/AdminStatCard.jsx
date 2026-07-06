import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Skeleton from '@mui/material/Skeleton';
import { motion } from 'framer-motion';

export const AdminStatCard = ({ label, value, icon: Icon, gradient, change, index = 0, isLoading }) => (
  <Box
    component={motion.div}
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.4, delay: index * 0.08 }}
    sx={{
      p: 2.5,
      borderRadius: 3,
      border: 1,
      borderColor: 'divider',
      bgcolor: 'background.paper',
      height: '100%',
      position: 'relative',
      overflow: 'hidden',
      transition: 'all 0.25s ease',
      '&:hover': { boxShadow: 4, transform: 'translateY(-2px)' },
    }}
  >
    <Box
      sx={{
        position: 'absolute',
        top: -20,
        right: -20,
        width: 80,
        height: 80,
        borderRadius: '50%',
        background: gradient,
        opacity: 0.15,
      }}
    />

    <Box sx={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', mb: 2 }}>
      <Box
        sx={{
          width: 48,
          height: 48,
          borderRadius: 2,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          background: gradient,
          color: 'white',
          boxShadow: '0 4px 14px rgba(79, 70, 229, 0.3)',
        }}
      >
        <Icon size={22} />
      </Box>
      {change && (
        <Typography variant="caption" sx={{ color: change > 0 ? 'success.main' : 'error.main', fontWeight: 600 }}>
          {change > 0 ? '+' : ''}{change}%
        </Typography>
      )}
    </Box>

    {isLoading ? (
      <>
        <Skeleton width="40%" height={40} />
        <Skeleton width="60%" height={20} sx={{ mt: 0.5 }} />
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
