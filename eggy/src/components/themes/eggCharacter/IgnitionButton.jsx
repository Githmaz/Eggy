import { useMemo } from 'react';
import { Box } from '@mui/material';
import { motion, useSpring, useTransform } from 'framer-motion';
import { useTheme } from '../../../context/ThemeContext';

/**
 * START BUTTON - HOT SPRING
 *
 * Large smooth stone-like start button.
 * Warm, minimal aesthetic.
 * Labels: START -> PAUSE -> RESUME -> RESET
 */

const IgnitionButton = ({
  isRunning = false,
  isPaused = false,
  isCompleted = false,
  onToggle,
  onReset,
}) => {
  const { tokens, isDark } = useTheme();

  // Spring for press feedback
  const scale = useSpring(1, { stiffness: 400, damping: 25 });
  const yOffset = useSpring(0, { stiffness: 400, damping: 25 });

  const handlePressStart = () => {
    scale.set(0.96);
    yOffset.set(2);
  };

  const handlePressEnd = () => {
    scale.set(1);
    yOffset.set(0);
  };

  const handleClick = () => {
    if (isCompleted) {
      onReset?.();
    } else {
      onToggle?.();
    }
  };

  const getLabel = () => {
    if (isCompleted) return 'RESET';
    if (isRunning) return 'PAUSE';
    if (isPaused) return 'RESUME';
    return 'START';
  };

  const buttonColors = useMemo(() => ({
    base: tokens.ignition?.base,
    shadow: isDark
      ? '0 6px 20px rgba(0,0,0,0.4)'
      : '0 6px 20px rgba(0,0,0,0.12)',
    ring: isRunning
      ? tokens.ignition?.ringActive
      : tokens.ignition?.ring,
    ringGlow: isRunning
      ? `0 0 20px ${tokens.stove?.indicatorGlow || 'rgba(196, 120, 74, 0.3)'}`
      : 'none',
    text: tokens.ignition?.text,
    highlight: isDark
      ? 'inset 0 2px 4px rgba(255,255,255,0.08)'
      : 'inset 0 2px 6px rgba(255,255,255,0.6)',
  }), [isDark, isRunning, tokens]);

  const buttonSize = 90;

  return (
    <Box
      sx={{
        position: 'relative',
        width: buttonSize,
        height: buttonSize,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      {/* Active ring glow */}
      {isRunning && (
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          style={{
            position: 'absolute',
            width: buttonSize + 16,
            height: buttonSize + 16,
            borderRadius: 24,
            border: `2px solid ${buttonColors.ring}`,
            boxShadow: buttonColors.ringGlow,
          }}
        />
      )}

      {/* Completion glow */}
      {isCompleted && (
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          style={{
            position: 'absolute',
            width: buttonSize + 16,
            height: buttonSize + 16,
            borderRadius: 24,
            border: `2px solid ${tokens.success}`,
            boxShadow: `0 0 16px ${tokens.success}50`,
          }}
        />
      )}

      {/* Main button */}
      <motion.button
        onClick={handleClick}
        onMouseDown={handlePressStart}
        onMouseUp={handlePressEnd}
        onMouseLeave={handlePressEnd}
        onTouchStart={handlePressStart}
        onTouchEnd={handlePressEnd}
        style={{
          position: 'relative',
          width: buttonSize,
          height: buttonSize,
          borderRadius: 22,
          border: 'none',
          cursor: 'pointer',
          background: buttonColors.base,
          scale,
          y: yOffset,
          boxShadow: `
            ${buttonColors.shadow},
            ${buttonColors.highlight}
          `,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          WebkitTapHighlightColor: 'transparent',
        }}
        whileHover={{ scale: 1.02 }}
      >
        {/* Top highlight reflection */}
        <Box
          sx={{
            position: 'absolute',
            top: '8%',
            left: '15%',
            width: '40%',
            height: '20%',
            borderRadius: 10,
            background: isDark
              ? 'linear-gradient(180deg, rgba(255,255,255,0.1) 0%, transparent 100%)'
              : 'linear-gradient(180deg, rgba(255,255,255,0.5) 0%, transparent 100%)',
            filter: 'blur(3px)',
            pointerEvents: 'none',
          }}
        />

        {/* Label */}
        <Box
          component="span"
          sx={{
            fontSize: '0.875rem',
            fontWeight: 700,
            color: buttonColors.text,
            letterSpacing: '0.06em',
            position: 'relative',
            zIndex: 1,
          }}
        >
          {getLabel()}
        </Box>
      </motion.button>
    </Box>
  );
};

export default IgnitionButton;
