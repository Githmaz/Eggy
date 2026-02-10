import { Box, Typography, LinearProgress } from '@mui/material';
import { motion, AnimatePresence } from 'framer-motion';
import { useLocation, useNavigate } from 'react-router-dom';
import { useTimerContext } from '../../context/TimerContext';
import { formatTime } from '../../utils/constants';

/**
 * Top Progress Bar Component
 * Shows cooking progress when user is on other pages (History, Benefits)
 * Displays remaining time and progress indicator
 * Tap to return to timer
 */
const TopProgressBar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { isActive, isRunning, timeRemaining, progress, currentEggName } = useTimerContext();

  // Only show when cooking is active and NOT on timer page
  const shouldShow = isActive && location.pathname !== '/timer';

  return (
    <AnimatePresence>
      {shouldShow && (
        <motion.div
          initial={{ y: -60, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -60, opacity: 0 }}
          transition={{ type: 'spring', stiffness: 300, damping: 30 }}
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            zIndex: 1500,
          }}
        >
          <Box
            onClick={() => navigate('/timer')}
            sx={{
              cursor: 'pointer',
              background: 'rgba(255, 255, 255, 0.95)',
              backdropFilter: 'blur(20px)',
              borderBottom: '1px solid rgba(0, 0, 0, 0.06)',
              transition: 'all 0.2s ease',
              '&:hover': {
                background: 'rgba(255, 255, 255, 1)',
              },
            }}
          >
            {/* Progress bar */}
            <LinearProgress
              variant="determinate"
              value={progress * 100}
              sx={{
                height: 3,
                bgcolor: 'rgba(255, 149, 0, 0.15)',
                '& .MuiLinearProgress-bar': {
                  bgcolor: 'primary.main',
                  transition: 'transform 0.5s ease',
                },
              }}
            />

            {/* Content */}
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                px: 2,
                py: 1.5,
              }}
            >
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                {/* Pulsing indicator */}
                <Box
                  sx={{
                    position: 'relative',
                    width: 10,
                    height: 10,
                  }}
                >
                  <Box
                    sx={{
                      position: 'absolute',
                      width: '100%',
                      height: '100%',
                      borderRadius: '50%',
                      bgcolor: isRunning ? 'primary.main' : 'warning.main',
                    }}
                  />
                  {isRunning && (
                    <motion.div
                      animate={{ scale: [1, 1.8, 1], opacity: [0.6, 0, 0.6] }}
                      transition={{ duration: 1.5, repeat: Infinity }}
                      style={{
                        position: 'absolute',
                        width: '100%',
                        height: '100%',
                        borderRadius: '50%',
                        backgroundColor: '#FF9500',
                      }}
                    />
                  )}
                </Box>

                <Typography variant="body2" sx={{ fontWeight: 600, color: 'text.primary' }}>
                  {isRunning ? 'Cooking' : 'Paused'}: {currentEggName}
                </Typography>
              </Box>

              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <Typography
                  variant="body2"
                  sx={{
                    fontWeight: 700,
                    fontFamily: 'SF Mono, Monaco, Consolas, monospace',
                    color: 'primary.main',
                  }}
                >
                  {formatTime(timeRemaining)}
                </Typography>

                <Typography variant="caption" color="text.secondary">
                  Tap to view
                </Typography>
              </Box>
            </Box>
          </Box>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default TopProgressBar;
