import { useState, useEffect, useRef, useCallback } from 'react';
import type { PomodoroMode } from '../types';

const WORK_MINS = 25;
const SHORT_BREAK_MINS = 5;
const LONG_BREAK_MINS = 15;
const CYCLES_BEFORE_LONG_BREAK = 4;

export const usePomodoro = (
    settings = { work: WORK_MINS, shortBreak: SHORT_BREAK_MINS, longBreak: LONG_BREAK_MINS }
) => {
    const [mode, setMode] = useState<PomodoroMode>('work');
    const [timeLeft, setTimeLeft] = useState(settings.work * 60);
    const [isActive, setIsActive] = useState(false);
    const [cycles, setCycles] = useState(0);

    const intervalRef = useRef<NodeJS.Timeout | null>(null);

    const timeForMode: Record<PomodoroMode, number> = {
        work: settings.work * 60,
        shortBreak: settings.shortBreak * 60,
        longBreak: settings.longBreak * 60,
    };

    const switchMode = useCallback(() => {
        setIsActive(false);
        if (mode === 'work') {
            const newCycles = cycles + 1;
            setCycles(newCycles);
            if (newCycles % CYCLES_BEFORE_LONG_BREAK === 0) {
                setMode('longBreak');
                setTimeLeft(timeForMode.longBreak);
            } else {
                setMode('shortBreak');
                setTimeLeft(timeForMode.shortBreak);
            }
        } else {
            setMode('work');
            setTimeLeft(timeForMode.work);
        }
    }, [mode, cycles, timeForMode]);

    useEffect(() => {
        if (isActive) {
            intervalRef.current = setInterval(() => {
                setTimeLeft(prev => {
                    if (prev <= 1) {
                        switchMode();
                        return 0;
                    }
                    return prev - 1;
                });
            }, 1000);
        } else {
            if (intervalRef.current) {
                clearInterval(intervalRef.current);
            }
        }

        return () => {
            if (intervalRef.current) {
                clearInterval(intervalRef.current);
            }
        };
    }, [isActive, switchMode]);

    const toggleTimer = () => {
        setIsActive(!isActive);
    };

    const resetTimer = () => {
        setIsActive(false);
        setMode('work');
        setTimeLeft(timeForMode.work);
        setCycles(0);
    };

    return { timeLeft, mode, isActive, cycles, toggleTimer, resetTimer, setTimeLeft };
};
