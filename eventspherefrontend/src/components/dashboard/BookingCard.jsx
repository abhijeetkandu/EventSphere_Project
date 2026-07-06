import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Chip from '@mui/material/Chip';
import Button from '@mui/material/Button';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Calendar, MapPin, Ticket, ArrowRight } from 'lucide-react';
import { formatDate, formatPrice } from '../../utils/formatters';
import { BOOKING_STATUS, ROUTES } from '../../utils/constants';

const getStatusConfig = (status) =>
  BOOKING_STATUS[status?.toUpperCase()] ?? { label: status || 'Confirmed', color: 'default' };

export const BookingCard = ({ booking, index = 0, compact = false }) => {
  const statusConfig = getStatusConfig(booking.status);
  const eventUrl = booking.eventId
    ? ROUTES.EVENT_DETAILS.replace(':id', booking.eventId)
    : ROUTES.EVENTS;

  return (
    <Box
      component={motion.div}
      initial={{ opacity: 0, x: -12 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.35, delay: index * 0.05 }}
      sx={{
        display: 'flex',
        gap: 2,
        p: compact ? 2 : 2.5,
        borderRadius: 3,
        border: 1,
        borderColor: 'divider',
        bgcolor: 'background.paper',
        transition: 'all 0.25s ease',
        '&:hover': { boxShadow: 3, borderColor: 'primary.main', borderOpacity: 0.3 },
        flexDirection: { xs: 'column', sm: 'row' },
        alignItems: { sm: 'center' },
      }}
    >
      {booking.bannerImage && !compact && (
        <Box
          component="img"
          src={booking.bannerImage}
          alt={booking.eventTitle}
          sx={{
            width: { xs: '100%', sm: 100 },
            height: 72,
            borderRadius: 2,
            objectFit: 'cover',
            flexShrink: 0,
          }}
        />
      )}

      <Box sx={{ flex: 1, minWidth: 0 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 0.75, flexWrap: 'wrap' }}>
          <Chip label={statusConfig.label} size="small" color={statusConfig.color} sx={{ fontWeight: 600 }} />
          <Typography variant="caption" color="text.secondary">
            {booking.ticketCode}
          </Typography>
        </Box>

        <Typography variant="subtitle1" sx={{ fontWeight: 700, mb: 0.75, letterSpacing: '-0.01em' }}>
          {booking.eventTitle}
        </Typography>

        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
            <Calendar size={14} />
            <Typography variant="body2" color="text.secondary">
              {formatDate(booking.eventDate)}
            </Typography>
          </Box>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
            <MapPin size={14} />
            <Typography variant="body2" color="text.secondary" noWrap>
              {booking.location}
            </Typography>
          </Box>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
            <Ticket size={14} />
            <Typography variant="body2" color="text.secondary">
              {booking.tickets} ticket{booking.tickets !== 1 ? 's' : ''}
            </Typography>
          </Box>
        </Box>
      </Box>

      <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: { xs: 'flex-start', sm: 'flex-end' }, gap: 1 }}>
        <Typography variant="subtitle1" sx={{ fontWeight: 700, color: 'primary.main' }}>
          {formatPrice(booking.totalPrice)}
        </Typography>
        <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
          <Button
            component={Link}
            to={ROUTES.BOOKING_DETAILS.replace(':id', booking.id)}
            size="small"
            variant="contained"
            endIcon={<ArrowRight size={14} />}
          >
            Details
          </Button>
          <Button component={Link} to={eventUrl} size="small" variant="outlined">
            Event
          </Button>
        </Box>
      </Box>
    </Box>
  );
};
