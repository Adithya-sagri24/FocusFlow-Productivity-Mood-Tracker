// Fix: Implemented the missing Dashboard page.
import React from 'react';
import PomodoroTimer from '../components/PomodoroTimer';
import TaskWidget from '../components/TaskWidget';
import MoodChart from '../components/MoodChart';
import type { Page } from '../types';

interface DashboardPageProps {
    setCurrentPage: (page: Page) => void;
}

const DashboardPage: React.FC<DashboardPageProps> = ({ setCurrentPage }) => {
  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Dashboard</h1>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
            <PomodoroTimer />
        </div>
        <div className="space-y-6">
            <TaskWidget onNavigate={() => setCurrentPage('Tasks')} />
            <MoodChart />
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;
