import { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { EventCard } from '../events/EventCard';
import { EventGridSkeleton } from '../common/EventSkeleton';
import { eventService } from '../../services/eventService';
import { useFavorites } from '../../hooks/useFavorites';
import { ROUTES } from '../../utils/constants';

export const FeaturedEventsSection = () => {
  const [events, setEvents] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const { isFavorite, toggleFavorite } = useFavorites();

  useEffect(() => {
    eventService
      .getFeaturedEvents(6)
      .then(setEvents)
      .catch(() => setEvents([]))
      .finally(() => setIsLoading(false));
  }, []);

  return (
    <Box sx={{ py: { xs: 8, md: 10 } }}>
      <Container maxWidth="lg">
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', mb: 4, flexWrap: 'wrap', gap: 2 }}>
          <Box>
            <Typography variant="overline" color="primary" sx={{ fontWeight: 700, letterSpacing: 1.5 }}>
              Featured
            </Typography>
            <Typography variant="h4" sx={{ fontWeight: 700, letterSpacing: '-0.03em' }}>
              Trending events
            </Typography>
            <Typography variant="body1" color="text.secondary" sx={{ mt: 0.5 }}>
              Hand-picked experiences you won&apos;t want to miss
            </Typography>
          </Box>
          <Button component={Link} to={ROUTES.EVENTS} endIcon={<ArrowRight size={18} />}>
            View all events
          </Button>
        </Box>

        {isLoading ? (
          <EventGridSkeleton count={6} />
        ) : events.length > 0 ? (
          <Grid container spacing={3}>
            {events.map((event, index) => (
              <Grid item xs={12} sm={6} md={4} key={event.id}>
                <EventCard
                  event={event}
                  index={index}
                  isFavorite={isFavorite(event.id)}
                  onToggleFavorite={toggleFavorite}
                />
              </Grid>
            ))}
          </Grid>
        ) : (
          <Box
            sx={{
              p: 6,
              textAlign: 'center',
              borderRadius: 4,
              border: 1,
              borderColor: 'divider',
              bgcolor: 'background.paper',
            }}
          >
            <Typography variant="h6" sx={{ fontWeight: 600, mb: 1 }}>
              Events coming soon
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
              Connect your backend to showcase featured events here.
            </Typography>
            <Button component={Link} to={ROUTES.EVENTS} variant="contained">
              Browse Events
            </Button>
          </Box>
        )}
      </Container>
    </Box>
  );
};
