import { useState } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Avatar from '@mui/material/Avatar';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Chip from '@mui/material/Chip';
import { User, Lock } from 'lucide-react';
import { PageHeader } from '../../components/common/PageHeader';
import { ProfileForm } from '../../components/profile/ProfileForm';
import { ChangePasswordForm } from '../../components/profile/ChangePasswordForm';
import { useAuth } from '../../context/AuthContext';
import { usePageTitle } from '../../hooks/usePageTitle';

const ProfilePage = () => {
  usePageTitle('Profile');
  const { user } = useAuth();
  const [tab, setTab] = useState(0);

  return (
    <Box>
      <PageHeader title="Profile" subtitle="Manage your account information and security" />

      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          gap: 3,
          p: 3,
          mb: 3,
          borderRadius: 4,
          border: 1,
          borderColor: 'divider',
          bgcolor: 'background.paper',
          flexDirection: { xs: 'column', sm: 'row' },
          textAlign: { xs: 'center', sm: 'left' },
        }}
      >
        <Avatar
          sx={{
            width: 80,
            height: 80,
            fontSize: '1.75rem',
            fontWeight: 700,
            background: (theme) =>
              `linear-gradient(135deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
          }}
        >
          {user?.name?.charAt(0)?.toUpperCase() || 'U'}
        </Avatar>
        <Box>
          <Typography variant="h5" sx={{ fontWeight: 700, letterSpacing: '-0.02em' }}>
            {user?.name || 'User'}
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
            {user?.email}
          </Typography>
          <Chip
            label={user?.role || 'USER'}
            size="small"
            color="primary"
            sx={{ fontWeight: 600 }}
          />
        </Box>
      </Box>

      <Box
        sx={{
          borderRadius: 4,
          border: 1,
          borderColor: 'divider',
          bgcolor: 'background.paper',
          overflow: 'hidden',
        }}
      >
        <Tabs
          value={tab}
          onChange={(_, v) => setTab(v)}
          sx={{
            px: 2,
            borderBottom: 1,
            borderColor: 'divider',
            '& .MuiTab-root': { fontWeight: 600, textTransform: 'none', minHeight: 56 },
          }}
        >
          <Tab icon={<User size={18} />} iconPosition="start" label="Edit Profile" />
          <Tab icon={<Lock size={18} />} iconPosition="start" label="Change Password" />
        </Tabs>

        <Box sx={{ p: { xs: 2.5, md: 3.5 } }}>
          {tab === 0 ? <ProfileForm /> : <ChangePasswordForm />}
        </Box>
      </Box>
    </Box>
  );
};

export default ProfilePage;
