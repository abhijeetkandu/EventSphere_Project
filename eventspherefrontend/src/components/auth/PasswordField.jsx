import { useState } from 'react';
import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';
import IconButton from '@mui/material/IconButton';
import { Eye, EyeOff } from 'lucide-react';

export const PasswordField = ({
  label = 'Password',
  value,
  onChange,
  onBlur,
  error,
  helperText,
  placeholder = 'Enter your password',
  autoComplete = 'current-password',
  ...props
}) => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <TextField
      fullWidth
      label={label}
      type={showPassword ? 'text' : 'password'}
      value={value}
      onChange={onChange}
      onBlur={onBlur}
      error={Boolean(error)}
      helperText={error || helperText}
      placeholder={placeholder}
      autoComplete={autoComplete}
      InputProps={{
        endAdornment: (
          <InputAdornment position="end">
            <IconButton
              onClick={() => setShowPassword((prev) => !prev)}
              edge="end"
              size="small"
              aria-label={showPassword ? 'Hide password' : 'Show password'}
            >
              {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
            </IconButton>
          </InputAdornment>
        ),
      }}
      {...props}
    />
  );
};
