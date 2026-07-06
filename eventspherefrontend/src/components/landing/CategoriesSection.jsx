import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { EVENT_CATEGORIES } from '../../utils/constants';

const categoryGradients = [
  'linear-gradient(135deg, #4F46E5 0%, #7C3AED 100%)',
  'linear-gradient(135deg, #06B6D4 0%, #3B82F6 100%)',
  'linear-gradient(135deg, #8B5CF6 0%, #EC4899 100%)',
  'linear-gradient(135deg, #F59E0B 0%, #EF4444 100%)',
  'linear-gradient(135deg, #22C55E 0%, #06B6D4 100%)',
  'linear-gradient(135deg, #F97316 0%, #FBBF24 100%)',
  'linear-gradient(135deg, #6366F1 0%, #06B6D4 100%)',
];

export const CategoriesSection = () => {
  const categories = EVENT_CATEGORIES.filter((c) => c.id !== 'all');

  return (
    <Box sx={{ py: { xs: 8, md: 10 }, bgcolor: 'background.paper' }}>
      <Container maxWidth="lg">
        <Box sx={{ textAlign: 'center', mb: 5 }}>
          <Typography variant="overline" color="primary" sx={{ fontWeight: 700, letterSpacing: 1.5 }}>
            Categories
          </Typography>
          <Typography variant="h4" sx={{ fontWeight: 700, letterSpacing: '-0.03em', mt: 0.5 }}>
            Explore by interest
          </Typography>
          <Typography variant="body1" color="text.secondary" sx={{ mt: 1, maxWidth: 480, mx: 'auto' }}>
            From tech conferences to live concerts — find events that match your passion.
          </Typography>
        </Box>

        <Grid container spacing={2}>
          {categories.map(({ id, label, icon }, index) => (
            <Grid item xs={6} sm={4} md={3} key={id}>
              <Box
                component={motion.div}
                whileHover={{ y: -6, scale: 1.02 }}
                transition={{ duration: 0.2 }}
              >
                <Box
                  component={Link}
                  to={`/events?category=${encodeURIComponent(id)}`}
                  sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    p: 3,
                    borderRadius: 3,
                    textDecoration: 'none',
                    color: 'white',
                    background: categoryGradients[index % categoryGradients.length],
                    boxShadow: '0 8px 24px rgba(79, 70, 229, 0.2)',
                    minHeight: 120,
                    transition: 'box-shadow 0.25s ease',
                    '&:hover': { boxShadow: '0 12px 32px rgba(79, 70, 229, 0.35)' },
                  }}
                >
                  <Typography sx={{ fontSize: '2rem', mb: 1 }}>{icon}</Typography>
                  <Typography variant="subtitle2" sx={{ fontWeight: 700 }}>
                    {label}
                  </Typography>
                </Box>
              </Box>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
};
