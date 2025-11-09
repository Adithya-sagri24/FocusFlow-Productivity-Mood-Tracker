// Fix: Import Jest globals to resolve TypeScript errors.
import { describe, it, expect, jest } from '@jest/globals';
import { renderHook, act } from '@testing-library/react';
import { usePomodoro } from '../../hooks/usePomodoro';

jest.useFakeTimers();

describe('usePomodoro', () => {
  it('should initialize with default values', () => {
    const { result } = renderHook(() => usePomodoro());
    expect(result.current.timeLeft).toBe(25 * 60);
    expect(result.current.mode).toBe('work');
    expect(result.current.isActive).toBe(false);
    expect(result.current.cycles).toBe(0);
  });

  it('should start and pause the timer', () => {
    const { result } = renderHook(() => usePomodoro());
    
    act(() => {
      result.current.toggleTimer();
    });
    expect(result.current.isActive).toBe(true);
    
    act(() => {
      jest.advanceTimersByTime(1000);
    });
    expect(result.current.timeLeft).toBe(25 * 60 - 1);
    
    act(() => {
      result.current.toggleTimer();
    });
    expect(result.current.isActive).toBe(false);

    act(() => {
      jest.advanceTimersByTime(1000);
    });
    expect(result.current.timeLeft).toBe(25 * 60 - 1);
  });

  it('should reset the timer', () => {
    const { result } = renderHook(() => usePomodoro());
    
    act(() => {
      result.current.toggleTimer();
      jest.advanceTimersByTime(5000);
    });
    
    act(() => {
      result.current.resetTimer();
    });

    expect(result.current.timeLeft).toBe(25 * 60);
    expect(result.current.mode).toBe('work');
    expect(result.current.isActive).toBe(false);
    expect(result.current.cycles).toBe(0);
  });

  it('should switch to short break after a work cycle', () => {
    const { result } = renderHook(() => usePomodoro());
    
    act(() => {
      result.current.toggleTimer();
    });
    
    act(() => {
      jest.advanceTimersByTime(25 * 60 * 1000);
    });

    expect(result.current.mode).toBe('shortBreak');
    expect(result.current.timeLeft).toBe(5 * 60);
    expect(result.current.isActive).toBe(false);
    expect(result.current.cycles).toBe(1);
  });
  
  it('should switch to long break after 4 work cycles', () => {
    const { result } = renderHook(() => usePomodoro());

    // Cycle 1
    act(() => { result.current.toggleTimer(); });
    act(() => { jest.advanceTimersByTime(25 * 60 * 1000); }); // work -> short break
    expect(result.current.mode).toBe('shortBreak');

    // Cycle 2
    act(() => { result.current.toggleTimer(); }); // start break
    act(() => { jest.advanceTimersByTime(5 * 60 * 1000); }); // break -> work
    act(() => { result.current.toggleTimer(); }); // start work
    act(() => { jest.advanceTimersByTime(25 * 60 * 1000); }); // work -> short break
    expect(result.current.mode).toBe('shortBreak');

    // Cycle 3
    act(() => { result.current.toggleTimer(); });
    act(() => { jest.advanceTimersByTime(5 * 60 * 1000); });
    act(() => { result.current.toggleTimer(); });
    act(() => { jest.advanceTimersByTime(25 * 60 * 1000); });
    expect(result.current.mode).toBe('shortBreak');
    
    // Cycle 4
    act(() => { result.current.toggleTimer(); });
    act(() => { jest.advanceTimersByTime(5 * 60 * 1000); });
    act(() => { result.current.toggleTimer(); });
    act(() => { jest.advanceTimersByTime(25 * 60 * 1000); });
    expect(result.current.mode).toBe('longBreak');
    expect(result.current.cycles).toBe(4);
  });
});