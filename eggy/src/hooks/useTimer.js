import { useState, useCallback, useRef, useEffect } from 'react';
import { TIMER_STATES } from '../utils/constants';

/**
 * Custom hook for managing egg timer logic
 * Handles start, pause, resume, reset, and completion
 *
 * @param {number} initialDuration - Duration in seconds
 * @param {Function} onComplete - Callback when timer completes
 * @returns {Object} Timer state and control functions
 */
const useTimer = (initialDuration = 0, onComplete = () => {}) => {
  const [duration, setDuration] = useState(initialDuration);
  const [timeRemaining, setTimeRemaining] = useState(initialDuration);
  const [timerState, setTimerState] = useState(TIMER_STATES.IDLE);
  const intervalRef = useRef(null);
  const onCompleteRef = useRef(onComplete);

  // Keep onComplete callback reference fresh
  useEffect(() => {
    onCompleteRef.current = onComplete;
  }, [onComplete]);

  // Calculate progress percentage (0 to 1)
  const progress = duration > 0 ? 1 - timeRemaining / duration : 0;

  // Clear interval helper
  const clearTimer = useCallback(() => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  }, []);

  // Start or resume the timer
  const start = useCallback(() => {
    if (timerState === TIMER_STATES.COMPLETED) return;

    clearTimer();
    setTimerState(TIMER_STATES.RUNNING);

    intervalRef.current = setInterval(() => {
      setTimeRemaining((prev) => {
        if (prev <= 1) {
          clearTimer();
          setTimerState(TIMER_STATES.COMPLETED);
          onCompleteRef.current();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  }, [timerState, clearTimer]);

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

  // Reset the timer to initial state
  const reset = useCallback(() => {
    clearTimer();
    setTimeRemaining(duration);
    setTimerState(TIMER_STATES.IDLE);
  }, [duration, clearTimer]);

  // Set a new duration (also resets the timer)
  const setNewDuration = useCallback((newDuration) => {
    clearTimer();
    setDuration(newDuration);
    setTimeRemaining(newDuration);
    setTimerState(TIMER_STATES.IDLE);
  }, [clearTimer]);

  // Cleanup on unmount
  useEffect(() => {
    return () => clearTimer();
  }, [clearTimer]);

  return {
    // State
    timeRemaining,
    duration,
    timerState,
    progress,
    isRunning: timerState === TIMER_STATES.RUNNING,
    isPaused: timerState === TIMER_STATES.PAUSED,
    isCompleted: timerState === TIMER_STATES.COMPLETED,
    isIdle: timerState === TIMER_STATES.IDLE,

    // Actions
    start,
    pause,
    toggle,
    reset,
    setDuration: setNewDuration,
  };
};

export default useTimer;
