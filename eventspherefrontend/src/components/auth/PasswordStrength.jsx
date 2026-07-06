import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { getPasswordStrength } from '../../utils/validation';

export const PasswordStrength = ({ password }) => {
  if (!password) return null;

  const { score, label, color } = getPasswordStrength(password);

  return (
    <Box sx={{ mt: 1 }}>
      <Box sx={{ display: 'flex', gap: 0.5, mb: 0.5 }}>
        {[1, 2, 3, 4].map((level) => (
          <Box
            key={level}
            sx={{
              flex: 1,
              height: 4,
              borderRadius: 1,
              bgcolor: level <= score ? color : 'action.hover',
              transition: 'background-color 0.2s ease',
            }}
          />
        ))}
      </Box>
      <Typography variant="caption" sx={{ color, fontWeight: 500 }}>
        {label}
      </Typography>
    </Box>
  );
};
