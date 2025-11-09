import { useState, useEffect, useRef, useCallback } from 'react';

type PomodoroMode = 'work' | 'shortBreak' | 'longBreak';

const workDuration = 25 * 60;
const shortBreakDuration = 5 * 60;
const longBreakDuration = 15 * 60;
const longBreakInterval = 4;

export const usePomodoro = () => {
  const [mode, setMode] = useState<PomodoroMode>('work');
  const [timeLeft, setTimeLeft] = useState(workDuration);
  const [isActive, setIsActive] = useState(false);
  const [cycles, setCycles] = useState(0);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  const switchMode = useCallback(() => {
    let nextMode: PomodoroMode;
    let nextTimeLeft: number;
    let newCycles = cycles;

    if (mode === 'work') {
      newCycles++;
      setCycles(newCycles);
      if (newCycles % longBreakInterval === 0) {
        nextMode = 'longBreak';
        nextTimeLeft = longBreakDuration;
      } else {
        nextMode = 'shortBreak';
        nextTimeLeft = shortBreakDuration;
      }
    } else {
      nextMode = 'work';
      nextTimeLeft = workDuration;
    }
    
    setMode(nextMode);
    setTimeLeft(nextTimeLeft);
    setIsActive(false);

  }, [cycles, mode]);


  useEffect(() => {
    if (isActive) {
      intervalRef.current = setInterval(() => {
        setTimeLeft(prev => {
          if (prev > 0) {
            return prev - 1;
          }
          if (intervalRef.current) clearInterval(intervalRef.current);
          // TODO: Play sound notification
          switchMode();
          return 0;
        });
      }, 1000);
    } else {
      if (intervalRef.current) clearInterval(intervalRef.current);
    }
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [isActive, switchMode]);
  
  const toggleTimer = () => {
    setIsActive(!isActive);
  };

  const resetTimer = () => {
    if (intervalRef.current) clearInterval(intervalRef.current);
    setIsActive(false);
    setTimeLeft(workDuration);
    setMode('work');
    setCycles(0);
  };
  
  return { timeLeft, isActive, mode, toggleTimer, resetTimer, cycles };
};
