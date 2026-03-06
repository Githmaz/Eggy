import { useState, useEffect } from 'react';
import { Box, Typography } from '@mui/material';
import { motion, AnimatePresence } from 'framer-motion';
import { useTheme } from '../../../context/ThemeContext';
import { useTimerContext } from '../../../context/TimerContext';
import SteamEffect from './SteamEffect';
import PotBubbles from './PotBubbles';
import EggDropAnimation from './EggDropAnimation';
import PotDial from './PotDial';
import StoveKnobs from './StoveKnobs';
import CustomTimePicker from '../../core/CustomTimePicker';

/**
 * COOKING POT CONTAINER
 *
 * Main container for the cooking pot theme.
 * Features:
 * - Brown gradient pot body with copper rim
 * - Translucent blue water interior
 * - Side handles
 * - Steam effect when cooking
 * - Bubbles confined to water area
 * - Egg drop animation on start
 */

// Pot handles
const PotHandle = ({ side, tokens }) => (
  <Box
    sx={{
      position: 'absolute',
      top: '15%',
      [side]: -30,
      width: 35,
      height: 28,
      background: tokens.pot?.handle || 'linear-gradient(180deg, #5D4037 0%, #3E2723 100%)',
      borderRadius: side === 'left' ? '12px 4px 4px 12px' : '4px 12px 12px 4px',
      boxShadow: `
        0 4px 8px rgba(0,0,0,0.2),
        inset 0 1px 2px rgba(255,255,255,0.1)
      `,
      '&::after': {
        content: '""',
        position: 'absolute',
        top: '50%',
        [side === 'left' ? 'left' : 'right']: 6,
        transform: 'translateY(-50%)',
        width: 8,
        height: 16,
        borderRadius: 4,
        background: 'rgba(0,0,0,0.2)',
      },
    }}
  />
);

// Water surface with subtle wave effect
const WaterSurface = ({ tokens }) => (
  <motion.div
    animate={{
      y: [0, -2, 0, 2, 0],
    }}
    transition={{
      duration: 3,
      repeat: Infinity,
      ease: 'easeInOut',
    }}
    style={{
      position: 'absolute',
      top: 0,
      left: '5%',
      right: '5%',
      height: 8,
      background: `linear-gradient(180deg,
        rgba(255,255,255,0.3) 0%,
        ${tokens.pot?.water || 'rgba(135, 206, 250, 0.6)'} 100%
      )`,
      borderRadius: '50%',
      filter: 'blur(1px)',
    }}
  />
);

