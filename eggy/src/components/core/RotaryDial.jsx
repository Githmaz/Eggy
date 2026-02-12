import { useMemo } from 'react';
import { Box } from '@mui/material';
import { motion, useSpring, useTransform } from 'framer-motion';
import { useTheme } from '../../context/ThemeContext';

/**
 * ROTARY DIAL - Premium Mechanical Kitchen Timer
 *
 * 20-minute scale: 360° = 20 minutes
 *
 * Formula: angle = (timeRemaining / 1200) * 360
 *
 * | Duration | Starting Angle |
 * |----------|----------------|
 * | 20 min   | 360°           |
 * | 15 min   | 270°           |
 * | 12 min   | 216°           |
 * | 10 min   | 180°           |
 * | 8 min    | 144°           |
 * | 6 min    | 108°           |
 * | 0 sec    | 0° (finished)  |
 */

// Maximum dial scale: 20 minutes = 1200 seconds
const MAX_DIAL_SECONDS = 20 * 60; // 1200

const RotaryDial = ({
  isRunning = false,
  isPaused = false,
  isCompleted = false,
  progress = 0,
  duration = 0,
  timeRemaining = 0,
  onToggle,
  onReset,
}) => {
  const { tokens, isDark } = useTheme();

  // Spring for press feedback
  const scale = useSpring(1, { stiffness: 400, damping: 25 });
  const shadowBlur = useSpring(24, { stiffness: 400, damping: 25 });

  // Calculate rotation DIRECTLY from timeRemaining
  // Formula: angle = (timeRemaining / MAX_DIAL_SECONDS) * 360
  const rotation = (timeRemaining / MAX_DIAL_SECONDS) * 360;

  // Handle press feedback
  const handlePressStart = () => {
    scale.set(0.97);
    shadowBlur.set(16);
  };

  const handlePressEnd = () => {
    scale.set(1);
    shadowBlur.set(24);
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

  // Premium color scheme based on theme
  const dialColors = useMemo(() => isDark
    ? {
        // Dark mode - deep metallic blue
        outerRing: 'linear-gradient(145deg, #1A3A5A 0%, #0F2A4A 40%, #0A1F38 100%)',
        outerShadow: '0 12px 40px rgba(0,0,0,0.6), 0 4px 12px rgba(0,0,0,0.4)',
        middleRing: 'linear-gradient(145deg, #2A4A6A 0%, #1F3F5F 50%, #1A3A5A 100%)',
        innerKnob: 'linear-gradient(145deg, #3A5A7A 0%, #2A4A6A 50%, #1F3F5F 100%)',
        highlight: 'rgba(123, 191, 239, 0.4)',
        highlightStrong: 'rgba(123, 191, 239, 0.6)',
        shadow: 'rgba(0, 0, 0, 0.7)',
        glow: tokens.accent.primary,
        glowOuter: `0 0 60px ${tokens.accent.primary}40, 0 0 100px ${tokens.accent.primary}20`,
        text: tokens.text.primary,
        indicator: tokens.accent.primary,
        tickMark: 'rgba(255, 255, 255, 0.25)',
        tickMarkActive: 'rgba(123, 191, 239, 0.6)',
        bevel: 'inset 0 2px 4px rgba(255,255,255,0.15), inset 0 -2px 4px rgba(0,0,0,0.3)',
      }
    : {
        // Light mode - warm metallic cream
        outerRing: 'linear-gradient(145deg, #D8D0C8 0%, #C8C0B8 40%, #B8B0A8 100%)',
        outerShadow: '0 12px 40px rgba(0,0,0,0.15), 0 4px 12px rgba(0,0,0,0.08)',
        middleRing: 'linear-gradient(145deg, #F0E8E0 0%, #E8E0D8 50%, #DDD5CD 100%)',
        innerKnob: 'linear-gradient(145deg, #FFFFFF 0%, #F8F0E8 50%, #EDE5DD 100%)',
        highlight: 'rgba(255, 255, 255, 0.9)',
        highlightStrong: 'rgba(255, 255, 255, 1)',
        shadow: 'rgba(0, 0, 0, 0.2)',
        glow: tokens.accent.primary,
        glowOuter: `0 0 40px ${tokens.accent.glow}, 0 0 80px ${tokens.accent.glow}50`,
        text: tokens.text.primary,
        indicator: tokens.accent.primary,
        tickMark: 'rgba(0, 0, 0, 0.12)',
        tickMarkActive: 'rgba(224, 123, 103, 0.5)',
        bevel: 'inset 0 2px 6px rgba(255,255,255,0.8), inset 0 -2px 6px rgba(0,0,0,0.08)',
      }
  , [isDark, tokens]);

  const dialSize = 160;
  const middleSize = 130;
  const knobSize = 90;

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
      {/* Outer glow effect */}
      <Box
        sx={{
          position: 'absolute',
          width: dialSize + 60,
          height: dialSize + 60,
          borderRadius: '50%',
          background: `radial-gradient(circle, ${dialColors.glow}${isRunning ? '30' : '15'} 0%, transparent 70%)`,
          filter: 'blur(20px)',
          opacity: isRunning ? 1 : 0.5,
          transition: 'opacity 0.3s ease',
        }}
      />

      {/* Outer ring - base shadow ring */}
      <Box
        sx={{
          position: 'absolute',
          width: dialSize,
          height: dialSize,
          borderRadius: '50%',
          background: dialColors.outerRing,
          boxShadow: `
            ${dialColors.outerShadow},
            inset 0 -3px 8px rgba(0,0,0,0.3),
            inset 0 3px 8px ${dialColors.highlight}
          `,
        }}
      />

      {/* Middle rotating ring */}
      <motion.div
        style={{
          position: 'absolute',
          width: middleSize,
          height: middleSize,
          borderRadius: '50%',
          background: dialColors.middleRing,
          boxShadow: `
            ${dialColors.bevel},
            0 4px 16px ${dialColors.shadow}
          `,
          // DIRECT rotation from timeRemaining - NO animation except when running
          transform: `rotate(${rotation}deg)`,
          transition: isRunning ? 'transform 1s linear' : 'none',
        }}
      >
        {/* Light reflection overlay */}
        <Box
          sx={{
            position: 'absolute',
            top: '5%',
            left: '10%',
            width: '40%',
            height: '25%',
            borderRadius: '50%',
            background: `linear-gradient(180deg, ${dialColors.highlightStrong} 0%, transparent 100%)`,
            filter: 'blur(8px)',
            opacity: 0.4,
            pointerEvents: 'none',
          }}
        />

        {/* Indicator dot - premium style */}
        <Box
          sx={{
            position: 'absolute',
            top: 10,
            left: '50%',
            transform: 'translateX(-50%)',
            width: 10,
            height: 10,
            borderRadius: '50%',
            bgcolor: dialColors.indicator,
            boxShadow: isRunning
              ? `
                0 0 12px ${dialColors.indicator},
                0 0 24px ${dialColors.indicator},
                inset 0 1px 2px rgba(255,255,255,0.5)
              `
              : `
                0 0 6px ${dialColors.indicator}80,
                inset 0 1px 2px rgba(255,255,255,0.3),
                0 2px 4px rgba(0,0,0,0.3)
              `,
            transition: 'box-shadow 0.3s ease',
          }}
        />

        {/* Tick marks - 12 positions */}
        {[...Array(12)].map((_, i) => {
          const isMainTick = i % 3 === 0; // Main tick at 0°, 90°, 180°, 270°
          return (
            <Box
              key={i}
              sx={{
                position: 'absolute',
                top: '50%',
                left: '50%',
                width: isMainTick ? 3 : 2,
                height: isMainTick ? 10 : 6,
                bgcolor: isRunning ? dialColors.tickMarkActive : dialColors.tickMark,
                borderRadius: 1,
                transform: `rotate(${i * 30}deg) translateY(-${middleSize / 2 - (isMainTick ? 14 : 10)}px)`,
                transformOrigin: '0 0',
                transition: 'background-color 0.3s ease',
              }}
            />
          );
        })}
      </motion.div>

      {/* Inner knob - pressable button */}
      <motion.button
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
          background: dialColors.innerKnob,
          scale,
          boxShadow: useTransform(
            shadowBlur,
            (v) => `
              0 ${v * 0.5}px ${v}px ${dialColors.shadow},
              ${dialColors.bevel}
            `
          ),
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
            top: '12%',
            left: '15%',
            width: '35%',
            height: '20%',
            borderRadius: '50%',
            background: `linear-gradient(180deg, ${dialColors.highlightStrong} 0%, transparent 100%)`,
            filter: 'blur(4px)',
            opacity: 0.5,
            pointerEvents: 'none',
          }}
        />

        {/* Circular inner bevel */}
        <Box
          sx={{
            position: 'absolute',
            inset: 4,
            borderRadius: '50%',
            background: 'transparent',
            boxShadow: isDark
              ? 'inset 0 2px 4px rgba(255,255,255,0.1), inset 0 -2px 4px rgba(0,0,0,0.2)'
              : 'inset 0 2px 4px rgba(255,255,255,0.6), inset 0 -2px 4px rgba(0,0,0,0.05)',
            pointerEvents: 'none',
          }}
        />

        {/* Label */}
        <Box
          component="span"
          sx={{
            fontSize: '0.875rem',
            fontWeight: 700,
            color: dialColors.text,
            letterSpacing: '0.02em',
            position: 'relative',
            zIndex: 1,
            textShadow: isDark
              ? '0 1px 2px rgba(0,0,0,0.3)'
              : '0 1px 1px rgba(255,255,255,0.5)',
          }}
        >
          {getLabel()}
        </Box>
      </motion.button>

      {/* Completion glow ring */}
      {isCompleted && (
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          style={{
            position: 'absolute',
            width: dialSize + 24,
            height: dialSize + 24,
            borderRadius: '50%',
            border: `3px solid ${tokens.success}`,
            boxShadow: `
              0 0 30px ${tokens.success}60,
              inset 0 0 20px ${tokens.success}30
            `,
          }}
        />
      )}
    </Box>
  );
};

export default RotaryDial;
