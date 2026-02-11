import { Box, Typography, LinearProgress } from '@mui/material';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate, useLocation } from 'react-router-dom';
import { useTimerContext } from '../../context/TimerContext';
import { useTheme } from '../../context/ThemeContext';
import { formatTime } from '../../utils/constants';

/**
 * BOTTOM BAR - THEMED
 *
 * Glass effect navigation bar.
 * Light: White glass with subtle shadow
 * Dark: Dark glass with blue glow
 */

const NavItem = ({ icon, label, isActive, onClick, tokens }) => (
  <motion.button
    onClick={onClick}
    whileTap={{ scale: 0.95 }}
    style={{
      flex: 1,
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      gap: 4,
      padding: '12px 0',
      background: 'transparent',
      border: 'none',
      cursor: 'pointer',
    }}
  >
    <Box
      sx={{
        fontSize: '1.25rem',
        opacity: isActive ? 1 : 0.5,
        transition: 'opacity 0.2s',
      }}
    >
      {icon}
    </Box>
    <Typography
      sx={{
        fontSize: '0.625rem',
        fontWeight: isActive ? 600 : 500,
        color: isActive ? tokens.accent.primary : tokens.text.tertiary,
        letterSpacing: '0.03em',
        textTransform: 'uppercase',
        transition: 'color 0.2s',
      }}
    >
      {label}
    </Typography>
  </motion.button>
);

const BottomBar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { isActive, isRunning, progress, timeRemaining, currentEggName } = useTimerContext();
  const { tokens, isDark } = useTheme();

  const routes = [
    { path: '/timer', label: 'Cook', icon: '🥚' },
    { path: '/history', label: 'History', icon: '📋' },
    { path: '/benefits', label: 'Learn', icon: '💡' },
  ];

  // Hide on splash
  if (location.pathname === '/') return null;

  return (
    <motion.div
      initial={{ y: 100 }}
      animate={{ y: 0 }}
      transition={{ type: 'spring', stiffness: 300, damping: 30 }}
      style={{
        position: 'fixed',
        bottom: 0,
        left: 0,
        right: 0,
        zIndex: 1000,
      }}
    >
      <Box
        sx={{
          background: tokens.surface.nav,
          backdropFilter: 'blur(20px)',
          WebkitBackdropFilter: 'blur(20px)',
          borderRadius: '24px 24px 0 0',
          overflow: 'hidden',
          boxShadow: isDark
            ? `0 -4px 30px rgba(0,0,0,0.3), inset 0 1px 0 ${tokens.surface.navBorder}`
            : `0 -4px 30px rgba(0,0,0,0.08), inset 0 1px 0 ${tokens.surface.navBorder}`,
          borderTop: `1px solid ${tokens.surface.navBorder}`,
        }}
      >
        {/* Active cooking indicator */}
        <AnimatePresence>
          {isActive && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              <Box
                sx={{
                  px: 2,
                  pt: 1.5,
                  pb: 1,
                  borderBottom: `1px solid ${tokens.surface.navBorder}`,
                }}
              >
                <Box
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    mb: 0.75,
                  }}
                >
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    {/* Status dot */}
                    <Box sx={{ position: 'relative', width: 6, height: 6 }}>
                      <Box
                        sx={{
                          position: 'absolute',
                          inset: 0,
                          borderRadius: '50%',
                          bgcolor: isRunning ? tokens.success : '#F59E0B',
                        }}
                      />
                      {isRunning && (
                        <motion.div
                          animate={{ scale: [1, 2], opacity: [0.6, 0] }}
                          transition={{ duration: 1, repeat: Infinity }}
                          style={{
                            position: 'absolute',
                            inset: 0,
                            borderRadius: '50%',
                            backgroundColor: tokens.success,
                          }}
                        />
                      )}
                    </Box>

                    <Typography
                      sx={{
                        fontSize: '0.6875rem',
                        color: tokens.text.secondary,
                        fontWeight: 500,
                      }}
                    >
                      {isRunning ? 'Cooking' : 'Paused'} · {currentEggName}
                    </Typography>
                  </Box>

                  <Typography
                    sx={{
                      fontFamily: '"SF Mono", monospace',
                      fontSize: '0.75rem',
                      color: tokens.accent.primary,
                      fontWeight: 600,
                    }}
                  >
                    {formatTime(timeRemaining)}
                  </Typography>
                </Box>

                <LinearProgress
                  variant="determinate"
                  value={progress * 100}
                  sx={{
                    height: 3,
                    borderRadius: 2,
                    bgcolor: tokens.progress.track,
                    '& .MuiLinearProgress-bar': {
                      bgcolor: tokens.accent.primary,
                      borderRadius: 2,
                    },
                  }}
                />
              </Box>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Navigation */}
        <Box
          sx={{
            display: 'flex',
            pb: 'env(safe-area-inset-bottom, 8px)',
          }}
        >
          {routes.map((route) => (
            <NavItem
              key={route.path}
              icon={route.icon}
              label={route.label}
              isActive={location.pathname === route.path}
              onClick={() => navigate(route.path)}
              tokens={tokens}
            />
          ))}
        </Box>
      </Box>
    </motion.div>
  );
};

export default BottomBar;
