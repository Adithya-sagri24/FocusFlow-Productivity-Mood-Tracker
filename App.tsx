// Fix: Implemented the missing App component to handle routing and authentication.
import React, { useState } from 'react';
import { useAuth } from './hooks/useAuth';
import Auth from './components/Auth';
import Shell from './components/Shell';
import type { Page } from './types';

// Page Components
import HomePage from './pages/HomePage';
import TasksPage from './pages/TasksPage';
import SchedulePage from './pages/SchedulePage';
import AnalyticsPage from './pages/AnalyticsPage';
import MoodPage from './pages/MoodPage';
import SettingsPage from './pages/SettingsPage';
import PrivacyPage from './pages/PrivacyPage';

const App: React.FC = () => {
  const { session } = useAuth();
  const [currentPage, setCurrentPage] = useState<Page>('Dashboard');

  const renderPage = () => {
    switch (currentPage) {
      case 'Dashboard':
        return <HomePage setCurrentPage={setCurrentPage} />;
      case 'Tasks':
        return <TasksPage />;
      case 'Schedule':
        return <SchedulePage />;
      case 'Analytics':
        return <AnalyticsPage />;
      case 'Mood':
        return <MoodPage />;
      case 'Settings':
        return <SettingsPage />;
      case 'Privacy':
        return <PrivacyPage />;
      default:
        return <HomePage setCurrentPage={setCurrentPage} />;
    }
  };

  if (!session) {
    return (
      <div className="min-h-screen bg-gray-900 text-white flex items-center justify-center">
        <div className="w-full max-w-md p-4">
          <Auth />
        </div>
      </div>
    );
  }

  return (
    <Shell currentPage={currentPage} setCurrentPage={setCurrentPage}>
      {renderPage()}
    </Shell>
  );
};

export default App;
