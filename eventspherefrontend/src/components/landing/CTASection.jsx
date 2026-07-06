import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, Sparkles } from 'lucide-react';
import { ROUTES } from '../../utils/constants';

export const CTASection = () => (
  <Box sx={{ py: { xs: 8, md: 10 } }}>
    <Container maxWidth="lg">
      <Box
        component={motion.div}
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        sx={{
          p: { xs: 4, md: 6 },
          borderRadius: 4,
          textAlign: 'center',
          position: 'relative',
          overflow: 'hidden',
          background: (theme) =>
            `linear-gradient(135deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
          color: 'white',
        }}
      >
        <Box
          sx={{
            position: 'absolute',
            top: -50,
            right: -50,
            width: 200,
            height: 200,
            borderRadius: '50%',
            bgcolor: 'rgba(255,255,255,0.1)',
          }}
        />
        <Box
          sx={{
            position: 'absolute',
            bottom: -30,
            left: -30,
            width: 150,
            height: 150,
            borderRadius: '50%',
            bgcolor: 'rgba(255,255,255,0.08)',
          }}
        />

        <Box sx={{ position: 'relative' }}>
          <Sparkles size={32} style={{ marginBottom: 16, opacity: 0.9 }} />
          <Typography variant="h4" sx={{ fontWeight: 800, letterSpacing: '-0.03em', mb: 1.5 }}>
            Ready to experience something amazing?
          </Typography>
          <Typography variant="body1" sx={{ opacity: 0.9, mb: 4, maxWidth: 480, mx: 'auto', lineHeight: 1.7 }}>
            Join thousands of event enthusiasts. Create your free account and start booking today.
          </Typography>
          <Box sx={{ display: 'flex', gap: 2, justifyContent: 'center', flexWrap: 'wrap' }}>
            <Button
              component={Link}
              to={ROUTES.REGISTER}
              variant="contained"
              size="large"
              endIcon={<ArrowRight size={18} />}
              sx={{
                bgcolor: 'white',
                color: 'primary.main',
                px: 4,
                '&:hover': { bgcolor: 'rgba(255,255,255,0.92)' },
              }}
            >
              Get Started Free
            </Button>
            <Button
              component={Link}
              to={ROUTES.EVENTS}
              variant="outlined"
              size="large"
              sx={{
                borderColor: 'rgba(255,255,255,0.5)',
                color: 'white',
                px: 4,
                '&:hover': { borderColor: 'white', bgcolor: 'rgba(255,255,255,0.1)' },
              }}
            >
              Browse Events
            </Button>
          </Box>
        </Box>
      </Box>
    </Container>
  </Box>
);