const CookingPotContainer = () => {
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
  const [hasDropped, setHasDropped] = useState(false);

  // Track when egg should be dropped (when timer starts)
  useEffect(() => {
    if (isRunning && !hasDropped) {
      setHasDropped(true);
    } else if (isIdle) {
      setHasDropped(false);
    }
  }, [isRunning, isIdle, hasDropped]);

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

  const potWidth = 280;
  const potHeight = 180;
  const waterHeight = 120;

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
              ? 'BOILING'
              : 'PAUSED'}
          </Typography>

          <Typography
            variant="h2"
            sx={{
              textAlign: 'center',
              color: tokens.text.primary,
              mb: 2,
              fontSize: { xs: '1.5rem', sm: '1.75rem' },
            }}
          >
            {isCompleted ? 'Perfect!' : currentEggName}
          </Typography>
        </motion.div>

        {/* Timer Display */}
        <Box sx={{ mb: 2 }}>
          <Typography
            sx={{
              fontSize: '3rem',
              fontWeight: 700,
              color: tokens.text.primary,
              fontFamily: '"SF Pro Display", monospace',
              letterSpacing: '-0.02em',
            }}
          >
            {Math.floor(timeRemaining / 60)}:
            {(timeRemaining % 60).toString().padStart(2, '0')}
          </Typography>
        </Box>

        {/* Cooking Pot */}
        <Box
          sx={{
            position: 'relative',
            width: potWidth,
            height: potHeight + 60, // Extra space for steam
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            mb: 3,
          }}
        >
          {/* Steam (above pot) */}
          <AnimatePresence>
            {(isRunning || isPaused) && (
              <SteamEffect
                isBoiling={isRunning}
                potBounds={{ width: potWidth * 0.7, offsetX: potWidth * 0.15 }}
              />
            )}
          </AnimatePresence>

          {/* Main pot body */}
          <Box
            sx={{
              position: 'relative',
              width: potWidth,
              height: potHeight,
              mt: 'auto',
            }}
          >
            {/* Pot body (brown gradient) */}
            <Box
              sx={{
                position: 'absolute',
                top: 20,
                left: 0,
                right: 0,
                bottom: 0,
                background: tokens.pot?.body || 'linear-gradient(180deg, #8B4513 0%, #654321 50%, #4A3728 100%)',
                borderRadius: '0 0 50% 50% / 0 0 40% 40%',
                boxShadow: `
                  0 8px 24px rgba(0,0,0,0.3),
                  inset 0 -10px 30px rgba(0,0,0,0.2),
                  inset 0 4px 8px rgba(255,255,255,0.05)
                `,
              }}
            />

            {/* Pot interior with water */}
            <Box
              sx={{
                position: 'absolute',
                top: 30,
                left: 15,
                right: 15,
                height: waterHeight,
                background: tokens.pot?.interior || 'linear-gradient(180deg, #6B4423 0%, #4A3020 100%)',
                borderRadius: '0 0 45% 45% / 0 0 50% 50%',
                overflow: 'hidden',
              }}
            >
              {/* Water */}
              <Box
                sx={{
                  position: 'absolute',
                  top: 10,
                  left: 5,
                  right: 5,
                  bottom: 5,
                  background: tokens.pot?.water || 'rgba(135, 206, 250, 0.6)',
                  borderRadius: '0 0 45% 45% / 0 0 60% 60%',
                }}
              >
                <WaterSurface tokens={tokens} />

                {/* Bubbles in water */}
                <PotBubbles isBoiling={isRunning} containerHeight={waterHeight - 20} />

                {/* Egg in water */}
                <Box
                  sx={{
                    position: 'absolute',
                    bottom: 10,
                    left: '50%',
                    transform: 'translateX(-50%)',
                  }}
                >
                  <EggDropAnimation
                    isActive={isRunning || isPaused || isCompleted}
                    hasDropped={hasDropped}
                  />
                </Box>
              </Box>
            </Box>

            {/* Copper rim */}
            <Box
              sx={{
                position: 'absolute',
                top: 0,
                left: -5,
                right: -5,
                height: 28,
                background: tokens.pot?.rimHighlight || 'linear-gradient(90deg, #DDA15E 0%, #CD853F 30%, #B87333 50%, #CD853F 70%, #DDA15E 100%)',
                borderRadius: '12px 12px 0 0',
                boxShadow: `
                  0 -2px 8px rgba(0,0,0,0.1),
                  inset 0 2px 4px rgba(255,255,255,0.3),
                  inset 0 -2px 4px rgba(0,0,0,0.2)
                `,
              }}
            />

            {/* Handles */}
            <PotHandle side="left" tokens={tokens} />
            <PotHandle side="right" tokens={tokens} />
          </Box>
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
          {/* Stove Knobs (preset selector) - only when idle */}
          <AnimatePresence mode="wait">
            {isIdle && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.3 }}
                style={{ width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 16 }}
              >
                <StoveKnobs
                  selected={selectedPreset}
                  customTime={customTime}
                  useCustom={useCustom}
                  onSelect={handlePresetSelect}
                  onCustomSelect={handleCustomSelect}
                  disabled={!isIdle}
                />

                {/* Custom Time Picker */}
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

          {/* Pot Dial Control */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.4, delay: 0.1 }}
          >
            <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 2 }}>
              <PotDial
                isRunning={isRunning}
                isPaused={isPaused}
                isCompleted={isCompleted}
                progress={progress}
                duration={duration}
                timeRemaining={timeRemaining}
                onToggle={toggle}
                onReset={reset}
              />

              {/* Reset button */}
              <AnimatePresence>
                {(isRunning || isPaused) && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                  >
                    <motion.button
                      onClick={reset}
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
                      Reset
                    </motion.button>
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
    </Box>
  );
};

export default CookingPotContainer;
