import { useState } from 'react';
import { Box, Typography } from '@mui/material';
import { motion, AnimatePresence } from 'framer-motion';
import Bubbles from '../components/core/Bubbles';
import EggWithProgress from '../components/core/EggWithProgress';
import EggSelector from '../components/core/EggSelector';
import CustomTimePicker from '../components/core/CustomTimePicker';
import RotaryDial from '../components/core/RotaryDial';
import EggSmash from '../components/core/EggSmash';
import { useTimerContext } from '../context/TimerContext';
import { useTheme } from '../context/ThemeContext';

/**
 * TIMER PAGE - PREMIUM MECHANICAL DESIGN
 *
 * Features:
 * - Rotary dial for Start/Pause/Resume control
 * - Egg smash interaction on tap
 * - Premium mechanical feel
 */

// Secondary action button (Reset only)
const SecondaryButton = ({ children, onClick, tokens, isDark }) => (
  <motion.button
    onClick={onClick}
    whileHover={{ scale: 1.02 }}
    whileTap={{ scale: 0.98 }}
    style={{
      padding: '12px 24px',
      fontSize: '0.8125rem',
      fontWeight: 600,
      border: 'none',
      borderRadius: 12,
      cursor: 'pointer',
      background: isDark ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.05)',
      color: tokens.text.secondary,
      backdropFilter: 'blur(10px)',
    }}
  >
    {children}
  </motion.button>
);

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
    duration,
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
      {/* Egg Smash interaction layer */}
      <EggSmash>
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
          <Box sx={{ flex: 1, display: 'flex', alignItems: 'center', minHeight: 260 }}>
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
              gap: 2,
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

            {/* Rotary Dial Control */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4, delay: 0.1 }}
            >
              <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 2 }}>
                <RotaryDial
                  isRunning={isRunning}
                  isPaused={isPaused}
                  isCompleted={isCompleted}
                  progress={progress}
                  duration={duration}
                  timeRemaining={timeRemaining}
                  onToggle={toggle}
                  onReset={reset}
                />

                {/* Reset button - shown when running or paused */}
                <AnimatePresence>
                  {(isRunning || isPaused) && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 10 }}
                    >
                      <SecondaryButton onClick={reset} tokens={tokens} isDark={isDark}>
                        Reset
                      </SecondaryButton>
                    </motion.div>
                  )}
                </AnimatePresence>
              </Box>
            </motion.div>

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
      </EggSmash>
    </Box>
  );
};

export default TimerPage;
