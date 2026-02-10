import { motion } from 'framer-motion';
import { Box } from '@mui/material';
import { useMemo } from 'react';

/**
 * Animated Water Bubbles Component
 * Creates floating bubble effect for boiling water animation
 *
 * @param {boolean} isActive - Whether bubbles should animate
 * @param {number} count - Number of bubbles to render
 */
const Bubbles = ({ isActive = false, count = 12 }) => {
  // Generate random bubble configurations
  const bubbles = useMemo(() => {
    return Array.from({ length: count }, (_, i) => ({
      id: i,
      size: Math.random() * 12 + 6, // 6-18px
      left: Math.random() * 80 + 10, // 10-90%
      delay: Math.random() * 2, // 0-2s delay
      duration: Math.random() * 1.5 + 1.5, // 1.5-3s duration
      opacity: Math.random() * 0.4 + 0.3, // 0.3-0.7 opacity
    }));
  }, [count]);

  if (!isActive) return null;

  return (
    <Box
      sx={{
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        height: '100%',
        overflow: 'hidden',
        pointerEvents: 'none',
      }}
    >
      {bubbles.map((bubble) => (
        <motion.div
          key={bubble.id}
          initial={{ y: 0, opacity: 0 }}
          animate={{
            y: [0, -120, -200],
            opacity: [0, bubble.opacity, 0],
            scale: [0.5, 1, 0.8],
          }}
          transition={{
            duration: bubble.duration,
            delay: bubble.delay,
            repeat: Infinity,
            ease: 'easeOut',
          }}
          style={{
            position: 'absolute',
            bottom: '10%',
            left: `${bubble.left}%`,
            width: bubble.size,
            height: bubble.size,
            borderRadius: '50%',
            background: 'radial-gradient(circle at 30% 30%, rgba(255, 255, 255, 0.9), rgba(173, 216, 230, 0.4))',
            boxShadow: 'inset -2px -2px 4px rgba(0, 0, 0, 0.1)',
          }}
        />
      ))}
    </Box>
  );
};

export default Bubbles;
