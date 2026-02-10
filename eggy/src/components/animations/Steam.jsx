import { motion } from 'framer-motion';
import { Box } from '@mui/material';
import { useMemo } from 'react';

/**
 * Animated Steam Component
 * Creates rising steam wisps effect for boiling pot
 *
 * @param {boolean} isActive - Whether steam should animate
 * @param {number} count - Number of steam wisps
 */
const Steam = ({ isActive = false, count = 5 }) => {
  // Generate random steam wisp configurations
  const steamWisps = useMemo(() => {
    return Array.from({ length: count }, (_, i) => ({
      id: i,
      left: 20 + (i * 60) / count + Math.random() * 10, // Spread across
      delay: Math.random() * 2,
      duration: Math.random() * 2 + 3, // 3-5s
      width: Math.random() * 30 + 20, // 20-50px
      sway: Math.random() * 40 - 20, // -20 to 20px sway
    }));
  }, [count]);

  if (!isActive) return null;

  return (
    <Box
      sx={{
        position: 'absolute',
        top: -80,
        left: 0,
        right: 0,
        height: 100,
        overflow: 'visible',
        pointerEvents: 'none',
      }}
    >
      {steamWisps.map((wisp) => (
        <motion.div
          key={wisp.id}
          initial={{ y: 0, opacity: 0, scaleY: 0.5 }}
          animate={{
            y: [0, -60, -120],
            x: [0, wisp.sway, wisp.sway * 0.5],
            opacity: [0, 0.6, 0],
            scaleY: [0.5, 1, 1.5],
            scaleX: [1, 1.3, 1.8],
          }}
          transition={{
            duration: wisp.duration,
            delay: wisp.delay,
            repeat: Infinity,
            ease: 'easeOut',
          }}
          style={{
            position: 'absolute',
            bottom: 0,
            left: `${wisp.left}%`,
            width: wisp.width,
            height: 60,
            background: 'linear-gradient(to top, rgba(255, 255, 255, 0.4), rgba(255, 255, 255, 0))',
            borderRadius: '50% 50% 50% 50% / 80% 80% 20% 20%',
            filter: 'blur(8px)',
          }}
        />
      ))}
    </Box>
  );
};

export default Steam;
