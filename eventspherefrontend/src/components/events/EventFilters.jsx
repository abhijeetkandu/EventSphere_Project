import Box from '@mui/material/Box';
import Chip from '@mui/material/Chip';
import Typography from '@mui/material/Typography';
import { motion } from 'framer-motion';
import { EVENT_CATEGORIES } from '../../utils/constants';

export const EventFilters = ({ category, onCategoryChange }) => (
  <Box sx={{ mb: 3 }}>
    <Typography variant="subtitle2" color="text.secondary" sx={{ mb: 1.5, fontWeight: 600 }}>
      Categories
    </Typography>
    <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
      {EVENT_CATEGORIES.map(({ id, label, icon }, index) => {
        const isActive = category === id;
        return (
          <Box
            key={id}
            component={motion.div}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: index * 0.03 }}
          >
            <Chip
              label={`${icon} ${label}`}
              onClick={() => onCategoryChange(id)}
              sx={{
                fontWeight: 600,
                cursor: 'pointer',
                transition: 'all 0.2s ease',
                bgcolor: isActive ? 'primary.main' : 'background.paper',
                color: isActive ? 'primary.contrastText' : 'text.primary',
                border: 1,
                borderColor: isActive ? 'primary.main' : 'divider',
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
  </Box>
);
