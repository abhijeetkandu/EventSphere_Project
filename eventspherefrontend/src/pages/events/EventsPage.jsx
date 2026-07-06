import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Alert from '@mui/material/Alert';
import Pagination from '@mui/material/Pagination';
import Grid from '@mui/material/Grid';
import { CalendarSearch } from 'lucide-react';
import { PageHeader } from '../../components/common/PageHeader';
import { EmptyState } from '../../components/common/EmptyState';
import { EventGridSkeleton, EventListSkeleton } from '../../components/common/EventSkeleton';
import { EventCard } from '../../components/events/EventCard';
import { EventListItem } from '../../components/events/EventListItem';
import { EventFilters } from '../../components/events/EventFilters';
import { EventToolbar } from '../../components/events/EventToolbar';
import { useEvents } from '../../hooks/useEvents';
import { useDebounce } from '../../hooks/useDebounce';
import { useFavorites } from '../../hooks/useFavorites';
import { usePageTitle } from '../../hooks/usePageTitle';

const EventsPage = () => {
  usePageTitle('Events');

  const [searchParams, setSearchParams] = useSearchParams();
  const [search, setSearch] = useState(searchParams.get('search') || '');
  const [category, setCategory] = useState(searchParams.get('category') || 'all');
  const [sort, setSort] = useState('eventDate,asc');
  const [view, setView] = useState('grid');
  const [page, setPage] = useState(0);

  const debouncedSearch = useDebounce(search);
  const { isFavorite, toggleFavorite } = useFavorites();

  const { events, totalElements, totalPages, isLoading, error } = useEvents({
    search: debouncedSearch,
    category,
    sort,
    page,
    size: 12,
  });

  useEffect(() => {
    const urlCategory = searchParams.get('category') || 'all';
    if (urlCategory !== category) setCategory(urlCategory);
  }, [searchParams, category]);

  useEffect(() => {
    const params = new URLSearchParams();
    if (debouncedSearch) params.set('search', debouncedSearch);
    if (category && category !== 'all') params.set('category', category);
    setSearchParams(params, { replace: true });
  }, [debouncedSearch, category, setSearchParams]);

  useEffect(() => {
    setPage(0);
  }, [debouncedSearch, category, sort]);

  const handleCategoryChange = (newCategory) => {
    setCategory(newCategory);
    setPage(0);
  };

  return (
    <Box sx={{ py: { xs: 4, md: 6 } }}>
      <Container maxWidth="lg">
        <PageHeader
          title="Discover Events"
          subtitle="Find and book unforgettable experiences near you"
        />

        <EventFilters category={category} onCategoryChange={handleCategoryChange} />

        <EventToolbar
          search={search}
          onSearchChange={setSearch}
          sort={sort}
          onSortChange={setSort}
          view={view}
          onViewChange={setView}
          totalElements={totalElements}
        />

        {error && (
          <Alert severity="warning" sx={{ mb: 3, borderRadius: 2 }}>
            {error}
          </Alert>
        )}

        {isLoading ? (
          view === 'grid' ? <EventGridSkeleton count={6} /> : <EventListSkeleton count={5} />
        ) : events.length === 0 ? (
          <EmptyState
            icon={CalendarSearch}
            title="No events found"
            description={
              debouncedSearch || category !== 'all'
                ? 'Try adjusting your search or filters to find more events.'
                : 'No events are available yet. Check back soon or connect your backend.'
            }
            onAction={() => {
              setSearch('');
              setCategory('all');
            }}
            actionLabel="Clear filters"
          />
        ) : view === 'grid' ? (
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
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            {events.map((event, index) => (
              <EventListItem
                key={event.id}
                event={event}
                index={index}
                isFavorite={isFavorite(event.id)}
                onToggleFavorite={toggleFavorite}
              />
            ))}
          </Box>
        )}

        {totalPages > 1 && (
          <Box sx={{ display: 'flex', justifyContent: 'center', mt: 5 }}>
            <Pagination
              count={totalPages}
              page={page + 1}
              onChange={(_, value) => setPage(value - 1)}
              color="primary"
              shape="rounded"
              size="large"
            />
          </Box>
        )}

        {!isLoading && events.length > 0 && (
          <Typography variant="caption" color="text.secondary" sx={{ display: 'block', textAlign: 'center', mt: 2 }}>
            Page {page + 1} of {totalPages} · {totalElements} total events
          </Typography>
        )}
      </Container>
    </Box>
  );
};

export default EventsPage;
