import { useState } from 'react';
import { Box, Typography } from '@mui/material';
import { motion, AnimatePresence } from 'framer-motion';
import Bubbles from '../components/core/Bubbles';
import EggWithProgress from '../components/core/EggWithProgress';
import EggSelector from '../components/core/EggSelector';
import CustomTimePicker from '../components/core/CustomTimePicker';
import { useTimerContext } from '../context/TimerContext';
import { useTheme } from '../context/ThemeContext';

/**
 * TIMER PAGE - THEMED PREMIUM DESIGN
 *
 * Light: Soft cream gradient with white bubbles
 * Dark: Deep blue gradient with glowing bubbles
 */

const ActionButton = ({ children, onClick, variant = 'primary', tokens, isDark }) => {
  const isPrimary = variant === 'primary';

  return (
    <motion.button
      onClick={onClick}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      style={{
        padding: isPrimary ? '18px 52px' : '18px 36px',
        fontSize: '0.9375rem',
        fontWeight: 600,
        border: 'none',
        borderRadius: 16,
        cursor: 'pointer',
        background: isPrimary
          ? tokens.accent.gradient
          : isDark
          ? 'rgba(255,255,255,0.1)'
          : 'rgba(0,0,0,0.05)',
        color: isPrimary ? '#FFFFFF' : tokens.text.secondary,
        boxShadow: isPrimary
          ? isDark
            ? `0 4px 20px ${tokens.accent.glow}, 0 0 40px ${tokens.accent.glow}`
            : `0 4px 20px ${tokens.accent.glow}`
          : 'none',
        backdropFilter: !isPrimary ? 'blur(10px)' : 'none',
      }}
    >
      {children}
    </motion.button>
  );
};

// Wave shape component for bottom decoration
const WaveShape = ({ tokens }) => (
  <Box
    sx={{
      position: 'absolute',
      bottom: 80,
      left: 0,
      right: 0,
      height: 120,
      pointerEvents: 'none',
      zIndex: 0,
    }}
  >
    <svg
      viewBox="0 0 1440 120"
      preserveAspectRatio="none"
      style={{
        width: '100%',
        height: '100%',
      }}
    >
      <path
        d="M0,60 C360,120 720,0 1080,60 C1260,90 1380,40 1440,60 L1440,120 L0,120 Z"
        fill={tokens.wave}
      />
      <path
        d="M0,80 C240,40 480,100 720,80 C960,60 1200,100 1440,80 L1440,120 L0,120 Z"
        fill={tokens.wave}
        style={{ opacity: 0.6 }}
      />
    </svg>
  </Box>
);

