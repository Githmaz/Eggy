import { useState, useRef } from 'react';
import { Box } from '@mui/material';
import { motion } from 'framer-motion';
import { useTheme } from '../../context/ThemeContext';

/**
 * CUSTOM TIME PICKER - Compact Premium Design
 *
 * Inspired by: Apple timer UI, smart oven interfaces
 * Style: Clean, mechanical, minimal
 *
 * Features:
 * - Compact horizontal layout
 * - Subtle +/- buttons
 * - Thin slider with minimal thumb
 * - Smooth micro-interactions only
 */

const CustomTimePicker = ({ value, onChange, disabled = false }) => {
  const { tokens, isDark } = useTheme();
  const sliderRef = useRef(null);
  const [isDragging, setIsDragging] = useState(false);

  const minTime = 60;
  const maxTime = 1200;
  const step = 30;

  const progress = ((value - minTime) / (maxTime - minTime)) * 100;

  // Format time
  const mins = Math.floor(value / 60);
  const secs = value % 60;
  const timeStr = `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;

  const handleIncrement = () => {
    if (!disabled && value < maxTime) {
      onChange(Math.min(value + step, maxTime));
    }
  };

  const handleDecrement = () => {
    if (!disabled && value > minTime) {
      onChange(Math.max(value - step, minTime));
    }
  };

  const handleSliderInteraction = (e) => {
    const rect = sliderRef.current?.getBoundingClientRect();
    if (!rect) return;

    const clientX = e.clientX ?? e.touches?.[0]?.clientX;
    if (clientX === undefined) return;

    const relativeX = Math.max(0, Math.min(1, (clientX - rect.left) / rect.width));
    const newValue = Math.round((relativeX * (maxTime - minTime) + minTime) / step) * step;
    onChange(Math.max(minTime, Math.min(maxTime, newValue)));
  };

  // Compact button component
  const CompactButton = ({ onClick, isDisabled, children }) => (
    <motion.button
      onClick={onClick}
      disabled={isDisabled}
      whileTap={!isDisabled ? { scale: 0.9 } : {}}
      style={{
        width: 32,
        height: 32,
        borderRadius: '50%',
        border: 'none',
        cursor: isDisabled ? 'default' : 'pointer',
        opacity: isDisabled ? 0.3 : 1,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontSize: '1.125rem',
        fontWeight: 400,
        color: tokens.text.secondary,
        background: isDark
          ? 'rgba(255,255,255,0.06)'
          : 'rgba(0,0,0,0.04)',
        transition: 'background 0.15s ease, opacity 0.15s ease',
      }}
    >
      {children}
    </motion.button>
  );

  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 4 }}
      transition={{ duration: 0.2, ease: 'easeOut' }}
    >
      <Box
        sx={{
          width: '100%',
          maxWidth: 280,
          px: 2,
          py: 1.5,
          borderRadius: 3,
          background: isDark
            ? 'rgba(255,255,255,0.04)'
            : 'rgba(255,255,255,0.6)',
          backdropFilter: 'blur(12px)',
          WebkitBackdropFilter: 'blur(12px)',
          border: `1px solid ${isDark ? 'rgba(255,255,255,0.06)' : 'rgba(0,0,0,0.04)'}`,
        }}
      >
        {/* Time display row */}
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            mb: 1.5,
          }}
        >
          <CompactButton
            onClick={handleDecrement}
            isDisabled={disabled || value <= minTime}
          >
            −
          </CompactButton>

          {/* Time display */}
          <Box
            sx={{
              fontFamily: '"SF Mono", "Roboto Mono", monospace',
              fontSize: '1.5rem',
              fontWeight: 600,
              color: tokens.text.primary,
              letterSpacing: '-0.02em',
              minWidth: 80,
              textAlign: 'center',
            }}
          >
            <motion.span
              key={timeStr}
              initial={{ opacity: 0.5 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.15 }}
            >
              {timeStr}
            </motion.span>
          </Box>

          <CompactButton
            onClick={handleIncrement}
            isDisabled={disabled || value >= maxTime}
          >
            +
          </CompactButton>
        </Box>

        {/* Slider */}
        <Box
          ref={sliderRef}
          onMouseDown={(e) => {
            if (disabled) return;
            setIsDragging(true);
            handleSliderInteraction(e);
          }}
          onMouseMove={(e) => isDragging && handleSliderInteraction(e)}
          onMouseUp={() => setIsDragging(false)}
          onMouseLeave={() => setIsDragging(false)}
          onTouchStart={(e) => {
            if (disabled) return;
            setIsDragging(true);
            handleSliderInteraction(e);
          }}
          onTouchMove={(e) => isDragging && handleSliderInteraction(e)}
          onTouchEnd={() => setIsDragging(false)}
          sx={{
            position: 'relative',
            height: 20,
            cursor: disabled ? 'default' : 'pointer',
            display: 'flex',
            alignItems: 'center',
            touchAction: 'none',
          }}
        >
          {/* Track */}
          <Box
            sx={{
              position: 'absolute',
              left: 0,
              right: 0,
              height: 4,
              borderRadius: 2,
              background: isDark
                ? 'rgba(255,255,255,0.08)'
                : 'rgba(0,0,0,0.06)',
              overflow: 'hidden',
            }}
          >
            {/* Fill */}
            <motion.div
              animate={{ width: `${progress}%` }}
              transition={{ duration: 0.1, ease: 'easeOut' }}
              style={{
                height: '100%',
                background: tokens.accent.primary,
                borderRadius: 2,
              }}
            />
          </Box>

          {/* Thumb */}
          <motion.div
            animate={{
              left: `${progress}%`,
              scale: isDragging ? 1.1 : 1,
            }}
            transition={{ duration: 0.1, ease: 'easeOut' }}
            style={{
              position: 'absolute',
              width: 16,
              height: 16,
              marginLeft: -8,
              borderRadius: '50%',
              background: isDark
                ? tokens.accent.primary
                : '#FFFFFF',
              border: isDark
                ? 'none'
                : `2px solid ${tokens.accent.primary}`,
              boxShadow: isDark
                ? `0 2px 6px rgba(0,0,0,0.3)`
                : `0 2px 6px rgba(0,0,0,0.15)`,
            }}
          />
        </Box>

        {/* Labels */}
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            mt: 0.75,
          }}
        >
          <Box
            component="span"
            sx={{
              fontSize: '0.625rem',
              color: tokens.text.tertiary,
              fontWeight: 500,
            }}
          >
            1 min
          </Box>
          <Box
            component="span"
            sx={{
              fontSize: '0.625rem',
              color: tokens.text.tertiary,
              fontWeight: 500,
            }}
          >
            20 min
          </Box>
        </Box>
      </Box>
    </motion.div>
  );
};

export default CustomTimePicker;
