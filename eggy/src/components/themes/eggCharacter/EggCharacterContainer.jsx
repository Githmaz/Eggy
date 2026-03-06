import { useState, useEffect, useRef, useCallback } from 'react';
import { Box, Typography } from '@mui/material';
import { motion, AnimatePresence } from 'framer-motion';
import { useTheme } from '../../../context/ThemeContext';
import { useTimerContext } from '../../../context/TimerContext';
import EggCharacter from './EggCharacter';
import HotSpringPool from './HotSpringPool';
import StoveControlButtons from './StoveControlButtons';
import IgnitionButton from './IgnitionButton';
import CustomTimePicker from '../../core/CustomTimePicker';

/**
 * HOT SPRING EGG CONTAINER
 *
 * Japanese onsen aesthetic.
 * Calm, minimal, spa-like experience.
 *
 * Animation Flow:
 * IDLE -> JUMPING -> FALLING -> SPLASH -> BATHING
 * BATHING -> (timer end) -> STEAM_BURST -> POP_UP -> COMPLETE
 * COMPLETE -> (reset) -> IDLE
 * BATHING <-> PAUSED
 */

// Animation states
const ANIM_STATES = {
  IDLE: 'IDLE',
  JUMPING: 'JUMPING',
  FALLING: 'FALLING',
  SPLASH: 'SPLASH',
  BATHING: 'BATHING',
  PAUSED: 'PAUSED',
  STEAM_BURST: 'STEAM_BURST',
  POP_UP: 'POP_UP',
  COMPLETE: 'COMPLETE',
};

// Animation timing (in ms)
const TIMING = {
  JUMPING: 350,
  FALLING: 400,
  SPLASH: 350,
  STEAM_BURST: 400,
  POP_UP: 500,
};

