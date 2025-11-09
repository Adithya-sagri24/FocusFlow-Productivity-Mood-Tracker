// Fix: Implemented the `usePomodoro` hook based on its test file.
import { useState, useEffect, useCallback, useRef } from 'react';

type PomodoroMode = 'work' | 'shortBreak' | 'longBreak';

interface PomodoroSettings {
  work: number;
  shortBreak: number;
  longBreak: number;
}

export const usePomodoro = (initialSettings: PomodoroSettings = { work: 25, shortBreak: 5, longBreak: 15 }) => {
  const [settings] = useState(initialSettings);
  const [mode, setMode] = useState<PomodoroMode>('work');
  const [timeLeft, setTimeLeft] = useState(settings.work * 60);
  const [isActive, setIsActive] = useState(false);
  const [cycles, setCycles] = useState(0);
  const longBreakInterval = 4;

  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  const switchMode = useCallback(() => {
    setIsActive(false);
    if (mode === 'work') {
      const newCycles = cycles + 1;
      setCycles(newCycles);
      if (newCycles % longBreakInterval === 0) {
        setMode('longBreak');
        setTimeLeft(settings.longBreak * 60);
      } else {
        setMode('shortBreak');
        setTimeLeft(settings.shortBreak * 60);
      }
    } else {
      setMode('work');
      setTimeLeft(settings.work * 60);
    }
  }, [mode, cycles, settings]);

  useEffect(() => {
    if (isActive) {
      intervalRef.current = setInterval(() => {
        setTimeLeft((prevTime) => {
          if (prevTime > 1) {
            return prevTime - 1;
          }
          switchMode();
          // We return the new time directly to avoid a 1s lag in display
          const nextMode = mode === 'work' 
            ? ((cycles + 1) % longBreakInterval === 0 ? 'longBreak' : 'shortBreak') 
            : 'work';
          if (nextMode === 'work') return settings.work * 60;
          if (nextMode === 'shortBreak') return settings.shortBreak * 60;
          return settings.longBreak * 60;
        });
      }, 1000);
    } else if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [isActive, switchMode, cycles, mode, settings]);
  
  const toggleTimer = () => {
    setIsActive(!isActive);
  };

  const resetTimer = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }
    setIsActive(false);
    setMode('work');
    setTimeLeft(settings.work * 60);
    setCycles(0);
  };
  
  // Effect to update timeleft if settings change
  useEffect(() => {
    if (!isActive) {
      if (mode === 'work') setTimeLeft(settings.work * 60);
      else if (mode === 'shortBreak') setTimeLeft(settings.shortBreak * 60);
      else if (mode === 'longBreak') setTimeLeft(settings.longBreak * 60);
    }
  }, [settings, mode, isActive]);

  return { timeLeft, mode, isActive, cycles, toggleTimer, resetTimer };
};
