import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import IconButton from '@mui/material/IconButton';
import { Link } from 'react-router-dom';
import { Globe, Mail, Share2, Heart } from 'lucide-react';
import { Logo } from './Logo';
import { APP_NAME, APP_TAGLINE, ROUTES } from '../../utils/constants';

const footerLinks = {
  Product: [
    { label: 'Browse Events', to: ROUTES.EVENTS },
    { label: 'Create Account', to: ROUTES.REGISTER },
    { label: 'Dashboard', to: ROUTES.DASHBOARD },
  ],
  Company: [
    { label: 'About', to: ROUTES.HOME },
    { label: 'Contact', to: ROUTES.HOME },
    { label: 'Careers', to: ROUTES.HOME },
  ],
  Legal: [
    { label: 'Privacy Policy', to: ROUTES.HOME },
    { label: 'Terms of Service', to: ROUTES.HOME },
  ],
};

export const Footer = () => (
  <Box
    component="footer"
    sx={{
      mt: 'auto',
      borderTop: 1,
      borderColor: 'divider',
      bgcolor: 'background.paper',
      pt: 8,
      pb: 4,
    }}
  >
    <Container maxWidth="lg">
      <Grid container spacing={4}>
        <Grid item xs={12} md={4}>
          <Logo size="small" />
          <Typography variant="body2" color="text.secondary" sx={{ mt: 2, mb: 2, maxWidth: 280, lineHeight: 1.7 }}>
            {APP_TAGLINE} The modern platform for discovering and booking world-class events.
          </Typography>
          <Box sx={{ display: 'flex', gap: 1 }}>
            {[Globe, Mail, Share2, Heart].map((Icon, i) => (
              <IconButton
                key={i}
                size="small"
                sx={{
                  border: 1,
                  borderColor: 'divider',
                  '&:hover': { bgcolor: 'primary.main', color: 'white', borderColor: 'primary.main' },
                }}
              >
                <Icon size={16} />
              </IconButton>
            ))}
          </Box>
        </Grid>

        {Object.entries(footerLinks).map(([title, links]) => (
          <Grid item xs={6} sm={4} md={2} key={title}>
            <Typography variant="subtitle2" sx={{ fontWeight: 700, mb: 2 }}>
              {title}
            </Typography>
            {links.map(({ label, to }) => (
              <Typography
                key={label}
                component={Link}
                to={to}
                variant="body2"
                color="text.secondary"
                sx={{
                  display: 'block',
                  mb: 1,
                  textDecoration: 'none',
                  '&:hover': { color: 'primary.main' },
                  transition: 'color 0.2s',
                }}
              >
                {label}
              </Typography>
            ))}
          </Grid>
        ))}
      </Grid>

      <Box
        sx={{
          mt: 6,
          pt: 3,
          borderTop: 1,
          borderColor: 'divider',
          display: 'flex',
          flexDirection: { xs: 'column', sm: 'row' },
          justifyContent: 'space-between',
          alignItems: 'center',
          gap: 1,
        }}
      >
        <Typography variant="caption" color="text.secondary">
          © {new Date().getFullYear()} {APP_NAME}. All rights reserved.
        </Typography>
        <Typography variant="caption" color="text.secondary">
          Crafted with precision for unforgettable experiences.
        </Typography>
      </Box>
    </Container>
  </Box>
);
