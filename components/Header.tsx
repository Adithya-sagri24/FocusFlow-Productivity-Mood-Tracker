import React from 'react';
import { supabase } from '../lib/supabaseClient';
import type { Page } from '../types';
import Button from './ui/Button';

interface HeaderProps {
  currentPage: Page;
  setCurrentPage: (page: Page) => void;
}

const navItems: { page: Page; label: string }[] = [
    { page: 'dashboard', label: 'Dashboard' },
    { page: 'tasks', label: 'Tasks' },
    { page: 'schedule', label: 'Schedule' },
    { page: 'analytics', label: 'Analytics' },
    { page: 'settings', label: 'Settings' },
];

const Header: React.FC<HeaderProps> = ({ currentPage, setCurrentPage }) => {
  return (
    <header className="bg-gray-800/80 backdrop-blur-sm sticky top-0 z-10 border-b border-gray-700">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <h1 className="text-2xl font-bold text-white">FocusFlow</h1>
            <nav className="hidden md:flex ml-10 space-x-4">
              {navItems.map(item => (
                 <button
                    key={item.page}
                    onClick={() => setCurrentPage(item.page)}
                    className={`px-3 py-2 rounded-md text-sm font-medium ${
                        currentPage === item.page
                        ? 'bg-gray-900 text-white'
                        : 'text-gray-300 hover:bg-gray-700 hover:text-white'
                    }`}
                 >
                    {item.label}
                 </button>
              ))}
            </nav>
          </div>
          <div className="flex items-center">
            <Button variant="subtle" onClick={() => supabase.auth.signOut()}>
              Sign Out
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
