import { Box, Typography } from '@mui/material';
import { motion } from 'framer-motion';
import { useTheme } from '../../../context/ThemeContext';

/**
 * CONTROL BUTTONS - HOT SPRING
 *
 * Smooth stone-like buttons for time presets.
 * Warm, minimal, spa aesthetic.
 */

const PRESETS = [
  { id: 'soft', label: 'Soft', time: 360 },
  { id: 'medium', label: 'Medium', time: 420 },
  { id: 'hard', label: 'Hard', time: 600 },
];

const PresetButton = ({ preset, isSelected, onClick, tokens, isDark, disabled }) => (
  <motion.button
    onClick={onClick}
    disabled={disabled}
    whileHover={disabled ? {} : { scale: 1.03, y: -1 }}
    whileTap={disabled ? {} : { scale: 0.97, y: 1 }}
    style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      gap: 4,
      width: 72,
      height: 72,
      padding: 0,
      border: 'none',
      borderRadius: 18,
      background: isSelected
        ? tokens.stove?.knobSelected
        : tokens.stove?.knob,
      boxShadow: isDark
        ? isSelected
          ? `0 4px 16px rgba(0,0,0,0.4), inset 0 1px 2px rgba(255,255,255,0.1), 0 0 0 2px ${tokens.stove?.indicator}`
          : '0 4px 12px rgba(0,0,0,0.3), inset 0 1px 2px rgba(255,255,255,0.05)'
        : isSelected
          ? `0 4px 16px rgba(0,0,0,0.1), inset 0 1px 2px rgba(255,255,255,0.8), 0 0 0 2px ${tokens.stove?.indicator}`
          : '0 4px 12px rgba(0,0,0,0.08), inset 0 1px 2px rgba(255,255,255,0.6)',
      cursor: disabled ? 'default' : 'pointer',
      opacity: disabled ? 0.6 : 1,
      position: 'relative',
      WebkitTapHighlightColor: 'transparent',
      transition: 'box-shadow 0.2s ease, opacity 0.2s ease',
    }}
  >
    {/* Label */}
    <Typography
      sx={{
        fontSize: '0.75rem',
        fontWeight: 600,
        color: isSelected
          ? tokens.stove?.indicator
          : tokens.text.primary,
        letterSpacing: '0.01em',
      }}
    >
      {preset.label}
    </Typography>

    {/* Time display */}
    <Typography
      sx={{
        fontSize: '0.6875rem',
        color: tokens.text.tertiary,
        fontWeight: 500,
      }}
    >
      {Math.floor(preset.time / 60)}m
    </Typography>
  </motion.button>
);

const CustomButton = ({ isSelected, customTime, onClick, tokens, isDark, disabled }) => {
  const mins = Math.floor(customTime / 60);
  const secs = customTime % 60;

  return (
    <motion.button
      onClick={onClick}
      disabled={disabled}
      whileHover={disabled ? {} : { scale: 1.03, y: -1 }}
      whileTap={disabled ? {} : { scale: 0.97, y: 1 }}
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 4,
        width: 72,
        height: 72,
        padding: 0,
        border: 'none',
        borderRadius: 18,
        background: isSelected
          ? tokens.stove?.knobSelected
          : tokens.stove?.knob,
        boxShadow: isDark
          ? isSelected
            ? `0 4px 16px rgba(0,0,0,0.4), inset 0 1px 2px rgba(255,255,255,0.1), 0 0 0 2px ${tokens.stove?.indicator}`
            : '0 4px 12px rgba(0,0,0,0.3), inset 0 1px 2px rgba(255,255,255,0.05)'
          : isSelected
            ? `0 4px 16px rgba(0,0,0,0.1), inset 0 1px 2px rgba(255,255,255,0.8), 0 0 0 2px ${tokens.stove?.indicator}`
            : '0 4px 12px rgba(0,0,0,0.08), inset 0 1px 2px rgba(255,255,255,0.6)',
        cursor: disabled ? 'default' : 'pointer',
        opacity: disabled ? 0.6 : 1,
        position: 'relative',
        WebkitTapHighlightColor: 'transparent',
        transition: 'box-shadow 0.2s ease, opacity 0.2s ease',
      }}
    >
      {/* Label */}
      <Typography
        sx={{
          fontSize: '0.75rem',
          fontWeight: 600,
          color: isSelected
            ? tokens.stove?.indicator
            : tokens.text.primary,
          letterSpacing: '0.01em',
        }}
      >
        Custom
      </Typography>

      {/* Time display */}
      <Typography
        sx={{
          fontSize: '0.6875rem',
          color: tokens.text.tertiary,
          fontWeight: 500,
        }}
      >
        {mins}:{secs.toString().padStart(2, '0')}
      </Typography>
    </motion.button>
  );
};

const StoveControlButtons = ({
  selected,
  customTime,
  useCustom,
  onSelect,
  onCustomSelect,
  disabled = false,
}) => {
  const { tokens, isDark } = useTheme();

  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        gap: 1.5,
        px: 2,
      }}
    >
      {PRESETS.map((preset) => (
        <PresetButton
          key={preset.id}
          preset={preset}
          isSelected={selected === preset.id && !useCustom}
          onClick={() => onSelect(preset.id)}
          tokens={tokens}
          isDark={isDark}
          disabled={disabled}
        />
      ))}
      <CustomButton
        isSelected={useCustom}
        customTime={customTime}
        onClick={onCustomSelect}
        tokens={tokens}
        isDark={isDark}
        disabled={disabled}
      />
    </Box>
  );
};

export default StoveControlButtons;
