import { Box, Typography } from '@mui/material';
import { motion } from 'framer-motion';
import { EGG_PRESETS, formatTime } from '../../utils/constants';
import { useTheme } from '../../context/ThemeContext';

/**
 * EGG SELECTOR - Premium Pill Segmented Control
 *
 * Modern glass/cream pill buttons for egg type selection.
 * Single source of truth: all state comes from TimerContext via props.
 * No local state - just displays and triggers callbacks.
 *
 * Features:
 * - Glass effect in dark mode
 * - Soft cream elevated style in light mode
 * - Active state glow
 * - Smooth hover animation
 * - Clear visual selected state
 */

const EggSelector = ({
  selected,        // Currently selected preset ID from TimerContext
  customTime,      // Custom time value from TimerContext
  useCustom,       // Boolean from TimerContext
  onSelect,        // Calls TimerContext.selectPreset(presetId)
  onCustomSelect,  // Calls TimerContext.setCustomDuration(customTime)
  disabled = false,
}) => {
  const { tokens, isDark } = useTheme();
  const presets = Object.values(EGG_PRESETS);

  // Type colors for visual indicators
  const typeColors = {
    soft: isDark ? '#7BBFEF' : '#FFB84D',
    medium: isDark ? '#5BA4D9' : '#FF8C42',
    hard: isDark ? '#4A90C7' : '#E85D4C',
    custom: tokens.accent.primary,
  };

  // Premium button styling
  const getButtonStyle = (isSelected) => ({
    // Base styles
    position: 'relative',
    flex: 1,
    minWidth: 72,
    py: 1.5,
    px: 1,
    border: 'none',
    borderRadius: 3,
    cursor: disabled ? 'default' : 'pointer',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: 0.5,
    opacity: disabled ? 0.5 : 1,
    WebkitTapHighlightColor: 'transparent',
    touchAction: 'manipulation',
    userSelect: 'none',
    transition: 'all 0.2s ease',

    // Theme-aware background
    background: isSelected
      ? isDark
        ? 'rgba(91, 164, 217, 0.2)'
        : 'rgba(255, 255, 255, 0.95)'
      : 'transparent',

    // Selected state glow
    boxShadow: isSelected
      ? isDark
        ? `0 0 20px ${tokens.accent.glow}, inset 0 1px 0 rgba(255,255,255,0.1)`
        : '0 4px 16px rgba(0, 0, 0, 0.1), 0 1px 4px rgba(0, 0, 0, 0.05)'
      : 'none',

    // Border for selected
    outline: isSelected
      ? isDark
        ? `1px solid ${tokens.accent.primary}50`
        : '1px solid rgba(0, 0, 0, 0.04)'
      : 'none',

    '&:hover': !disabled && {
      background: isSelected
        ? isDark
          ? 'rgba(91, 164, 217, 0.25)'
          : 'rgba(255, 255, 255, 1)'
        : isDark
          ? 'rgba(255, 255, 255, 0.05)'
          : 'rgba(0, 0, 0, 0.02)',
    },
  });

  return (
    <Box
      sx={{
        display: 'flex',
        gap: 0.75,
        p: 0.75,
        borderRadius: 4,
        // Container glass/cream background
        background: isDark
          ? 'rgba(255, 255, 255, 0.06)'
          : 'rgba(255, 255, 255, 0.7)',
        backdropFilter: 'blur(20px)',
        WebkitBackdropFilter: 'blur(20px)',
        border: isDark
          ? '1px solid rgba(255, 255, 255, 0.1)'
          : '1px solid rgba(0, 0, 0, 0.04)',
        boxShadow: isDark
          ? 'inset 0 1px 0 rgba(255,255,255,0.05)'
          : '0 4px 24px rgba(0, 0, 0, 0.06)',
      }}
    >
      {/* Preset Buttons */}
      {presets.map((preset) => {
        const isSelected = !useCustom && selected === preset.id;
        const dotColor = typeColors[preset.id];

        return (
          <Box
            key={preset.id}
            component={motion.button}
            onClick={() => {
              if (disabled) return;
              onSelect(preset.id);
            }}
            whileHover={{ scale: disabled ? 1 : 1.02 }}
            whileTap={{ scale: disabled ? 1 : 0.96 }}
            sx={getButtonStyle(isSelected)}
          >
            {/* Colored dot indicator */}
            <Box
              sx={{
                width: 8,
                height: 8,
                borderRadius: '50%',
                bgcolor: dotColor,
                opacity: isSelected ? 1 : 0.4,
                transition: 'all 0.2s',
                boxShadow: isSelected
                  ? `0 0 8px ${dotColor}, 0 0 16px ${dotColor}50`
                  : 'none',
                pointerEvents: 'none',
              }}
            />

            {/* Label */}
            <Typography
              sx={{
                fontSize: '0.75rem',
                fontWeight: isSelected ? 700 : 500,
                color: isSelected ? tokens.text.primary : tokens.text.secondary,
                transition: 'all 0.2s',
                pointerEvents: 'none',
                letterSpacing: '0.01em',
              }}
            >
              {preset.id.charAt(0).toUpperCase() + preset.id.slice(1)}
            </Typography>

            {/* Duration */}
            <Typography
              sx={{
                fontSize: '0.625rem',
                color: isSelected ? tokens.text.secondary : tokens.text.tertiary,
                fontWeight: 500,
                pointerEvents: 'none',
              }}
            >
              {Math.floor(preset.duration / 60)} min
            </Typography>
          </Box>
        );
      })}

      {/* Custom Button */}
      <Box
        component={motion.button}
        onClick={() => {
          if (disabled) return;
          onCustomSelect();
        }}
        whileHover={{ scale: disabled ? 1 : 1.02 }}
        whileTap={{ scale: disabled ? 1 : 0.96 }}
        sx={getButtonStyle(useCustom)}
      >
        {/* Accent dot */}
        <Box
          sx={{
            width: 8,
            height: 8,
            borderRadius: '50%',
            bgcolor: tokens.accent.primary,
            opacity: useCustom ? 1 : 0.4,
            transition: 'all 0.2s',
            boxShadow: useCustom
              ? `0 0 8px ${tokens.accent.primary}, 0 0 16px ${tokens.accent.glow}`
              : 'none',
            pointerEvents: 'none',
          }}
        />

        {/* Label */}
        <Typography
          sx={{
            fontSize: '0.75rem',
            fontWeight: useCustom ? 700 : 500,
            color: useCustom ? tokens.text.primary : tokens.text.secondary,
            transition: 'all 0.2s',
            pointerEvents: 'none',
            letterSpacing: '0.01em',
          }}
        >
          Custom
        </Typography>

        {/* Time */}
        <Typography
          sx={{
            fontSize: '0.625rem',
            color: useCustom ? tokens.text.secondary : tokens.text.tertiary,
            fontWeight: 500,
            pointerEvents: 'none',
          }}
        >
          {formatTime(customTime)}
        </Typography>
      </Box>
    </Box>
  );
};

export default EggSelector;
