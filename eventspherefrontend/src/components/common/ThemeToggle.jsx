import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import { Moon, Sun } from 'lucide-react';
import { useThemeMode } from '../../context/ThemeContext';

export const ThemeToggle = ({ size = 'medium' }) => {
  const { isDark, toggleTheme } = useThemeMode();

  return (
    <Tooltip title={isDark ? 'Light mode' : 'Dark mode'}>
      <IconButton
        onClick={toggleTheme}
        size={size}
        sx={{
          border: 1,
          borderColor: 'divider',
          transition: 'all 0.2s ease',
          '&:hover': {
            transform: 'rotate(12deg)',
          },
        }}
      >
        {isDark ? <Sun size={18} /> : <Moon size={18} />}
      </IconButton>
    </Tooltip>
  );
};
