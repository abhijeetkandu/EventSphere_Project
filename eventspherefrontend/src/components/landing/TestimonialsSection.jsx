import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Avatar from '@mui/material/Avatar';
import Rating from '@mui/material/Rating';
import { motion } from 'framer-motion';
import { Quote } from 'lucide-react';
import { TESTIMONIALS } from '../../utils/constants';

export const TestimonialsSection = () => (
  <Box sx={{ py: { xs: 8, md: 10 } }}>
    <Container maxWidth="lg">
      <Box sx={{ textAlign: 'center', mb: 5 }}>
        <Typography variant="overline" color="primary" sx={{ fontWeight: 700, letterSpacing: 1.5 }}>
          Testimonials
        </Typography>
        <Typography variant="h4" sx={{ fontWeight: 700, letterSpacing: '-0.03em', mt: 0.5 }}>
          Loved by event-goers
        </Typography>
        <Typography variant="body1" color="text.secondary" sx={{ mt: 1 }}>
          See what our community has to say about EventSphere
        </Typography>
      </Box>

      <Grid container spacing={3}>
        {TESTIMONIALS.map((item, index) => (
          <Grid item xs={12} md={4} key={item.id}>
            <Box
              component={motion.div}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              sx={{
                p: 3,
                height: '100%',
                borderRadius: 3,
                border: 1,
                borderColor: 'divider',
                bgcolor: 'background.paper',
                display: 'flex',
                flexDirection: 'column',
                transition: 'all 0.25s ease',
                '&:hover': { boxShadow: 4, transform: 'translateY(-4px)' },
              }}
            >
              <Quote size={28} color="var(--mui-palette-primary-main)" style={{ opacity: 0.5, marginBottom: 16 }} />
              <Typography variant="body1" sx={{ flex: 1, lineHeight: 1.7, mb: 3, fontStyle: 'italic' }}>
                &ldquo;{item.quote}&rdquo;
              </Typography>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                <Avatar
                  sx={{
                    bgcolor: 'primary.main',
                    fontWeight: 700,
                    width: 44,
                    height: 44,
                  }}
                >
                  {item.avatar}
                </Avatar>
                <Box>
                  <Typography variant="subtitle2" sx={{ fontWeight: 700 }}>
                    {item.name}
                  </Typography>
                  <Typography variant="caption" color="text.secondary">
                    {item.role}
                  </Typography>
                  <Rating value={item.rating} readOnly size="small" sx={{ mt: 0.5 }} />
                </Box>
              </Box>
            </Box>
          </Grid>
        ))}
      </Grid>
    </Container>
  </Box>
);
