import { Box, Typography, Slider } from '@mui/material';
import { motion } from 'framer-motion';
import { formatTime } from '../../utils/constants';
import { useTheme } from '../../context/ThemeContext';

/**
 * CUSTOM TIME PICKER - THEMED
 *
 * Clean, minimal time selector with +/- buttons and slider.
 * Light: White card with coral accents
 * Dark: Glass card with blue accents
 */

const CustomTimePicker = ({ value, onChange, disabled = false }) => {
  const { tokens, isDark } = useTheme();

  const minTime = 60; // 1 minute
  const maxTime = 1200; // 20 minutes
  const step = 30; // 30 second increments

  const handleIncrement = () => {
    onChange(Math.min(value + step, maxTime));
  };

  const handleDecrement = () => {
    onChange(Math.max(value - step, minTime));
  };

  return (
    <motion.div
      initial={{ opacity: 0, height: 0 }}
      animate={{ opacity: 1, height: 'auto' }}
      exit={{ opacity: 0, height: 0 }}
      transition={{ duration: 0.2 }}
    >
      <Box
        sx={{
          bgcolor: isDark ? tokens.bg.card : tokens.bg.cardSolid,
          borderRadius: 4,
          p: 3,
          boxShadow: tokens.shadow.soft,
          width: '100%',
          maxWidth: 340,
          backdropFilter: isDark ? 'blur(20px)' : 'none',
          border: isDark ? `1px solid ${tokens.surface.navBorder}` : 'none',
        }}
      >
        {/* Time display with +/- buttons */}
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: 2,
            mb: 2.5,
          }}
        >
          {/* Minus button */}
          <motion.button
            onClick={handleDecrement}
            disabled={disabled || value <= minTime}
            whileHover={{ scale: disabled ? 1 : 1.05 }}
            whileTap={{ scale: disabled ? 1 : 0.95 }}
            style={{
              width: 48,
              height: 48,
              borderRadius: 14,
              border: 'none',
              background: isDark ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.04)',
              cursor: disabled || value <= minTime ? 'default' : 'pointer',
              opacity: disabled || value <= minTime ? 0.4 : 1,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '1.5rem',
              color: tokens.text.secondary,
            }}
          >
            −
          </motion.button>

          {/* Time display */}
          <Typography
            sx={{
              fontFamily: '"SF Mono", Monaco, monospace',
              fontSize: '2.25rem',
              fontWeight: 700,
              color: tokens.text.primary,
              minWidth: 110,
              textAlign: 'center',
              letterSpacing: '-0.02em',
            }}
          >
            {formatTime(value)}
          </Typography>

          {/* Plus button */}
          <motion.button
            onClick={handleIncrement}
            disabled={disabled || value >= maxTime}
            whileHover={{ scale: disabled ? 1 : 1.05 }}
            whileTap={{ scale: disabled ? 1 : 0.95 }}
            style={{
              width: 48,
              height: 48,
              borderRadius: 14,
              border: 'none',
              background: isDark ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.04)',
              cursor: disabled || value >= maxTime ? 'default' : 'pointer',
              opacity: disabled || value >= maxTime ? 0.4 : 1,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '1.5rem',
              color: tokens.text.secondary,
            }}
          >
            +
          </motion.button>
        </Box>

        {/* Slider */}
        <Slider
          value={value}
          onChange={(_, newValue) => onChange(newValue)}
          disabled={disabled}
          min={minTime}
          max={maxTime}
          step={step}
          sx={{
            color: tokens.accent.primary,
            height: 6,
            '& .MuiSlider-track': {
              border: 'none',
              borderRadius: 3,
            },
            '& .MuiSlider-rail': {
              bgcolor: isDark ? 'rgba(255,255,255,0.12)' : 'rgba(0,0,0,0.08)',
              borderRadius: 3,
            },
            '& .MuiSlider-thumb': {
              width: 22,
              height: 22,
              bgcolor: isDark ? tokens.accent.primary : '#FFFFFF',
              border: isDark ? 'none' : `2px solid ${tokens.accent.primary}`,
              boxShadow: isDark
                ? `0 0 10px ${tokens.accent.glow}`
                : `0 2px 6px ${tokens.accent.glow}`,
              '&:hover, &.Mui-focusVisible': {
                boxShadow: isDark
                  ? `0 0 16px ${tokens.accent.glow}`
                  : `0 0 0 8px ${tokens.accent.glow}`,
              },
            },
          }}
        />

        {/* Min/Max labels */}
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            mt: 1,
          }}
        >
          <Typography
            sx={{
              fontSize: '0.6875rem',
              color: tokens.text.tertiary,
              fontWeight: 500,
            }}
          >
            1:00
          </Typography>
          <Typography
            sx={{
              fontSize: '0.6875rem',
              color: tokens.text.tertiary,
              fontWeight: 500,
            }}
          >
            20:00
          </Typography>
        </Box>
      </Box>
    </motion.div>
  );
};

export default CustomTimePicker;
