import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import Alert from '@mui/material/Alert';
import Skeleton from '@mui/material/Skeleton';
import { useNavigate } from 'react-router-dom';
import { CalendarCheck, Search } from 'lucide-react';
import { PageHeader } from '../../components/common/PageHeader';
import { EmptyState } from '../../components/common/EmptyState';
import { BookingCard } from '../../components/dashboard/BookingCard';
import { BookingTabs } from '../../components/booking/BookingTabs';
import { useBookings } from '../../hooks/useBookings';
import { usePageTitle } from '../../hooks/usePageTitle';
import { ROUTES } from '../../utils/constants';

const MyBookingsPage = () => {
  usePageTitle('My Bookings');
  const navigate = useNavigate();

  const {
    bookings,
    tab,
    setTab,
    statusFilter,
    setStatusFilter,
    search,
    setSearch,
    stats,
    isLoading,
    error,
  } = useBookings();

  return (
    <Box>
      <PageHeader
        title="My Bookings"
        subtitle="Manage your upcoming events and booking history"
      />

      <BookingTabs activeTab={tab} onTabChange={setTab} stats={stats} />

      <Box
        sx={{
          display: 'flex',
          flexDirection: { xs: 'column', sm: 'row' },
          gap: 2,
          mb: 3,
          p: 2,
          borderRadius: 3,
          border: 1,
          borderColor: 'divider',
          bgcolor: 'background.paper',
        }}
      >
        <TextField
          placeholder="Search bookings..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          size="small"
          sx={{ flex: 1 }}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <Search size={18} />
              </InputAdornment>
            ),
          }}
        />

        <FormControl size="small" sx={{ minWidth: 160 }}>
          <InputLabel>Status</InputLabel>
          <Select
            value={statusFilter}
            label="Status"
            onChange={(e) => setStatusFilter(e.target.value)}
          >
            <MenuItem value="all">All Statuses</MenuItem>
            <MenuItem value="CONFIRMED">Confirmed</MenuItem>
            <MenuItem value="PENDING">Pending</MenuItem>
            <MenuItem value="COMPLETED">Completed</MenuItem>
            <MenuItem value="CANCELLED">Cancelled</MenuItem>
          </Select>
        </FormControl>
      </Box>

      {error && (
        <Alert severity="warning" sx={{ mb: 3, borderRadius: 2 }}>
          {error}
        </Alert>
      )}

      {isLoading ? (
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
          {[1, 2, 3, 4].map((i) => (
            <Skeleton key={i} variant="rounded" height={110} sx={{ borderRadius: 3 }} />
          ))}
        </Box>
      ) : bookings.length > 0 ? (
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
          {bookings.map((booking, index) => (
            <BookingCard key={booking.id} booking={booking} index={index} />
          ))}
        </Box>
      ) : (
        <EmptyState
          icon={CalendarCheck}
          title={
            search || statusFilter !== 'all'
              ? 'No bookings match your filters'
              : tab === 'upcoming'
                ? 'No upcoming bookings'
                : tab === 'past'
                  ? 'No booking history yet'
                  : 'No bookings yet'
          }
          description={
            search || statusFilter !== 'all'
              ? 'Try adjusting your search or filters.'
              : 'Book an event to see your reservations here.'
          }
          onAction={
            search || statusFilter !== 'all'
              ? () => { setSearch(''); setStatusFilter('all'); }
              : () => navigate(ROUTES.EVENTS)
          }
          actionLabel={search || statusFilter !== 'all' ? 'Clear filters' : 'Browse Events'}
        />
      )}

    </Box>
  );
};

export default MyBookingsPage;
