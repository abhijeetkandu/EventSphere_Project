import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Chip from '@mui/material/Chip';
import IconButton from '@mui/material/IconButton';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Calendar, MapPin, Heart } from 'lucide-react';
import { formatDate, formatPrice } from '../../utils/formatters';
import { ROUTES } from '../../utils/constants';
import { EventImage } from '../common/EventImage';

export const EventCard = ({ event, isFavorite, onToggleFavorite, index = 0 }) => {
  const eventUrl = ROUTES.EVENT_DETAILS.replace(':id', event.id);

  return (
    <Box
      component={motion.div}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.05 }}
      whileHover={{ y: -6 }}
      sx={{
        borderRadius: 3,
        border: 1,
        borderColor: 'divider',
        overflow: 'hidden',
        bgcolor: 'background.paper',
        boxShadow: 1,
        transition: 'box-shadow 0.25s ease',
        '&:hover': { boxShadow: 4 },
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      <Box
        component={Link}
        to={eventUrl}
        sx={{
          position: 'relative',
          height: 180,
          display: 'block',
          textDecoration: 'none',
          overflow: 'hidden',
        }}
      >
        <EventImage
          src={event.bannerImage}
          alt={event.title}
          category={event.category}
          height="100%"
        />

        <Box sx={{ position: 'absolute', top: 12, left: 12 }}>
          <Chip
            label={event.category}
            size="small"
            sx={{
              fontWeight: 600,
              bgcolor: 'rgba(255,255,255,0.9)',
              backdropFilter: 'blur(8px)',
            }}
          />
        </Box>

        <IconButton
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            onToggleFavorite?.(event.id, event.title);
          }}
          sx={{
            position: 'absolute',
            top: 8,
            right: 8,
            bgcolor: 'rgba(255,255,255,0.9)',
            backdropFilter: 'blur(8px)',
            '&:hover': { bgcolor: 'white' },
          }}
          size="small"
        >
          <Heart
            size={18}
            fill={isFavorite ? 'currentColor' : 'none'}
            color={isFavorite ? '#EF4444' : undefined}
          />
        </IconButton>
      </Box>

      <Box sx={{ p: 2.5, flex: 1, display: 'flex', flexDirection: 'column' }}>
        <Typography
          component={Link}
          to={eventUrl}
          variant="h6"
          sx={{
            fontWeight: 700,
            mb: 1.5,
            textDecoration: 'none',
            color: 'text.primary',
            letterSpacing: '-0.02em',
            lineHeight: 1.3,
            display: '-webkit-box',
            WebkitLineClamp: 2,
            WebkitBoxOrient: 'vertical',
            overflow: 'hidden',
            '&:hover': { color: 'primary.main' },
          }}
        >
          {event.title}
        </Typography>

        <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.75, mb: 0.75 }}>
          <Calendar size={14} color="var(--mui-palette-text-secondary)" />
          <Typography variant="body2" color="text.secondary">
            {formatDate(event.date)}
          </Typography>
        </Box>

        <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.75, mb: 2 }}>
          <MapPin size={14} color="var(--mui-palette-text-secondary)" />
          <Typography
            variant="body2"
            color="text.secondary"
            sx={{
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              whiteSpace: 'nowrap',
            }}
          >
            {event.location}
          </Typography>
        </Box>

        <Box sx={{ mt: 'auto', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <Typography variant="h6" sx={{ fontWeight: 700, color: 'primary.main' }}>
            {formatPrice(event.price)}
          </Typography>
          {event.availableSeats != null && (
            <Typography variant="caption" color="text.secondary">
              {event.availableSeats} seats left
            </Typography>
          )}
        </Box>
      </Box>
    </Box>
  );
};
