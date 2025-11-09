// Fix: Implemented the missing Header component for app navigation.
import React from 'react';
import { supabase } from '../lib/supabaseClient';
import type { Page } from '../types';

interface HeaderProps {
  currentPage: Page;
  setCurrentPage: (page: Page) => void;
}

const NavItem: React.FC<{
    page: Page;
    currentPage: Page;
    onClick: (page: Page) => void;
    children: React.ReactNode;
}> = ({ page, currentPage, onClick, children }) => {
    const isActive = page === currentPage;
    return (
        <button
            onClick={() => onClick(page)}
            className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                isActive
                    ? 'bg-purple-600 text-white'
                    : 'text-gray-300 hover:bg-gray-700 hover:text-white'
            }`}
        >
            {children}
        </button>
    );
};


const Header: React.FC<HeaderProps> = ({ currentPage, setCurrentPage }) => {
  const handleLogout = async () => {
    await supabase.auth.signOut();
  };

  const pages: Page[] = ['Dashboard', 'Tasks', 'Schedule', 'Analytics', 'Mood'];
  
  return (
    <header className="bg-gray-800/80 backdrop-blur-sm sticky top-0 z-40 border-b border-gray-700">
      <nav className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <span className="font-bold text-xl text-white">FocusFlow</span>
            <div className="hidden md:block ml-10">
              <div className="flex items-baseline space-x-4">
                {pages.map(page => (
                    <NavItem key={page} page={page} currentPage={currentPage} onClick={setCurrentPage}>
                        {page}
                    </NavItem>
                ))}
              </div>
            </div>
          </div>
          <div className="hidden md:block">
            <div className="ml-4 flex items-center md:ml-6 space-x-4">
               <NavItem page="Settings" currentPage={currentPage} onClick={setCurrentPage}>
                    Settings
                </NavItem>
              <button
                onClick={handleLogout}
                className="px-3 py-2 rounded-md text-sm font-medium text-gray-300 hover:bg-gray-700 hover:text-white"
              >
                Sign Out
              </button>
            </div>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Header;
