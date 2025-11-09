import React from 'react';
import MusicPlayer from '../components/MusicPlayer';
import PomodoroTimer from '../components/PomodoroTimer';
import TaskWidget from '../components/TaskWidget';
import MoodChart from '../components/MoodChart';

const DashboardPage: React.FC = () => {

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Dashboard</h1>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Left Column */}
        <div className="lg:col-span-2 space-y-6">
          <PomodoroTimer />
          {/* A real app would use a router or context for navigation */}
          <TaskWidget onNavigate={() => alert('Navigate to Tasks page')} />
          <MoodChart />
        </div>

        {/* Right Column */}
        <div className="space-y-6">
          <MusicPlayer />
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;