const TimerPage = () => {
  const {
    selectedPreset,
    customTime,
    useCustom,
    timeRemaining,
    progress,
    isRunning,
    isPaused,
    isCompleted,
    isIdle,
    currentEggName,
    toggle,
    reset,
    selectPreset,
    setCustomDuration,
  } = useTimerContext();

  const { tokens, isDark } = useTheme();
  const [showCustomPicker, setShowCustomPicker] = useState(false);

  const handlePresetSelect = (presetId) => {
    selectPreset(presetId);
    setShowCustomPicker(false);
  };

  const handleCustomSelect = () => {
    setCustomDuration(customTime);
    setShowCustomPicker(true);
  };

  const handleCustomTimeChange = (newTime) => {
    setCustomDuration(newTime);
  };

  return (
    <Box
      sx={{
        position: 'fixed',
        inset: 0,
        background: tokens.bg.gradient,
        overflow: 'hidden',
        transition: 'background 0.4s ease',
      }}
    >
      {/* Bubbles - the core visual identity */}
      <Bubbles isBoiling={isRunning} />

      {/* Wave shapes */}
      <WaveShape tokens={tokens} />

      {/* Content */}
      <Box
        sx={{
          position: 'relative',
          zIndex: 1,
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          pt: { xs: 5, sm: 7 },
          pb: { xs: 14, sm: 16 },
          px: 2,
          overflowY: 'auto',
        }}
      >
        {/* Status */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
        >
          <Typography
            variant="caption"
            sx={{
              color: tokens.text.tertiary,
              mb: 0.5,
              display: 'block',
              textAlign: 'center',
            }}
          >
            {isIdle
              ? 'READY'
              : isCompleted
              ? 'DONE'
              : isRunning
              ? 'COOKING'
              : 'PAUSED'}
          </Typography>

          <Typography
            variant="h2"
            sx={{
              textAlign: 'center',
              color: tokens.text.primary,
              mb: 1,
              fontSize: { xs: '1.5rem', sm: '1.75rem' },
            }}
          >
            {isCompleted ? 'Perfect!' : currentEggName}
          </Typography>
        </motion.div>

        {/* Egg with Progress Ring */}
        <Box sx={{ flex: 1, display: 'flex', alignItems: 'center', minHeight: 280 }}>
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <EggWithProgress
              progress={progress}
              timeRemaining={timeRemaining}
              isRunning={isRunning}
              isCompleted={isCompleted}
            />
          </motion.div>
        </Box>

        {/* Controls */}
        <Box
          sx={{
            width: '100%',
            maxWidth: 420,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: 2.5,
          }}
        >
          {/* Egg Selector - only when idle */}
          <AnimatePresence mode="wait">
            {isIdle && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.3 }}
                style={{ width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 16 }}
              >
                <EggSelector
                  selected={selectedPreset}
                  customTime={customTime}
                  useCustom={useCustom}
                  onSelect={handlePresetSelect}
                  onCustomSelect={handleCustomSelect}
                  disabled={!isIdle}
                />

                {/* Custom Time Picker - shown when custom is selected */}
                <AnimatePresence>
                  {useCustom && showCustomPicker && (
                    <CustomTimePicker
                      value={customTime}
                      onChange={handleCustomTimeChange}
                      disabled={!isIdle}
                    />
                  )}
                </AnimatePresence>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Action Buttons */}
          <Box sx={{ display: 'flex', gap: 1.5 }}>
            <AnimatePresence mode="wait">
              {isCompleted ? (
                <motion.div
                  key="reset"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                >
                  <ActionButton onClick={reset} tokens={tokens} isDark={isDark}>
                    Cook Again
                  </ActionButton>
                </motion.div>
              ) : (
                <motion.div
                  key="toggle"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  style={{ display: 'flex', gap: 12 }}
                >
                  <ActionButton onClick={toggle} tokens={tokens} isDark={isDark}>
                    {isRunning ? 'Pause' : isPaused ? 'Resume' : 'Start'}
                  </ActionButton>

                  {(isRunning || isPaused) && (
                    <motion.div
                      initial={{ opacity: 0, width: 0 }}
                      animate={{ opacity: 1, width: 'auto' }}
                    >
                      <ActionButton variant="secondary" onClick={reset} tokens={tokens} isDark={isDark}>
                        Reset
                      </ActionButton>
                    </motion.div>
                  )}
                </motion.div>
              )}
            </AnimatePresence>
          </Box>

          {/* Completion badge */}
          <AnimatePresence>
            {isCompleted && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
              >
                <Box
                  sx={{
                    px: 2.5,
                    py: 1.5,
                    borderRadius: 3,
                    bgcolor: isDark ? 'rgba(76, 175, 124, 0.2)' : 'rgba(76, 175, 124, 0.12)',
                    backdropFilter: 'blur(10px)',
                  }}
                >
                  <Typography
                    sx={{
                      fontSize: '0.875rem',
                      color: tokens.success,
                      fontWeight: 600,
                    }}
                  >
                    Your egg is ready!
                  </Typography>
                </Box>
              </motion.div>
            )}
          </AnimatePresence>
        </Box>
      </Box>
    </Box>
  );
};

export default TimerPage;
