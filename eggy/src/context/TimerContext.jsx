import { createContext, useContext, useState, useCallback, useRef, useEffect } from 'react';
import { TIMER_STATES, EGG_PRESETS } from '../utils/constants';
import { addToHistory } from '../utils/storage';

/**
 * Global Timer Context
 * Manages timer state across all pages - timer continues even when navigating away
 */
const TimerContext = createContext(null);

export const useTimerContext = () => {
  const context = useContext(TimerContext);
  if (!context) {
    throw new Error('useTimerContext must be used within TimerProvider');
  }
  return context;
};

export const TimerProvider = ({ children }) => {
  // Timer configuration
  const [selectedPreset, setSelectedPreset] = useState('medium');
  const [customTime, setCustomTime] = useState(EGG_PRESETS.medium.duration);
  const [useCustom, setUseCustom] = useState(false);

  // Timer state
  const [duration, setDuration] = useState(EGG_PRESETS.medium.duration);
  const [timeRemaining, setTimeRemaining] = useState(EGG_PRESETS.medium.duration);
  const [timerState, setTimerState] = useState(TIMER_STATES.IDLE);

  // Notification state
  const [showNotification, setShowNotification] = useState(false);

  const intervalRef = useRef(null);

  // Calculate progress (0 to 1)
  const progress = duration > 0 ? 1 - timeRemaining / duration : 0;

  // Get current egg name
  const currentEggName = useCustom
    ? `Custom`
    : EGG_PRESETS[selectedPreset]?.name || 'Egg';

  // Clear interval helper
  const clearTimer = useCallback(() => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  }, []);

  // Handle completion - called when timer reaches zero
  const handleComplete = useCallback(() => {
    setTimerState(TIMER_STATES.COMPLETED);
    setShowNotification(true);

    // Save to history
    const eggType = useCustom ? 'Custom' : EGG_PRESETS[selectedPreset]?.name || 'Custom';
    addToHistory({
      eggType,
      duration,
      preset: useCustom ? null : selectedPreset,
    });

    // Auto-hide notification after 8 seconds
    setTimeout(() => {
      setShowNotification(false);
    }, 8000);
  }, [useCustom, selectedPreset, duration]);

  // Start the timer
  const start = useCallback(() => {
    if (timerState === TIMER_STATES.COMPLETED) return;

    clearTimer();
    setTimerState(TIMER_STATES.RUNNING);

    intervalRef.current = setInterval(() => {
      setTimeRemaining((prev) => {
        if (prev <= 1) {
          clearTimer();
          handleComplete();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  }, [timerState, clearTimer, handleComplete]);

  // Pause the timer
  const pause = useCallback(() => {
    if (timerState !== TIMER_STATES.RUNNING) return;
    clearTimer();
    setTimerState(TIMER_STATES.PAUSED);
  }, [timerState, clearTimer]);

  // Toggle between running and paused
  const toggle = useCallback(() => {
    if (timerState === TIMER_STATES.RUNNING) {
      pause();
    } else if (timerState === TIMER_STATES.PAUSED || timerState === TIMER_STATES.IDLE) {
      start();
    }
  }, [timerState, start, pause]);

  // Reset the timer
  const reset = useCallback(() => {
    clearTimer();
    setTimeRemaining(duration);
    setTimerState(TIMER_STATES.IDLE);
    setShowNotification(false);
  }, [duration, clearTimer]);

  // Set new duration
  const setNewDuration = useCallback((newDuration) => {
    clearTimer();
    setDuration(newDuration);
    setTimeRemaining(newDuration);
    setTimerState(TIMER_STATES.IDLE);
  }, [clearTimer]);

  // Handle preset selection
  const selectPreset = useCallback((presetId) => {
    if (timerState === TIMER_STATES.RUNNING) return;

    setSelectedPreset(presetId);
    setUseCustom(false);
    const newDuration = EGG_PRESETS[presetId].duration;
    setDuration(newDuration);
    setTimeRemaining(newDuration);
    setTimerState(TIMER_STATES.IDLE);
    setShowNotification(false);
  }, [timerState]);

  // Handle custom time change
  const setCustomDuration = useCallback((newTime) => {
    if (timerState === TIMER_STATES.RUNNING) return;

    setCustomTime(newTime);
    setUseCustom(true);
    setDuration(newTime);
    setTimeRemaining(newTime);
    setTimerState(TIMER_STATES.IDLE);
    setShowNotification(false);
  }, [timerState]);

  // Dismiss notification
  const dismissNotification = useCallback(() => {
    setShowNotification(false);
  }, []);

  // Cleanup on unmount
  useEffect(() => {
    return () => clearTimer();
  }, [clearTimer]);

  const value = {
    // Configuration
    selectedPreset,
    customTime,
    useCustom,
    currentEggName,

    // Timer state
    duration,
    timeRemaining,
    timerState,
    progress,
    isRunning: timerState === TIMER_STATES.RUNNING,
    isPaused: timerState === TIMER_STATES.PAUSED,
    isCompleted: timerState === TIMER_STATES.COMPLETED,
    isIdle: timerState === TIMER_STATES.IDLE,
    isActive: timerState === TIMER_STATES.RUNNING || timerState === TIMER_STATES.PAUSED,

    // Notification
    showNotification,
    dismissNotification,

    // Actions
    start,
    pause,
    toggle,
    reset,
    setDuration: setNewDuration,
    selectPreset,
    setCustomDuration,
  };

  return (
    <TimerContext.Provider value={value}>
      {children}
    </TimerContext.Provider>
  );
};

export default TimerContext;
