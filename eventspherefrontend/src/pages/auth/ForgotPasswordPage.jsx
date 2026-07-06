import { useState } from 'react';
import { Link } from 'react-router-dom';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Alert from '@mui/material/Alert';
import CircularProgress from '@mui/material/CircularProgress';
import { motion } from 'framer-motion';
import { Mail, ArrowLeft, Send, CheckCircle2 } from 'lucide-react';
import toast from 'react-hot-toast';
import { AuthCard } from '../../components/auth/AuthCard';
import { useAuthForm } from '../../hooks/useAuthForm';
import { usePageTitle } from '../../hooks/usePageTitle';
import { authService } from '../../services/authService';
import { validateForgotPassword } from '../../utils/validation';
import { getErrorMessage } from '../../utils/errorHandler';
import { ROUTES } from '../../utils/constants';

const ForgotPasswordPage = () => {
  usePageTitle('Forgot Password');

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [serverError, setServerError] = useState('');

  const { values, errors, touched, handleChange, handleBlur, validateForm } = useAuthForm(
    { email: '' },
    validateForgotPassword,
  );

  const handleSubmit = async (event) => {
    event.preventDefault();
    setServerError('');

    if (!validateForm()) return;

    setIsSubmitting(true);
    try {
      await authService.forgotPassword(values.email);
      setIsSuccess(true);
      toast.success('Reset link sent! Check your inbox.');
    } catch (error) {
      const message = getErrorMessage(
        error,
        'Unable to send reset link. Please try again.',
      );
      setServerError(message);
      toast.error(message);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSuccess) {
    return (
      <AuthCard
        title="Check your email"
        subtitle="We've sent password reset instructions to your inbox."
      >
        <Box
          component={motion.div}
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          sx={{ textAlign: 'center', py: 2 }}
        >
          <Box
            sx={{
              width: 72,
              height: 72,
              borderRadius: '50%',
              mx: 'auto',
              mb: 3,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              bgcolor: 'success.main',
              color: 'white',
              boxShadow: '0 8px 24px rgba(34, 197, 94, 0.35)',
            }}
          >
            <CheckCircle2 size={36} />
          </Box>

          <Typography variant="body1" color="text.secondary" sx={{ mb: 1 }}>
            Sent to
          </Typography>
          <Typography variant="body1" fontWeight={600} sx={{ mb: 3 }}>
            {values.email}
          </Typography>

          <Typography variant="body2" color="text.secondary" sx={{ mb: 3, lineHeight: 1.7 }}>
            Didn&apos;t receive the email? Check your spam folder or try again with a different address.
          </Typography>

          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.5 }}>
            <Button
              variant="outlined"
              onClick={() => setIsSuccess(false)}
            >
              Try another email
            </Button>
            <Button
              component={Link}
              to={ROUTES.LOGIN}
              variant="contained"
              startIcon={<ArrowLeft size={18} />}
            >
              Back to Sign In
            </Button>
          </Box>
        </Box>
      </AuthCard>
    );
  }

  return (
    <AuthCard
      title="Forgot password?"
      subtitle="No worries. Enter your email and we'll send you reset instructions."
      footer={
        <Typography
          component={Link}
          to={ROUTES.LOGIN}
          variant="body2"
          sx={{
            color: 'text.secondary',
            textDecoration: 'none',
            display: 'inline-flex',
            alignItems: 'center',
            gap: 0.75,
            fontWeight: 500,
            '&:hover': { color: 'primary.main' },
            transition: 'color 0.2s ease',
          }}
        >
          <ArrowLeft size={16} /> Back to Sign In
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

          <Button
            type="submit"
            variant="contained"
            size="large"
            disabled={isSubmitting}
            startIcon={
              isSubmitting ? (
                <CircularProgress size={18} color="inherit" />
              ) : (
                <Send size={18} />
              )
            }
            sx={{ py: 1.5 }}
          >
            {isSubmitting ? 'Sending...' : 'Send Reset Link'}
          </Button>
        </Box>
      </Box>
    </AuthCard>
  );
};

export default ForgotPasswordPage;
