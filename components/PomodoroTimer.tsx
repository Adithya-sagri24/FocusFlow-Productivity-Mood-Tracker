// Fix: Implemented the missing PomodoroTimer UI component.
import React, { useState } from 'react';
import { usePomodoro } from '../hooks/usePomodoro';
import CircularCountdown from './CircularCountdown';
import Button from './ui/Button';
import IconButton from './ui/IconButton';
import { PlayIcon, PauseIcon, ResetIcon, SettingsIcon } from './icons';
import PomodoroSettingsModal from './PomodoroSettingsModal';

const PomodoroTimer: React.FC = () => {
  const [settings, setSettings] = useState({ work: 25, shortBreak: 5, longBreak: 15 });
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  
  const { timeLeft, mode, isActive, cycles, toggleTimer, resetTimer } = usePomodoro(settings);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
  };

  const totalDuration = (mode === 'work' ? settings.work : mode === 'shortBreak' ? settings.shortBreak : settings.longBreak) * 60;
  const percentage = (timeLeft / totalDuration) * 100;
  
  const modeText = {
    work: 'Focus',
    shortBreak: 'Short Break',
    longBreak: 'Long Break',
  };

  const handleSaveSettings = (newSettings: { work: number; shortBreak: number; longBreak: number; }) => {
    setSettings(newSettings);
  };

  return (
    <div className="flex flex-col items-center justify-center p-6 bg-gray-800 rounded-lg">
      <div className="flex justify-between w-full items-center mb-4">
        <span className="text-lg font-semibold">{modeText[mode]}</span>
        <IconButton onClick={() => setIsSettingsOpen(true)}>
            <SettingsIcon className="w-6 h-6" />
        </IconButton>
      </div>

      <CircularCountdown percentage={percentage} time={formatTime(timeLeft)} />
      
      <div className="mt-6 flex items-center space-x-4">
        <IconButton onClick={resetTimer} className="bg-gray-700 hover:bg-gray-600">
            <ResetIcon className="w-6 h-6"/>
        </IconButton>
        <Button onClick={toggleTimer} className="w-32 h-16 text-2xl !rounded-full">
          {isActive ? <PauseIcon className="w-8 h-8" /> : <PlayIcon className="w-8 h-8" />}
        </Button>
        <div className="w-10 text-center">
            <span className="font-bold text-lg">{cycles}</span>
            <span className="text-sm block">/ 4</span>
        </div>
      </div>
      
      <PomodoroSettingsModal
        isOpen={isSettingsOpen}
        onClose={() => setIsSettingsOpen(false)}
        settings={settings}
        onSave={handleSaveSettings}
      />
    </div>
  );
};

export default PomodoroTimer;
