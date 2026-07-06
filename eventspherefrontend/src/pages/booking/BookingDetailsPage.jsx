import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Box from '@mui/material/Box';
import { CalendarCheck } from 'lucide-react';
import { BookingDetailView } from '../../components/booking/BookingDetailView';
import { CancelBookingDialog } from '../../components/booking/CancelBookingDialog';
import { EmptyState } from '../../components/common/EmptyState';
import { EventDetailsSkeleton } from '../../components/common/EventSkeleton';
import { bookingService } from '../../services/bookingService';
import { usePageTitle } from '../../hooks/usePageTitle';
import { getErrorMessage } from '../../utils/errorHandler';
import { ROUTES } from '../../utils/constants';

const BookingDetailsPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [booking, setBooking] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [cancelOpen, setCancelOpen] = useState(false);

  usePageTitle(booking ? `Booking #${booking.ticketCode}` : 'Booking Details');

  useEffect(() => {
    const fetchBooking = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const data = await bookingService.getBookingById(id);
        setBooking(data);
      } catch (err) {
        setError(getErrorMessage(err, 'Booking not found'));
      } finally {
        setIsLoading(false);
      }
    };

    if (id) fetchBooking();
  }, [id]);

  const handleCancelled = (updated) => {
    setBooking({ ...updated, status: 'CANCELLED' });
  };

  if (isLoading) {
    return (
      <Box>
        <EventDetailsSkeleton />
      </Box>
    );
  }

  if (error || !booking) {
    return (
      <EmptyState
        icon={CalendarCheck}
        title="Booking not found"
        description={error || 'This booking may have been removed or does not exist.'}
        onAction={() => navigate(ROUTES.MY_BOOKINGS)}
        actionLabel="Back to Bookings"
      />
    );
  }

  return (
    <Box>
      <BookingDetailView
        booking={booking}
        onCancel={() => setCancelOpen(true)}
      />

      <CancelBookingDialog
        open={cancelOpen}
        onClose={() => setCancelOpen(false)}
        booking={booking}
        onCancelled={handleCancelled}
      />
    </Box>
  );
};

export default BookingDetailsPage;
