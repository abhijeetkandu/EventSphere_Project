import { useState } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Switch from '@mui/material/Switch';
import Divider from '@mui/material/Divider';
import Button from '@mui/material/Button';
import { Bell, Moon, Sun, Monitor, Shield, Trash2 } from 'lucide-react';
import toast from 'react-hot-toast';
import { PageHeader } from '../../components/common/PageHeader';
import { useThemeMode } from '../../context/ThemeContext';
import { getSettings, saveSettings } from '../../utils/settings';
import { usePageTitle } from '../../hooks/usePageTitle';

const SettingsSection = ({ title, description, children }) => (
  <Box sx={{ mb: 4 }}>
    <Typography variant="h6" sx={{ fontWeight: 700, mb: 0.5 }}>
      {title}
    </Typography>
    {description && (
      <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
        {description}
      </Typography>
    )}
    {children}
  </Box>
);

const SettingRow = ({ icon: Icon, label, description, action }) => (
  <Box
    sx={{
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      py: 2,
      gap: 2,
    }}
  >
    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, flex: 1 }}>
      {Icon && (
        <Box
          sx={{
            width: 40,
            height: 40,
            borderRadius: 2,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            bgcolor: 'action.hover',
            color: 'primary.main',
            flexShrink: 0,
          }}
        >
          <Icon size={18} />
        </Box>
      )}
      <Box>
        <Typography variant="subtitle2" sx={{ fontWeight: 600 }}>
          {label}
        </Typography>
        {description && (
          <Typography variant="caption" color="text.secondary">
            {description}
          </Typography>
        )}
      </Box>
    </Box>
    {action}
  </Box>
);

const SettingsPage = () => {
  usePageTitle('Settings');

  const { mode, setMode, isDark } = useThemeMode();
  const [notifications, setNotifications] = useState(() => getSettings());

  const handleNotificationChange = (key) => (event) => {
    const updated = saveSettings({ [key]: event.target.checked });
    setNotifications(updated);
    toast.success('Settings saved');
  };

  return (
    <Box>
      <PageHeader title="Settings" subtitle="Customize your EventSphere experience" />

      <Box
        sx={{
          borderRadius: 4,
          border: 1,
          borderColor: 'divider',
          bgcolor: 'background.paper',
          p: { xs: 2.5, md: 3.5 },
        }}
      >
        <SettingsSection title="Appearance" description="Customize how EventSphere looks on your device">
          <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
            {[
              { value: 'light', label: 'Light', icon: Sun },
              { value: 'dark', label: 'Dark', icon: Moon },
            ].map(({ value, label, icon: Icon }) => (
              <Button
                key={value}
                variant={mode === value ? 'contained' : 'outlined'}
                onClick={() => {
                  setMode(value);
                  toast.success(`Switched to ${label} mode`);
                }}
                startIcon={<Icon size={18} />}
                sx={{ borderRadius: 2, px: 3 }}
              >
                {label}
              </Button>
            ))}
          </Box>
          <Typography variant="caption" color="text.secondary" sx={{ display: 'flex', alignItems: 'center', gap: 0.5, mt: 1.5 }}>
            <Monitor size={14} /> Currently using {isDark ? 'dark' : 'light'} mode
          </Typography>
        </SettingsSection>

        <Divider sx={{ my: 1 }} />

        <SettingsSection
          title="Notifications"
          description="Choose what updates you want to receive"
        >
          <SettingRow
            icon={Bell}
            label="Email Notifications"
            description="Receive booking confirmations via email"
            action={
              <Switch
                checked={notifications.emailNotifications}
                onChange={handleNotificationChange('emailNotifications')}
              />
            }
          />
          <SettingRow
            label="Booking Reminders"
            description="Get reminded before your upcoming events"
            action={
              <Switch
                checked={notifications.bookingReminders}
                onChange={handleNotificationChange('bookingReminders')}
              />
            }
          />
          <SettingRow
            label="Event Updates"
            description="Notifications when events you saved are updated"
            action={
              <Switch
                checked={notifications.eventUpdates}
                onChange={handleNotificationChange('eventUpdates')}
              />
            }
          />
          <SettingRow
            label="Marketing Emails"
            description="Receive news about new features and events"
            action={
              <Switch
                checked={notifications.marketingEmails}
                onChange={handleNotificationChange('marketingEmails')}
              />
            }
          />
        </SettingsSection>

        <Divider sx={{ my: 1 }} />

        <SettingsSection title="Privacy & Security">
          <SettingRow
            icon={Shield}
            label="Two-Factor Authentication"
            description="Add an extra layer of security (coming soon)"
            action={
              <Button variant="outlined" size="small" disabled>
                Enable
              </Button>
            }
          />
        </SettingsSection>

        <Divider sx={{ my: 1 }} />

        <SettingsSection title="Danger Zone">
          <Box
            sx={{
              p: 2.5,
              borderRadius: 3,
              border: 1,
              borderColor: 'error.main',
              borderOpacity: 0.3,
              bgcolor: (theme) => (theme.palette.mode === 'light' ? 'error.main' + '08' : 'error.main' + '15'),
            }}
          >
            <SettingRow
              icon={Trash2}
              label="Delete Account"
              description="Permanently delete your account and all data"
              action={
                <Button
                  variant="outlined"
                  color="error"
                  size="small"
                  onClick={() => toast.error('Account deletion is not available yet')}
                >
                  Delete Account
                </Button>
              }
            />
          </Box>
        </SettingsSection>
      </Box>
    </Box>
  );
};

export default SettingsPage;
