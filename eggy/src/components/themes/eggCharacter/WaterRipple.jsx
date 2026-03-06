import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Box } from '@mui/material';
import { useTheme } from '../../../context/ThemeContext';

/**
 * WATER RIPPLE
 *
 * Gentle concentric ripple effect for the hot spring.
 * Calm and continuous when bathing.
 * Bigger spread on timer complete.
 */

const RippleRing = ({ delay, duration, maxScale, tokens }) => (
  <motion.div
    initial={{ scale: 0.3, opacity: 0.6 }}
    animate={{ scale: maxScale, opacity: 0 }}
    transition={{
      duration,
      delay,
      ease: 'easeOut',
      repeat: Infinity,
      repeatDelay: 0.5,
    }}
    style={{
      position: 'absolute',
      top: '50%',
      left: '50%',
      transform: 'translate(-50%, -50%)',
      width: 80,
      height: 30,
      borderRadius: '50%',
      border: `1.5px solid ${tokens.pool?.ripple || 'rgba(255, 255, 255, 0.4)'}`,
      pointerEvents: 'none',
    }}
  />
);

const WaterRipple = ({
  intensity = 'gentle', // gentle, splash, spread
}) => {
  const { tokens } = useTheme();
  const [key, setKey] = useState(0);

  // Reset animation on intensity change
  useEffect(() => {
    setKey((prev) => prev + 1);
  }, [intensity]);

  const config = {
    gentle: {
      rings: 2,
      duration: 3,
      maxScale: 1.8,
      stagger: 1.5,
    },
    splash: {
      rings: 3,
      duration: 0.6,
      maxScale: 2.2,
      stagger: 0.15,
    },
    spread: {
      rings: 4,
      duration: 1.2,
      maxScale: 2.8,
      stagger: 0.25,
    },
  }[intensity] || { rings: 2, duration: 3, maxScale: 1.8, stagger: 1.5 };

  return (
    <Box
      key={key}
      sx={{
        position: 'absolute',
        top: '35%',
        left: '50%',
        transform: 'translateX(-50%)',
        width: 80,
        height: 30,
        pointerEvents: 'none',
        zIndex: 2,
      }}
    >
      {[...Array(config.rings)].map((_, i) => (
        <RippleRing
          key={i}
          delay={i * config.stagger}
          duration={config.duration}
          maxScale={config.maxScale}
          tokens={tokens}
        />
      ))}
    </Box>
  );
};

export default WaterRipple;
