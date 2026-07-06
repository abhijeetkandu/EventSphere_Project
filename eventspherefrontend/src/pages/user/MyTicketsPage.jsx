import { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Alert from '@mui/material/Alert';
import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';
import { Ticket, Search } from 'lucide-react';
import { PageHeader } from '../../components/common/PageHeader';
import { EmptyState } from '../../components/common/EmptyState';
import { TicketCard } from '../../components/dashboard/TicketCard';
import { EventGridSkeleton } from '../../components/common/EventSkeleton';
import { bookingService } from '../../services/bookingService';
import { useDebounce } from '../../hooks/useDebounce';
import { usePageTitle } from '../../hooks/usePageTitle';
import { getErrorMessage } from '../../utils/errorHandler';
import { useNavigate } from 'react-router-dom';
import { ROUTES } from '../../utils/constants';

const MyTicketsPage = () => {
  usePageTitle('My Tickets');

  const [bookings, setBookings] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const [search, setSearch] = useState('');
  const debouncedSearch = useDebounce(search);

  useEffect(() => {
    const fetchTickets = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const result = await bookingService.getMyBookings({
          page: 0,
          size: 50,
          sort: 'eventDate,asc',
        });
        setBookings(result.bookings);
      } catch (err) {
        setError(getErrorMessage(err, 'Failed to load tickets'));
      } finally {
        setIsLoading(false);
      }
    };

    fetchTickets();
  }, []);

  const filtered = bookings.filter((b) => {
    if (!debouncedSearch.trim()) return true;
    const q = debouncedSearch.toLowerCase();
    return (
      b.eventTitle?.toLowerCase().includes(q) ||
      b.ticketCode?.toLowerCase().includes(q) ||
      b.location?.toLowerCase().includes(q)
    );
  });

  return (
    <Box>
      <PageHeader
        title="My Tickets"
        subtitle="View and manage your event tickets"
      />

      <TextField
        placeholder="Search by event, ticket code, or location..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        size="small"
        fullWidth
        sx={{ mb: 3, maxWidth: 480 }}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <Search size={18} />
            </InputAdornment>
          ),
        }}
      />

      {error && (
        <Alert severity="warning" sx={{ mb: 3, borderRadius: 2 }}>
          {error}
        </Alert>
      )}

      {isLoading ? (
        <EventGridSkeleton count={3} />
      ) : filtered.length > 0 ? (
        <Grid container spacing={3}>
          {filtered.map((booking, index) => (
            <Grid item xs={12} sm={6} lg={4} key={booking.id}>
              <TicketCard booking={booking} index={index} />
            </Grid>
          ))}
        </Grid>
      ) : (
        <EmptyState
          icon={Ticket}
          title={search ? 'No tickets found' : 'No tickets yet'}
          description={
            search
              ? 'Try a different search term.'
              : 'Book an event to see your tickets here.'
          }
          onAction={search ? () => setSearch('') : () => navigate(ROUTES.EVENTS)}
          actionLabel={search ? 'Clear search' : 'Browse Events'}
        />
      )}
    </Box>
  );
};

export default MyTicketsPage;
