import React, { useState } from 'react';
import { usePomodoro } from '../hooks/usePomodoro';
import Button from './ui/Button';
import Card from './ui/Card';
import CircularCountdown from './CircularCountdown';
import PomodoroSettingsModal from './PomodoroSettingsModal';
import { SettingsIcon } from './icons';

const PomodoroTimer: React.FC = () => {
    // A real implementation would persist these settings
    const [settings, setSettings] = useState({ work: 25, shortBreak: 5, longBreak: 15 });
    const { timeLeft, mode, isActive, toggleTimer, resetTimer } = usePomodoro(settings);
    const [isSettingsOpen, setIsSettingsOpen] = useState(false);

    const totalTime = {
        work: settings.work * 60,
        shortBreak: settings.shortBreak * 60,
        longBreak: settings.longBreak * 60,
    }[mode];

    const formatTime = (seconds: number) => {
        const mins = Math.floor(seconds / 60).toString().padStart(2, '0');
        const secs = (seconds % 60).toString().padStart(2, '0');
        return `${mins}:${secs}`;
    };

    const modeText = {
        work: 'Focus Time',
        shortBreak: 'Short Break',
        longBreak: 'Long Break',
    }[mode];

    return (
        <Card>
            <div className="p-6 flex flex-col items-center">
                <div className="w-full flex justify-between items-center mb-4">
                    <h2 className="text-xl font-semibold">{modeText}</h2>
                    <Button variant="subtle" onClick={() => setIsSettingsOpen(true)}>
                        <SettingsIcon className="w-5 h-5"/>
                    </Button>
                </div>
                
                <CircularCountdown
                    percentage={(timeLeft / totalTime) * 100}
                    time={formatTime(timeLeft)}
                />

                <div className="flex space-x-4 mt-6">
                    <Button onClick={toggleTimer} className="w-32">
                        {isActive ? 'Pause' : 'Start'}
                    </Button>
                    <Button variant="secondary" onClick={resetTimer}>
                        Reset
                    </Button>
                </div>
            </div>
            <PomodoroSettingsModal
                isOpen={isSettingsOpen}
                onClose={() => setIsSettingsOpen(false)}
                settings={settings}
                onSave={setSettings}
            />
        </Card>
    );
};

export default PomodoroTimer;
