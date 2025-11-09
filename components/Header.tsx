// Fix: Implemented the missing Header component.
import React from 'react';
import { supabase } from '../lib/supabaseClient';
import type { Page } from '../types';
import Button from './ui/Button';

interface HeaderProps {
  currentPage: Page;
  setCurrentPage: (page: Page) => void;
}

const NavItem: React.FC<{
  pageName: Page;
  currentPage: Page;
  setCurrentPage: (page: Page) => void;
}> = ({ pageName, currentPage, setCurrentPage }) => (
  <button
    onClick={() => setCurrentPage(pageName)}
    className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
      currentPage === pageName
        ? 'bg-gray-700 text-white'
        : 'text-gray-300 hover:bg-gray-700 hover:text-white'
    }`}
  >
    {pageName}
  </button>
);

const Header: React.FC<HeaderProps> = ({ currentPage, setCurrentPage }) => {
  const handleLogout = async () => {
    await supabase.auth.signOut();
  };

  const pages: Page[] = ['Home', 'Tasks', 'Schedule', 'Analytics', 'Mood'];

  return (
    <header className="bg-gray-800/80 backdrop-blur-md sticky top-0 z-40 border-b border-gray-700">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <span className="font-bold text-xl text-white">FocusFlow</span>
            <nav className="hidden md:flex items-center space-x-4 ml-10">
              {pages.map((page) => (
                <NavItem key={page} pageName={page} currentPage={currentPage} setCurrentPage={setCurrentPage} />
              ))}
            </nav>
          </div>
          <div className="flex items-center">
             <Button onClick={handleLogout} variant="secondary">
                Sign Out
             </Button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
