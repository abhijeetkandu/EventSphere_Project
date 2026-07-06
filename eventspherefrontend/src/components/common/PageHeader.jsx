import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { motion } from 'framer-motion';

export const PageHeader = ({ title, subtitle, action }) => (
  <Box
    component={motion.div}
    initial={{ opacity: 0, y: 12 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.35 }}
    sx={{
      display: 'flex',
      alignItems: { xs: 'flex-start', sm: 'center' },
      justifyContent: 'space-between',
      flexDirection: { xs: 'column', sm: 'row' },
      gap: 2,
      mb: { xs: 3, md: 4 },
    }}
  >
    <Box sx={{ maxWidth: 720 }}>
      <Typography
        variant="h4"
        sx={{
          fontWeight: 700,
          letterSpacing: '-0.035em',
          mb: subtitle ? 0.75 : 0,
          fontSize: { xs: '1.65rem', sm: '2rem' },
        }}
      >
        {title}
      </Typography>
      {subtitle && (
        <Typography variant="body1" color="text.secondary" sx={{ lineHeight: 1.65 }}>
          {subtitle}
        </Typography>
      )}
    </Box>
    {action && <Box sx={{ width: { xs: '100%', sm: 'auto' } }}>{action}</Box>}
  </Box>
);
