import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Alert from '@mui/material/Alert';
import Skeleton from '@mui/material/Skeleton';
import { Link, useNavigate } from 'react-router-dom';
import { CalendarCheck, Ticket, DollarSign, Clock, ArrowRight } from 'lucide-react';
import { EmptyState } from '../../components/common/EmptyState';
import { WelcomeBanner } from '../../components/dashboard/WelcomeBanner';
import { StatCard } from '../../components/dashboard/StatCard';
import { BookingCard } from '../../components/dashboard/BookingCard';
import { QuickActions } from '../../components/dashboard/QuickActions';
import { useDashboard } from '../../hooks/useDashboard';
import { usePageTitle } from '../../hooks/usePageTitle';
import { formatPrice } from '../../utils/formatters';
import { ROUTES } from '../../utils/constants';

const statConfig = [
  {
    key: 'totalBookings',
    label: 'Total Bookings',
    icon: CalendarCheck,
    gradient: 'linear-gradient(135deg, #4F46E5, #6366F1)',
    format: (v) => v,
  },
  {
    key: 'upcomingEvents',
    label: 'Upcoming Events',
    icon: Clock,
    gradient: 'linear-gradient(135deg, #06B6D4, #3B82F6)',
    format: (v) => v,
  },
  {
    key: 'totalTickets',
    label: 'Tickets Owned',
    icon: Ticket,
    gradient: 'linear-gradient(135deg, #22C55E, #06B6D4)',
    format: (v) => v,
  },
  {
    key: 'totalSpent',
    label: 'Total Spent',
    icon: DollarSign,
    gradient: 'linear-gradient(135deg, #F59E0B, #EF4444)',
    format: (v) => formatPrice(v),
  },
];

const DashboardPage = () => {
  usePageTitle('Dashboard');

  const navigate = useNavigate();
  const { upcomingBookings, stats, isLoading, error } = useDashboard();

  return (
    <Box>
      <WelcomeBanner />

      {error && (
        <Alert severity="warning" sx={{ mb: 3, borderRadius: 2 }}>
          {error}
        </Alert>
      )}

      <Grid container spacing={2.5} sx={{ mb: 4 }}>
        {statConfig.map((stat, index) => (
          <Grid item xs={6} md={3} key={stat.key}>
            <StatCard
              label={stat.label}
              value={stat.format(stats[stat.key])}
              icon={stat.icon}
              gradient={stat.gradient}
              index={index}
              isLoading={isLoading}
            />
          </Grid>
        ))}
      </Grid>

      <Box sx={{ mb: 4 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
          <Typography variant="h6" sx={{ fontWeight: 700 }}>
            Upcoming Bookings
          </Typography>
          <Button component={Link} to={ROUTES.MY_BOOKINGS} size="small" endIcon={<ArrowRight size={16} />}>
            View all
          </Button>
        </Box>

        {isLoading ? (
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            {[1, 2, 3].map((i) => (
              <Skeleton key={i} variant="rounded" height={100} sx={{ borderRadius: 3 }} />
            ))}
          </Box>
        ) : upcomingBookings.length > 0 ? (
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            {upcomingBookings.map((booking, index) => (
              <BookingCard key={booking.id} booking={booking} index={index} compact />
            ))}
          </Box>
        ) : (
          <EmptyState
            icon={CalendarCheck}
            title="No upcoming bookings"
            description="You don't have any upcoming events. Start exploring and book your next experience."
            onAction={() => navigate(ROUTES.EVENTS)}
            actionLabel="Browse Events"
          />
        )}
      </Box>

      <QuickActions />
    </Box>
  );
};

export default DashboardPage;
