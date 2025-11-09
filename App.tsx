// Fix: Implemented the main App component to handle authentication and page routing.
import React, { useState } from 'react';
import Auth from './components/Auth';
import Shell from './components/Shell';
import HomePage from './pages/HomePage';
import TasksPage from './pages/TasksPage';
import SchedulePage from './pages/SchedulePage';
import AnalyticsPage from './pages/AnalyticsPage';
import MoodPage from './pages/MoodPage';
import SettingsPage from './pages/SettingsPage';
import PrivacyPage from './pages/PrivacyPage';
import { useAuth } from './hooks/useAuth';
import type { Page } from './types';

function App() {
  const { session } = useAuth();
  const [currentPage, setCurrentPage] = useState<Page>('Home');

  const renderPage = () => {
    switch (currentPage) {
      case 'Home':
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
      <div className="min-h-screen bg-gray-900 flex items-center justify-center">
        <Auth />
      </div>
    );
  }

  return (
    <Shell currentPage={currentPage} setCurrentPage={setCurrentPage}>
      {renderPage()}
    </Shell>
  );
}

export default App;
