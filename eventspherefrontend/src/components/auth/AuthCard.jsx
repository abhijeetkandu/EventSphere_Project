import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { motion } from 'framer-motion';
import { useThemeMode } from '../../context/ThemeContext';
import { getPaletteTokens } from '../../theme/theme';

export const AuthCard = ({ title, subtitle, children, footer }) => {
  const { mode } = useThemeMode();
  const tokens = getPaletteTokens(mode);

  return (
    <Box
      component={motion.div}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
      sx={{
        width: '100%',
        maxWidth: 440,
        mx: 'auto',
        p: { xs: 3, sm: 4 },
        borderRadius: 3,
        border: `1px solid ${tokens.border}`,
        bgcolor: tokens.background.paper,
        boxShadow: tokens.glass.shadow,
      }}
    >
      <Box sx={{ mb: 3 }}>
        <Typography
          variant="h4"
          sx={{
            fontWeight: 700,
            letterSpacing: '-0.035em',
            mb: 0.75,
            fontSize: { xs: '1.65rem', sm: '1.85rem' },
          }}
        >
          {title}
        </Typography>
        {subtitle && (
          <Typography variant="body2" color="text.secondary" sx={{ lineHeight: 1.65 }}>
            {subtitle}
          </Typography>
        )}
      </Box>

      {children}

      {footer && (
        <Box sx={{ mt: 3, pt: 2.5, borderTop: 1, borderColor: 'divider' }}>
          {footer}
        </Box>
      )}
    </Box>
  );
};
