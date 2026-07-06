import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Skeleton from '@mui/material/Skeleton';
import { useTheme } from '@mui/material/styles';
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';

const defaultData = [
  { month: 'Jan', revenue: 4200, bookings: 24 },
  { month: 'Feb', revenue: 5800, bookings: 32 },
  { month: 'Mar', revenue: 7200, bookings: 41 },
  { month: 'Apr', revenue: 6100, bookings: 35 },
  { month: 'May', revenue: 8900, bookings: 52 },
  { month: 'Jun', revenue: 10200, bookings: 61 },
];

export const RevenueChart = ({ data, isLoading }) => {
  const theme = useTheme();
  const chartData = data?.length > 0 ? data : defaultData;

  return (
    <Box
      sx={{
        p: 3,
        borderRadius: 3,
        border: 1,
        borderColor: 'divider',
        bgcolor: 'background.paper',
        height: 360,
      }}
    >
      <Typography variant="h6" sx={{ fontWeight: 700, mb: 2 }}>
        Revenue Overview
      </Typography>

      {isLoading ? (
        <Skeleton variant="rounded" height={280} />
      ) : (
        <ResponsiveContainer width="100%" height={280}>
          <AreaChart data={chartData}>
            <defs>
              <linearGradient id="revenueGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor={theme.palette.primary.main} stopOpacity={0.3} />
                <stop offset="95%" stopColor={theme.palette.primary.main} stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke={theme.palette.divider} />
            <XAxis dataKey="month" tick={{ fontSize: 12 }} stroke={theme.palette.text.secondary} />
            <YAxis tick={{ fontSize: 12 }} stroke={theme.palette.text.secondary} />
            <Tooltip
              contentStyle={{
                borderRadius: 12,
                border: `1px solid ${theme.palette.divider}`,
                background: theme.palette.background.paper,
              }}
            />
            <Area
              type="monotone"
              dataKey="revenue"
              stroke={theme.palette.primary.main}
              fill="url(#revenueGradient)"
              strokeWidth={2}
            />
          </AreaChart>
        </ResponsiveContainer>
      )}
    </Box>
  );
};
