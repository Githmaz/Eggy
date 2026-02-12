import { useRef, useEffect, useState } from 'react';
import { Box } from '@mui/material';
import { motion, useSpring, useTransform } from 'framer-motion';
import { useTheme } from '../../context/ThemeContext';

/**
 * ROTARY DIAL - Premium Mechanical Control
 *
 * Behaves like a real kitchen timer knob:
 * - Indicator dot starts at 12 o'clock (0 degrees)
 * - Rotates FULL 360 degrees proportional to elapsed time
 * - rotation = (elapsed / total) * 360 = progress * 360
 * - Linear animation (no spring overshoot)
 * - Pausing freezes rotation at exact angle
 * - Reset returns rotation to 0
 *
 * Visual features:
 * - Metallic gradient surface
 * - Inner lighting effect
 * - Subtle reflection highlight
 * - Soft realistic shadow
 * - Indicator dot at edge
 * - Micro-tick animation every second
 */

const RotaryDial = ({
  isRunning = false,
  isPaused = false,
  isCompleted = false,
  progress = 0,
  duration = 0,
  onToggle,
  onReset,
}) => {
  const { tokens, isDark } = useTheme();
  const dialRef = useRef(null);
  const tickRef = useRef(null);

  // Spring for press feedback only
  const scale = useSpring(1, { stiffness: 400, damping: 25 });
  const shadowBlur = useSpring(20, { stiffness: 400, damping: 25 });

  // Rotation is calculated directly from progress (LINEAR, no spring)
  // rotation = progress * 360 degrees
  // This is mathematically tied to timer: elapsed/total * 360
  const [rotation, setRotation] = useState(0);

  // Micro-tick scale animation
  const tickScale = useSpring(1, { stiffness: 600, damping: 15 });

  // Update rotation based on progress - LINEAR mapping
  // When running or paused: rotation = progress * 360
  // When reset (progress = 0): rotation = 0
  useEffect(() => {
    // Calculate exact rotation from progress
    // progress = (duration - timeRemaining) / duration = elapsed / total
    // rotation = progress * 360
    const targetRotation = progress * 360;
    setRotation(targetRotation);
  }, [progress]);

  // Micro-tick every second when running
  useEffect(() => {
    if (!isRunning) return;

    const interval = setInterval(() => {
      // Quick micro-pulse for mechanical feel
      tickScale.set(0.98);
      setTimeout(() => tickScale.set(1), 80);
    }, 1000);

    return () => clearInterval(interval);
  }, [isRunning, tickScale]);

  // Handle press
  const handlePressStart = () => {
    scale.set(0.97);
    shadowBlur.set(12);
  };

  const handlePressEnd = () => {
    scale.set(1);
    shadowBlur.set(20);
  };

  const handleClick = () => {
    if (isCompleted) {
      onReset?.();
    } else {
      onToggle?.();
    }
  };

  // Get label text
  const getLabel = () => {
    if (isCompleted) return 'Reset';
    if (isRunning) return 'Pause';
    if (isPaused) return 'Resume';
    return 'Start';
  };

  // Colors based on theme
  const dialColors = isDark
    ? {
        outer: 'linear-gradient(145deg, #2A4A6A 0%, #1A3A5A 50%, #0F2A4A 100%)',
        inner: 'linear-gradient(145deg, #3A5A7A 0%, #2A4A6A 100%)',
        ring: 'linear-gradient(145deg, #4A6A8A 0%, #3A5A7A 100%)',
        highlight: 'rgba(123, 191, 239, 0.3)',
        shadow: 'rgba(0, 0, 0, 0.5)',
        glow: tokens.accent.primary,
        text: tokens.text.primary,
        indicator: tokens.accent.primary,
      }
    : {
        outer: 'linear-gradient(145deg, #E8E0D8 0%, #D8D0C8 50%, #C8C0B8 100%)',
        inner: 'linear-gradient(145deg, #F8F0E8 0%, #E8E0D8 100%)',
        ring: 'linear-gradient(145deg, #FFFFFF 0%, #F0E8E0 100%)',
        highlight: 'rgba(255, 255, 255, 0.8)',
        shadow: 'rgba(0, 0, 0, 0.15)',
        glow: tokens.accent.primary,
        text: tokens.text.primary,
        indicator: tokens.accent.primary,
      };

  const dialSize = 140;
  const innerSize = 110;
  const knobSize = 80;

  return (
    <Box
      sx={{
        position: 'relative',
        width: dialSize,
        height: dialSize,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      {/* Glow effect when running */}
      {isRunning && (
        <motion.div
          animate={{
            opacity: [0.3, 0.6, 0.3],
            scale: [1, 1.05, 1],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
          style={{
            position: 'absolute',
            width: dialSize + 40,
            height: dialSize + 40,
            borderRadius: '50%',
            background: `radial-gradient(circle, ${dialColors.glow}40 0%, transparent 70%)`,
            filter: 'blur(15px)',
          }}
        />
      )}

      {/* Outer dial base - shadow ring */}
      <motion.div
        style={{
          position: 'absolute',
          width: dialSize,
          height: dialSize,
          borderRadius: '50%',
          background: dialColors.outer,
          boxShadow: `
            0 8px 24px ${dialColors.shadow},
            0 2px 8px ${dialColors.shadow},
            inset 0 -2px 6px rgba(0,0,0,0.2),
            inset 0 2px 6px ${dialColors.highlight}
          `,
        }}
      />

      {/* Middle ring - metallic band */}
      <motion.div
        ref={dialRef}
        style={{
          position: 'absolute',
          width: innerSize,
          height: innerSize,
          borderRadius: '50%',
          background: dialColors.ring,
          boxShadow: `
            inset 0 -3px 8px rgba(0,0,0,0.15),
            inset 0 3px 8px ${dialColors.highlight}
          `,
          // LINEAR rotation tied to progress (no spring overshoot)
          // Updates smoothly every second as timer ticks
          transform: `rotate(${rotation}deg)`,
          transition: isRunning ? 'transform 1s linear' : 'transform 0.3s ease-out',
          scale: tickScale,
        }}
      >
        {/* Indicator dot */}
        <Box
          sx={{
            position: 'absolute',
            top: 8,
            left: '50%',
            transform: 'translateX(-50%)',
            width: 6,
            height: 6,
            borderRadius: '50%',
            bgcolor: dialColors.indicator,
            boxShadow: isRunning
              ? `0 0 8px ${dialColors.indicator}, 0 0 12px ${dialColors.indicator}`
              : `0 1px 2px rgba(0,0,0,0.3)`,
          }}
        />

        {/* Tick marks */}
        {[...Array(12)].map((_, i) => (
          <Box
            key={i}
            sx={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              width: 2,
              height: 6,
              bgcolor: isDark ? 'rgba(255,255,255,0.2)' : 'rgba(0,0,0,0.1)',
              borderRadius: 1,
              transform: `rotate(${i * 30}deg) translateY(-${innerSize / 2 - 10}px)`,
              transformOrigin: '0 0',
            }}
          />
        ))}
      </motion.div>

      {/* Inner knob - pressable */}
      <motion.button
        ref={tickRef}
        onClick={handleClick}
        onMouseDown={handlePressStart}
        onMouseUp={handlePressEnd}
        onMouseLeave={handlePressEnd}
        onTouchStart={handlePressStart}
        onTouchEnd={handlePressEnd}
        style={{
          position: 'absolute',
          width: knobSize,
          height: knobSize,
          borderRadius: '50%',
          border: 'none',
          cursor: 'pointer',
          background: dialColors.inner,
          scale,
          boxShadow: useTransform(
            shadowBlur,
            (v) => `
              0 ${v * 0.4}px ${v}px ${dialColors.shadow},
              inset 0 -2px 4px rgba(0,0,0,0.1),
              inset 0 2px 4px ${dialColors.highlight}
            `
          ),
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          WebkitTapHighlightColor: 'transparent',
        }}
        whileHover={{ scale: 1.02 }}
      >
        {/* Center reflection */}
        <Box
          sx={{
            position: 'absolute',
            top: '15%',
            left: '20%',
            width: '30%',
            height: '20%',
            borderRadius: '50%',
            background: dialColors.highlight,
            filter: 'blur(4px)',
            opacity: 0.6,
          }}
        />

        {/* Label */}
        <Box
          component="span"
          sx={{
            fontSize: '0.8125rem',
            fontWeight: 600,
            color: dialColors.text,
            letterSpacing: '0.02em',
            position: 'relative',
            zIndex: 1,
          }}
        >
          {getLabel()}
        </Box>
      </motion.button>

      {/* Completion glow */}
      {isCompleted && (
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          style={{
            position: 'absolute',
            width: dialSize + 20,
            height: dialSize + 20,
            borderRadius: '50%',
            border: `2px solid ${tokens.success}`,
            boxShadow: `0 0 20px ${tokens.success}50`,
          }}
        />
      )}
    </Box>
  );
};

export default RotaryDial;
