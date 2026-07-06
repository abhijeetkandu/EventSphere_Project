import { useState } from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Alert from '@mui/material/Alert';
import CircularProgress from '@mui/material/CircularProgress';
import { Lock, Shield } from 'lucide-react';
import toast from 'react-hot-toast';
import { PasswordField } from '../auth/PasswordField';
import { PasswordStrength } from '../auth/PasswordStrength';
import { useAuthForm } from '../../hooks/useAuthForm';
import { userService } from '../../services/userService';
import { validateChangePassword } from '../../utils/validation';
import { getErrorMessage } from '../../utils/errorHandler';

export const ChangePasswordForm = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [serverError, setServerError] = useState('');

  const { values, errors, touched, handleChange, handleBlur, validateForm, resetForm } = useAuthForm(
    { currentPassword: '', newPassword: '', confirmPassword: '' },
    validateChangePassword,
  );

  const handleSubmit = async (event) => {
    event.preventDefault();
    setServerError('');

    if (!validateForm()) return;

    setIsSubmitting(true);
    try {
      await userService.changePassword({
        currentPassword: values.currentPassword,
        newPassword: values.newPassword,
      });
      resetForm();
      toast.success('Password changed successfully');
    } catch (error) {
      const message = getErrorMessage(error, 'Failed to change password');
      setServerError(message);
      toast.error(message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Box component="form" onSubmit={handleSubmit} noValidate>
      <Alert severity="info" icon={<Shield size={20} />} sx={{ mb: 3, borderRadius: 2 }}>
        Use a strong password with at least 8 characters, including uppercase, lowercase, and numbers.
      </Alert>

      {serverError && (
        <Alert severity="error" sx={{ mb: 2.5, borderRadius: 2 }}>
          {serverError}
        </Alert>
      )}

      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2.5 }}>
        <PasswordField
          label="Current Password"
          value={values.currentPassword}
          onChange={handleChange('currentPassword')}
          onBlur={handleBlur('currentPassword')}
          error={touched.currentPassword && errors.currentPassword}
          autoComplete="current-password"
        />

        <Box>
          <PasswordField
            label="New Password"
            value={values.newPassword}
            onChange={handleChange('newPassword')}
            onBlur={handleBlur('newPassword')}
            error={touched.newPassword && errors.newPassword}
            autoComplete="new-password"
          />
          <PasswordStrength password={values.newPassword} />
        </Box>

        <PasswordField
          label="Confirm New Password"
          value={values.confirmPassword}
          onChange={handleChange('confirmPassword')}
          onBlur={handleBlur('confirmPassword')}
          error={touched.confirmPassword && errors.confirmPassword}
          autoComplete="new-password"
        />

        <Button
          type="submit"
          variant="contained"
          disabled={isSubmitting}
          startIcon={isSubmitting ? <CircularProgress size={18} color="inherit" /> : <Lock size={18} />}
          sx={{ alignSelf: 'flex-start', px: 4 }}
        >
          {isSubmitting ? 'Updating...' : 'Update Password'}
        </Button>
      </Box>
    </Box>
  );
};
