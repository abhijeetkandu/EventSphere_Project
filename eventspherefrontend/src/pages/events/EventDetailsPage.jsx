import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Chip from '@mui/material/Chip';
import Grid from '@mui/material/Grid';
import IconButton from '@mui/material/IconButton';
import { motion } from 'framer-motion';
import {
  Calendar,
  MapPin,
  Clock,
  Users,
  Heart,
  Ticket,
  ArrowLeft,
  Share2,
} from 'lucide-react';
import toast from 'react-hot-toast';
import { EventDetailsSkeleton } from '../../components/common/EventSkeleton';
import { EmptyState } from '../../components/common/EmptyState';
import { EventImage } from '../../components/common/EventImage';
import { EventCard } from '../../components/events/EventCard';
import { BookTicketDialog } from '../../components/events/BookTicketDialog';
import { eventService } from '../../services/eventService';
import { useFavorites } from '../../hooks/useFavorites';
import { usePageTitle } from '../../hooks/usePageTitle';
import { getErrorMessage } from '../../utils/errorHandler';
import { formatDate, formatTime, formatPrice } from '../../utils/formatters';
import { ROUTES } from '../../utils/constants';

const EventDetailsPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [event, setEvent] = useState(null);
  const [relatedEvents, setRelatedEvents] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [bookDialogOpen, setBookDialogOpen] = useState(false);
  const { isFavorite, toggleFavorite } = useFavorites();

  usePageTitle(event?.title || 'Event Details');

  useEffect(() => {
    const fetchEvent = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const data = await eventService.getEventById(id);
        setEvent(data);

        const related = await eventService.getEvents({
          page: 0,
          size: 3,
          category: data.category,
          sort: 'eventDate,asc',
        });
        setRelatedEvents(related.events.filter((e) => e.id !== data.id).slice(0, 3));
      } catch (err) {
        setError(getErrorMessage(err, 'Event not found'));
      } finally {
        setIsLoading(false);
      }
    };

    if (id) fetchEvent();
  }, [id]);

  const handleShare = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href);
      toast.success('Link copied to clipboard');
    } catch {
      toast.error('Unable to copy link');
    }
  };

  if (isLoading) {
    return (
      <Container maxWidth="lg" sx={{ py: 4 }}>
        <EventDetailsSkeleton />
      </Container>
    );
  }

  if (error || !event) {
    return (
      <Container maxWidth="lg" sx={{ py: 8 }}>
        <EmptyState
          icon={Calendar}
          title="Event not found"
          description={error || 'This event may have been removed or does not exist.'}
          onAction={() => navigate(ROUTES.EVENTS)}
          actionLabel="Browse Events"
        />
      </Container>
    );
  }

  const favorited = isFavorite(event.id);

  return (
    <Box sx={{ pb: 8 }}>
      <Box
        sx={{
          position: 'relative',
          height: { xs: 280, md: 420 },
          overflow: 'hidden',
        }}
      >
        <EventImage
          src={event.bannerImage}
          alt={event.title}
          category={event.category}
          height="100%"
        />
        <Box
          sx={{
            position: 'absolute',
            inset: 0,
            background: 'linear-gradient(to top, rgba(0,0,0,0.7) 0%, transparent 60%)',
          }}
        />
        <Container
          maxWidth="lg"
          sx={{
            position: 'absolute',
            bottom: 0,
            left: 0,
            right: 0,
            pb: 4,
            color: 'white',
          }}
        >
          <Button
            startIcon={<ArrowLeft size={18} />}
            onClick={() => navigate(ROUTES.EVENTS)}
            sx={{ color: 'white', mb: 2, '&:hover': { bgcolor: 'rgba(255,255,255,0.1)' } }}
          >
            Back to Events
          </Button>
          <Chip
            label={event.category}
            sx={{ mb: 1.5, bgcolor: 'rgba(255,255,255,0.2)', color: 'white', fontWeight: 600 }}
          />
          <Typography variant="h3" sx={{ fontWeight: 800, letterSpacing: '-0.03em', lineHeight: 1.15 }}>
            {event.title}
          </Typography>
        </Container>
      </Box>

      <Container maxWidth="lg" sx={{ mt: -4, position: 'relative', zIndex: 1 }}>
        <Grid container spacing={4}>
          <Grid item xs={12} md={8}>
            <Box
              component={motion.div}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              sx={{
                p: { xs: 3, md: 4 },
                borderRadius: 4,
                border: 1,
                borderColor: 'divider',
                bgcolor: 'background.paper',
                boxShadow: 3,
              }}
            >
              <Typography variant="h6" sx={{ fontWeight: 700, mb: 2 }}>
                About this event
              </Typography>
              <Typography variant="body1" color="text.secondary" sx={{ lineHeight: 1.8, whiteSpace: 'pre-line' }}>
                {event.description || 'No description available for this event.'}
              </Typography>

              {event.organizer && (
                <Box sx={{ mt: 3, pt: 3, borderTop: 1, borderColor: 'divider' }}>
                  <Typography variant="subtitle2" color="text.secondary" sx={{ mb: 0.5 }}>
                    Organized by
                  </Typography>
                  <Typography variant="body1" fontWeight={600}>
                    {event.organizer}
                  </Typography>
                </Box>
              )}
            </Box>
          </Grid>

          <Grid item xs={12} md={4}>
            <Box
              component={motion.div}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              sx={{
                p: 3,
                borderRadius: 4,
                border: 1,
                borderColor: 'divider',
                bgcolor: 'background.paper',
                boxShadow: 3,
                position: { md: 'sticky' },
                top: 88,
              }}
            >
              <Typography variant="h4" sx={{ fontWeight: 800, color: 'primary.main', mb: 3 }}>
                {formatPrice(event.price)}
              </Typography>

              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, mb: 3 }}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                  <Calendar size={18} color="var(--mui-palette-primary-main)" />
                  <Box>
                    <Typography variant="caption" color="text.secondary">Date</Typography>
                    <Typography variant="body2" fontWeight={600}>{formatDate(event.date)}</Typography>
                  </Box>
                </Box>

                {event.startTime && (
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                    <Clock size={18} color="var(--mui-palette-primary-main)" />
                    <Box>
                      <Typography variant="caption" color="text.secondary">Time</Typography>
                      <Typography variant="body2" fontWeight={600}>
                        {formatTime(event.startTime)}
                        {event.endTime && ` – ${formatTime(event.endTime)}`}
                      </Typography>
                    </Box>
                  </Box>
                )}

                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                  <MapPin size={18} color="var(--mui-palette-primary-main)" />
                  <Box>
                    <Typography variant="caption" color="text.secondary">Location</Typography>
                    <Typography variant="body2" fontWeight={600}>{event.location}</Typography>
                  </Box>
                </Box>

                {event.availableSeats != null && (
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                    <Users size={18} color="var(--mui-palette-primary-main)" />
                    <Box>
                      <Typography variant="caption" color="text.secondary">Availability</Typography>
                      <Typography variant="body2" fontWeight={600}>
                        {event.availableSeats} of {event.capacity ?? '—'} seats left
                      </Typography>
                    </Box>
                  </Box>
                )}
              </Box>

              <Button
                fullWidth
                variant="contained"
                size="large"
                startIcon={<Ticket size={20} />}
                onClick={() => setBookDialogOpen(true)}
                sx={{ py: 1.5, mb: 1.5 }}
              >
                Book Tickets
              </Button>

              <Box sx={{ display: 'flex', gap: 1 }}>
                <Button
                  fullWidth
                  variant="outlined"
                  startIcon={<Heart size={18} fill={favorited ? 'currentColor' : 'none'} />}
                  onClick={() => toggleFavorite(event.id, event.title)}
                  sx={{ color: favorited ? 'error.main' : undefined, borderColor: favorited ? 'error.main' : undefined }}
                >
                  {favorited ? 'Saved' : 'Save'}
                </Button>
                <IconButton onClick={handleShare} sx={{ border: 1, borderColor: 'divider', borderRadius: 2 }}>
                  <Share2 size={18} />
                </IconButton>
              </Box>
            </Box>
          </Grid>
        </Grid>

        {relatedEvents.length > 0 && (
          <Box sx={{ mt: 8 }}>
            <Typography variant="h5" sx={{ fontWeight: 700, mb: 3, letterSpacing: '-0.02em' }}>
              Similar events
            </Typography>
            <Grid container spacing={3}>
              {relatedEvents.map((related, index) => (
                <Grid item xs={12} sm={6} md={4} key={related.id}>
                  <EventCard
                    event={related}
                    index={index}
                    isFavorite={isFavorite(related.id)}
                    onToggleFavorite={toggleFavorite}
                  />
                </Grid>
              ))}
            </Grid>
          </Box>
        )}
      </Container>

      <BookTicketDialog
        open={bookDialogOpen}
        onClose={() => setBookDialogOpen(false)}
        event={event}
      />
    </Box>
  );
};

export default EventDetailsPage;
