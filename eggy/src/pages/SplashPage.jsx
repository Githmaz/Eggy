import { useState, useEffect } from 'react';
import { Box, Typography } from '@mui/material';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { useTheme } from '../context/ThemeContext';
import Bubbles from '../components/core/Bubbles';

/**
 * SPLASH PAGE - THEMED PREMIUM
 *
 * Clean, minimal, premium entrance.
 * Shows every refresh.
 * Waits for "Let's Cook" click.
 */

const SplashPage = () => {
  const navigate = useNavigate();
  const { tokens, isDark } = useTheme();
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setReady(true), 500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <Box
      sx={{
        minHeight: '100vh',
        background: tokens.bg.gradient,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        px: 4,
        position: 'relative',
        overflow: 'hidden',
        transition: 'background 0.4s ease',
      }}
    >
      {/* Background bubbles */}
      <Bubbles isBoiling={false} />

      {/* Animated Egg */}
      <motion.div
        initial={{ scale: 0, rotate: -180 }}
        animate={{ scale: 1, rotate: 0 }}
        transition={{ type: 'spring', stiffness: 200, damping: 15, delay: 0.1 }}
        style={{ position: 'relative', zIndex: 1 }}
      >
        {/* Glass circle behind egg in dark mode */}
        {isDark && (
          <Box
            sx={{
              position: 'absolute',
              top: -20,
              left: -20,
              right: -20,
              bottom: -20,
              borderRadius: '50%',
              background: 'rgba(255, 255, 255, 0.05)',
              backdropFilter: 'blur(10px)',
              border: '1px solid rgba(255, 255, 255, 0.1)',
              boxShadow: `0 0 60px ${tokens.accent.glow}`,
            }}
          />
        )}

        <Box
          sx={{
            width: 100,
            height: 125,
            background: isDark
              ? 'linear-gradient(165deg, #F0EDE8 0%, #E8E4DF 40%, #DDD8D0 100%)'
              : 'linear-gradient(165deg, #FFFFFF 0%, #FFFBF5 40%, #FFF0E5 100%)',
            borderRadius: '50% 50% 50% 50% / 60% 60% 40% 40%',
            boxShadow: isDark
              ? `
                0 20px 50px rgba(0,0,0,0.3),
                0 8px 20px rgba(0,0,0,0.2),
                inset 0 -10px 30px rgba(0,0,0,0.05),
                inset 0 5px 20px rgba(255,255,255,0.4)
              `
              : `
                0 20px 50px rgba(0,0,0,0.08),
                0 8px 20px rgba(0,0,0,0.04),
                inset 0 -10px 30px rgba(0,0,0,0.02),
                inset 0 5px 20px rgba(255,255,255,0.9)
              `,
            position: 'relative',
            zIndex: 1,
          }}
        >
          {/* Yolk */}
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.3, type: 'spring' }}
            style={{
              position: 'absolute',
              top: '28%',
              left: '50%',
              transform: 'translateX(-50%)',
              width: '38%',
              height: '30%',
              borderRadius: '50%',
              background: isDark
                ? `linear-gradient(145deg, #7BBFEF 0%, ${tokens.accent.primary} 100%)`
                : `linear-gradient(145deg, #FFD54F 0%, ${tokens.accent.primary} 100%)`,
            }}
          />

          {/* Highlight */}
          <Box
            sx={{
              position: 'absolute',
              top: '12%',
              left: '20%',
              width: '22%',
              height: '12%',
              borderRadius: '50%',
              background: isDark ? 'rgba(255,255,255,0.5)' : 'rgba(255,255,255,0.9)',
              filter: 'blur(2px)',
            }}
          />
        </Box>
      </motion.div>

      {/* Text */}
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 0.4 }}
        style={{ position: 'relative', zIndex: 1 }}
      >
        <Typography
          variant="h1"
          sx={{
            mt: 4,
            fontSize: { xs: '2.5rem', sm: '3rem' },
            fontWeight: 800,
            color: tokens.text.primary,
            letterSpacing: '-0.03em',
          }}
        >
          Eggy
        </Typography>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5, duration: 0.4 }}
        style={{ position: 'relative', zIndex: 1 }}
      >
        <Typography
          sx={{
            mt: 1,
            color: tokens.text.secondary,
            fontSize: '1rem',
          }}
        >
            Pixieee, we have to cook!
        </Typography>
      </motion.div>

      {/* Button */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: ready ? 1 : 0, y: ready ? 0 : 20 }}
        transition={{ duration: 0.4 }}
        style={{ marginTop: 48, width: '100%', maxWidth: 280, position: 'relative', zIndex: 1 }}
      >
        <motion.button
          onClick={() => navigate('/timer', { replace: true })}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          style={{
            width: '100%',
            padding: '18px 32px',
            fontSize: '1rem',
            fontWeight: 600,
            border: 'none',
            borderRadius: 16,
            cursor: 'pointer',
            background: tokens.accent.gradient,
            color: '#FFFFFF',
            boxShadow: isDark
              ? `0 8px 30px ${tokens.accent.glow}, 0 0 60px ${tokens.accent.glow}`
              : `0 8px 24px ${tokens.accent.glow}`,
          }}
        >
          Let's Cook
        </motion.button>
      </motion.div>
    </Box>
  );
};

export default SplashPage;
