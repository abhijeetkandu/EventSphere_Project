import { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { CalendarDays } from 'lucide-react';
import { getEventPlaceholder } from '../../utils/placeholders';

export const EventImage = ({
  src,
  alt = 'Event',
  category,
  height = '100%',
  sx = {},
  showLabel = false,
}) => {
  const placeholder = getEventPlaceholder(category);
  const [imgSrc, setImgSrc] = useState(src || placeholder);
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    setImgSrc(src || placeholder);
    setHasError(false);
  }, [src, placeholder]);

  const handleError = () => {
    if (imgSrc !== placeholder) {
      setImgSrc(placeholder);
      setHasError(false);
      return;
    }
    setHasError(true);
  };

  if (hasError || (!src && !placeholder)) {
    return (
      <Box
        sx={{
          width: '100%',
          height,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          gap: 1,
          background: (theme) =>
            `linear-gradient(145deg, ${theme.palette.primary.main}18 0%, ${theme.palette.secondary.main}22 100%)`,
          borderBottom: 1,
          borderColor: 'divider',
          ...sx,
        }}
      >
        <CalendarDays size={32} strokeWidth={1.5} opacity={0.5} />
        {showLabel && (
          <Typography variant="caption" color="text.secondary" fontWeight={600}>
            {category || 'Event'}
          </Typography>
        )}
      </Box>
    );
  }

  return (
    <Box
      component="img"
      src={imgSrc}
      alt={alt}
      onError={handleError}
      loading="lazy"
      sx={{
        width: '100%',
        height,
        objectFit: 'cover',
        display: 'block',
        ...sx,
      }}
    />
  );
};
