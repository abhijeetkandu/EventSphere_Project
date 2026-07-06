import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { motion } from 'framer-motion';
import { Sparkles } from 'lucide-react';
import { APP_NAME } from '../../utils/constants';

export const LoadingPage = () => (
  <Box
    sx={{
      minHeight: '100vh',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      gap: 3,
    }}
  >
    <motion.div
      animate={{
        scale: [1, 1.08, 1],
        rotate: [0, 5, -5, 0],
      }}
      transition={{
        duration: 2,
        repeat: Infinity,
        ease: 'easeInOut',
      }}
    >
      <Box
        sx={{
          width: 64,
          height: 64,
          borderRadius: 3,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          background: (theme) =>
            `linear-gradient(135deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
          color: 'white',
          boxShadow: '0 8px 32px rgba(79, 70, 229, 0.35)',
        }}
      >
        <Sparkles size={28} />
      </Box>
    </motion.div>

    <Box sx={{ textAlign: 'center' }}>
      <Typography variant="h6" sx={{ fontWeight: 600, mb: 0.5 }}>
        Loading {APP_NAME}
      </Typography>
      <Typography variant="body2" color="text.secondary">
        Preparing your experience...
      </Typography>
    </Box>

    <Box sx={{ display: 'flex', gap: 1 }}>
      {[0, 1, 2].map((i) => (
        <motion.div
          key={i}
          animate={{ opacity: [0.3, 1, 0.3], y: [0, -6, 0] }}
          transition={{ duration: 1.2, repeat: Infinity, delay: i * 0.2 }}
        >
          <Box
            sx={{
              width: 8,
              height: 8,
              borderRadius: '50%',
              bgcolor: 'primary.main',
            }}
          />
        </motion.div>
      ))}
    </Box>
  </Box>
);
