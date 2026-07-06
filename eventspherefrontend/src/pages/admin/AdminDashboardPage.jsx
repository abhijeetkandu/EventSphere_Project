import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Alert from '@mui/material/Alert';
import Chip from '@mui/material/Chip';
import { Calendar, Users, CalendarCheck, DollarSign, TrendingUp } from 'lucide-react';
import { PageHeader } from '../../components/common/PageHeader';
import { AdminStatCard } from '../../components/admin/AdminStatCard';
import { RevenueChart } from '../../components/admin/RevenueChart';
import { BookingsChart } from '../../components/admin/BookingsChart';
import { BookingCard } from '../../components/dashboard/BookingCard';
import { useAdminAnalytics } from '../../hooks/useAdminAnalytics';
import { usePageTitle } from '../../hooks/usePageTitle';
import { formatPrice, formatCompactNumber } from '../../utils/formatters';

const statConfig = [
  {
    key: 'totalEvents',
    label: 'Total Events',
    icon: Calendar,
    gradient: 'linear-gradient(135deg, #635BFF, #7A73FF)',
    format: (v) => formatCompactNumber(v),
  },
  {
    key: 'totalUsers',
    label: 'Total Users',
    icon: Users,
    gradient: 'linear-gradient(135deg, #0EA5E9, #635BFF)',
    format: (v) => formatCompactNumber(v),
  },
  {
    key: 'totalBookings',
    label: 'Total Bookings',
    icon: CalendarCheck,
    gradient: 'linear-gradient(135deg, #22C55E, #06B6D4)',
    format: (v) => formatCompactNumber(v),
  },
  {
    key: 'totalRevenue',
    label: 'Total Revenue',
    icon: DollarSign,
    gradient: 'linear-gradient(135deg, #F59E0B, #EF4444)',
    format: (v) => formatPrice(v),
  },
];

const AdminDashboardPage = () => {
  usePageTitle('Admin Analytics');
  const { stats, isLoading, error } = useAdminAnalytics();

  return (
    <Box>
      <PageHeader
        title="Analytics Dashboard"
        subtitle="Platform overview and performance insights"
        action={
          <Chip
            icon={<TrendingUp size={14} />}
            label="Live Data"
            color="primary"
            variant="outlined"
            sx={{ fontWeight: 600 }}
          />
        }
      />

      {error && (
        <Alert severity="info" sx={{ mb: 3, borderRadius: 2 }}>
          {error} — Showing available data with sample charts.
        </Alert>
      )}

      <Grid container spacing={2.5} sx={{ mb: 3 }}>
        {statConfig.map((stat, index) => (
          <Grid item xs={6} md={3} key={stat.key}>
            <AdminStatCard
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

      <Grid container spacing={3} sx={{ mb: 4 }}>
        <Grid item xs={12} lg={7}>
          <RevenueChart data={stats.monthlyRevenue} isLoading={isLoading} />
        </Grid>
        <Grid item xs={12} lg={5}>
          <BookingsChart data={stats.bookingsByMonth} isLoading={isLoading} />
        </Grid>
      </Grid>

      {stats.recentBookings?.length > 0 && (
        <Box>
          <Typography variant="h6" sx={{ fontWeight: 700, mb: 2 }}>
            Recent Bookings
          </Typography>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            {stats.recentBookings.slice(0, 5).map((booking, index) => (
              <BookingCard key={booking.id} booking={booking} index={index} compact />
            ))}
          </Box>
        </Box>
      )}
    </Box>
  );
};

export default AdminDashboardPage;
