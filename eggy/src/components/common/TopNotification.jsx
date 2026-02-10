import { Box, Typography, IconButton } from '@mui/material';
import { Close } from '@mui/icons-material';
import { motion, AnimatePresence } from 'framer-motion';
import { useTimerContext } from '../../context/TimerContext';

/**
 * Top Notification Component
 * Shows a notification when the egg is done cooking
 * Appears on all pages with smooth slide-down animation
 */
const TopNotification = () => {
  const { showNotification, dismissNotification, currentEggName } = useTimerContext();

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
            maxWidth: 400,
          }}
        >
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              gap: 2,
              p: 2,
              px: 2.5,
              borderRadius: 4,
              background: 'linear-gradient(135deg, #34C759 0%, #28A745 100%)',
              boxShadow: '0 8px 32px rgba(52, 199, 89, 0.35)',
              color: 'white',
            }}
          >
            {/* Icon */}
            <Box
              sx={{
                width: 44,
                height: 44,
                borderRadius: '50%',
                bgcolor: 'rgba(255, 255, 255, 0.2)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '1.5rem',
                flexShrink: 0,
              }}
            >
              🥚
            </Box>

            {/* Text */}
            <Box sx={{ flex: 1 }}>
              <Typography
                variant="body1"
                sx={{ fontWeight: 700, lineHeight: 1.2 }}
              >
                Your egg is ready!
              </Typography>
              <Typography
                variant="caption"
                sx={{ opacity: 0.9 }}
              >
                {currentEggName} - perfectly cooked
              </Typography>
            </Box>

            {/* Close button */}
            <IconButton
              size="small"
              onClick={dismissNotification}
              sx={{
                color: 'white',
                bgcolor: 'rgba(255, 255, 255, 0.15)',
                '&:hover': {
                  bgcolor: 'rgba(255, 255, 255, 0.25)',
                },
              }}
            >
              <Close fontSize="small" />
            </IconButton>
          </Box>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default TopNotification;
