import { useState, useEffect } from 'react';
import { Box, Typography, Button } from '@mui/material';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

/**
 * Splash / Welcome Screen
 * Shows EVERY time the user loads/refreshes the app
 * Waits for user to click "Let's Cook" - no auto-navigation
 */
const SplashPage = () => {
  const navigate = useNavigate();
  const [showContent, setShowContent] = useState(false);

  useEffect(() => {
    // Show button after initial animation
    const timer = setTimeout(() => {
      setShowContent(true);
    }, 800);

    return () => clearTimeout(timer);
  }, []);

  const handleStart = () => {
    navigate('/timer', { replace: true });
  };

  return (
    <Box
      sx={{
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        background: 'linear-gradient(180deg, #FAFAF9 0%, #F5F5F4 50%, #FAFAF9 100%)',
        position: 'relative',
        overflow: 'hidden',
        px: 3,
      }}
    >
      {/* Subtle decorative gradient orb */}
      <motion.div
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 0.6 }}
        transition={{ duration: 1.2, ease: 'easeOut' }}
        style={{
          position: 'absolute',
          width: '140vw',
          height: '140vw',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(255, 149, 0, 0.08) 0%, transparent 60%)',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          pointerEvents: 'none',
        }}
      />

      {/* Main content */}
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          zIndex: 1,
          maxWidth: 340,
        }}
      >
        {/* Animated Egg Icon */}
        <motion.div
          initial={{ scale: 0, rotate: -180 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{
            duration: 0.7,
            delay: 0.1,
            type: 'spring',
            stiffness: 180,
            damping: 15,
          }}
        >
          <Box
            sx={{
              width: { xs: 100, sm: 120 },
              height: { xs: 125, sm: 150 },
              background: 'linear-gradient(145deg, #FFFFFF 0%, #F8F8F6 50%, #F0EDE8 100%)',
              borderRadius: '50% 50% 50% 50% / 60% 60% 40% 40%',
              boxShadow: `
                0 16px 48px rgba(0, 0, 0, 0.08),
                0 4px 16px rgba(0, 0, 0, 0.04),
                inset 0 -8px 24px rgba(0, 0, 0, 0.02)
              `,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              position: 'relative',
            }}
          >
            {/* Yolk */}
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.4, duration: 0.4, type: 'spring' }}
              style={{
                width: '38%',
                height: '30%',
                borderRadius: '50%',
                background: 'linear-gradient(145deg, #FFD93D 0%, #FF9500 100%)',
                boxShadow: 'inset -3px -3px 10px rgba(0, 0, 0, 0.08)',
                position: 'absolute',
                top: '35%',
              }}
            />

            {/* Shine */}
            <Box
              sx={{
                position: 'absolute',
                top: '15%',
                left: '25%',
                width: '18%',
                height: '10%',
                background: 'rgba(255, 255, 255, 0.8)',
                borderRadius: '50%',
                filter: 'blur(2px)',
              }}
            />
          </Box>
        </motion.div>

        {/* App Name */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <Typography
            variant="h1"
            sx={{
              mt: 4,
              fontSize: { xs: '2.75rem', sm: '3.5rem' },
              fontWeight: 800,
              background: 'linear-gradient(135deg, #FF9500 0%, #E08600 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              letterSpacing: '-0.03em',
            }}
          >
            Eggy
          </Typography>
        </motion.div>

        {/* Tagline */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.6 }}
        >
          <Typography
            variant="body1"
            sx={{
              mt: 1,
              color: 'text.secondary',
              fontWeight: 400,
              textAlign: 'center',
              fontSize: { xs: '1rem', sm: '1.125rem' },
            }}
          >
            Perfect eggs, every time.
          </Typography>
        </motion.div>

        {/* Let's Cook Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{
            opacity: showContent ? 1 : 0,
            y: showContent ? 0 : 20
          }}
          transition={{ duration: 0.4 }}
          style={{ width: '100%', marginTop: 48 }}
        >
          <Button
            variant="contained"
            size="large"
            onClick={handleStart}
            fullWidth
            sx={{
              py: 1.75,
              fontSize: '1.1rem',
              borderRadius: 4,
              fontWeight: 700,
              boxShadow: '0 8px 24px rgba(255, 149, 0, 0.3)',
              '&:hover': {
                boxShadow: '0 12px 32px rgba(255, 149, 0, 0.4)',
              },
            }}
          >
            Let's Cook
          </Button>
        </motion.div>
      </Box>

      {/* Version / branding */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: showContent ? 0.5 : 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        style={{
          position: 'absolute',
          bottom: 32,
        }}
      >
        <Typography variant="caption" color="text.disabled" sx={{ fontSize: '0.7rem' }}>
          v1.0 - Made with care
        </Typography>
      </motion.div>
    </Box>
  );
};

export default SplashPage;
