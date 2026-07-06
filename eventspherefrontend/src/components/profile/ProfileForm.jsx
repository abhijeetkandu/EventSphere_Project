import { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Alert from '@mui/material/Alert';
import CircularProgress from '@mui/material/CircularProgress';
import { Save, User, Mail } from 'lucide-react';
import toast from 'react-hot-toast';
import { useAuthForm } from '../../hooks/useAuthForm';
import { useAuth } from '../../context/AuthContext';
import { userService } from '../../services/userService';
import { validateProfile } from '../../utils/validation';
import { getErrorMessage } from '../../utils/errorHandler';

export const ProfileForm = () => {
  const { user, updateUser } = useAuth();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [serverError, setServerError] = useState('');
  const [success, setSuccess] = useState(false);

  const { values, errors, touched, handleChange, handleBlur, validateForm, setValues } = useAuthForm(
    { name: '', email: '' },
    validateProfile,
  );

  useEffect(() => {
    if (user) {
      setValues({
        name: user.name || '',
        email: user.email || '',
      });
    }
  }, [user, setValues]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setServerError('');
    setSuccess(false);

    if (!validateForm()) return;

    setIsSubmitting(true);
    try {
      const updatedUser = await userService.updateProfile(values);
      updateUser({ ...user, ...updatedUser });
      setSuccess(true);
      toast.success('Profile updated successfully');
    } catch (error) {
      const message = getErrorMessage(error, 'Failed to update profile');
      setServerError(message);
      toast.error(message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Box component="form" onSubmit={handleSubmit} noValidate>
      {serverError && (
        <Alert severity="error" sx={{ mb: 2.5, borderRadius: 2 }}>
          {serverError}
        </Alert>
      )}
      {success && (
        <Alert severity="success" sx={{ mb: 2.5, borderRadius: 2 }}>
          Your profile has been updated.
        </Alert>
      )}

      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2.5 }}>
        <TextField
          fullWidth
          label="Full Name"
          value={values.name}
          onChange={handleChange('name')}
          onBlur={handleBlur('name')}
          error={touched.name && Boolean(errors.name)}
          helperText={touched.name && errors.name}
          InputProps={{ startAdornment: <User size={18} style={{ marginRight: 12, opacity: 0.5 }} /> }}
        />

        <TextField
          fullWidth
          label="Email Address"
          type="email"
          value={values.email}
          onChange={handleChange('email')}
          onBlur={handleBlur('email')}
          error={touched.email && Boolean(errors.email)}
          helperText={touched.email && errors.email}
          InputProps={{ startAdornment: <Mail size={18} style={{ marginRight: 12, opacity: 0.5 }} /> }}
        />

        <Button
          type="submit"
          variant="contained"
          disabled={isSubmitting}
          startIcon={isSubmitting ? <CircularProgress size={18} color="inherit" /> : <Save size={18} />}
          sx={{ alignSelf: { xs: 'stretch', sm: 'flex-start' }, px: 4 }}
        >
          {isSubmitting ? 'Saving...' : 'Save Changes'}
        </Button>
      </Box>
    </Box>
  );
};
