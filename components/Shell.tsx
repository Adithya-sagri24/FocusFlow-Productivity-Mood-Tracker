import React from 'react';
import Header from './Header';
import type { Page } from '../App';

interface ShellProps {
  children: React.ReactNode;
  currentPage: Page;
  setCurrentPage: (page: Page) => void;
}

const Shell: React.FC<ShellProps> = ({ children, currentPage, setCurrentPage }) => {
  return (
    <div className="min-h-screen flex flex-col bg-gray-900">
      <Header currentPage={currentPage} setCurrentPage={setCurrentPage} />
      <main className="flex-grow container mx-auto p-4 sm:p-6 lg:p-8">
        {children}
      </main>
    </div>
  );
};

export default Shell;
