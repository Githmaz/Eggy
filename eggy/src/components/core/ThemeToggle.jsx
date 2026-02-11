import { Box } from '@mui/material';
import { motion } from 'framer-motion';
import { useLocation } from 'react-router-dom';
import { useTheme } from '../../context/ThemeContext';

/**
 * THEME TOGGLE
 *
 * Premium toggle button for Light/Dark mode.
 * Positioned at top-right corner.
 * Hidden on splash page.
 */

const ThemeToggle = () => {
  const { isDark, toggleTheme, tokens } = useTheme();
  const location = useLocation();

  // Hide on splash
  if (location.pathname === '/') return null;

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: 0.3 }}
      style={{
        position: 'fixed',
        top: 16,
        right: 16,
        zIndex: 1001,
      }}
    >
      <motion.button
        onClick={toggleTheme}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        style={{
          width: 44,
          height: 44,
          borderRadius: 14,
          border: 'none',
          cursor: 'pointer',
          background: tokens.surface.nav,
          backdropFilter: 'blur(20px)',
          WebkitBackdropFilter: 'blur(20px)',
          boxShadow: tokens.shadow.soft,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: '1.25rem',
        }}
      >
        <motion.div
          initial={false}
          animate={{ rotate: isDark ? 0 : 180 }}
          transition={{ duration: 0.3 }}
        >
          {isDark ? (
            <Box
              component="span"
              sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              🌙
            </Box>
          ) : (
            <Box
              component="span"
              sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              ☀️
            </Box>
          )}
        </motion.div>
      </motion.button>
    </motion.div>
  );
};

export default ThemeToggle;
