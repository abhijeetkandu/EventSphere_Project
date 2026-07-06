import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Chip from '@mui/material/Chip';
import { Construction } from 'lucide-react';
import { PageHeader } from './PageHeader';

export const PlaceholderPage = ({ title, subtitle, phase = 'Coming in next step' }) => (
  <Box>
    <PageHeader title={title} subtitle={subtitle} />
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: 360,
        borderRadius: 3,
        border: 1,
        borderColor: 'divider',
        bgcolor: 'background.paper',
        p: 4,
        textAlign: 'center',
      }}
    >
      <Box
        sx={{
          width: 72,
          height: 72,
          borderRadius: 3,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          mb: 2,
          background: (theme) =>
            `linear-gradient(135deg, ${theme.palette.primary.main}15 0%, ${theme.palette.secondary.main}15 100%)`,
          color: 'primary.main',
        }}
      >
        <Construction size={32} />
      </Box>
      <Typography variant="h6" sx={{ fontWeight: 600, mb: 1 }}>
        Under Construction
      </Typography>
      <Typography variant="body2" color="text.secondary" sx={{ maxWidth: 400, mb: 2 }}>
        This page will be built in the next development phase with premium UI components.
      </Typography>
      <Chip label={phase} size="small" color="primary" variant="outlined" />
    </Box>
  </Box>
);
