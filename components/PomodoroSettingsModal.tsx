import React, { useState } from 'react';
import Button from './ui/Button';

interface PomodoroSettings {
    work: number;
    shortBreak: number;
    longBreak: number;
}

interface PomodoroSettingsModalProps {
    isOpen: boolean;
    onClose: () => void;
    settings: PomodoroSettings;
    onSave: (newSettings: PomodoroSettings) => void;
}

const PomodoroSettingsModal: React.FC<PomodoroSettingsModalProps> = ({ isOpen, onClose, settings, onSave }) => {
    const [localSettings, setLocalSettings] = useState(settings);

    if (!isOpen) return null;

    const handleSave = () => {
        onSave(localSettings);
        onClose();
    };

    const handleChange = (field: keyof PomodoroSettings, value: string) => {
        setLocalSettings(prev => ({ ...prev, [field]: Number(value) }));
    };

    return (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
            <div className="bg-gray-800 rounded-lg p-6 w-full max-w-sm">
                <h2 className="text-xl font-bold mb-4">Timer Settings</h2>
                <div className="space-y-4">
                    <div>
                        <label className="block text-sm text-gray-400">Focus (minutes)</label>
                        <input type="number" value={localSettings.work} onChange={e => handleChange('work', e.target.value)} className="w-full mt-1 px-3 py-2 bg-gray-700 rounded-md"/>
                    </div>
                    <div>
                        <label className="block text-sm text-gray-400">Short Break (minutes)</label>
                        <input type="number" value={localSettings.shortBreak} onChange={e => handleChange('shortBreak', e.target.value)} className="w-full mt-1 px-3 py-2 bg-gray-700 rounded-md"/>
                    </div>
                    <div>
                        <label className="block text-sm text-gray-400">Long Break (minutes)</label>
                        <input type="number" value={localSettings.longBreak} onChange={e => handleChange('longBreak', e.target.value)} className="w-full mt-1 px-3 py-2 bg-gray-700 rounded-md"/>
                    </div>
                </div>
                <div className="mt-6 flex justify-end space-x-3">
                    <Button variant="secondary" onClick={onClose}>Cancel</Button>
                    <Button onClick={handleSave}>Save</Button>
                </div>
            </div>
        </div>
    );
};

export default PomodoroSettingsModal;
