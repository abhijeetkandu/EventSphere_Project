import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { motion } from 'framer-motion';

export const EmptyState = ({
  icon: Icon,
  title,
  description,
  action,
  actionLabel,
  onAction,
}) => (
  <Box
    component={motion.div}
    initial={{ opacity: 0, y: 16 }}
    animate={{ opacity: 1, y: 0 }}
    sx={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      textAlign: 'center',
      py: 8,
      px: 3,
      borderRadius: 4,
      border: 1,
      borderColor: 'divider',
      bgcolor: 'background.paper',
    }}
  >
    {Icon && (
      <Box
        sx={{
          width: 72,
          height: 72,
          borderRadius: 3,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          mb: 2.5,
          background: (theme) =>
            `linear-gradient(135deg, ${theme.palette.primary.main}12, ${theme.palette.secondary.main}12)`,
          color: 'primary.main',
        }}
      >
        <Icon size={32} />
      </Box>
    )}
    <Typography variant="h6" sx={{ fontWeight: 600, mb: 1 }}>
      {title}
    </Typography>
    <Typography variant="body2" color="text.secondary" sx={{ maxWidth: 380, mb: action || onAction ? 3 : 0, lineHeight: 1.7 }}>
      {description}
    </Typography>
    {action}
    {onAction && (
      <Button variant="contained" onClick={onAction}>
        {actionLabel}
      </Button>
    )}
  </Box>
);
