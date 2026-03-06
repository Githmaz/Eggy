import { Box, Typography } from '@mui/material';
import { motion } from 'framer-motion';
import { useTheme } from '../../../context/ThemeContext';

/**
 * STOVE KNOBS
 *
 * Metallic appliance-style buttons for egg presets.
 * Kitchen-themed version of the EggSelector.
 */

const PRESETS = [
  { id: 'soft', label: 'Soft', time: 360, icon: '🥚' },
  { id: 'medium', label: 'Medium', time: 420, icon: '🍳' },
  { id: 'hard', label: 'Hard', time: 600, icon: '🥏' },
];

const KnobButton = ({ preset, isSelected, onClick, tokens, isDark, disabled }) => {
  const knobColors = isDark
    ? {
        bg: isSelected
          ? 'linear-gradient(145deg, #5D4037 0%, #4A3020 100%)'
          : 'linear-gradient(145deg, #3E2723 0%, #2A1810 100%)',
        border: isSelected ? tokens.accent.primary : 'rgba(255,255,255,0.1)',
        text: isSelected ? tokens.accent.primary : tokens.text.secondary,
        shadow: '0 4px 12px rgba(0,0,0,0.4)',
        highlight: 'inset 0 1px 2px rgba(255,255,255,0.1)',
      }
    : {
        bg: isSelected
          ? 'linear-gradient(145deg, #F5DEB3 0%, #DDA15E 100%)'
          : 'linear-gradient(145deg, #FFFFFF 0%, #F5F5F5 100%)',
        border: isSelected ? tokens.accent.primary : 'rgba(0,0,0,0.08)',
        text: isSelected ? tokens.accent.primary : tokens.text.secondary,
        shadow: '0 4px 12px rgba(0,0,0,0.08)',
        highlight: 'inset 0 1px 2px rgba(255,255,255,0.8)',
      };

  return (
    <motion.button
      onClick={onClick}
      disabled={disabled}
      whileHover={disabled ? {} : { scale: 1.05, y: -2 }}
      whileTap={disabled ? {} : { scale: 0.95 }}
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: 4,
        padding: '10px 14px',
        border: `2px solid ${knobColors.border}`,
        borderRadius: 12,
        background: knobColors.bg,
        boxShadow: `${knobColors.shadow}, ${knobColors.highlight}`,
        cursor: disabled ? 'default' : 'pointer',
        opacity: disabled ? 0.6 : 1,
        WebkitTapHighlightColor: 'transparent',
        transition: 'border-color 0.2s ease, opacity 0.2s ease',
      }}
    >
      <span style={{ fontSize: '1.25rem' }}>{preset.icon}</span>
      <Typography
        sx={{
          fontSize: '0.6875rem',
          fontWeight: 600,
          color: knobColors.text,
          letterSpacing: '0.02em',
        }}
      >
        {preset.label}
      </Typography>
      <Typography
        sx={{
          fontSize: '0.625rem',
          color: tokens.text.tertiary,
        }}
      >
        {Math.floor(preset.time / 60)}m
      </Typography>
    </motion.button>
  );
};

const CustomKnob = ({ isSelected, customTime, onClick, tokens, isDark, disabled }) => {
  const knobColors = isDark
    ? {
        bg: isSelected
          ? 'linear-gradient(145deg, #5D4037 0%, #4A3020 100%)'
          : 'linear-gradient(145deg, #3E2723 0%, #2A1810 100%)',
        border: isSelected ? tokens.accent.primary : 'rgba(255,255,255,0.1)',
        text: isSelected ? tokens.accent.primary : tokens.text.secondary,
      }
    : {
        bg: isSelected
          ? 'linear-gradient(145deg, #F5DEB3 0%, #DDA15E 100%)'
          : 'linear-gradient(145deg, #FFFFFF 0%, #F5F5F5 100%)',
        border: isSelected ? tokens.accent.primary : 'rgba(0,0,0,0.08)',
        text: isSelected ? tokens.accent.primary : tokens.text.secondary,
      };

  const mins = Math.floor(customTime / 60);
  const secs = customTime % 60;

  return (
    <motion.button
      onClick={onClick}
      disabled={disabled}
      whileHover={disabled ? {} : { scale: 1.05, y: -2 }}
      whileTap={disabled ? {} : { scale: 0.95 }}
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: 4,
        padding: '10px 14px',
        border: `2px solid ${knobColors.border}`,
        borderRadius: 12,
        background: knobColors.bg,
        boxShadow: isDark
          ? '0 4px 12px rgba(0,0,0,0.4), inset 0 1px 2px rgba(255,255,255,0.1)'
          : '0 4px 12px rgba(0,0,0,0.08), inset 0 1px 2px rgba(255,255,255,0.8)',
        cursor: disabled ? 'default' : 'pointer',
        opacity: disabled ? 0.6 : 1,
        WebkitTapHighlightColor: 'transparent',
        transition: 'border-color 0.2s ease, opacity 0.2s ease',
      }}
    >
      <span style={{ fontSize: '1.25rem' }}>⏱️</span>
      <Typography
        sx={{
          fontSize: '0.6875rem',
          fontWeight: 600,
          color: knobColors.text,
          letterSpacing: '0.02em',
        }}
      >
        Custom
      </Typography>
      <Typography
        sx={{
          fontSize: '0.625rem',
          color: tokens.text.tertiary,
        }}
      >
        {mins}:{secs.toString().padStart(2, '0')}
      </Typography>
    </motion.button>
  );
};

const StoveKnobs = ({
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
        <KnobButton
          key={preset.id}
          preset={preset}
          isSelected={selected === preset.id && !useCustom}
          onClick={() => onSelect(preset.id)}
          tokens={tokens}
          isDark={isDark}
          disabled={disabled}
        />
      ))}
      <CustomKnob
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

export default StoveKnobs;
