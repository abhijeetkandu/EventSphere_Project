import { useState } from 'react';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import CircularProgress from '@mui/material/CircularProgress';
import { AlertTriangle } from 'lucide-react';
import toast from 'react-hot-toast';
import { bookingService } from '../../services/bookingService';
import { getErrorMessage } from '../../utils/errorHandler';
import { formatDate, formatPrice } from '../../utils/formatters';

export const CancelBookingDialog = ({ open, onClose, booking, onCancelled }) => {
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!booking) return null;

  const handleCancel = async () => {
    setIsSubmitting(true);
    try {
      const updated = await bookingService.cancelBooking(booking.id);
      toast.success('Booking cancelled successfully');
      onCancelled?.(updated);
      onClose();
    } catch (error) {
      toast.error(getErrorMessage(error, 'Failed to cancel booking'));
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth PaperProps={{ sx: { borderRadius: 3 } }}>
      <DialogTitle sx={{ display: 'flex', alignItems: 'center', gap: 1.5, fontWeight: 700 }}>
        <Box
          sx={{
            width: 40,
            height: 40,
            borderRadius: 2,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            bgcolor: 'error.main',
            color: 'white',
          }}
        >
          <AlertTriangle size={20} />
        </Box>
        Cancel Booking
      </DialogTitle>

      <DialogContent>
        <Typography variant="body1" sx={{ mb: 2 }}>
          Are you sure you want to cancel your booking for{' '}
          <strong>{booking.eventTitle}</strong>?
        </Typography>

        <Box sx={{ p: 2, borderRadius: 2, bgcolor: 'action.hover' }}>
          <Typography variant="body2" color="text.secondary">
            {formatDate(booking.eventDate)} · {booking.tickets} ticket{booking.tickets !== 1 ? 's' : ''} · {formatPrice(booking.totalPrice)}
          </Typography>
          <Typography variant="caption" color="text.secondary" sx={{ mt: 0.5, display: 'block' }}>
            Refund policies may apply depending on the event organizer.
          </Typography>
        </Box>
      </DialogContent>

      <DialogActions sx={{ px: 3, pb: 3 }}>
        <Button onClick={onClose} disabled={isSubmitting}>
          Keep Booking
        </Button>
        <Button
          variant="contained"
          color="error"
          onClick={handleCancel}
          disabled={isSubmitting}
          startIcon={isSubmitting ? <CircularProgress size={16} color="inherit" /> : null}
        >
          {isSubmitting ? 'Cancelling...' : 'Confirm Cancel'}
        </Button>
      </DialogActions>
    </Dialog>
  );
};
