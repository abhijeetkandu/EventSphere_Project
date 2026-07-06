import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Skeleton from '@mui/material/Skeleton';
import { useTheme } from '@mui/material/styles';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';

const defaultData = [
  { month: 'Jan', bookings: 24 },
  { month: 'Feb', bookings: 32 },
  { month: 'Mar', bookings: 41 },
  { month: 'Apr', bookings: 35 },
  { month: 'May', bookings: 52 },
  { month: 'Jun', bookings: 61 },
];

export const BookingsChart = ({ data, isLoading }) => {
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
        Bookings Trend
      </Typography>

      {isLoading ? (
        <Skeleton variant="rounded" height={280} />
      ) : (
        <ResponsiveContainer width="100%" height={280}>
          <BarChart data={chartData}>
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
            <Bar
              dataKey="bookings"
              fill={theme.palette.secondary.main}
              radius={[6, 6, 0, 0]}
            />
          </BarChart>
        </ResponsiveContainer>
      )}
    </Box>
  );
};
