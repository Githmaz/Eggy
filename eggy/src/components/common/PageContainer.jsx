import { Box, Container } from '@mui/material';
import { motion } from 'framer-motion';
import { useLocation } from 'react-router-dom';
import { useTimerContext } from '../../context/TimerContext';

/**
 * Page Container Component
 * Wraps page content with consistent padding and animation
 * Adjusts top padding when progress bar is visible
 *
 * @param {ReactNode} children - Page content
 * @param {boolean} fullHeight - Whether to use full viewport height
 * @param {boolean} centered - Whether to center content vertically
 * @param {boolean} withBottomNav - Whether to add bottom padding for nav
 */
const PageContainer = ({
  children,
  fullHeight = false,
  centered = false,
  withBottomNav = true,
}) => {
  const location = useLocation();
  const { isActive } = useTimerContext();

  // Add top padding when progress bar is visible (cooking active + not on timer page)
  const hasTopBar = isActive && location.pathname !== '/timer';

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.25 }}
      style={{ minHeight: fullHeight ? '100vh' : 'auto' }}
    >
      <Container maxWidth="sm">
        <Box
          sx={{
            minHeight: fullHeight ? '100vh' : 'auto',
            pt: hasTopBar ? { xs: 8, sm: 9 } : { xs: 3, sm: 4 },
            pb: withBottomNav ? { xs: 12, sm: 14 } : { xs: 3, sm: 4 },
            px: { xs: 0.5, sm: 0 },
            display: centered ? 'flex' : 'block',
            flexDirection: 'column',
            alignItems: centered ? 'center' : 'stretch',
            justifyContent: centered ? 'center' : 'flex-start',
            transition: 'padding-top 0.3s ease',
          }}
        >
          {children}
        </Box>
      </Container>
    </motion.div>
  );
};

export default PageContainer;
