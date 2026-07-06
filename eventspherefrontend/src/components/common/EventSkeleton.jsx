import Box from '@mui/material/Box';
import Skeleton from '@mui/material/Skeleton';
import Grid from '@mui/material/Grid';

export const EventCardSkeleton = () => (
  <Box
    sx={{
      borderRadius: 3,
      border: 1,
      borderColor: 'divider',
      overflow: 'hidden',
      bgcolor: 'background.paper',
    }}
  >
    <Skeleton variant="rectangular" height={180} />
    <Box sx={{ p: 2.5 }}>
      <Skeleton width="40%" height={24} sx={{ mb: 1 }} />
      <Skeleton width="80%" height={28} sx={{ mb: 1.5 }} />
      <Skeleton width="60%" height={20} sx={{ mb: 1 }} />
      <Skeleton width="30%" height={20} />
    </Box>
  </Box>
);

export const EventGridSkeleton = ({ count = 6 }) => (
  <Grid container spacing={3}>
    {Array.from({ length: count }).map((_, i) => (
      <Grid item xs={12} sm={6} md={4} key={i}>
        <EventCardSkeleton />
      </Grid>
    ))}
  </Grid>
);

export const EventListSkeleton = ({ count = 5 }) => (
  <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
    {Array.from({ length: count }).map((_, i) => (
      <Box
        key={i}
        sx={{
          display: 'flex',
          gap: 2,
          p: 2,
          borderRadius: 3,
          border: 1,
          borderColor: 'divider',
        }}
      >
        <Skeleton variant="rounded" width={120} height={90} />
        <Box sx={{ flex: 1 }}>
          <Skeleton width="30%" height={20} sx={{ mb: 1 }} />
          <Skeleton width="70%" height={28} sx={{ mb: 1 }} />
          <Skeleton width="50%" height={20} />
        </Box>
      </Box>
    ))}
  </Box>
);

export const EventDetailsSkeleton = () => (
  <Box>
    <Skeleton variant="rounded" height={320} sx={{ borderRadius: 4, mb: 4 }} />
    <Skeleton width="60%" height={48} sx={{ mb: 2 }} />
    <Skeleton width="40%" height={24} sx={{ mb: 3 }} />
    <Skeleton width="100%" height={20} sx={{ mb: 1 }} />
    <Skeleton width="100%" height={20} sx={{ mb: 1 }} />
    <Skeleton width="80%" height={20} />
  </Box>
);
