import Box from '@mui/material/Box';
import { HeroSection } from '../../components/landing/HeroSection';
import { StatsSection } from '../../components/landing/StatsSection';
import { FeaturedEventsSection } from '../../components/landing/FeaturedEventsSection';
import { CategoriesSection } from '../../components/landing/CategoriesSection';
import { TestimonialsSection } from '../../components/landing/TestimonialsSection';
import { CTASection } from '../../components/landing/CTASection';
import { usePageTitle } from '../../hooks/usePageTitle';

const LandingPage = () => {
  usePageTitle('Discover Events');

  return (
    <Box>
      <HeroSection />
      <StatsSection />
      <FeaturedEventsSection />
      <CategoriesSection />
      <TestimonialsSection />
      <CTASection />
    </Box>
  );
};

export default LandingPage;
