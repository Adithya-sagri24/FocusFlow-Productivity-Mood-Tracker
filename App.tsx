import React, { useState } from 'react';
import Auth from './components/Auth';
import Shell from './components/Shell';
import DashboardPage from './pages/DashboardPage';
import TasksPage from './pages/TasksPage';
import SchedulePage from './pages/SchedulePage';
import SettingsPage from './pages/SettingsPage';
import PrivacyPage from './pages/PrivacyPage';
import { useAuth } from './hooks/useAuth';

export type Page = 'dashboard' | 'tasks' | 'schedule' | 'settings' | 'privacy';

const App: React.FC = () => {
  const { session } = useAuth();
  const [currentPage, setCurrentPage] = useState<Page>('dashboard');

  const renderPage = () => {
    switch (currentPage) {
      case 'dashboard':
        return <DashboardPage />;
      case 'tasks':
        return <TasksPage />;
      case 'schedule':
        return <SchedulePage />;
      case 'settings':
        return <SettingsPage />;
      case 'privacy':
        return <PrivacyPage />;
      default:
        return <DashboardPage />;
    }
  };

  if (!session) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center">
        <div className="max-w-md w-full">
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
