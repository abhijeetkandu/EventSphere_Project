import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { Sparkles } from 'lucide-react';
import { Link } from 'react-router-dom';
import { APP_NAME } from '../../utils/constants';

export const Logo = ({ to = '/', size = 'medium', showText = true }) => {
  const iconSize = size === 'small' ? 20 : size === 'large' ? 32 : 24;
  const fontSize = size === 'small' ? '1rem' : size === 'large' ? '1.5rem' : '1.25rem';

  const content = (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        gap: 1,
        textDecoration: 'none',
        color: 'inherit',
      }}
    >
      <Box
        sx={{
          width: iconSize + 12,
          height: iconSize + 12,
          borderRadius: 2,
          background: (theme) =>
            `linear-gradient(135deg, ${theme.palette.primary.main} 0%, ${theme.palette.secondary.main} 100%)`,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: 'white',
          boxShadow: '0 4px 14px rgba(99, 91, 255, 0.3)',
        }}
      >
        <Sparkles size={iconSize} />
      </Box>
      {showText && (
        <Typography
          variant="h6"
          sx={{
            fontWeight: 700,
            fontSize,
            letterSpacing: '-0.03em',
            background: (theme) =>
              `linear-gradient(135deg, ${theme.palette.primary.main} 0%, ${theme.palette.secondary.main} 100%)`,
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
          }}
        >
          {APP_NAME}
        </Typography>
      )}
    </Box>
  );

  if (to) {
    return (
      <Link to={to} style={{ textDecoration: 'none', color: 'inherit' }}>
        {content}
      </Link>
    );
  }

  return content;
};
