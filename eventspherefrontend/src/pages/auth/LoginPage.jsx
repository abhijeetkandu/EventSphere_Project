import { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Alert from '@mui/material/Alert';
import CircularProgress from '@mui/material/CircularProgress';
import { motion } from 'framer-motion';
import { LogIn, Mail, ArrowRight } from 'lucide-react';
import toast from 'react-hot-toast';
import { AuthCard } from '../../components/auth/AuthCard';
import { PasswordField } from '../../components/auth/PasswordField';
import { useAuthForm } from '../../hooks/useAuthForm';
import { usePageTitle } from '../../hooks/usePageTitle';
import { useAuth } from '../../context/AuthContext';
import { authService } from '../../services/authService';
import { validateLogin } from '../../utils/validation';
import { getErrorMessage } from '../../utils/errorHandler';
import { ROUTES } from '../../utils/constants';

const LoginPage = () => {
  usePageTitle('Sign In');

  const navigate = useNavigate();
  const location = useLocation();
  const { login } = useAuth();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [serverError, setServerError] = useState('');

  const { values, errors, touched, handleChange, handleBlur, validateForm } = useAuthForm(
    { email: '', password: '' },
    validateLogin,
  );

  const handleSubmit = async (event) => {
    event.preventDefault();
    setServerError('');

    if (!validateForm()) return;

    setIsSubmitting(true);
    try {
      const { token, user } = await authService.login(values);
      login(token, user);
      toast.success(`Welcome back, ${user.name}!`);

      const redirectTo =
        location.state?.from?.pathname ||
        (user.role === 'ADMIN' ? ROUTES.ADMIN : ROUTES.DASHBOARD);

      navigate(redirectTo, { replace: true });
    } catch (error) {
      const message = getErrorMessage(error, 'Invalid email or password.');
      setServerError(message);
      toast.error(message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <AuthCard
      title="Welcome back"
      subtitle="Sign in to manage your events, tickets, and bookings."
      footer={
        <Typography variant="body2" color="text.secondary" textAlign="center">
          Don&apos;t have an account?{' '}
          <Typography
            component={Link}
            to={ROUTES.REGISTER}
            variant="body2"
            sx={{
              color: 'primary.main',
              fontWeight: 600,
              textDecoration: 'none',
              '&:hover': { textDecoration: 'underline' },
            }}
          >
            Create one free
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
            label="Email or Username"
            type="text"
            value={values.email}
            onChange={handleChange('email')}
            onBlur={handleBlur('email')}
            error={touched.email && Boolean(errors.email)}
            helperText={touched.email && errors.email}
            placeholder="you@example.com"
            autoComplete="username"
            InputProps={{
              startAdornment: (
                <Mail size={18} style={{ marginRight: 12, opacity: 0.5 }} />
              ),
            }}
          />

          <Box>
            <PasswordField
              value={values.password}
              onChange={handleChange('password')}
              onBlur={handleBlur('password')}
              error={touched.password && errors.password}
              autoComplete="current-password"
            />
            <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 1 }}>
              <Typography
                component={Link}
                to={ROUTES.FORGOT_PASSWORD}
                variant="caption"
                sx={{
                  color: 'primary.main',
                  fontWeight: 600,
                  textDecoration: 'none',
                  '&:hover': { textDecoration: 'underline' },
                }}
              >
                Forgot password?
              </Typography>
            </Box>
          </Box>

          <Button
            type="submit"
            variant="contained"
            size="large"
            disabled={isSubmitting}
            startIcon={
              isSubmitting ? (
                <CircularProgress size={18} color="inherit" />
              ) : (
                <LogIn size={18} />
              )
            }
            sx={{ py: 1.5, mt: 0.5 }}
          >
            {isSubmitting ? 'Signing in...' : 'Sign In'}
          </Button>
        </Box>
      </Box>

      <Box
        component={motion.div}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
        sx={{
          mt: 3,
          p: 2,
          borderRadius: 2,
          bgcolor: (theme) =>
            theme.palette.mode === 'light'
              ? 'primary.main' + '08'
              : 'primary.main' + '15',
          border: 1,
          borderColor: 'primary.main',
          borderOpacity: 0.15,
        }}
      >
        <Typography variant="caption" color="text.secondary" sx={{ display: 'block', mb: 0.5 }}>
          New to EventSphere?
        </Typography>
        <Typography
          component={Link}
          to={ROUTES.REGISTER}
          variant="body2"
          sx={{
            color: 'primary.main',
            fontWeight: 600,
            textDecoration: 'none',
            display: 'inline-flex',
            alignItems: 'center',
            gap: 0.5,
            '&:hover': { gap: 1 },
            transition: 'gap 0.2s ease',
          }}
        >
          Start exploring events <ArrowRight size={14} />
        </Typography>
      </Box>
    </AuthCard>
  );
};

export default LoginPage;
