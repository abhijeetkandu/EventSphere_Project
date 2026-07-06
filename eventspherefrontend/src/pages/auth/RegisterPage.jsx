import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Alert from '@mui/material/Alert';
import CircularProgress from '@mui/material/CircularProgress';
import { UserPlus, Mail, User } from 'lucide-react';
import toast from 'react-hot-toast';
import { AuthCard } from '../../components/auth/AuthCard';
import { PasswordField } from '../../components/auth/PasswordField';
import { PasswordStrength } from '../../components/auth/PasswordStrength';
import { useAuthForm } from '../../hooks/useAuthForm';
import { usePageTitle } from '../../hooks/usePageTitle';
import { useAuth } from '../../context/AuthContext';
import { authService } from '../../services/authService';
import { validateRegister } from '../../utils/validation';
import { getErrorMessage } from '../../utils/errorHandler';
import { ROUTES } from '../../utils/constants';

const RegisterPage = () => {
  usePageTitle('Create Account');

  const navigate = useNavigate();
  const { login } = useAuth();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [serverError, setServerError] = useState('');

  const { values, errors, touched, handleChange, handleBlur, validateForm } = useAuthForm(
    { name: '', email: '', password: '', confirmPassword: '' },
    validateRegister,
  );

  const handleSubmit = async (event) => {
    event.preventDefault();
    setServerError('');

    if (!validateForm()) return;

    setIsSubmitting(true);
    try {
      const { token, user } = await authService.register(values);

      if (token) {
        login(token, user);
        toast.success('Account created! Welcome to EventSphere.');
        navigate(ROUTES.DASHBOARD, { replace: true });
      } else {
        toast.success('Account created! Please sign in.');
        navigate(ROUTES.LOGIN, { replace: true });
      }
    } catch (error) {
      const message = getErrorMessage(error, 'Registration failed. Please try again.');
      setServerError(message);
      toast.error(message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <AuthCard
      title="Create your account"
      subtitle="Join EventSphere and start discovering unforgettable events."
      footer={
        <Typography variant="body2" color="text.secondary" textAlign="center">
          Already have an account?{' '}
          <Typography
            component={Link}
            to={ROUTES.LOGIN}
            variant="body2"
            sx={{
              color: 'primary.main',
              fontWeight: 600,
              textDecoration: 'none',
              '&:hover': { textDecoration: 'underline' },
            }}
          >
            Sign in
          </Typography>
        </Typography>
      }
    >
      {serverError && (
        <Alert severity="error" sx={{ mb: 2.5, borderRadius: 2 }}>
          {serverError}
        </Alert>
      )}

      <Box component="form" onSubmit={handleSubmit} noValidate>
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2.5 }}>
          <TextField
            fullWidth
            label="Full Name"
            value={values.name}
            onChange={handleChange('name')}
            onBlur={handleBlur('name')}
            error={touched.name && Boolean(errors.name)}
            helperText={touched.name && errors.name}
            placeholder="John Doe"
            autoComplete="name"
            InputProps={{
              startAdornment: (
                <User size={18} style={{ marginRight: 12, opacity: 0.5 }} />
              ),
            }}
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
            placeholder="you@example.com"
            autoComplete="email"
            InputProps={{
              startAdornment: (
                <Mail size={18} style={{ marginRight: 12, opacity: 0.5 }} />
              ),
            }}
          />

          <Box>
            <PasswordField
              label="Password"
              value={values.password}
              onChange={handleChange('password')}
              onBlur={handleBlur('password')}
              error={touched.password && errors.password}
              placeholder="Create a strong password"
              autoComplete="new-password"
            />
            <PasswordStrength password={values.password} />
          </Box>

          <PasswordField
            label="Confirm Password"
            value={values.confirmPassword}
            onChange={handleChange('confirmPassword')}
            onBlur={handleBlur('confirmPassword')}
            error={touched.confirmPassword && errors.confirmPassword}
            placeholder="Repeat your password"
            autoComplete="new-password"
          />

          <Button
            type="submit"
            variant="contained"
            size="large"
            disabled={isSubmitting}
            startIcon={
              isSubmitting ? (
                <CircularProgress size={18} color="inherit" />
              ) : (
                <UserPlus size={18} />
              )
            }
            sx={{ py: 1.5, mt: 0.5 }}
          >
            {isSubmitting ? 'Creating account...' : 'Create Account'}
          </Button>
        </Box>
      </Box>

      <Typography
        variant="caption"
        color="text.secondary"
        sx={{ display: 'block', mt: 2.5, textAlign: 'center', lineHeight: 1.6 }}
      >
        By creating an account, you agree to our Terms of Service and Privacy Policy.
      </Typography>
    </AuthCard>
  );
};

export default RegisterPage;
