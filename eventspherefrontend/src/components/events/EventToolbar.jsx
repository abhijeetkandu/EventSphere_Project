import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import Typography from '@mui/material/Typography';
import { Search, LayoutGrid, List } from 'lucide-react';
import { SORT_OPTIONS } from '../../utils/constants';

export const EventToolbar = ({
  search,
  onSearchChange,
  sort,
  onSortChange,
  view,
  onViewChange,
  totalElements,
}) => (
  <Box
    sx={{
      display: 'flex',
      flexDirection: { xs: 'column', md: 'row' },
      gap: 2,
      alignItems: { md: 'center' },
      mb: 3,
      p: 2,
      borderRadius: 3,
      border: 1,
      borderColor: 'divider',
      bgcolor: 'background.paper',
    }}
  >
    <TextField
      placeholder="Search events..."
      value={search}
      onChange={(e) => onSearchChange(e.target.value)}
      size="small"
      sx={{ flex: 1, minWidth: 200 }}
      InputProps={{
        startAdornment: (
          <InputAdornment position="start">
            <Search size={18} />
          </InputAdornment>
        ),
      }}
    />

    <Box sx={{ display: 'flex', gap: 2, alignItems: 'center', flexWrap: 'wrap' }}>
      <FormControl size="small" sx={{ minWidth: 180 }}>
        <Select value={sort} onChange={(e) => onSortChange(e.target.value)}>
          {SORT_OPTIONS.map(({ value, label }) => (
            <MenuItem key={value} value={value}>
              {label}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      <ToggleButtonGroup
        value={view}
        exclusive
        onChange={(_, val) => val && onViewChange(val)}
        size="small"
      >
        <ToggleButton value="grid" aria-label="grid view">
          <LayoutGrid size={18} />
        </ToggleButton>
        <ToggleButton value="list" aria-label="list view">
          <List size={18} />
        </ToggleButton>
      </ToggleButtonGroup>

      {totalElements > 0 && (
        <Typography variant="body2" color="text.secondary" sx={{ fontWeight: 500 }}>
          {totalElements} event{totalElements !== 1 ? 's' : ''}
        </Typography>
      )}
    </Box>
  </Box>
);
