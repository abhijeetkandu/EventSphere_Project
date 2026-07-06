import Box from '@mui/material/Box';
import Chip from '@mui/material/Chip';
import { motion } from 'framer-motion';

const tabs = [
  { id: 'all', label: 'All Bookings' },
  { id: 'upcoming', label: 'Upcoming' },
  { id: 'past', label: 'History' },
];

export const BookingTabs = ({ activeTab, onTabChange, stats }) => (
  <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mb: 3 }}>
    {tabs.map(({ id, label }, index) => {
      const isActive = activeTab === id;
      const count = stats?.[id] ?? 0;

      return (
        <Box
          key={id}
          component={motion.div}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.05 }}
        >
          <Chip
            label={`${label} (${count})`}
            onClick={() => onTabChange(id)}
            sx={{
              fontWeight: 600,
              cursor: 'pointer',
              px: 0.5,
              height: 36,
              bgcolor: isActive ? 'primary.main' : 'background.paper',
              color: isActive ? 'primary.contrastText' : 'text.primary',
              border: 1,
              borderColor: isActive ? 'primary.main' : 'divider',
              transition: 'all 0.2s ease',
              '&:hover': {
                bgcolor: isActive ? 'primary.dark' : 'action.hover',
                transform: 'translateY(-1px)',
              },
            }}
          />
        </Box>
      );
    })}
  </Box>
);
