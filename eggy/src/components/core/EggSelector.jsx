import { Box, Typography } from '@mui/material';
import { motion } from 'framer-motion';
import { EGG_PRESETS, formatTime } from '../../utils/constants';
import { useTheme } from '../../context/ThemeContext';

/**
 * EGG SELECTOR - THEMED
 *
 * Premium segmented control for egg type selection.
 * Includes Soft / Medium / Hard presets + Custom option.
 *
 * Fixed: Improved click handling for reliable touch/click response
 */

const EggSelector = ({ selected, customTime, useCustom, onSelect, onCustomSelect, disabled = false }) => {
  const { tokens, isDark } = useTheme();
  const presets = Object.values(EGG_PRESETS);

  // Calculate selected index (including custom as last option)
  const allOptions = [...presets, { id: 'custom', name: 'Custom' }];
  const selectedIndex = useCustom
    ? allOptions.length - 1
    : presets.findIndex((p) => p.id === selected);

  // Egg type visual indicators
  const typeColors = {
    soft: isDark ? '#7BBFEF' : '#FFB84D',
    medium: isDark ? '#5BA4D9' : '#FF8C42',
    hard: isDark ? '#4A90C7' : '#E85D4C',
    custom: tokens.accent.primary,
  };

  // Handle preset click
  const handlePresetClick = (presetId) => {
    if (disabled) return;
    onSelect(presetId);
  };

  // Handle custom click
  const handleCustomClick = () => {
    if (disabled) return;
    onCustomSelect();
  };

  return (
    <Box
      sx={{
        position: 'relative',
        display: 'inline-flex',
        bgcolor: isDark ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.04)',
        borderRadius: 4,
        p: 0.5,
        backdropFilter: 'blur(10px)',
        border: `1px solid ${isDark ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.04)'}`,
      }}
    >
      {/* Sliding indicator - MUST have pointerEvents: none */}
      <motion.div
        layoutId="selector-indicator"
        initial={false}
        animate={{
          x: `${selectedIndex * 100}%`,
        }}
        transition={{
          type: 'spring',
          stiffness: 400,
          damping: 30,
        }}
        style={{
          position: 'absolute',
          top: 4,
          left: 4,
          width: `calc(${100 / allOptions.length}% - ${8 / allOptions.length}px)`,
          height: 'calc(100% - 8px)',
          backgroundColor: isDark ? 'rgba(255,255,255,0.12)' : '#FFFFFF',
          borderRadius: 12,
          boxShadow: isDark
            ? `0 2px 8px rgba(0,0,0,0.3), inset 0 1px 0 rgba(255,255,255,0.1)`
            : '0 2px 8px rgba(0,0,0,0.08), 0 1px 2px rgba(0,0,0,0.04)',
          zIndex: 0,
          pointerEvents: 'none', // Critical: prevents click interception
        }}
      />

      {/* Preset Options */}
      {presets.map((preset) => {
        const isSelected = !useCustom && selected === preset.id;
        const dotColor = typeColors[preset.id];

        return (
          <Box
            key={preset.id}
            component={motion.button}
            onClick={() => handlePresetClick(preset.id)}
            whileHover={{ scale: disabled ? 1 : 1.02 }}
            whileTap={{ scale: disabled ? 1 : 0.95 }}
            sx={{
              position: 'relative',
              zIndex: 2,
              flex: 1,
              minWidth: 80,
              p: '14px 16px',
              border: 'none',
              background: 'transparent',
              cursor: disabled ? 'default' : 'pointer',
              borderRadius: 3,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: 0.5,
              opacity: disabled ? 0.5 : 1,
              WebkitTapHighlightColor: 'transparent',
              touchAction: 'manipulation',
              userSelect: 'none',
              '&:active': {
                transform: 'scale(0.95)',
              },
            }}
          >
            {/* Dot indicator - no pointer events */}
            <Box
              sx={{
                width: 8,
                height: 8,
                borderRadius: '50%',
                bgcolor: dotColor,
                opacity: isSelected ? 1 : 0.4,
                transition: 'opacity 0.2s',
                boxShadow: isSelected && isDark ? `0 0 8px ${dotColor}` : 'none',
                pointerEvents: 'none',
              }}
            />

            {/* Label - no pointer events */}
            <Typography
              sx={{
                fontSize: '0.8125rem',
                fontWeight: isSelected ? 700 : 500,
                color: isSelected ? tokens.text.primary : tokens.text.secondary,
                transition: 'all 0.2s',
                pointerEvents: 'none',
              }}
            >
              {preset.id.charAt(0).toUpperCase() + preset.id.slice(1)}
            </Typography>

            {/* Duration - no pointer events */}
            <Typography
              sx={{
                fontSize: '0.6875rem',
                color: tokens.text.tertiary,
                fontWeight: 500,
                pointerEvents: 'none',
              }}
            >
              {Math.floor(preset.duration / 60)} min
            </Typography>
          </Box>
        );
      })}

      {/* Custom Option */}
      <Box
        component={motion.button}
        onClick={handleCustomClick}
        whileHover={{ scale: disabled ? 1 : 1.02 }}
        whileTap={{ scale: disabled ? 1 : 0.95 }}
        sx={{
          position: 'relative',
          zIndex: 2,
          flex: 1,
          minWidth: 80,
          p: '14px 16px',
          border: 'none',
          background: 'transparent',
          cursor: disabled ? 'default' : 'pointer',
          borderRadius: 3,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: 0.5,
          opacity: disabled ? 0.5 : 1,
          WebkitTapHighlightColor: 'transparent',
          touchAction: 'manipulation',
          userSelect: 'none',
          '&:active': {
            transform: 'scale(0.95)',
          },
        }}
      >
        <Box
          sx={{
            width: 8,
            height: 8,
            borderRadius: '50%',
            bgcolor: tokens.accent.primary,
            opacity: useCustom ? 1 : 0.4,
            transition: 'opacity 0.2s',
            boxShadow: useCustom && isDark ? `0 0 8px ${tokens.accent.primary}` : 'none',
            pointerEvents: 'none',
          }}
        />

        <Typography
          sx={{
            fontSize: '0.8125rem',
            fontWeight: useCustom ? 700 : 500,
            color: useCustom ? tokens.text.primary : tokens.text.secondary,
            transition: 'all 0.2s',
            pointerEvents: 'none',
          }}
        >
          Custom
        </Typography>

        <Typography
          sx={{
            fontSize: '0.6875rem',
            color: tokens.text.tertiary,
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
