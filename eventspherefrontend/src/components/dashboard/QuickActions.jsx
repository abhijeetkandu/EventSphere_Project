import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Search, Ticket, User, Settings } from 'lucide-react';
import { ROUTES } from '../../utils/constants';

const actions = [
  { label: 'Browse Events', description: 'Discover new experiences', to: ROUTES.EVENTS, icon: Search, color: 'primary.main' },
  { label: 'My Tickets', description: 'View your tickets', to: ROUTES.MY_TICKETS, icon: Ticket, color: 'secondary.main' },
  { label: 'Edit Profile', description: 'Update your details', to: ROUTES.PROFILE, icon: User, color: 'success.main' },
  { label: 'Settings', description: 'Manage preferences', to: ROUTES.SETTINGS, icon: Settings, color: 'warning.main' },
];

export const QuickActions = () => (
  <Box>
    <Typography variant="h6" sx={{ fontWeight: 700, mb: 2 }}>
      Quick Actions
    </Typography>
    <Box
      sx={{
        display: 'grid',
        gridTemplateColumns: { xs: '1fr 1fr', md: 'repeat(4, 1fr)' },
        gap: 2,
      }}
    >
      {actions.map(({ label, description, to, icon: Icon, color }, index) => (
        <Box
          key={label}
          component={motion.div}
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: index * 0.05 }}
        >
          <Button
            component={Link}
            to={to}
            fullWidth
            sx={{
              p: 2,
              height: 'auto',
              flexDirection: 'column',
              alignItems: 'flex-start',
              textAlign: 'left',
              borderRadius: 3,
              border: 1,
              borderColor: 'divider',
              bgcolor: 'background.paper',
              color: 'text.primary',
              '&:hover': {
                bgcolor: 'background.paper',
                borderColor: color,
                boxShadow: 3,
                transform: 'translateY(-2px)',
              },
              transition: 'all 0.25s ease',
            }}
          >
            <Box
              sx={{
                width: 36,
                height: 36,
                borderRadius: 1.5,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                bgcolor: color,
                color: 'white',
                mb: 1.5,
                opacity: 0.9,
              }}
            >
              <Icon size={18} />
            </Box>
            <Typography variant="subtitle2" sx={{ fontWeight: 700 }}>
              {label}
            </Typography>
            <Typography variant="caption" color="text.secondary">
              {description}
            </Typography>
          </Button>
        </Box>
      ))}
    </Box>
  </Box>
);
