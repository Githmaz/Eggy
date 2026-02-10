import { motion } from 'framer-motion';
import { Box } from '@mui/material';

/**
 * Animated Egg Component
 * Displays an egg that visually changes from soft to hard based on progress
 * Includes wobble animation during cooking and crack animation on completion
 *
 * @param {number} progress - Cooking progress from 0 to 1
 * @param {boolean} isBoiling - Whether the egg is currently cooking
 * @param {boolean} isCompleted - Whether cooking is complete
 * @param {number} size - Egg size in pixels (default 120)
 */
const Egg = ({ progress = 0, isBoiling = false, isCompleted = false, size = 120 }) => {
  // Calculate yolk color based on progress (yellow -> orange -> brown)
  const getYolkColor = () => {
    if (progress < 0.33) {
      // Soft: bright yellow, runny
      return '#FFD93D';
    } else if (progress < 0.66) {
      // Medium: golden orange, jammy
      return '#FF9500';
    } else {
      // Hard: pale yellow, fully set
      return '#E8C547';
    }
  };

  // Calculate yolk opacity/visibility based on progress
  const getYolkStyle = () => {
    if (progress < 0.33) {
      return { opacity: 0.9, scale: 1.1 }; // Runny, slightly larger
    } else if (progress < 0.66) {
      return { opacity: 0.95, scale: 1 }; // Jammy
    } else {
      return { opacity: 1, scale: 0.85 }; // Set, slightly smaller
    }
  };

  const yolkStyle = getYolkStyle();

  // Wobble animation while boiling
  const wobbleAnimation = isBoiling
    ? {
        rotate: [0, -2, 2, -2, 0],
        y: [0, -3, 0, -2, 0],
      }
    : {};

  // Completion celebration animation
  const completionAnimation = isCompleted
    ? {
        scale: [1, 1.1, 1],
        filter: [
          'drop-shadow(0 0 0px rgba(255, 149, 0, 0))',
          'drop-shadow(0 0 20px rgba(255, 149, 0, 0.8))',
          'drop-shadow(0 0 10px rgba(255, 149, 0, 0.4))',
        ],
      }
    : {};

  return (
    <motion.div
      animate={{
        ...wobbleAnimation,
        ...completionAnimation,
      }}
      transition={{
        rotate: { duration: 0.5, repeat: isBoiling ? Infinity : 0, ease: 'easeInOut' },
        y: { duration: 0.6, repeat: isBoiling ? Infinity : 0, ease: 'easeInOut' },
        scale: { duration: 0.6, ease: 'easeOut' },
        filter: { duration: 0.6, ease: 'easeOut' },
      }}
      style={{ display: 'inline-block' }}
    >
      <Box
        sx={{
          position: 'relative',
          width: size,
          height: size * 1.25,
        }}
      >
        {/* Egg white (shell) */}
        <Box
          sx={{
            position: 'absolute',
            width: '100%',
            height: '100%',
            background: 'linear-gradient(145deg, #FFFEF5 0%, #F5F0E6 50%, #EAE4D8 100%)',
            borderRadius: '50% 50% 50% 50% / 60% 60% 40% 40%',
            boxShadow: `
              inset -8px -8px 20px rgba(0, 0, 0, 0.05),
              inset 8px 8px 20px rgba(255, 255, 255, 0.8),
              0 10px 30px rgba(0, 0, 0, 0.15)
            `,
            border: '1px solid rgba(0, 0, 0, 0.05)',
          }}
        />

        {/* Egg yolk (visible through shell as cooking indicator) */}
        <motion.div
          animate={{
            backgroundColor: getYolkColor(),
            opacity: yolkStyle.opacity,
            scale: yolkStyle.scale,
          }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
          style={{
            position: 'absolute',
            top: '35%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: size * 0.4,
            height: size * 0.4,
            borderRadius: '50%',
            boxShadow: 'inset -4px -4px 10px rgba(0, 0, 0, 0.1)',
          }}
        />

        {/* Subtle shine effect */}
        <Box
          sx={{
            position: 'absolute',
            top: '15%',
            left: '25%',
            width: size * 0.2,
            height: size * 0.15,
            background: 'rgba(255, 255, 255, 0.6)',
            borderRadius: '50%',
            filter: 'blur(4px)',
          }}
        />

        {/* Crack lines when completed */}
        {isCompleted && (
          <motion.div
            initial={{ opacity: 0, pathLength: 0 }}
            animate={{ opacity: 1, pathLength: 1 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <svg
              viewBox="0 0 100 125"
              style={{
                position: 'absolute',
                width: '100%',
                height: '100%',
                top: 0,
                left: 0,
              }}
            >
              <motion.path
                d="M 45 25 L 50 40 L 42 55 L 55 70 L 48 85"
                fill="none"
                stroke="rgba(0, 0, 0, 0.2)"
                strokeWidth="2"
                strokeLinecap="round"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 0.8, delay: 0.5 }}
              />
              <motion.path
                d="M 52 30 L 58 42 L 52 50"
                fill="none"
                stroke="rgba(0, 0, 0, 0.15)"
                strokeWidth="1.5"
                strokeLinecap="round"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 0.5, delay: 0.8 }}
              />
            </svg>
          </motion.div>
        )}
      </Box>
    </motion.div>
  );
};

export default Egg;
