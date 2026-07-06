import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import { motion } from 'framer-motion';
import { LANDING_STATS } from '../../utils/constants';

export const StatsSection = () => (
  <Box sx={{ py: { xs: 6, md: 8 }, bgcolor: 'background.paper', borderTop: 1, borderBottom: 1, borderColor: 'divider' }}>
    <Container maxWidth="lg">
      <Grid container spacing={3}>
        {LANDING_STATS.map(({ label, value, suffix }, index) => (
          <Grid item xs={6} md={3} key={label}>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Box sx={{ textAlign: 'center', p: 2 }}>
                <Typography
                  variant="h3"
                  sx={{
                    fontWeight: 800,
                    letterSpacing: '-0.03em',
                    background: (theme) =>
                      `linear-gradient(135deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                  }}
                >
                  {value}{suffix}
                </Typography>
                <Typography variant="body2" color="text.secondary" sx={{ mt: 0.5, fontWeight: 500 }}>
                  {label}
                </Typography>
              </Box>
            </motion.div>
          </Grid>
        ))}
      </Grid>
    </Container>
  </Box>
);
