import { Box, Typography } from '@mui/material';
import { motion } from 'framer-motion';
import { formatTime } from '../../utils/constants';

/**
 * Timer Display Component
 * Shows remaining time with circular progress indicator
 *
 * @param {number} timeRemaining - Time remaining in seconds
 * @param {number} progress - Progress from 0 to 1
 * @param {boolean} isRunning - Whether timer is running
 * @param {boolean} isCompleted - Whether timer is completed
 */
const TimerDisplay = ({
  timeRemaining = 0,
  progress = 0,
  isRunning = false,
  isCompleted = false,
}) => {
  const size = 200;
  const strokeWidth = 8;
  const radius = (size - strokeWidth) / 2;
  const circumference = radius * 2 * Math.PI;
  const strokeDashoffset = circumference - progress * circumference;

  return (
    <Box
      sx={{
        position: 'relative',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        width: size,
        height: size,
      }}
    >
      {/* Background circle */}
      <svg
        width={size}
        height={size}
        style={{ position: 'absolute', transform: 'rotate(-90deg)' }}
      >
        {/* Track */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke="rgba(0, 0, 0, 0.08)"
          strokeWidth={strokeWidth}
        />

        {/* Progress */}
        <motion.circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke={isCompleted ? '#34C759' : '#FF9500'}
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          strokeDasharray={circumference}
          initial={{ strokeDashoffset: circumference }}
          animate={{ strokeDashoffset }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
          style={{
            filter: isRunning ? 'drop-shadow(0 0 8px rgba(255, 149, 0, 0.5))' : 'none',
          }}
        />
      </svg>

      {/* Time display */}
      <motion.div
        animate={
          isRunning
            ? { scale: [1, 1.02, 1] }
            : isCompleted
            ? { scale: [1, 1.1, 1] }
            : {}
        }
        transition={{
          duration: 1,
          repeat: isRunning ? Infinity : 0,
          ease: 'easeInOut',
        }}
      >
        <Typography
          variant="h2"
          sx={{
            fontWeight: 700,
            fontFamily: 'SF Mono, Monaco, Consolas, monospace',
            color: isCompleted ? 'success.main' : 'text.primary',
            letterSpacing: '-0.02em',
          }}
        >
          {formatTime(timeRemaining)}
        </Typography>
      </motion.div>

      {/* Pulse effect when running */}
      {isRunning && (
        <motion.div
          initial={{ scale: 1, opacity: 0.3 }}
          animate={{ scale: 1.15, opacity: 0 }}
          transition={{
            duration: 1.5,
            repeat: Infinity,
            ease: 'easeOut',
          }}
          style={{
            position: 'absolute',
            width: size,
            height: size,
            borderRadius: '50%',
            border: '2px solid #FF9500',
            pointerEvents: 'none',
          }}
        />
      )}
    </Box>
  );
};

export default TimerDisplay;
