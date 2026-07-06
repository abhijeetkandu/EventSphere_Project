import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Chip from '@mui/material/Chip';
import Divider from '@mui/material/Divider';
import Button from '@mui/material/Button';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Calendar, MapPin, QrCode, Ticket, ArrowRight } from 'lucide-react';
import { ROUTES } from '../../utils/constants';
import { formatDate, formatPrice } from '../../utils/formatters';
import { BOOKING_STATUS } from '../../utils/constants';

const getStatusConfig = (status) =>
  BOOKING_STATUS[status?.toUpperCase()] ?? { label: status || 'Confirmed', color: 'default' };

export const TicketCard = ({ booking, index = 0 }) => {
  const statusConfig = getStatusConfig(booking.status);

  return (
    <Box
      component={motion.div}
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.06 }}
      sx={{
        borderRadius: 3,
        border: 1,
        borderColor: 'divider',
        overflow: 'hidden',
        bgcolor: 'background.paper',
        transition: 'all 0.25s ease',
        '&:hover': { boxShadow: 4, transform: 'translateY(-2px)' },
      }}
    >
      <Box
        sx={{
          height: 6,
          background: (theme) =>
            `linear-gradient(90deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
        }}
      />

      <Box sx={{ p: 2.5 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 2 }}>
          <Box>
            <Typography variant="overline" color="text.secondary" sx={{ fontWeight: 700, letterSpacing: 1 }}>
              Event Ticket
            </Typography>
            <Typography variant="h6" sx={{ fontWeight: 700, letterSpacing: '-0.02em', mt: 0.25 }}>
              {booking.eventTitle}
            </Typography>
          </Box>
          <Chip label={statusConfig.label} size="small" color={statusConfig.color} sx={{ fontWeight: 600 }} />
        </Box>

        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1, mb: 2 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <Calendar size={16} color="var(--mui-palette-primary-main)" />
            <Typography variant="body2">{formatDate(booking.eventDate)}</Typography>
          </Box>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <MapPin size={16} color="var(--mui-palette-primary-main)" />
            <Typography variant="body2">{booking.location}</Typography>
          </Box>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <Ticket size={16} color="var(--mui-palette-primary-main)" />
            <Typography variant="body2">
              {booking.tickets} ticket{booking.tickets !== 1 ? 's' : ''} · {formatPrice(booking.totalPrice)}
            </Typography>
          </Box>
        </Box>

        <Divider sx={{ my: 2, borderStyle: 'dashed' }} />

        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            p: 1.5,
            borderRadius: 2,
            bgcolor: 'action.hover',
          }}
        >
          <Box>
            <Typography variant="caption" color="text.secondary" sx={{ fontWeight: 600 }}>
              Ticket Code
            </Typography>
            <Typography variant="body1" sx={{ fontWeight: 700, fontFamily: 'monospace', letterSpacing: 1 }}>
              {booking.ticketCode}
            </Typography>
          </Box>
          <Box
            sx={{
              width: 48,
              height: 48,
              borderRadius: 1.5,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              bgcolor: 'background.paper',
              border: 1,
              borderColor: 'divider',
              color: 'text.secondary',
            }}
          >
            <QrCode size={28} />
          </Box>
        </Box>

        <Button
          component={Link}
          to={ROUTES.BOOKING_DETAILS.replace(':id', booking.id)}
          fullWidth
          size="small"
          variant="outlined"
          endIcon={<ArrowRight size={14} />}
          sx={{ mt: 2 }}
        >
          View Details
        </Button>
      </Box>
    </Box>
  );
};
