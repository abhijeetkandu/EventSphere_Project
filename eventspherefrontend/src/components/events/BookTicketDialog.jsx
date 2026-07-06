import { useState } from 'react';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import CircularProgress from '@mui/material/CircularProgress';
import { Ticket, Minus, Plus } from 'lucide-react';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { bookingService } from '../../services/bookingService';
import { getErrorMessage } from '../../utils/errorHandler';
import { formatPrice } from '../../utils/formatters';
import { ROUTES } from '../../utils/constants';
import { useAuth } from '../../context/AuthContext';

export const BookTicketDialog = ({ open, onClose, event }) => {
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const [tickets, setTickets] = useState(1);
  const [notes, setNotes] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!event) return null;

  const maxTickets = event.availableSeats ?? 10;
  const totalPrice = Number(event.price) * tickets;

  const handleBook = async () => {
    if (!isAuthenticated) {
      toast.error('Please sign in to book tickets');
      navigate(ROUTES.LOGIN, { state: { from: { pathname: `/events/${event.id}` } } });
      return;
    }

    setIsSubmitting(true);
    try {
      await bookingService.bookTicket({ eventId: event.id, tickets, notes });
      toast.success('Tickets booked successfully!');
      onClose();
      navigate(ROUTES.MY_BOOKINGS);
    } catch (error) {
      toast.error(getErrorMessage(error, 'Booking failed. Please try again.'));
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="sm"
      fullWidth
      PaperProps={{ sx: { borderRadius: 3 } }}
    >
      <DialogTitle sx={{ fontWeight: 700 }}>Book Tickets</DialogTitle>
      <DialogContent>
        <Typography variant="subtitle1" sx={{ fontWeight: 600, mb: 0.5 }}>
          {event.title}
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
          {formatPrice(event.price)} per ticket
        </Typography>

        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 3 }}>
          <Typography variant="body2" fontWeight={600}>
            Quantity
          </Typography>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <Button
              variant="outlined"
              size="small"
              onClick={() => setTickets((t) => Math.max(1, t - 1))}
              disabled={tickets <= 1}
            >
              <Minus size={16} />
            </Button>
            <Typography variant="h6" sx={{ minWidth: 32, textAlign: 'center' }}>
              {tickets}
            </Typography>
            <Button
              variant="outlined"
              size="small"
              onClick={() => setTickets((t) => Math.min(maxTickets, t + 1))}
              disabled={tickets >= maxTickets}
            >
              <Plus size={16} />
            </Button>
          </Box>
          {event.availableSeats != null && (
            <Typography variant="caption" color="text.secondary">
              {event.availableSeats} available
            </Typography>
          )}
        </Box>

        <TextField
          fullWidth
          label="Notes (optional)"
          multiline
          rows={2}
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
          placeholder="Any special requests..."
        />

        <Box
          sx={{
            mt: 3,
            p: 2,
            borderRadius: 2,
            bgcolor: 'action.hover',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
        >
          <Typography variant="body2" fontWeight={600}>
            Total
          </Typography>
          <Typography variant="h6" fontWeight={700} color="primary.main">
            {formatPrice(totalPrice)}
          </Typography>
        </Box>
      </DialogContent>
      <DialogActions sx={{ px: 3, pb: 3 }}>
        <Button onClick={onClose} disabled={isSubmitting}>
          Cancel
        </Button>
        <Button
          variant="contained"
          onClick={handleBook}
          disabled={isSubmitting}
          startIcon={isSubmitting ? <CircularProgress size={16} color="inherit" /> : <Ticket size={18} />}
        >
          {isSubmitting ? 'Booking...' : 'Confirm Booking'}
        </Button>
      </DialogActions>
    </Dialog>
  );
};
