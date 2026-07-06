import { useState, useEffect, useCallback } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Chip from '@mui/material/Chip';
import Alert from '@mui/material/Alert';
import Pagination from '@mui/material/Pagination';
import Skeleton from '@mui/material/Skeleton';
import { Search, CalendarCheck } from 'lucide-react';
import { PageHeader } from '../../components/common/PageHeader';
import { EmptyState } from '../../components/common/EmptyState';
import { adminService } from '../../services/adminService';
import { useDebounce } from '../../hooks/useDebounce';
import { usePageTitle } from '../../hooks/usePageTitle';
import { getErrorMessage } from '../../utils/errorHandler';
import { formatDate, formatPrice } from '../../utils/formatters';
import { BOOKING_STATUS } from '../../utils/constants';

const getStatusConfig = (status) =>
  BOOKING_STATUS[status?.toUpperCase()] ?? { label: status || 'Confirmed', color: 'default' };

const AdminBookingsPage = () => {
  usePageTitle('Manage Bookings');

  const [bookings, setBookings] = useState([]);
  const [page, setPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [totalElements, setTotalElements] = useState(0);
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const debouncedSearch = useDebounce(search);

  const fetchBookings = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const result = await adminService.getAllBookings({
        page,
        size: 10,
        sort: 'createdAt,desc',
        search: debouncedSearch.trim() || undefined,
        status: statusFilter !== 'all' ? statusFilter : undefined,
      });
      setBookings(result.items);
      setTotalPages(result.totalPages);
      setTotalElements(result.totalElements);
    } catch (err) {
      setError(getErrorMessage(err, 'Failed to load bookings'));
      setBookings([]);
    } finally {
      setIsLoading(false);
    }
  }, [page, debouncedSearch, statusFilter]);

  useEffect(() => {
    fetchBookings();
  }, [fetchBookings]);

  useEffect(() => {
    setPage(0);
  }, [debouncedSearch, statusFilter]);

  return (
    <Box>
      <PageHeader
        title="Booking Management"
        subtitle={`${totalElements} total booking${totalElements !== 1 ? 's' : ''}`}
      />

      <Box sx={{ display: 'flex', gap: 2, mb: 3, flexWrap: 'wrap' }}>
        <TextField
          placeholder="Search bookings..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          size="small"
          sx={{ flex: 1, minWidth: 200, maxWidth: 400 }}
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

      <TableContainer
        sx={{ borderRadius: 3, border: 1, borderColor: 'divider', bgcolor: 'background.paper' }}
      >
        <Table>
          <TableHead>
            <TableRow>
              <TableCell sx={{ fontWeight: 700 }}>Ticket Code</TableCell>
              <TableCell sx={{ fontWeight: 700 }}>Event</TableCell>
              <TableCell sx={{ fontWeight: 700 }}>Event Date</TableCell>
              <TableCell sx={{ fontWeight: 700 }}>Tickets</TableCell>
              <TableCell sx={{ fontWeight: 700 }}>Total</TableCell>
              <TableCell sx={{ fontWeight: 700 }}>Booked On</TableCell>
              <TableCell sx={{ fontWeight: 700 }}>Status</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {isLoading ? (
              Array.from({ length: 5 }).map((_, i) => (
                <TableRow key={i}>
                  {Array.from({ length: 7 }).map((__, j) => (
                    <TableCell key={j}><Skeleton /></TableCell>
                  ))}
                </TableRow>
              ))
            ) : bookings.length > 0 ? (
              bookings.map((booking) => {
                const statusConfig = getStatusConfig(booking.status);
                return (
                  <TableRow key={booking.id} hover>
                    <TableCell>
                      <Typography variant="body2" fontFamily="monospace" fontWeight={600}>
                        {booking.ticketCode}
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Typography variant="body2" fontWeight={600}>
                        {booking.eventTitle}
                      </Typography>
                      <Typography variant="caption" color="text.secondary">
                        {booking.location}
                      </Typography>
                    </TableCell>
                    <TableCell>{formatDate(booking.eventDate)}</TableCell>
                    <TableCell>{booking.tickets}</TableCell>
                    <TableCell sx={{ fontWeight: 600, color: 'primary.main' }}>
                      {formatPrice(booking.totalPrice)}
                    </TableCell>
                    <TableCell>{formatDate(booking.bookingDate)}</TableCell>
                    <TableCell>
                      <Chip label={statusConfig.label} size="small" color={statusConfig.color} />
                    </TableCell>
                  </TableRow>
                );
              })
            ) : (
              <TableRow>
                <TableCell colSpan={7}>
                  <EmptyState
                    icon={CalendarCheck}
                    title="No bookings found"
                    description="No bookings match your current filters."
                    onAction={() => { setSearch(''); setStatusFilter('all'); }}
                    actionLabel="Clear filters"
                  />
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>

      {totalPages > 1 && (
        <Box sx={{ display: 'flex', justifyContent: 'center', mt: 3 }}>
          <Pagination
            count={totalPages}
            page={page + 1}
            onChange={(_, val) => setPage(val - 1)}
            color="primary"
            shape="rounded"
          />
        </Box>
      )}
    </Box>
  );
};

export default AdminBookingsPage;
