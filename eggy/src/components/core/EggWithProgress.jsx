import { motion } from 'framer-motion';
import { Box, Typography } from '@mui/material';
import { formatTime } from '../../utils/constants';
import { useTheme } from '../../context/ThemeContext';

/**
 * EGG WITH PROGRESS RING - THEMED
 *
 * Light mode: Warm coral ring, soft egg
 * Dark mode: Blue glow ring, glass circle effect
 */

const EggWithProgress = ({
  progress = 0,
  timeRemaining = 0,
  isRunning = false,
  isCompleted = false,
}) => {
  const { tokens, isDark } = useTheme();

  const size = 260;
  const strokeWidth = 6;
  const radius = (size - strokeWidth * 2) / 2 - 20;
  const circumference = radius * 2 * Math.PI;
  const offset = circumference - progress * circumference;

  // Egg visual based on cooking stage
  const getEggStyle = () => {
    if (isCompleted) {
      return {
        shell: isDark
          ? 'linear-gradient(165deg, #E8E4DF 0%, #D8D4CF 40%, #C8C4BF 100%)'
          : 'linear-gradient(165deg, #FEFEFE 0%, #F8F6F2 40%, #F0EDE5 100%)',
        yolk: '#E8A040',
        glow: tokens.success,
      };
    }
    if (progress < 0.33) {
      return {
        shell: isDark
          ? 'linear-gradient(165deg, #F0EDE8 0%, #E8E4DF 40%, #DDD8D0 100%)'
          : 'linear-gradient(165deg, #FFFFFF 0%, #FFFBF5 40%, #FFF5EA 100%)',
        yolk: '#FFD54F',
        glow: tokens.accent.primary,
      };
    }
    if (progress < 0.66) {
      return {
        shell: isDark
          ? 'linear-gradient(165deg, #EDE8E3 0%, #E4DFD8 40%, #D8D0C8 100%)'
          : 'linear-gradient(165deg, #FEFEFE 0%, #FFF8F0 40%, #FFEFE5 100%)',
        yolk: '#FFAB40',
        glow: tokens.accent.primary,
      };
    }
    return {
      shell: isDark
        ? 'linear-gradient(165deg, #E8E3DE 0%, #DFD8D0 40%, #D0C8C0 100%)'
        : 'linear-gradient(165deg, #FEFEFE 0%, #FFF5EC 40%, #FFE8DC 100%)',
      yolk: '#FF8A40',
      glow: tokens.accent.primary,
    };
  };

  const style = getEggStyle();
  const ringColor = isCompleted ? tokens.success : tokens.progress.ring;

  return (
    <Box
      sx={{
        position: 'relative',
        width: size,
        height: size,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      {/* Glass circle background for dark mode */}
      {isDark && (
        <Box
          sx={{
            position: 'absolute',
            width: size - 40,
            height: size - 40,
            borderRadius: '50%',
            background: 'rgba(255, 255, 255, 0.05)',
            backdropFilter: 'blur(10px)',
            border: '1px solid rgba(255, 255, 255, 0.1)',
            boxShadow: `
              inset 0 0 60px rgba(91, 164, 217, 0.1),
              0 0 40px rgba(91, 164, 217, 0.15)
            `,
          }}
        />
      )}

      {/* Progress Ring */}
      <svg
        width={size}
        height={size}
        style={{
          position: 'absolute',
          transform: 'rotate(-90deg)',
        }}
      >
        {/* Track */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke={tokens.progress.track}
          strokeWidth={strokeWidth}
        />

        {/* Progress */}
        <motion.circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke={ringColor}
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          strokeDasharray={circumference}
          initial={{ strokeDashoffset: circumference }}
          animate={{ strokeDashoffset: offset }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          style={{
            filter: isDark ? `drop-shadow(0 0 8px ${ringColor})` : 'none',
          }}
        />
      </svg>

      {/* Glow effect */}
      <motion.div
        animate={{
          opacity: isRunning ? [0.4, 0.7, 0.4] : isCompleted ? 0.5 : 0.2,
          scale: isCompleted ? [1, 1.05, 1] : 1,
        }}
        transition={{ duration: 2, repeat: Infinity }}
        style={{
          position: 'absolute',
          width: 120,
          height: 140,
          borderRadius: '50%',
          background: `radial-gradient(circle, ${style.glow}40 0%, transparent 70%)`,
          filter: 'blur(25px)',
        }}
      />

      {/* Floating Egg */}
      <motion.div
        animate={
          isRunning
            ? { y: [0, -8, 0], rotate: [0, 1, 0, -1, 0] }
            : isCompleted
            ? { scale: [1, 1.03, 1] }
            : { y: [0, -4, 0] }
        }
        transition={{
          duration: isRunning ? 2.5 : 4,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      >
        <Box
          sx={{
            width: 85,
            height: 105,
            background: style.shell,
            borderRadius: '50% 50% 50% 50% / 60% 60% 40% 40%',
            boxShadow: isDark
              ? `
                0 20px 50px rgba(0,0,0,0.3),
                0 8px 20px rgba(0,0,0,0.2),
                inset 0 -15px 30px rgba(0,0,0,0.05),
                inset 0 5px 20px rgba(255,255,255,0.4)
              `
              : `
                0 20px 40px rgba(0,0,0,0.08),
                0 8px 16px rgba(0,0,0,0.04),
                inset 0 -15px 30px rgba(0,0,0,0.02),
                inset 0 5px 20px rgba(255,255,255,0.8)
              `,
            position: 'relative',
          }}
        >
          {/* Yolk glow (visible through shell) */}
          <Box
            sx={{
              position: 'absolute',
              top: '28%',
              left: '50%',
              transform: 'translateX(-50%)',
              width: '40%',
              height: '32%',
              borderRadius: '50%',
              background: `radial-gradient(circle at 40% 40%, ${style.yolk}, ${style.yolk}99)`,
              opacity: 0.9,
              filter: 'blur(1px)',
            }}
          />

          {/* Shell highlight */}
          <Box
            sx={{
              position: 'absolute',
              top: '12%',
              left: '20%',
              width: '25%',
              height: '15%',
              borderRadius: '50%',
              background: isDark ? 'rgba(255,255,255,0.5)' : 'rgba(255,255,255,0.9)',
              filter: 'blur(3px)',
            }}
          />
        </Box>
      </motion.div>

      {/* Time Display */}
      <Box
        sx={{
          position: 'absolute',
          bottom: 40,
          left: '50%',
          transform: 'translateX(-50%)',
        }}
      >
        <motion.div
          animate={isRunning ? { opacity: [1, 0.6, 1] } : {}}
          transition={{ duration: 1, repeat: Infinity }}
        >
          <Typography
            sx={{
              fontFamily: '"SF Mono", Monaco, monospace',
              fontSize: '1.625rem',
              fontWeight: 600,
              color: isCompleted ? tokens.success : tokens.text.primary,
              letterSpacing: '-0.02em',
              textShadow: isDark ? '0 2px 10px rgba(0,0,0,0.3)' : 'none',
            }}
          >
            {formatTime(timeRemaining)}
          </Typography>
        </motion.div>
      </Box>
    </Box>
  );
};

export default EggWithProgress;
