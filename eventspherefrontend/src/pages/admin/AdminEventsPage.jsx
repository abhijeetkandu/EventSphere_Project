import { useState, useEffect, useCallback } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Chip from '@mui/material/Chip';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import Alert from '@mui/material/Alert';
import Pagination from '@mui/material/Pagination';
import Skeleton from '@mui/material/Skeleton';
import { Plus, Search, Pencil, Trash2, Star } from 'lucide-react';
import toast from 'react-hot-toast';
import { PageHeader } from '../../components/common/PageHeader';
import { EmptyState } from '../../components/common/EmptyState';
import { EventFormDialog } from '../../components/admin/EventFormDialog';
import { DeleteConfirmDialog } from '../../components/admin/DeleteConfirmDialog';
import { eventService } from '../../services/eventService';
import { useDebounce } from '../../hooks/useDebounce';
import { usePageTitle } from '../../hooks/usePageTitle';
import { getErrorMessage } from '../../utils/errorHandler';
import { formatDate, formatPrice } from '../../utils/formatters';
import { EVENT_STATUS } from '../../utils/constants';

const getStatusConfig = (status) =>
  EVENT_STATUS[status?.toUpperCase()] ?? { label: status || 'Active', color: 'default' };

const AdminEventsPage = () => {
  usePageTitle('Manage Events');

  const [events, setEvents] = useState([]);
  const [page, setPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [totalElements, setTotalElements] = useState(0);
  const [search, setSearch] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const [formOpen, setFormOpen] = useState(false);
  const [editEvent, setEditEvent] = useState(null);
  const [deleteTarget, setDeleteTarget] = useState(null);
  const [isDeleting, setIsDeleting] = useState(false);

  const debouncedSearch = useDebounce(search);

  const fetchEvents = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const params = { page, size: 10, sort: 'eventDate,desc' };
      const result = debouncedSearch.trim()
        ? await eventService.searchEvents({ ...params, search: debouncedSearch })
        : await eventService.getEvents(params);

      setEvents(result.events);
      setTotalPages(result.totalPages);
      setTotalElements(result.totalElements);
    } catch (err) {
      setError(getErrorMessage(err, 'Failed to load events'));
      setEvents([]);
    } finally {
      setIsLoading(false);
    }
  }, [page, debouncedSearch]);

  useEffect(() => {
    fetchEvents();
  }, [fetchEvents]);

  useEffect(() => {
    setPage(0);
  }, [debouncedSearch]);

  const handleCreate = () => {
    setEditEvent(null);
    setFormOpen(true);
  };

  const handleEdit = (event) => {
    setEditEvent(event);
    setFormOpen(true);
  };

  const handleDelete = async () => {
    if (!deleteTarget) return;
    setIsDeleting(true);
    try {
      await eventService.deleteEvent(deleteTarget.id);
      toast.success('Event deleted successfully');
      setDeleteTarget(null);
      fetchEvents();
    } catch (err) {
      toast.error(getErrorMessage(err, 'Failed to delete event'));
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <Box>
      <PageHeader
        title="Event Management"
        subtitle={`${totalElements} event${totalElements !== 1 ? 's' : ''} on the platform`}
        action={
          <Button variant="contained" startIcon={<Plus size={18} />} onClick={handleCreate}>
            Create Event
          </Button>
        }
      />

      <TextField
        placeholder="Search events..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        size="small"
        sx={{ mb: 3, maxWidth: 400 }}
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

      <TableContainer
        sx={{
          borderRadius: 3,
          border: 1,
          borderColor: 'divider',
          bgcolor: 'background.paper',
        }}
      >
        <Table>
          <TableHead>
            <TableRow>
              <TableCell sx={{ fontWeight: 700 }}>Event</TableCell>
              <TableCell sx={{ fontWeight: 700 }}>Category</TableCell>
              <TableCell sx={{ fontWeight: 700 }}>Date</TableCell>
              <TableCell sx={{ fontWeight: 700 }}>Price</TableCell>
              <TableCell sx={{ fontWeight: 700 }}>Capacity</TableCell>
              <TableCell sx={{ fontWeight: 700 }}>Status</TableCell>
              <TableCell sx={{ fontWeight: 700 }} align="right">Actions</TableCell>
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
            ) : events.length > 0 ? (
              events.map((event) => {
                const statusConfig = getStatusConfig(event.status);
                return (
                  <TableRow key={event.id} hover>
                    <TableCell>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                        {event.bannerImage ? (
                          <Box
                            component="img"
                            src={event.bannerImage}
                            alt=""
                            sx={{ width: 40, height: 40, borderRadius: 1.5, objectFit: 'cover' }}
                          />
                        ) : (
                          <Box
                            sx={{
                              width: 40,
                              height: 40,
                              borderRadius: 1.5,
                              background: (t) =>
                                `linear-gradient(135deg, ${t.palette.primary.main}, ${t.palette.secondary.main})`,
                            }}
                          />
                        )}
                        <Box>
                          <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                            <Typography variant="body2" fontWeight={600}>
                              {event.title}
                            </Typography>
                            {event.featured && <Star size={14} color="#F59E0B" fill="#F59E0B" />}
                          </Box>
                          <Typography variant="caption" color="text.secondary">
                            {event.location}
                          </Typography>
                        </Box>
                      </Box>
                    </TableCell>
                    <TableCell>
                      <Chip label={event.category} size="small" variant="outlined" />
                    </TableCell>
                    <TableCell>{formatDate(event.date)}</TableCell>
                    <TableCell sx={{ fontWeight: 600, color: 'primary.main' }}>
                      {formatPrice(event.price)}
                    </TableCell>
                    <TableCell>{event.capacity ?? '—'}</TableCell>
                    <TableCell>
                      <Chip label={statusConfig.label} size="small" color={statusConfig.color} />
                    </TableCell>
                    <TableCell align="right">
                      <Tooltip title="Edit">
                        <IconButton size="small" onClick={() => handleEdit(event)}>
                          <Pencil size={16} />
                        </IconButton>
                      </Tooltip>
                      <Tooltip title="Delete">
                        <IconButton size="small" color="error" onClick={() => setDeleteTarget(event)}>
                          <Trash2 size={16} />
                        </IconButton>
                      </Tooltip>
                    </TableCell>
                  </TableRow>
                );
              })
            ) : (
              <TableRow>
                <TableCell colSpan={7}>
                  <EmptyState
                    title="No events found"
                    description={search ? 'Try a different search term.' : 'Create your first event to get started.'}
                    onAction={search ? () => setSearch('') : handleCreate}
                    actionLabel={search ? 'Clear search' : 'Create Event'}
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

      <EventFormDialog
        open={formOpen}
        onClose={() => setFormOpen(false)}
        event={editEvent}
        onSaved={() => fetchEvents()}
      />

      <DeleteConfirmDialog
        open={Boolean(deleteTarget)}
        onClose={() => setDeleteTarget(null)}
        onConfirm={handleDelete}
        title="Delete Event"
        itemName={deleteTarget?.title}
        isLoading={isDeleting}
      />
    </Box>
  );
};

export default AdminEventsPage;
