import { Box, Typography, IconButton } from '@mui/material';
import { motion, AnimatePresence } from 'framer-motion';
import { useTimerContext } from '../../context/TimerContext';
import { useTheme } from '../../context/ThemeContext';

/**
 * TOP NOTIFICATION - THEMED
 *
 * Premium notification when egg is done.
 * Appears on all pages.
 */

const TopNotification = () => {
  const { showNotification, dismissNotification, currentEggName } = useTimerContext();
  const { tokens, isDark } = useTheme();

  return (
    <AnimatePresence>
      {showNotification && (
        <motion.div
          initial={{ y: -100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -100, opacity: 0 }}
          transition={{ type: 'spring', stiffness: 300, damping: 30 }}
          style={{
            position: 'fixed',
            top: 16,
            left: '50%',
            transform: 'translateX(-50%)',
            zIndex: 2000,
            width: '90%',
            maxWidth: 340,
          }}
        >
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              gap: 1.5,
              p: 2,
              bgcolor: isDark ? tokens.surface.elevated : tokens.surface.nav,
              borderRadius: 4,
              boxShadow: isDark
                ? `0 10px 40px rgba(0,0,0,0.4), 0 0 60px ${tokens.accent.glow}`
                : '0 10px 40px rgba(0,0,0,0.15)',
              backdropFilter: 'blur(20px)',
              border: `1px solid ${tokens.surface.navBorder}`,
            }}
          >
            <Box
              sx={{
                width: 36,
                height: 36,
                borderRadius: '50%',
                bgcolor: `${tokens.success}20`,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '1.1rem',
              }}
            >
              🥚
            </Box>

            <Box sx={{ flex: 1 }}>
              <Typography
                sx={{
                  fontSize: '0.875rem',
                  fontWeight: 600,
                  color: tokens.text.primary,
                }}
              >
                Your egg is ready!
              </Typography>
              <Typography
                sx={{
                  fontSize: '0.75rem',
                  color: tokens.text.secondary,
                }}
              >
                {currentEggName}
              </Typography>
            </Box>

            <IconButton
              size="small"
              onClick={dismissNotification}
              sx={{
                color: tokens.text.tertiary,
                '&:hover': { color: tokens.text.primary },
              }}
            >
              <span style={{ fontSize: '1.25rem' }}>×</span>
            </IconButton>
          </Box>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default TopNotification;
