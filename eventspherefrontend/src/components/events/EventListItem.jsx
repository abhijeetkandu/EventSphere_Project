import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Chip from '@mui/material/Chip';
import IconButton from '@mui/material/IconButton';
import Button from '@mui/material/Button';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Calendar, MapPin, Heart, ArrowRight } from 'lucide-react';
import { formatDate, formatPrice } from '../../utils/formatters';
import { ROUTES } from '../../utils/constants';
import { EventImage } from '../common/EventImage';

export const EventListItem = ({ event, isFavorite, onToggleFavorite, index = 0 }) => {
  const eventUrl = ROUTES.EVENT_DETAILS.replace(':id', event.id);

  return (
    <Box
      component={motion.div}
      initial={{ opacity: 0, x: -12 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.35, delay: index * 0.04 }}
      sx={{
        display: 'flex',
        gap: { xs: 2, sm: 3 },
        p: 2,
        borderRadius: 3,
        border: 1,
        borderColor: 'divider',
        bgcolor: 'background.paper',
        transition: 'all 0.25s ease',
        '&:hover': {
          boxShadow: 3,
          borderColor: 'primary.main',
          borderOpacity: 0.3,
        },
        flexDirection: { xs: 'column', sm: 'row' },
      }}
    >
      <Box
        component={Link}
        to={eventUrl}
        sx={{
          width: { xs: '100%', sm: 200 },
          height: { xs: 160, sm: 130 },
          flexShrink: 0,
          borderRadius: 2,
          overflow: 'hidden',
          textDecoration: 'none',
        }}
      >
        <EventImage
          src={event.bannerImage}
          alt={event.title}
          category={event.category}
          height="100%"
        />
      </Box>

      <Box sx={{ flex: 1, display: 'flex', flexDirection: 'column', minWidth: 0 }}>
        <Box sx={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: 1, mb: 1 }}>
          <Chip label={event.category} size="small" sx={{ fontWeight: 600 }} />
          <IconButton size="small" onClick={() => onToggleFavorite?.(event.id, event.title)}>
            <Heart
              size={18}
              fill={isFavorite ? 'currentColor' : 'none'}
              color={isFavorite ? '#EF4444' : undefined}
            />
          </IconButton>
        </Box>

        <Typography
          component={Link}
          to={eventUrl}
          variant="h6"
          sx={{
            fontWeight: 700,
            mb: 1,
            textDecoration: 'none',
            color: 'text.primary',
            '&:hover': { color: 'primary.main' },
          }}
        >
          {event.title}
        </Typography>

        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2, mb: 1.5 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
            <Calendar size={14} />
            <Typography variant="body2" color="text.secondary">
              {formatDate(event.date)}
            </Typography>
          </Box>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
            <MapPin size={14} />
            <Typography variant="body2" color="text.secondary">
              {event.location}
            </Typography>
          </Box>
        </Box>

        <Box sx={{ mt: 'auto', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <Typography variant="h6" sx={{ fontWeight: 700, color: 'primary.main' }}>
            {formatPrice(event.price)}
          </Typography>
          <Button
            component={Link}
            to={eventUrl}
            size="small"
            endIcon={<ArrowRight size={16} />}
          >
            View Details
          </Button>
        </Box>
      </Box>
    </Box>
  );
};
