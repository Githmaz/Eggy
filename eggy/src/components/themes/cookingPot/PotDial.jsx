import { useMemo } from 'react';
import { Box } from '@mui/material';
import { motion, useSpring, useTransform } from 'framer-motion';
import { useTheme } from '../../../context/ThemeContext';

/**
 * POT DIAL - Copper Rotary Dial integrated with pot rim
 *
 * 20-minute scale: 360° = 20 minutes
 * Matches mechanical dial functionality with copper/kitchen aesthetics.
 */

const MAX_DIAL_SECONDS = 20 * 60; // 1200

const PotDial = ({
  isRunning = false,
  isPaused = false,
  isCompleted = false,
  duration = 0,
  timeRemaining = 0,
  onToggle,
  onReset,
}) => {
  const { tokens, isDark } = useTheme();

  // Spring for press feedback
  const scale = useSpring(1, { stiffness: 400, damping: 25 });
  const shadowBlur = useSpring(24, { stiffness: 400, damping: 25 });

  // Calculate rotation from timeRemaining
  const rotation = (timeRemaining / MAX_DIAL_SECONDS) * 360;

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

  const getLabel = () => {
    if (isCompleted) return 'Reset';
    if (isRunning) return 'Pause';
    if (isPaused) return 'Resume';
    return 'Start';
  };

  // Copper/kitchen dial colors
  const dialColors = useMemo(() => isDark
    ? {
        outerRing: 'linear-gradient(145deg, #8B5A2B 0%, #654321 40%, #4A3020 100%)',
        outerShadow: '0 12px 40px rgba(0,0,0,0.6), 0 4px 12px rgba(0,0,0,0.4)',
        middleRing: 'linear-gradient(145deg, #A0642D 0%, #8B5A2B 50%, #7A4D24 100%)',
        innerKnob: 'linear-gradient(145deg, #CD853F 0%, #B87333 50%, #A0642D 100%)',
        highlight: 'rgba(255, 220, 180, 0.4)',
        highlightStrong: 'rgba(255, 220, 180, 0.6)',
        shadow: 'rgba(0, 0, 0, 0.7)',
        glow: tokens.accent.primary,
        glowOuter: `0 0 60px ${tokens.accent.primary}40, 0 0 100px ${tokens.accent.primary}20`,
        text: '#FFFFFF',
        indicator: '#FFD700',
        tickMark: 'rgba(255, 255, 255, 0.25)',
        tickMarkActive: 'rgba(255, 215, 0, 0.6)',
        bevel: 'inset 0 2px 4px rgba(255,220,180,0.2), inset 0 -2px 4px rgba(0,0,0,0.3)',
      }
    : {
        outerRing: 'linear-gradient(145deg, #CD853F 0%, #B87333 40%, #A0642D 100%)',
        outerShadow: '0 12px 40px rgba(74, 48, 32, 0.25), 0 4px 12px rgba(0,0,0,0.1)',
        middleRing: 'linear-gradient(145deg, #DDA15E 0%, #CD853F 50%, #B87333 100%)',
        innerKnob: 'linear-gradient(145deg, #F5DEB3 0%, #DDA15E 50%, #CD853F 100%)',
        highlight: 'rgba(255, 255, 255, 0.7)',
        highlightStrong: 'rgba(255, 255, 255, 0.9)',
        shadow: 'rgba(74, 48, 32, 0.3)',
        glow: tokens.accent.primary,
        glowOuter: `0 0 40px ${tokens.accent.glow}, 0 0 80px ${tokens.accent.glow}50`,
        text: '#3E2723',
        indicator: '#B87333',
        tickMark: 'rgba(62, 39, 35, 0.2)',
        tickMarkActive: 'rgba(184, 115, 51, 0.6)',
        bevel: 'inset 0 2px 6px rgba(255,255,255,0.6), inset 0 -2px 6px rgba(0,0,0,0.1)',
      }
  , [isDark, tokens]);

  const dialSize = 140;
  const middleSize = 115;
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
      {/* Outer glow */}
      <Box
        sx={{
          position: 'absolute',
          width: dialSize + 50,
          height: dialSize + 50,
          borderRadius: '50%',
          background: `radial-gradient(circle, ${dialColors.glow}${isRunning ? '30' : '15'} 0%, transparent 70%)`,
          filter: 'blur(16px)',
          opacity: isRunning ? 1 : 0.5,
          transition: 'opacity 0.3s ease',
        }}
      />

      {/* Outer copper ring */}
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
          transform: `rotate(${rotation}deg)`,
          transition: isRunning ? 'transform 1s linear' : 'none',
        }}
      >
        {/* Light reflection */}
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

        {/* Indicator dot */}
        <Box
          sx={{
            position: 'absolute',
            top: 8,
            left: '50%',
            transform: 'translateX(-50%)',
            width: 8,
            height: 8,
            borderRadius: '50%',
            bgcolor: dialColors.indicator,
            boxShadow: isRunning
              ? `0 0 10px ${dialColors.indicator}, 0 0 20px ${dialColors.indicator}`
              : `0 0 5px ${dialColors.indicator}80`,
            transition: 'box-shadow 0.3s ease',
          }}
        />

        {/* Tick marks */}
        {[...Array(12)].map((_, i) => {
          const isMainTick = i % 3 === 0;
          return (
            <Box
              key={i}
              sx={{
                position: 'absolute',
                top: '50%',
                left: '50%',
                width: isMainTick ? 3 : 2,
                height: isMainTick ? 9 : 5,
                bgcolor: isRunning ? dialColors.tickMarkActive : dialColors.tickMark,
                borderRadius: 1,
                transform: `rotate(${i * 30}deg) translateY(-${middleSize / 2 - (isMainTick ? 13 : 9)}px)`,
                transformOrigin: '0 0',
                transition: 'background-color 0.3s ease',
              }}
            />
          );
        })}
      </motion.div>

      {/* Inner knob button */}
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
        {/* Top highlight */}
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

        {/* Inner bevel */}
        <Box
          sx={{
            position: 'absolute',
            inset: 4,
            borderRadius: '50%',
            background: 'transparent',
            boxShadow: isDark
              ? 'inset 0 2px 4px rgba(255,220,180,0.15), inset 0 -2px 4px rgba(0,0,0,0.2)'
              : 'inset 0 2px 4px rgba(255,255,255,0.5), inset 0 -2px 4px rgba(0,0,0,0.08)',
            pointerEvents: 'none',
          }}
        />

        {/* Label */}
        <Box
          component="span"
          sx={{
            fontSize: '0.8125rem',
            fontWeight: 700,
            color: dialColors.text,
            letterSpacing: '0.02em',
            position: 'relative',
            zIndex: 1,
            textShadow: isDark
              ? '0 1px 2px rgba(0,0,0,0.4)'
              : '0 1px 1px rgba(255,255,255,0.4)',
          }}
        >
          {getLabel()}
        </Box>
      </motion.button>

      {/* Completion glow */}
      {isCompleted && (
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          style={{
            position: 'absolute',
            width: dialSize + 20,
            height: dialSize + 20,
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

export default PotDial;