const EggCharacterContainer = () => {
  const {
    selectedPreset,
    customTime,
    useCustom,
    timeRemaining,
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
  const [animState, setAnimState] = useState(ANIM_STATES.IDLE);
  const animTimerRef = useRef(null);
  const prevIsRunning = useRef(false);
  const prevIsCompleted = useRef(false);

  // Clear animation timer
  const clearAnimTimer = useCallback(() => {
    if (animTimerRef.current) {
      clearTimeout(animTimerRef.current);
      animTimerRef.current = null;
    }
  }, []);

  // Run start sequence: JUMPING -> FALLING -> SPLASH -> BATHING
  const runStartSequence = useCallback(() => {
    clearAnimTimer();

    // Phase 1: Jump up
    setAnimState(ANIM_STATES.JUMPING);

    animTimerRef.current = setTimeout(() => {
      // Phase 2: Fall into pool
      setAnimState(ANIM_STATES.FALLING);

      animTimerRef.current = setTimeout(() => {
        // Phase 3: Splash
        setAnimState(ANIM_STATES.SPLASH);

        animTimerRef.current = setTimeout(() => {
          // Phase 4: Bathing
          setAnimState(ANIM_STATES.BATHING);
        }, TIMING.SPLASH);
      }, TIMING.FALLING);
    }, TIMING.JUMPING);
  }, [clearAnimTimer]);

  // Run completion sequence: STEAM_BURST -> POP_UP -> COMPLETE
  const runCompletionSequence = useCallback(() => {
    clearAnimTimer();

    // Phase 1: Steam burst
    setAnimState(ANIM_STATES.STEAM_BURST);

    animTimerRef.current = setTimeout(() => {
      // Phase 2: Egg pops up
      setAnimState(ANIM_STATES.POP_UP);

      animTimerRef.current = setTimeout(() => {
        // Phase 3: Complete
        setAnimState(ANIM_STATES.COMPLETE);
      }, TIMING.POP_UP);
    }, TIMING.STEAM_BURST);
  }, [clearAnimTimer]);

  // Track timer state changes
  useEffect(() => {
    // Timer just started
    if (isRunning && !prevIsRunning.current && !prevIsCompleted.current) {
      runStartSequence();
    }
    // Timer just completed
    else if (isCompleted && !prevIsCompleted.current) {
      runCompletionSequence();
    }
    // Timer paused
    else if (isPaused && prevIsRunning.current) {
      setAnimState(ANIM_STATES.PAUSED);
    }
    // Timer resumed
    else if (isRunning && !prevIsRunning.current && animState === ANIM_STATES.PAUSED) {
      setAnimState(ANIM_STATES.BATHING);
    }
    // Timer reset
    else if (isIdle && (prevIsRunning.current || prevIsCompleted.current)) {
      clearAnimTimer();
      setAnimState(ANIM_STATES.IDLE);
    }

    prevIsRunning.current = isRunning;
    prevIsCompleted.current = isCompleted;
  }, [isRunning, isPaused, isCompleted, isIdle, runStartSequence, runCompletionSequence, clearAnimTimer, animState]);

  // Cleanup on unmount
  useEffect(() => {
    return () => clearAnimTimer();
  }, [clearAnimTimer]);

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

  // Get egg expression
  const getEggExpression = () => {
    switch (animState) {
      case ANIM_STATES.JUMPING:
      case ANIM_STATES.FALLING:
        return 'excited';
      case ANIM_STATES.SPLASH:
      case ANIM_STATES.BATHING:
      case ANIM_STATES.PAUSED:
        return 'relaxed';
      case ANIM_STATES.STEAM_BURST:
      case ANIM_STATES.POP_UP:
      case ANIM_STATES.COMPLETE:
        return 'happy';
      default:
        return 'idle';
    }
  };

  // Get steam intensity
  const getSteamIntensity = () => {
    if (animState === ANIM_STATES.STEAM_BURST) return 'burst';
    if (animState === ANIM_STATES.BATHING || animState === ANIM_STATES.PAUSED) return 'gentle';
    return 'none';
  };

  // Determine if egg is in pool
  const isEggInPool = [
    ANIM_STATES.SPLASH,
    ANIM_STATES.BATHING,
    ANIM_STATES.PAUSED,
  ].includes(animState);

  // Egg floats above pool after completion
  const isEggFloating = [
    ANIM_STATES.POP_UP,
    ANIM_STATES.COMPLETE,
  ].includes(animState);

  // Floating egg animation variants
  const floatingEggVariants = {
    idle: {
      y: 0,
      x: '-50%',
      scale: 1,
      opacity: 1,
    },
    jumping: {
      y: -35,
      x: '-50%',
      scale: 1.03,
      opacity: 1,
      transition: {
        duration: 0.35,
        ease: [0.25, 0.46, 0.45, 0.94],
      },
    },
    falling: {
      y: 150,
      x: '-50%',
      scale: 0.95,
      opacity: 0,
      transition: {
        duration: 0.4,
        ease: [0.55, 0.085, 0.68, 0.53], // Gravity
      },
    },
    hidden: {
      opacity: 0,
      scale: 0.8,
    },
  };

  // Popped egg variants
  const poppedEggVariants = {
    hidden: {
      y: 40,
      scale: 0.7,
      opacity: 0,
    },
    visible: {
      y: 0,
      scale: 1,
      opacity: 1,
      transition: {
        type: 'spring',
        stiffness: 350,
        damping: 22,
      },
    },
  };

  // Get state for floating egg
  const getFloatingEggState = () => {
    switch (animState) {
      case ANIM_STATES.IDLE:
        return 'idle';
      case ANIM_STATES.JUMPING:
        return 'jumping';
      case ANIM_STATES.FALLING:
        return 'falling';
      default:
        return 'hidden';
    }
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
      <Box
        sx={{
          position: 'relative',
          zIndex: 1,
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          pt: { xs: 4, sm: 5 },
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
              ? 'BATHING'
              : 'PAUSED'}
          </Typography>

          <Typography
            variant="h2"
            sx={{
              textAlign: 'center',
              color: tokens.text.primary,
              mb: 1.5,
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
              fontSize: '2.75rem',
              fontWeight: 600,
              color: tokens.text.primary,
              fontFamily: '"SF Pro Display", -apple-system, sans-serif',
              letterSpacing: '-0.02em',
            }}
          >
            {Math.floor(timeRemaining / 60)}:
            {(timeRemaining % 60).toString().padStart(2, '0')}
          </Typography>
        </Box>

        {/* Animation Stage */}
        <Box
          sx={{
            position: 'relative',
            width: 280,
            height: 280,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            mb: 2,
          }}
        >
          {/* Floating egg (before entering pool) */}
          <AnimatePresence>
            {[ANIM_STATES.IDLE, ANIM_STATES.JUMPING, ANIM_STATES.FALLING].includes(animState) && (
              <motion.div
                key="floating-egg"
                variants={floatingEggVariants}
                initial="idle"
                animate={getFloatingEggState()}
                exit="hidden"
                style={{
                  position: 'absolute',
                  top: 30,
                  left: '50%',
                  zIndex: 15,
                }}
              >
                <EggCharacter
                  expression={getEggExpression()}
                  size={65}
                  animate={true}
                />
              </motion.div>
            )}
          </AnimatePresence>

          {/* Hot Spring Pool */}
          <Box sx={{ position: 'absolute', bottom: 20, left: '50%', transform: 'translateX(-50%)' }}>
            <HotSpringPool
              showEgg={isEggInPool}
              eggComponent={
                isEggInPool ? (
                  <EggCharacter
                    expression={getEggExpression()}
                    size={50}
                    animate={true}
                  />
                ) : null
              }
              isActive={isRunning || isPaused}
              showSplash={animState === ANIM_STATES.SPLASH}
              showRipples={animState === ANIM_STATES.BATHING || animState === ANIM_STATES.PAUSED}
              steamIntensity={getSteamIntensity()}
            />
          </Box>

          {/* Popped egg (after completion) */}
          <AnimatePresence>
            {isEggFloating && (
              <motion.div
                key="popped-egg"
                variants={poppedEggVariants}
                initial="hidden"
                animate="visible"
                style={{
                  position: 'absolute',
                  top: 40,
                  left: '50%',
                  transform: 'translateX(-50%)',
                  zIndex: 20,
                }}
              >
                <EggCharacter
                  expression="happy"
                  size={70}
                  animate={true}
                />
              </motion.div>
            )}
          </AnimatePresence>
        </Box>

        {/* Controls */}
        <Box
          sx={{
            width: '100%',
            maxWidth: 380,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: 2,
          }}
        >
          {/* Preset Buttons - only when idle */}
          <AnimatePresence mode="wait">
            {isIdle && (
              <motion.div
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.3 }}
                style={{ width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 16 }}
              >
                <StoveControlButtons
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

          {/* Start Button */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.4, delay: 0.1 }}
          >
            <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 2 }}>
              <IgnitionButton
                isRunning={isRunning}
                isPaused={isPaused}
                isCompleted={isCompleted}
                onToggle={toggle}
                onReset={reset}
              />

              {/* Reset button */}
              <AnimatePresence>
                {(isRunning || isPaused) && (
                  <motion.div
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 8 }}
                  >
                    <motion.button
                      onClick={reset}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      style={{
                        padding: '10px 22px',
                        fontSize: '0.8125rem',
                        fontWeight: 600,
                        border: 'none',
                        borderRadius: 12,
                        cursor: 'pointer',
                        background: isDark ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.04)',
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
                    bgcolor: isDark ? 'rgba(76, 175, 124, 0.15)' : 'rgba(76, 175, 124, 0.1)',
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

export default EggCharacterContainer;
