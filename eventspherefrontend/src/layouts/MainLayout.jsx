import { Outlet } from 'react-router-dom';
import Box from '@mui/material/Box';
import { Navbar } from '../components/common/Navbar';
import { Footer } from '../components/common/Footer';
import { PageTransition } from '../components/common/PageTransition';

export const MainLayout = () => (
  <Box sx={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
    <Navbar />

    <Box component="main" sx={{ flex: 1 }}>
      <PageTransition>
        <Outlet />
      </PageTransition>
    </Box>

    <Footer />
  </Box>
);
