import { Box, Typography, Button } from '@mui/material';
import { PlayArrow, Pause, Refresh } from '@mui/icons-material';
import { motion, AnimatePresence } from 'framer-motion';
import Pot from '../components/animations/Pot';
import TimerDisplay from '../components/timer/TimerDisplay';
import PresetSelector from '../components/timer/PresetSelector';
import CustomTimeSelector from '../components/timer/CustomTimeSelector';
import PageContainer from '../components/common/PageContainer';
import { useTimerContext } from '../context/TimerContext';
import { formatTime } from '../utils/constants';

/**
 * Main Timer Page
 * Core cooking screen with animated pot, timer, and controls
 * Uses global TimerContext for state persistence across pages
 */
const TimerPage = () => {
  const {
    // Configuration
    selectedPreset,
    customTime,
    useCustom,
    currentEggName,

    // Timer state
    timeRemaining,
    progress,
    isRunning,
    isPaused,
    isCompleted,
    isIdle,

    // Actions
    toggle,
    reset,
    selectPreset,
    setCustomDuration,
  } = useTimerContext();

  return (
    <PageContainer>
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
      >
        <Typography
          variant="h4"
          align="center"
          sx={{ fontWeight: 700, mb: 0.5, color: 'text.primary' }}
        >
          Egg Timer
        </Typography>
        <Typography
          variant="body2"
          align="center"
          color="text.secondary"
          sx={{ mb: 3 }}
        >
          {isIdle
            ? 'Select your preferred egg style'
            : isCompleted
            ? 'Your egg is ready!'
            : `Cooking: ${currentEggName}`}
        </Typography>
      </motion.div>

      {/* Animated Pot Section */}
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          mb: 2,
        }}
      >
        <Pot
          progress={progress}
          isBoiling={isRunning}
          isCompleted={isCompleted}
        />
      </Box>

      {/* Timer Display */}
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          mb: 4,
        }}
      >
        <TimerDisplay
          timeRemaining={timeRemaining}
          progress={progress}
          isRunning={isRunning}
          isCompleted={isCompleted}
        />
      </Box>

      {/* Control Buttons */}
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          gap: 2,
          mb: 4,
        }}
      >
        <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
          {isCompleted ? (
            <Button
              variant="contained"
              size="large"
              startIcon={<Refresh />}
              onClick={reset}
              sx={{ px: 4, py: 1.5 }}
            >
              Cook Again
            </Button>
          ) : (
            <Button
              variant="contained"
              size="large"
              startIcon={isRunning ? <Pause /> : <PlayArrow />}
              onClick={toggle}
              sx={{ px: 4, py: 1.5 }}
            >
              {isRunning ? 'Pause' : isPaused ? 'Resume' : 'Start'}
            </Button>
          )}
        </motion.div>

        {(isRunning || isPaused) && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
          >
            <Button
              variant="outlined"
              size="large"
              startIcon={<Refresh />}
              onClick={reset}
              sx={{ px: 3, py: 1.5 }}
            >
              Reset
            </Button>
          </motion.div>
        )}
      </Box>

      {/* Preset and Custom Time Selection - only show when idle */}
      <AnimatePresence mode="wait">
        {isIdle && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.25 }}
          >
            <Box sx={{ mb: 3 }}>
              <PresetSelector
                selectedPreset={useCustom ? null : selectedPreset}
                onSelect={selectPreset}
                disabled={isRunning}
              />
            </Box>

            <CustomTimeSelector
              value={customTime}
              onChange={setCustomDuration}
              disabled={isRunning}
            />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Cooking info when active */}
      <AnimatePresence mode="wait">
        {(isRunning || isPaused) && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.25 }}
          >
            <Box
              sx={{
                p: 2.5,
                borderRadius: 3,
                bgcolor: 'rgba(255, 149, 0, 0.06)',
                border: '1px solid rgba(255, 149, 0, 0.1)',
                textAlign: 'center',
              }}
            >
              <Typography variant="body2" color="text.secondary">
                {isPaused ? 'Timer paused' : 'Cooking in progress'}
              </Typography>
              <Typography variant="body2" color="text.secondary" sx={{ mt: 0.5 }}>
                You can navigate to other pages - the timer will keep running
              </Typography>
            </Box>
          </motion.div>
        )}
      </AnimatePresence>
    </PageContainer>
  );
};

export default TimerPage;
