import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Chip from '@mui/material/Chip';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import Grid from '@mui/material/Grid';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  Calendar,
  MapPin,
  Ticket,
  Clock,
  QrCode,
  ArrowLeft,
  Download,
  XCircle,
} from 'lucide-react';
import { formatDate, formatTime, formatPrice } from '../../utils/formatters';
import { BOOKING_STATUS, ROUTES } from '../../utils/constants';
import { isUpcomingBooking } from '../../services/bookingService';

const getStatusConfig = (status) =>
  BOOKING_STATUS[status?.toUpperCase()] ?? { label: status || 'Confirmed', color: 'default' };

export const BookingDetailView = ({ booking, onCancel }) => {
  const statusConfig = getStatusConfig(booking.status);
  const eventUrl = booking.eventId
    ? ROUTES.EVENT_DETAILS.replace(':id', booking.eventId)
    : ROUTES.EVENTS;
  const canCancel = isUpcomingBooking(booking) && booking.status?.toUpperCase() !== 'CANCELLED';

  const handleDownload = () => {
    const content = `
EventSphere Ticket
==================
Event: ${booking.eventTitle}
Date: ${formatDate(booking.eventDate)}
Location: ${booking.location}
Tickets: ${booking.tickets}
Total: ${formatPrice(booking.totalPrice)}
Ticket Code: ${booking.ticketCode}
Status: ${statusConfig.label}
Booked: ${formatDate(booking.bookingDate)}
    `.trim();

    const blob = new Blob([content], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `ticket-${booking.ticketCode}.txt`;
    link.click();
    URL.revokeObjectURL(url);
  };

  return (
    <Box>
      <Button
        component={Link}
        to={ROUTES.MY_BOOKINGS}
        startIcon={<ArrowLeft size={18} />}
        sx={{ mb: 3 }}
      >
        Back to Bookings
      </Button>

      <Grid container spacing={3}>
        <Grid item xs={12} md={7}>
          <Box
            component={motion.div}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            sx={{
              borderRadius: 4,
              border: 1,
              borderColor: 'divider',
              overflow: 'hidden',
              bgcolor: 'background.paper',
            }}
          >
            {booking.bannerImage ? (
              <Box
                component="img"
                src={booking.bannerImage}
                alt={booking.eventTitle}
                sx={{ width: '100%', height: 220, objectFit: 'cover' }}
              />
            ) : (
              <Box
                sx={{
                  height: 220,
                  background: (theme) =>
                    `linear-gradient(135deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
                }}
              />
            )}

            <Box sx={{ p: { xs: 3, md: 4 } }}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2, flexWrap: 'wrap' }}>
                <Chip label={statusConfig.label} color={statusConfig.color} sx={{ fontWeight: 600 }} />
                <Typography variant="caption" color="text.secondary">
                  Booked on {formatDate(booking.bookingDate)}
                </Typography>
              </Box>

              <Typography variant="h4" sx={{ fontWeight: 800, letterSpacing: '-0.03em', mb: 3 }}>
                {booking.eventTitle}
              </Typography>

              <Grid container spacing={2}>
                {[
                  { icon: Calendar, label: 'Event Date', value: formatDate(booking.eventDate) },
                  { icon: Clock, label: 'Event Time', value: formatTime(booking.startTime) || 'See event details' },
                  { icon: MapPin, label: 'Location', value: booking.location },
                  { icon: Ticket, label: 'Tickets', value: `${booking.tickets} ticket${booking.tickets !== 1 ? 's' : ''}` },
                ].map(({ icon: Icon, label, value }) => (
                  <Grid item xs={12} sm={6} key={label}>
                    <Box sx={{ display: 'flex', gap: 1.5, p: 2, borderRadius: 2, bgcolor: 'action.hover' }}>
                      <Icon size={20} color="var(--mui-palette-primary-main)" />
                      <Box>
                        <Typography variant="caption" color="text.secondary" sx={{ fontWeight: 600 }}>
                          {label}
                        </Typography>
                        <Typography variant="body2" fontWeight={600}>
                          {value}
                        </Typography>
                      </Box>
                    </Box>
                  </Grid>
                ))}
              </Grid>

              {booking.notes && (
                <Box sx={{ mt: 3 }}>
                  <Typography variant="subtitle2" sx={{ fontWeight: 700, mb: 0.5 }}>
                    Notes
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {booking.notes}
                  </Typography>
                </Box>
              )}
            </Box>
          </Box>
        </Grid>

        <Grid item xs={12} md={5}>
          <Box
            component={motion.div}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            sx={{
              p: 3,
              borderRadius: 4,
              border: 1,
              borderColor: 'divider',
              bgcolor: 'background.paper',
              position: { md: 'sticky' },
              top: 88,
            }}
          >
            <Typography variant="overline" color="text.secondary" sx={{ fontWeight: 700, letterSpacing: 1.5 }}>
              Your Ticket
            </Typography>

            <Box
              sx={{
                my: 3,
                p: 3,
                borderRadius: 3,
                border: 2,
                borderStyle: 'dashed',
                borderColor: 'primary.main',
                borderOpacity: 0.3,
                textAlign: 'center',
                background: (theme) =>
                  `linear-gradient(135deg, ${theme.palette.primary.main}08, ${theme.palette.secondary.main}08)`,
              }}
            >
              <Box
                sx={{
                  width: 80,
                  height: 80,
                  borderRadius: 2,
                  mx: 'auto',
                  mb: 2,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  bgcolor: 'background.paper',
                  border: 1,
                  borderColor: 'divider',
                }}
              >
                <QrCode size={48} color="var(--mui-palette-primary-main)" />
              </Box>

              <Typography variant="caption" color="text.secondary" sx={{ fontWeight: 600 }}>
                Ticket Code
              </Typography>
              <Typography
                variant="h5"
                sx={{ fontWeight: 800, fontFamily: 'monospace', letterSpacing: 2, mt: 0.5 }}
              >
                {booking.ticketCode}
              </Typography>
            </Box>

            <Divider sx={{ my: 2, borderStyle: 'dashed' }} />

            <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 3 }}>
              <Typography variant="body2" color="text.secondary">
                Total Paid
              </Typography>
              <Typography variant="h5" sx={{ fontWeight: 800, color: 'primary.main' }}>
                {formatPrice(booking.totalPrice)}
              </Typography>
            </Box>

            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.5 }}>
              <Button
                fullWidth
                variant="contained"
                startIcon={<Download size={18} />}
                onClick={handleDownload}
              >
                Download Ticket
              </Button>
              <Button
                fullWidth
                variant="outlined"
                component={Link}
                to={eventUrl}
              >
                View Event
              </Button>
              {canCancel && (
                <Button
                  fullWidth
                  variant="outlined"
                  color="error"
                  startIcon={<XCircle size={18} />}
                  onClick={() => onCancel?.(booking)}
                >
                  Cancel Booking
                </Button>
              )}
            </Box>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};
