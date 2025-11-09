import React from 'react';
import { usePomodoro } from '../hooks/usePomodoro';
import Button from './ui/Button';
import Card from './ui/Card';

const PomodoroTimer: React.FC = () => {
  const { timeLeft, isActive, mode, toggleTimer, resetTimer } = usePomodoro();

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  const getModeLabel = () => {
    switch (mode) {
      case 'work':
        return 'Focus Time';
      case 'shortBreak':
        return 'Short Break';
      case 'longBreak':
        return 'Long Break';
    }
  };

  return (
    <Card>
        <div className="p-6 flex flex-col items-center">
            <div className="mb-4">
                <span className="text-sm font-medium bg-purple-600/20 text-purple-300 px-3 py-1 rounded-full">
                    {getModeLabel()}
                </span>
            </div>
            <h1 className="text-6xl font-bold font-mono tracking-tighter text-white mb-6">
                {formatTime(timeLeft)}
            </h1>
            <div className="flex gap-3">
                <Button onClick={toggleTimer} className="min-w-[120px]">
                    {isActive ? 'Pause' : 'Start'}
                </Button>
                <Button variant="secondary" onClick={resetTimer}>
                    Reset
                </Button>
            </div>
        </div>
    </Card>
  );
};

export default PomodoroTimer;
